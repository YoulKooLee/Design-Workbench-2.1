'use strict';

const { clearState } = require('./lib/state.cjs');

exports.run = () => {
  // Clear state files from previous session
  clearState('edited-files.txt');
  clearState('read-files.txt');
  clearState('review-called.txt');

  return {
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext:
        '【会话初始化完成】状态文件已清理。\n' +
        '强制执行清单：\n' +
        '1. 技能检查 — 接到任务后第一步扫描技能触发词\n' +
        '2. 审查勾选 — 若 DELIVERY_MODE 要求审查则调度对应角色（快速按已有降档，禁止升为全量）\n' +
        '3. 验证 — 宣称完成前按 soft-gates.md（文档类可省略 build）'
    }
  };
};
