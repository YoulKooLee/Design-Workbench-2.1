'use strict';

const WRITE_TOOLS = { Write: 1, Edit: 1, MultiEdit: 1, StrReplace: 1 };
const READ_TOOLS = { Read: 1 };
const DISPATCH_TOOLS = { Agent: 1, Task: 1 };

/**
 * Map a vendor tool name to write / read / dispatch.
 * @param {string} toolName
 * @returns {'write'|'read'|'dispatch'|string}
 */
function toCanonicalTool(toolName) {
  if (WRITE_TOOLS[toolName]) return 'write';
  if (READ_TOOLS[toolName]) return 'read';
  if (DISPATCH_TOOLS[toolName]) return 'dispatch';
  return toolName || '';
}

/**
 * Pick file path from Claude / Cursor stdin aliases.
 * @param {object} input
 * @returns {string}
 */
function pickFilePath(input) {
  const ti = input && input.tool_input ? input.tool_input : {};
  const raw = ti.file_path || ti.path || ti.filePath || (input && (input.file_path || input.path)) || '';
  return typeof raw === 'string' ? raw : '';
}

/**
 * Normalize stdin JSON so strategy hooks share one shape.
 * @param {object} input
 * @returns {object}
 */
exports.normalizeInput = (input) => {
  const src = input && typeof input === 'object' ? input : {};
  const rawToolName = src.tool_name || src.toolName || src.tool || '';
  const filePath = pickFilePath(src);
  const tool_input = Object.assign({}, src.tool_input);
  if (filePath && !tool_input.file_path) tool_input.file_path = filePath;
  return Object.assign({}, src, {
    rawToolName,
    tool_name: rawToolName,
    tool_input,
    filePath,
    canonicalTool: toCanonicalTool(rawToolName)
  });
};

/**
 * Dual-write deny/block fields for Claude and Cursor.
 * @param {object|null} result
 * @param {string} [eventName]
 * @returns {object|null}
 */
exports.normalizeOutput = (result, eventName) => {
  if (!result) return null;
  const out = Object.assign({}, result);
  const hso = Object.assign({}, out.hookSpecificOutput);
  if (eventName && !hso.hookEventName) hso.hookEventName = eventName;

  const deny = hso.permissionDecision === 'deny' || out.decision === 'block';
  if (deny) {
    const reason = hso.permissionDecisionReason || out.reason || '';
    out.decision = 'block';
    out.reason = reason;
    hso.permissionDecision = 'deny';
    hso.permissionDecisionReason = reason;
  }
  if (Object.keys(hso).length) out.hookSpecificOutput = hso;
  return out;
};
