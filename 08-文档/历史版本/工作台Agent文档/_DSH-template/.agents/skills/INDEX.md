# 技能索引（自动生成）

> 共 51 个技能。本文件由 `.agents/scripts/build-skills-index.mjs` 自动生成，由 `session-start.cjs` 在会话启动时注入上下文。**请勿手改**；更新技能后重新运行生成脚本。

## 技能速查

- **annotation** — 原型标注工具。在页面上标注需求说明（字段说明、业务规则、交互逻辑等）， 开发人员和产品经理都能看到。标注与 UI 库完全解耦，通过注入专属 class 定位。 触发场景：(1) "标注页面" "生成标注" "添加标注" "原型标注", (2) "给xx页面加标注" "标注xx功能", (3) "注入标注组件" "初始化标注"
- **brainstorming** — 在任何创意工作（创建功能、构建组件、添加功能或修改行为）之前必须使用本技能。在实现前先探索用户意图、需求和设计方案。触发场景：用户描述想构建什么、分享功能想法或提供简要需求清单时。
- **build-design-system** — Use when an Axhub Make client task explicitly asks to create, update, import, extract, derive, or reconstruct a 主题/theme, 设计系统/design system, 视觉规范/visual specification, DESIGN.md, design tokens, or reusable theme assets from webpages, Axure resources, Figma designs, screenshots, prototypes, or existing theme files; not when selecting an existing design system or theme, which uses $search-design-system.
- **canvas-workspace** — 当任务明确涉及 Axhub 画布、原型草稿、Excalidraw 文件、画布节点/批注/截图/图片，需要把文档、原型页面、图片、流程图等产物呈现在画布上，或同时提供指定画布文件与用户当前看到的画布截图/视图信息时使用。
- **ckm:slides** — 创建战略性 HTML 演示文稿，支持 Chart.js 数据可视化、设计令牌、响应式布局、文案公式和情境化幻灯片策略。
- **delivery-plan** — 项目交付链路规划技能。分析需求说明书，生成从前端原型到上线的完整交付计划，支持进度追踪和下一步推荐。 触发场景：(1) "生成交付计划" "规划实现链路" "项目规划" "整体实现规划", (2) "查看进度" "下一步做什么" "实现计划", (3) "按需求规划开发顺序" "规划页面实现顺序", (4) "实现全部功能" "按计划实现所有功能" "自动实现" "一直实现" "连续实现"
- **diagram-generator** — 用户要求在文档中生成、创建、绘制或插入任何类型图表时必须使用本技能。 重要：通过 req-doc 技能生成需求说明书时，必须使用本技能生成所有图表，禁止手动绘制图表。 触发场景： (1) 流程图/活动图: "生成流程图" "画流程图" "重新生成流程图" "插入流程图" "生成活动图" "用户操作流程图", (2) 架构图: "生成架构图" "画架构图" "插入架构图" "系统架构图", (3) 时序图: "生成时序图" "画时序图" "插入时序图" "系统交互时序", (4) 泳道图: "生成泳道图" "画泳道图" "插入泳道图", (5) ER图: "生成ER图" "实体关系图" "数据库设计图", (6) UML图: "生成UML" "类图" "用例图" "状态图", (7) 组织结构图: "组织架构图" "组织结构" "人员架构", (8) 思维导图: "生成思维导图" "画思维导图" "脑图" "心智图" "知识梳理", (9) BPMN: "生成BPMN" "业务流程建模", (10) 任何需要将业务流程、系统架构、数据流或其他内容可视化为图表的请求。
- **drawio-generator** — AI draw.io 原生生成器。用户要求在文档中生成、创建、绘制或插入任何类型图表时必须使用本技能。 输出标准 .drawio XML（完整 mxfile 包装），交付可编辑源文件供 draw.io / diagrams.net 导入。 触发场景： (1) 流程图/活动图: "生成流程图" "画流程图" "重新生成流程图" "插入流程图" "生成活动图" "用户操作流程图", (2) 架构图: "生成架构图" "画架构图" "插入架构图" "系统架构图", (3) 时序图: "生成时序图" "画时序图" "插入时序图" "系统交互时序", (4) 泳道图: "生成泳道图" "画泳道图" "插入泳道图", (5) ER图: "生成ER图" "实体关系图" "数据库设计图", (6) UML图: "生成UML" "类图" "用例图" "状态图", (7) 组织结构图: "组织架构图" "组织结构" "人员架构", (8) 思维导图: "生成思维导图" "画思维导图" "脑图" "心智图" "知识梳理", (9) BPMN: "生成BPMN" "业务流程建模", (10) draw.io / diagrams.net 原生 XML、.drawio 文件, (11) 任何需要将业务流程、系统架构、数据流或其他内容可视化为图表的请求。
- **explore-options** — Use when a Make client批注 or user request asks for 多方案探索, 多方案生成, 多方案对比, 方案对比, 设计决策, 比稿, 先出方案, or choosing among 2-3 UI/code modification directions before executing one.
- **feasibility-report** — 生成应用系统类项目可行性研究报告（可研报告）的技能。 触发场景：(1) "写可研报告" "生成可行性研究报告" "做可研" "项目可行性分析", (2) "写项目方案" "生成项目建设方案" "项目立项报告" "项目申请报告", (3) "可行性研究" "项目论证" "项目可研" "立项可研", (4) "导出可研报告" "可研报告导出Word" "可研报告转Word", (5) 用户提供项目背景、建设目标、功能需求，需要输出正式的可研报告文档时触发。 支持生成完整可研报告、分章节生成、导出 Word 格式。
- **feature-list** — 从 SRS 需求规格说明书和可行性研究报告中提取并生成功能清单文档，支持导出 xlsx 或 Word 格式。 触发场景：(1) "生成功能清单" "导出功能清单" "功能清单" "功能列表" "feature list", (2) "整理功能清单" "汇总功能" "功能汇总表", (3) 用户需要将 SRS 或可研报告中的功能整理成独立的功能清单文档时触发。 支持从已有文档自动提取，也支持用户手动补充后导出。
- **finishing-branch** — 开发分支完成后的结构化收尾流程 — 验证测试、检测环境、提供 merge/PR/保留/丢弃 四选项
- **frontend-design** — 创建高质量、有设计感的前端界面。触发场景：用户需要构建网页组件、页面、海报或应用时触发，包括网站、落地页、仪表盘、React 组件、HTML/CSS 布局，或对任何 Web UI 进行美化和样式设计。生成有创意、精致的代码和 UI 设计，避免通用 AI 美学风格。用户说「做个页面」「设计界面」「前端设计」「做个网站」「做个组件」「美化界面」时触发。
- **handle-comments** — Use when handling Commentary comments in prototypes, Markdown, HTML, or prototype specification documents.
- **hld-design** — 生成概要设计说明书（HLD / High-Level Design）的技能。在需求确定后、详细设计前，从 SRS 需求说明书推导系统总体架构。 触发场景：(1) "概要设计" "概要设计说明书" "生成概要设计" "写概要设计" "HLD", (2) "系统设计" "总体设计" "架构设计" "系统架构设计", (3) "分层设计" "模块划分" "技术选型方案", (4) "审查概要设计" "检查概要设计" "概要设计有没有问题", (5) "根据代码补概要设计" "反向生成概要设计" "同步概要设计", (6) "导出概要设计" "概要设计导出Word", (7) 用户已有 SRS 需求说明书，需要产出系统架构级设计文档时触发。 支持完整生成、局部完善、审查修复、反向同步、导出 Word。
- **lld-design** — 生成详细设计说明书（LLD / Low-Level Design）的技能，一份文档涵盖「模块详细设计 + 数据库物理设计 + API详细设计」三大维度。在概要设计后、编码前，产出开发可直接照着编码的设计依据。 触发场景：(1) "详细设计" "详细设计说明书" "生成详细设计" "写详细设计" "LLD", (2) "数据库设计" "数据库物理设计" "表结构设计" "建表设计" "数据库文档", (3) "API设计" "接口设计" "API详细设计" "接口文档" "接口规格", (4) "类图设计" "模块详细设计" "时序设计", (5) "审查详细设计" "检查详细设计" "检查表结构" "检查接口设计", (6) "根据代码生成详细设计" "反向生成详细设计" "从代码补数据库设计" "同步详细设计" "代码和设计对齐", (7) "导出详细设计" "详细设计导出Word", (8) 用户已有 SRS 或概要设计，需要产出表结构/接口/模块实现级设计文档时触发。 支持完整生成、局部完善、审查修复、反向同步、导出 Word。
- **page-generator** — 用户在现有项目中创建、生成、添加页面或实现功能时必须使用本技能。 触发场景：(1) "创建页面" "生成页面" "添加页面" "新建页面", (2) "列表页" "详情页" "表单页" "编辑页", (3) "实现xx功能" "按照需求说明书实现xx功能" "按照需求说明书实现所有功能", (4) "开发xx功能" "做xx功能" "完成xx功能", (5) "实现全部功能" "按计划实现所有功能" "连续实现" "一直实现" "自动实现", (6) 用户需要为后台管理/网站/移动端项目添加页面时。
- **plan-prds** — Use when the user asks to establish a traceable PRD planning workflow from product links, screenshots, files, spoken requirements, current-product reconstruction, feature additions, redesigns, future requirements, or phased reconstruction-then-expansion work before document scope or count is settled in an Axhub Make client project.
- **pm-feature-prioritization** — 产品功能优先级排序技能。支持 RICE、MoSCoW、ICE、Kano 模型等多种优先级框架。适用场景：(1) 需求池排序，(2) 版本规划功能筛选，(3) 资源有限时决策哪些功能先做，(4) 用户说「功能排优先级」「需求排期」「哪些功能先做」「功能评估」时触发
- **pm-market-research** — 产品经理市场调研与竞品分析技能。适用场景：(1) 需要做市场规模分析（TAM/SAM/SOM），(2) 进行竞品对比分析，(3) 分析行业趋势和机会，(4) 输出市场调研报告，(5) 用户说「做竞品分析」「分析市场」「市场调研」「竞争对手分析」时触发
- **pm-okr-designer** — 产品 OKR/KPI 体系设计技能。适用场景：(1) 制定产品季度/年度 OKR，(2) 设计产品核心 KPI 指标体系，(3) 拆解战略目标为可执行指标，(4) OKR 复盘与评分，(5) 用户说「制定OKR」「设计KPI」「指标拆解」「目标管理」时触发
- **pm-operation-manual** — 用于生成、撰写或创建操作手册或用户指南的技能。 触发场景：(1) "生成操作手册" "写操作手册" "创建操作手册" "用户手册", (2) "使用说明" "功能说明文档" "快速入门" "用户指南", (3) "导出操作手册" "操作手册导出Word" "用户手册转Word", (4) 生成系统管理员操作手册， (5) 生成终端用户手册或快速入门指南。 基于需求文档和现有前端页面生成操作手册。
- **pm-product-metrics** — 产品数据分析与指标体系设计技能。适用场景：(1) 设计产品数据埋点方案，(2) 分析产品数据找出问题，(3) 漏斗分析/留存分析/同期群分析，(4) 产品数据周报/月报，(5) 用户说「数据分析」「埋点设计」「指标体系」「数据看板」「漏斗分析」「留存分析」时触发
- **pm-product-pipeline** — 产品 AI Agent 全流程编排技能。将「市场调研 → 用户画像 → 功能优先级 → 产品路线图 → 需求说明书 → 前端原型 → 测试用例 → 操作手册 → 发版说明」九个阶段串联成一个完整的智能流水线。适用场景：(1) 用户想一次性走完产品从0到1的完整交付流程，(2) 用户说「走完整流程」「一键生成所有文档」「完整产品交付」时触发，(3) 用户提供一个产品想法，希望输出所有相关文档和原型
- **pm-release-notes** — 产品发版说明撰写技能。适用场景：(1) App Store/应用市场更新说明，(2) 对外公告发版说明，(3) 面向用户的功能更新介绍，(4) 内部发版变更记录，(5) 用户说「写发版说明」「更新日志」「版本更新」「changelog」「上线公告」时触发
- **pm-roadmap** — 产品路线图规划技能。适用场景：(1) 制定季度/年度产品路线图，(2) 版本规划和里程碑设计，(3) 多团队功能交付协调，(4) 向管理层或投资人展示产品规划，(5) 用户说「做路线图」「产品规划」「版本计划」「roadmap」时触发
- **pm-sprint-planning** — 产品迭代规划与敏捷管理技能。适用场景：(1) Sprint/迭代规划会议准备，(2) 将需求拆解为研发任务，(3) 估算工时和容量规划，(4) 迭代复盘总结，(5) 用户说「迭代规划」「sprint计划」「需求拆解」「任务分解」「迭代复盘」时触发
- **pm-stakeholder-report** — 产品经理汇报材料生成技能。适用场景：(1) 月度/季度产品汇报，(2) 向管理层/投资人汇报产品进展，(3) 跨部门产品Review，(4) 产品立项/需求评审材料，(5) 用户说「做汇报」「写汇报材料」「产品复盘」「产品Review」「向老板汇报」时触发
- **pm-test-cases** — 用户要求生成、撰写或创建测试用例时必须使用本技能。 触发场景：(1) "生成测试用例" "写测试用例" "创建测试用例", (2) "QA测试" "测试文档" "验收标准" "测试计划", (3) "导出测试用例" "测试用例导出Word" "测试文档转Word", (4) 从需求生成功能/边界/异常/权限测试用例， (5) 生成 API 测试用例或测试报告模板。 基于需求文档或功能描述自动生成完整测试用例集。
- **pm-user-interview** — 产品经理用户访谈技能。适用场景：(1) 设计用户访谈提纲，(2) 分析访谈录音/文字记录提炼洞察，(3) 整理用户需求和痛点，(4) 生成用户访谈报告，(5) 用户说「用户访谈」「访谈提纲」「用户调研」「需求挖掘」「分析访谈」时触发
- **pm-user-persona** — 产品经理用户画像设计技能。适用场景：(1) 创建产品用户画像（Persona），(2) 定义目标用户群体，(3) 用户分层与细分，(4) 用户旅程地图绘制，(5) 用户说「做用户画像」「定义目标用户」「用户分析」「用户分层」时触发
- **prd-writer** — 帮助用户从零写出高质量 PRD，或评估/改进/增量更新已有需求文档。 触发词（任一命中即用本 skill）：需求文档、PRD、产品需求、功能文档、写需求、整理需求、补充需求、审查需求、改进需求文档、需求评审、评估 PRD、从零写 PRD、我想做个产品/功能/App/工具、帮我整理需求、AI 写的需求有没有问题、导出 PRD、PRD 导出 Word、需求文档转 Word、PRD 转 Word。 即使描述很简短也必须触发，不得跳过技能直接写文档。
- **prototype-annotation** — 原型标注替代 PRD 时使用：把页面目录、组件说明、状态说明和补充文档接入可运行原型，供评审、交付和后续需求说明使用。
- **prototype-comments** — 批注、微调、编辑原型时使用：读取本地原型批注并定位页面元素，修改文案、样式、布局或交互，完成后删除已处理批注任务。
- **prototype-list** — 将零散想法或需求清单提炼为可实现的功能与信息结构，支撑原型设计（覆盖营销站、Web 产品、移动 App）。 产出 Markdown 存 `docs/`；完整页面结构列表须为交付物第 2 章（按屏分段 + 五项要点列表，禁止用单张宽表罗列五项）；章首可选 **屏目录表**：2 列（序号｜页面）或 **4 列（+ 主要功能｜文件名称建议）**，须与各屏小节一致；本章末尾附 **关键页面 ASCII 线框图（至少 1 屏）**。 含 **树状功能清单（🔴核心 / 🟡重要 / ⚪未来）**、主题化结构化功能列表、功能总表、分期；可读取 `docs/` 下或其它用户 `@` 路径的需求稿；默认简短访谈；弱化技术实现。 English: feature checklist, tree priority summary, key-screen ASCII wireframe, prototype-oriented IA — same rules.
- **prototype-to-prd** — 从 Axure 导出 HTML 原型或线上网站逆向盘点功能结构，再生成 PRD。 触发词（任一命中即用本 skill）：Axure 转 PRD、原型转需求、原型生成 PRD、从原型写 PRD、逆向 PRD、网站转 PRD、线上产品写需求、分析原型写 PRD、HTML 原型转文档、/prototype-to-prd、导出 PRD、PRD 导出 Word、需求文档转 Word、PRD 转 Word。 与 prd-writer 分工：本技能负责「读原型/站点 → 盘点 → 补缺口」；概念版与落地版模板、三视角诊断、MVP 闸门、自检仍复用 prd-writer 的 references/。 用户仅说「写 PRD」且无原型/站点输入时，用 prd-writer，不用本技能。
- **req-doc** — 用于生成、撰写、创建、细化、审查或反向同步 SRS 需求规格说明书的技能。 触发场景：(1) "生成需求说明书" "写需求说明书" "创建需求文档" "需求文档" "SRS" "SRS需求" "需求规格说明书", (2) "细化需求" "补充需求" "完善需求说明书" "完善SRS", (3) "导出需求说明书" "需求说明书导出Word" "需求文档转Word" "SRS导出", (4) "根据代码更新需求" "反向更新需求说明书" "同步需求文档" "代码和需求对齐", (5) "审查需求说明书" "检查需求文档" "需求文档审查" "需求说明书有没有问题" "审查SRS", (6) "从Word生成模板" "导入需求模板" "提炼模板" "生成新模板" 或用户提供.docx路径并提到"模板", (7) 用户提供需求概述，需要输出详细规格说明时， (8) 用户需要细化现有需求说明书的特定章节时， (9) 用户需要将现有前端代码/页面同步回需求文档时， (10) "PRD转SRS" "PRD 转 SRS" "进开发" "转写需求" "按 PRD 写 SRS" "PRD 转需求说明书" 或仅有 *-PRD.md 却要 page-generator / 交付计划 / 概要设计时。 支持完整生成、局部完善、审查修复、从代码反向同步、从 Word 生成模板、**PRD→SRS 转写（Step F）**。
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
- **write-design-notes** — 为原型页面编写/维护「设计说明」（Xbox 风格编号卡片 + 连线）。 触发词（任一命中即用本 skill）：写设计说明、写原型说明、设计说明、原型说明、标注设计说明、给原型加说明、补充原型描述、PrototypeLayout、DESIGN NOTES、Xbox 风格设计说明。 当用户要求给某个原型页面的右侧说明区填充/改写模块化说明时使用本 skill。 本 skill 只约束技术接入与内容结构，不决定业务文案；文案以 PRD / 需求资料 / 页面实际内容为准。
- **write-prd** — Use when the user explicitly asks to write, draft, create, update, or synthesize a PRD for an Axhub Make client project, especially when the PRD may aggregate multiple prototypes, resources, canvas notes, or existing product context.

