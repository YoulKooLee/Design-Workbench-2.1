// 只读扫描：列出工作区内「今天」修改的临时/垃圾候选文件（不删除、不移动）
import fs from 'fs';
import path from 'path';

const ROOT = 'C:/Users/游翔/Documents/AI work/产品设计工作台';
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.cache', 'out', 'coverage', '.workbuddy-sqlite-migrations']);

const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.bmp', '.gif']);
const TMP_PATTERNS = [/~^\$/, /\.tmp$/i, /\.bak$/i, /\.old$/i, /\.crdownload$/i, /\.part$/i, /\.swp$/i];
const TMP_NAMES = new Set(['thumbs.db', '.ds_store', 'desktop.ini']);

const today = new Date('2026-10-03T00:00:00+08:00').getTime();
const tomorrow = new Date('2026-10-04T00:00:00+08:00').getTime();

const images = [];
const temps = [];
const emptyDirs = [];
let scanned = 0;

function walk(dir, depth) {
  if (depth > 12) return;
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  if (entries.length === 0) { emptyDirs.push(dir); return; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(full, depth + 1);
    } else if (e.isFile()) {
      scanned++;
      let st;
      try { st = fs.statSync(full); } catch { continue; }
      const mt = st.mtimeMs;
      const ext = path.extname(e.name).toLowerCase();
      const nameLower = e.name.toLowerCase();
      const isTempName = TMP_NAMES.has(nameLower) || TMP_PATTERNS.some(p => p.test(e.name));
      const isImg = IMG_EXT.has(ext);
      if (isTempName) temps.push({ full, size: st.size, mt, kind: '办公临时文件' });
      else if (isImg && mt >= today && mt < tomorrow) images.push({ full, size: st.size, mt, kind: '今日图片' });
    }
  }
}

walk(ROOT, 0);

const fmt = new Intl.DateTimeFormat('zh-CN', { hour12: false, month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
const rel = p => path.relative(ROOT, p).replace(/\\/g, '/');
const kb = s => (s / 1024).toFixed(1) + ' KB';

function dump(title, arr) {
  console.log(`\n===== ${title}（${arr.length} 项，合计 ${kb(arr.reduce((a, b) => a + b.size, 0))}）=====`);
  arr.sort((a, b) => b.mt - a.mt).forEach(x => console.log(`${fmt.format(new Date(x.mt))}  ${kb(x.size).padStart(10)}  ${rel(x.full)}`));
}

console.log('扫描文件数：' + scanned);
dump('今日新增/修改的图片', images);
dump('办公临时文件（~$ / .tmp / .bak / Thumbs.db 等）', temps);
console.log(`\n===== 空目录（${emptyDirs.length}）=====`);
emptyDirs.slice(0, 50).forEach(d => console.log(rel(d)));
