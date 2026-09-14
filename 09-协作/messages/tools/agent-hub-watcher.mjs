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
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const INBOX = path.join(ROOT, 'inbox');
const AGENTS = ['codebuddy', 'workbuddy', 'deepseek', 'doubao', 'user', 'qwen'];

const CONFIG_FILE = path.join(__dirname, 'agent-hub-config.json');
const STATE_FILE = path.join(__dirname, 'agent-hub-state.json');
const LOG_FILE = path.join(__dirname, 'agent-hub-watcher.log');
const PID_FILE = path.join(__dirname, 'agent-hub-watcher.pid');
// DeepSeek watcher 的处理记录（协作去重：已处理的消息 hub 不重复弹窗）
const DS_STATE_FILE = path.join(__dirname, 'watcher-state.json');

const DEFAULT_CONFIG = {
  enabled: true,
  interval_ms: 15000,
  agents: { codebuddy: true, workbuddy: true, deepseek: true, doubao: true, user: true, qwen: true },
  high_priority_types: ['question', 'task', 'handoff', 'request_review', 'correction'],
  // WorkBuddy 评审建议：高优弹窗（醒目）、低优默认静默入日志（可配置开启气泡）
  popup_high: true,
  popup_low: false
};

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

function notifyMsg(m, agent, isHigh) {
  const ok = isHigh ? popupHigh(m.from, agent, m.subject, m.thread_id)
                    : balloonLow(m.from, agent, m.subject, m.thread_id);
  log(`通知[${isHigh ? '高优' : '普通'}] ${m.from}->${agent} 「${m.subject || ''}」 thread=${m.thread_id || '-'} 弹窗=${ok ? 'OK' : 'FAIL'}`);
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

  setInterval(() => {
    if (!config.enabled) return;
    const found = scan();
    for (const { msg, agent, dsHandled } of found) {
      if (dsHandled) { log(`已由 DeepSeek watcher 处理，跳过弹窗: ${msg.message_id}`); continue; }
      const isHigh = isHighPriority(msg);
      if (isHigh && !config.popup_high) { log(`高优通知被配置关闭，跳过: ${msg.message_id}`); continue; }
      if (!isHigh && !config.popup_low) { log(`普通通知被配置关闭（仅日志）: ${msg.message_id}`); continue; }
      notifyMsg(msg, agent, isHigh);
    }
  }, Math.max(3000, config.interval_ms || 15000));

  // 保活：写心跳日志（便于确认进程存活）
  setInterval(() => log('heartbeat'), 600000);
}

main();
