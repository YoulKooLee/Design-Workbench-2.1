'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

function getStateDir() {
  const root = process.env.VIBEPM_WORKSPACE_ROOT || process.cwd();
  const hash = crypto.createHash('md5')
    .update(root).digest('hex').slice(0, 12);
  const dir = path.join(os.tmpdir(), `vibepm-${hash}`);
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  } catch {
    return '';
  }
  return dir;
}

exports.readState = (filename) => {
  const dir = getStateDir();
  if (!dir) return '';
  try { return fs.readFileSync(path.join(dir, filename), 'utf8'); }
  catch { return ''; }
};

exports.appendState = (filename, line) => {
  const dir = getStateDir();
  if (!dir) return;
  const safe = String(line).replace(/[\r\n]/g, '');
  try { fs.appendFileSync(path.join(dir, filename), safe + '\n'); }
  catch {}
};

exports.clearState = (filename) => {
  const dir = getStateDir();
  if (!dir) return;
  try { fs.unlinkSync(path.join(dir, filename)); } catch {}
};
