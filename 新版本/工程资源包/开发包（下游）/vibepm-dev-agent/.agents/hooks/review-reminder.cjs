'use strict';

const path = require('path');
const { isCodeFile } = require('./lib/file-utils.cjs');
const { appendState } = require('./lib/state.cjs');

exports.run = (input) => {
  const filePath = input?.filePath || input?.tool_input?.file_path;
  if (!filePath) return null;

  if (!isCodeFile(filePath)) return null;

  appendState('edited-files.txt', path.resolve(filePath));

  const basename = path.basename(filePath);

  return {
    hookSpecificOutput: {
      hookEventName: 'PostToolUse',
      additionalContext:
        `【Review Reminder】你刚修改了代码文件: ${basename}\n` +
        '当这组相关改动全部完成后，若当前 DELIVERY_MODE 要求审查，必须调度 code-reviewer。\n' +
        '快速模式仅 P0 安全；文档类技能不因此升为全量审查。'
    }
  };
};
