'use strict';

const fs = require('fs');
const path = require('path');
const { clearState } = require('./lib/state.cjs');

exports.run = () => {
  // Clear state files from previous session
  clearState('edited-files.txt');
  clearState('read-files.txt');
  clearState('review-called.txt');

  // 注入技能索引（INDEX.md 由 .agents/scripts/build-skills-index.mjs 生成）
  // 与 make 模板同源方案（千问 P1-6）：技能匹配凭注入的真实索引，不凭记忆、不遍历 SKILL.md。
  let skillIndex = '';
  try {
    const indexFile = path.join(__dirname, '..', 'skills', 'INDEX.md');
    if (fs.existsSync(indexFile)) {
      skillIndex = '\n【技能索引（自动注入，供触发词匹配）】\n' + fs.readFileSync(indexFile, 'utf8');
    } else {
      skillIndex = '\n【技能索引缺失】请运行 node .agents/scripts/build-skills-index.mjs 生成。\n';
    }
  } catch (e) {
    skillIndex = '\n【技能索引读取失败】' + (e && e.message || String(e)) + '\n';
  }

  return {
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext:
        '【会话初始化完成】状态文件已清理。\n' +
        '强制执行清单：\n' +
        '1. 技能检查 — 用下方「技能索引」匹配触发词，命中即加载该技能执行\n' +
        '2. 审查勾选 — 若 DELIVERY_MODE 要求审查则调度对应角色（快速按已有降档，禁止升为全量）\n' +
        '3. 验证 — 宣称完成前按 soft-gates.md（文档类可省略 build）' +
        skillIndex
    }
  };
};
