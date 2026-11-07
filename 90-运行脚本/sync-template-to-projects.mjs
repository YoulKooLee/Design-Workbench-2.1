'use strict';
// 批7：模板定稿口径同步到存量项目（跟版脚本，可复用）
// 用法：node 90-运行脚本/sync-template-to-projects.mjs [--dry] [--project <名>]
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
const ROOT = 'D:/产品设计工作台';
const TPL = path.join(ROOT, '02-模板/_project-template');
const DRY = process.argv.includes('--dry');
const only = (() => { const i = process.argv.indexOf('--project'); return i > 0 ? process.argv[i + 1] : null; })();
const HASH = execSync('git rev-parse --short HEAD', { cwd: ROOT, encoding: 'utf8' }).trim();

const projects = fs.readdirSync(path.join(ROOT, '01-项目')).filter((n) => {
  if (only && n !== only) return false;
  const p = path.join(ROOT, '01-项目', n);
  try { return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'AGENTS.md')); } catch (e) { return false; }
});
console.log('目标项目:', projects.join(', '), '| 模板基线', HASH, DRY ? '(dry)' : '');

const CLAUDE_NEW = `# CLAUDE.md

> 本文件仅为宿主入口占位，不含家规正文。
> **动手前必须先 Read 仓库根目录 \`AGENTS.md\` 全文**——工作流程、规范、红线全在那里。
> 项目记忆在 \`project-memory.md\`，基线文档在 \`docs/\`；发现它们不在上下文里 → 一并重读。
`;

let total = 0;
for (const p of projects) {
  const P = path.join(ROOT, '01-项目', p);
  const log = (m) => console.log(' ', p + ':', m);
  const edit = (file, pairs, must = false) => {
    const fp = path.join(P, file);
    if (!fs.existsSync(fp)) { if (must) log('✗ 缺 ' + file); return; }
    let t = fs.readFileSync(fp, 'utf8');
    const before = t;
    let hits = 0;
    for (const [o, n] of pairs) if (t.includes(o)) { t = t.split(o).join(n); hits++; }
    if (t !== before && !DRY) fs.writeFileSync(fp, t, 'utf8');
    if (hits) { total += hits; log('✓ ' + file + ' 改 ' + hits + ' 处'); }
  };
  const ensure = (file, content) => {
    const fp = path.join(P, file);
    const cur = fs.existsSync(fp) ? fs.readFileSync(fp, 'utf8') : '';
    if (cur.includes('动手前必须先 Read')) { log('- ' + file + ' 已含硬指令'); return; }
    if (!DRY) fs.writeFileSync(fp, content, 'utf8');
    total++; log('✓ ' + file + '（重写，含硬指令）');
  };

  // 0) AGENTS 改前存历史版本（纪律：08-文档/历史版本/AGENTS历史版本/）
  const hist = path.join(ROOT, '08-文档', '历史版本', 'AGENTS历史版本');
  if (!DRY && fs.existsSync(path.join(P, 'AGENTS.md'))) {
    fs.mkdirSync(hist, { recursive: true });
    const stamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '').slice(0, 12);
    fs.copyFileSync(path.join(P, 'AGENTS.md'), path.join(hist, stamp + '_' + p + '_AGENTS-跟版前.md'));
  }

  // 1) AGENTS 口径：§4.3 行 + 画图死链行
  edit('AGENTS.md', [
    ['| 索引层 | `project-memory.md` | 任务进度 / 决策记录 / 变更流水 / 模块快照，只放摘要 + 路径，不放正文 |',
     '| 索引层 | `project-memory.md` | 任务进度 / 决策记录 / 变更流水 / 模块快照：只放摘要 + 路径；正文落 `docs/` 与项目答疑手册 |'],
    ['| 过程与索引 | `project-memory.md`（只放摘要 + 路径，不放正文） |',
     '| 过程与索引 | `project-memory.md`（只放摘要 + 路径；正文落 docs/ 与答疑手册） |'],
    ['| 画图（架构图 / 流程图 / 时序图） | `../../91-运行状态/办公数据/画图/README.md` |',
     '| 画图（架构图 / 流程图 / 时序图） | `.agents/skills/d2-diagram/SKILL.md`（预检与降级）+ `.agents/knowledge/diagram/`（规范） |'],
  ]);

  // 2) CLAUDE.md 硬指令
  ensure('CLAUDE.md', CLAUDE_NEW);

  // 3) design-notes-conventions → 模板指针版
  const convSrc = path.join(TPL, '.agents/rules/design-notes-conventions.md');
  const convDst = path.join(P, '.agents/rules/design-notes-conventions.md');
  if (fs.existsSync(convDst) && !fs.readFileSync(convDst, 'utf8').includes('指针文件')) {
    if (!DRY) fs.copyFileSync(convSrc, convDst);
    total++; log('✓ design-notes-conventions（模板指针版覆盖）');
  }

  // 4) v3.0 设计说明组件：项目无则从模板补
  for (const f of ['DesignNotesPanel.tsx', 'designNotesTypes.ts']) {
    const dst = path.join(P, 'src/common', f);
    if (!fs.existsSync(dst)) { if (!DRY) { fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.copyFileSync(path.join(TPL, 'src/common', f), dst); } total++; log('✓ 组件补入 ' + f); }
  }

  // 5) 幽灵引用技能：跟版＝模板真源整文件覆盖（模板侧批4已修全部引用；项目差异仅历史拷贝）
  for (const s of ['systematic-debugging', 'test-driven-development', 'slides', 'd2-diagram']) {
    const src = path.join(TPL, '.agents/skills', s, 'SKILL.md');
    const dst = path.join(P, '.agents/skills', s, 'SKILL.md');
    if (!fs.existsSync(src) || !fs.existsSync(dst)) continue;
    if (!DRY && fs.readFileSync(dst, 'utf8') !== fs.readFileSync(src, 'utf8')) fs.copyFileSync(src, dst);
    total++; log('✓ 技能覆盖 ' + s);
  }
  // 6) 装配版本戳
  const ax = path.join(P, '.axhub');
  const af = path.join(ax, 'assembly.json');
  const stamp = {
    template: '_project-template',
    templateHash: HASH,
    syncedAt: new Date().toISOString().slice(0, 19),
    appliedBatches: ['批1 CLAUDE硬指令', '批1 design-notes v3.0口径', '批2 §4.3口径', '批4 技能幽灵引用', '批4b 技能分批指针', '批5 目录重排引用', '批7 本同步'],
    note: '跟版基线由 90-运行脚本/sync-template-to-projects.mjs 维护',
  };
  if (!DRY) { fs.mkdirSync(ax, { recursive: true }); fs.writeFileSync(af, JSON.stringify(stamp, null, 2), 'utf8'); }
  log('✓ .axhub/assembly.json（版本戳 ' + HASH + '）');
}
console.log(DRY ? '[dry] 预演完成，共 ' + total + ' 处待改' : '完成，共 ' + total + ' 处');
