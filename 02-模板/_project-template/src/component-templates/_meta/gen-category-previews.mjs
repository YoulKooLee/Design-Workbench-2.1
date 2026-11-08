/**
 * 分类目录页缩略图升级生成器
 * 用法：node gen-category-previews.mjs
 * 作用：把各分类 index.tsx 的纯文字卡片改写为共享 PreviewGrid 实时缩略图网格。
 * - 解析两种既有格式：ITEMS 数组（name/label/href）、JSX <a href="./X/index.html"> 直链卡片
 * - 解析失败的分类跳过并提示（不破坏原文件）
 * - daisyui / gallery / icons 自有面板，不处理
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..'); // component-templates/

const SKIP = new Set(['daisyui', 'gallery', 'icons', '_kit', '_meta', 'node_modules']);

/** 解析 ITEMS 数组格式 */
function parseItemsArray(src) {
  const m = src.match(/const\s+ITEMS\s*=\s*\[([\s\S]*?)\n\];/);
  if (!m) return null;
  const items = [];
  const re = /\{\s*name:\s*'([^']+)'(?:\s*,\s*label:\s*'([^']*)')?\s*,\s*href:\s*'\.\/([^']+)'[^}]*\}/g;
  let mm;
  while ((mm = re.exec(m[1]))) {
    items.push({ name: mm[1], label: mm[2] || undefined, href: `./${mm[3]}` });
  }
  return items.length ? items : null;
}

/** 解析 JSX 直链卡片格式（href 为普通字符串） */
function parseJsxCards(src) {
  const items = [];
  const re = /href="\.\/([^"]+)"[\s\S]{0,300}?fontWeight:\s*600[^>]*>([^<]+)</g;
  let mm;
  while ((mm = re.exec(src))) {
    items.push({ name: mm[2].trim(), href: `./${mm[1]}` });
  }
  return items.length ? items : null;
}

function gen() {
  const cats = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !SKIP.has(d.name))
    .map((d) => d.name)
    .filter((n) => {
      const p = path.join(root, n);
      return fs.existsSync(path.join(p, 'index.tsx')) && fs.existsSync(path.join(p, 'index.html'));
    })
    .sort();

  let ok = 0;
  const failed = [];
  for (const cat of cats) {
    const file = path.join(root, cat, 'index.tsx');
    const src = fs.readFileSync(file, 'utf-8');
    if (src.includes('PreviewGrid')) {
      ok++;
      continue; // 已升级
    }
    const items = parseItemsArray(src) || parseJsxCards(src);
    if (!items) {
      failed.push(cat);
      continue;
    }
    const lines = items
      .map(
        (it) =>
          `  { name: ${JSON.stringify(it.name)}, label: ${it.label ? JSON.stringify(it.label) : 'undefined'}, href: ${JSON.stringify(it.href)} },`,
      )
      .join('\n');
    const out = `import React from 'react';
import { createRoot } from 'react-dom/client';
import { PreviewGrid } from '../_kit/preview-grid';

// 由 _meta/gen-category-previews.mjs 生成（勿手改清单，改清单请重跑生成器）
const ITEMS = [
${lines}
];

function CategoryView() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, margin: '0 0 16px' }}>${cat}</h1>
      <PreviewGrid items={ITEMS} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<CategoryView />);
`;
    fs.writeFileSync(file, out, 'utf-8');
    ok++;
    console.log(`✓ ${cat}（${items.length} 项）`);
  }
  console.log(`\n完成：升级/已升级 ${ok}，失败 ${failed.length}${failed.length ? ' → ' + failed.join(', ') : ''}`);
}

gen();
