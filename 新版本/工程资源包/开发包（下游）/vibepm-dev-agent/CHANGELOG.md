# Vibepm Dev Agent 更新记录

## 写法约定

发版与补记时遵守下列约定。

**读者与语气（先定这个，再写条目）：**

| 文稿 | 主要读者 | 语气 |
| --- | --- | --- |
| **本文 `CHANGELOG.md`** | Agent / 维护者 | **结构化、可检索**：路径、技能名、约束词（禁止 / 须 / 对照）写清楚；加粗主题 + 短要点，少叙事、少形容词 |
| **`vX.Y.md`** | 人（升级时扫读） | **说明体（清楚、克制）**：说清这版做了什么、如何升级；少堆路径与文件名；避免口语与宣传腔 |

| 项 | 约定 |
| --- | --- |
| **本文职责** | 版本详细变更真源；按 `## vX.Y`（新在上）记述；信息密度高于 `vX.Y.md` |
| **`vX.Y.md`** | 两段式：开篇一句 +「升级概要」+「升级指引」；体例对齐同包上一份。概要用完整短句概括主题；指引写备份 / 覆盖 / 验证步骤。细节与长列表只写在本文，文末可写「详见 CHANGELOG · vX.Y」 |
| **条目结构（本文）** | 先一句概括，再以 **加粗主题** 列要点；必要时少量子点；避免再拆多层 `###`、避免大段表格代替要点 |
| **粒度** | 本文：改了什么、落点路径、约束是什么。`vX.Y.md`：读者要带走的结论与动作。两边都不写口语流水账 |
| **进行中** | 未定版前用 `## 未发布 / 进行中`；定版时整段升为 `## vX.Y`，并补 `vX.Y.md`、同步 `AGENTS.md` 版本号 |
| **文末** | 包级「升级指引」可跨版本保留在本文；单版给人看的核对项优先写在 `vX.Y.md` |

---

## v1.8

> 更新日期：2026-11-06  
> 精简说明见 `v1.8.md`

### 升级概要

v1.8 新增 Vibe Design WEB（`web/`）与知识库；整理 Admin / `frame/admin` 目录、主题与组件皮；`feature-dev` / `page-spec-loader` 按 `PROJECT_PATH` 分流 Admin vs WEB。含原「未发布」与 v1.7.1。

- **Vibe Design WEB（`web/`）：** Vue3 + Vite + TS + Arco；壳 MarketingShell / AppSidebarLayout / LoginShell；示例首页、工作台、登录；对照 `frame/web`；**禁止** ProShell / `pro-*`
  - HTTP：`code === 200` + Bearer；FA Classic Pro（`plugins/fa-icons`，**无** Sharp）；`src/styles/{common,layouts,pages}/`（`main.ts` 挂 common；layouts 挂在壳组件；pages 挂 views）；`common/global.css`=Style 真源；Arco 2.59 / axios 1.21；editorconfig / prettier / eslint flat
  - 知识库：`ui-libs/vibe-design-web/`（layouts · pages · style）；判定名 **vibe-design-web**；**勿**套 Admin `pages.md` / `pro-*`
  - 文档：`web/README-DEV.md`（工程约定）；知识库 `ui-libs/vibe-design-web/`
- **Admin / `frame/admin`：**
  - 目录：`src/styles/pro|charts|pages/`（去 `style/frame/`）；字体→`src/assets/fonts`；`login-shared` / `dashboard-shared`；favicon / footer 与母版对齐，清理冗余 public
  - 主题 / FA：Pro 7.3.0 对齐母版 vendor；`--pro-*` 与 `arco-design-vue/style.md`；母版对照 `frame/admin/assets/common/{css,js,charts}/`
  - 组件皮：`pages-common` 区头 / Tabs / Steps；橱窗分段选择器与 Tabs 选中/悬停；基础橱窗导航顺序同步母版
  - 资源路径：`pages/login-cover.css` / `user.css` 背景图改为 `../../assets/images/...`（样式迁目录后相对路径曾失效）
- **技能 / 接入：** `feature-dev` Admin|WEB 分列门禁与任务清单（WEB：扁平路由、先定壳）；**禁改** `frame/admin`、`frame/web`；`AGENTS.md`→v1.8；`project-init` / PACKAGING / 部署清单挂 `web/`
- **母版预览 / 登记：** 同步 demo 新版 `gallery.html` 并适配本包（WEB 可预览上架壳；**隐藏 APP 菜单**；**不包含** `frame/app`）；修复 `index.json`（仅 admin/web）；保留 `frame/.style`；`catalog.json` 登记 `ui-libs/*`（含 `vibe-design-web`）
- **v1.7.1：** `ant-design-pro/` + `ui-libs/ant-design-pro/`（**不**走 `frame/admin`）；文档对齐 Starter README；移除 `ui-libs/ant-design-vue/`

### 推荐路径

```text
brainstorming → srs-writer / prd-writer
prd-writer → srs-writer Step F → SRS → feature-dev（admin/ 或 web/）
```

---


## v1.7

> 更新日期：2026-08-31

### 升级概要

核心技能改名（旧名仍可用，但是/无法检索到）、新增共享母版 `frame/` 与 Vibe Design Pro 交付工程、相关模板文档中写法示例统一为 CRM；**P0 语义通用化**（编排去厂商化，不改交付模式）。

- **技能改名（旧名仍走新技能）：**
  - `req-doc` → `srs-writer`（目录 `.agents/skills/srs-writer/`）
  - `page-generator` → `feature-dev`（目录 `.agents/skills/feature-dev/`）
  - 角色定义未改名（`req-writer`、`page-reviewer` 等）；Word 导出仍可用模板键 `req-doc`
- **`annotation`（组件契约 v13 → v17）：** 修复手动标注刷新后丢失（保存中间件须 `enforce: 'pre'` 同步挂载；失败弹窗；兼容 `/__dev/annotation/save`）；详情面板宽/窄屏可拖动且不超出视口
- **`pm-operation-manual`：** 含截图的 Word 导出改走本地 `md_to_docx_embed.py`（图片嵌入、目录可跳转、步骤序号按章从 1 重排）；云端 `export-word` 仅作无图备选
- **P0 语义通用化（ADE 跨工具）：**
  - 编排用语改为「角色调度」；新增 `.agents/rules/agent-runtime.md`、`.agents/rules/role-dispatch.md`
  - 无独立子 Agent 时主会话按角色定义扮演（运行时降级），审查范围仍只看 `DELIVERY_MODE`
  - Hook 仍为可选增强；P1 软门禁 + P2 薄接线见下
  - **未改变**三档交付模式、分技能默认、自动升严格、`DELIVERY_MODE` 传递语义
- **P1 无 Hook 软门禁：** 新增 `.agents/rules/soft-gates.md`；8 个核心技能只加短指针。文档类宣称完成可省略 build；审查勾选叠加 `DELIVERY_MODE`（快速不升为全量）
- **P2 可选厂商适配器：** `.agents/adapters/`（按需复制到项目 `.claude/settings.json` / `.cursor/hooks.json`）；`normalize.cjs` + `run.cjs` 统一 I/O。Cursor matcher 无 `MultiEdit`，派发为 `Task`。资源包根目录不预置这两份接线
- **P3 其它 ADE：** 新增 `.agents/rules/ade-compat.md`。Roo/Copilot 原生读 `.agents/skills/`；Cline 用 `link-skills` 联接、禁止拷贝。只读子 Agent 由主会话落盘；不承诺硬门禁同构
- **共享母版 `frame/`：** 包根新增对照源（非交付工程、非运行时依赖）。`admin/` / `web/` / `app` 三套目录与端同名；`index.json` 登记端与默认库。`feature-dev` 按 SRS 点名 page-type、对照 HTML 样板用 Vue SFC 重写进交付子项目；禁止粘贴母版 HTML / `window.*`、禁止改母版、禁止交付页运行时引用 `frame/`。约定见 `frame/README.md`
- **Vibe Design Pro：** 新增 `admin/` 管理后台交付工程（Arco Pro 裁剪、`pro-*` 皮肤）及 `ui-libs/arco-design-vue` 知识库；对照 `frame/admin` 生成，禁止裸 Arco
- **Element Plus Starter（`element-plus/`）优化：** 菜单预取与 App Shell、依赖对齐 `element-plus@2.14.4`、登录页体验；修复启动/预览未登录仍跳转首页等路由异常，统一进入登录页；系统名称改为「后台管理系统」
- **示例主题：** 需求、设计、交付及可研/测试/手册的业务短示例统一为 CRM（客户、线索、商机、跟进）
- **v1.7.1 补充（Starter 扩展）：** 新增 `ant-design-pro/`（React + Umi Max + antd Pro）及 `ui-libs/ant-design-pro/`（**不**走 `frame/admin`）；文档对齐各 Starter README；移除 `ui-libs/ant-design-vue/`


---

## v1.6

> 更新日期：2026-07-10

### 升级概要

v1.6 为 **工作流减负 + vibepm-dev-agent 独立交付** 版本：交付模式三档、需求文档双轨路由、分技能默认加速日常出稿；修复规范加载路径；支持「仅交付 vibepm-dev-agent、用户自建前端框架」。

- **交付模式：** 标准 / 严格 / 快速三档；分技能默认（`page-generator`、`prd-writer` → 快速；`req-doc`、`pm-product-pipeline` → 标准）；含「正式交付 / 验收 / 上线」等自动升严格
- **需求文档：** 内置 `prd-writer`、`prototype-to-prd`；`AGENTS.md` 新增 SRS vs PRD vs 原型逆向路由
- **PRD→SRS 门禁：** 产品 PRD 须经 `req-doc` Step F 转写 SRS 后方可进入 `page-generator` 等研发下游；新增 `.agents/rules/prd-to-srs-gate.md`
- **升级：** `diagram-generator` — 模板统一为 17 个扁平 `.xml`（替代旧版 4 类子目录）；新增 `validate-diagram` 本地校验；类型扩展至功能架构、横向/矩阵泳道、用例/状态图及 4 种思维导图；工作流：保存 → 校验 → API 渲染 PNG（`req-doc` 文档配图仍走本技能 + `diagram-drawer`）
- **规范加载：** `page-spec-loader` / `page-generator` 支持 `WORKSPACE_PATH` 多子项目布局；优先加载 `{PROJECT_PATH}/README-DEV.md`
- **vibepm-dev-agent 独立交付：** 新增 `templates/`（接入指南、README-DEV 模板、docs 结构说明）；`admin/` 等前端源码改为可选 Starter
- **包名统一：** 技能包由 **VibePM Agent***（目录曾用 `vibepm-agent`）更名为 **Vibepm Dev Agent**（目录 `vibepm-dev-agent`）。定位为前端规格开发技能包。

### 推荐路径

```text
prd-writer / prototype-to-prd → PRD 定稿 → req-doc Step F → SRS + SPEC_SOURCE → page-generator / delivery-plan / HLD
```

---

## v1.5

> 更新日期：2026-06-08

### 升级概要

v1.5 为结构性重构：统一 `.agents/` + `AGENTS.md` 部署，升级 req-doc / page-generator 等核心技能，新增交付规划与设计文档技能，Hook 门禁与子 Agent 配置修复。

---

## 升级指引

1. **备份**建议备份业务项目中现有的 `.agent/`、`.cursor/`、`.claude/` 旧配置
2. **删除**旧的多 IDE **整包副本**（曾把 skills 复制进 `.agent/`、`.cursor/`、`.claude/` 的那种）；**保留或覆盖薄接线**（仅 hooks/settings JSON，命令指向 `node .agents/hooks/run.cjs`）
3. **复制**新版 `.agents/`、`AGENTS.md`、`CHANGELOG.md`、`templates/` 到工作区根目录（资源包当前版本 **v1.8**）；需要硬门禁时再按 `.agents/adapters/README.md` 复制到项目的 `.claude/settings.json` / `.cursor/hooks.json`
4. **覆盖** `.agents/skills/diagram-generator/`、`feature-dev/`、`srs-writer/` 等有变更的技能目录；删除旧版 `examples/` 下子目录模板（`business-flow/` 等），已改为扁平 `examples/*.xml`
5. 若使用 **共享母版 + Vibe Design Pro**：确认包根有 `frame/{admin,web,app}` 与 `frame/index.json`；交付工程用新版 `admin/README-DEV.md`，知识库含 `.agents/knowledge/ui-libs/arco-design-vue/`。增页对照 `frame/admin` 重写进 `admin/`，不要把 `frame/` 当脚手架整包复制，也不要改母版目录
6. 若使用 **Vibe Design WEB（v1.8）**：复制/更新 `web/` 与 `ui-libs/vibe-design-web/`；增页对照 `frame/web` 重写进 `web/`，禁 ProShell / `pro-*`；`feature-dev` 摘要 UI 库应为 **vibe-design-web**（勿当成 `arco-design-vue` Admin）
7. 若使用 **Ant Design Pro / Element Plus / shadcn Starter**：确认对应子目录含 `README-DEV.md` 与 `package.json`；`page-spec-loader` 将加载对应 `ui-libs/*`；这些 Starter **不**走 `frame/admin` 对照
8. 若**仅 vibepm-dev-agent 交付**：按 `templates/project-init.md` 自建前端，并从 `README-DEV.template.md` 生成各子项目规范
9. **删除**根目录旧的 `CLAUDE.md`（如存在）
10. **验证**新建对话重新读取 AGENTS.md；在 `{PROJECT_PATH}` 执行 `pnpm build`；触发 `feature-dev` 确认规范摘要含 `WORKSPACE_PATH`、`PROJECT_PATH` 与「项目规范」；Admin Arco → `arco-design-vue`；WEB → `vibe-design-web`；Ant Design Pro → `ant-design-pro`
11. **包名迁移（v1.6 起）** 文档与交付目录示例统一使用 `vibepm-dev-agent`；若本地或文档仍引用 **VibePM Agent** / `vibepm-agent-pack/`，按上表替换即可
