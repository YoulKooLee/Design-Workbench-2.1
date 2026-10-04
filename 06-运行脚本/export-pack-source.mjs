#!/usr/bin/env node
// ============================================================
// export-pack-source.mjs — 可复现的白名单打包导出（T1）
// 从 git HEAD 导出发布版 workbench 源（不含用户数据/协作数据/文档）
// 用法：node 06-运行脚本/export-pack-source.mjs [目标目录]
// 默认目标：08-文档/打包输出-v2/workbench/
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ---- 白名单（只导出这些顶层条目；源中不存在的自动跳过并提示）----
// 打包范围（用户 2026-10-04 指令）：除 03-组件库 组件外，其他输出文档不纳入打包。
// 保留：组件库（核心资产）+ 运行必需（模板/脚本/面板/桌面应用源码）；排除：04-维护台账 等文档类。
const WHITELIST = [
  '02-模板',          // 模板中央库（含 _project-template 知识库/规则/skills，功能必需）
  '03-组件库',        // 组件库（页面模板/组件资产，用户点名必须打包）
  '06-运行脚本',      // 运行脚本
  '工作台面板',       // 面板 server/renderer
  '工作台桌面应用',   // Electron 源码（不含 node_modules/dist，由 git 跟踪状态保证）
];
// 源中不存在但任务书点名过的条目（跳过并提示）
const WHITELIST_ABSENT = ['00-工作台', 'README.md'];

// ---- 明确排除（路径段命中任一即报错；.git 指目录段，不含 .gitignore/.gitkeep 文件名）----
const EXCLUDE_SEGMENTS = new Set(['08-文档', '09-协作', '10-智能体记忆', '04-维护台账', 'node_modules', '.git']);
const EXCLUDE_PREFIX = ['08-文档/', '09-协作/', '10-智能体记忆/', '04-维护台账/', '.git/', '工作台桌面应用/dist/'];

// ---- 导出后必须创建的空目录（用户数据/运行时目录，分发版留空）----
const EMPTY_DIRS = [
  { dir: '01-项目', note: '用户项目（分发版为空，运行时创建）' },
  { dir: '07-日志', note: '运行日志（分发版为空，运行时创建）' },
];

// 目标目录：参数或默认
const DEST = path.resolve(process.argv[2] || path.join(ROOT, '08-文档', '打包输出-v2', 'workbench'));

function sh(args, opts = {}) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...opts });
}

function main() {
  console.log('[export] 目标目录:', DEST);
  console.log('[export] 读取 git HEAD 跟踪清单 …');
  const tracked = sh(['ls-tree', '-r', 'HEAD', '--name-only']).split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  console.log('[export] HEAD 跟踪文件总数:', tracked.length);

  // 过滤：顶层段 ∈ 白名单，且不命中排除前缀
  const picked = tracked.filter((f) => {
    const top = f.split('/')[0];
    if (!WHITELIST.includes(top)) return false;
    for (const p of EXCLUDE_PREFIX) {
      if (f === p.replace(/\/$/, '') || f.startsWith(p)) return false;
    }
    return true;
  });
  console.log('[export] 白名单命中文件数:', picked.length);

  // 提示源中缺失的白名单条目
  for (const w of WHITELIST_ABSENT) {
    if (!tracked.some((f) => f === w || f.startsWith(w + '/'))) {
      console.log('[export] 提示：', w, '在 HEAD 中不存在，跳过（任务书已点名，属预期）');
    }
  }
  // 提示被排除的顶层目录是否有跟踪文件（应全部排除）
  for (const x of ['08-文档', '09-协作', '10-智能体记忆', '04-维护台账']) {
    const n = tracked.filter((f) => f.startsWith(x + '/')).length;
    console.log(`[export] 排除检查：${x}/ 跟踪文件 ${n} 个（应全部排除）`);
  }

  // 清理旧目标（仅 v2 目录内，不影响 08-文档/打包输出/ 旧产物）
  if (fs.existsSync(DEST)) {
    console.log('[export] 清空旧目标目录 …');
    fs.rmSync(DEST, { recursive: true, force: true });
  }
  fs.mkdirSync(DEST, { recursive: true });

  // 逐文件从 HEAD 写回（git show HEAD:<path>，保证与 HEAD 一致）
  const counts = {};
  let written = 0;
  for (const f of picked) {
    const top = f.split('/')[0];
    const out = path.join(DEST, f);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const buf = execFileSync('git', ['show', `HEAD:${f}`], { cwd: ROOT, maxBuffer: 64 * 1024 * 1024 });
    fs.writeFileSync(out, buf);
    written++;
    counts[top] = (counts[top] || 0) + 1;
  }

  // 空目录 + .gitkeep
  for (const e of EMPTY_DIRS) {
    const d = path.join(DEST, e.dir);
    fs.mkdirSync(d, { recursive: true });
    fs.writeFileSync(path.join(d, '.gitkeep'), `${e.note}\n`, 'utf8');
    console.log(`[export] 空目录就位：${e.dir}/（${e.note}）`);
  }

  console.log('[export] 已导出文件数:', written);
  console.log('[export] 各目录文件数:');
  for (const [k, v] of Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]))) {
    console.log(`  ${k}/ : ${v}`);
  }

  // ---- 自检：排除项在导出目录零命中 ----
  console.log('[export] 自检（排除项扫描）…');
  const selfCheck = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name === '.git') continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else selfCheck.push(path.relative(DEST, full).replace(/\\/g, '/'));
    }
  })(DEST);
  const bad = selfCheck.filter((f) => f.split('/').some((seg) => EXCLUDE_SEGMENTS.has(seg)));
  if (bad.length) {
    console.error('[export] 自检失败！导出目录命中排除项：');
    for (const b of bad.slice(0, 30)) console.error('  HIT:', b);
    process.exit(1);
  }
  console.log('[export] 自检通过：导出目录中 08-文档/09-协作/10-智能体记忆/04-维护台账/node_modules/.git 目录段零命中（共扫描', selfCheck.length, '个文件）');

  // ---- 版本记录 ----
  const head = sh(['rev-parse', 'HEAD']).trim();
  const tag = (() => { try { return sh(['describe', '--tags', '--always', 'HEAD']).trim(); } catch { return '(无 tag)'; } })();
  fs.writeFileSync(path.join(DEST, 'EXPORT-MANIFEST.txt'),
    `导出来源: git HEAD ${head}\n导出时标签: ${tag}\n导出时间: ${new Date().toISOString()}\n白名单: ${WHITELIST.join(', ')}\n排除: ${[...EXCLUDE_SEGMENTS].join(', ')}\n`, 'utf8');
  // BUILD.md：重打包指引（自动生成，防止清空重建后丢失）
  fs.writeFileSync(path.join(DEST, 'BUILD.md'),
    `# 发布版 Workbench 源（打包输出-v2）\n\n` +
    `> 本目录由 \`06-运行脚本/export-pack-source.mjs\` 从 **git HEAD** 白名单导出（HEAD=${head}）。\n` +
    `> 打包范围（2026-10-04 用户指令）：**除 03-组件库 组件外，其他输出文档不纳入打包**。\n\n` +
    `## 包含\n- 组件：\`03-组件库/\`（4352 文件，核心资产，必须打包）\n` +
    `- 运行必需：\`02-模板/\`（项目/知识库/规则/Skill 依赖）、\`06-运行脚本/\`、\`工作台面板/\`、\`工作台桌面应用/\`（源码，不含 node_modules/dist）\n` +
    `- 空目录：\`01-项目/\`、\`07-日志/\`（含 .gitkeep，运行时生成）\n\n` +
    `## 排除（零命中自检）\n\`08-文档\` \`09-协作\` \`10-智能体记忆\` \`04-维护台账\` \`node_modules\` \`.git\` \`工作台桌面应用/dist\`\n\n` +
    `## 内置 tools（portable 运行时）\n- portable node：node-v22.23.2-win-x64（约 94.9MB），来源 \`08-文档/打包输出/tools/node\`（旧产物，勿删勿改）\n` +
    `- 引用：\`工作台桌面应用/package.json\` → \`build.extraResources\`\n\n` +
    `## 重打包步骤（详见 \`工作台桌面应用/BUILD-v2.md\`）\n` +
    `1. \`node 06-运行脚本/export-pack-source.mjs\`（刷新本目录为最新 HEAD）\n` +
    `2. \`工作台桌面应用/package.json\` extraResources 指向 \`../08-文档/打包输出-v2/workbench\` 与 \`../08-文档/打包输出/tools\`\n` +
    `3. \`工作台桌面应用\` 下 \`npm run dist\`（electron-builder 产出安装包）\n`, 'utf8');
  console.log('[export] 完成 →', DEST);
  console.log('[export] HEAD:', head, `(${tag})`);
}

try {
  main();
} catch (e) {
  console.error('[export] 失败:', e.message);
  process.exit(1);
}
