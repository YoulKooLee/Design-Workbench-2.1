import fs from 'node:fs';

const T = 'C:\\Users\\游翔\\Documents\\AI work\\产品设计工作台\\02-模板\\_project-template';
const lines = fs.readFileSync(T + '\\AGENTS.md', 'utf-8').split(/\r?\n/);

const idx = [];
lines.forEach((l, i) => { if (/^#{1,2}\s/.test(l)) idx.push({ i, t: l.trim() }); });

const rows = idx.map((h, k) => {
  const s = h.i;
  const e = k + 1 < idx.length ? idx[k + 1].i - 1 : lines.length - 1;
  const seg = lines.slice(s, e + 1).join('\n');
  return { b: Buffer.byteLength(seg, 'utf-8'), n: e - s + 1, l: s + 1, t: h.t };
});

console.log('=== AGENTS.md 各章节体量（降序）===');
rows.sort((a, b) => b.b - a.b).forEach(r => {
  console.log(`  ${String(r.b).padStart(6)} B  ${String(r.n).padStart(4)} 行  L${String(r.l).padEnd(4)} ${r.t.slice(0, 54)}`);
});
console.log(`\n  合计 ${rows.reduce((s, r) => s + r.b, 0)} B  (文件 ${Buffer.byteLength(lines.join('\n'),'utf-8')} B)`);

console.log('\n=== 表格行数占比（表格是执行规则，不宜删；但可查是否有冗余列）===');
let tbl = 0, code = 0, quote = 0;
let inCode = false;
lines.forEach(l => {
  if (/^```/.test(l.trim())) { inCode = !inCode; return; }
  if (inCode) { code++; return; }
  if (/^\s*\|/.test(l)) tbl++;
  else if (/^\s*>/.test(l)) quote++;
});
console.log(`  表格行: ${tbl}   代码块行: ${code}   引用块行: ${quote}   总行: ${lines.length}`);

console.log('\n=== 最长的 10 行（可能是可精简的长句）===');
lines.map((l, i) => ({ i: i + 1, b: Buffer.byteLength(l, 'utf-8'), t: l }))
  .sort((a, b) => b.b - a.b).slice(0, 10)
  .forEach(r => console.log(`  ${String(r.b).padStart(5)} B  L${String(r.i).padEnd(4)} ${r.t.trim().slice(0, 80)}`));

console.log('\n=== 检查是否有可下沉到 .agents/rules 的整块内容 ===');
// 找连续的说明性段落（非表格非代码）
const cands = [];
rows.forEach(r => {
  if (['## 项目结构', '## 知识库与 Hook 门禁', '## 记忆分层与门禁', '## 工作台记忆引用', '## 子 Agent 编排'].some(x => r.t.startsWith(x))) {
    cands.push(r);
  }
});
cands.sort((a, b) => b.b - a.b).forEach(r => console.log(`  候选外移: ${r.t}  ${r.b} B  ${r.n} 行 (L${r.l})`));
