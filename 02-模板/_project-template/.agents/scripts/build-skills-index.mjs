#!/usr/bin/env node
// ============================================================
//  build-skills-index.mjs - 生成技能索引（千问 P1-6）
//  遍历 .agents/skills/*/SKILL.md 的 frontmatter（name + description），
//  生成 .agents/skills/INDEX.md（紧凑索引）并填充 .agents/skills-lock.json。
//  用法：node .agents/scripts/build-skills-index.mjs
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const agentsDir = path.resolve(__dirname, '..');          // .agents
const skillsDir = path.join(agentsDir, 'skills');
const indexFile = path.join(skillsDir, 'INDEX.md');
const lockFile = path.join(agentsDir, 'skills-lock.json');

function parseFrontmatter(text) {
  text = text.replace(/^\uFEFF/, '');          // 去 BOM
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const lines = m[1].split(/\r?\n/);

  const get = (key) => {
    const start = lines.findIndex((l) => new RegExp('^' + key + ':(.*)$').test(l));
    if (start < 0) return '';
    const head = lines[start].match(new RegExp('^' + key + ':[ \t]*(.*)$'))[1].trim();
    if (head && head !== '|' && head !== '>' && !/^[|>][+-]?$/.test(head)) {
      const q = head.match(/^["'](.*)["']$/s);
      return (q ? q[1] : head).trim();
    }
    const buf = [];
    for (let i = start + 1; i < lines.length; i++) {
      const l = lines[i];
      if (/^[a-zA-Z_][\w-]*[ \t]*:/.test(l)) break;
      buf.push(l.trim());
    }
    return buf.filter(Boolean).join(' ').trim();
  };
  return { name: get('name'), description: get('description') };
}

const entries = [];
for (const d of fs.readdirSync(skillsDir, { withFileTypes: true })) {
  if (!d.isDirectory() || d.name.startsWith('.')) continue;
  const skPath = path.join(skillsDir, d.name, 'SKILL.md');
  if (!fs.existsSync(skPath)) continue;
  const text = fs.readFileSync(skPath, 'utf8');
  const fm = parseFrontmatter(text);
  if (!fm || !fm.name) continue;
  entries.push({ dir: d.name, name: fm.name, description: fm.description });
}

entries.sort((a, b) => a.name.localeCompare(b.name));

// 生成 INDEX.md（精简：每个技能只取第一句，≤120 字，控制总大小 ≤6KB）
const lines = [];
lines.push('# 技能索引（自动生成）');
lines.push('');
lines.push(`> 共 ${entries.length} 个技能。本文件由 \`.agents/scripts/build-skills-index.mjs\` 自动生成，**按需 Read，不常驻**。**请勿手改**；更新技能后重新运行生成脚本。`);
lines.push('');
lines.push('## 技能速查');
lines.push('');
for (const e of entries) {
  let desc = (e.description || '').split(/\r?\n/)[0].trim();
  // 按句号/感叹号/问号截断，只留第一句
  const m = desc.match(/^(.{1,40}?[。！？.!?])(\s|$)/);
  if (m) desc = m[1];
  else if (desc.length > 40) desc = desc.slice(0, 37) + '...';
  lines.push(`- **${e.name}** - ${desc}`);
}
lines.push('');
const indexText = lines.join('\n') + '\n';

// skills-lock.json
const lock = {
  version: 1,
  generatedAt: new Date().toISOString(),
  count: entries.length,
  hash: crypto.createHash('sha256').update(indexText).digest('hex').slice(0, 16),
  skills: Object.fromEntries(entries.map((e) => [e.dir, e.name])),
};

fs.writeFileSync(indexFile, indexText, 'utf8');
fs.writeFileSync(lockFile, JSON.stringify(lock, null, 2) + '\n', 'utf8');

console.log(`[OK] 生成 INDEX.md：${entries.length} 个技能，${indexText.length} 字节`);
console.log(`[OK] 写入 skills-lock.json（hash=${lock.hash}）`);
