#!/usr/bin/env node
// 检查技能层僵尸状态：引用、exclude字段、INDEX一致性
import fs from 'fs';
import path from 'path';

const TMPL = '02-模板/_project-template/.agents/skills';
const DEV = '02-模板/_project-development/.agents/skills';

// 1. 读取INDEX.md
const indexPath = path.join(TMPL, 'INDEX.md');
const indexContent = fs.readFileSync(indexPath, 'utf-8');
const indexSkills = new Set();
const indexRegex = /^\- \*\*(.+?)\*\* - (.+)$/gm;
let match;
while ((match = indexRegex.exec(indexContent)) !== null) {
  indexSkills.add(match[1]);
}

// 2. 扫描实际技能目录
const skillDirs = fs.readdirSync(TMPL).filter(f => {
  const p = path.join(TMPL, f);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'SKILL.md'));
});

// 3. 检查每个技能
console.log('=== 技能复测报告 ===\n');
console.log(`INDEX中: ${indexSkills.size} 个`);
console.log(`磁盘上: ${skillDirs.length} 个\n`);

const issues = [];
const good = [];

for (const skill of skillDirs) {
  const skillPath = path.join(TMPL, skill, 'SKILL.md');
  const content = fs.readFileSync(skillPath, 'utf-8');
  
  // 检查description
  const descMatch = content.match(/description:\s*(.+)/);
  const desc = descMatch ? descMatch[1].replace(/['"]/g, '').trim() : '';
  
  // 检查exclude
  const hasExclude = content.includes('exclude:');
  
  // 检查是否被INDEX收录
  const inIndex = indexSkills.has(skill);
  
  // 检查references目录
  const refsPath = path.join(TMPL, skill, 'references');
  const hasRefs = fs.existsSync(refsPath) && fs.readdirSync(refsPath).length > 0;
  
  // 检查行数
  const lines = content.split('\n').length;
  
  // 判断问题
  if (!inIndex) {
    issues.push({ skill, issue: '未在INDEX中', lines, hasExclude, hasRefs });
  } else if (desc.length < 20) {
    issues.push({ skill, issue: 'description过短', desc: desc.substring(0, 30), lines, hasExclude, hasRefs });
  } else if (!hasExclude) {
    issues.push({ skill, issue: '缺少exclude字段', lines, hasExclude, hasRefs });
  } else {
    good.push({ skill, lines, hasExclude, hasRefs, desc: desc.substring(0, 50) });
  }
}

// 4. 输出结果
if (issues.length > 0) {
  console.log(`⚠️  发现 ${issues.length} 个问题技能：\n`);
  for (const item of issues) {
    console.log(`- ${item.skill}: ${item.issue} (${item.lines}行)`);
    if (item.desc) console.log(`  desc: ${item.desc}`);
    console.log(`  exclude: ${item.hasExclude ? '✓' : '✗'}  references: ${item.hasRefs ? '✓' : '✗'}`);
  }
} else {
  console.log('✅ 所有技能状态良好\n');
}

if (good.length > 0) {
  console.log(`\n✅ 健康技能 (${good.length}个):`);
  for (const item of good.slice(0, 5)) {
    console.log(`- ${item.skill}: ${item.lines}行, exclude: ${item.hasExclude ? '✓' : '✗'}, refs: ${item.hasRefs ? '✓' : '✗'}`);
  }
  if (good.length > 5) console.log(`  ... 还有 ${good.length - 5} 个`);
}

// 5. 汇总
console.log('\n=== 汇总 ===');
console.log(`总技能: ${skillDirs.length}`);
console.log(`健康: ${good.length}`);
console.log(`问题: ${issues.length}`);
console.log(`建议:`);
if (issues.some(i => i.issue === '未在INDEX中')) {
  console.log(`- 重建INDEX: node .agents/scripts/build-skills-index.mjs`);
}
if (issues.some(i => i.issue === '缺少exclude字段')) {
  console.log(`- 为缺少exclude的技能添加排除条件（P1-3已完成6个）`);
}
if (issues.some(i => i.desc && i.desc.length < 20)) {
  console.log(`- 为description过短的技能补充说明`);
}
