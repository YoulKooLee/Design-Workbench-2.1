#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { readInput } = require('./lib/io.cjs');
const { normalizeInput, normalizeOutput } = require('./lib/normalize.cjs');

const EVENT_BY_HOOK = {
  'session-start': 'SessionStart',
  'config-protection': 'PreToolUse',
  'gateguard': 'PreToolUse',
  'review-reminder': 'PostToolUse',
  'review-tracker': 'PostToolUse',
  'pre-compact': 'PreCompact',
  'stop-quality-gate': 'Stop'
};

/**
 * Walk up from start until `.agents/hooks/run.cjs` exists.
 * @param {string} start
 * @returns {string}
 */
function findWorkspaceRoot(start) {
  let dir = start;
  while (!fs.existsSync(path.join(dir, '.agents', 'hooks', 'run.cjs'))) {
    const parent = path.dirname(dir);
    if (parent === dir) return '';
    dir = parent;
  }
  return dir;
}

const hookName = process.argv[2];
if (!hookName || !Object.prototype.hasOwnProperty.call(EVENT_BY_HOOK, hookName)) {
  process.exit(0);
}

const root = findWorkspaceRoot(process.cwd());
if (!root) process.exit(0);
process.env.VIBEPM_WORKSPACE_ROOT = root;

readInput().then((input) => {
  const hookPath = path.join(root, '.agents', 'hooks', hookName + '.cjs');
  try {
    const hook = require(hookPath);
    const result = hook.run(normalizeInput(input));
    const out = normalizeOutput(result, EVENT_BY_HOOK[hookName]);
    if (out) process.stdout.write(JSON.stringify(out));
  } catch (err) {
    process.stderr.write(`[hooks:${hookName}] ${err.message}\n`);
  }
}).catch(() => process.exit(0));
