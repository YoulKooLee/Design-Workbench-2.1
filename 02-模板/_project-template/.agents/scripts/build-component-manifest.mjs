// 生成 .agents/component-manifest.json —— 组件反查清单（AGENTS §4.1 引用）
// 用法：node .agents/scripts/build-component-manifest.mjs [--dry]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const dry = process.argv.includes('--dry');
const ctDir = path.join(root, 'src/component-templates');
const map = {};
function scan(dir, rel) {
  for (const en of fs.readdirSync(dir, { withFileTypes: true })) {
    if (en.name.startsWith('_') || en.name === 'node_modules') continue;
    const full = path.join(dir, en.name);
    const r = rel ? rel + '/' + en.name : en.name;
    if (en.isDirectory()) {
      const hasIdx = fs.existsSync(path.join(full, 'index.tsx')) || fs.existsSync(path.join(full, 'index.html'));
      if (hasIdx) {
        map[r] = {
          index_tsx: fs.existsSync(path.join(full, 'index.tsx')) ? r + '/index.tsx' : null,
          index_html: fs.existsSync(path.join(full, 'index.html')) ? r + '/index.html' : null,
          extra: fs.readdirSync(full).filter((f) => !['index.tsx', 'index.html'].includes(f)).slice(0, 12),
        };
      } else scan(full, r);
    } else if (en.name.endsWith('.md')) {
      map[r] = { readme: r };
    }
  }
}
if (fs.existsSync(ctDir)) scan(ctDir, '');
const themesDir = path.join(root, 'src/themes');
const themes = fs.existsSync(themesDir) ? fs.readdirSync(themesDir).filter((d) => { try { return fs.statSync(path.join(themesDir, d)).isDirectory(); } catch (e) { return false; } }) : [];
const out = { _meta: { generated: new Date().toISOString().slice(0, 10), script: '.agents/scripts/build-component-manifest.mjs', usage: '按组件名查路径读单个文件，禁止整目录读 src/component-templates' }, components: map, themes };
const dst = path.join(root, '.agents/component-manifest.json');
console.log((dry ? '[dry] ' : '') + '组件 ' + Object.keys(map).length + ' 项、主题 ' + themes.length + ' 个 → ' + path.relative(root, dst));
if (!dry) fs.writeFileSync(dst, JSON.stringify(out, null, 2), 'utf8');
