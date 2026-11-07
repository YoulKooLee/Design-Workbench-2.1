# 项目家规总纲

本模板（`_project-template`）用于从空白页开始画原型：React + Vite + Tailwind，产出可运行原型。
原型定稿后如需开发应用层，另建新项目，本工程不承载应用层。
新建项目时随模板注入，是智能体每次工作的默认行为准则。

## 一、这份文件是什么
本文件是智能体执行工程任务时 "默认行为准则"：工作流程、工作规范、技能资源地图、工作重要原则与方法等，务必认真遵守。
通用工程能力（设计、编码、审查、写文档、调技能）用你自己的判断和宿主自带能力，不必等本文件许可。

**重要事项**：
`project-memory.md` 是项目记忆，用于保存上下文窗口外的重要事宜；`docs/` 文件夹存放项目基线（设计方案真源）。发现这两份或本文件已不在上下文 → 重读一次。
`.agents/hooks/` 的护栏脚本是否被宿主加载不确定：本文件与 rules 的纪律靠自己遵守，护栏只作额外提醒，不作为兜底依据。

---

## 二、原型探索路径

主干五步：

```
① 需求与功能设定 → ② 框架方案推荐 → ③ 框架确认后写 PRD + 系统架构 + 数据模型（初稿）
→ ④ 按模块循环：模块需求确认 → 原型实现与模拟验证 → 回写基线
→ ⑤ 原型完成后转写 SRS
```

- **框架未确认不动手**。常见品类先凭自己的知识做一版；不熟的找开源参考；都找不到就自己设计。成熟品类直接给「架构图 + 原型 + 文字描述」三件套。
- **模块粒度由上下文预算决定**，不由页面数量决定：装不下就拆小，太碎就合并。进模块时装配该模块上下文，离开时卸载（见 §4.4）。
- **局部改动可跳过正式对齐**：文案、样式、素材替换、明确的 bug 修复。但只要改动改变了原型事实，仍须回写基线。
- 模块的方案依据写在 `src/prototypes/<slug>/.spec/spec.md`（主规格），它不是 PRD，也不是 SRS。

**什么时候停下来问人**：方向会变（目标、范围、验收重点、信息架构、交互路径、视觉方向出现多种选择）、范围会变（要加模块、要改数据模型）、产出要交给别人接手。开工前把目标、范围、验收问清一次。

细则：`rules/requirements-alignment-guide.md`（对齐门槛）、`rules/prototype-development-guide.md`（开发）、`rules/prototype-review-guide.md`（评审）、`.agents/rules/core-workflow.md`（五步展开）。

---

## 三、按需读取地图

| 要用什么 | 读哪里 |
|-|-|
| 规则索引（先定位再读全文） | `.agents/rules/INDEX.md` |
| 原型探索五步展开 | `.agents/rules/core-workflow.md` |
| 画原型规范（主）与 UI 视觉取值参考（辅） | `.agents/knowledge/phase2-design/prototype-interaction-and-content.md`（主）、`prototype-design-baseline.md`（辅，源自 open-design） |
| 多页面原型侧栏导航生成（单一数据源 + 三方同步自检） | `.agents/knowledge/phase2-design/prototype-side-menu.md` |
| 原型页面右侧设计说明面板接入 | `src/common/design-notes/规范.md`（建项随补丁注入） |
| 上下文装配协议（每次装什么） | `.agents/rules/context-assembly.md` |
| 禁读清单与越界自检 | `.agents/rules/context-budget.md` |
| 压缩后怎么恢复、模块快照模板 | `.agents/rules/compaction-recovery.md` |
| 记忆分层与三问门禁 | `.agents/rules/memory-gates.md` |
| 系统化调试（修 bug 四阶段） | `.agents/knowledge/conventions/debugging.md` |
| 技能索引与同类技能裁决 | `.agents/skills/INDEX.md`、`.agents/rules/skill-routing.md` |
| 交付模式三档（快速 / 标准 / 严格） | `.agents/rules/delivery-modes.md` |
| 子 Agent 编排与调用标准 | `.agents/rules/subagent-orchestration.md`、`agent-orchestration.md` |
| 编码 / 前端 / 安全规范 | `.agents/knowledge/conventions/` |
| 语言、安全、编码底线全文 | `.agents/rules/write-safety.md` |
| 十条重要原则 + 五条交付铁律 + 基线链术语 | `.agents/rules/work-principles.md` |
| 8 个 Hook 的真实强制力与无 Hook 兜底、catalog 维护、admin 实现规范 | `.agents/rules/knowledge-and-hooks.md` |
| SRS 语言与章节格式 | `.agents/knowledge/phase1-requirements/` |
| UI 库参考（4 套，按 `package.json` 只读一套） | `.agents/knowledge/ui-libs/` |
| daisyUI 语义类名组件（CSS，非 React；展示道具/主题用） | `src/component-templates/daisyui/README.md` |
| 需求文档路由与 PRD→SRS 转写门禁 | `.agents/rules/req-doc-workflow.md`、`prd-to-srs-gate.md` |
| 项目结构与路径约定 | `.agents/rules/project-structure.md` |
| 业务规范（原型 / 主题 / 资源 / Review） | `rules/`（入口 `rules/README.md`） |
| 画图（架构图 / 流程图 / 时序图） | `../../08-办公/画图/README.md` |
| 项目记忆（进度 / 决策 / 快照 / 留痕） | `project-memory.md` |
| 知识库索引（增删知识文件后重建） | `.agents/knowledge/catalog.json` ← `node .agents/scripts/build-knowledge-catalog.mjs` |
| 全部「为什么这么定」 | `.agents/rules/AGENTS-rationale.md` |
| 维护者须知（写规则 / 迁移判据） | `templates/project-init.md` |

---

## 四、重要原则与方法

### 4.1 画原型的要求

原型默认是**可运行、接近正式产品**的界面，不是黑白灰线框或低保真草稿——除非用户明确要求线框。

原型规范以 `phase2-design/prototype-interaction-and-content.md` 为准（交互九态、表单与反馈、可预测导航、真实一致内容、DOM 一致性、质量底线）。`prototype-design-baseline.md` 源自 open-design、偏 UI 视觉取值（对比度、字号、间距、动效时长等），只在需要视觉打磨时参考，不作为原型规范来源。

页面要**接近真实**：用 mock 数据把业务跑起来——动作点下去状态或数据真变、同一条数据跨页同源、汇总与明细对得上、异常路径有交代，以此检验流程是否闭环、数据流转有没有出错。验收口径见 §4.5。

多页面原型**必须带统一侧栏**——分组 + 子页面两级、菜单↔路由↔页面标题↔面包屑↔宿主目录同源，生成前读 `phase2-design/prototype-side-menu.md` 并按其 §10 自检；每个页面右侧的**设计说明面板**按 `src/common/design-notes/规范.md` 接入。**设计说明是给开发看的**：每条内容出自该页 PRD / SRS 或其蒸馏产物，逐项讲开发内容、边界与要求、交互细节、注意事项；**禁写会话过程与经验教训/踩坑叙事**（红线见规范.md Part C §8.1）；成稿后用 `humanizer-zh` 技能去 AI 味，只调措辞、不增删事实。

工程底线：单文件 ≤800 行（建议 ≤600）、单函数 ≤120 行，超了按页面或职责拆。禁 `console.log`、禁裸写 `fetch`、禁改 `.eslintrc` / `tsconfig.json` 来消除报错；新增页面必须同步注册路由。全文见 `write-safety.md`。

可复用资产：组件真源在 `src/component-templates/`（按业务分类，每个组件含 `index.html` + `index.tsx`），查单个组件用 `.agents/component-manifest.json` 反查，别整目录读；主题在 `src/themes/<theme-key>/`，只要主题名时读它的 `theme.json` 的 `name` 字段。

### 4.2 基线原则

**基线是上下文窗口之外的可靠备份**：凡是以后还要用的事实都落在文件里，按需读取，不靠「压缩时会被保住」；丢了按路径重读。写入基线前先走 §4.3 记忆分层，判定该不该存、存哪层。

| 件 | 落盘路径（按需创建，不预置空文件） |
|-|-|
| PRD / 概念版 | `docs/**/*-PRD*.md`、`docs/**/*-概念版*.md` |
| SRS（研发唯一真源） | `docs/01-需求与规划/*SRS*.md` |
| HLD / LLD | `docs/02-架构与设计/*概要设计*.md`、`*详细设计*.md` |
| Make 预览副本 | `src/resources/`（真源在 `docs/`，改完跑 `npm run docs:sync`） |

### 4.3 记忆分层

| 层 | 位置 | 装什么 |
|-|-|-|
| 索引层 | `project-memory.md` | 任务进度 / 决策记录 / 变更流水 / 模块快照：只放摘要 + 路径；正文落 `docs/` 与项目答疑手册 |
| 基线层 | `docs/` | PRD、SRS、HLD、LLD |
| 答疑层 | 项目答疑手册、工作台答疑手册 | 踩坑与经验，按复用范围分层 |

1. 影响设计基线（改动需求 / 概念版 / PRD / SRS 任一条）→ 更新对应基线文档（版本号 + 变更时间），并在 `project-memory.md` 索引登记一行
2. 项目级可复用 → 写入 `项目答疑手册.md`
3. 工作台级可复用 → 写入 `../../08-文档/工作台答疑手册.md`
4. 以上全否（一次性操作、可还原信息）→ 不保存
5. 无法判断 → 询问用户

### 4.4 上下文过载怎么办

装配分三层：常驻基线（本文件 + 需求清单 + 数据模型 + 架构 + 数据流 + 已完成模块快照）、阶段滑窗（当前阶段的 1–2 个知识文件）、模块滑窗（当前模块的设计 + 组件 + 上下游契约切片）。过程讨论、其他模块细节、技能库与知识库全量**永不常驻**。

过载时按顺序处理：

1. **先卸载**——退出当前模块时卸掉它的滑窗，别带着走。
2. **禁整目录读**——技能库、知识库、`src/themes/`、组件库都只能按精确路径读单个文件；主题只读 `theme.json` 的 `name`，组件用 `.agents/component-manifest.json` 反查单个。
3. **单次装配建议 ≤ 120 KB**——超了先卸载非必要滑窗；若确属必要开销（如三件套必须全章扫描才能判定合规），在 `project-memory.md`「运行态留痕」记一行再继续，不必强行中断。
4. **压缩后立即补快照**——不等验收、不等 hook。基线与「最终输出」（产出了什么、路径在哪）必须保住，字段级细节可丢。模块快照 ≤300 字，模板见 `compaction-recovery.md`。

### 4.5 验证策略

**模拟验证 = 模拟真实业务场景走一遍，检验流程是否闭环、数据能否正确流转**，不是检查页面存不存在：

1. 按真实业务顺序操作，动作点下去，状态或数据是否真的变了；
2. 同一条数据跨页是否同源，汇总与明细是否对得上；
3. 异常路径（空态、失败、权限不足）是否有交代。

只检查「有没有这个页面」不算验证。宣称完成前跑构建或类型检查，以运行结果为准。验收前把可打开的预览链接给用户（Make 管理端 `http://localhost:53817/`；`check-app-ready` 返回 `serverUrl` 时以实际值为准）。

### 4.6 修 bug 的方法

四阶段，不可跳步；未完成根因调查前不得提出修复：

1. 根因调查——读完整错误信息与堆栈、稳定复现、查最近变更、在组件边界收集进出数据、追数据流到源头；
2. 模式分析——找同代码库里正常工作的类似实现，逐条列差异；
3. 假设与最小验证——一次只验一个变量，无效就回滚，不在失败的修复上叠加修复；
4. 实现修复——先有失败测试，只修根因，不做顺手改进。

**同一方向失败 3 次就停止修补，质疑架构**，向用户说明后再动。禁止改配置来消除报错。全文见 `conventions/debugging.md`。

### 4.7 技能与子 Agent

技能索引 `.agents/skills/INDEX.md` 会话开始时注入；命中才加载对应 `SKILL.md`，未命中用通用能力并在回复中说明。**严禁遍历技能目录**（数 MB，一次读进来就爆窗口）。名称相近的技能按 `skill-routing.md` 的裁决表选，不要随机挑。

需求文档类（PRD / SRS / 说明书）先读 `req-doc-workflow.md` 与 `prd-to-srs-gate.md` 按表选技能。只有 PRD 却要进研发链路时，先走转写门禁，不得静默用 PRD。

子 Agent 只做「盘点取结论」——把几十 KB 的文件换成几 KB 结论；**不做审查**，审查必须自己读改动点。
