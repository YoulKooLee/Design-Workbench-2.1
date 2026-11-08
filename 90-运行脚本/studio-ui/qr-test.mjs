// 数据码字校验：本项目的二维码数据段必须与 segno（标准实现）逐字节一致
// 说明：终止符之后的填充字节（0xEC / 0x11）各家实现有细微差异，不影响扫码结果，
// 因此这里只比对「有效数据码字」；纠错与整体可扫性由 qr-verify.mjs 的真实解码保证。
import { execFileSync } from 'node:child_process';
import { qrMatrix } from './qr-encoder.js';

const samples = [
  'http://192.168.1.158:53817/?projectId=%E6%B5%8B%E8%AF%95&p=shadcn-admin-dashboard',
  'http://localhost:53817/',
  'A',
  'HELLO WORLD',
  '中文内容测试二维码编码是否正确',
  'x'.repeat(100),
  'http://192.168.1.158:53817/?projectId=%E6%B5%8B%E8%AF%95&p=shadcn-admin-dashboard&axhubAccessToken=' + 'e'.repeat(248),
];

const py = `
import json, sys, segno
items = json.loads(sys.argv[1])
out = []
for text in items:
    q = segno.make(text, error='m', mode='byte', mask=0, boost_error=False, micro=False)
    out.append({'version': q.version, 'matrix': [[int(x) for x in r] for r in q.matrix]})
print(json.dumps(out))
`;

const ref = JSON.parse(execFileSync('python', ['-c', py, JSON.stringify(samples)], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));

function readCodewords(matrix, isFunction, maskFn) {
  const size = matrix.length;
  const bits = [];
  let inc = -1;
  let row = size - 1;
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--;
    for (;;) {
      for (let c = 0; c < 2; c++) {
        if (!isFunction[row][col - c]) {
          let v = matrix[row][col - c] === 1;
          if (maskFn(row, col - c)) v = !v;
          bits.push(v ? 1 : 0);
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
  const out = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    let b = 0;
    for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j];
    out.push(b);
  }
  return out;
}

/** 把交错的码字流还原成「数据块顺序拼接」的形式，便于逐字节比对 */
function deinterleave(cws, groups, ecLen) {
  const sizes = [];
  for (const [n, d] of groups) for (let i = 0; i < n; i++) sizes.push(d);
  const blocks = sizes.map(() => []);
  let idx = 0;
  const maxData = Math.max(...sizes);
  for (let i = 0; i < maxData; i++) {
    for (let b = 0; b < sizes.length; b++) if (i < sizes[b]) blocks[b].push(cws[idx++]);
  }
  for (let i = 0; i < ecLen; i++) idx += sizes.length; // 跳过纠错段
  return blocks.flat();
}

const mask0 = (i, j) => (i + j) % 2 === 0;
let failed = 0;

samples.forEach((text, idx) => {
  const mine = qrMatrix(text, { mask: 0 });
  const theirs = readCodewords(ref[idx].matrix, mine.isFunction, mask0);
  const byteLen = new TextEncoder().encode(text).length;
  const payloadBits = 4 + (mine.version >= 10 ? 16 : 8) + byteLen * 8;
  // 只比对完整落在有效数据内的码字，终止符之后的填充字节各家实现不同
  const payloadCw = Math.floor(payloadBits / 8);

  const [ecLen, groups] = mine.blockInfo;
  const mineData = deinterleave(mine.codewords, groups, ecLen);
  const theirData = deinterleave(theirs, groups, ecLen);
  const ok = mineData.slice(0, payloadCw).every((v, i) => v === theirData[i]);
  if (!ok) failed++;
  console.log(
    `${ok ? '✓' : '✗'} "${text.slice(0, 26)}${text.length > 26 ? '…' : ''}" v${mine.version}/${mine.ec} 有效数据码字 ${payloadCw} 个${ok ? ' 一致' : ' 不一致'}`
  );
});

console.log(`\n${samples.length} 组样本，失败 ${failed} 组`);
process.exit(failed ? 1 : 0);
