# Agent 工作流程

> ⚠️ **维护提醒**：本文件是 `AGENTS.md` 的模板版本（含 `{{...}}` 占位符）。**改动 `AGENTS.md` 时必须重新运行 `node .agents/scripts/build-agents-template.mjs` 同步本文件**（除占位符段落外两文件正文保持一致），否则新项目生成的 AGENTS.md 与模板脱节。

{{PROJECT_INFO_SECTION}}


本模板（`_DSH-template`）用于**从空白页开始画原型**：React + Vite + Tailwind，产出可运行原型。
原型定稿后如需开发应用层，**另建新项目**——本工程不承载应用层。

**本文件只写三类内容**：① 本工程独有的事实；② 本工程独有的约定；③ 上下文被压缩时该保住什么。
通用工程能力（设计、编码、审查、写文档、调技能）用你自己的判断和宿主自带的能力，**不必等本文件的许可**。面向用户的回复一律中文。

---

## 一、本工程独有的事实

| 事项 | 值 |
|-|-|
| 组件真源 | `src/component-templates/`（每个组件含 `index.html` + `index.tsx`） |
| 组件反查 | 用 `.agents/component-manifest.json` 查**单个组件**；**禁止整目录 Read** `src/component-templates/` |
| 共享母版层 | 工作台根下的 `03-组件库`（**在工程外**，JSON + 提示词母版）；同样**禁止整目录 Read** |
| 主题 | `src/themes/<theme-key>/`；只需要主题名时读其 `theme.json` 的 `name`，**不要递归** |
| 预览入口 | Make 管理端 `http://localhost:53817/`；`check-app-ready` 返回 `serverUrl` 时以实际值为准 |
| 工程根 | `project-memory.md`（记忆索引）、`.axhub/make/`（运行态）、`rules/`（业务规范） |

---

## 二、先分流，再决定要不要停下来问人

| 情况 | 做法 |
|-|-|
| 方向已定，要尽快看到东西 | **先做出来再收敛**；开工前把目标 / 范围 / 验收问清一次，之后不反复请示 |
| **方向会变**：目标、范围、验收重点、信息架构、交互路径、视觉方向出现多种选择 | **停下来问人** |
| **范围会变**：要加模块、要改数据模型 | **停下来问人** |
| 产出要交给别人接手 | **规格先行**：SRS 是唯一真源；只有 PRD 时先走 PRD→SRS 转写门禁，不得静默用 PRD |

其余自己判断，**不要为了请示而请示**。

---

## 三、基线与实现：不规定先后，但收口时两者都要有、且必须一致

**上下文被压缩时，优先保住**：系统架构 · 业务模型 · 数据模型 · 当前模块需求。

**但真正可靠的机制是落盘**——别指望「压缩时被保住」，让基线永远是文件，丢了按路径重读：

| 件 | 落盘路径（按需创建，不预置空文件） |
|-|-|
| SRS（需求规格，研发唯一真源） | `docs/01-需求与规划/*SRS*.md` 或 `docs/**/*需求*说明书*.md` |
| HLD（系统架构 + 数据模型） | `docs/02-架构与设计/*概要设计*.md` |
| LLD（逐模块实现） | `docs/02-架构与设计/*详细设计*.md` |
| 过程与索引 | `project-memory.md`（只放摘要 + 路径，不放正文） |
| 跨轮接力 | 每轮记「已完成 / 下一步 / 待拍板」，下一轮靠它接力，**不重读上一轮过程讨论** |

**写入侧门禁**：进基线前先归类——`[事实]`（客户原话 / 已签字需求 / 实测数据）**可进基线**并带来源；`[讨论]`（方案对比、试错、推断）与 `[否决]`（附**必填理由**）**只进过程层** `project-memory.md`。其余去向：项目级可复用 → `项目答疑手册.md`；工作台级 → `../../08-文档/工作台答疑手册.md`；**无法判断 → 问人**。

每份基线头部登记版本 + 变更时间 + 一句话摘要；实现改变了基线事实必须回写，否则视为未完成。

---

## 四、技能与子 Agent

- **技能**：需要时查 `.agents/skills/INDEX.md`，**命中才加载**那一个 `SKILL.md`；没命中就用通用能力，并在回复里说明「本次未匹配到技能」，**不必强行匹配**。
- **需求文档类**（PRD / SRS / 说明书）：先 Read `.agents/rules/req-doc-workflow.md` 与 `.agents/rules/prd-to-srs-gate.md` 按表选技能，再读对应 `SKILL.md`。
- **子 Agent 适合「盘点取结论」**：几十 KB 的文件换成几 KB 的结论清单，省一个数量级。
- **子 Agent 不适合「审查」**：审查必须自己读改动点——实测派子 Agent 做审查会返回截断、白花时间。
- 部分宿主只认自己的子 Agent 路径而读不到 `.agents/agents/`；不可用时按 `.agents/rules/agent-orchestration.md` 自行审查。

---

## 五、原型探索路径

```text
读上下文 → 需求对齐（问清一次）→ 设计方向对齐 → 主规格草案 → 评审确认 → 实现 → 同步主规格 → 预览链接 → 验收
```

- 主规格不是空白起点；需求与设计完成第一轮对齐后，再建草案。
- 局部文案 / 样式 / 素材替换 / 明确 bug 修复可跳过正式对齐；若改动改变了原型事实，仍需同步主规格。
- 对齐与确认门槛：`rules/requirements-alignment-guide.md`；原型开发：`rules/prototype-development-guide.md`；Review：`rules/prototype-review-guide.md`；主题：`$build-design-system`；资料与画布：`rules/resource-management-guide.md`。
- **规模**：单文件建议 ≤ 600 行，超了按「页面 / 职责」拆——理由不是「人看着累」，而是**改动后要重读一次，太贵**。

---

## 六、按需读取地图（永不常驻）

| 要用什么 | 读哪里 |
|-|-|
| 技能索引 | `.agents/skills/INDEX.md` |
| 需求文档路由 / 转写门禁 | `.agents/rules/req-doc-workflow.md`、`.agents/rules/prd-to-srs-gate.md` |
| 子 Agent 调用标准 | `.agents/rules/agent-orchestration.md` |
| 编码 / 前端 / 安全规范 | `.agents/knowledge/conventions/` |
| SRS 语言与章节格式 | `.agents/knowledge/phase1-requirements/` |
| 设计规范 | `.agents/knowledge/phase2-design/` |
| UI 库参考 | `.agents/knowledge/ui-libs/` |
| 业务规范（原型 / 主题 / 资源 / Review） | `rules/`（入口 `rules/README.md`） |
| 压缩恢复检查表 | `.agents/rules/compaction-recovery.md` |
| 工作台层记忆 | `10-智能体记忆/BOOTSTRAP.md`（新会话自举、脚本 / 中文路径 / 编码问题时读） |
| 全部「为什么」 | `.agents/rules/AGENTS-rationale.md` |

**读不到时的自判约定**
- **编码底线**：禁止改 `.eslintrc` / `tsconfig.json` 等配置来消除报错；**新增原型页面必须同步注册路由**；避免 `console.log` 残留与裸写 `fetch`。其余风格按现有代码对齐。
- **路径约定**：技能 `.agents/skills/{name}/SKILL.md`｜子 Agent `.agents/agents/{name}.md`｜工作流规则 `.agents/rules/*.md`。
- **知识库维护**：增删 `.agents/knowledge/` 下 .md 后同步 `catalog.json`。
- **加载优先级**：`project-memory.md` > 通用层 > `10-智能体记忆/`。
