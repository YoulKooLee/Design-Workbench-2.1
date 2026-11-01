# 导航地图（技能分组 + 知识库/规则/模板路径）

> 位置：`.agents/rules/nav-map.md` ｜ 读取层：按需 Read（要查技能归属、找规范文件时）
> 来源：自 `AGENTS.md` 技能清单与知识库速查两节外迁（v2.1 瘦身，2026-10-10）；2026-10-30 再承接「技能触发自检」「工程件容量」两节（v2.2 瘦身）。目的：让 `AGENTS.md` 整体落入宿主注入窗口（≤8.4K 字符），消除尾部章节不可见。`AGENTS.md` 字符上限两侧统一为 **≤8,000**（2026-10-31 用户裁决；10-30 的 ≤5,000 系一次性自律目标，已作废）。

---

## 一、技能清单（15 技能 + common 工具库）

> **触发条件与用途以 `.agents/skills/INDEX.md` 为准**（会话开始主动 Read，见 AGENTS.md 说明），本节只给分组速记。严禁为查触发词遍历 Read 各 `SKILL.md`（遍历击穿上下文）。INDEX 缺失或过期时运行 `node .agents/scripts/build-skills-index.mjs`。

**研发主链路** `feature-dev`（核心；旧名 `page-generator`）· `delivery-plan` · `feature-list`

**文档三件套** `srs-writer`（研发真源，含 Step F PRD→SRS 转写；旧名 `req-doc`）· `hld-design` · `lld-design`

**需求对齐** `brainstorming` · `prd-writer`（仅上游只给 PRD 需转写、或研发期补轻量 PRD）

**质量与收尾** `test-driven-development` · `systematic-debugging` · `verification-before-completion` · `finishing-branch`

**辅助** `diagram-generator` · `slides` · `common`（Word 导出）· `skill-creator`

**已剥离，不在本包、勿调用**：原型生成类（`frontend-design`、`annotation`）、原型逆向与可研类（`prototype-to-prd`、`feasibility-report`）、产品管理类（`pm-*` 共 13 个）。归档于 `08-文档/2.1更新文档/admin剥离存档/`，需要时转 `_project-template`。

**需求文档路由**（三者怎么选）：Read `.agents/rules/req-doc-routing.md`。速记：未点名文档类型的想法 → `brainstorming`；研发交付 → `srs-writer`；明确产品探索 → `prd-writer`；只有 PRD 要开发 → `srs-writer` Step F。

### 技能触发自检（外移自 `AGENTS.md` §八，2026-10-30）

出现以下念头 = **在为跳过技能找借口**，立即停止，先匹配技能：

| 借口 | 事实 |
| --- | --- |
| 「小问题直接答就行」 | 技能检查须在**任何操作之前**完成，没有「待会再说」 |
| 「先看看情况、先读代码了解一下」 | 同上——先匹配技能，再读代码 |
| 「用不着走正式流程」/「走技能太重，我直接做更快」 | **技能存在就必须调用**，跳过反而更慢（返工代价 > 流程开销） |
| 「之前看过不用重读」 | 技能会更新，每次读**当前版本** `SKILL.md` |
| 「信息不够也先写 SRS」 | 走 `srs-writer` A1.5：先 `brainstorming` 补齐信息 |
| 「原型 React 代码改改就能用」 | **禁止 import / 拷贝**，按 `knowledge/conventions/react-to-vue.md` 重写 |

---

## 二、知识库与工程件速查（路径省略 `.agents/` 前缀）

另有 `scripts/`（`build-skills-index.mjs` 技能索引、`build-knowledge-catalog.mjs` 知识库索引）、`adapters/`（Cursor / Claude Code 薄接线）、`commands/`（review / verify / finish）、`settings.json`（Hook 配置**唯一真源**）。

| 域 | 路径 |
| --- | --- |
| **转换与编码** | `knowledge/conventions/react-to-vue.md`（写页面必读）、`coding.md`、`frontend.md`、`security.md`、`testing.md`、`debugging.md`、`verification.md`、`git.md`、`mock.md`、`typescript.md` |
| **UI 库** | `knowledge/ui-libs/README.md` → `element-plus/`（多栈按 package.json 只加载对应一套） |
| **画图工具** | `../../../../08-办公/画图/README.md`（工作台层 D2，命令行渲 SVG / PNG） |
| **文档规范** | `knowledge/phase1-requirements/prd-language.md`、`section-format.md`；`phase2-design/hld-spec.md`、`lld-spec.md`；索引 `knowledge/catalog.json` |
| **工作流规则** | `.agents/rules/req-doc-routing.md`（需求文档路由）、`context-budget.md`（预算禁读清单 · 最高铁律）、`context-assembly.md`（装配协议）、`compaction-recovery.md`（压缩恢复）、`prd-to-srs-gate.md`（转写门禁）、`delivery-and-hooks.md`（交付模式与 Hook）、`agent-runtime.md`、`role-dispatch.md`、`soft-gates.md`、`ade-compat.md`、`nav-map.md`（本文件） |
| **模板** | `templates/交接清单模板.md`、`README-DEV.template.md`、`project-init.md`、`PACKAGING.md` |

### 工程件容量与关键封装（外移自 `AGENTS.md` §一 细节，2026-10-30）

> `AGENTS.md` §一 只保留结论（有哪些封装、禁止裸调、禁止另写一套）；容量数字与逐个封装的说明放这里，避免常驻文件被细节撑大。

| 封装 | 容量 | 说明 |
| --- | --- | --- |
| `composables/useTable.ts` | 21 KB | 分页 / 排序 / 筛选 / 缓存 / 防抖 / 类型推导一体；**不要另写一套表格逻辑** |
| `composables/useChart.ts` | 16 KB | 图表数据适配；配合 `utils/echarts.ts`（按需注册）+ 9 个 `art-*-chart` 组件 |
| `utils/http/` | — | axios ^1.12 统一封装，**禁裸调 axios / fetch** |
| `utils/crud` | — | `createCrudApi<T>()` 三行生成 CRUD |
| 全局指令 | — | `v-auth`（权限标识）/ `v-roles`（角色码）/ `v-ripple` / `v-highlight`；SRS 有权限要求的页面**必须**挂前两者 |
| 状态管理 | — | pinia ^3 + persistedstate，`defineStore('xStore', () => {...}, { persist: true })` setup 写法 |
| 路由 | — | vue-router ^4 模块化注册：`router/modules/*.ts` + `routes/asyncRoutes.ts`，`meta.title` 走 i18n key |

**UI 库多栈说明**：`.agents/knowledge/ui-libs/` 下 5 个目录（`element-plus` 为本工程实际栈，另 `ant-design-pro` / `arco-design-vue` / `shadcn` / `vant` 共 4 套供 `page-spec-loader` 按子项目 `package.json` 检测后**只加载对应一套**）。`ui-libs/` 实测 64 KB / 15 文件——**严禁递归全部 5 套**，见 `context-budget.md`。
