#!/usr/bin/env node
// 应用 03-组件库/01-补丁源 到项目（make 工程：组件页签补丁 + 设计说明模块），幂等。
// 用法：node apply-project-patches.mjs <projDir> [workbenchRoot] [--with-mem]
// 由 launch-project.ps1 在首次 pnpm install 后调用；也可手动对存量项目补打。
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const argv = process.argv.slice(2);
const flags = new Set(argv.filter((a) => a.startsWith('--')));
const positional = argv.filter((a) => !a.startsWith('--'));
const projDir = positional[0];
if (!projDir || !fs.existsSync(projDir)) { console.error('用法: node apply-project-patches.mjs <projDir> [workbenchRoot] [--with-mem]'); process.exit(1); }
// workbenchRoot：默认由脚本位置推导（90-运行脚本 的上级）
const workbenchRoot = positional[1] || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const patchRoot = path.join(workbenchRoot, '03-组件库', '01-补丁源');
const applied = [];
if (!fs.existsSync(patchRoot)) { console.log('PATCH_SKIP: 01-补丁源 不存在'); process.exit(0); }
// (1) @axhub/make 组件页签补丁（仅 make 工程有该包）
const mk = path.join(projDir, 'node_modules', '@axhub', 'make');
if (fs.existsSync(mk)) {
  for (const rel of ['dist/server/cli.mjs', 'dist/admin/assets/index.js', 'dist/admin/index.html']) {
    const src = path.join(patchRoot, rel), dst = path.join(mk, rel);
    if (fs.existsSync(src) && fs.existsSync(dst)) { fs.copyFileSync(src, dst); applied.push('make:' + rel); }
  }
}
// (2) 设计说明模块补丁 → src/common（3 个代码文件 + design-notes/ 子目录放模块自带文档）
// 补丁源结构：design-notes/{src/common, assets}；assets/ 落项目的 src/common/design-notes/
// 注意：规范.md / demo.html / 接入手册.html 是模块自带的开发参考，不是项目交付文档，
// 不能落到项目 docs/（那是 SRS/PRD/HLD/LLD 真源目录），改放 src/common/design-notes/ 与组件代码内聚。
const dn = path.join(patchRoot, 'design-notes');
for (const [rel, dstRel] of [
  ['src/common', path.join('src', 'common')],
  ['assets', path.join('src', 'common', 'design-notes')],
]) {
  const srcDir = path.join(dn, rel);
  if (!fs.existsSync(srcDir)) continue;
  const dstDir = path.join(projDir, dstRel);
  fs.mkdirSync(dstDir, { recursive: true });
  for (const f of fs.readdirSync(srcDir)) {
    fs.copyFileSync(path.join(srcDir, f), path.join(dstDir, f));
    applied.push('design-notes:' + rel + '/' + f);
  }
}
// (3) 记忆 hook（可选）：显式 --with-mem，或项目根存在 .codebuddy/ENABLE-MEM
// 只对 CodeBuddy 系宿主生效；其他宿主不读 .codebuddy/。
const wantMem = flags.has('--with-mem') || fs.existsSync(path.join(projDir, '.codebuddy', 'ENABLE-MEM'));
const mh = path.join(patchRoot, 'mem-hooks');
if (wantMem && fs.existsSync(mh)) {
  const dstDir = path.join(projDir, '.codebuddy');
  fs.mkdirSync(dstDir, { recursive: true });
  for (const f of ['mem.cjs', 'settings.local.json']) {
    const src = path.join(mh, f);
    if (fs.existsSync(src)) { fs.copyFileSync(src, path.join(dstDir, f)); applied.push('mem-hooks:' + f); }
  }
}
console.log(applied.length ? 'PATCH_APPLIED: ' + applied.join(', ') : 'PATCH_SKIP: 无适用补丁');
