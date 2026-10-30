#!/usr/bin/env node
// ============================================================
//  build-knowledge-catalog.mjs - 生成知识库索引 catalog.json
//  遍历 .agents/knowledge/**/*.md，生成 .agents/knowledge/catalog.json
//  （categories 数组 = 相对 knowledge/ 的路径，去掉 .md 后缀，按字典序）
//
//  为什么需要脚本：catalog.json 曾长期无人维护，漏登记 11~18 个知识文件
//  （含 development 侧「写代码前必读」的 conventions/react-to-vue），
//  且无任何校验能发现。改为脚本生成 + check-doc-links.mjs 断言差集为 0。
//
//  用法：node .agents/scripts/build-knowledge-catalog.mjs
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const knowledgeDir = path.resolve(__dirname, '..', 'knowledge');
const catalogFile = path.join(knowledgeDir, 'catalog.json');

if (!fs.existsSync(knowledgeDir)) {
  console.error('[ERR] 找不到 .agents/knowledge 目录：' + knowledgeDir);
  process.exit(1);
}

/** 递归收集 .md 文件，返回相对 knowledge/ 的无后缀路径 */
function collect(dir, acc) {
  for (const it of fs.readdirSync(dir, { withFileTypes: true })) {
    if (it.name.startsWith('.')) continue;
    const p = path.join(dir, it.name);
    if (it.isDirectory()) { collect(p, acc); continue; }
    if (!it.name.endsWith('.md')) continue;
    const rel = path.relative(knowledgeDir, p).split(path.sep).join('/');
    acc.push(rel.replace(/\.md$/, ''));
  }
  return acc;
}

const categories = collect(knowledgeDir, []).sort((a, b) => a.localeCompare(b));

// 读旧值用于对比（首次运行时不存在则视为空）
let before = [];
if (fs.existsSync(catalogFile)) {
  try {
    const old = JSON.parse(fs.readFileSync(catalogFile, 'utf8'));
    if (Array.isArray(old.categories)) before = old.categories;
  } catch { /* 旧文件损坏时直接覆盖 */ }
}

const added = categories.filter((c) => !before.includes(c));
const removed = before.filter((c) => !categories.includes(c));

fs.writeFileSync(catalogFile, JSON.stringify({ categories }, null, 2) + '\n', 'utf8');

console.log(`[OK] catalog.json：登记 ${categories.length} 条（原有 ${before.length} 条）`);
if (added.length) console.log(`     新增 ${added.length}: ${added.join(', ')}`);
if (removed.length) console.log(`     移除 ${removed.length}: ${removed.join(', ')}`);
if (!added.length && !removed.length) console.log('     无变化');
