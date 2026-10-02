# Agent Skills 候选清单（对产品设计工作台 / 项目工程包有用）

- **来源**：https://github.com/VoltAgent/awesome-agent-skills （1497+ 技能索引，仅 README，技能本体在各源仓库）
- **抓取时间**：2026-09-16
- **本目录内容**：
  - `awesome-agent-skills-README.md`：源仓库完整索引（离线备份）
  - `skill候选/<skill>/`：已下载的 12 个候选 skill 完整目录（含 SKILL.md + 附属脚本/资产），可直接评估或拷进项目工程包 `.agents/skills/`

---

## 一、已下载（12 个，可直接用）

| skill | 源仓库 | 用途 | 对咱们的价值 |
|---|---|---|---|
| `frontend-design` | anthropics/skills | 前端设计/UI-UX 方法论（先定视觉基调再写码） | make 原型/reacter 工程的前端质量提升 |
| `theme-factory` | anthropics/skills | 主题/配色方案生成（内置 10 套主题） | 对应项目 `.style` 视觉规范、大屏配色 |
| `brand-guidelines` | anthropics/skills | 品牌色/排版规范应用 | 交付物统一品牌感 |
| `webapp-testing` | anthropics/skills | Playwright 测本地 Web 应用 | **正好补"改完必须截图验证"铁律** |
| `docx` | anthropics/skills | Word 文档创建/编辑/分析 | PRD、评审报告等交付物 |
| `pptx` | anthropics/skills | PPT 创建/编辑 | 汇报材料 |
| `xlsx` | anthropics/skills | Excel 创建/编辑/分析 | 数据策划表、规划表 |
| `pdf` | anthropics/skills | PDF 提取/生成/表单 | 需求/合同类文档处理 |
| `playwright` | openai/skills | 真实浏览器自动化（导航/表单/抓取） | 原型走查、页面抓取 |
| `screenshot` | openai/skills | 跨平台截图/取窗口/像素区域 | 原型成果截图留证 |
| `frontend-design-review` | microsoft/skills | 前端界面评审（含检查清单/输出格式） | 原型评审、量化评分 |
| `differential-review` | trailofbits/skills | 安全导向 diff 审查（含 git 历史分析） | **脚本/代码安全审计（上轮 server.mjs 那类场景）** |

**参考安装命令**（如需装到工程包）：
```
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/openai/skills    --skill playwright
npx skills add https://github.com/microsoft/skills --skill frontend-design-review
npx skills add https://github.com/trailofbits/skills --skill differential-review
```

---

## 二、未能下载（3 个，源站不可达）

| skill | 索引给的源 | 问题 |
|---|---|---|
| `openai/frontend-skill` | openai/skills `skills/.curated/frontend-skill` | 该目录在仓库中**不存在**（GitHub 目录列举无此项，jsDelivr 404）。索引可能是滞后/预发布条目 |
| `google-labs-code/react-components` | github.com/google-labs-code/react-components | 仓库 **404**（不存在或不可访问） |
| `google-labs-code/shadcn-ui` | github.com/google-labs-code/shadcn-ui | 仓库 **404** |

> 说明：这三项经 api.github.com 与 jsDelivr 双重核验确认取不到，非网络问题。若后续索引补全可再拉。

---

## 三、引入前提醒

1. **先去重**：`02-模板/_project-template/.agents/skills/` 已有 `prd-writer`、`prototype-to-prd`、`slides`、`drawio-generator`、`diagram-generator`、`skill-creator`、`pm-*` 等，与 anthropics 官方的 `docx/pptx/xlsx/pdf`、`skill-creator` 有职责重叠——装之前比对，避免多源漂移。
2. **来源优先级**：用户参考图/Design.md > 项目 `.style/` 规范 > 本批候选 skill > 通用经验。
3. 本批为**完整目录**（含 scripts/assets），拷进工程包 `.agents/skills/` 即可用；部分 skill 带 `agents/openai.yaml`，若工程包用 Claude/Codex 体系可按需删。
