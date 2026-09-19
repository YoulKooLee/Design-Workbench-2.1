import fs from 'node:fs';
import path from 'node:path';

const W = 'C:\\Users\\游翔\\Documents\\AI work\\产品设计工作台';
const T = path.join(W, '02-模板', '_project-template');
const AG = path.join(T, 'AGENTS.md');

function rd(p) { try { return fs.readFileSync(p, 'utf-8'); } catch { return null; } }
function sz(p) { try { return fs.statSync(p).size; } catch { return -1; } }
function walk(d) {
  const o = []; let e;
  try { e = fs.readdirSync(d, { withFileTypes: true }); } catch { return o; }
  for (const x of e) {
    const p = path.join(d, x.name);
    if (x.isDirectory()) { if (x.name !== 'node_modules' && x.name !== '.git') o.push(...walk(p)); } else o.push(p);
  }
  return o;
}

const ag = rd(AG);
const agLines = ag.split(/\r?\n/);
console.log('══════ 一、AGENTS.md 自述数字 vs 实测（豆包落地后是否自洽）══════\n');
console.log(`  实测大小: ${sz(AG)} B = ${(sz(AG)/1024).toFixed(1)} KB   实测行数: ${agLines.length}`);
// 找出文中所有自称体量的地方
agLines.forEach((l, i) => {
  const m = l.match(/(约?\s*[\d.]+\s*KB|[\d.]+\s*KB|[\d.]+\s*MB)/g);
  if (m && /(本文件|AGENTS|技能区|知识库|rules|实测更新)/.test(l)) {
    console.log(`  L${i+1} 自称: ${m.join(', ')}   ← ${l.trim().slice(0, 70)}`);
  }
});

console.log('\n  技能数自称（应全一致）:');
agLines.forEach((l, i) => {
  const m = l.match(/(\d+)\s*个(?:工作流)?技能|技能[^\n]{0,6}(\d+)\s*个|目录（(\d+)\s*个）/g);
  if (m) console.log(`    L${i+1}: ${m.join(' | ')}   ← ${l.trim().slice(0, 60)}`);
});
const realSkills = fs.readdirSync(path.join(T, '.agents', 'skills'), { withFileTypes: true }).filter(d => d.isDirectory()).length;
const idxSkills = (rd(path.join(T, '.agents', 'skills', 'INDEX.md')) || '').match(/^###?\s|\|\s*`?[a-z0-9-]+`?\s*\|/gm);
console.log(`    实测 .agents/skills 子目录数: ${realSkills}`);
const lock = rd(path.join(T, 'skills-lock.json'));
if (lock) { try { const j = JSON.parse(lock); console.log(`    skills-lock.json: count=${j.count ?? '(无count字段)'}  skills键数=${j.skills ? Object.keys(j.skills).length : '?'}  hash=${(j.hash||'').slice(0,16)}`); } catch (e) { console.log('    skills-lock.json 解析失败: ' + e.message); } }

console.log('\n══════ 二、实测技能区体量（AGENTS.md 称 3.3MB，但 drawio-generator 已删）══════');
const skDir = path.join(T, '.agents', 'skills');
const skF = walk(skDir);
const skB = skF.reduce((s, f) => s + sz(f), 0);
console.log(`  .agents/skills: ${skF.length} 文件, ${(skB/1024/1024).toFixed(2)} MB`);
const smd = skF.filter(f => path.basename(f) === 'SKILL.md');
console.log(`  其中 SKILL.md: ${smd.length} 个, ${(smd.reduce((s,f)=>s+sz(f),0)/1024).toFixed(0)} KB`);
console.log(`  drawio-generator 是否还在: ${fs.existsSync(path.join(skDir,'drawio-generator')) ? '在 ✗（AGENTS.md 裁决表还引用它）' : '已删 ✓'}`);
for (const d of ['diagram-generator','knowledge']) {
  const p = d === 'knowledge' ? path.join(T,'.agents','knowledge') : path.join(skDir, d);
  if (fs.existsSync(p)) { const f = walk(p); console.log(`  ${d}: ${f.length} 文件 ${(f.reduce((s,x)=>s+sz(x),0)/1024/1024).toFixed(2)} MB`); }
}
const rulesDir = path.join(T, 'rules');
if (fs.existsSync(rulesDir)) { const f = walk(rulesDir); console.log(`  根级 rules/: ${f.length} 文件 ${(f.reduce((s,x)=>s+sz(x),0)/1024/1024).toFixed(2)} MB`); }

console.log('\n══════ 三、AGENTS.md 里的死引用（指向已删/已移目标）══════');
const deadRefs = [];
agLines.forEach((l, i) => {
  const refs = l.match(/`?[\w./\\-]+\.(?:md|json|cjs|mjs|js)`?/g) || [];
  for (const r0 of refs) {
    const r = r0.replace(/`/g, '');
    if (!/^(AGENTS|README|CLAUDE|LICENSE|package\.json|tsconfig|vite\.config|pnpm-lock|index\.html)/.test(r)) continue;
  }
  // 只查明确的路径引用
  const paths = l.match(/(?:\.agents|rules|src|templates|admin|03-组件库|02-模板|vendor)[\w./\\\-]*/g) || [];
  for (const p of paths) {
    const clean = p.replace(/[，。、；：）)】`]/g, '').replace(/\/$/, '');
    if (clean.length < 6) continue;
    const cand = [path.join(T, clean), path.join(W, clean), path.join(W, '02-模板', clean)];
    if (!cand.some(c => fs.existsSync(c))) {
      // 可能是模式串（含 <> 或 *）
      if (/[<>*{}]/.test(clean)) continue;
      deadRefs.push(`  L${i+1}: ${clean}`);
    }
  }
});
console.log(deadRefs.length ? [...new Set(deadRefs)].join('\n') : '  未发现死引用 ✓');

console.log('\n══════ 四、drawio-generator 死引用定位（技能已删但裁决表还在）══════');
agLines.forEach((l, i) => { if (/drawio-generator/.test(l)) console.log(`  L${i+1}: ${l.trim().slice(0,120)}`); });

console.log('\n══════ 五、N3/N4/N5/F2 落地核验 ══════');
const checks = [
  ['N3 模块快照模板', path.join(T,'.agents','rules','compaction-recovery.md'), /模块完成快照/],
  ['N3 数据流闭环闸门', path.join(T,'.agents','rules','compaction-recovery.md'), /闭环|闸门/],
  ['N4 hld-spec 第12项', path.join(T,'.agents','knowledge','phase2-design','hld-spec.md'), /孤儿数据|数据流闭环|12\./],
  ['N5 manifest', path.join(T,'.agents','component-manifest.json'), /mappings|version/],
  ['F2 hook 补 03-组件库', path.join(T,'.agents','hooks','context-budget.cjs'), /03-组件库/],
  ['N2 project-memory 过程层', path.join(T,'project-memory.md'), /过程层|决策记录/],
];
for (const [name, p, re] of checks) {
  const c = rd(p);
  if (c === null) { console.log(`  ✗ ${name}: 文件不存在 ${p.replace(T,'')}`); continue; }
  console.log(`  ${re.test(c) ? '✓' : '✗'} ${name}: ${sz(p)} B  匹配=${re.test(c)}`);
}

console.log('\n══════ 六、context-budget hook 覆盖范围实测 ══════');
const cb = rd(path.join(T,'.agents','hooks','context-budget.cjs'));
if (cb) {
  const pats = cb.match(/re:\s*\/[^/]+\//g) || [];
  console.log('  拦截模式:');
  pats.forEach(p => console.log('    ' + p.replace('re: ','')));
  console.log('  总行数: ' + cb.split(/\r?\n/).length);
}

console.log('\n══════ 七、你三点意见的事实基础 ══════');
// 意见1: AGENTS.md 是否在常驻基线里
console.log('  意见1 - AGENTS.md 是否列入常驻基线6项:');
const baseline = ag.slice(ag.indexOf('【常驻基线】'), ag.indexOf('【模块滑窗】'));
console.log('    常驻基线6项中是否提到 AGENTS.md: ' + (/AGENTS\.md/.test(baseline) ? '有' : '无（但预算表把 AGENTS.md 单列一行）'));
console.log('    预算表 AGENTS.md 行: ' + (agLines.find(l => /AGENTS\.md \+ 系统提示/.test(l)) || '(未找到)').trim());
// 意见2: 解释性内容占比
let expl = 0, exec = 0;
agLines.forEach(l => {
  const t = l.trim();
  if (!t) return;
  if (/^(>|\|.*理由|.*——.*因为|.*原因[:：]|.*背景)/.test(t) || /理由|原因|背景|为什么|说明[:：]|即|也就是说|这是因为/.test(t)) expl++;
  else exec++;
});
console.log(`\n  意见2 - 解释性行 vs 执行性行（粗判）: 解释 ${expl} / 执行 ${exec} = 解释占 ${(expl/(expl+exec)*100).toFixed(0)}%`);
console.log('    章节结构（一级/二级标题）:');
agLines.forEach((l, i) => { if (/^#{1,2}\s/.test(l)) console.log(`      L${String(i+1).padStart(3)}: ${l.trim().slice(0,60)}`); });
// 意见3: 部署清单
console.log('\n  意见3 - 部署清单位置与内容:');
const depIdx = agLines.findIndex(l => /^##\s*部署清单/.test(l));
console.log(`    「部署清单」在 L${depIdx+1}，是全文最后一个章节（总 ${agLines.length} 行）`);
console.log(`    占 ${agLines.length - depIdx} 行 = 文末 ${(agLines.length-depIdx)} 行`);
console.log('    workbench.config.json 的 template.allowedList 是否含 AGENTS.template.md:');
const cfg = JSON.parse(rd(path.join(W,'workbench.config.json')));
console.log('      allowedList = ' + JSON.stringify(cfg.template?.allowedList));
