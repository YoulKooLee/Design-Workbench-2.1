#!/usr/bin/env node
/**
 * msg-cli.mjs — 多智能体消息 CLI 核心（node 实现，规避 Windows 中文路径 GBK/UTF-8 混乱）
 *
 * 用法：
 *   node msg-cli.mjs send --from codebuddy --to doubao --type question --subject "标题" --body-file ./body.md [--priority normal] [--cc workbuddy,deepseek] [--action do_task] [--due-at 2026-08-25T00:00:00Z] [--sender-note "codebuddy-cli/v1"]
 *   node msg-cli.mjs check --who codebuddy                # 列出未读
 *   node msg-cli.mjs read --who codebuddy [--id <message_id>]
 *   node msg-cli.mjs reply --from codebuddy --to doubao --reply-to <id> --subject "Re: ..." --body-file ./body.md
 *   node msg-cli.mjs archive --id <message_id> [--inbox doubao]
 *   node msg-cli.mjs ack --from codebuddy --to doubao --reply-to <id>   # 快速确认
 *
 * 说明：
 * - body 通过 --body-file 读 UTF-8 文件，避免命令行内联中文乱码。
 * - 所有消息为 UTF-8 JSON，路径统一绝对路径。
 * - v0.2 变更：原子写入（tmp+rename）、cc 物理多副本、新增字段 action/due_at/sender_note。
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// messages 目录 = tools 的上一级
const MESSAGES_DIR = path.resolve(__dirname, '..');
const SHARE_DIR = path.resolve(MESSAGES_DIR, '..'); // 共享信息目录
const INBOX = path.join(MESSAGES_DIR, 'inbox');
const OUTBOX = path.join(MESSAGES_DIR, 'outbox');
const ARCHIVE = path.join(MESSAGES_DIR, 'archive');

const AGENTS = ['codebuddy', 'workbuddy', 'deepseek', 'doubao', 'qwen'];
const TYPES = ['question', 'task', 'handoff', 'info', 'ack', 'request_review', 'correction'];
const PRIORITIES = ['low', 'normal', 'high'];

function nowUTC() {
  return new Date().toISOString();
}
function tsFilename() {
  // 2026-08-24T11:00:00Z -> 20260824T110000Z
  const d = new Date();
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/g, '');
}

function arg(args, name) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
}
function hasFlag(args, name) {
  return args.includes(name);
}

function fail(msg) {
  console.error('ERROR: ' + msg);
  process.exit(1);
}

// 读取 body 文件（UTF-8）
function readBodyFile(p) {
  if (!p) return '';
  const full = path.isAbsolute(p) ? p : path.resolve(process.cwd(), p);
  if (!fs.existsSync(full)) fail(`body file 不存在: ${full}`);
  return fs.readFileSync(full, 'utf-8');
}

// 原子写入：先写 .tmp 同卷，再 rename（避免接收方读到半截 JSON）
// 依据：DeepSeek 审阅发现原 writeFileSync 直接写目标，接收方可能读到损坏文件（已有 0 字节实证）。
function writeMsgAtomic(target, obj) {
  const tmp = target + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(obj, null, 2), 'utf-8');
  fs.renameSync(tmp, target);
}

// 把 to + 每个 cc 解析为去重收件人列表
function recipientsOf(to, cc) {
  const set = new Set();
  if (to) set.add(to);
  if (cc) for (const c of cc.split(',').map(s => s.trim()).filter(Boolean)) set.add(c);
  return [...set];
}

// 扫描收件箱，返回所有消息 JSON
function scanInbox(who, filterStatus) {
  const dir = path.join(INBOX, who);
  if (!fs.existsSync(dir)) return [];
  const msgs = [];
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.json')) continue;
    try {
      const m = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'));
      msgs.push({ file: f, msg: m });
    } catch { /* 跳过坏文件 */ }
  }
  return msgs;
}

// 找消息文件（by id）
function findMsg(who, id) {
  const dir = path.join(INBOX, who);
  const f = path.join(dir, id + '.json');
  return fs.existsSync(f) ? f : null;
}

function send(args) {
  const from = arg(args, '--from');
  const to = arg(args, '--to');
  const type = arg(args, '--type') || 'info';
  const subject = arg(args, '--subject') || '(无主题)';
  const body = readBodyFile(arg(args, '--body-file'));
  const priority = arg(args, '--priority') || 'normal';
  const replyTo = arg(args, '--reply-to') || '';
  const cc = arg(args, '--cc') || '';
  const action = arg(args, '--action') || '';
  const dueAt = arg(args, '--due-at') || '';
  const threadId = arg(args, '--thread-id') || '';
  const needReplyRaw = arg(args, '--need-reply');
  const senderNote = arg(args, '--sender-note') || `msg-cli/${AGENTS.indexOf(from) >= 0 ? 'agent' : 'unknown'}`;

  if (!from || !to) fail('需 --from 和 --to');
  if (!AGENTS.includes(from)) fail(`from 必须是 ${AGENTS.join('/')}`);
  if (!AGENTS.includes(to)) fail(`to 必须是 ${AGENTS.join('/')}`);
  if (!TYPES.includes(type)) fail(`type 必须是 ${TYPES.join('/')}`);

  const ts = nowUTC();
  const mid = `${tsFilename()}-${from}-${(subject.replace(/[\\/:*?"<>|]/g, '').slice(0, 20) || 'msg')}`;
  const msg = {
    schema_version: '0.2.1',
    message_id: mid,
    from, to,
    cc: cc ? cc.split(',').map(s => s.trim()).filter(Boolean) : [],
    timestamp: ts,
    type,
    subject,
    body,
    attachments: [],
    status: 'unread',
    priority,
    thread_id: threadId,
    reply_to: replyTo,
    // v0.2 新增字段
    action,
    due_at: dueAt,
    sender_note: senderNote,
    ...(needReplyRaw ? { need_reply: needReplyRaw === 'true' } : {}),
  };

  // 物理副本：to + 每个 cc 的 inbox 各放一份（message_id 相同）
  const recipients = recipientsOf(to, cc);
  for (const r of recipients) {
    const inboxDir = path.join(INBOX, r);
    fs.mkdirSync(inboxDir, { recursive: true });
    writeMsgAtomic(path.join(inboxDir, mid + '.json'), msg);
  }
  // 发送方 outbox 留一份不可变留档
  const outboxDir = path.join(OUTBOX, from);
  fs.mkdirSync(outboxDir, { recursive: true });
  writeMsgAtomic(path.join(outboxDir, mid + '.json'), msg);

  console.log(`[sent] -> inbox/${recipients.join(', ')}/${mid}.json`);
  console.log(`[copy] -> outbox/${from}/${mid}.json`);
}

function check(args) {
  const who = arg(args, '--who') || arg(args, '--from');
  if (!who) fail('需 --who');
  const msgs = scanInbox(who, 'unread');
  const unread = msgs.filter(x => x.msg.status === 'unread');
  const read = msgs.filter(x => x.msg.status !== 'unread');
  console.log(`\n=== ${who} 收件箱 ===`);
  console.log(`未读 ${unread.length} 条:`);
  for (const { msg } of unread) {
    console.log(`  [${msg.priority}] ${msg.timestamp} ${msg.from}->${msg.to} | ${msg.type} | ${msg.subject}`);
  }
  console.log(`已读/其他 ${read.length} 条:`);
  for (const { msg } of read) {
    console.log(`  [${msg.status}] ${msg.timestamp} ${msg.from}->${msg.to} | ${msg.type} | ${msg.subject}`);
  }
}

function read(args) {
  const who = arg(args, '--who') || arg(args, '--from');
  const id = arg(args, '--id');
  if (!who) fail('需 --who');
  if (!id) {
    // 列出未读详细
    const msgs = scanInbox(who);
    const unread = msgs.filter(x => x.msg.status === 'unread');
    if (!unread.length) { console.log(`[${who}] 无未读消息`); return; }
    for (const { msg } of unread) {
      console.log(`\n############ ${msg.message_id} ############`);
      console.log(`from: ${msg.from} | to: ${msg.to} | type: ${msg.type} | priority: ${msg.priority}`);
      console.log(`timestamp: ${msg.timestamp}`);
      console.log(`subject: ${msg.subject}`);
      if (msg.reply_to) console.log(`reply_to: ${msg.reply_to}`);
      console.log(`--- body ---`);
      console.log(msg.body);
      console.log('############ end ############\n');
      // 标记已读
      markStatus(path.join(INBOX, who, msg.message_id + '.json'), 'read');
    }
  } else {
    const f = findMsg(who, id);
    if (!f) fail(`未找到消息 ${id}`);
    const m = JSON.parse(fs.readFileSync(f, 'utf-8'));
    console.log(JSON.stringify(m, null, 2));
    markStatus(f, 'read');
  }
}

function markStatus(file, status) {
  if (!fs.existsSync(file)) return;
  const m = JSON.parse(fs.readFileSync(file, 'utf-8'));
  m.status = status;
  writeMsgAtomic(file, m);
}

function archive(args) {
  const id = arg(args, '--id');
  const inboxWho = arg(args, '--inbox');
  if (!id) fail('需 --id');
  // 先在所有 inbox 找
  const targets = inboxWho ? [inboxWho] : AGENTS;
  for (const who of targets) {
    const f = findMsg(who, id);
    if (f) {
      const month = new Date().toISOString().slice(0, 7); // 2026-08
      const dstDir = path.join(ARCHIVE, month);
      fs.mkdirSync(dstDir, { recursive: true });
      const dst = path.join(dstDir, path.basename(f));
      fs.copyFileSync(f, dst);
      fs.unlinkSync(f);
      console.log(`[archived] ${f} -> ${dst}`);
      return;
    }
  }
  fail(`未在任何 inbox 找到 ${id}`);
}

function reply(args) {
  const from = arg(args, '--from');
  const to = arg(args, '--to');
  const replyTo = arg(args, '--reply-to');
  const subject = arg(args, '--subject') || 'Re: (回复)';
  const body = readBodyFile(arg(args, '--body-file'));
  const cc = arg(args, '--cc') || '';
  const action = arg(args, '--action') || '';
  const dueAt = arg(args, '--due-at') || '';
  const type = arg(args, '--type') || 'ack';
  const priority = arg(args, '--priority') || 'normal';
  const needReplyRaw = arg(args, '--need-reply');
  const senderNote = arg(args, '--sender-note') || 'msg-cli/agent';
  if (!from || !to || !replyTo) fail('需 --from --to --reply-to');

  // v0.2.1：找原消息（在 from 自己的 inbox 或对方 inbox），继承 thread_id
  let origThreadId = '';
  const origFile = path.join(INBOX, from, replyTo + '.json');
  if (fs.existsSync(origFile)) {
    try { origThreadId = JSON.parse(fs.readFileSync(origFile, 'utf-8')).thread_id || ''; } catch {}
  }
  if (!origThreadId) {
    const origInTo = path.join(INBOX, to, replyTo + '.json');
    if (fs.existsSync(origInTo)) {
      try { origThreadId = JSON.parse(fs.readFileSync(origInTo, 'utf-8')).thread_id || ''; } catch {}
    }
  }

  const ts = nowUTC();
  const mid = `${tsFilename()}-${from}-re-${replyTo}`;
  const msg = {
    schema_version: '0.2.1',
    message_id: mid, from, to,
    cc: cc ? cc.split(',').map(s=>s.trim()).filter(Boolean) : [],
    timestamp: ts, type, subject,
    body, attachments: [], status: 'unread',
    priority, thread_id: origThreadId || replyTo, reply_to: replyTo,
    action, due_at: dueAt, sender_note: senderNote,
    ...(needReplyRaw ? { need_reply: needReplyRaw === 'true' } : {}),
  };
  const recipients = recipientsOf(to, cc);
  for (const r of recipients) {
    const inboxDir = path.join(INBOX, r);
    fs.mkdirSync(inboxDir, { recursive: true });
    writeMsgAtomic(path.join(inboxDir, mid + '.json'), msg);
  }
  const outboxDir = path.join(OUTBOX, from);
  fs.mkdirSync(outboxDir, { recursive: true });
  writeMsgAtomic(path.join(outboxDir, mid + '.json'), msg);

  // v0.2.1：回复后把原消息（from 自己 inbox 副本）标记为 replied
  if (fs.existsSync(origFile)) {
    markStatus(origFile, 'replied');
    console.log(`[replied] 原消息 ${replyTo} 已标记 replied`);
  }
  console.log(`[replied] -> ${recipients.join(', ')}/inbox/${mid}.json`);
}

// ---- main ----
const cmd = process.argv[2];
const args = process.argv.slice(3);
switch (cmd) {
  case 'send': send(args); break;
  case 'check': check(args); break;
  case 'read': read(args); break;
  case 'reply': reply(args); break;
  case 'archive': archive(args); break;
  default:
    console.log('用法见文件头注释。支持: send / check / read / reply / archive');
    process.exit(1);
}
