// 二维码编码器校验：与 Python segno 逐位比对（8 种掩码 × 多个样本）
import { execFileSync } from 'node:child_process';
import { qrMatrix } from './qr-encoder.js';

const samples = [
  'http://192.168.1.158:53817/?projectId=%E6%B5%8B%E8%AF%95&p=shadcn-admin-dashboard',
  'http://localhost:53817/',
  'A',
  'HELLO WORLD',
  'https://axhub.im/html/abc?token=0123456789abcdef&p=x',
  '中文内容测试二维码编码是否正确',
  'x'.repeat(100),
];

const py = `
import json, sys
import segno
items = json.loads(sys.argv[1])
out = []
for text in items:
    row = []
    for mask in range(8):
        q = segno.make(text, error='m', mode='byte', mask=mask, boost_error=False, micro=False)
        row.append([int(x) for r in q.matrix for x in r])
    out.append({'version': q.version, 'size': q.symbol_size()[0], 'masks': row})
print(json.dumps(out))
`;

const json = execFileSync('python', ['-c', py, JSON.stringify(samples)], {
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
});

const ref = JSON.parse(json);
let checked = 0;
let failed = 0;

samples.forEach((text, idx) => {
  const r = ref[idx];
  for (let mask = 0; mask < 8; mask++) {
    const mine = qrMatrix(text, { mask });
    const flat = [];
    for (const row of mine.modules) for (const v of row) flat.push(v ? 1 : 0);
    const target = r.masks[mask];
    const same = flat.length === target.length && flat.every((v, i) => v === target[i]);
    checked++;
    if (!same) {
      failed++;
      const diff = flat.reduce((acc, v, i) => acc + (v === target[i] ? 0 : 1), 0);
      console.log(`✗ 不一致: "${text.slice(0, 24)}…" mask=${mask} v${mine.version}/${r.version} size=${mine.size} 差异格数=${diff}`);
    }
  }
  console.log(`· "${text.slice(0, 30)}${text.length > 30 ? '…' : ''}" → v${r.version} ${r.size}x${r.size} (${text.length} 字符/byte ${new TextEncoder().encode(text).length})`);
});

console.log(`\n比对 ${checked} 组矩阵，失败 ${failed} 组`);
process.exit(failed ? 1 : 0);
