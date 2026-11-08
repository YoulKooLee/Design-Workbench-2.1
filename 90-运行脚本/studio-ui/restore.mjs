#!/usr/bin/env node
/**
 * Axhub Make 开发栈 · UI 补丁包恢复器
 * ---------------------------------------------------------------------------
 * 背景：补丁被写进 @axhub/make/dist/admin 里，只要 npm/pnpm 重装依赖、
 *      或有人跑了 --revert，补丁就会丢。这个脚本把补丁装回去。
 *
 * 用法：
 *   node restore.mjs                 # 装到「上下文装配测试」
 *   node restore.mjs --all           # 装到所有找到的项目
 *   node restore.mjs --list          # 只列出探测到的项目
 *   node restore.mjs --revert        # 回退（撤掉补丁，恢复原样）
 *   node restore.mjs --watch         # 守护：被还原就自动装回（Ctrl+C 退出）
 *   node restore.mjs --project "D:\...\01-项目\某项目"
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

/** 安装器可能在包根下的 studio-ui/，也可能与本脚本同级（同步回工作台后就是同级） */
function findApply() {
  const cands = [
    path.join(HERE, 'studio-ui', 'apply-studio-ui.mjs'),
    path.join(HERE, 'apply-studio-ui.mjs'),
  ];
  return cands.find((p) => fs.existsSync(p)) || cands[0];
}

const APPLY = findApply();

/** 默认项目根：本机工作台的 01-项目 目录 */
const PROJECT_ROOT = 'D:\\产品设计工作台\\01-项目';
/** 默认目标项目 */
const DEFAULT_PROJECT = '上下文装配测试';
/** 补丁特征文件，用来判断是否已被还原 */
const MARK_FILES = ['studio.css', 'studio-shell.css', 'studio.js', 'studio-shell.js', 'qr-encoder.js'];

const argv = process.argv.slice(2);
const has = (n) => argv.includes('--' + n);
const getArg = (n) => {
  const i = argv.indexOf('--' + n);
  return i > -1 ? argv[i + 1] : null;
};

const REVERT = has('revert');
const ALL = has('all');
const LIST = has('list');
const WATCH = has('watch');

function adminOf(project) {
  return path.join(project, 'node_modules', '@axhub', 'make', 'dist', 'admin');
}

/** 扫描项目根，返回所有装了 @axhub/make 的项目路径 */
function findProjects() {
  const out = [];
  const explicit = getArg('project');
  if (explicit) {
    if (fs.existsSync(adminOf(explicit))) out.push(explicit);
    return out;
  }
  if (!fs.existsSync(PROJECT_ROOT)) return out;
  for (const name of fs.readdirSync(PROJECT_ROOT)) {
    const p = path.join(PROJECT_ROOT, name);
    try {
      if (!fs.statSync(p).isDirectory()) continue;
    } catch {
      continue;
    }
    if (fs.existsSync(adminOf(p))) out.push(p);
  }
  return out;
}

/** 判断某项目当前是否带补丁 */
function patched(project) {
  const admin = adminOf(project);
  const idx = path.join(admin, 'index.html');
  if (!fs.existsSync(idx)) return false;
  const html = fs.readFileSync(idx, 'utf8');
  if (!html.includes('data-studio-ui')) return false;
  return MARK_FILES.every((f) => fs.existsSync(path.join(admin, 'assets', f)));
}

function run(project, revert) {
  const args = [APPLY, '--project', project, '--write'];
  if (revert) args.push('--revert');
  const r = spawnSync(process.execPath, args, { encoding: 'utf8' });
  const ok = r.status === 0;
  const head = path.basename(project);
  if (ok) {
    console.log(`${revert ? '已回退' : '已安装'}  ${head}`);
  } else {
    console.error(`${revert ? '回退' : '安装'}失败 ${head}`);
    console.error((r.stderr || r.stdout || '').trim().split('\n').slice(-4).join('\n'));
  }
  return ok;
}

function stamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function main() {
  if (!fs.existsSync(APPLY)) {
    console.error('补丁源文件缺失：studio-ui/apply-studio-ui.mjs');
    process.exit(1);
  }

  const projects = findProjects();
  if (!projects.length) {
    console.error(`没找到装了 @axhub/make 的项目。\n项目根：${PROJECT_ROOT}\n如果项目在别处，用 --project "路径" 指定。`);
    process.exit(1);
  }

  if (LIST) {
    for (const p of projects) console.log(`${patched(p) ? '[已打补丁]' : '[未打补丁]'}  ${p}`);
    return;
  }

  // 未指定 --all 时只处理默认项目（找不到就退化为第一个）
  let target = projects;
  if (!ALL && !getArg('project')) {
    const d = projects.find((p) => path.basename(p) === DEFAULT_PROJECT);
    target = [d || projects[0]];
  }

  if (!WATCH) {
    let fail = 0;
    for (const p of target) if (!run(p, REVERT)) fail++;
    if (fail) process.exit(1);
    return;
  }

  // ---- 守护模式 ----
  if (REVERT) {
    console.error('--watch 与 --revert 不能同时使用');
    process.exit(1);
  }
  console.log(`守护中，每 3 秒检查一次。被还原就自动装回。Ctrl+C 退出。`);
  for (const p of target) {
    if (!patched(p)) run(p, false);
    console.log(`  监视：${p}`);
  }
  const timer = setInterval(() => {
    for (const p of target) {
      if (!patched(p)) {
        console.log(`[${stamp()}] 检测到补丁丢失，正在装回…`);
        run(p, false);
      }
    }
  }, 3000);

  const stop = () => {
    clearInterval(timer);
    console.log('\n已停止守护。');
    process.exit(0);
  };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
}

main();
