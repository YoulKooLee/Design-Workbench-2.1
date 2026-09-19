'use strict';

// ============================================================
//  context-budget.cjs - 上下文预算护栏（admin 版 · 按本模板资产裁剪）
//  拦截 Read|Glob|Grep 命中高危目录（.agents/skills、.agents/knowledge、
//  .agents/rules、frame 母版画廊、vendor、node_modules）的
//  递归/通配/目录级操作，提示改为精确路径读取。
//  注册：hooks.json + adapters/{cursor,claude} preToolUse matcher=Read|Glob|Grep
// ============================================================
const path = require('path');
const fs = require('fs');

// 高危目录特征（按 AGENTS.md 上下文预算禁令；frame 为本模板最大资产 ≈17.6MB）
const HIGH_RISK_PATTERNS = [
  { re: /[\\/]\.agents[\\/]skills([\\/]|$)/, name: '.agents/skills/' },
  { re: /[\\/]\.agents[\\/]knowledge([\\/]|$)/, name: '.agents/knowledge/' },
  { re: /[\\/]\.agents[\\/]rules([\\/]|$)/, name: '.agents/rules/' },
  { re: /(^|[\\/])frame([\\/]|$)/, name: 'frame/（母版画廊）' },
  { re: /[\\/]vendor([\\/]|$)/, name: 'vendor/' },
  { re: /[\\/]node_modules([\\/]|$)/, name: 'node_modules/' },
];

exports.run = (input) => {
  const toolName = input?.tool_name;
  if (!['Read', 'Glob', 'Grep'].includes(toolName)) return null;
  const toolInput = input?.tool_input || {};
  // 提取目标：Read/Glob 的 file_path/path，Grep 的 path/pattern
  const target = toolInput.file_path || toolInput.path || toolInput.pattern || '';
  if (!target) return null;

  const norm = target.replace(/\\/g, '/');
  const cwd = (process.cwd() || '').replace(/\\/g, '/');
  const abs = (path.isAbsolute(target) ? target : path.join(cwd, target)).replace(/\\/g, '/');

  const hits = HIGH_RISK_PATTERNS.filter((h) => h.re.test(abs) || h.re.test(norm));
  if (!hits.length) return null;

  // 危险判定：Glob/Grep 本身即通配检索；Read 目录 / 通配符 / 递归模式
  const isSearchTool = toolName === 'Glob' || toolName === 'Grep';
  const hasWildcard = /[*?[\]{}]/.test(target);
  const isRecursiveRead = toolName === 'Read' && (() => {
    try { return fs.existsSync(target) && fs.statSync(target).isDirectory(); } catch { return false; }
  })();
  if (!isSearchTool && !hasWildcard && !isRecursiveRead) return null; // 精确单文件 Read 放行

  return {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      additionalContext:
        '【上下文预算拦截】目标命中高危目录（' + hits.map((h) => h.name).join('、') + '）' +
        (isSearchTool ? '，且为 Glob/Grep 检索' : hasWildcard ? '，且含通配符' : '，且为目录级 Read') +
        '，可能一次带进数万 token 击穿上下文窗口。\n' +
        '请改为：精确路径 Read 单个文件；浏览 frame 母版只列一级目录名或读单个 demo 文件；' +
        '检索技能/知识库用会话启动注入的 .agents/skills/INDEX.md，不遍历技能目录。'
    }
  };
};
