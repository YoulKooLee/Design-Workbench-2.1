#!/usr/bin/env node
/**
 * 工作台视觉层安装器（studio-ui）
 * ----------------------------------------------------------------------------
 * 把 studio.css / studio.js / qr-encoder.js 装进 @axhub/make 的 dist/admin，
 * 并在 index.html 里挂两行引用（幂等，可重复执行；带 --revert 可整体回退）。
 *
 * 用法：
 *   node apply-studio-ui.mjs --project "D:\产品设计工作台\01-项目\测试"           # 预演
 *   node apply-studio-ui.mjs --project "D:\产品设计工作台\01-项目\测试" --write   # 写入
 *   node apply-studio-ui.mjs --project "..." --revert --write                  # 回退
 *
 * 说明：npm/pnpm 重装或升级 @axhub/make 后 admin 目录会被覆盖，需要重跑本脚本。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = ['studio.css', 'studio.js', 'qr-encoder.js'];

const argv = process.argv.slice(2);
const getArg = (name) => {
  const i = argv.indexOf('--' + name);
  return i > -1 ? argv[i + 1] : null;
};
const WRITE = argv.includes('--write');
const REVERT = argv.includes('--revert');
const project = getArg('project');
const adminArg = getArg('admin');

const ADMIN = adminArg || (project ? path.join(project, 'node_modules', '@axhub', 'make', 'dist', 'admin') : null);
if (!ADMIN || !fs.existsSync(ADMIN)) {
  console.error('找不到 admin 目录:', ADMIN);
  process.exit(1);
}

const INDEX = path.join(ADMIN, 'index.html');
const BACKUP_DIR = path.join(ADMIN, '.patch-backup');
const BACKUP_INDEX = path.join(BACKUP_DIR, 'index.html');
const CSS_TAG = '<link rel="stylesheet" href="/assets/studio.css" data-studio-ui="css">';
const JS_TAG = '<script type="module" src="/assets/studio.js" data-studio-ui="js"></script>';

const log = (...a) => console.log(...a);

function breakHardlink(p) {
  try {
    if (fs.statSync(p).nlink <= 1) return false;
    const tmp = p + '.unlink-tmp';
    fs.copyFileSync(p, tmp);
    fs.unlinkSync(p);
    fs.renameSync(tmp, p);
    return true;
  } catch (e) {
    log('  ! 断链失败:', p, e.message);
    return false;
  }
}

function readIndex() {
  return fs.readFileSync(INDEX, 'utf8');
}

function stripTags(html) {
  return html
    .replace(/\n?[ \t]*<link[^>]*data-studio-ui="css"[^>]*>/g, '')
    .replace(/\n?[ \t]*<script[^>]*data-studio-ui="js"[^>]*><\/script>/g, '');
}

function injectTags(html) {
  let out = stripTags(html);
  if (!out.includes('</head>')) throw new Error('index.html 缺少 </head>');
  out = out.replace(/([ \t]*)<\/head>/, `$1  ${CSS_TAG}\n$1</head>`);
  if (!out.includes('</body>')) throw new Error('index.html 缺少 </body>');
  out = out.replace(/([ \t]*)<\/body>/, `$1  ${JS_TAG}\n$1</body>`);
  return out;
}

// ---------------------------------------------------------------- 主流程
log(`admin 目录: ${ADMIN}`);
log(`模式: ${REVERT ? '回退' : '安装'}${WRITE ? '（写盘）' : '（预演，加 --write 才落盘）'}`);

const current = readIndex();

if (REVERT) {
  if (!fs.existsSync(BACKUP_INDEX)) {
    console.error('没有找到备份 index.html，无法自动回退；可手工删除 studio 相关引用与 assets 文件。');
    process.exit(1);
  }
  const restored = fs.readFileSync(BACKUP_INDEX, 'utf8');
  log('将从备份恢复 index.html，并删除 assets 中的 3 个文件');
  if (WRITE) {
    breakHardlink(INDEX);
    fs.writeFileSync(INDEX, restored, 'utf8');
    for (const f of ASSETS) {
      const p = path.join(ADMIN, 'assets', f);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
    log('✓ 已回退');
  }
  process.exit(0);
}

// 1. 备份
if (WRITE && !fs.existsSync(BACKUP_INDEX)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  fs.copyFileSync(INDEX, BACKUP_INDEX);
  log(`✓ 备份 index.html → .patch-backup/index.html`);
} else if (!fs.existsSync(BACKUP_INDEX)) {
  log('· 首次运行将备份 index.html 到 .patch-backup/');
}

// 2. 拷贝资源
for (const f of ASSETS) {
  const src = path.join(HERE, f);
  const dst = path.join(ADMIN, 'assets', f);
  if (!fs.existsSync(src)) {
    console.error('缺少源文件:', src);
    process.exit(1);
  }
  const size = fs.statSync(src).size;
  log(`· ${f} → assets/${f}（${(size / 1024).toFixed(1)} KB）`);
  if (WRITE) {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }
}

// 3. 注入 index.html
const next = injectTags(current);
if (next === current) {
  log('· index.html 已是最新，无需改动');
} else {
  const added = next.split('\n').length - current.split('\n').length;
  log(`· index.html 需注入 ${CSS_TAG.includes('css') ? 2 : 0} 处引用（行数变化 ${added > 0 ? '+' : ''}${added}）`);
  if (WRITE) {
    breakHardlink(INDEX);
    fs.writeFileSync(INDEX, next, 'utf8');
    log('✓ 已写入 index.html');
  }
}

if (WRITE) {
  log('\n完成。刷新浏览器（Ctrl+F5）即可看到新版界面。');
  log('提示：若 @axhub/make 被重装/升级，需要重跑本脚本。');
} else {
  log('\n预演结束，未改动任何文件。');
}
