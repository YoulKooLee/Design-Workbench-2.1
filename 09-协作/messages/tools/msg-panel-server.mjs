#!/usr/bin/env node
/**
 * msg-panel-server.mjs — 多智能体通信可视化面板 v2.2
 *
 * v2.2 相对 v2.1 的改动（会话状态规范 v0.1）：
 *  - 线程新增「会话状态」_sstate（三态，正交于任务状态，可逆）：
 *    active_waiting(等待回复) / idle(待命) / archived(归档)
 *  - 消息 need_reply 推导：显式字段优先，否则按类型（question/task/handoff/request_review/correction → true）
 *  - 线程手动状态文件 thread-state.json（用户 pause/archive/reopen，用户留痕，新消息自动激活）
 *  - 排序：等待回复置顶 → 待命 → 归档沉底
 *  - 新增 API /api/thread-action（pause/archive/reopen/wake）
 *
 * 用法：node msg-panel-server.mjs [port]   默认 8899
 *      浏览器打开 http://127.0.0.1:8899/
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.resolve(__dirname, '..');
const INBOX = path.join(MESSAGES_DIR, 'inbox');
const OUTBOX = path.join(MESSAGES_DIR, 'outbox');
const ARCHIVE = path.join(MESSAGES_DIR, 'archive');
const THREAD_STATE_FILE = path.join(__dirname, 'thread-state.json');

const AGENTS = ['codebuddy', 'workbuddy', 'deepseek', 'doubao', 'user', 'qwen'];
const AGENT_NAMES = {codebuddy:'CodeBuddy', workbuddy:'WorkBuddy', deepseek:'DeepSeek', doubao:'豆包', 'qwen':'千问', user:'您'};
const PORT = parseInt(process.argv[2] || '8899', 10);

let agentsStatusCache = null, agentsStatusCacheAt = 0;
function detectAgentsStatus() {
  const now = Date.now();
  if (agentsStatusCache && now - agentsStatusCacheAt < 8000) return agentsStatusCache;
  const out = { hub_running:false, deepseek_watcher_running:false, panel_running:true, ts:nowUTC() };
  try {
    const script = "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | ForEach-Object { $_.CommandLine }";
    const b64 = Buffer.from(script, 'utf16le').toString('base64');
    const res = execFileSync('powershell.exe', ['-NoProfile','-EncodedCommand',b64], { encoding:'utf-8', timeout:5000, windowsHide:true, stdio:['ignore','pipe','ignore'] });
    for (const l of res.split(/\r?\n/)) {
      if (l.includes('agent-hub-watcher')) out.hub_running = true;
      if (l.includes('inbox-watcher')) out.deepseek_watcher_running = true;
    }
  } catch (e) { /* detect fail, keep default */ }
  agentsStatusCache = out; agentsStatusCacheAt = now;
  return out;
}
function jsonRes(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data, null, 2));
}

function readDir(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.json')) continue;
    try { out.push(JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'))); }
    catch { /* skip bad */ }
  }
  return out;
}

// 收集所有消息，按 message_id 去重（inbox 优先于 outbox/archive）
// v0.2.1：同一 message_id 的多个 inbox 副本（cc/多选）合并接收者到 _toAll
function collectAll() {
  const all = [];
  const seen = new Set();
  const byId = new Map();
  const mergeTo = (m, to) => {
    if (!to) return;
    const list = String(to).split(',').map(s => s.trim()).filter(Boolean);
    for (const t of list) {
      if (!m._toAll.includes(t)) m._toAll.push(t);
    }
  };
  const add = (m, loc) => {
    if (!m || !m.message_id) return;
    if (!seen.has(m.message_id)) {
      seen.add(m.message_id);
      m = { ...m, _location: loc, _toAll: [] };
      mergeTo(m, m.to);
      byId.set(m.message_id, m);
      all.push(m);
    } else {
      // 相同 message_id 的副本：合并接收者（cc / 多选投递）
      const ex = byId.get(m.message_id);
      mergeTo(ex, m.to);
    }
  };
  for (const a of AGENTS) {
    for (const m of readDir(path.join(INBOX, a))) add(m, `inbox/${a}`);
    for (const m of readDir(path.join(OUTBOX, a))) add(m, `outbox/${a}`);
  }
  for (const m of readDir(ARCHIVE)) add(m, 'archive');
  return all;
}

function nowUTC() { return new Date().toISOString(); }
function tsFilename() { return new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, ''); }

// 原子写入（v0.2 协议）
function writeMsgAtomic(target, obj) {
  const tmp = target + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(obj, null, 2), 'utf-8');
  fs.renameSync(tmp, target);
}

// ===== 会话状态（v2.2，会话状态规范 v0.1）=====
// 手动线程状态文件：thread_id → { state:'idle'|'archived', ts, by }
function loadThreadState() {
  try { return JSON.parse(fs.readFileSync(THREAD_STATE_FILE, 'utf-8')); }
  catch { return {}; }
}
function saveThreadState(st) { writeMsgAtomic(THREAD_STATE_FILE, st); }

// 消息是否需要对方回复：显式 need_reply 优先，否则按类型推导
const NEEDS_REPLY_TYPES = ['question', 'task', 'handoff', 'request_review', 'correction'];
function inferNeedReply(m) {
  if (typeof m.need_reply === 'boolean') return m.need_reply;
  return NEEDS_REPLY_TYPES.includes(m.type);
}
const TERMINAL_STATUS = ['replied', 'done', 'aborted'];

// 线程会话状态：三态（可逆，正交于任务状态）
function threadSessionState(t, threadState) {
  const msgs = t._messages;
  if (!msgs.length) return 'idle';
  const latest = msgs.map(m => m.timestamp || '').sort().slice(-1)[0] || '';
  const manual = threadState[t._taskKey];
  // 用户手动状态优先（时间锁：直到有新消息才恢复自动判定 → "发消息即激活"）
  if (manual && (!latest || String(manual.ts) >= latest)) return manual.state;
  // 自动判定：存在"需要回复"且未终结的消息 → 等待回复
  const waiting = msgs.some(m => inferNeedReply(m) && !TERMINAL_STATUS.includes(m.status || ''));
  return waiting ? 'active_waiting' : 'idle';
}

// 可读化的任务名
function humanizeKey(key) {
  if (!key) return '未分类任务';
  const map = {
    'multi-agent-comm-proposal': '多智能体通信方案',
    'l3-watcher': 'L3 自动唤醒机制',
  };
  if (map[key]) return map[key];
  // t_<message_id> 形式 → 尝试取原消息 subject
  if (key.startsWith('t_')) return '对话 ' + key.slice(2, 12);
  return key.replace(/[-_]/g, ' ').slice(0, 30) || key;
}

// 线程聚合：按「任务」分组
// 任务 key 优先级：非空 thread_id > 沿 reply_to 继承 > 自身 message_id
function buildThreads(messages) {
  const byId = {};
  for (const m of messages) byId[m.message_id] = m;

  // 1. 直接有 thread_id 的
  for (const m of messages) if (m.thread_id) m._taskKey = m.thread_id;

  // 2. 沿 reply_to 继承 taskKey（迭代直到稳定）
  let changed = true;
  while (changed) {
    changed = false;
    for (const m of messages) {
      if (m._taskKey) continue;
      if (m.reply_to && byId[m.reply_to] && byId[m.reply_to]._taskKey) {
        m._taskKey = byId[m.reply_to]._taskKey;
        changed = true;
      }
    }
  }
  // 3. 仍未分组的用自身 message_id 自成一任务
  for (const m of messages) if (!m._taskKey) m._taskKey = 't_' + m.message_id;

  // 4. 按 taskKey 分组
  const groups = new Map();
  for (const m of messages) {
    if (!groups.has(m._taskKey)) groups.set(m._taskKey, []);
    groups.get(m._taskKey).push(m);
  }

  // 5. 每组内建 reply 树 + 计算标题
  const threads = [];
  for (const [key, msgs] of groups) {
    for (const m of msgs) m._replies = [];
    const roots = [];
    for (const m of msgs) {
      if (m.reply_to && byId[m.reply_to] && msgs.includes(byId[m.reply_to])) {
        byId[m.reply_to]._replies.push(m);
      } else {
        roots.push(m);
      }
    }
    for (const m of msgs) m._replies.sort((a, b) => (a.timestamp || '').localeCompare(b.timestamp || ''));
    roots.sort((a, b) => (a.timestamp || '').localeCompare(b.timestamp || ''));

    // 任务标题：优先用户发起的 task/question，其次任意 task，否则可读化 key
    const taskMsg = msgs.find(m => m.from === 'user' && (m.type === 'task' || m.type === 'question'))
      || msgs.find(m => m.type === 'task')
      || msgs.find(m => m.from === 'user')
      || null;
    const title = taskMsg && taskMsg.subject ? taskMsg.subject : humanizeKey(key);

    // 参与人集合（v0.2.1：多接收者用 _toAll 合并）
    const participants = new Set();
    msgs.forEach(m => {
      participants.add(m.from);
      if (m._toAll && m._toAll.length) m._toAll.forEach(t => participants.add(t));
      else participants.add(m.to);
    });

    threads.push({
      _taskKey: key,
      _title: title,
      _roots: roots,
      _messages: msgs,
      _participants: [...participants],
      _earliest: msgs.map(m => m.timestamp || '').sort()[0] || '',
      _latest: msgs.map(m => m.timestamp || '').sort().slice(-1)[0] || '',
    });
  }

  // 标记任务级状态 + 消息级状态（兼容旧 UI）与 会话状态（v2.2 三态）
  // 消息级（v0.2.1）：以消息 status 字段为准（接收方智能体主动标记），旧数据兜底推导
  //   status=replied → 已回复；read → 已读；pending → 待批；done → 已完成；aborted → 已取消
  //   status=unread 或缺失 → 兜底：有子回复视为已回复，发给 user 且需回应类型 → 待您回应，否则未回复
  // 仅「需要用户回应」的类型进待回应区（ack/info 等无需回应的发给 user 视为已读）
  const NEEDS_USER_REPLY = ['question', 'task', 'handoff', 'request_review', 'correction'];
  const threadState = loadThreadState();
  for (const t of threads) {
    let needUser = false, anyUnreplied = false, anyReplied = false;
    for (const m of t._messages) {
      const s = m.status;
      if (s === 'replied') { m._state = 'replied'; anyReplied = true; }
      else if (s === 'read') { m._state = 'read'; anyUnreplied = true; }
      else if (s === 'pending') { m._state = 'pending'; anyUnreplied = true; }
      else if (s === 'done') { m._state = 'done'; anyReplied = true; }
      else if (s === 'aborted') { m._state = 'aborted'; anyReplied = true; }
      else {
        // unread / 缺失 → 兜底推导（兼容旧数据）
        if (m._replies.length > 0) { m._state = 'replied'; anyReplied = true; }
        else if (m.to === 'user' && NEEDS_USER_REPLY.includes(m.type)) { m._state = 'need_user'; needUser = true; anyUnreplied = true; }
        else if (m.to === 'user') { m._state = 'read'; anyUnreplied = true; } // ack/info 无需回应 → 已读
        else { m._state = 'unreplied'; anyUnreplied = true; }
      }
    }
    t._state = needUser ? 'need_user' : (anyUnreplied && !anyReplied ? 'unreplied' : (anyUnreplied ? 'partly' : 'replied'));
    // 待您回应明细：发给 user、需回应的类型、且尚未回复的消息
    t._needUserMsgs = t._messages.filter(m =>
      m.to === 'user' && NEEDS_USER_REPLY.includes(m.type) && !['replied', 'done', 'aborted'].includes(m._state)
    );
    // 会话状态（v2.2）：正交于任务状态，三态可逆
    t._sstate = threadSessionState(t, threadState);
  }

  // 排序（v2.2）：等待回复置顶 → 待命 → 归档沉底；同级按最新消息时间倒排
  const sorder = { active_waiting: 0, idle: 1, archived: 2 };
  threads.sort((a, b) => {
    const d = (sorder[a._sstate] ?? 1) - (sorder[b._sstate] ?? 1);
    return d !== 0 ? d : (b._latest || '').localeCompare(a._latest || '');
  });
  threads.forEach((t, i) => t._no = 'T' + (i + 1));
  return threads;
}

// 找所有待用户回应的任务
function findNeedUser(threads) {
  return threads.filter(t => t._needUserMsgs.length > 0);
}

function collectBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', c => { body += c; if (body.length > 1e6) req.destroy(); });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

// 生成 thread_id（基于主题，URL 安全短串）
function genThreadId(subject) {
  const base = String(subject || '').replace(/[^\w\u4e00-\u9fa5]/g, '').slice(0, 12) || 'task';
  return `u-${Date.now().toString(36)}-${base}`;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const p = url.pathname;

  if (p === '/' || p === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fs.readFileSync(path.join(__dirname, 'msg-panel.html')));
    return;
  }
  if (p === '/favicon.ico') { res.writeHead(204); res.end(); return; }

  if (p === '/api/messages') {
    const messages = collectAll();
    const threads = buildThreads(messages);
    const needUser = findNeedUser(threads);
    return jsonRes(res, 200, { messages, agents: AGENTS.filter(a => a !== 'user'), threads, needUser, agentNames: AGENT_NAMES });

  }

  if (p === '/api/agents-status') {
    return jsonRes(res, 200, detectAgentsStatus());
  }

  // 用户发布新对话（@一个或多个智能体）
  if (p === '/api/send' && req.method === 'POST') {
    try {
      const data = JSON.parse(await collectBody(req));
      const { to, type, subject, content, priority } = data;
      // to 可以是数组或单个字符串
      const targets = Array.isArray(to) ? to : [to];
      const validTargets = targets.filter(t => t && t !== 'user' && AGENTS.includes(t));
      if (!validTargets.length) {
        return jsonRes(res, 400, { error: '请至少选择一位接收智能体' });
      }
      const autoSubject = (subject && subject.trim()) ? subject.trim() : String(content || '').trim().slice(0, 30) || '(未命名对话)';
      const threadId = genThreadId(autoSubject);
      const ts = nowUTC();
      const mid = `${tsFilename()}-user-${autoSubject.replace(/[\\/:*?"<>|]/g, '').slice(0, 20)}`;
      const baseMsg = {
        schema_version: '0.2', message_id: mid, from: 'user', cc: [],
        timestamp: ts, type: type || 'question', subject: autoSubject,
        body: content || '', attachments: [], status: 'unread',
        priority: priority || 'normal', thread_id: threadId, reply_to: '',
        action: '', due_at: '', sender_note: 'user-panel/v2.1',
      };
      const outboxDir = path.join(OUTBOX, 'user');
      fs.mkdirSync(outboxDir, { recursive: true });
      // 每个接收者 inbox 一份（to 单独标记），outbox 留档一份
      for (const target of validTargets) {
        const inboxDir = path.join(INBOX, target);
        fs.mkdirSync(inboxDir, { recursive: true });
        writeMsgAtomic(path.join(inboxDir, mid + '.json'), { ...baseMsg, to: target });
      }
      writeMsgAtomic(path.join(outboxDir, mid + '.json'), { ...baseMsg, to: validTargets.join(',') });
      return jsonRes(res, 200, { ok: true, message_id: mid, to: validTargets });
    } catch (e) { return jsonRes(res, 400, { error: 'bad json: ' + e.message }); }
  }

  // 用户回复某条消息
  if (p === '/api/reply' && req.method === 'POST') {
    try {
      const data = JSON.parse(await collectBody(req));
      const { reply_to, content, type } = data;
      if (!reply_to || !content || !content.trim()) return jsonRes(res, 400, { error: '需 reply_to 和 content' });
      const all = collectAll();
      const target = all.find(m => m.message_id === reply_to);
      if (!target) return jsonRes(res, 400, { error: '找不到原消息 ' + reply_to });
      let to = target.from;
      if (to === 'user') to = (target.to !== 'user' ? target.to : 'doubao');
      if (!AGENTS.includes(to) || to === 'user') to = 'doubao';
      const autoSubject = 'Re: ' + (target.subject || '').slice(0, 25);
      const mid = `${tsFilename()}-user-re${reply_to.slice(-10)}`;
      const msg = {
        schema_version: '0.2', message_id: mid, from: 'user', to, cc: [],
        timestamp: nowUTC(), type: type || 'question', subject: autoSubject,
        body: content, attachments: [], status: 'unread',
        priority: 'normal', thread_id: target.thread_id || '', reply_to,
        action: '', due_at: '', sender_note: 'user-panel/v2.1',
      };
      const inboxDir = path.join(INBOX, to);
      const outboxDir = path.join(OUTBOX, 'user');
      fs.mkdirSync(inboxDir, { recursive: true });
      fs.mkdirSync(outboxDir, { recursive: true });
      writeMsgAtomic(path.join(inboxDir, mid + '.json'), msg);
      writeMsgAtomic(path.join(outboxDir, mid + '.json'), msg);

      // v0.2.1：用户回复后，把原消息在各类 inbox 副本上的 status 标记为 replied
      // （智能体发给 user 的消息可能在 inbox/user/ 或某个 agent 的 inbox）
      for (const a of [...AGENTS, 'user']) {
        const f = path.join(INBOX, a, reply_to + '.json');
        if (fs.existsSync(f)) {
          try {
            const m = JSON.parse(fs.readFileSync(f, 'utf-8'));
            if (m.status !== 'done' && m.status !== 'aborted') {
              m.status = 'replied';
              writeMsgAtomic(f, m);
            }
          } catch { /* 损坏文件跳过 */ }
        }
      }
      return jsonRes(res, 200, { ok: true, message_id: mid, to });
    } catch (e) { return jsonRes(res, 400, { error: e.message }); }
  }

  // 保留 /api/status（向后兼容，面板不再调用）
  if (p === '/api/status' && req.method === 'POST') {
    try {
      const { message_id, status } = JSON.parse(await collectBody(req));
      if (!['read', 'done', 'unread', 'replied', 'pending', 'aborted'].includes(status)) return jsonRes(res, 400, { error: 'status 非法' });
      let found = false;
      for (const a of AGENTS) {
        const f = path.join(INBOX, a, message_id + '.json');
        if (fs.existsSync(f)) {
          const m = JSON.parse(fs.readFileSync(f, 'utf-8'));
          m.status = status;
          writeMsgAtomic(f, m);
          found = true;
        }
      }
      return jsonRes(res, 200, { ok: found });
    } catch (e) { return jsonRes(res, 400, { error: e.message }); }
  }

  // 会话状态手动操作（v2.2）：pause/archive/reopen/wake，用户留痕
  // pause → idle（待命）；archive → archived（归档）；reopen/wake → 删除手动状态恢复自动判定
  if (p === '/api/thread-action' && req.method === 'POST') {
    try {
      const { thread_id, action } = JSON.parse(await collectBody(req));
      if (!thread_id) return jsonRes(res, 400, { error: '缺 thread_id' });
      if (!['pause', 'archive', 'reopen', 'wake'].includes(action)) return jsonRes(res, 400, { error: 'action 非法' });
      const ts = nowUTC();
      const st = loadThreadState();
      if (action === 'reopen' || action === 'wake') delete st[thread_id];
      else st[thread_id] = { state: action === 'pause' ? 'idle' : 'archived', ts, by: 'user' };
      saveThreadState(st);
      return jsonRes(res, 200, { ok: true, thread_id, action, state: st[thread_id] ? st[thread_id].state : 'auto' });
    } catch (e) { return jsonRes(res, 400, { error: e.message }); }
  }

  jsonRes(res, 404, { error: 'not found' });
});

server.listen(PORT, () => {
  console.log('[msg-panel v2.1] 面板已启动: http://127.0.0.1:' + PORT + '/');
});
