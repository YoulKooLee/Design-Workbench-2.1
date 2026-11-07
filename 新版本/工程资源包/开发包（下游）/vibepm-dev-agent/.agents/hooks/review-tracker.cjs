'use strict';

const { appendState } = require('./lib/state.cjs');

exports.run = (input) => {
  const type = String(input?.tool_input?.subagent_type || '').toLowerCase();
  const desc = String(input?.tool_input?.description || '');
  const prompt = String(input?.tool_input?.prompt || '');
  const blob = `${type} ${desc} ${prompt}`;
  const named = type === 'code-reviewer' || type === 'security-review'
    || /\bcode-reviewer\b/i.test(blob)
    || /\bsecurity-review\b/i.test(blob);
  if (named) {
    appendState('review-called.txt', new Date().toISOString());
  }
  return null;
};
