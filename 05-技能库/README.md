# 05-技能库（工作台级技能，按需取用）

> 定位：不随工程包注入每个项目的长尾技能——PM 方法论重件、外部工具接入、大型生成器。
> 与工程包内 `.agents/skills/`（原型工作高频）的分工：原型链路必需才留工程包；这里是"用得少但别丢"。
> 使用方式：智能体按任务到本库找对应 SKILL.md 读取执行；也可拷入项目临时启用。
> 与 03-组件库 的边界：本库存"方法与流程"（技能），03-组件库存"可复用界面件"（组件）。

## 当前清单

- `pm-feature-prioritization/SKILL.md`
- `pm-market-research/SKILL.md`
- `pm-okr-designer/SKILL.md`
- `pm-product-metrics/SKILL.md`
- `pm-product-pipeline/SKILL.md`
- `pm-release-notes/SKILL.md`
- `pm-roadmap/SKILL.md`
- `pm-sprint-planning/SKILL.md`
- `pm-stakeholder-report/SKILL.md`
- `pm-user-interview/SKILL.md`
- `pm-user-persona/SKILL.md`
- `slides/SKILL.md`
- `feasibility-report/SKILL.md`
- `vibepm-app-generator/SKILL.md`
- `vibepm-style-extractor/SKILL.md`
- `vibepm-web-generator/SKILL.md`
- `ui-design-image/SKILL.md`
- `ui-image-generation/SKILL.md`

## 维护

- 升级回工程包：`git mv 05-技能库/<名> 02-模板/_project-template/.agents/skills/<名>` 后跑 `node .agents/scripts/build-skills-index.mjs`
- 本库清单变化不影响工程包 INDEX（两边索引独立）
