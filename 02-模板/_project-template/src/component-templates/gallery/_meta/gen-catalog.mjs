#!/usr/bin/env node
/**
 * 组件画廊清单生成器
 * 扫描 ../（component-templates）下所有分类，产出 catalog.ts。
 * 清单来源优先级：
 *   1) pages.json（daisyui 格式：{ 组id: { zh, items: [{id, zh}] } }）
 *   2) index.tsx 里的 ITEMS 数组（Codebuddy 分类格式：{ name, label, href }）
 *   3) 兜底：扫描子目录里的 index.html
 * 用法：node _meta/gen-catalog.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..'); // _meta → gallery → component-templates
const SELF = 'gallery';
const SKIP = new Set(['_kit', 'node_modules', SELF]);

function zhOf(catDir, catName) {
  // 从 index.tsx 的 <h1> 提取中文名；失败回退目录名
  try {
    const tsx = fs.readFileSync(path.join(catDir, 'index.tsx'), 'utf-8');
    const m = tsx.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (m) return m[1].trim();
  } catch { /* ignore */ }
  return catName;
}

function itemsOf(catDir, catName) {
  // 1) pages.json
  const pj = path.join(catDir, 'pages.json');
  if (fs.existsSync(pj)) {
    const groups = JSON.parse(fs.readFileSync(pj, 'utf-8'));
    const items = [];
    for (const g of Object.values(groups)) {
      for (const it of g.items || []) {
        items.push({ name: it.id, label: it.zh || it.id, href: `./${it.id}/index.html` });
      }
    }
    if (items.length) return items;
  }
  // 2) index.tsx ITEMS
  try {
    const tsx = fs.readFileSync(path.join(catDir, 'index.tsx'), 'utf-8');
    const re = /name:\s*'([^']+)',\s*label:\s*'([^']*)',\s*href:\s*'\.\/([^']+)'/g;
    const items = [];
    let m;
    while ((m = re.exec(tsx))) items.push({ name: m[1], label: m[2] || m[1], href: `./${m[3]}` });
    if (items.length) return items;
    // 2b) JSX 锚点直链格式：<a href="./X/index.html" ...><div ...>名</div>...
    const reA = /href="\.\/([^"]+)"[^>]*>\s*<div[^>]*>([^<]*)<\/div/g;
    let a;
    while ((a = reA.exec(tsx))) {
      const p = a[1];
      items.push({ name: p.split('/')[0], label: (a[2] || '').trim() || p.split('/')[0], href: `./${p}` });
    }
    if (items.length) return items;
  } catch { /* ignore */ }
  // 3) 兜底 A：分类根本身就是单页面板（如 icons）
  if (fs.existsSync(path.join(catDir, 'index.html'))) {
    return [{ name: catName, label: catName, href: './index.html' }];
  }
  // 4) 兜底 B：扫描子目录里的 index.html
  const items = [];
  for (const d of fs.readdirSync(catDir, { withFileTypes: true })) {
    if (!d.isDirectory() || d.name.startsWith('_') || d.name === 'vendor') continue;
    if (fs.existsSync(path.join(catDir, d.name, 'index.html'))) {
      items.push({ name: d.name, label: d.name, href: `./${d.name}/index.html` });
    }
  }
  return items;
}

const cats = [];
for (const d of fs.readdirSync(root, { withFileTypes: true })) {
  if (!d.isDirectory() || d.name.startsWith('_') || d.name === 'vendor' || d.name === SELF) continue;
  const catDir = path.join(root, d.name);
  const items = itemsOf(catDir, d.name);
  if (!items.length) continue;
  cats.push({ id: d.name, zh: zhOf(catDir, d.name), items });
}
cats.sort((a, b) => a.id.localeCompare(b.id, 'zh'));

const total = cats.reduce((n, c) => n + c.items.length, 0);
const body = JSON.stringify(cats, null, 2)
  .replace(/"([a-zA-Z_]+)":/g, '$1:') // key 去引号（值里的引号不受影响，因值都带冒号后空格）
  .replace(/: "([^"]*)"/g, ": '$1'");

const out = `/**
 * 组件画廊清单（自动生成，勿手改）
 * 生成器：gallery/_meta/gen-catalog.mjs
 * 覆盖 ${cats.length} 个分类 / ${total} 个组件页
 */
export type GalleryItem = { name: string; label: string; href: string };
export type GalleryCat = { id: string; zh: string; items: GalleryItem[] };

export const GALLERY: GalleryCat[] = ${body};
`;

fs.writeFileSync(path.join(here, '..', 'catalog.ts'), out, 'utf-8'); // 写到 gallery/ 下
console.log(`✓ catalog.ts 已生成：${cats.length} 个分类 / ${total} 个组件页`);
for (const c of cats) console.log(`  - ${c.id}(${c.zh}): ${c.items.length}`);
