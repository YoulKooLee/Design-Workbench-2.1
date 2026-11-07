'use strict';

const fs = require('fs');
const path = require('path');
const { clearState } = require('./lib/state.cjs');

// 技能索引注入（2026-10-30 恢复全文注入，与 _project-development 同构）
//
// 历史：本 hook 曾只留一行指针、不注入正文，理由是「INDEX.md 约 22KB，注入会
// 重蹈 AGENTS.md 注入侧截断覆辙」。2026-10-30 重评后恢复注入，依据四条：
//   1. 体量已过期——INDEX.md 实测 6.0 KB / 3,528 字符（52 条），非 22KB；
//   2. 通道不同——AGENTS.md 走宿主 <project_guidance> 注入（CAP 8,000 字符，
//      超限静默切尾），而本 hook 的 additionalContext 是 SessionStart 的
//      另一条通道，不共用那个上限，二者不叠加（check-injection.mjs 实测
//      注入通道 inj 达过 8,184，与此并行）；
//   3. 实测佐证——_project-development 一直全文注入 INDEX 且工作正常；本 hook
//      经宿主式 spawn + stdin 实测能正常返回 additionalContext；
//   4. 收益——技能匹配凭注入的真实索引，不必先 Read 一次文件、也不必遍历
//      SKILL.md（2.41 MB），直接消掉「索引自动加载是声明不是事实」薄弱点。
// 代价：每个会话多约 3.5K 字符常驻。若日后 INDEX 涨回 15KB 以上，应改回指针式，
//       或按 description 首句截断后再注入。
function loadSkillIndex() {
  try {
    const indexFile = path.join(__dirname, '..', 'skills', 'INDEX.md');
    if (!fs.existsSync(indexFile)) {
      return '\n【技能索引缺失】请运行 node .agents/scripts/build-skills-index.mjs 生成。\n';
    }
    return '\n【技能索引（自动注入，供触发词匹配）】\n' + fs.readFileSync(indexFile, 'utf8');
  } catch (e) {
    return '\n【技能索引读取失败】' + ((e && e.message) || String(e)) + '\n';
  }
}

// 常驻预算如实输出（2026-11-07，复盘 P3-3）：把「声明」变成「事实」，AGENTS.md 是否真被宿主全量注入取决于宿主通道。
function residentBudget() {
  try {
    const projRoot = path.join(__dirname, '..', '..');
    const agentsN = fs.readFileSync(path.join(projRoot, 'AGENTS.md'), 'utf8').length;
    const idxN = fs.readFileSync(path.join(__dirname, '..', 'skills', 'INDEX.md'), 'utf8').length;
    return '\n【常驻预算】本会话常驻约 ' + (agentsN + idxN).toLocaleString() + ' 字符（AGENTS.md ' + agentsN.toLocaleString() + ' + 技能索引 ' + idxN.toLocaleString() + '；AGENTS 实际注入量以宿主通道为准，超 8,000 会被截尾）。';
  } catch (e) {
    return '';
  }
}

exports.run = () => {
  // 清理上一个会话的状态文件
  clearState('edited-files.txt');
  clearState('read-files.txt');
  clearState('review-called.txt');

  return {
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext:
        '【会话初始化完成】状态文件已清理。\n' +
        '强制执行清单：\n' +
        '1. 技能检查 — 用下方「技能索引」匹配触发词，命中即加载该技能执行\n' +
        '2. 代码自查 — 修改 src/prototypes/ 或 src/admin/ 后，宣称完成前必须自读改动点做针对性审查（宿主支持子 Agent 且用户已启用时才用 code-reviewer）\n' +
        '3. 验证 — 完成声明前必须运行构建/测试命令' +
        loadSkillIndex() + residentBudget()
    }
  };
};
