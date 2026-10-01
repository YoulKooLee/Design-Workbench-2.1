# _admin-template 改造方案 · 研发工程上下文包（评估 + 蓝图）

> qwen ｜ 2026-09-28 ｜ 依据：用户 09-28 拍板——① _admin-template 转为**研发工程模板**，不再负责产品原型输出；② PM 类技能（pm-* 十来个）**一并剥离**；③ **锚定 01-项目 现有 React 原型项目**建研发工程；④ **面板改造后置**。
> 本文是方案评估与建设蓝图，**未对任何工程包文件做改动**；逐文件处置清单在 §五，等您确认后执行。

---

## 一、先回答：React 原型 → 按 Vue 工程规范重写，AI 好执行吗？

**结论：可执行，前提是把任务定义从"移植"改为"转换"，并给 AI 三样脚手架。**

### 1.1 三类要素的可迁移性不同

| 要素 | 迁移难度 | 说明 |
|---|---|---|
| 业务逻辑（状态机、校验、流程） | 低 | 与框架无关，AI 读 React 代码提炼规则很在行 |
| 数据流设计 | 低 | 恰好 _project-template 已产出数据流文档/数据模型文档，AI 不必从代码逆推 |
| UI 结构（组件树、布局、条件渲染） | 中 | JSX→Vue SFC 是 AI 高频训练语料，模式转换本身不难 |
| 框架惯用法（hooks→composition API、受控表单→v-model、路由、store、事件总线） | **高（风险点）** | 机械翻译会产出"React 味儿的 Vue"：ref 滥用、缺 defineProps 类型、setup 生命周期错位、不走项目 store 封装 |

### 1.2 AI 执行失利的典型模式（不脚手架就会踩）

1. **翻译式编程**：逐行直译 JSX 语法而不是按 Vue 工程既有模式重写——代码能跑但不符合 `src/admin` 的工程惯例，code-reviewer 每轮都打回；
2. **规格漂移**：只看原型代码写实现，SRS 里原型没体现的边界需求（权限、空态、异常流）被静默丢弃；
3. **还原度无基线**：改完没人对照原型验收，"重写"变成"重做"。

### 1.3 让 AI 好执行的三样脚手架（正是研发包要内置的东西）

1. **映射规范**：`knowledge/conventions/` 补一份 React→Vue 转换约定（hooks→composables、受控组件→v-model、路由/状态/请求一律走项目既有封装、禁止新增依赖需申报）；
2. **组件库参照**：`knowledge/ui-libs/arco-design-vue/`（components/pages/charts 三份，实测在案）作为组件选型真源，AI 不自由发明 UI 原子件；
3. **双门禁**：每页验收 = 对照原型的**还原度检查**（视觉/交互）+ 对照 SRS 的**需求覆盖检查**（含原型没实现的项）——由 page-reviewer / code-reviewer 按现有角色体系执行。

一句话：**"有界转换"（输入=原型+SRS+映射规范，输出=按工程惯例的 Vue 页面，验收=双门禁）是 AI 表现最好的任务形态；无界"移植"才是坑。** 01-项目 实测样本里，`Markdown 轻量编辑器` 三件套齐全（SRS/功能清单/概要/详细设计都在）是理想锚点；`崂山` 项目缺 02 架构文档（需补 HLD）；`指标管理平台`/`结构监测` 无文档，接入前要先跑文档补齐。

---

## 二、目标态定位

```
_project-template（原型包）                 _admin-template（研发包，本次改造）
 需求→SRS→HLD/LLD→React原型                    接收研发基线 → 建 Vue 工程 → AI 开发 → 验收
 产出：docs/ 三件套 + src/prototypes/     →     输入：三件套 + 原型（参照物）
                                              工程：src/admin 骨架（Vue3+Arco+Vite）
```

- **不再负责**：原型输出（frontend-design/annotation 移出）、PM 探索类（全部 pm-* 移出）；
- **保留并强化**：SRS 体系管理（审查/细化/反向同步）、HLD/LLD、开发执行链（feature-dev/TDD/debug/验证收口）；
- **新增**：研发基线区 + 项目接力契约（§四）。

## 三、目录蓝图

```
_admin-template/
├── AGENTS.md                    ← 重写为研发包入口（瘦身，解释外置 rationale）
├── .agents/
│   ├── skills/                  ← 33 → 19（处置清单见 §五）
│   ├── agents/                  ← 18 → 11 角色
│   ├── knowledge/               ← 保留全部（conventions/ui-libs/phase*），补 react→vue 转换约定
│   ├── rules/                   ← 删 session-context.md（admin 版同款 Vue 残留，与 make 版同病）
│   ├── hooks/ + 配置            ← 双配置合一（照抄 project-template 的 X1 修法），context-budget 名单去 frame
│   └── scripts/build-skills-index.mjs
├── src/admin/                   ← 【保留】Vue3+Arco 工程骨架 = 开发基座（面板建项依赖，server.mjs L1133）
├── 研发基线/                    ← 【新建】
│   ├── README.md                （各区定义与流转规则）
│   ├── 01-需求规格/             （SRS 副本 · 版本登记）
│   ├── 02-功能架构/             （功能清单 + HLD）
│   ├── 03-数据模型/             （概念 ER + 实体字段）
│   ├── 04-数据流/               （模块间契约表）
│   ├── 原型参考/                （React 原型代码 + 预览方式 + 截图 · 只作参照物，不并入 src/admin）
│   └── 交接清单.md              （接力契约模板，缺项不接单）
├── frame/                       ← 【删除】prototype-demo 消费技能不存在（死链），285 文件 17.24MB
├── templates/                   ← PACKAGING.md/project-init.md 更新（去 frame 引用、去原型链路）
└── docs/                        ← 保持"按需创建不预置"（落位规则不变）
```

> 研发基线各区文档随项目推进**单向流转**：接入时从原型项目复制 → 落位到项目 `docs/` 既有 Glob 路径供技能扫描 → 研发期间基线更新回写 `docs/` → `研发基线/` 只存接入快照与清单，避免双真源。

## 四、项目接力契约（改造的灵魂）

每个研发工程立项时填 `研发基线/交接清单.md`，**缺项即门禁拦截**（写入 AGENTS.md 执行优先级）：

| 项 | 必须含 | 来源（原型阶段产出） |
|---|---|---|
| SPEC_SOURCE 登记 | `SRS=docs/01-…/*SRS*.md` 版本号 | srs-writer / Step F |
| 功能清单 | 条目 + 优先级 + 状态 | feature-list |
| HLD | 功能架构 + 数据模型章节 | hld-design（缺则先补，崂山即此情况） |
| 数据流 | 模块间契约表（源→目标→实体→方向） | HLD §8 |
| 原型参照 | 预览 URL/方式 + 代码包位置 + 关键页截图 | src/prototypes/ 打包 |
| 否决记录 | 过程层 [否决]+理由 摘要 | project-memory.md（防开发期重走弯路） |
| 双端差异申报 | 原型仅 web？mobile 规格谁补？ | 人工确认一次 |

## 五、逐文件处置清单（等确认）

### 技能 33 → 19

**保留（19）**：

| 类别 | 技能 | 理由 |
|---|---|---|
| 规格管理 | `srs-writer` | 研发包仍管 SRS：审查/细化/**代码反向同步需求**（此方向对研发包更有价值） |
| 设计 | `hld-design` `lld-design` `feature-list` | 开发链上游输入 |
| 编排 | `delivery-plan` `pm-product-pipeline`* | 实现排期与流水线（*改造为"研发阶段编排"，剥离其原型生成段） |
| 开发 | `feature-dev` `systematic-debugging` `test-driven-development` `verification-before-completion` `finishing-branch` | 核心执行链 |
| 辅助 | `diagram-generator` `brainstorming` `skill-creator` `slides` | 方案对齐、文档插图、技能维护、汇报页 |
| 工具 | `common/`（无 SKILL.md 的共享脚本） | Word 导出等共用 |

**剥离（14）**：`pm-feature-prioritization` `pm-market-research` `pm-okr-designer` `pm-operation-manual` `pm-product-metrics` `pm-release-notes` `pm-roadmap` `pm-sprint-planning` `pm-stakeholder-report` `pm-test-cases` `pm-user-interview` `pm-user-persona`（12 个 pm-*，约 143KB）+ `frontend-design` `annotation`（原型产出类）；连带 `prd-writer` `prototype-to-prd` `feasibility-report`——**等等，此三者的去留是决策点 D2**（见下）。

> 修正上句：严格按拍板"PM 类 + 原型输出剥离"，确定剥离的是 **12 个 pm-_\* + frontend-design + annotation = 14 个**；`prd-writer`/`prototype-to-prd`/`feasibility-report` 归入 D2 待裁。

### 角色 18 → 11

删：`annotation-code-locator` `annotation-prd-analyzer`（随 annotation）、`feasibility-analyzer/writer/reviewer`（随 D2 若剥 feasibility-report）。
留：`code-reviewer` `page-reviewer` `page-spec-loader` `planner` `req-analyzer/writer/reviewer` `template-analyzer` `design-analyzer/writer/reviewer` `delivery-analyzer` `diagram-drawer`。

### 其他

| 对象 | 动作 |
|---|---|
| `frame/`（285 文件 17.24MB） | 删除；同步改 AGENTS.md L460 context-budget 描述、templates/PACKAGING.md 对照行、server.mjs L1154 注释与拷贝逻辑（面板后置，但注释级小改可先做或留到面板改造一并做——**建议留**，避免半截状态） |
| `src/admin/` | 保留为开发基座，不动 |
| `AGENTS.md`（现 ~33KB 贴线） | 重写为研发包入口：删原型/PM 章节与技能清单大表，解释移 rationale，目标 ≤15KB |
| `.agents/rules/session-context.md` | 删除（与 make 版同款 Vue 残留死文件的镜像问题；admin 环境事实应写入 AGENTS.md「本工程独有事实」表） |
| `.agents/hooks.json` + `settings.json` | 双配置合一（settings.json 唯一真源），照搬 project-template 已验证修法；context-budget 名单按新目录重排 |
| `.agents/skills-lock.json` / INDEX.md | 处置后重跑 `build-skills-index.mjs` 再生成 |
| `templates/README-DEV.template.md` `docs-structure.md` | 更新：去 frame/admin 对照、加"研发基线落位规则" |

## 六、决策点（三项，请拍板）

| # | 问题 | 选项 | 我的建议 |
|---|---|---|---|
| **D1** | 双模板技能共用归属 | A 共用核以 _project-template 为真源 + admin 侧同步脚本；B 两包各自独立演化 | **A**——否则 srs-writer 等 5 个共用技能会出第三套版本（原型包已验证过的修复在 admin 侧不生效） |
| **D2** | 文档侧三技能去留 | `prd-writer`/`prototype-to-prd`/`feasibility-report`：A 全剥（研发包只认 SRS，PRD 语境回原型包）；B 保留 prd-writer（SRS 审查/转写门禁 Step F 依赖其 references，`prd-to-srs-gate` 规则还在引用） | **B 的变体**：留 `prd-writer` 作 Step F 依赖（仅内部转写用，不做探索），剥 `prototype-to-prd` + `feasibility-report`。若选 A 需同步改 prd-to-srs-gate.md 的话术 |
| **D3** | 原型交付物形式 | A `原型参考/` 收整包（可运行源码+预览说明，参照物）；B 只收截图+功能说明（强制不参照代码） | **A**——视觉/交互还原度 AI 只能从代码或运行页判断；配"实现按 Vue 规范重写、不直译"的映射规范即可控住翻译式编程风险 |

## 七、实施顺序（确认后执行，预计一次会话内完成）

1. **剥离**：14（或 17，视 D2）个技能目录 + 对应角色 → 移入 `08-文档/2.1更新文档/admin剥离存档/`（不直接销毁，留可逆性）；
2. **删 frame + 删 session-context.md**；
3. **新建 `研发基线/`** 六区 + 交接清单模板；
4. **重写 AGENTS.md**（研发包版，含接力契约门禁 + React→Vue 转换约定入口）；
5. **补 `knowledge/conventions/react-to-vue.md`** 映射规范（转换任务的脚手架）；
6. **双配置合一 + 名单重排 + 重生成 INDEX**；
7. **自检**：引用链全扫（无断链/无悬空章节引用）、体量守恒（AGENTS ≤15KB）、BOM 扫描、以 `Markdown 轻量编辑器` 做一次纸面推演（其 docs 六件 → 研发基线落位 → 建 Vue 页链路走通）。

> 面板 server.mjs 的建项逻辑改造（是否拷研发基线、frame 拷贝移除）按您指示**后置**，本次方案不动面板；仅注意 §五 frame 项——server.mjs L1154 仍会把 frame 拷进新项目，所以**面板改造前不要从建项路径依赖"frame 已消失"**，两者有先后耦合，建议面板改造紧随本改造之后排期。

—— qwen，2026-09-28
