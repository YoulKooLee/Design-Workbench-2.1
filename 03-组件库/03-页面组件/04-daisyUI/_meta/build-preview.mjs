#!/usr/bin/env node
/**
 * 04-daisyUI 试点 · 自包含预览生成器
 * 作用：把 demo/index.html + dist/daisyui.css 合成单文件 preview.html，
 *      双击（file://）即可看，不需要起服务、不需要 node_modules。
 * 用法：node _meta/build-preview.mjs      （或 npm run self）
 * 顺序：先 npm run build 生成 dist/daisyui.css，再跑本脚本。
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEMO = path.join(DIR, 'demo', 'index.html');
const CSS = path.join(DIR, 'dist', 'daisyui.css');
const CSS_LITE = path.join(DIR, 'dist', 'daisyui-lite.css');
const OUT = path.join(DIR, 'preview.html');

const kb = (n) => `${Math.round(n / 1024)} KB`;
const stat = (p) => {
  if (!fs.existsSync(p)) return null;
  const buf = fs.readFileSync(p);
  return { raw: buf.length, gzip: zlib.gzipSync(buf, { level: 9 }).length };
};

const main = stat(CSS);
if (!main) {
  console.error('✗ 缺 dist/daisyui.css，先跑：npx tailwindcss -i ./src/input.css -o ./dist/daisyui.css --minify');
  process.exit(1);
}
const lite = stat(CSS_LITE);

const css = fs.readFileSync(CSS, 'utf8');
let html = fs.readFileSync(DEMO, 'utf8');

if (!html.includes('../dist/daisyui.css')) {
  console.error('✗ demo/index.html 未引用 ../dist/daisyui.css，请检查模板是否被改动');
  process.exit(1);
}

// 内联 CSS（scope 到 <style>，不改任何选择器）
html = html.replace(
  '<link rel="stylesheet" href="../dist/daisyui.css" />',
  `<style>\n${css}\n</style>`
);

// 回填产物体积（原始 + gzip，gzip 才是真实传输成本）
const sizeText = `${kb(main.raw)}<span class="text-xs font-normal opacity-60"> / gzip ${kb(main.gzip)}</span>`;
html = html.replace('<div class="stat-value text-3xl" id="css-size">—</div>', `<div class="stat-value text-3xl" id="css-size">${sizeText}</div>`);

// 标注自包含
html = html.replace(
  '<title>daisyUI 5 试点 · 组件与主题实测</title>',
  '<title>daisyUI 5 试点 · 组件与主题实测（自包含单文件）</title>'
);

fs.writeFileSync(OUT, html, 'utf8');

console.log('✓ preview.html 已生成（CSS 已内联，双击即看）');
console.log(`  全量 37 主题：raw ${kb(main.raw)} / gzip ${kb(main.gzip)}`);
if (lite) console.log(`  精简 4 主题：raw ${kb(lite.raw)} / gzip ${kb(lite.gzip)}`);
console.log(`  输出：${path.relative(DIR, OUT)}（${kb(fs.statSync(OUT).size)}）`);
