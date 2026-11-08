// 端到端校验：本项目的二维码矩阵 → 位图 → 用 OpenCV 真实解码，比对原文
import { execFileSync } from 'node:child_process';
import { qrMatrix } from './qr-encoder.js';

const samples = [
  'http://192.168.1.158:53817/?projectId=%E6%B5%8B%E8%AF%95&p=shadcn-admin-dashboard',
  'http://localhost:53817/',
  'A',
  'HELLO WORLD',
  'https://axhub.im/html/abc?token=0123456789abcdef',
  '中文内容测试二维码编码是否正确',
  'x'.repeat(100),
  'http://192.168.1.158:53817/?projectId=' + encodeURIComponent('崂山国家实验室园区数字孪生大屏') + '&p=overview',
];

const jobs = [];
for (const text of samples) {
  for (const mask of [0, 1, 2, 3, 4, 5, 6, 7]) {
    const { modules, size } = qrMatrix(text, { mask });
    jobs.push({ text, mask, size, flat: modules.flat().map((v) => (v ? 1 : 0)).join('') });
  }
  const auto = qrMatrix(text);
  jobs.push({ text, mask: 'auto', size: auto.size, flat: auto.modules.flat().map((v) => (v ? 1 : 0)).join('') });
}

const py = `
import json, sys, numpy as np, cv2
jobs = json.loads(sys.stdin.read())
det = cv2.QRCodeDetector()
bad = []
for j in jobs:
    n = j['size']
    grid = np.array([int(c) for c in j['flat']], dtype=np.uint8).reshape(n, n)
    ok = False
    got = ''
    # 解码器对分辨率敏感，多尺度重试（任一成功即视为有效）
    for scale, border in ((6, 4), (10, 4), (14, 6), (20, 4)):
        img = (1 - grid) * 255
        img = np.pad(img, border, constant_values=255)
        img = np.kron(img, np.ones((scale, scale), dtype=np.uint8))
        val, _pts, _ = det.detectAndDecode(img)
        if val == j['text']:
            ok = True
            break
        got = got or (val or '')
    if not ok:
        bad.append({'mask': j['mask'], 'text': j['text'][:30], 'got': got[:40]})
print(json.dumps({'total': len(jobs), 'bad': bad}, ensure_ascii=False))
`;

const res = execFileSync('python', ['-c', py], {
  input: JSON.stringify(jobs),
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
});
const { total, bad } = JSON.parse(res);
console.log(res.length < 4000 ? res : '');
console.log(`解码校验：${total} 张，失败 ${bad.length} 张`);
for (const b of bad.slice(0, 10)) console.log('  ✗', b);
process.exit(bad.length ? 1 : 0);
