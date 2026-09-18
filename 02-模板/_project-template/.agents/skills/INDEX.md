# 技能索引（自动生成）

> 共 51 个技能。本文件由 `.agents/scripts/build-skills-index.mjs` 自动生成，由 `session-start.cjs` 在会话启动时注入上下文。**请勿手改**；更新技能后重新运行生成脚本。

## 技能速查

- **annotation** — >
- **brainstorming** — "在任何创意工作（创建功能、构建组件、添加功能或修改行为）之前必须使用本技能。在实现前先探索用户意图、需求和设计方案。触发场景：用户描述想构建什么、分享功能想法或提供简要需求清单时。"
- **build-design-system** — Use when an Axhub Make client task explicitly asks to create, update, import, extract, derive, or reconstruct a 主题/theme, 设计系统/design system, 视觉规范/visual specification, DESIGN.md, design tokens, or reusable theme assets from webpages, Axure resources, Figma designs, screenshots, prototypes, or existing theme files; not when selecting an existing design system or theme, which uses $search-design-system.
- **canvas-workspace** — 当任务明确涉及 Axhub 画布、原型草稿、Excalidraw 文件、画布节点/批注/截图/图片，需要把文档、原型页面、图片、流程图等产物呈现在画布上，或同时提供指定画布文件与用户当前看到的画布截图/视图信息时使用。
- **ckm:slides** — 创建战略性 HTML 演示文稿，支持 Chart.js 数据可视化、设计令牌、响应式布局、文案公式和情境化幻灯片策略。
- **delivery-plan** — >
- **diagram-generator** — >
- **drawio-generator** — >
- **explore-options** — Use when a Make client批注 or user request asks for 多方案探索, 多方案生成, 多方案对比, 方案对比, 设计决策, 比稿, 先出方案, or choosing among 2-3 UI/code modification directions before executing one.
- **feasibility-report** — >
- **feature-list** — >
- **finishing-branch** — 开发分支完成后的结构化收尾流程 — 验证测试、检测环境、提供 merge/PR/保留/丢弃 四选项
- **frontend-design** — "创建高质量、有设计感的前端界面。触发场景：用户需要构建网页组件、页面、海报或应用时触发，包括网站、落地页、仪表盘、React 组件、HTML/CSS 布局，或对任何 Web UI 进行美化和样式设计。生成有创意、精致的代码和 UI 设计，避免通用 AI 美学风格。用户说「做个页面」「设计界面」「前端设计」「做个网站」「做个组件」「美化界面」时触发。"
- **handle-comments** — Use when handling Commentary comments in prototypes, Markdown, HTML, or prototype specification documents.
- **hld-design** — >
- **lld-design** — >
- **page-generator** — >
- **plan-prds** — Use when the user asks to establish a traceable PRD planning workflow from product links, screenshots, files, spoken requirements, current-product reconstruction, feature additions, redesigns, future requirements, or phased reconstruction-then-expansion work before document scope or count is settled in an Axhub Make client project.
- **pm-feature-prioritization** — "产品功能优先级排序技能。支持 RICE、MoSCoW、ICE、Kano 模型等多种优先级框架。适用场景：(1) 需求池排序，(2) 版本规划功能筛选，(3) 资源有限时决策哪些功能先做，(4) 用户说「功能排优先级」「需求排期」「哪些功能先做」「功能评估」时触发"
- **pm-market-research** — "产品经理市场调研与竞品分析技能。适用场景：(1) 需要做市场规模分析（TAM/SAM/SOM），(2) 进行竞品对比分析，(3) 分析行业趋势和机会，(4) 输出市场调研报告，(5) 用户说「做竞品分析」「分析市场」「市场调研」「竞争对手分析」时触发"
- **pm-okr-designer** — "产品 OKR/KPI 体系设计技能。适用场景：(1) 制定产品季度/年度 OKR，(2) 设计产品核心 KPI 指标体系，(3) 拆解战略目标为可执行指标，(4) OKR 复盘与评分，(5) 用户说「制定OKR」「设计KPI」「指标拆解」「目标管理」时触发"
- **pm-operation-manual** — >
- **pm-product-metrics** — "产品数据分析与指标体系设计技能。适用场景：(1) 设计产品数据埋点方案，(2) 分析产品数据找出问题，(3) 漏斗分析/留存分析/同期群分析，(4) 产品数据周报/月报，(5) 用户说「数据分析」「埋点设计」「指标体系」「数据看板」「漏斗分析」「留存分析」时触发"
- **pm-product-pipeline** — "产品 AI Agent 全流程编排技能。将「市场调研 → 用户画像 → 功能优先级 → 产品路线图 → 需求说明书 → 前端原型 → 测试用例 → 操作手册 → 发版说明」九个阶段串联成一个完整的智能流水线。适用场景：(1) 用户想一次性走完产品从0到1的完整交付流程，(2) 用户说「走完整流程」「一键生成所有文档」「完整产品交付」时触发，(3) 用户提供一个产品想法，希望输出所有相关文档和原型"
- **pm-release-notes** — "产品发版说明撰写技能。适用场景：(1) App Store/应用市场更新说明，(2) 对外公告发版说明，(3) 面向用户的功能更新介绍，(4) 内部发版变更记录，(5) 用户说「写发版说明」「更新日志」「版本更新」「changelog」「上线公告」时触发"
- **pm-roadmap** — "产品路线图规划技能。适用场景：(1) 制定季度/年度产品路线图，(2) 版本规划和里程碑设计，(3) 多团队功能交付协调，(4) 向管理层或投资人展示产品规划，(5) 用户说「做路线图」「产品规划」「版本计划」「roadmap」时触发"
- **pm-sprint-planning** — "产品迭代规划与敏捷管理技能。适用场景：(1) Sprint/迭代规划会议准备，(2) 将需求拆解为研发任务，(3) 估算工时和容量规划，(4) 迭代复盘总结，(5) 用户说「迭代规划」「sprint计划」「需求拆解」「任务分解」「迭代复盘」时触发"
- **pm-stakeholder-report** — "产品经理汇报材料生成技能。适用场景：(1) 月度/季度产品汇报，(2) 向管理层/投资人汇报产品进展，(3) 跨部门产品Review，(4) 产品立项/需求评审材料，(5) 用户说「做汇报」「写汇报材料」「产品复盘」「产品Review」「向老板汇报」时触发"
- **pm-test-cases** — >
- **pm-user-interview** — "产品经理用户访谈技能。适用场景：(1) 设计用户访谈提纲，(2) 分析访谈录音/文字记录提炼洞察，(3) 整理用户需求和痛点，(4) 生成用户访谈报告，(5) 用户说「用户访谈」「访谈提纲」「用户调研」「需求挖掘」「分析访谈」时触发"
- **pm-user-persona** — "产品经理用户画像设计技能。适用场景：(1) 创建产品用户画像（Persona），(2) 定义目标用户群体，(3) 用户分层与细分，(4) 用户旅程地图绘制，(5) 用户说「做用户画像」「定义目标用户」「用户分析」「用户分层」时触发"
- **prd-writer** — |
- **prototype-annotation** — 原型标注替代 PRD 时使用：把页面目录、组件说明、状态说明和补充文档接入可运行原型，供评审、交付和后续需求说明使用。
- **prototype-comments** — 批注、微调、编辑原型时使用：读取本地原型批注并定位页面元素，修改文案、样式、布局或交互，完成后删除已处理批注任务。
- **prototype-list** — |
- **prototype-to-prd** — |
- **req-doc** — >
- **requirements-exploration** — Use only when the user explicitly asks to run demand exploration or requirements refinement, invokes $requirements-exploration, or asks to create/update confirmed requirement docs before prototype work. Do not trigger automatically for ordinary prototype generation, vague briefs, local edits, or bug fixes.
- **screenshot-to-prototype** — Use only when 用户明确要求把本地截图、设计稿或高保真界面图还原成 Axhub Make client 可运行原型；或显式调用 $screenshot-to-prototype。仅提供图片作为素材、参考图、需求图或风格上下文时不要使用。
- **search-design-system** — 当需要通过 Axhub Design Knowledge 索引，为产品、页面、原型或实现选择现有设计系统或主题时使用；不用于创建或更新主题。
- **skill-creator** — 技能创建指南。当用户需要创建新技能（或更新现有技能）以扩展 AI 的专业知识、工作流或工具集成能力时使用。
- **systematic-debugging** — 遇到任何 bug、测试失败或异常行为时，在提出修复方案之前使用。
- **test-driven-development** — 在编写实现代码之前，实现任何功能或修复 bug 时使用。
- **ui-design-image** — Use when 为 Axhub Make client 项目生成 UI 设计图、高保真原型视觉、生产风格网站截图、整页界面稿、UI 素材、图标、占位图或参考位图；尤其是请求提到 Image Gen、AI 图片生成、设计图、UI assets 或 prototype visuals 时。
- **ui-image-generation** — Generate or edit raster images and visual assets, including UI and prototype visuals, website images, illustrations, icons, placeholders, reference images, banners, covers, or image variants. Trigger for Image Gen, AI image generation, UI assets, concept visuals, bitmap generation, or visual assets.
- **verification-before-completion** — 在宣称工作已完成、已修复或通过之前使用（提交或创建 PR 前）——须运行验证命令并确认输出，用证据说话，禁止空口断言。
- **vibepm-app-generator** — 该技能用于快速创建带手机设备外框的 APP 原型（含状态栏、灵动岛、圆角与 Home Indicator），并统一组件与样式规范，避免从零搭建造成风格漂移；可根据页面形态直接选择下方模板进行创建。
- **vibepm-style-extractor** — 分析网页视觉系统并提取颜色、字体、背景、阴影、边框、圆角、按钮模式与布局等风格 tokens。适用于用户希望模仿站点风格、逆向 UI 美学或从现有网页生成可复用风格提示词的场景。
- **vibepm-web-generator** — 该技能用于快速创建 WEB 端页面原型，主要服务于企业官网与营销落地页场景。目标是统一页面结构、样式体系与交付规范，避免从零搭建导致的风格漂移与实现不一致。适用于企业网站、产品介绍页、投放落地页等场景。
- **write-design-notes** — |
- **write-prd** — Use when the user explicitly asks to write, draft, create, update, or synthesize a PRD for an Axhub Make client project, especially when the PRD may aggregate multiple prototypes, resources, canvas notes, or existing product context.

