import fs from 'node:fs';

const T1 = 'C:\\Users\\游翔\\Documents\\AI work\\产品设计工作台\\09-协作\\rooms\\DeepSeek_工程包上下文工程设计落地\\messages.jsonl';

const lines = fs.readFileSync(T1, 'utf-8').split(/\r?\n/).filter(Boolean);
console.log(`T1 房间消息流共 ${lines.length} 条\n`);

// 只看 qwen 发出终稿之后（08:34Z 之后）的消息
const objs = lines.map((l, i) => {
  try { return { i, ...JSON.parse(l) }; } catch { return { i, raw: l.slice(0, 120) }; }
}).filter(o => o.ts && o.ts > '2026-09-18T08:34:00');

console.log(`=== 终稿投递(08:34Z)之后的消息：${objs.length} 条 ===\n`);

for (const m of objs) {
  console.log(`--- #${m.i}  ${m.ts}  from=${m.from}  to=${m.to}  type=${m.type} ---`);
  const b = m.body || m.content || '';
  console.log(b);
  console.log('');
}
