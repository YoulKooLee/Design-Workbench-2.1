#!/usr/bin/env node
// 应用 03-组件库/01-补丁源 到项目（make 工程：组件页签补丁 + 设计说明模块），幂等。
// 用法：node apply-project-patches.mjs <projDir> [workbenchRoot]
// 由 launch-project.ps1 在首次 pnpm install 后调用；也可手动对存量项目补打。
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const projDir = process.argv[2];
if (!projDir || !fs.existsSync(projDir)) { console.error('用法: node apply-project-patches.mjs <projDir> [workbenchRoot]'); process.exit(1); }
// workbenchRoot：默认由脚本位置推导（06-运行脚本 的上级）
const workbenchRoot = process.argv[3] || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
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
// (2) 设计说明模块补丁 → src/common + docs（复制覆盖，幂等）
const dn = path.join(patchRoot, 'design-notes');
for (const [rel, dstRel] of [['src/common', path.join('src', 'common')], ['docs', 'docs']]) {
  const srcDir = path.join(dn, rel);
  if (!fs.existsSync(srcDir)) continue;
  const dstDir = path.join(projDir, dstRel);
  fs.mkdirSync(dstDir, { recursive: true });
  for (const f of fs.readdirSync(srcDir)) {
    fs.copyFileSync(path.join(srcDir, f), path.join(dstDir, f));
    applied.push('design-notes:' + rel + '/' + f);
  }
}
console.log(applied.length ? 'PATCH_APPLIED: ' + applied.join(', ') : 'PATCH_SKIP: 无适用补丁');
