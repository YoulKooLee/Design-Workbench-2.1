#!/usr/bin/env node
/**
 * sync-registry.mjs — 组件登记单向同步 / 一致性校验
 * ------------------------------------------------------------------
 * 真源：`_meta/components.catalog.json`（本库组件目录）
 * 目标：`03-组件库/custom-components.json`（工作台面板「组件库」页签数据源）中的 `axhub-*` 条目
 *
 * 用法（在 Codebuddy Design 目录下）：
 *   node _meta/sync-registry.mjs            # 同步（catalog → registry，写回 custom-components.json）
 *   node _meta/sync-registry.mjs --check    # 只校验差异，不写文件（CI / 维护核对用）
 *   node _meta/sync-registry.mjs --prune    # 连同「catalog 中已不存在」的 axhub-* 条目一并移除
 *
 * 说明：
 * - 只维护 `axhub-*` 前缀条目；不动其它来源条目（如 design-components 旧库、工程侧 SideMenu）。
 * - 条目结构对齐 `工作台面板/server.mjs` 的写入字段：id / label / category / categoryLabel /
 *   framework / notes / prompt / previewUrl / source。
 * - 幂等：无差异时不写文件、退出码 0；有差异时 --check 退出码 1（便于门禁）。
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIB_ROOT = path.resolve(__dirname, '..');                     // Codebuddy Design/
const CL_ROOT = path.resolve(LIB_ROOT, '..', '..');                 // 03-组件库/
const CATALOG = path.join(__dirname, 'components.catalog.json');
const REGISTRY = path.join(CL_ROOT, 'custom-components.json');
const MANIFEST = path.join(__dirname, 'layout.manifest.json');

const argv = process.argv.slice(2);
const CHECK_ONLY = argv.includes('--check');
const PRUNE = argv.includes('--prune');

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf-8').replace(/^\uFEFF/, ''));
const writeJson = (p, obj) => fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf-8');

const catalog = readJson(CATALOG);
const registry = readJson(REGISTRY);
const manifest = fs.existsSync(MANIFEST) ? readJson(MANIFEST) : {};
// 库版本真源在 03-组件库/component-registry.json 的 componentTemplateLib（不是 custom-components.json）
const MAIN_REGISTRY = path.join(CL_ROOT, 'component-registry.json');
const mainReg = fs.existsSync(MAIN_REGISTRY) ? readJson(MAIN_REGISTRY) : {};
const libVersion = (mainReg.componentTemplateLib && mainReg.componentTemplateLib.version) || manifest.version;
if (!Array.isArray(registry.items)) registry.items = [];

const notesOf = (c, id) =>
  `真源：03-组件库/03-页面组件/Codebuddy Design/${c.file || c.categoryLabel + '/'}；用法见 Codebuddy Design/README.md 与 提示词手册.md。`;

/** 由 catalog 条目构造 registry 条目 */
function buildItem(id, c) {
  const firstExport = (c.exports && c.exports[0]) || id;
  return {
    id,
    label: c.label,
    category: c.category,
    categoryLabel: c.categoryLabel,
    framework: 'react-tailwind',
    notes: notesOf(c, id),
    prompt:
      c.prompt ||
      `【组件引用】${c.label}（组件库 ${c.categoryLabel}）\n框架：React 18 + Tailwind v4（零第三方依赖）\n来源：03-组件库/03-页面组件/Codebuddy Design/${c.file}\n用法：先把「Codebuddy Design」整目录复制到工程 src/component-templates/axhub/，然后\n  import { ${firstExport} } from '../component-templates/axhub';\n参数：${c.props || '-'}\n场景：${c.scene || '-'}\n规则：请使用该组件，不要自造同类样式；零第三方依赖。`,
    previewUrl: c.previewUrl || `/library/gallery.html#${id}`,
    source: 'component-template',
  };
}

const desired = Object.entries(catalog.components || {}).map(([id, c]) => [id, buildItem(id, c)]);
const desiredIds = new Set(desired.map(([id]) => id));

let added = 0;
let updated = 0;
const diffs = [];

for (const [id, item] of desired) {
  const i = registry.items.findIndex((x) => x.id === id);
  if (i < 0) {
    added++;
    diffs.push(`+ ${id}（新增）`);
    if (!CHECK_ONLY) registry.items.push(item);
  } else {
    const old = registry.items[i];
    const changed = ['label', 'category', 'categoryLabel', 'notes', 'prompt', 'previewUrl'].some((k) => old[k] !== item[k]);
    if (changed) {
      updated++;
      diffs.push(`~ ${id}（更新：${['label', 'category', 'categoryLabel', 'notes', 'prompt', 'previewUrl']
        .filter((k) => old[k] !== item[k])
        .join('/')}）`);
      if (!CHECK_ONLY) registry.items[i] = { ...old, ...item };
    }
  }
}

// catalog 中已不存在的 axhub-* 条目（孤儿）
const orphans = registry.items.filter((x) => String(x.id).startsWith('axhub-') && !desiredIds.has(x.id)).map((x) => x.id);
if (orphans.length) diffs.push(`- 孤儿条目（catalog 中无）：${orphans.join(', ')}${PRUNE ? ' → 已移除' : '（加 --prune 可移除）'}`);
if (PRUNE && !CHECK_ONLY && orphans.length) {
  registry.items = registry.items.filter((x) => !(String(x.id).startsWith('axhub-') && !desiredIds.has(x.id)));
}

// 版本一致性检查（catalog / manifest / 03-组件库/component-registry.json 的 componentTemplateLib）
const ver = [catalog.version, manifest.version, libVersion].filter(Boolean);
const versionsAligned = new Set(ver).size <= 1;

console.log('=== sync-registry ===');
console.log(`catalog：${CATALOG}`);
console.log(`registry：${REGISTRY}`);
console.log(`catalog 组件 ${desired.length} 条；registry 总条目 ${registry.items.length} 条`);
console.log(`新增 ${added}；更新 ${updated}；孤儿 ${orphans.length}`);
if (diffs.length) console.log(diffs.slice(0, 60).join('\n'));
console.log(`版本一致性：catalog=${catalog.version} manifest=${manifest.version} registry=${libVersion} → ${versionsAligned ? 'OK' : '不一致 ✗'}`);

if (CHECK_ONLY) {
  const dirty = added + updated + orphans.length > 0 || !versionsAligned;
  console.log(dirty ? '\n[check] 存在差异 ✗' : '\n[check] 无差异 ✓');
  process.exit(dirty ? 1 : 0);
}

if (added + updated > 0 || (PRUNE && orphans.length)) {
  registry.updatedAt = new Date().toISOString();
  writeJson(REGISTRY, registry);
  console.log('\n已写回 custom-components.json');
} else {
  console.log('\n无差异，未写文件');
}
console.log(versionsAligned ? '完成 ✓' : '完成（但版本号不一致，请统一 catalog/manifest/registry 的 version）');
