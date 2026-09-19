'use strict';

const fs = require('fs');
const path = require('path');
const { readState } = require('./lib/state.cjs');

exports.run = (input) => {
  // Prevent infinite loop: if stop hook already active, don't block again
  if (input?.stop_hook_active) return null;

  const editedRaw = readState('edited-files.txt');
  if (!editedRaw.trim()) return null;

  const editedFiles = editedRaw.trim().split('\n').filter(Boolean);
  const issues = [];

  // Check 1: console.log remnants (skip CLI entry files where console.log is intentional output)
  const CLI_PATTERNS = [/[/\\]bin[/\\]/, /[/\\]hooks[/\\]/];
  const root = process.env.VIBEPM_WORKSPACE_ROOT || process.cwd();
  for (const fp of editedFiles) {
    if (CLI_PATTERNS.some(p => p.test(fp))) continue;
    const resolved = path.resolve(fp);
    const rel = path.relative(root, resolved);
    if (!rel || rel.startsWith('..') || path.isAbsolute(rel)) continue;
    try {
      if (!fs.existsSync(resolved)) continue;
      const content = fs.readFileSync(resolved, 'utf8');
      const lines = content.split('\n');
      const hits = [];
      lines.forEach((line, i) => {
        if (/console\.(log|debug|info)\s*\(/.test(line) && !/\/\/\s*keep/.test(line)) {
          hits.push(i + 1);
        }
      });
      if (hits.length > 0) {
        issues.push(`${path.basename(resolved)} 第 ${hits.join(',')} 行有 console.log`);
      }
    } catch {}
  }

  // Check 2: review-called state
  const reviewCalled = readState('review-called.txt').trim();
  if (!reviewCalled) {
    issues.push('本轮修改了代码文件但未调度 code-reviewer（若本 DELIVERY_MODE 要求审查）');
  }

  if (issues.length === 0) return null;

  return {
    decision: 'block',
    reason:
      '【质量门禁】发现以下问题：\n' +
      issues.map(i => `  - ${i}`).join('\n') +
      '\n请处理后再结束回复。'
  };
};
