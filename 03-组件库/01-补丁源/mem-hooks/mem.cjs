#!/usr/bin/env node
// mem.cjs —— 把 project-memory.md 接成三个 hook 入口（CodeBuddy 系宿主）
// 用法：node .codebuddy/mem.cjs start | turn | compact
// 失败一律静默退出 0，不阻断会话。
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const MEM = path.join(ROOT, 'project-memory.md');
const MAX_START = 1200;
const MAX_TURN = 200;

function readMem() {
  try { return fs.readFileSync(MEM, 'utf8'); } catch { return ''; }
}

function section(text, title) {
  const lines = text.split('\n');
  const i = lines.findIndex((l) => /^#{2,3}\s/.test(l) && l.includes(title));
  if (i < 0) return '';
  const out = [];
  for (let k = i + 1; k < lines.length; k++) {
    if (/^#{2,3}\s/.test(lines[k])) break;
    out.push(lines[k]);
  }
  return out.join('\n');
}

function bullets(s) {
  return s.split('\n').filter((l) => /^\s*-\s/.test(l)).map((l) => l.trim());
}

function today() {
  return new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10);
}

function clip(s, n) {
  s = String(s).replace(/\s+/g, ' ').trim();
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

const mode = process.argv[2] || 'turn';

try {
  const mem = readMem();
  if (mem) {
    if (mode === 'start') {
      // SessionStart：注入「当前任务 + 最近决策」，纯文本 stdout 即进上下文
      const prog = bullets(section(mem, '任务进度')).slice(-1);
      const dec = bullets(section(mem, '决策记录')).slice(-3);
      const blocks = [];
      if (prog.length) blocks.push('当前任务：' + prog.map((s) => s.replace(/^-\s*/, '')).join(' / '));
      if (dec.length) blocks.push('最近决策：\n' + dec.join('\n'));
      const text = blocks.join('\n');
      if (text) process.stdout.write(clip(text, MAX_START) + '\n');
    } else if (mode === 'turn') {
      // UserPromptSubmit：每轮只带一句「下一步」
      const prog = bullets(section(mem, '任务进度')).slice(-1)[0] || '';
      const next = /下一步[:：]\s*([^|]+)/.exec(prog);
      const text = next ? '下一步：' + next[1].trim() : '';
      if (text) process.stdout.write(clip(text, MAX_TURN) + '\n');
    } else if (mode === 'compact') {
      // PreCompact：今天的变更流水没写，就把「先落盘」作为压缩指令送进去
      const flow = section(mem, '变更流水');
      if (!flow.includes(today())) {
        process.stdout.write(
          `压缩前先落盘：在 project-memory.md「变更流水」补一条「${today()} | [类型] | 变更 | 触发人 | 影响范围」，并更新「任务进度」的下一步。\n`,
        );
      }
    }
  }
} catch {
  // 静默
}
process.exit(0);
