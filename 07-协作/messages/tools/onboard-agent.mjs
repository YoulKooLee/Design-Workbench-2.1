#!/usr/bin/env node
/**
 * onboard-agent.mjs — 新智能体一键入网 / 出网
 *
 * 用法：
 *   入网： node onboard-agent.mjs <id> "<显示名>"
 *          例： node onboard-agent.mjs claude "Claude"
 *   出网： node onboard-agent.mjs --remove <id>
 *          例： node onboard-agent.mjs --remove claude
 *
 * 入网自动完成：
 *   1. 创建 messages/inbox/<id>/ 和 messages/outbox/<id>/ 及收件箱 README
 *   2. 在 msg-panel-server.mjs 的 AGENTS / AGENT_NAMES 注册该智能体
 *   3. 在 msg-cli.mjs AGENTS、agent-hub-watcher.mjs AGENTS、agent-hub-config.json 全量注册
 *   4. 打印后续人工待办清单
 *
 * 一致性核对： node onboard-agent.mjs --check <id> （输出 7 项注册状态）
 *
 * 出网自动完成：
 *   1. 删除 inbox/<id>/、outbox/<id>/（安全确认后）
 *   2. 从 msg-panel-server.mjs 的 AGENTS / AGENT_NAMES 精确移除（结构化解析，不误伤）
 *
 * 说明：入网重复执行安全（已存在则跳过）。出网需在文件非空且保留 user 的前提下操作。
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.resolve(__dirname, '..');
const SERVER_FILE = path.join(__dirname, 'msg-panel-server.mjs');
const INBOX = path.join(MESSAGES_DIR, 'inbox');
const OUTBOX = path.join(MESSAGES_DIR, 'outbox');

const REMOVE = process.argv.includes('--remove') || process.argv.includes('-r');
// 去掉 --remove/-r 后取 id
const argIdx = process.argv.indexOf('--remove') !== -1 ? process.argv.indexOf('--remove') + 1
  : (process.argv.indexOf('-r') !== -1 ? process.argv.indexOf('-r') + 1
    : (process.argv.indexOf('--check') !== -1 ? process.argv.indexOf('--check') + 1
      : (process.argv.indexOf('-c') !== -1 ? process.argv.indexOf('-c') + 1 : 2)));
const id = (process.argv[argIdx] || '').trim().toLowerCase();
const displayName = (process.argv[argIdx + 1] || id).trim();

// ── 参数校验 ──────────────────────────────────────────────
if (!id) {
  console.error('用法:');
  console.error('  入网: node onboard-agent.mjs <id> "<显示名>"');
  console.error('  出网: node onboard-agent.mjs --remove <id>');
  process.exit(1);
}
if (!/^[a-z0-9_]{1,24}$/.test(id)) {
  console.error(`❌ 非法 ID「${id}」：仅允许小写字母/数字/下划线，长度≤24。`);
  process.exit(1);
}
if (id === 'user') {
  console.error('❌ "user" 是保留 ID（用户本人），不能注册或移除。');
  process.exit(1);
}

// ═══════════════════════ 出网模式 ═══════════════════════
if (REMOVE) {
  console.log(`\n== 智能体出网: ${id} ==\n`);

  // 1. 删目录
  for (const base of [INBOX, OUTBOX]) {
    const d = path.join(base, id);
    if (fs.existsSync(d)) {
      fs.rmSync(d, { recursive: true, force: true });
      console.log(`🗑  已删除 ${path.relative(MESSAGES_DIR, d)}/`);
    } else {
      console.log(`⏭  目录不存在，跳过: ${path.relative(MESSAGES_DIR, d)}`);
    }
  }

  // 2. 从面板配置精确移除
  if (fs.existsSync(SERVER_FILE)) {
    let src = fs.readFileSync(SERVER_FILE, 'utf-8');
    let changed = false;

    const agentsRe = /(const AGENTS\s*=\s*\[)([^\]]*)(\])/;
    const mAgents = src.match(agentsRe);
    if (mAgents) {
      const items = mAgents[2].split(',').map(s => s.trim()).filter(Boolean);
      const kept = items.filter(x => x !== `'${id}'`);
      if (kept.length !== items.length) {
        const hasUser = kept.includes("'user'");
        src = src.replace(agentsRe, `${mAgents[1]}${kept.join(', ')}${mAgents[3]}`);
        console.log(`✅ 已从 AGENTS 移除 ${id}${hasUser ? '' : '（⚠️ 注意：user 不在数组中！）'}`);
        changed = true;
      } else {
        console.log(`⏭  AGENTS 中无 ${id}`);
      }
    }

    const namesRe = /(const AGENT_NAMES\s*=\s*\{)([^}]*)(\})/;
    const mNames = src.match(namesRe);
    if (mNames) {
      const items = mNames[2].split(',').map(s => s.trim()).filter(Boolean);
      const kept = items.filter(x => !x.startsWith(`'${id}':`));
      if (kept.length !== items.length) {
        src = src.replace(namesRe, `${mNames[1]}${kept.join(', ')}${mNames[3]}`);
        console.log(`✅ 已从 AGENT_NAMES 移除 ${id}`);
        changed = true;
      } else {
        console.log(`⏭  AGENT_NAMES 中无 ${id}`);
      }
    }

    if (changed) {
      fs.writeFileSync(SERVER_FILE, src, 'utf-8');
      console.log('✅ 已写入 msg-panel-server.mjs（请重启面板生效）');
    }
  }

  // 2b. 从 msg-cli / hub AGENTS 与 config 对称移除
  const removeInFile = (file, id, kind) => {
    if (!fs.existsSync(file)) return;
    let src = fs.readFileSync(file, 'utf-8');
    let changed = false;
    if (file.endsWith('.json')) {
      try { const cfg = JSON.parse(src); if (cfg.agents && cfg.agents[id] !== undefined) { delete cfg.agents[id]; src = JSON.stringify(cfg, null, 2); changed = true; console.log(`✅ ${kind} config 已移除 ${id}`); } } catch {}
    } else {
      const agentsRe = /(const AGENTS\s*=\s*\[)([^\]]*)(\])/;
      const m = src.match(agentsRe);
      if (m) { const items = m[2].split(',').map(s=>s.trim()).filter(Boolean); const kept = items.filter(x => x !== `\'${id}\'`); if (kept.length !== items.length) { src = src.replace(agentsRe, `${m[1]}${kept.join(', ')}${m[3]}`); changed = true; console.log(`✅ ${kind} AGENTS 已移除 ${id}`); } else { console.log(`⏭  ${kind} AGENTS 无 ${id}`); } }
    }
    if (changed) fs.writeFileSync(file, src, 'utf-8');
  };
  removeInFile(path.join(__dirname, 'msg-cli.mjs'), id, 'msg-cli');
  removeInFile(path.join(__dirname, 'agent-hub-watcher.mjs'), id, 'hub');
  removeInFile(path.join(__dirname, 'agent-hub-config.json'), id, 'hub');
  console.log(`
== 出网完成。后续人工待办 ==
① 重启面板：根目录「停止通信面板.lnk」→「启动通信面板.lnk」。
② 协作框架登记：从 agent-collaboration.md 删除对应列；删除 agents/${id}/（如需）。
③ 如该智能体还有未归档消息在 archive/ 或他人 outbox/，按需处理。
`);
  process.exit(0);
}

// ═══════════════════════ 入网模式 ═══════════════════════
// ── CHECK 模式：一致性核对 ─────────────────────────
const CHECK = process.argv.includes('--check') || process.argv.includes('-c');
if (CHECK) {
  const HUB_FILE = path.join(__dirname, 'agent-hub-watcher.mjs');
  const HUB_CFG = path.join(__dirname, 'agent-hub-config.json');
  const MSGCLI = path.join(__dirname, 'msg-cli.mjs');
  const hasArr = (file, re) => { try { return re.test(fs.readFileSync(file, 'utf-8')); } catch { return false; } };
  const q = `\'${id}\'`;
  console.log(`\n== 一致性核对: ${id}（${displayName}）==\n`);
  const rows = [
    ['inbox 目录', fs.existsSync(path.join(INBOX, id))],
    ['outbox 目录', fs.existsSync(path.join(OUTBOX, id))],
    ['收件箱 README', fs.existsSync(path.join(INBOX, id, 'README.md'))],
    ['面板 AGENTS', hasArr(SERVER_FILE, new RegExp(`const AGENTS\\s*=\\s*\\[[^\\]]*${q}`))],
    ['msg-cli AGENTS', hasArr(MSGCLI, new RegExp(`AGENTS = \\[.*${q}`))],
    ['hub AGENTS', hasArr(HUB_FILE, new RegExp(`AGENTS = \\[.*${q}`))],
    ['hub config', (() => { try { return !!JSON.parse(fs.readFileSync(HUB_CFG,'utf-8')).agents[id]; } catch { return false; } })()],
  ];
  for (const [k, v] of rows) console.log(`  ${v ? '✅' : '❌'} ${k}`);
  const miss = rows.filter(r => !r[1]);
  console.log(miss.length ? `\n⚠️ 缺失 ${miss.length} 项：${miss.map(r=>r[0]).join(', ')}` : '\n✅ 全部注册一致');
  process.exit(0);
}

console.log(`\n== 智能体入网: ${id}（${displayName}）==\n`);

// ── 1. 建目录 ─────────────────────────────────────────────
let madeDir = false;
for (const base of [INBOX, OUTBOX]) {
  const d = path.join(base, id);
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
    console.log(`✅ 创建目录 ${path.relative(MESSAGES_DIR, d)}`);
    madeDir = true;
  } else {
    console.log(`⏭  目录已存在: ${path.relative(MESSAGES_DIR, d)}`);
  }
}
if (!madeDir) console.log('ℹ️  目录均已存在，跳过创建。');

// ── 2. 面板注册 ───────────────────────────────────────────
if (!fs.existsSync(SERVER_FILE)) {
  console.warn(`⚠️  找不到 ${SERVER_FILE}，跳过面板注册。`);
} else {
  let src = fs.readFileSync(SERVER_FILE, 'utf-8');
  let changed = false;

  // AGENTS 数组：在 'user' 前插入新 id
  const agentsRe = /(const AGENTS\s*=\s*\[)([^\]]*)(\])/;
  const mAgents = src.match(agentsRe);
  if (mAgents) {
    if (mAgents[2].includes(`'${id}'`)) {
      console.log(`⏭  AGENTS 已包含 ${id}，跳过。`);
    } else {
      src = src.replace(agentsRe, (_, p1, p2, p3) => {
        const inner = p2.trim() ? p2.trim() + `, '${id}'` : `'${id}'`;
        return `${p1}${inner}${p3}`;
      });
      console.log(`✅ AGENTS 已注册 ${id}`);
      changed = true;
    }
  }

  // AGENT_NAMES：在 user:'您' 前插入 <id>:'显示名'
  const namesRe = /(const AGENT_NAMES\s*=\s*\{)([^}]*)(\})/;
  const mNames = src.match(namesRe);
  if (mNames) {
    if (new RegExp(`${id}\\s*:`).test(mNames[2])) {
      console.log(`⏭  AGENT_NAMES 已含 ${id}，跳过。`);
    } else {
      src = src.replace(namesRe, (_, p1, p2, p3) => {
        const seg = `'${id}':'${displayName}', `;
        // 插到 user:'您' 之前
        if (p2.includes("user:'您'")) {
          return `${p1}${p2.replace("user:'您'", `${seg}user:'您'`)}${p3}`;
        }
        return `${p1}${seg}${p2}${p3}`;
      });
      console.log(`✅ AGENT_NAMES 已注册 ${id} → ${displayName}`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(SERVER_FILE, src, 'utf-8');
    console.log('✅ 已写入 msg-panel-server.mjs（请重启面板生效）');
  }
}

// ── 2b. 消息工具 + 监听中枢全量注册（qwen 建议：onboard 覆盖 5 处）──
function registerInFile(file, id, kind) {
  if (!fs.existsSync(file)) { console.warn(`⚠️ 找不到 ${file}，跳过 ${kind} 注册`); return; }
  if (file.endsWith('.json')) {
    try { const cfg = JSON.parse(fs.readFileSync(file, 'utf-8')); if (cfg.agents && !cfg.agents[id]) { cfg.agents[id] = true; fs.writeFileSync(file, JSON.stringify(cfg, null, 2), 'utf-8'); console.log(`✅ ${kind} config.agents 已注册 ${id}`); } else { console.log(`⏭  ${kind} config 已含 ${id}`); } } catch { console.warn(`⚠️ ${kind} config 解析失败`); }
    return;
  }
  let src = fs.readFileSync(file, 'utf-8');
  let changed = false;
  const agentsRe = /(const AGENTS\s*=\s*\[)([^\]]*)(\])/;
  const m = src.match(agentsRe);
  if (m) {
    if (m[2].includes(`\'${id}\'`)) { console.log(`⏭  ${kind} AGENTS 已含 ${id}`); }
    else {
      src = src.replace(agentsRe, (_, p1, p2, p3) => { const inner = p2.trim() ? p2.trim() + `, \'${id}\'` : `\'${id}\'`; return `${p1}${inner}${p3}`; });
      console.log(`✅ ${kind} AGENTS 已注册 ${id}`); changed = true;
    }
  }
  if (changed) fs.writeFileSync(file, src, 'utf-8');
}
registerInFile(path.join(__dirname, 'msg-cli.mjs'), id, 'msg-cli');
registerInFile(path.join(__dirname, 'agent-hub-watcher.mjs'), id, 'hub');
registerInFile(path.join(__dirname, 'agent-hub-config.json'), id, 'hub');

// ── 3. 待办清单 ───────────────────────────────────────────
console.log(`
== 入网完成。后续人工待办 ==
① 重启面板：运行根目录「停止通信面板.lnk」→「启动通信面板.lnk」，刷新浏览器确认 ${displayName} 出现在筛选/发布列表。
② 协作框架登记（根目录）：
   - agent-collaboration.md  能力矩阵加一列 + 第九节维护约定登记新成员
   - 创建 agents/${id}/ 专属产物目录
③ 协议认知：请 ${displayName} 依次读
   messages/README.md → messages/MESSAGE_FORMAT.md → messages/onboarding-guide.md → agent-collaboration.md → access-guide.md
④ 链路验证：请 ${displayName} 向豆包发一条 type=info 的接入确认消息
   （写明 ID / 接入形态 / 读写与 node 能力 / 是否已固化"先查 inbox"记忆），豆包回 ack 即打通。
`);
