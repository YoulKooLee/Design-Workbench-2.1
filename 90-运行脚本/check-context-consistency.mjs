#!/usr/bin/env node
// 上下文一致性校验：检查模板与项目间的 rules/skills/agents 同步状态。
// 用法：node check-context-consistency.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CWD = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TMPL = path.join(CWD, '02-模板/_project-template');
const DEV = path.join(CWD, '02-模板/_project-development');

// 动态扫描项目
const PROJECTS = fs.existsSync(path.join(CWD, '01-项目'))
  ? fs.readdirSync(path.join(CWD, '01-项目'))
      .filter((n) => {
        try { return fs.statSync(path.join(CWD, '01-项目', n)).isDirectory() && fs.existsSync(path.join(CWD, '01-项目', n, 'AGENTS.md')); }
        catch { return false; }
      })
      .map((n) => ({ name: n, root: path.join(CWD, '01-项目', n) }))
  : [];

let issues = 0;
function warn(tag, msg) { issues++; console.log(`  ✗ [${tag}] ${msg}`); }
function ok(tag, msg) { console.log(`  ✓ [${tag}] ${msg}`); }

// ---- 1. 模板 rules 文件在项目中的覆盖 ----
console.log('\n════ 1. Rules 覆盖 ════');
const tmplRules = fs.readdirSync(path.join(TMPL, '.agents/rules'))
  .filter(f => f.endsWith('.md'))
  .sort();

for (const proj of PROJECTS) {
  const projRulesDir = path.join(proj.root, '.agents/rules');
  if (!fs.existsSync(projRulesDir)) { warn(proj.name, '缺少 .agents/rules/ 目录'); continue; }
  const projRules = fs.readdirSync(projRulesDir).filter(f => f.endsWith('.md')).sort();
  const missing = tmplRules.filter(f => !projRules.includes(f));
  const extra = projRules.filter(f => !tmplRules.includes(f));
  if (missing.length === 0 && extra.length === 0) {
    ok(proj.name, `rules 完全覆盖（${tmplRules.length} 个）`);
  } else {
    if (missing.length) warn(proj.name, `rules 缺失: ${missing.join(', ')}`);
    if (extra.length) ok(proj.name, `rules 项目独有: ${extra.join(', ')}（可能合理）`);
  }
}

// ---- 2. 模板 agents 文件在项目中的覆盖 ----
console.log('\n════ 2. Agents 覆盖 ════');
const tmplAgents = fs.readdirSync(path.join(TMPL, '.agents/agents'))
  .filter(f => f.endsWith('.md'))
  .sort();

for (const proj of PROJECTS) {
  const projAgentsDir = path.join(proj.root, '.agents/agents');
  if (!fs.existsSync(projAgentsDir)) { warn(proj.name, '缺少 .agents/agents/ 目录'); continue; }
  const projAgents = fs.readdirSync(projAgentsDir).filter(f => f.endsWith('.md')).sort();
  const missing = tmplAgents.filter(f => !projAgents.includes(f));
  if (missing.length === 0) {
    ok(proj.name, `agents 完全覆盖（${tmplAgents.length} 个）`);
  } else {
    warn(proj.name, `agents 缺失: ${missing.join(', ')}`);
  }
}

// ---- 3. 废弃 agent 残留检查 ----
console.log('\n════ 3. 废弃 Agent 残留 ════');
const ARCHIVED = [
  'req-analyzer', 'req-writer', 'design-analyzer', 'design-writer',
  'page-spec-loader', 'code-reviewer', 'feasibility-analyzer',
  'feasibility-writer', 'feasibility-reviewer', 'planner',
  'diagram-drawer', 'delivery-analyzer', 'template-analyzer',
  'annotation-manager', 'annotation-writer', 'annotation-reviewer'
];

for (const proj of PROJECTS) {
  const projAgentsDir = path.join(proj.root, '.agents/agents');
  if (!fs.existsSync(projAgentsDir)) continue;
  const found = ARCHIVED.filter(a => fs.existsSync(path.join(projAgentsDir, `${a}.md`)));
  if (found.length === 0) {
    ok(proj.name, '无废弃 agent 残留');
  } else {
    warn(proj.name, `废弃 agent 残留: ${found.join(', ')}`);
  }
}

// ---- 4. AGENTS.md 结构一致性 ----
console.log('\n════ 4. AGENTS.md 结构 ════');
const tmplAgSections = fs.readFileSync(path.join(TMPL, 'AGENTS.md'), 'utf8')
  .match(/^## .+$/gm) || [];

for (const proj of PROJECTS) {
  const agPath = path.join(proj.root, 'AGENTS.md');
  if (!fs.existsSync(agPath)) { warn(proj.name, '缺少 AGENTS.md'); continue; }
  const projSections = fs.readFileSync(agPath, 'utf8').match(/^## .+$/gm) || [];
  const missing = tmplAgSections.filter(s => !projSections.includes(s));
  if (missing.length === 0) {
    ok(proj.name, `AGENTS.md 章节结构一致（${projSections.length} 章）`);
  } else {
    warn(proj.name, `AGENTS.md 缺少章节: ${missing.join(', ')}`);
  }
}

// ---- 5. 3+3 审查者 subagent 一致性 ----
console.log('\n════ 5. 3+3 审查者 Subagent ════');
const REQUIRED_AGENTS = ['design-reviewer.md', 'design-note-reviewer.md', 'page-reviewer.md'];
for (const proj of [TMPL, DEV, ...PROJECTS.map(p => p.root)]) {
  const name = path.basename(proj) === '_project-template' ? 'template'
    : path.basename(proj) === '_project-development' ? 'dev'
    : path.basename(proj);
  const agentsDir = path.join(proj, '.agents/agents');
  if (!fs.existsSync(agentsDir)) { warn(name, '缺少 agents 目录'); continue; }
  const missing = REQUIRED_AGENTS.filter(a => !fs.existsSync(path.join(agentsDir, a)));
  if (missing.length === 0) {
    ok(name, '3 审查者 subagent 齐全');
  } else {
    warn(name, `3+3 审查者缺失: ${missing.join(', ')}`);
  }
}

// ---- 6. 重复 skill 检查（已删除的 req-doc-writing/hld-lld-writing/page-spec-loading 不应复活） ----
console.log('\n════ 6. 已删 Skill 不复现 ════');
const DELETED_SKILLS = ['req-doc-writing', 'hld-lld-writing', 'page-spec-loading'];
for (const proj of [TMPL, DEV, ...PROJECTS.map(p => p.root)]) {
  const name = path.basename(proj) === '_project-template' ? 'template'
    : path.basename(proj) === '_project-development' ? 'dev'
    : path.basename(proj);
  const skillsDir = path.join(proj, '.agents/skills');
  if (!fs.existsSync(skillsDir)) continue;
  const found = DELETED_SKILLS.filter(s => fs.existsSync(path.join(skillsDir, s)));
  if (found.length === 0) {
    ok(name, '已删 skill 未复现');
  } else {
    warn(name, `已删 skill 复现: ${found.join(', ')}`);
  }
}

// ---- 汇总 ----
console.log(`\n════ 汇总 ════`);
console.log(issues === 0
  ? `✓ 全部通过（0 个问题）`
  : `✗ 发现 ${issues} 个问题`);
process.exit(issues > 0 ? 1 : 0);
