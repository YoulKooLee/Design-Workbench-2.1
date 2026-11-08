/**
 * 极简二维码编码器（byte 模式，纠错等级 M，版本 1–10）
 * ------------------------------------------------------------------
 * 只做分享弹窗需要的事：把一段 URL 变成模块矩阵，交给 canvas 画。
 * 不依赖任何第三方库，随 studio.js 一起静态加载。
 *
 * 导出：
 *   qrMatrix(text, { mask })  -> { size, version, modules: boolean[][] }
 *   drawQR(canvas, text, opts) -> 直接画到 canvas
 *
 * 算法对齐 ISO/IEC 18004 与 qrcode-generator 的经典实现；
 * 已用 segno 对 8 种掩码逐位比对验证（见 qr-test.mjs）。
 */

// 纠错等级 M 的分块表：[每块纠错码字数, [[块数, 每块数据码字数], ...]]
const BLOCKS_M = {
  1: [10, [[1, 16]]],
  2: [16, [[1, 28]]],
  3: [26, [[1, 44]]],
  4: [18, [[2, 32]]],
  5: [24, [[2, 43]]],
  6: [16, [[4, 27]]],
  7: [18, [[4, 31]]],
  8: [22, [[2, 38], [2, 39]]],
  9: [22, [[3, 36], [2, 37]]],
  10: [26, [[4, 43], [1, 44]]],
};

const ALIGN_POS = {
  1: [],
  2: [6, 18],
  3: [6, 22],
  4: [6, 26],
  5: [6, 30],
  6: [6, 34],
  7: [6, 22, 38],
  8: [6, 24, 42],
  9: [6, 26, 46],
  10: [6, 28, 50],
};

// ---------- GF(256) ----------
const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
(() => {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
})();

const gfMul = (a, b) => (a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]]);

function genPoly(n) {
  let g = [1];
  for (let i = 0; i < n; i++) {
    const next = new Array(g.length + 1).fill(0);
    for (let j = 0; j < g.length; j++) {
      next[j] ^= g[j];
      next[j + 1] ^= gfMul(g[j], EXP[i]);
    }
    g = next;
  }
  return g;
}

function rsRemainder(data, ecLen) {
  const gen = genPoly(ecLen);
  const buf = new Array(data.length + ecLen).fill(0);
  for (let i = 0; i < data.length; i++) buf[i] = data[i];
  for (let i = 0; i < data.length; i++) {
    const factor = buf[i];
    if (!factor) continue;
    for (let j = 0; j < gen.length; j++) buf[i + j] ^= gfMul(gen[j], factor);
  }
  return buf.slice(data.length);
}

// ---------- BCH ----------
function bchRemainder(value, poly) {
  let v = value;
  const polyBits = 32 - Math.clz32(poly);
  while (32 - Math.clz32(v) >= polyBits) {
    v ^= poly << (32 - Math.clz32(v) - polyBits);
  }
  return v;
}

const bchTypeInfo = (data) => ((data << 10) | bchRemainder(data << 10, 0x537)) ^ 0x5412;
const bchTypeNumber = (data) => (data << 12) | bchRemainder(data << 12, 0x1f25);

// ---------- 工具 ----------
const utf8 = (text) => {
  const out = [];
  for (const byte of new TextEncoder().encode(text)) out.push(byte);
  return out;
};

function dataCapacityBytes(version) {
  const [ecLen, groups] = BLOCKS_M[version];
  const dataCw = groups.reduce((sum, [n, d]) => sum + n * d, 0);
  const countBits = version >= 10 ? 16 : 8;
  // 4 位模式指示 + countBits 位长度 + 数据 + 最多 4 位终止符，向上取整到字节
  return Math.floor((dataCw * 8 - 4 - countBits) / 8);
}

function maskFn(pattern, i, j) {
  switch (pattern) {
    case 0: return (i + j) % 2 === 0;
    case 1: return i % 2 === 0;
    case 2: return j % 3 === 0;
    case 3: return (i + j) % 3 === 0;
    case 4: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
    case 5: return ((i * j) % 2) + ((i * j) % 3) === 0;
    case 6: return (((i * j) % 2) + ((i * j) % 3)) % 2 === 0;
    case 7: return (((i * j) % 3) + ((i + j) % 2)) % 2 === 0;
    default: return false;
  }
}

function buildCodewords(bytes, version) {
  const [ecLen, groups] = BLOCKS_M[version];
  const dataCw = groups.reduce((sum, [n, d]) => sum + n * d, 0);
  const countBits = version >= 10 ? 16 : 8;

  const bits = [];
  const push = (value, len) => {
    for (let i = len - 1; i >= 0; i--) bits.push((value >>> i) & 1);
  };
  push(0b0100, 4);
  push(bytes.length, countBits);
  for (const b of bytes) push(b, 8);

  const maxBits = dataCw * 8;
  for (let i = 0; i < 4 && bits.length < maxBits; i++) bits.push(0);
  while (bits.length % 8 !== 0) bits.push(0);

  const data = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) byte = (byte << 1) | bits[i + j];
    data.push(byte);
  }
  const padBytes = [0xec, 0x11];
  let p = 0;
  while (data.length < dataCw) data.push(padBytes[p++ % 2]);

  // 分块 + 纠错
  const dataBlocks = [];
  const ecBlocks = [];
  let offset = 0;
  for (const [n, d] of groups) {
    for (let b = 0; b < n; b++) {
      const block = data.slice(offset, offset + d);
      offset += d;
      dataBlocks.push(block);
      ecBlocks.push(rsRemainder(block, ecLen));
    }
  }

  const out = [];
  const maxData = Math.max(...dataBlocks.map((b) => b.length));
  for (let i = 0; i < maxData; i++) {
    for (const block of dataBlocks) if (i < block.length) out.push(block[i]);
  }
  for (let i = 0; i < ecLen; i++) {
    for (const block of ecBlocks) out.push(block[i]);
  }
  return out;
}

function penalty(modules, size) {
  let score = 0;
  // N1：连续同色 >= 5
  for (let i = 0; i < size; i++) {
    let runRow = 1;
    let runCol = 1;
    for (let j = 1; j < size; j++) {
      if (modules[i][j] === modules[i][j - 1]) runRow++;
      else { if (runRow >= 5) score += 3 + (runRow - 5); runRow = 1; }
      if (modules[j][i] === modules[j - 1][i]) runCol++;
      else { if (runCol >= 5) score += 3 + (runCol - 5); runCol = 1; }
    }
    if (runRow >= 5) score += 3 + (runRow - 5);
    if (runCol >= 5) score += 3 + (runCol - 5);
  }
  // N2：2x2 同色块
  for (let i = 0; i < size - 1; i++) {
    for (let j = 0; j < size - 1; j++) {
      const v = modules[i][j];
      if (v === modules[i][j + 1] && v === modules[i + 1][j] && v === modules[i + 1][j + 1]) score += 3;
    }
  }
  // N3：类定位图形 1011101 + 四空白
  const p1 = [true, false, true, true, true, false, true, false, false, false, false];
  const p2 = p1.slice().reverse();
  const hit = (arr, pat, start) => pat.every((v, k) => arr[start + k] === v);
  for (let i = 0; i < size; i++) {
    const row = modules[i];
    const col = modules.map((r) => r[i]);
    for (let j = 0; j + 11 <= size; j++) {
      if (hit(row, p1, j) || hit(row, p2, j)) score += 40;
      if (hit(col, p1, j) || hit(col, p2, j)) score += 40;
    }
  }
  // N4：黑白比例偏离 50%
  let dark = 0;
  for (let i = 0; i < size; i++) for (let j = 0; j < size; j++) if (modules[i][j]) dark++;
  const ratio = (dark * 100) / (size * size);
  score += Math.floor(Math.abs(ratio - 50) / 5) * 10;
  return score;
}

/**
 * 生成模块矩阵
 * @param {string} text
 * @param {{mask?: number}} [opts] mask 指定 0-7（默认按惩罚分自动选）
 */
export function qrMatrix(text, opts = {}) {
  const bytes = utf8(text);
  let version = 0;
  for (let v = 1; v <= 10; v++) {
    if (bytes.length <= dataCapacityBytes(v)) { version = v; break; }
  }
  if (!version) throw new Error('内容过长，超出二维码 V10 容量');

  const size = version * 4 + 17;
  const codewords = buildCodewords(bytes, version);
  const alignPos = ALIGN_POS[version];
  const ecBits = 0; // M = 00

  const make = (mask) => {
    const modules = Array.from({ length: size }, () => new Array(size).fill(null));

    const placeProbe = (row, col) => {
      for (let r = -1; r <= 7; r++) {
        if (row + r < 0 || row + r >= size) continue;
        for (let c = -1; c <= 7; c++) {
          if (col + c < 0 || col + c >= size) continue;
          modules[row + r][col + c] =
            (r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
            (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4);
        }
      }
    };
    placeProbe(0, 0);
    placeProbe(size - 7, 0);
    placeProbe(0, size - 7);

    for (const row of alignPos) {
      for (const col of alignPos) {
        if (modules[row][col] !== null) continue;
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            modules[row + r][col + c] =
              r === -2 || r === 2 || c === -2 || c === 2 || (r === 0 && c === 0);
          }
        }
      }
    }

    for (let i = 8; i < size - 8; i++) {
      if (modules[i][6] === null) modules[i][6] = i % 2 === 0;
      if (modules[6][i] === null) modules[6][i] = i % 2 === 0;
    }

    // 格式信息
    const fmt = bchTypeInfo((ecBits << 3) | mask);
    for (let i = 0; i < 15; i++) {
      const mod = ((fmt >> i) & 1) === 1;
      if (i < 6) modules[i][8] = mod;
      else if (i < 8) modules[i + 1][8] = mod;
      else modules[size - 15 + i][8] = mod;

      if (i < 8) modules[8][size - i - 1] = mod;
      else if (i < 9) modules[8][15 - i] = mod;
      else modules[8][15 - i - 1] = mod;
    }
    modules[size - 8][8] = true;

    // 版本信息
    if (version >= 7) {
      const bitsV = bchTypeNumber(version);
      for (let i = 0; i < 18; i++) {
        const mod = ((bitsV >> i) & 1) === 1;
        modules[Math.floor(i / 3)][(i % 3) + size - 8 - 3] = mod;
        modules[(i % 3) + size - 8 - 3][Math.floor(i / 3)] = mod;
      }
    }

    // 数据填充
    const isFunction = modules.map((row) => row.map((v) => v !== null));
    let inc = -1;
    let row = size - 1;
    let bitIndex = 7;
    let byteIndex = 0;
    for (let col = size - 1; col > 0; col -= 2) {
      if (col === 6) col--;
      for (;;) {
        for (let c = 0; c < 2; c++) {
          if (modules[row][col - c] === null) {
            let dark = false;
            if (byteIndex < codewords.length) dark = ((codewords[byteIndex] >>> bitIndex) & 1) === 1;
            if (maskFn(mask, row, col - c)) dark = !dark;
            modules[row][col - c] = dark;
            bitIndex--;
            if (bitIndex === -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || row >= size) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
    return { modules, isFunction };
  };

  let bestMask = 0;
  if (typeof opts.mask === 'number') {
    bestMask = opts.mask;
  } else {
    let best = Infinity;
    for (let m = 0; m < 8; m++) {
      const s = penalty(make(m).modules, size);
      if (s < best) {
        best = s;
        bestMask = m;
      }
    }
  }
  const built = make(bestMask);
  return { size, version, mask: bestMask, modules: built.modules, isFunction: built.isFunction, codewords };
}

/**
 * 把二维码画到 canvas 上（返回 canvas）
 * @param {HTMLCanvasElement} canvas
 * @param {string} text
 * @param {{size?: number, margin?: number, dark?: string, light?: string, scale?: number}} [opts]
 */
export function drawQR(canvas, text, opts = {}) {
  const { size = 176, margin = 2, dark = '#101828', light = '#ffffff' } = opts;
  const { size: n, modules } = qrMatrix(text);
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const total = n + margin * 2;
  const scale = Math.max(1, Math.round((size * dpr) / total));
  const px = total * scale;
  canvas.width = px;
  canvas.height = px;
  // CSS 尺寸取整数倍格宽，保证每个模块落在整像素上
  const css = Math.round(px / dpr);
  canvas.style.width = css + 'px';
  canvas.style.height = css + 'px';
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, px, px);
  ctx.fillStyle = dark;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (modules[i][j]) ctx.fillRect((j + margin) * scale, (i + margin) * scale, scale, scale);
    }
  }
  return canvas;
}
