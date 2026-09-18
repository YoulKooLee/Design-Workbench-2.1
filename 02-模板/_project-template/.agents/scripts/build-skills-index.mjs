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
  const body = m[1];
  const get = (key) => {
    // 单行：description: xxx
    const single = body.match(new RegExp('^' + key + ':\\s*(.+?)\\s*$', 'm'));
    if (single) return single[1].trim();
    // 多行：description: >  / 折叠块
    const multi = body.match(new RegExp('^' + key + ':\\s*>\\s*\\r?\\n((?:\\s+.*\\r?\\n?)+)', 'm'));
    if (multi) {
      return multi[1].split(/\r?\n/).map((l) => l.replace(/^\s+/, '')).join(' ').trim();
    }
    return '';
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

// 生成 INDEX.md（紧凑：name + description 首行）
const lines = [];
lines.push('# 技能索引（自动生成）');
lines.push('');
lines.push(`> 共 ${entries.length} 个技能。本文件由 \`.agents/scripts/build-skills-index.mjs\` 自动生成，由 \`session-start.cjs\` 在会话启动时注入上下文。**请勿手改**；更新技能后重新运行生成脚本。`);
lines.push('');
lines.push('## 技能速查');
lines.push('');
for (const e of entries) {
  const desc = (e.description || '').split(/\r?\n/)[0].trim();
  lines.push(`- **${e.name}** — ${desc}`);
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
