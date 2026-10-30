// 钉钉待办守护（dws CLI）
// 1) 启动时全量拉取 executor 待办（todo task list，分页）填充本地 todos.json
// 2) 长连接增量订阅 user_todo_task_create / update / delete（--role-types executor, --flatten, NDJSON）
// 3) 进程退出自动重连；dws 路径从 08-办公/todos-config.json 读取
// 本地 todos.json 中 source=dingtalk 由本模块维护；source=manual（旧需求池手动项）原样保留
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

let child = null;
let reconnectTimer = null;
let pollTimer = null;
let started = false;
let lastError = '';
let eventCount = 0;
let connectedAt = 0;
let lastSyncAt = 0;
let realtimeOnline = false; // 长连接是否真正就绪（[event] ready）

// 路径动态读取：模块 import 早于 server.listen 回调里设置的 env，不能在顶层拼死路径
const officeDir = () => process.env.WORKBENCH_OFFICE_DIR || '.';
const CONFIG_FILE = () => path.join(officeDir(), 'todos-config.json');
const TODOS_FILE = () => path.join(officeDir(), 'todos.json');
// 本地隐藏名单：用户从工作台移除的钉钉待办（钉钉服务器侧保留），轮询全量重建时不再拉回
const HIDDEN_FILE = () => path.join(officeDir(), 'hidden-todos.json');

function readHidden() {
  try { const d = JSON.parse(fs.readFileSync(HIDDEN_FILE(), 'utf8')); return new Set(d.taskIds || []); }
  catch { return new Set(); }
}
function writeHidden(set) {
  try {
    fs.mkdirSync(path.dirname(HIDDEN_FILE()), { recursive: true });
    fs.writeFileSync(HIDDEN_FILE(), JSON.stringify({ taskIds: [...set] }, null, 2), 'utf8');
  } catch (e) { console.error('[todos] 隐藏名单写入失败:', e.message); }
}
function addHidden(tid) { const s = readHidden(); s.add(String(tid)); writeHidden(s); }

// 钉钉优先级：10低 / 20普通 / 30较高 / 40紧急
const PRI_LABEL = { 10: '低', 20: '普通', 30: '较高', 40: '紧急' };

function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE())) {
      const raw = JSON.parse(fs.readFileSync(CONFIG_FILE(), 'utf8'));
      return {
        dwsPath: typeof raw.dwsPath === 'string' ? raw.dwsPath.trim() : 'dws',
        enabled: raw.enabled !== false,
        pollIntervalSec: Number(raw.pollIntervalSec) > 10 ? Number(raw.pollIntervalSec) : 120,
      };
    }
  } catch {}
  return { dwsPath: 'dws', enabled: true, pollIntervalSec: 120 };
}

function readTodos() {
  try {
    const data = JSON.parse(fs.readFileSync(TODOS_FILE(), 'utf8'));
    const hidden = readHidden();
    if (hidden.size) data.items = (data.items || []).filter(x => !(x.source === 'dingtalk' && hidden.has(x.taskId)));
    return data;
  }
  catch { return { items: [] }; }
}

function writeTodos(data) {
  try {
    fs.mkdirSync(path.dirname(TODOS_FILE()), { recursive: true });
    fs.writeFileSync(TODOS_FILE(), JSON.stringify(data, null, 2), 'utf8');
  } catch (e) { console.error('[todos] 写入失败:', e.message); }
}

// 毫秒时间戳或 ISO 串 → YYYY-MM-DD（本地时区）
function toDateStr(v) {
  if (v == null || v === '') return '';
  if (typeof v === 'number') {
    const d = new Date(v);
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }
  return String(v).slice(0, 10);
}

// 统一归一化：同时兼容列表卡片字段（taskId/subject/finalStatusStage/dueTime）
// 与事件字段（task_id/subject/status_stage/plan_finish_date 等多种命名）
function normalizeCard(raw) {
  if (!raw) return null;
  const taskId = String(raw.taskId || raw.task_id || raw.id || raw.taskId || '').trim();
  if (!taskId) return null;
  const priNum = Number(raw.priority ?? raw.priorityLevel ?? 0);
  const stage = Number(raw.finalStatusStage ?? raw.status_stage ?? raw.statusStage ?? raw.status ?? 0);
  return {
    id: 'ding-' + taskId,
    source: 'dingtalk',
    taskId,
    title: String(raw.subject || raw.title || '(无标题)'),
    priorityNum: priNum,
    priority: PRI_LABEL[priNum] || '普通',
    statusStage: stage,
    oldStatusStage: raw.old_status_stage != null ? Number(raw.old_status_stage) : null,
    planFinishDate: toDateStr(raw.dueTime ?? raw.plan_finish_date ?? raw.planFinishDate),
    createdAt: raw.createdTime || raw.created_at || null,
    updatedAt: Date.now(),
  };
}

function upsertTodo(item) {
  const data = readTodos();
  data.items = data.items || [];
  const idx = data.items.findIndex(x => x.id === item.id);
  if (idx >= 0) data.items[idx] = { ...data.items[idx], ...item };
  else data.items.unshift(item);
  writeTodos(data);
  eventCount++;
}

function deleteTodo(taskId) {
  const data = readTodos();
  const before = (data.items || []).length;
  data.items = (data.items || []).filter(x => !(x.source === 'dingtalk' && x.taskId === taskId));
  if (data.items.length !== before) { writeTodos(data); eventCount++; }
}

// 直接读写原始 todos.json（不经过 readTodos 的隐藏过滤），避免更新到被过滤项
function readRawTodos() {
  try { return JSON.parse(fs.readFileSync(TODOS_FILE(), 'utf8')); }
  catch { return { items: [] }; }
}
// 仅本地更新状态档（钉钉不支持写"进行中"，该档只在工作台本地展示）
function setLocalStage(taskId, stage) {
  const data = readRawTodos();
  let hit = false;
  data.items = (data.items || []).map(x => {
    if (x.source === 'dingtalk' && String(x.taskId) === String(taskId)) {
      hit = true; return { ...x, statusStage: stage, updatedAt: Date.now() };
    }
    return x;
  });
  if (hit) writeTodos(data);
}
// 回写钉钉完成态：dws todo task done --status true/false；成功后同步本地档
function setDoneRemote(taskId, done) {
  return new Promise((resolve) => {
    const cfg = loadConfig();
    const args = ['todo', 'task', 'done', '--task-id', String(taskId), '--status', done ? 'true' : 'false', '-y', '--format', 'json'];
    let child;
    try { child = spawn(cfg.dwsPath, args, { windowsHide: true }); }
    catch (e) { resolve({ ok: false, msg: e.message }); return; }
    let out = '', err = '';
    const timer = setTimeout(() => { try { child.kill(); } catch {}; resolve({ ok: false, msg: '回写超时' }); }, 20000);
    child.stdout.on('data', d => { out += d.toString(); });
    child.stderr.on('data', d => { err += d.toString(); });
    child.on('error', e => { clearTimeout(timer); resolve({ ok: false, msg: e.message }); });
    child.on('close', code => {
      clearTimeout(timer);
      if (code === 0) { setLocalStage(taskId, done ? 2 : 0); resolve({ ok: true }); }
      else resolve({ ok: false, msg: (err || out).toString().trim().slice(0, 300) || ('exit code ' + code) });
    });
  });
}

// ===== 全量同步：分页拉 executor 未完成 + 已完成，重建 dingtalk 项，保留 manual 项 =====
// 异步 spawn，避免 spawnSync 阻塞 Node 主线程导致面板接口短暂无响应
let syncing = false;
function fetchPageAsync(dwsPath, status, page) {
  return new Promise((resolve, reject) => {
    const args = ['todo', 'task', 'list', '--role-types', 'executor', '--status', status,
      '--size', '50', '--page', String(page), '--format', 'json'];
    let child;
    try { child = spawn(dwsPath, args, { windowsHide: true }); }
    catch (e) { reject(e); return; }
    let out = '', err = '';
    const timer = setTimeout(() => { try { child.kill(); } catch {}; reject(new Error('list 拉取超时')); }, 25000);
    child.stdout.on('data', d => { out += d.toString(); });
    child.stderr.on('data', d => { err += d.toString(); });
    child.on('error', e => { clearTimeout(timer); reject(e); });
    child.on('close', code => {
      clearTimeout(timer);
      if (code !== 0) { reject(new Error((err || out).toString().trim().slice(0, 300) || ('exit code ' + code))); return; }
      try { resolve(JSON.parse(out)); } catch { resolve(null); }
    });
  });
}

async function syncFullOnce() {
  const cfg = loadConfig();
  if (!cfg.enabled) return { ok: false, reason: 'disabled' };
  if (syncing) return { ok: false, reason: 'already running' };
  syncing = true;
  const all = new Map();
  try {
    for (const st of ['false', 'true']) {
      let page = 1;
      for (;;) {
        const j = await fetchPageAsync(cfg.dwsPath, st, page);
        const cards = (j && j.result && j.result.todoCards) || [];
        const hidden = readHidden();
        for (const c of cards) {
          const item = normalizeCard(c);
          if (item && !hidden.has(item.taskId)) all.set(item.taskId, item);
        }
        if (!j || !j.result || !j.result.hasMore || cards.length === 0) break;
        page++;
        if (page > 20) break; // 安全上限 1000 条
      }
    }
  } catch (e) {
    lastError = '全量同步失败: ' + e.message;
    return { ok: false, reason: e.message };
  } finally { syncing = false; }
  const data = readTodos();
  const manual = (data.items || []).filter(x => x.source !== 'dingtalk');
  data.items = [...all.values(), ...manual];
  writeTodos(data);
  lastSyncAt = Date.now();
  lastError = '';
  return { ok: true, count: all.size };
}

// ===== 长连接增量订阅 =====
let buffer = '';
function handleChunk(chunk) {
  buffer += chunk.toString('utf8');
  let idx;
  while ((idx = buffer.indexOf('\n')) >= 0) {
    const line = buffer.slice(0, idx).trim();
    buffer = buffer.slice(idx + 1);
    if (!line) continue;
    let ev;
    try { ev = JSON.parse(line); } catch { continue; }
    eventCount++;
    const type = ev.event_type || ev.eventType || ev.type || '';
    if (/delete/i.test(type)) {
      const payload = ev.body || ev.payload || ev;
      const tid = String(payload.taskId || payload.task_id || payload.id || '');
      if (tid) deleteTodo(tid);
      continue;
    }
    const payload = ev.body || ev.payload || ev.task || ev.data || ev;
    const item = normalizeCard(payload);
    if (item) upsertTodo(item);
  }
}

function startPolling() {
  if (pollTimer) return;
  const cfg = loadConfig();
  const loopPoll = async () => {
    if (!realtimeOnline) {
      await syncFullOnce().catch(e => { lastError = '定时刷新失败: ' + e.message; });
    }
    pollTimer = setTimeout(loopPoll, cfg.pollIntervalSec * 1000);
  };
  pollTimer = setTimeout(loopPoll, 15000); // 首轮延迟 15s，错开启动全量同步
}

function stopPolling() {
  if (pollTimer) { clearTimeout(pollTimer); pollTimer = null; }
}

function startWatcher() {
  if (started) return;
  started = true;
  // 启动时只拉一次存量；之后不再定时轮询、不挂长连接，统一由前端「同步」按钮手动触发 syncFullOnce
  syncFullOnce().catch(e => { lastError = '启动同步失败: ' + e.message; });
}

function loop() {
  const cfg = loadConfig();
  if (!cfg.enabled) {
    reconnectTimer = setTimeout(loop, 30000);
    return;
  }
  const args = [
    'event', 'consume',
    'user_todo_task_create',
    'user_todo_task_update',
    'user_todo_task_delete',
    '--role-types', 'executor',
    '--flatten', '--format', 'ndjson',
  ];
  try {
    // 不带 shell：可执行路径含空格（如 Program Files (x86)）时不会被命令行截断；参数按数组安全传递
    child = spawn(cfg.dwsPath, args, { windowsHide: true });
  } catch (e) {
    lastError = '启动失败: ' + e.message;
    reconnectTimer = setTimeout(loop, 10000);
    return;
  }
  connectedAt = Date.now();
  lastError = '';
  child.stdout.on('data', handleChunk);
  child.stderr.on('data', (d) => {
    const s = d.toString('utf8').trim();
    if (!s) return;
    let msg = s;
    try {
      const j = JSON.parse(s);
      if (j && j.error && j.error.message) msg = j.error.message;
    } catch {}
    // ready 行 = 长连接真正就绪：停止轮询、走增量推送
    if (/\[event\] ready/.test(msg)) { realtimeOnline = true; stopPolling(); lastError = ''; return; }
    lastError = msg.slice(0, 300);
  });
  child.on('error', (e) => { lastError = e.message; });
  child.on('close', (code) => {
    child = null;
    realtimeOnline = false;
    const reason = lastError;
    const fatal = reason && /cannot find the file|No such file|未登录|load access token|reading secure data|permission denied|authentication/i.test(reason);
    const subUnavailable = reason && /subscription feature is not available|subscription|400/i.test(reason);
    lastError = reason || ('进程退出 code=' + code);
    // 恢复轮询兜底
    startPolling();
    // 订阅功能未开通：拉长重试间隔（5 分钟探一次开关）；确定性认证错误 60s；其余 10s
    const delay = subUnavailable ? 300000 : (fatal ? 60000 : 10000);
    reconnectTimer = setTimeout(loop, delay);
  });
}

function stopWatcher() {
  started = false;
  realtimeOnline = false;
  if (reconnectTimer) clearTimeout(reconnectTimer);
  stopPolling();
  if (child) { try { child.kill(); } catch {} }
}

function status() {
  return {
    running: false,
    mode: 'manual',
    connectedAt,
    eventCount,
    lastError,
    lastSyncAt,
    itemCount: (readTodos().items || []).length,
  };
}

export const dwsTodoWatcher = {
  startWatcher, stopWatcher, status, readTodos,
  upsertTodo, deleteTodo, syncFullOnce, normalizeCard,
  setDoneRemote, setLocalStage, addHidden,
};
