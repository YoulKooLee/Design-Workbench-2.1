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

// 纠错等级 -> { 版本: [每块纠错码字数, [[块数, 每块数据码字数], ...]] }
// 数据来自 ISO/IEC 18004 标准分块表（版本 1–40，纠错等级 L / M）
const BLOCKS = {
  M: {
  1: [10, [[1,16]]],
  2: [16, [[1,28]]],
  3: [26, [[1,44]]],
  4: [18, [[2,32]]],
  5: [24, [[2,43]]],
  6: [16, [[4,27]]],
  7: [18, [[4,31]]],
  8: [22, [[2,38],[2,39]]],
  9: [22, [[3,36],[2,37]]],
  10: [26, [[4,43],[1,44]]],
  11: [30, [[1,50],[4,51]]],
  12: [22, [[6,36],[2,37]]],
  13: [22, [[8,37],[1,38]]],
  14: [24, [[4,40],[5,41]]],
  15: [24, [[5,41],[5,42]]],
  16: [28, [[7,45],[3,46]]],
  17: [28, [[10,46],[1,47]]],
  18: [26, [[9,43],[4,44]]],
  19: [26, [[3,44],[11,45]]],
  20: [26, [[3,41],[13,42]]],
  21: [26, [[17,42]]],
  22: [28, [[17,46]]],
  23: [28, [[4,47],[14,48]]],
  24: [28, [[6,45],[14,46]]],
  25: [28, [[8,47],[13,48]]],
  26: [28, [[19,46],[4,47]]],
  27: [28, [[22,45],[3,46]]],
  28: [28, [[3,45],[23,46]]],
  29: [28, [[21,45],[7,46]]],
  30: [28, [[19,47],[10,48]]],
  31: [28, [[2,46],[29,47]]],
  32: [28, [[10,46],[23,47]]],
  33: [28, [[14,46],[21,47]]],
  34: [28, [[14,46],[23,47]]],
  35: [28, [[12,47],[26,48]]],
  36: [28, [[6,47],[34,48]]],
  37: [28, [[29,46],[14,47]]],
  38: [28, [[13,46],[32,47]]],
  39: [28, [[40,47],[7,48]]],
  40: [28, [[18,47],[31,48]]],
  },
  L: {
  1: [7, [[1,19]]],
  2: [10, [[1,34]]],
  3: [15, [[1,55]]],
  4: [20, [[1,80]]],
  5: [26, [[1,108]]],
  6: [18, [[2,68]]],
  7: [20, [[2,78]]],
  8: [24, [[2,97]]],
  9: [30, [[2,116]]],
  10: [18, [[2,68],[2,69]]],
  11: [20, [[4,81]]],
  12: [24, [[2,92],[2,93]]],
  13: [26, [[4,107]]],
  14: [30, [[3,115],[1,116]]],
  15: [22, [[5,87],[1,88]]],
  16: [24, [[5,98],[1,99]]],
  17: [28, [[1,107],[5,108]]],
  18: [30, [[5,120],[1,121]]],
  19: [28, [[3,113],[4,114]]],
  20: [28, [[3,107],[5,108]]],
  21: [28, [[4,116],[4,117]]],
  22: [28, [[2,111],[7,112]]],
  23: [30, [[4,121],[5,122]]],
  24: [30, [[6,117],[4,118]]],
  25: [26, [[8,106],[4,107]]],
  26: [28, [[10,114],[2,115]]],
  27: [30, [[8,122],[4,123]]],
  28: [30, [[3,117],[10,118]]],
  29: [30, [[7,116],[7,117]]],
  30: [30, [[5,115],[10,116]]],
  31: [30, [[13,115],[3,116]]],
  32: [30, [[17,115]]],
  33: [30, [[17,115],[1,116]]],
  34: [30, [[13,115],[6,116]]],
  35: [30, [[12,121],[7,122]]],
  36: [30, [[6,121],[14,122]]],
  37: [30, [[17,122],[4,123]]],
  38: [30, [[4,122],[18,123]]],
  39: [30, [[20,117],[4,118]]],
  40: [30, [[19,118],[6,119]]],
  },
};

// 校正图形中心坐标
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
  11: [6, 30, 54],
  12: [6, 32, 58],
  13: [6, 34, 62],
  14: [6, 26, 46, 66],
  15: [6, 26, 48, 70],
  16: [6, 26, 50, 74],
  17: [6, 30, 54, 78],
  18: [6, 30, 56, 82],
  19: [6, 30, 58, 86],
  20: [6, 34, 62, 90],
  21: [6, 28, 50, 72, 94],
  22: [6, 26, 50, 74, 98],
  23: [6, 30, 54, 78, 102],
  24: [6, 28, 54, 80, 106],
  25: [6, 32, 58, 84, 110],
  26: [6, 30, 58, 86, 114],
  27: [6, 34, 62, 90, 118],
  28: [6, 26, 50, 74, 98, 122],
  29: [6, 30, 54, 78, 102, 126],
  30: [6, 26, 52, 78, 104, 130],
  31: [6, 30, 56, 82, 108, 134],
  32: [6, 34, 60, 86, 112, 138],
  33: [6, 30, 58, 86, 114, 142],
  34: [6, 34, 62, 90, 118, 146],
  35: [6, 30, 54, 78, 102, 126, 150],
  36: [6, 24, 50, 76, 102, 128, 154],
  37: [6, 28, 54, 80, 106, 132, 158],
  38: [6, 32, 58, 84, 110, 136, 162],
  39: [6, 26, 54, 82, 110, 138, 166],
  40: [6, 30, 58, 86, 114, 142, 170],
};

// 纠错等级位（格式信息里 2 bit）：L=01, M=00
const EC_BITS = { L: 1, M: 0 };

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

function dataCapacityBytes(version, ec) {
  const [ecLen, groups] = BLOCKS[ec][version];
  const dataCw = groups.reduce((sum, [n, d]) => sum + n * d, 0);
  const countBits = version >= 10 ? 16 : 8;
  // 4 位模式指示 + countBits 位长度 + 数据 + 最多 4 位终止符，向下取整到字节
  return Math.floor((dataCw * 8 - 4 - countBits) / 8);
}

/** 选最小可用版本：优先 M，装不下退 L，再不行报错 */
function pickVersion(byteLength, prefer) {
  const order = prefer ? [prefer] : ['M', 'L'];
  for (const ec of order) {
    for (let v = 1; v <= 40; v++) {
      if (byteLength <= dataCapacityBytes(v, ec)) return { version: v, ec };
    }
  }
  throw new Error('内容过长，超出二维码 V40 容量');
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

function buildCodewords(bytes, version, ec) {
  const [ecLen, groups] = BLOCKS[ec][version];
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
  const picked = pickVersion(bytes.length, opts.ec);
  const { version, ec } = picked;

  const size = version * 4 + 17;
  const codewords = buildCodewords(bytes, version, ec);
  const alignPos = ALIGN_POS[version];
  const ecBits = EC_BITS[ec];

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
  return { size, version, ec, mask: bestMask, modules: built.modules, isFunction: built.isFunction, codewords };
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
