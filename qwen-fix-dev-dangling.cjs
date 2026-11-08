const fs = require('fs');
const path = require('path');

const DEV = path.join(__dirname, '02-模板/_project-development');

function rep(f, old, nw) {
  const fp = path.join(DEV, f);
  if (!fs.existsSync(fp)) { console.log(`  SKIP (not exist): ${f}`); return 0; }
  let t = fs.readFileSync(fp, 'utf8');
  if (!t.includes(old)) { console.log(`  MISS: ${f}  "${old.substring(0,40)}..."`); return 0; }
  t = t.split(old).join(nw);
  fs.writeFileSync(fp, t);
  console.log(`  OK: ${f}`);
  return 1;
}

let total = 0;

// 1. 删除 core-workflow.md — 这是 template 原型工作流，误复制到 dev
//    dev 有自己的 development-workflow.md 和 srs-writer-workflow.md
const cwf = path.join(DEV, '.agents/rules/core-workflow.md');
if (fs.existsSync(cwf)) {
  fs.unlinkSync(cwf);
  console.log('OK: 删除 core-workflow.md（template原型工作流，不适用于dev）');
  total++;
}

// 2. prd-to-srs-gate.md: req-doc → req-doc-writing（dev侧skill名不同）
total += rep('.agents/rules/prd-to-srs-gate.md',
  '.agents/skills/req-doc/SKILL.md',
  '.agents/skills/req-doc-writing/SKILL.md');
total += rep('.agents/rules/prd-to-srs-gate.md',
  '.agents/skills/req-doc/references/prd-to-srs-handoff.md',
  '.agents/skills/req-doc-writing/references/prd-to-srs-handoff.md');

// 3. req-doc-routing.md: req-writer.md 已归档 → 标注废弃
total += rep('.agents/rules/req-doc-routing.md',
  '.agents/agents/req-writer.md',
  '.agents/_archive/agents/req-writer.md（已归档，功能合并入 req-doc-writing skill）');

// 4. req-doc-workflow.md: req-doc → req-doc-writing
total += rep('.agents/rules/req-doc-workflow.md',
  '../skills/req-doc/references/prd-to-srs-handoff.md',
  '../skills/req-doc-writing/references/prd-to-srs-handoff.md');

// 5. context-budget.md: 章节名引用修正
total += rep('.agents/rules/context-budget.md',
  '严禁遍历技能目录',
  '按需读取（严禁遍历）');

// 6. role-dispatch.md: AGENTS.md 章节名修正
total += rep('.agents/rules/role-dispatch.md',
  'AGENTS.md「角色调度」',
  'AGENTS.md §三 角色调度');

// 7. diagram-generator/SKILL.md: config.json 不存在 → 标注
total += rep('.agents/skills/diagram-generator/SKILL.md',
  '.agents/skills/config.json',
  '.agents/skills/config.json（按需创建，存放图表配置）');

// 8. hld-design/SKILL.md: req-doc → req-doc-writing + config.json
total += rep('.agents/skills/hld-design/SKILL.md',
  '.agents/skills/req-doc/SKILL.md',
  '.agents/skills/req-doc-writing/SKILL.md');
total += rep('.agents/skills/hld-design/SKILL.md',
  '.agents/skills/config.json',
  '.agents/skills/config.json（按需创建，存放图表配置）');

// 9. lld-design/SKILL.md: req-doc → req-doc-writing
total += rep('.agents/skills/lld-design/SKILL.md',
  '.agents/skills/req-doc/SKILL.md',
  '.agents/skills/req-doc-writing/SKILL.md');

// 10. page-spec-loading/SKILL.md: component-manifest.json 不存在 → 标注
total += rep('.agents/skills/page-spec-loading/SKILL.md',
  '.agents/component-manifest.json',
  '.agents/component-manifest.json（按需创建，存放组件清单）');

// 11. _archive/agents/diagram-drawer.md: 自引用（归档指向原位）→ 修正为自身
const archFile = path.join(DEV, '.agents/_archive/agents/diagram-drawer.md');
if (fs.existsSync(archFile)) {
  let t = fs.readFileSync(archFile, 'utf8');
  t = t.replace('.agents/agents/diagram-drawer.md', '.agents/_archive/agents/diagram-drawer.md');
  fs.writeFileSync(archFile, t);
  console.log('  OK: _archive/agents/diagram-drawer.md 自引用修正');
  total++;
}

console.log(`\n共修复 ${total} 处`);
