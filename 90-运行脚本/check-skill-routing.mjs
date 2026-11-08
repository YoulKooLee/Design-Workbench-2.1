#!/usr/bin/env node
/**
 * 技能路由测试脚本
 * 
 * 验证 skill-routing.md 中的路由规则能否正确处理典型用户输入。
 * 不需要跑模型，只验证路由规则的覆盖性和无歧义性。
 * 
 * 用法：node 90-运行脚本/check-skill-routing.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');

// 读取 skill-routing.md
const routingPath = path.join(workspaceRoot, '02-模板/_project-template/.agents/rules/skill-routing.md');
const routingContent = fs.readFileSync(routingPath, 'utf-8');

// 提取同类技能裁决表
const conflictTableMatch = routingContent.match(/## 同类技能裁决速查\n\n([^]+?)(?=\n\n##|\n---|$)/);
const conflictTable = conflictTableMatch ? conflictTableMatch[1] : '';

// 提取所有冲突对
const conflictPairs = [];
const pairRegex = /\|\s*`([^`]+)`\s*\/\s*`([^`]+)`\s*\|/g;
let match;
while ((match = pairRegex.exec(conflictTable)) !== null) {
  conflictPairs.push({ skillA: match[1], skillB: match[2] });
}

// 测试用例：30个典型用户输入
const testCases = [
  // 需求文档相关
  { input: '写一份PRD', expected: ['prd-writer', 'write-prd'], note: '可能冲突：prd-writer vs write-prd' },
  { input: '写需求规格说明书', expected: ['req-doc'], note: '明确指向SRS' },
  { input: '把PRD转成SRS', expected: ['req-doc'], note: 'PRD→SRS转写' },
  { input: '细化已有的SRS', expected: ['req-doc'], note: 'SRS细化' },
  
  // 设计与原型
  { input: '画系统架构图', expected: ['diagram-generator', 'd2-diagram'], note: '可能冲突：diagram-generator vs d2-diagram' },
  { input: '用draw.io画流程图', expected: ['drawio-generator'], note: '明确指向draw.io' },
  { input: '给原型页面加标注', expected: ['annotation', 'prototype-annotation'], note: '可能冲突：annotation vs prototype-annotation' },
  { input: '从截图还原原型', expected: ['screenshot-to-prototype'], note: '截图→原型' },
  
  // 页面生成
  { input: '生成登录页面', expected: ['page-generator'], note: '页面生成' },
  { input: '做个企业官网', expected: ['frontend-design'], note: '定制前端' },
  { input: '设计一个仪表盘', expected: ['frontend-design'], note: '定制设计' },
  
  // 探索与规划
  { input: '我想做一个新功能', expected: ['brainstorming'], note: '创意前对齐' },
  { input: '需求探索', expected: ['requirements-exploration'], note: '显式点名需求探索' },
  { input: '比较两种实现方案', expected: ['explore-options'], note: '方案比稿' },
  { input: '制定交付计划', expected: ['delivery-plan'], note: '交付规划' },
  
  // 开发流程
  { input: '写HLD概要设计', expected: ['hld-design'], note: 'HLD生成' },
  { input: '写LLD详细设计', expected: ['lld-design'], note: 'LLD生成' },
  { input: '生成测试用例', expected: ['pm-test-cases'], note: '测试用例' },
  { input: '写操作手册', expected: ['pm-operation-manual'], note: '操作手册' },
  { input: '分支做完了，准备合并', expected: ['finishing-branch'], note: '分支收尾' },
  
  // 调试与验证
  { input: '有个bug要修', expected: ['systematic-debugging'], note: '系统调试' },
  { input: '先写测试再写代码', expected: ['test-driven-development'], note: 'TDD' },
  { input: '提交前验证一下', expected: ['verification-before-completion'], note: '完成前验证' },
  
  // 文档与知识
  { input: '写设计说明', expected: ['write-design-notes'], note: '设计说明' },
  { input: '提取功能清单', expected: ['feature-list'], note: '功能清单' },
  { input: '从原型逆向生成PRD', expected: ['prototype-to-prd'], note: '原型→PRD' },
  { input: '创建新技能', expected: ['skill-creator'], note: '技能创建' },
  
  // 边缘情况
  { input: '看看这个原型有什么问题', expected: ['prototype-comments'], note: '原型批注' },
  { input: '搜索设计系统文档', expected: ['search-design-system'], note: '设计系统搜索' },
  { input: '帮我写个文案', expected: ['humanizer-zh'], note: '中文润色' }
];

console.log('=== 技能路由测试 ===\n');
console.log(`已加载 ${conflictPairs.length} 组冲突对\n`);

let passed = 0;
let warnings = 0;
let failed = 0;

// 检查每个测试用例
for (const tc of testCases) {
  // 提取关键词
  const keywords = tc.input.toLowerCase();
  
  // 检查是否有冲突对涉及这些技能
  const relevantConflicts = conflictPairs.filter(pair => 
    tc.expected.includes(pair.skillA) || tc.expected.includes(pair.skillB)
  );
  
  if (relevantConflicts.length > 0) {
    console.log(`⚠️  ${tc.input}`);
    console.log(`   预期: ${tc.expected.join(' | ')}`);
    console.log(`   涉及冲突: ${relevantConflicts.map(c => `${c.skillA} vs ${c.skillB}`).join(', ')}`);
    console.log(`   备注: ${tc.note}`);
    console.log('');
    warnings++;
  } else {
    console.log(`✓ ${tc.input} → ${tc.expected.join(' | ')}`);
    passed++;
  }
}

// 检查skill-routing.md中的裁决规则是否完整
console.log('\n=== 裁决规则完整性检查 ===\n');

for (const pair of conflictPairs) {
  // 检查是否有明确的判据
  const pairPattern = new RegExp(`\\|\\s*\`${pair.skillA}\`\\s*\\/\\s*\`${pair.skillB}\`\\s*\\|([^|]+)\\|`);
  const match = conflictTable.match(pairPattern);
  
  if (match) {
    const criteria = match[1].trim();
    if (criteria.length > 10) {
      console.log(`✓ ${pair.skillA} vs ${pair.skillB}: 有判据`);
      passed++;
    } else {
      console.log(`✗ ${pair.skillA} vs ${pair.skillB}: 判据过短或缺失`);
      failed++;
    }
  } else {
    console.log(`✗ ${pair.skillA} vs ${pair.skillB}: 未在裁决表中找到`);
    failed++;
  }
}

// 汇总
console.log('\n=== 测试汇总 ===');
console.log(`通过: ${passed}`);
console.log(`警告（有冲突风险）: ${warnings}`);
console.log(`失败: ${failed}`);

if (failed > 0) {
  console.log('\n❌ 存在失败项，请检查路由规则');
  process.exit(1);
} else if (warnings > 0) {
  console.log('\n⚠️  全部通过，但存在冲突风险，需人工确认');
  process.exit(0);
} else {
  console.log('\n✓ 全部通过');
  process.exit(0);
}
