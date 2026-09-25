#!/usr/bin/env node
// ============================================================
//  build-agents-template.mjs - 从 AGENTS.md 生成 AGENTS.template.md（千问 P2-17）
//  AGENTS.md 是唯一正本；本脚本在标题后插入维护提醒 + {{PROJECT_INFO_SECTION}} 占位，
//  其余正文与 AGENTS.md 完全一致，杜绝"手工同步脱节"。
//  用法：node .agents/scripts/build-agents-template.mjs
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..', '..');           // _project-template 根
const agentsFile = path.join(root, 'AGENTS.md');
const templateFile = path.join(root, 'AGENTS.template.md');

const body = fs.readFileSync(agentsFile, 'utf8').replace(/^\uFEFF/, '');

const reminder =
  '> ⚠️ **维护提醒**：本文件是 `AGENTS.md` 的模板版本（含 `{{...}}` 占位符）。' +
  '**改动 `AGENTS.md` 时必须重新运行 `node .agents/scripts/build-agents-template.mjs` 同步本文件**' +
  '（除占位符段落外两文件正文保持一致），否则新项目生成的 AGENTS.md 与模板脱节。\n\n' +
  '{{PROJECT_INFO_SECTION}}\n\n';

// 在第一个标题行（# ...）后插入提醒 + 占位段
const m = body.match(/^(# .+\n)/);
if (!m) { console.error('AGENTS.md 未找到标题行'); process.exit(1); }
const output = m[1] + '\n' + reminder + body.slice(m[1].length);

fs.writeFileSync(templateFile, output, 'utf8');
console.log(`[OK] AGENTS.template.md 已由 AGENTS.md 生成（${output.length} 字节）`);
