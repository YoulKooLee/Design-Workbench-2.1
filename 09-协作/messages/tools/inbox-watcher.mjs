#!/usr/bin/env node
/**
 * inbox-watcher.mjs — DeepSeek Harness 收件箱全自动处理 watcher（多智能体通信 L3）
 *
 * 机制：轮询 DeepSeek 收件箱（messages/inbox/deepseek/），发现新消息文件时，
 * 以共享信息目录为工作目录调用 dsh --profile headless 无头代理处理（读协议→
 * 处理未读→按 v0.1 回复→标记已读），实现"豆包发消息 → 我自动处理"零人工转发。
 *
 * 用法：
 *   node inbox-watcher.mjs            # 前台轮询（Ctrl+C 退出）
 *   或注册为计划任务开机自启（隐藏窗口运行）
 *
 * 状态文件：messages/tools/watcher-state.json（已处理文件名 + 失败计数）
 * 日志文件：messages/tools/watcher.log
 * 锁文件：  messages/tools/watcher.lock（单实例，含陈旧检测）
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const SHARE = 'C:\\Users\\游翔\\Documents\\AI work\\产品设计工作台\\09-协作';
const INBOX = path.join(SHARE, 'messages', 'inbox', 'deepseek');
const TOOLS = path.join(SHARE, 'messages', 'tools');
const STATE_FILE = path.join(TOOLS, 'watcher-state.json');
const LOG_FILE = path.join(TOOLS, 'watcher.log');
const LOCK_FILE = path.join(TOOLS, 'watcher.lock');
// 直接调 dsh 的 bin.js，避免 .cmd 包装与中文参数乱码（node→node argv 为 UTF-16，安全）
const DSH_BIN = 'C:\\Users\\游翔\\deepseek-harness\\node_modules\\@deepseek-ai\\dsh\\lib\\bin.js';
const POLL_MS = 15000;
const RUN_TIMEOUT_MS = 600000; // headless 单次运行上限 10 分钟
const MAX_FAILURES = 3;

const PROMPT = [
  '你是 DeepSeek Harness 的无人值守处理实例，是多智能体协作体系的一员，代号 deepseek。',
  '任务：处理你的收件箱 messages/inbox/deepseek/ 中的未读消息。',
  '步骤：',
  '1. 先读 messages/README.md 与 messages/MESSAGE_FORMAT.md，理解协议 v0.1（消息 JSON 字段、type 语义、收发约定、推理注释要求）。',
  '2. 列出收件箱中所有 status 为 unread 的 .json 消息，按『自动处理权限等级 = auto_ack + 任务升级给人』处理：',
  '   - info：标记已读即可，无需回复。',
  '   - question / ack：可自动回复——按协议在对方 inbox 写回复，并在自己的 outbox 留副本，reply_to 指向原消息，thread_id 沿用原值；type 按语义选择；立场保守，不替用户拍板、不声称用户已授权任何事。',
  '   - task / handoff / request_review / correction：不自动回复、不自动执行任何动作——仅标记已读，并在最终总结中逐条列出（发送方、主题、需要用户注意什么），留给用户处理。',
  '   - 每条处理完，把该消息在你自己收件箱副本里的 status 改为 read。',
  '3. 最后用一段话总结：自动回复了几条（列出 message_id）、升级给用户几条（列出 message_id 与主题）、仅标记已读几条。',
  '注意事项：',
  '- 只处理你自己的收件箱；不修改、不删除别人 inbox 中的既有文件。',
  '- 正文用中文；交接/任务/审查类回复必须带推理注释（做了什么/为什么/排除了什么/风险）。',
  '- 所有消息文件用 UTF-8 无 BOM 写，JSON 必须合法。',
  '- 不要回复测试/探测类消息以外的无关内容，不要主动给所有智能体群发。'
].join('\n');

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  try { fs.appendFileSync(LOG_FILE, line + '\n'); } catch { /* 日志失败不致命 */ }
  console.log(line);
}

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); }
  catch { return { processed: [], failures: {} }; }
}

function saveState(s) {
  try { fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 2), 'utf8'); } catch {}
}

function inboxFiles() {
  try { return fs.readdirSync(INBOX).filter((f) => f.endsWith('.json')); } catch { return []; }
}

function acquireLock() {
  try { fs.writeFileSync(LOCK_FILE, String(process.pid), { flag: 'wx' }); return true; }
  catch {
    // 陈旧锁检测：锁内 pid 已不存在则接管
    try {
      const pid = Number(fs.readFileSync(LOCK_FILE, 'utf8'));
      if (pid && Number.isFinite(pid) && pid !== process.pid) {
        try { process.kill(pid, 0); return false; } catch { /* 进程已死，接管 */ }
      }
      fs.rmSync(LOCK_FILE, { force: true });
      fs.writeFileSync(LOCK_FILE, String(process.pid), { flag: 'wx' });
      return true;
    } catch { return false; }
  }
}

function releaseLock() { try { fs.rmSync(LOCK_FILE, { force: true }); } catch {} }

function runHeadless() {
  log('触发 headless 自动处理（一次完整回合）...');
  const r = spawnSync(process.execPath, [DSH_BIN, '--profile', 'headless', PROMPT], {
    cwd: SHARE,
    encoding: 'utf8',
    timeout: RUN_TIMEOUT_MS,
    windowsHide: true,
    maxBuffer: 4 * 1024 * 1024,
  });
  log(`headless 退出码=${r.status}`);
  if (r.stdout && r.stdout.trim()) log('headless 输出:\n' + r.stdout.trim().slice(0, 3000));
  if (r.stderr && r.stderr.trim()) log('headless stderr:\n' + r.stderr.trim().slice(0, 2000));
  return r.status === 0;
}

// 自动归档刚完成的 headless 会话（避免工作台面板会话堆积；仅归档标记，数据不删）
const WORKSPACE_FILE = 'C:\\Users\\游翔\\.dsh\\storages\\workspace.json';
const HEADLESS_SESSIONS_DIR = 'C:\\Users\\游翔\\.dsh\\sessions\\--C-Users-~6E38~7FD4-Documents-AI~0020work-~5171~4EAB~4FE1~606F~76EE~5F55--';

function archiveLatestHeadlessSession() {
  try {
    if (!fs.existsSync(WORKSPACE_FILE) || !fs.existsSync(HEADLESS_SESSIONS_DIR)) return;
    const dirs = fs.readdirSync(HEADLESS_SESSIONS_DIR)
      .filter((d) => d.startsWith('session-'))
      .map((d) => path.join(HEADLESS_SESSIONS_DIR, d))
      .filter((p) => fs.statSync(p).isDirectory());
    if (!dirs.length) return;
    dirs.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
    const newest = path.basename(dirs[0]);
    const ws = JSON.parse(fs.readFileSync(WORKSPACE_FILE, 'utf8'));
    const archived = (ws.global && ws.global.archivedSessionIds) || [];
    if (!archived.includes(newest)) {
      ws.global.archivedSessionIds = archived.concat(newest);
      fs.writeFileSync(WORKSPACE_FILE, JSON.stringify(ws, null, 2), 'utf8');
      log(`已自动归档 headless 会话 ${newest}（面板不再堆积）`);
    }
  } catch (e) {
    log(`自动归档失败（不影响处理）: ${e.message}`);
  }
}

// ---- 主循环 ----
if (!acquireLock()) {
  console.error('另一个 inbox-watcher 实例正在运行，退出。');
  process.exit(1);
}

log(`inbox-watcher 启动：监听 ${INBOX}，轮询间隔 ${POLL_MS / 1000}s`);
let state = loadState();

const shutdown = () => { releaseLock(); log('inbox-watcher 退出'); process.exit(0); };
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

while (true) {
  const files = inboxFiles();
  const fresh = files.filter((f) => !state.processed.includes(f));
  if (fresh.length > 0) {
    log(`检测到 ${fresh.length} 个新消息文件：${fresh.join(', ')}`);
    const ok = runHeadless();
    if (ok) {
      // 成功后：当前所有文件记入 processed，清失败计数
      for (const f of fresh) delete state.failures[f];
      archiveLatestHeadlessSession();
    } else {
      // 失败：计数，连续失败超过上限则放弃并记录
      for (const f of fresh) state.failures[f] = (state.failures[f] || 0) + 1;
    }
    // 标记：成功 或 失败超上限 的文件都视为已处理（失败留日志人工排查）
    const finalize = fresh.filter((f) => ok || (state.failures[f] || 0) >= MAX_FAILURES);
    for (const f of finalize) {
      if (!state.processed.includes(f)) state.processed.push(f);
    }
    if (state.processed.length > 200) state.processed = state.processed.slice(-200);
    saveState(state);
    log(ok ? `处理完成，共 ${fresh.length} 条` : `处理失败（${fresh.length} 条待重试，失败计数：${fresh.map((f) => `${f}=${state.failures[f]}`).join(' ')}）`);
  }
  await new Promise((r) => setTimeout(r, POLL_MS));
}
