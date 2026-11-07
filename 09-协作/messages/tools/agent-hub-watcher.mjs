#!/usr/bin/env node
// ============================================================
// agent-hub-watcher.mjs — 统一通知监听器（监听中枢 hub）
// 版本：v0.2（按 Agent Hub Watcher 方案，DeepSeek 评审通过）
// 职责：轮询各智能体 inbox，发现新消息 → Windows 弹窗通知用户 + 写日志
// 约束：只读不越权——不修改任何 inbox/outbox 消息文件；
//       与 DeepSeek inbox-watcher 保持独立双进程（职责分离、故障隔离）
// 启动：必须用系统 node（C:\Program Files\nodejs\node.exe）运行
// ============================================================
import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SHARE = path.resolve(ROOT, '..'); // 09-协作
const INBOX = path.join(ROOT, 'inbox');
const AGENTS = ['codebuddy', 'workbuddy', 'deepseek', 'doubao', 'user', 'qwen'];

// 智能体活跃心跳：消息发送方（from）在 09-协作/agents/<id>/ 写 heartbeat.json，供面板在线判定
function writeHeartbeat(agentId) {
  try {
    const dir = path.join(SHARE, 'agents', agentId);
    if (!fs.existsSync(dir)) return;
    const tmp = path.join(dir, 'heartbeat.json.tmp');
    fs.writeFileSync(tmp, JSON.stringify({ at: new Date().toISOString(), pid: process.pid || null, host: os.hostname() || '' }, null, 2), 'utf-8');
    fs.renameSync(tmp, path.join(dir, 'heartbeat.json'));
  } catch { /* 心跳写失败不阻断通知 */ }
}

const CONFIG_FILE = path.join(__dirname, 'agent-hub-config.json');
const STATE_FILE = path.join(__dirname, 'agent-hub-state.json');
const LOG_FILE = path.join(__dirname, 'agent-hub-watcher.log');
const PID_FILE = path.join(__dirname, 'agent-hub-watcher.pid');
// DeepSeek watcher 的处理记录（协作去重：已处理的消息 hub 不重复弹窗）
const DS_STATE_FILE = path.join(__dirname, 'watcher-state.json');
// 环路熔断计数：thread_id → { count, firstAt, lastAt }
const LOOP_FILE = path.join(__dirname, 'auto-exec-loop.json');

const DEFAULT_CONFIG = {
  enabled: true,
  interval_ms: 15000,
  agents: { codebuddy: true, workbuddy: true, deepseek: true, doubao: true, user: true, qwen: true },
  high_priority_types: ['question', 'task', 'handoff', 'request_review', 'correction'],
  // WorkBuddy 评审建议：高优弹窗（醒目）、低优默认静默入日志（可配置开启气泡）
  popup_high: true,
  popup_low: false,
  // v0.3 直连：发现发给 CodeBuddy 的动作型新消息 → 自动调 codebuddy CLI 处理并回复（免人工开会话）
  // 仅对动作型消息自动执行；info/ack 仍走通知；执行失败自动回退为弹窗通知用户
  auto_exec: { codebuddy: true },
  auto_exec_timeout_ms: 120000,
  // 环路熔断：同一 thread 内自动往返超过 max_rounds 次就停手转人工。
  // 目的：两个智能体互相回信时不会无限刷屏烧 token。
  loop_guard: { enabled: true, max_rounds: 4, window_ms: 1800000 },
  // 半自动降级：无 CLI 的智能体（workbuddy/qwen 等）无法被程序唤醒，
  // 开启后高优消息正文自动进剪贴板，用户到对应窗口 Ctrl+V 即可，省一次手工复制。
  auto_stage: { workbuddy: false, qwen: false }
};

// 动作型消息类型（自动直连执行）；info/ack 不需要 CodeBuddy 执行动作
const AUTO_EXEC_TYPES = ['task', 'handoff', 'question', 'request_review', 'correction'];

// ---------- 配置 / 状态 / 日志 ----------
function loadJSON(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf-8')); } catch { return fallback; }
}
function saveJSON(file, obj) {
  const tmp = file + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(obj, null, 2), 'utf-8');
  fs.renameSync(tmp, file);
}
function log(line) {
  try { fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${line}\n`, 'utf-8'); } catch {}
}

let config = { ...DEFAULT_CONFIG, ...loadJSON(CONFIG_FILE, {}) };
config.agents = { ...DEFAULT_CONFIG.agents, ...(config.agents || {}) };

let state = loadJSON(STATE_FILE, { seen: {} });
if (!state.seen) state.seen = {};

// ---------- PowerShell 弹窗 ----------
function psExec(script) {
  const b64 = Buffer.from(script, 'utf16le').toString('base64');
  try {
    execSync(`powershell -NoProfile -WindowStyle Hidden -EncodedCommand ${b64}`, {
      timeout: 15000, stdio: 'ignore', shell: 'cmd.exe'
    });
    return true;
  } catch (e) { log('弹窗执行失败: ' + e.message); return false; }
}

// 需要读取输出时用这个（psExec 为弹窗场景做了 stdio:ignore，拿不到返回值）
function psCapture(script) {
  const b64 = Buffer.from(script, 'utf16le').toString('base64');
  try {
    return String(execSync(`powershell -NoProfile -WindowStyle Hidden -EncodedCommand ${b64}`, {
      timeout: 15000, shell: 'cmd.exe', encoding: 'utf-8', maxBuffer: 1024 * 1024
    }) || '');
  } catch (e) { log('PowerShell 取值失败: ' + (e.message || '').slice(0, 120)); return ''; }
}

// ---------- 半自动降级：无 CLI 的智能体，把消息正文送进剪贴板 ----------
// 不改协作文件、不冒充身份，只替用户省一次手工复制：到对应窗口 Ctrl+V 即可。
function stageToClipboard(msg, agent) {
  let tmp = '';
  try {
    const text = '【' + (msg.from || '?') + ' → ' + agent + '】' + (msg.subject || '') + '\n\n' + (msg.body || '');
    tmp = path.join(os.tmpdir(), 'clip-' + Date.now() + '.txt');
    fs.writeFileSync(tmp, text, 'utf-8');
    const safe = tmp.replace(/'/g, "''");
    const out = psCapture(`Get-Content -Raw -Encoding UTF8 '${safe}' | Set-Clipboard; Write-Output 'OK'`);
    return out.includes('OK');
  } catch (e) {
    log('[auto-stage] 剪贴板写入失败: ' + (e.message || '').slice(0, 120));
    return false;
  } finally {
    if (tmp) { try { fs.unlinkSync(tmp); } catch {} }
  }
}

// ---------- 环路熔断：同一 thread 内自动往返次数上限 ----------
// 场景：A 自动回复 B，B 又自动回复 A，来回不停 → 烧 token 且刷屏。
// 做法：按 thread_id 累计自动执行次数，窗口期内超限则停止自动执行、转人工通知。
function loopGuardCheck(threadId) {
  const lg = config.loop_guard || {};
  if (lg.enabled === false) return { blocked: false, key: null };
  const key = String(threadId || 'no-thread');
  const now = Date.now();
  const win = Number(lg.window_ms) || 1800000;
  const max = Number(lg.max_rounds) || 4;
  let st = loadJSON(LOOP_FILE, {});
  if (!st || typeof st !== 'object' || Array.isArray(st)) st = {};
  let e = st[key];
  if (!e || typeof e !== 'object') e = { count: 0, firstAt: now, lastAt: 0 };
  if (now - (Number(e.firstAt) || 0) > win) { e.count = 0; e.firstAt = now; }
  return { blocked: (Number(e.count) || 0) >= max, key, count: Number(e.count) || 0, max, st, entry: e };
}
function loopGuardRecord(g) {
  if (!g || !g.key) return;
  const now = Date.now();
  const win = Number((config.loop_guard || {}).window_ms) || 1800000;
  g.entry.count = (Number(g.entry.count) || 0) + 1;
  g.entry.lastAt = now;
  if (!g.entry.firstAt) g.entry.firstAt = now;
  g.st[g.key] = g.entry;
  for (const k of Object.keys(g.st)) {
    const t = Number(g.st[k] && (g.st[k].lastAt || g.st[k].firstAt)) || 0;
    if (now - t > win * 2) delete g.st[k];
  }
  try { fs.writeFileSync(LOOP_FILE, JSON.stringify(g.st, null, 2), 'utf-8'); } catch {}
}

// 高优：Popup 弹窗（10 秒自动关闭，红色感叹号醒目标识——WorkBuddy 建议）
function popupHigh(from, to, subject, threadId) {
  const text = `新消息：${from} → ${to}\n主题：${subject || '(无主题)'}\nthread: ${threadId || '-'}\n\n请到对应智能体处理`;
  const script = `$ws=New-Object -ComObject WScript.Shell; $ws.Popup('${text.replace(/'/g, "''")}','10','[AgentHub][高优] 有新消息需你处理',16)|Out-Null`;
  return psExec(script);
}

// 低优：系统托盘气泡（6 秒自动消失，不打扰）
function balloonLow(from, to, subject, threadId) {
  const title = '[AgentHub] 新消息';
  const text = `${from} → ${to}｜${subject || '(无主题)'}\nthread: ${threadId || '-'}`;
  const script = [
    'Add-Type -AssemblyName System.Windows.Forms;',
    'Add-Type -AssemblyName System.Drawing;',
    '$n=New-Object System.Windows.Forms.NotifyIcon;',
    '$n.Icon=[System.Drawing.SystemIcons]::Information;',
    `$n.BalloonTipTitle='${title.replace(/'/g, "''")}';`,
    `$n.BalloonTipText='${text.replace(/'/g, "''")}';`,
    '$n.Visible=$true; $n.ShowBalloonTip(6000);',
    'Start-Sleep 7; $n.Dispose();'
  ].join(' ');
  return psExec(script);
}

function notifyMsg(m, agent, isHigh, staged) {
  const subj = String(m.subject || '') + (staged ? '（正文已进剪贴板，到窗口 Ctrl+V 即可）' : '');
  const ok = isHigh ? popupHigh(m.from, agent, subj, m.thread_id)
                    : balloonLow(m.from, agent, subj, m.thread_id);
  log(`通知[${isHigh ? '高优' : '普通'}] ${m.from}->${agent} 「${m.subject || ''}」 thread=${m.thread_id || '-'} 弹窗=${ok ? 'OK' : 'FAIL'}${staged ? ' 已入剪贴板' : ''}`);
}

// ---------- v0.3 直连：自动唤醒 CodeBuddy 处理（免人工开会话）----------
// 发现发给 CodeBuddy 的动作型新消息 → 调本机 codebuddy CLI 执行 → msg-cli reply 写回
// 安全：仅处理 to=codebuddy 消息；消息内容按协作任务执行；不越权改其他文件
function autoExecCodeBuddy(msg) {
  return new Promise((resolve) => {
    const prompt = [
      '你是 CodeBuddy（产品设计工作台协作智能体）。收到协作总线转来的任务消息，请处理并回复。',
      `【消息】from: ${msg.from || '?'} | to: ${msg.to || '?'} | type: ${msg.type || '?'} | subject: ${msg.subject || '(无主题)'}`,
      `${msg.body || ''}`,
      '【要求】直接输出你的处理结论/回复正文，简洁明了，不要输出多余解释。'
    ].join('\n');
    const tmpIn = path.join(os.tmpdir(), `cb-in-${Date.now()}.txt`);
    const tmpOut = path.join(os.tmpdir(), `cb-out-${Date.now()}.txt`);
    try { fs.writeFileSync(tmpIn, prompt, 'utf-8'); } catch (e) { log('[auto-exec] 写 prompt 失败: ' + e.message); return resolve(false); }
    log(`[auto-exec] 唤醒 CodeBuddy 处理: ${msg.message_id} 「${msg.subject || ''}」`);
    try {
      const out = execSync(`codebuddy -p --output-format text < "${tmpIn}"`, {
        encoding: 'utf-8', timeout: config.auto_exec_timeout_ms || 120000,
        shell: 'cmd.exe', maxBuffer: 8 * 1024 * 1024
      });
      const body = String(out || '').trim();
      if (!body) { log('[auto-exec] CodeBuddy 空输出，回退通知'); return resolve(false); }
      fs.writeFileSync(tmpOut, body, 'utf-8');
      const subj = ('Re: ' + (msg.subject || '')).slice(0, 80);
      const r = execSync(`node "${path.join(__dirname, 'msg-cli.mjs')}" reply --from codebuddy --to ${msg.from || 'user'} --reply-to ${msg.message_id} --subject "${subj}" --body-file "${tmpOut}"`, {
        encoding: 'utf-8', timeout: 30000, shell: 'cmd.exe', cwd: __dirname
      });
      log(`[auto-exec] CodeBuddy 已自动回复 ${msg.from} thread=${msg.thread_id || '-'} | ${String(r).split('\n').filter(Boolean).slice(-2).join(' ')}`);
      writeHeartbeat('codebuddy');
      resolve(true);
    } catch (e) {
      log('[auto-exec] CodeBuddy 调用失败，回退通知: ' + (e.message || '').slice(0, 200));
      resolve(false);
    } finally {
      try { fs.unlinkSync(tmpIn); fs.unlinkSync(tmpOut); } catch {}
    }
  });
}

// DeepSeek watcher 已处理的消息（文件名在 watcher-state.processed 中）→ 不重复弹窗
function dsAlreadyProcessed(fileName) {
  try {
    const ws = JSON.parse(fs.readFileSync(DS_STATE_FILE, 'utf-8'));
    return Array.isArray(ws.processed) && ws.processed.includes(fileName);
  } catch { return false; }
}

// 判定是否为「需用户盯」的高优先级（type 高优 或 subject 含裁决/仲裁/批准 关键词）
function isHighPriority(m) {
  if (config.high_priority_types.includes(m.type)) return true;
  const s = (m.subject || '') + (m.body || '');
  return /裁决|仲裁|批准|用户拍板/.test(s);
}

// ---------- 扫描 inbox ----------
function scan() {
  const newMsgs = [];
  for (const a of AGENTS) {
    if (config.agents[a] === false) continue;
    const dir = path.join(INBOX, a);
    if (!fs.existsSync(dir)) continue;
    let files;
    try { files = fs.readdirSync(dir); } catch { continue; }
    for (const f of files) {
      if (!f.endsWith('.json')) continue;
      let m;
      try { m = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')); } catch { continue; }
      const id = a + '/' + (m.message_id || f);
      if (state.seen[id]) continue;
      state.seen[id] = new Date().toISOString();
      // 发送方活跃心跳（在线判定）：观察到新消息 → 发送方智能体视为活跃
      if (m && m.from) writeHeartbeat(String(m.from).toLowerCase());
      // 协作去重：DeepSeek watcher 已处理的消息（仅其 inbox 副本）→ 只记日志不弹窗
      if (a === 'deepseek' && dsAlreadyProcessed(f)) {
        newMsgs.push({ agent: a, msg: m, dsHandled: true });
      } else {
        newMsgs.push({ agent: a, msg: m, dsHandled: false });
      }
    }
  }
  if (newMsgs.length) saveJSON(STATE_FILE, state);
  return newMsgs;
}

// ---------- 主循环 ----------
function main() {
  fs.writeFileSync(PID_FILE, String(process.pid), 'utf-8');
  log(`=== Agent Hub Watcher v0.2 启动 === PID=${process.pid} 轮询间隔=${config.interval_ms}ms 监控=${AGENTS.filter(a=>config.agents[a]!==false).join(',')}`);

  // 首次启动：把现有消息全部标记为已见，只通知“启动后新出现”的消息，避免历史轰炸
  const existing = scan();
  log(`首次扫描：已有 ${existing.length} 条历史消息（已标记，不重复通知）`);

  setInterval(async () => {
    if (!config.enabled) return;
    // 周期心跳：监听常驻期间，所有启用智能体视为协作网内在线（供面板在线判定，心跳常新不过期）
    for (const a of AGENTS) {
      if (config.agents[a] === false) continue;
      writeHeartbeat(a);
    }
    const found = scan();
    // 串行处理：避免自动执行并发（CodeBuddy CLI 同一时间只跑一个实例）
    for (const { msg, agent, dsHandled } of found) {
      if (dsHandled) { log(`已由 DeepSeek watcher 处理，跳过: ${msg.message_id}`); continue; }
      // v0.3 直连：发给 CodeBuddy 的动作型消息 → 自动调 CLI 处理，成功则不打扰用户
      if (agent === 'codebuddy' && config.auto_exec && config.auto_exec.codebuddy !== false
          && AUTO_EXEC_TYPES.includes(msg.type)) {
        const g = loopGuardCheck(msg.thread_id);
        if (g.blocked) {
          log(`[loop-guard] thread=${msg.thread_id || '-'} 已自动往返 ${g.count}/${g.max} 次，熔断转人工: ${msg.message_id}「${msg.subject || ''}」`);
        } else {
          const ok = await autoExecCodeBuddy(msg);
          if (ok) { loopGuardRecord(g); continue; }
        }
        // 失败或熔断 → 回退为普通通知（用户人工兜底）
      }
      // 半自动降级：无 CLI 的智能体（workbuddy / qwen）无法被程序唤醒，
      // 开启 auto_stage 后把正文送进剪贴板，用户到对应窗口 Ctrl+V 即可。
      let staged = false;
      if (config.auto_stage && config.auto_stage[agent] === true && AUTO_EXEC_TYPES.includes(msg.type)) {
        staged = stageToClipboard(msg, agent);
        if (staged) log(`[auto-stage] 已把 ${msg.from}→${agent} 正文送入剪贴板: ${msg.message_id}`);
      }
      const isHigh = isHighPriority(msg);
      if (isHigh && !config.popup_high) { log(`高优通知被配置关闭，跳过: ${msg.message_id}`); continue; }
      if (!isHigh && !config.popup_low) { log(`普通通知被配置关闭（仅日志）: ${msg.message_id}`); continue; }
      notifyMsg(msg, agent, isHigh, staged);
    }
  }, Math.max(3000, config.interval_ms || 15000));

  // 保活：写心跳日志（便于确认进程存活）
  setInterval(() => log('heartbeat'), 600000);
}

main();
