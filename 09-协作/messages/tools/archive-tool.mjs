#!/usr/bin/env node
// ============================================================
// archive-tool.mjs — 归档已处理消息（防上下文/存储过载）
// 版本：v1.0（2026-08-27，用户批准：协议文档瘦身 + 启用归档）
// 作用：把「已处理终态」的消息副本从 inbox/outbox 移入 archive/，
//       收件箱只保留待处理+最近活跃 → 智能体开会话读收件箱时上下文瘦身。
//       归档后历史仍保留在 archive/，面板 collectAll 会读取，可追溯。
// 用法：
//   node archive-tool.mjs                # 预览（dry-run，默认 7 天）
//   node archive-tool.mjs --run          # 实际执行（7 天）
//   node archive-tool.mjs --run --force  # 实际执行：归档所有已处理终态（忽略天数）
//   node archive-tool.mjs --run --days 2 # 实际执行：2 天
// 必须用系统 node（C:\Program Files\nodejs\node.exe）运行
// ============================================================
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const INBOX = path.join(ROOT, 'inbox');
const OUTBOX = path.join(ROOT, 'outbox');
const ARCHIVE = path.join(ROOT, 'archive');
const LOG = path.join(__dirname, 'archive-tool.log');
const AGENTS = ['codebuddy', 'workbuddy', 'deepseek', 'doubao', 'user', 'qwen'];

const args = process.argv.slice(2);
const RUN = args.includes('--run');
const FORCE = args.includes('--force');
const daysIdx = args.indexOf('--days');
const TTL_DAYS = daysIdx >= 0 ? parseInt(args[daysIdx + 1], 10) : 7;
const TTL_MS = TTL_DAYS * 24 * 3600 * 1000;
// 已处理终态（可归档）；read/unread/pending 属待处理，不归档
const TERMINAL = ['replied', 'done', 'aborted'];

function logOut(l) {
  console.log(l);
  try { fs.appendFileSync(LOG, `[${new Date().toISOString()}] ${l}\n`, 'utf-8'); } catch {}
}

fs.mkdirSync(ARCHIVE, { recursive: true });

// 1. 收集所有消息副本
const copies = [];
for (const a of AGENTS) {
  for (const sub of ['inbox', 'outbox']) {
    const dir = path.join(ROOT, sub, a);
    if (!fs.existsSync(dir)) continue;
    let files;
    try { files = fs.readdirSync(dir); } catch { continue; }
    for (const f of files) {
      if (!f.endsWith('.json')) continue;
      let m;
      try { m = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')); } catch { continue; }
      copies.push({ msg: m, file: f, dir, sub, agent: a });
    }
  }
}

// 2. 按 message_id 分组
const byId = {};
for (const c of copies) {
  const k = c.msg.message_id;
  if (!byId[k]) byId[k] = [];
  byId[k].push(c);
}

// 3. 筛选候选：已处理终态 + 超过 TTL（或 --force）
const now = Date.now();
const candidates = [];
for (const [mid, group] of Object.entries(byId)) {
  const m = group[0].msg;
  if (!TERMINAL.includes(m.status)) continue;
  const ts = new Date(m.timestamp || 0).getTime();
  const age = now - ts;
  if (!FORCE && age < TTL_MS) continue;
  candidates.push({ mid, group, msg: m, ageDays: (age / 86400000).toFixed(1) });
}
candidates.sort((a, b) => (a.msg.timestamp || '').localeCompare(b.msg.timestamp || ''));

// 4. 执行
logOut(`=== 归档工具 v1.0 === 模式=${RUN ? '执行' : '预览(dry-run)'} force=${FORCE} TTL=${TTL_DAYS}天 | 消息副本文件=${copies.length} 条, 候选=${candidates.length} 条`);
for (const c of candidates) {
  const from = c.msg.from, to = c.msg.to;
  const subj = (c.msg.subject || '').slice(0, 40);
  const n = c.group.length;
  if (!RUN) { logOut(`  [预览] ${c.mid} (${c.ageDays}天, ${n}副本) ${from}->${to} ${subj}`); continue; }
  const inboxCopy = c.group.find(g => g.sub === 'inbox') || c.group[0];
  const target = path.join(ARCHIVE, c.mid + '.json');
  if (fs.existsSync(target)) {
    for (const g of c.group) fs.rmSync(path.join(g.dir, g.file), { force: true });
    logOut(`  [归档] ${c.mid} 已存在于 archive，仅清理 ${n} 副本`);
    continue;
  }
  fs.renameSync(path.join(inboxCopy.dir, inboxCopy.file), target);
  for (const g of c.group) if (g !== inboxCopy) fs.rmSync(path.join(g.dir, g.file), { force: true });
  logOut(`  [归档] ${c.mid} (${c.ageDays}天) → archive/（保留1份，清理${n - 1}副本）`);
}
if (candidates.length === 0) logOut('  无满足条件的消息');
logOut('=== 完成 ===');
