// gen-agent-bootstrap.mjs —— 智能体接入件生成器（方案 1.2-3）
// 用法：node 90-运行脚本/gen-agent-bootstrap.mjs          # 探测 + 打印将生成什么（默认 dry，零写入）
//       node 90-运行脚本/gen-agent-bootstrap.mjs --write   # 实际落盘（宿主注入件只写用户目录，须用户对动作本身授权）
// 设计：任何机器 clone 工作台后跑一次即完成全部已装宿主接线；未装宿主自动跳过。
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.argv.includes('--write');
const HOME = os.homedir();

// ---------- 三规则注入件正文（交接包 P0-1 草案原文，勿改语义） ----------
const WB_SECTION = `
## 项目家规与记忆落点（工作台 gen-agent-bootstrap 生成）
- 进入 \`01-项目\\<name>\` 动手前，先 Read 项目根 \`AGENTS.md\`，再按需读 \`project-memory.md\`；未读家规的产出视为违规。
- 踩坑、决策、验证结论写入**项目** \`project-memory.md\` 对应小节（二、项目经验 / 运行态留痕 / 模块快照），不得只写 \`.workbuddy/memory/\` 私有日志——私有记忆跨智能体互盲，已造成修复被下一位接手整块重写覆盖。
- 检测到上下文压缩，立即补一份 ≤300 字模块快照到项目 \`project-memory.md\`「模块快照」节。
`;

const HOSTS = [
  {
    id: 'workbuddy',
    detect: () => fs.existsSync(path.join(HOME, '.workbuddy')),
    channel: '~\\.workbuddy\\MEMORY.md（唯一保证注入通道）',
    plan: () => {
      const mem = path.join(HOME, '.workbuddy', 'MEMORY.md');
      const exists = fs.existsSync(mem);
      const already = exists && fs.readFileSync(mem, 'utf8').includes('项目家规与记忆落点');
      return [{ file: mem, mode: exists ? 'append' : 'create', skip: already ? '已含三规则节' : null, content: WB_SECTION }];
    },
  },
  {
    id: 'codebuddy',
    detect: () => fs.existsSync(path.join(HOME, '.codebuddy')),
    channel: '项目目录绑定 + project-rules（需绑到含 AGENTS.md 的目录）',
    plan: () => [{ file: path.join(ROOT, 'AGENTS.md'), mode: 'verify-exists', note: '根 AGENTS.md 已在则 CodeBuddy 绑定工作台根即可读到；零写入' }],
  },
  {
    id: 'qianwen',
    detect: () => true, // 千问工作助理：以会话当前项目根为准，无需宿主目录
    channel: '项目/工作台根 AGENTS.md（会话注入）',
    plan: () => [{ file: path.join(ROOT, 'AGENTS.md'), mode: 'verify-exists', note: '同上' }],
  },
];

console.log(`工作台根: ${ROOT}`);
console.log(`模式: ${WRITE ? 'WRITE（将落盘）' : 'DRY（仅打印，零写入）'}\n`);

const rows = [];
for (const h of HOSTS) {
  const installed = h.detect();
  if (!installed) {
    console.log(`[跳过] ${h.id}: 本机未探测到用户目录（${h.channel}）`);
    rows.push({ id: h.id, installed: false, action: '未装，跳过', status: '未接' });
    continue;
  }
  for (const item of h.plan()) {
    if (item.mode === 'verify-exists') {
      const ok = fs.existsSync(item.file);
      console.log(`[核验] ${h.id}: ${item.file} ${ok ? '存在' : '缺失!'} — ${item.note || ''}`);
      rows.push({ id: h.id, installed: true, action: ok ? '根 AGENTS.md 核验通过' : '根 AGENTS.md 缺失', status: ok ? '可用' : '异常' });
      continue;
    }
    if (item.skip) { console.log(`[已接] ${h.id}: ${item.file} — ${item.skip}`); rows.push({ id: h.id, installed: true, action: item.skip, status: '已接' }); continue; }
    const bytes = Buffer.byteLength(item.content, 'utf8');
    console.log(`[${WRITE ? '写入' : '将写'}] ${h.id}: ${item.file}（${item.mode} ${bytes} 字节，CRLF）`);
    if (WRITE) {
      const crlf = item.content.replace(/\r?\n/g, '\r\n');
      if (item.mode === 'create') fs.writeFileSync(item.file, crlf, 'utf8');
      else fs.appendFileSync(item.file, (fs.readFileSync(item.file, 'utf8').endsWith('\n') ? '' : '\r\n') + crlf, 'utf8');
      const back = fs.readFileSync(item.file, 'utf8');
      console.log(`  回读校验: ${back.includes('项目家规与记忆落点') ? 'OK' : 'FAIL!'}`);
      // 写前备份一次
      const bak = item.file + '.bak-' + new Date().toISOString().slice(0, 10).replace(/-/g, '');
      if (item.mode === 'append' && !fs.existsSync(bak)) fs.copyFileSync(item.file, bak);
    }
    rows.push({ id: h.id, installed: true, action: WRITE ? '三规则已落' : '待 --write（需用户授权）', status: WRITE ? '已接' : '待接' });
  }
}

// 接入名册台账（工作台层，追加式更新表）
const ledger = path.join(ROOT, '06-智能体记忆', '接入名册.md');
const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
const table = `
## 接入台账（gen-agent-bootstrap 最近一次运行：${stamp}，模式 ${WRITE ? 'write' : 'dry'}）

| 宿主 | 本机安装 | 注入通道 | 最近动作 | 状态 | 实测通过 |
|-|-|-|-|-|-|
${rows.map((r) => `| ${r.id} | ${r.installed ? '是' : '否'} | ${HOSTS.find((h) => h.id === r.id).channel} | ${r.action} | ${r.status} | 待零提示实测 |`).join('\n')}
`;
if (WRITE) {
  const head = fs.existsSync(ledger) ? fs.readFileSync(ledger, 'utf8') : '# 智能体接入名册\n\n> 各宿主注入通道与实测状态台账。生成段由 gen-agent-bootstrap 维护，人工段在下方「通道史」。\n\n## 通道史\n\n- WorkBuddy：不读项目 AGENTS.md，唯一保证通道 ~\\.workbuddy\\MEMORY.md（交接包 §一.1 实证）\n- 豆包/CodeBuddy：project-rules 需会话绑定含 AGENTS.md 的目录；豆包另有 mem://preference 通道（交接包 §一.2）\n- 千问：直接读项目/工作台根 AGENTS.md\n- DeepSeek：走 07-协作 收件箱（inbox-watcher），无宿主注入通道\n';
  const body = head.replace(/\n## 接入台账[\s\S]*$/, '') + table;
  fs.writeFileSync(ledger, body, 'utf8');
  console.log(`\n名册已更新: ${ledger}`);
} else {
  console.log('\n[dry] 名册未写。实写请加 --write（写 ~/.workbuddy/MEMORY.md 需用户对该动作直接授权）。');
  console.log(table);
}
