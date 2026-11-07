#!/usr/bin/env node
/**
 * room-cli.mjs — 任务房间命令 v0.3.2（智能体协作对话工具）
 *
 * 用法：
 *   node room-cli.mjs open "<任务名>" --m 甲,乙 [--who <id>]
 *   node room-cli.mjs read [--who <id>]
 *   node room-cli.mjs read <房间名> [--who <id>]
 *   node room-cli.mjs say <房间名> "内容" [--i intent] [--who <id>] [--body-file <utf8文件>]
 *   node room-cli.mjs board <房间名> "内容" [--s 进展|结论|下一步|说明] [--who <id>] [--body-file <utf8文件>]
 *   node room-cli.mjs handoff <房间名> <接棒方> "内容" [--who <id>] [--body-file <utf8文件>]
 *   node room-cli.mjs put <房间名> <文件路径> [--who <id>] [--force]
 *   node room-cli.mjs status <房间名> <状态> [--who <id>]
 *
 * v0.3.2 修复 B8（2026-09-18，qwen 报告+实证+修复）：
 *   updateBoardMeta() 正则带 ^ 锚定，匹配不到 open() 生成的带「- 」列表前缀的元信息行
 *   → 白板「状态」「接棒人」两字段写入静默失效（命令返回 {ok:true}、消息流也记了，
 *     但文件原样写回）。实测全部 9 个房间状态无一例外卡在 active。
 *   修法：① 正则改 `^([-*\s]*)${key}[:：]\s*.*$`，捕获并保留原前缀（向后兼容存量房间）；
 *         ② 两分支都失败时返回 false；③ status() 改为写入失败即 return {error} 且不记消息流
 *           （消除"日志说改了、白板没改"的假成功）；④ handoff() 返回值新增 boardUpdated，
 *           失败附 boardWarn（消息流仍留痕，审计价值不丢）。
 *   验证：8 项实测全过（含可逆写入、前缀保留、失败分支报错且不污染消息流、room read 解析）。
 *   详见 rooms/千问_工作台三重审查整改闭环/产物/qwen-B8修复回报-room-cli白板写入失效-2026-09-18.md
 *
 * v0.3.1 修复（2026-09-05，豆包维护，测试 P0）：
 *   4. say/board/handoff 支持 --body-file：UTF-8 文件读正文并剥离 BOM，规避 PowerShell GBK 乱码
 *      （qwen 亲历事故：长中文正文走 shell 参数必乱码）。
 *   5. put 防同名覆盖：目标产物已存在且未传 --force 时拒绝（提示用 --force 或 <who>- 前缀），
 *      避免 A 覆盖 B 的产物（已发生 DeepSeek 覆盖 CodeBuddy 产物事故）。
 *
 * v0.3 增强（借鉴 Multi-Agent 协作模式）：
 *   1. 白板机制：00-任务说明.md 是持续更新的"白板"（目标/进展/结论/下一步/接棒人），
 *      智能体进房先读白板（room read 返回白板+消息），不必翻全部对话 → 降上下文负担。
 *   2. Handoff 接力：room handoff 显式把"当前接棒人"交给对方并留痕，防踢皮球
 *      （检测 A→B→A 往返 ≥2 次自动提醒交用户仲裁）。
 *   3. 审计字段：每条消息带 intent（ask/review/handoff/confirm/info）+ 身份 + 时间戳，
 *      复盘能说清"谁在何时做了什么决定"。
 *
 * 房间目录在 <工作区根>/rooms/；身份默认取环境变量 AGENT_ID。
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE = path.resolve(__dirname, '..', '..'); // 共享信息目录根
const ROOMS = path.join(WORKSPACE, 'rooms');
const AGENT_ID = process.env.AGENT_ID || 'unknown';
const VALID_STATUS = ['active', 'review', 'done', 'blocked'];
const VALID_INTENT = ['ask', 'review', 'handoff', 'confirm', 'info'];
const BOARD_SECTIONS = ['进展', '结论', '下一步', '说明'];

function argv() {
  const args = process.argv.slice(2);
  const out = { cmd: args[0], rest: [], who: AGENT_ID, members: [], intent: 'info', section: '进展' };
  for (let i = 1; i < args.length; i++) {
    const a = args[i];
    if (a === '--who') out.who = args[++i];
    else if (a === '--m') out.members = String(args[++i] || '').split(',').map(s => s.trim()).filter(Boolean);
    else if (a === '--i') out.intent = args[++i];
    else if (a === '--s') out.section = args[++i];
    else if (a === '--body-file') out.bodyFile = args[++i];
    else if (a === '--force') out.force = true;
    else out.rest.push(a);
  }
  return out;
}

function atomicWrite(file, data) {
  const tmp = file + '.tmp';
  fs.writeFileSync(tmp, data, 'utf-8');
  fs.renameSync(tmp, file);
}

// 从文件读正文（UTF-8，绕开命令行中文转义/乱码）——P0-2
function readBodyFile(p) {
  if (!p) return '';
  const full = path.isAbsolute(p) ? p : path.resolve(process.cwd(), p);
  return fs.readFileSync(full, 'utf-8').replace(/^\uFEFF/, '');
}

function nowTs() { return new Date().toISOString(); }

// 发起者显示名映射（房间命名用：<发起者显示名>_<任务名>，方便溯源）
const AGENT_DISPLAY = { doubao: '豆包', codebuddy: 'CodeBuddy', workbuddy: 'WorkBuddy', deepseek: 'DeepSeek', qwen: '千问', user: '用户' };

function slugify(name, who) {
  const clean = String(name).replace(/[\\/:*?"<>|]/g, '').trim().slice(0, 40);
  const prefix = AGENT_DISPLAY[who] || who;
  const base = `${prefix}_${clean}`;
  // 重名自动消歧：追加 _2/_3（防同名任务冲突）
  let room = base, n = 2;
  while (fs.existsSync(roomPath(room))) room = `${base}_${n++}`;
  return room;
}

function ensureRooms() { fs.mkdirSync(ROOMS, { recursive: true }); }
function roomPath(name) { return path.join(ROOMS, name); }
function specFile(name) { return path.join(roomPath(name), '00-任务说明.md'); }
function logFile(name) { return path.join(roomPath(name), 'messages.jsonl'); }
function prodDir(name) { return path.join(roomPath(name), '产物'); }

function listRooms(who) {
  ensureRooms();
  const dirs = fs.readdirSync(ROOMS).filter(d => {
    const full = path.join(ROOMS, d);
    return fs.statSync(full).isDirectory() && d !== '_archive';
  });
  const result = [];
  for (const d of dirs) {
    const spec = specFile(d);
    let title = d, members = [], status = '', holder = '';
    if (fs.existsSync(spec)) {
      const txt = fs.readFileSync(spec, 'utf-8');
      const t = /^#\s+(.+)$/m.exec(txt); if (t) title = t[1].trim();
      const m = /参与者[:：]\s*(.+)$/m.exec(txt); if (m) members = m[1].split(/[,，、\s]+/).filter(Boolean);
      const s = /状态[:：]\s*(.+)$/m.exec(txt); if (s) status = s[1].trim();
      const h = /接棒人[:：]\s*(.+)$/m.exec(txt); if (h) holder = h[1].trim();
    }
    if (!who || who === 'unknown' || members.includes(who)) {
      result.push({ room: d, title, members, status, holder });
    }
  }
  return result;
}

function readLog(name) {
  const logF = logFile(name);
  const msgs = [];
  if (fs.existsSync(logF)) {
    for (const line of fs.readFileSync(logF, 'utf-8').split('\n')) {
      if (!line.trim()) continue;
      try { msgs.push(JSON.parse(line)); } catch { /* skip */ }
    }
  }
  return msgs;
}

function appendLog(name, entry) {
  const line = JSON.stringify(entry) + '\n';
  const logF = logFile(name);
  if (fs.existsSync(logF)) fs.appendFileSync(logF, line, 'utf-8');
  else fs.writeFileSync(logF, line, 'utf-8');
}

/** 解析白板（00-任务说明.md）为结构化字段：按段标题切分 */
function parseBoard(name) {
  const specF = specFile(name);
  if (!fs.existsSync(specF)) return {};
  const txt = fs.readFileSync(specF, 'utf-8').replace(/\r\n/g, '\n');
  const out = {};
  let cur = null;
  for (const ln of txt.split('\n')) {
    const h = /^##\s+(.+)$/.exec(ln);
    if (h) { cur = h[1].trim(); out[cur] = []; continue; }
    if (cur) out[cur].push(ln);
  }
  for (const k of Object.keys(out)) out[k] = out[k].join('\n').replace(/\n+$/, '').trim();
  const h = /接棒人[:：]\s*(.+)$/m.exec(txt); if (h) out['接棒人'] = h[1].trim();
  const st = /状态[:：]\s*(.+)$/m.exec(txt); if (st) out['状态'] = st[1].trim();
  return out;
}

/** 更新白板某段落（section）：定位 `## section` 标题行，替换其后到下一个段标题的内容 */
function updateBoardSection(name, section, content, who) {
  const specF = specFile(name);
  let txt = fs.existsSync(specF) ? fs.readFileSync(specF, 'utf-8').replace(/\r\n/g, '\n') : '';
  const stamp = `[${who} ${nowTs()}] ${content}`;
  const re = new RegExp(`^##\\s*${section}\\s*\\n[\\s\\S]*?(?=^##\\s|$)`, 'm');
  if (re.test(txt)) {
    txt = txt.replace(re, (mm) => {
      const title = mm.split('\n')[0];
      const body = mm.slice(title.length).trim();
      return title + '\n' + (body ? body + '\n' : '') + stamp + '\n\n';
    });
  } else {
    // 追加新段落：插到"任务说明"段之后
    const headRe = /^##\s*任务说明\s*\n[\s\S]*?(?=^##\s|$)/m;
    if (headRe.test(txt)) {
      txt = txt.replace(headRe, (mm) => mm.replace(/\n+$/, '') + '\n\n## ' + section + '\n' + stamp + '\n');
    } else {
      txt = txt.replace(/\n*$/, '') + '\n\n## ' + section + '\n' + stamp + '\n';
    }
  }
  atomicWrite(specF, txt);
  return stamp;
}

/**
 * 更新白板元信息（接棒人/状态）
 *
 * v0.3.2 修复 B8（2026-09-18，qwen 报告并实证）：
 *   open() 生成的元信息行带列表前缀「- 状态：active」，而原正则 `^${key}[:：]` 带 ^ 锚定，
 *   匹配不到带前缀的行 → 走 else 分支，`/^状态[:：]/m` 同样匹配不到 → replace 无效，
 *   文件原样写回，函数却无返回值，调用方（status/handoff）照常返回 {ok:true}。
 *   后果：白板「状态」「接棒人」两个字段静默失效（读得到、改不动；
 *   parseBoard 的正则未带 ^ 锚定，所以读取正常，掩盖了写入失败）。
 *   现兼容任意列表前缀（- / * / 空白），替换时保留原前缀；两分支都失败返回 false。
 *
 * @returns {boolean} 是否真正写入成功
 */
function updateBoardMeta(name, key, value) {
  const specF = specFile(name);
  let txt = fs.existsSync(specF) ? fs.readFileSync(specF, 'utf-8').replace(/\r\n/g, '\n') : '';
  // 捕获组 1 = 原行的列表前缀（"- " / "* " / 空白 / 空），替换时原样保留
  const re = new RegExp(`^([-*\\s]*)${key}[:：]\\s*.*$`, 'm');
  const m = re.exec(txt);
  if (m) {
    txt = txt.replace(re, `${m[1]}${key}：${value}`);
    atomicWrite(specF, txt);
    return true;
  }
  // 白板缺该字段：插到「状态」行之前，保持元信息区顺序（同样保留前缀）
  const anchor = /^([-*\s]*)状态[:：]/m.exec(txt);
  if (anchor) {
    txt = txt.replace(/^([-*\s]*)状态[:：]/m, `${anchor[1]}${key}：${value}\n${anchor[1]}状态：`);
    atomicWrite(specF, txt);
    return true;
  }
  return false;
}

/** 检测踢皮球：最近 handoff 是否 A→B→A 往返 ≥2 次 */
function detectPingPong(name) {
  const msgs = readLog(name).filter(m => m.intent === 'handoff' && m.from && m.to);
  if (msgs.length < 2) return { risk: false };
  const seq = msgs.map(m => `${m.from}->${m.to}`);
  // 统计相邻往返对 (A->B, B->A) 出现次数
  let backAndForth = 0;
  for (let i = 0; i + 1 < seq.length; i++) {
    const [a, b] = seq[i].split('->');
    if (seq[i + 1] === `${b}->${a}`) backAndForth++;
  }
  return { risk: backAndForth >= 2, backAndForth, seq: seq.slice(-4) };
}

function readRoom(name, who) {
  const rp = roomPath(name);
  if (!fs.existsSync(rp)) return { error: '房间不存在: ' + name };
  const board = parseBoard(name);
  const msgs = readLog(name);
  return { name, board, messages: msgs };
}

function say(name, content, who, intent) {
  const rp = roomPath(name);
  if (!fs.existsSync(rp)) return { error: '房间不存在: ' + name };
  if (!VALID_INTENT.includes(intent)) return { error: 'intent 非法: ' + intent + '（可选 ' + VALID_INTENT.join('/') + '）' };
  const entry = { ts: nowTs(), from: who, intent, content };
  appendLog(name, entry);
  return { ok: true, room: name, entry };
}

function board(name, content, who, section) {
  const rp = roomPath(name);
  if (!fs.existsSync(rp)) return { error: '房间不存在: ' + name };
  if (!BOARD_SECTIONS.includes(section)) return { error: '段落非法: ' + section + '（可选 ' + BOARD_SECTIONS.join('/') + '）' };
  const stamp = updateBoardSection(name, section, content, who);
  return { ok: true, room: name, section, stamp };
}

function handoff(name, to, content, who) {
  const rp = roomPath(name);
  if (!fs.existsSync(rp)) return { error: '房间不存在: ' + name };
  if (!to) return { error: '缺少接棒方（handoff <房间> <接棒方> "内容"）' };
  const entry = { ts: nowTs(), from: who, to, intent: 'handoff', content: `[handoff→${to}] ${content}` };
  appendLog(name, entry);
  // B8：写入失败必须显式暴露，不能静默 ok（消息流已留痕，白板字段未更新）
  const boardUpdated = updateBoardMeta(name, '接棒人', to);
  const pp = detectPingPong(name);
  const warn = pp.risk
    ? `⚠️ 检测到接力往返（${pp.seq.join(' | ')}），已往返 ${pp.backAndForth} 次，建议交用户仲裁（协议：同一任务转交超 2 次强制用户裁决）。`
    : '';
  return {
    ok: true, room: name, entry, holder: to, pingpong: pp, warn,
    boardUpdated,
    ...(boardUpdated ? {} : { boardWarn: '⚠️ 消息流已记录 handoff，但白板「接棒人」字段写入失败（未匹配到元信息行），请手工校正 00-任务说明.md' }),
  };
}

function put(name, filePath, who, force) {
  const rp = roomPath(name);
  if (!fs.existsSync(rp)) return { error: '房间不存在: ' + name };
  if (!fs.existsSync(filePath)) return { error: '文件不存在: ' + filePath };
  fs.mkdirSync(prodDir(name), { recursive: true });
  const base = path.basename(filePath);
  const target = path.join(prodDir(name), base);
  if (fs.existsSync(target) && !force) {
    return { error: '产物已存在: ' + base + '（同名覆盖已禁止：请用 --force 覆盖，或文件命名带 <who>- 前缀避免冲突）' };
  }
  fs.copyFileSync(filePath, target);
  appendLog(name, { ts: nowTs(), from: who, intent: 'info', content: `[${who}] 放入产物: ${base}${force ? '（--force 覆盖）' : ''}` });
  return { ok: true, copied: target };
}

function status(name, st, who) {
  const rp = roomPath(name);
  if (!fs.existsSync(rp)) return { error: '房间不存在: ' + name };
  if (!VALID_STATUS.includes(st)) return { error: '状态非法: ' + st + '（可选 ' + VALID_STATUS.join('/') + '）' };
  // B8：先写白板，写入失败则报错且不记消息流（避免"日志说改了、白板没改"的假成功）
  const boardUpdated = updateBoardMeta(name, '状态', st);
  if (!boardUpdated) {
    return { error: `白板「状态」字段写入失败：00-任务说明.md 中未找到可匹配的状态行（房间 ${name}）。消息流未记录，请检查白板格式后重试。` };
  }
  appendLog(name, { ts: nowTs(), from: who, intent: 'confirm', content: `[${who}] 状态更新为 ${st}` });
  return { ok: true, room: name, status: st, boardUpdated };
}

function open(name, members, who) {
  ensureRooms();
  const room = slugify(name, who);
  const rp = roomPath(room);
  if (fs.existsSync(rp)) return { error: '房间已存在: ' + room };
  fs.mkdirSync(rp, { recursive: true });
  fs.mkdirSync(prodDir(room), { recursive: true });
  const spec = [
    `# ${name}`,
    '',
    `- 创建时间：${nowTs()}`,
    `- 创建人：${who}`,
    `- 参与者：${members.length ? members.join(', ') : who}`,
    `- 状态：active`,
    `- 接棒人：${members.length ? members[0] : who}`,
    '',
    '## 任务说明',
    '',
    '（由创建者补充任务目标）',
    '',
    '## 进展',
    '',
    '## 结论',
    '',
    '## 下一步',
    '',
  ].join('\n');
  fs.writeFileSync(specFile(room), spec, 'utf-8');
  appendLog(room, { ts: nowTs(), from: who, intent: 'info', content: `[${who}] 创建房间 ${room}` });
  return { ok: true, room, path: rp };
}

// 正文来源：--body-file 优先（UTF-8 文件），否则命令行位置参数拼接
function bodyText(a, startIdx) {
  if (a.bodyFile) return readBodyFile(a.bodyFile);
  return a.rest.slice(startIdx).join(' ');
}

function main() {
  const a = argv();
  const cmd = a.cmd;
  let res;
  switch (cmd) {
    case 'open': res = open(a.rest[0], a.members, a.who); break;
    case 'read':
      res = a.rest.length ? readRoom(a.rest[0], a.who) : listRooms(a.who);
      break;
    case 'say': res = say(a.rest[0], bodyText(a, 1), a.who, a.intent); break;
    case 'board': res = board(a.rest[0], bodyText(a, 1), a.who, a.section); break;
    case 'handoff': res = handoff(a.rest[0], a.rest[1], bodyText(a, 2), a.who); break;
    case 'put': res = put(a.rest[0], a.rest[1], a.who, a.force); break;
    case 'status': res = status(a.rest[0], a.rest[1], a.who); break;
    default:
      res = { error: '用法: open|read|say|board|handoff|put|status （详见文件头注释）' };
  }
  console.log(JSON.stringify(res, null, 2));
}

main();
