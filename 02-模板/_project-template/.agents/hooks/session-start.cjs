'use strict';

const fs = require('fs');
const path = require('path');
const { clearState } = require('./lib/state.cjs');

exports.run = () => {
  // Clear state files from previous session
  clearState('edited-files.txt');
  clearState('read-files.txt');
  clearState('review-called.txt');

  // 千问 P1-6：真实注入技能索引（INDEX.md 由 .agents/scripts/build-skills-index.mjs 生成）
  // 取代「运行时已预加载 description」的空头声明，让技能匹配有真实依据。
  // 技能索引不再整份注入：INDEX.md 约 22KB，注入会重蹈「注入侧截断」覆辙（见 AGENTS.md 第六节「永不常驻」）。
  // 改为留一行指针，需要时精确 Read 单文件（context-budget 放行单文件 Read）。
  return {
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext:
        '【会话初始化完成】状态文件已清理。\n' +
        '技能索引在 .agents/skills/INDEX.md（约 22KB，按需 Read，不常驻）。\n' +
        '强制执行清单：\n' +
        '1. 技能检查 — Read INDEX.md 匹配触发词，命中即加载该技能执行\n' +
        '2. code-reviewer — 写完代码后立即调用，无例外\n' +
        '3. 验证 — 完成声明前必须运行构建/测试命令'
    }
  };
};
