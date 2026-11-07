## 项目信息

- 项目名称：崂山国家实验室项目

# Agent 工作流程 · 崂山国家实验室项目

本工程是 **Axhub Make Client** 工程：React 可运行原型 + Vue3 admin 后台，内置 VibePM 技能体系，覆盖「需求 → 设计 → 原型 → 开发 → 验收」全链路。
主 Agent 的职责是识别任务、触发技能、调度子 Agent——而非亲自撰写文档或编写代码。

**本文件只写三类内容**：① 本工程独有的事实；② 本工程独有的约定；③ 上下文被压缩时该保住什么。
通用工程能力（设计、编码、审查、写文档、调技能）用你自己的判断和宿主自带的能力，**不必等本文件的许可**。面向用户的回复一律中文。

> ⚠️ **常驻越短越好，不是「塞得下就行」**：宿主注入窗口实测约 8.4K 字符，超窗尾部**不会**被看到。故本文件**只放「触发条件 → 读哪个文件」的路由 + 铁律，正文一律外置** `.agents/rules/`；上限 **≤8,000 字符**。
>
> ⚠️ **本文件只在会话首轮注入一次，压缩不带回** → 故：**会话别开太长**（按模块 / 阶段新开会话）；结论**立刻落盘**（压缩只保留「做了什么动作」，工具结果正文 99.5% 被丢弃）。
> 维护者须知（写规则 / 迁移时的判据、持续约束三落点）：`templates/project-init.md`。

---

## 一、本工程独有的事实

| 事项 | 值 |
|-|-|
| 项目 | **崂山国家实验室项目**（产物：数字孪生大屏 / 数字孪生应用） |
| 定位 | 双层——React 原型（`src/`）+ Vue3 admin 后台（`admin/`） |
| 原型层 | `src/prototypes/`（React + Vite + Tailwind，按生产级界面处理）← 原型产出主战场 |
| 开发层 | `admin/`（Vue3 + Element Plus，`page-generator` 交付目标；WORKSPACE_PATH=根、PROJECT_PATH=`admin/`；pnpm ≥ 8.8.0） |
| 技能层 | `.agents/skills/`（50+ 技能）+ 索引 `.agents/skills/INDEX.md` |
| 知识层 | `.agents/knowledge/`（编码 / 需求 / 设计 / 测试规范 + UI 库参考，按需读取） |
| 设计参考 | `design-knowledge/`（manifest.json + indexes + design-md；**禁整目录 Read**，按名取用） |
| 主题与资源 | 主题 `src/themes/<key>/`；预设样式库 `.style/`（9 套）；资源与画布 `src/resources/` |
| 预览入口 | Make 管理端 `http://localhost:53817/`；`check-app-ready` 返回 `serverUrl` 时以实际值为准 |
| 工程基建（勿改） | `src/preview-templates/`、`vite-plugins/`、`scripts/`、`rules/` |
| 工程根 | `project-memory.md`（记忆索引）、`.axhub/make/`（运行态 + **client-update 备份**）、`.workbuddy/`（运行时生成） |

> 完整目录树与路径约定：`.agents/rules/project-structure.md`。

---

## 二、先分流，再决定要不要停下来问人

| 情况 | 做法 |
|-|-|
| 方向已定，要尽快看到东西 | **先做出来再收敛**；开工前把目标 / 范围 / 验收问清一次，之后不反复请示 |
| **方向会变**：目标、范围、验收重点、信息架构、交互路径、视觉方向出现多种选择 | **停下来问人** |
| **范围会变**：要加模块、要改数据模型 | **停下来问人** |
| 产出要交给别人接手 | **规格先行**：SRS 是唯一真源；只有 PRD 时先走 PRD→SRS 转写门禁，不得静默用 PRD |

其余自己判断，**不要为了请示而请示**。

## 三、基线与实现：落盘优先，收口时两者都要有且一致

**上下文被压缩时优先保住**：系统架构 · 业务模型 · 数据模型 · 当前模块需求。
**但真正可靠的机制是落盘**——基线永远是文件，丢了按路径重读：

| 件 | 落盘路径（按需创建，不预置空文件） |
|-|-|
| PRD / 概念版 | `docs/**/*-PRD*.md`、`docs/**/*-概念版*.md` |
| SRS（研发唯一真源） | `docs/01-需求与规划/*SRS*.md` 或 `docs/**/*需求*说明书*.md` |
| HLD / LLD | `docs/02-架构与设计/*概要设计*.md`、`*详细设计*.md` |
| `src/resources/` 副本 | 上述文档的 markdown 副本（供 Make 预览，Make 只识别 md）；真源在 `docs/`，改完跑 `npm run docs:sync` |
| 过程与索引 | `project-memory.md`（只放摘要 + 路径，不放正文） |
| 跨轮接力 | 每轮记「已完成 / 下一步 / 待拍板」，下一轮靠它接力，**不重读上一轮过程讨论** |

**写入侧门禁**：进基线前先归类——`[事实]` 可进基线并带来源；`[讨论]` 与 `[否决]`（附**必填理由**）只进过程层 `project-memory.md`；**无法判断 → 问人**。
过程层条目加**类型标签**：`[决策]`｜`[修复]`｜`[风险]`｜`[安全]`，写在日期之后；标 `[敏感]` 的不落盘。
每份基线头部登记版本 + 变更时间 + 一句话摘要；实现改变了基线事实必须回写。

**编码底线**：单文件 ≤ 800 行（建议 ≤ 600）、单函数 ≤ 120 行；禁止 `console.log`、禁止裸写 `fetch`；**禁止改 `.eslintrc` / `tsconfig.json` 消除报错**；**新增页面必须同步注册路由**；API 函数必须有 JSDoc。全文（含豁免与语言安全）：`.agents/rules/write-safety.md`。

## 四、技能与子 Agent

- **技能**：`.agents/skills/INDEX.md` 自动加载；命中加载对应 `SKILL.md`，若采用通用能力于对话中说明。严禁遍历技能目录（约 400 KB）。
- **需求文档类**（PRD / SRS / 说明书）：先 Read `.agents/rules/req-doc-workflow.md` 与 `.agents/rules/prd-to-srs-gate.md` 按表选技能，再读对应 `SKILL.md`。
- **子 Agent**：只做「盘点取结论」——几十 KB 的文件换成几 KB 结论；**不做审查**（审查必须自己读改动点）。编排与调用标准：`.agents/rules/agent-orchestration.md`。
- **执行优先级（不可跳步）**：① 技能优先（1% 可能匹配就调用，需求文档类先过路由）② 代理分工（分析/撰写/审查交对应角色）③ 规范驱动（先读 `.agents/knowledge/` 或 `.agents/rules/`）④ 即时审查 ⑤ 验证收口（报告完成前跑构建 / 测试）。

## 五、原型探索路径

**主干五步**：① 需求与功能设定 → ② 框架方案推荐 → ③ 确认框架后写 PRD + 系统架构 + 数据模型（初稿）→ ④ 按模块循环（模块需求确认 → 原型确认与模拟验证 → 回写基线）→ ⑤ 原型完成后转写 SRS

- **框架未确认不动手**。成熟品类 / 有开源实现的，直接给「架构图 + 原型 + 文字描述」三件套；常见品类先凭模型自身知识做一版，不熟再找开源，找不到就自己做。
- **模拟验证**：按真实业务顺序走一遍——① 动作点下去，状态或数据是否真的变了；② 同一条数据跨页是否同源、汇总与明细是否对得上。只检查「有没有这个页面」不算验证。
- **模块粒度由上下文预算决定**：AI 自己规划、可实时调整（装不下就拆小、太碎就合并）。进模块装配、离开卸载，详见 `.agents/rules/context-assembly.md`；单次 ≤ 120 KB，超限先压缩。
- **压缩时**：基线（PRD / 架构 / 数据模型）与**最终输出**不能丢；当前功能的输入输出细节可丢。详见 `.agents/rules/compaction-recovery.md`。
- **主规格**（`src/prototypes/<slug>/.spec/spec.md`）是本模块原型的方案依据，**不是** PRD / SRS。
- 局部文案 / 样式 / 素材替换 / 明确 bug 修复可跳过正式对齐；改了原型事实仍需回写。
- 细则：`rules/requirements-alignment-guide.md`、`rules/prototype-development-guide.md`、`rules/prototype-review-guide.md`；单文件建议 ≤ 600 行。

## 六、按需读取地图（永不常驻）

| 要用什么 | 读哪里 |
|-|-|
| 规则索引（先定位再读全文） | `.agents/rules/INDEX.md` |
| 上下文预算（禁遍历清单 / 越界自检） | `.agents/rules/context-budget.md` |
| 上下文装配协议（每次会话装什么） | `.agents/rules/context-assembly.md` |
| 核心工作流（五步主干 · 按模块推进） | `.agents/rules/core-workflow.md` |
| 技能匹配原则 / 同类裁决 | `.agents/rules/skill-routing.md` |
| 交付模式三档（快速 / 标准 / 严格） | `.agents/rules/delivery-modes.md` |
| 子 Agent 编排（触发场景 / 流水线） | `.agents/rules/subagent-orchestration.md` |
| 子 Agent 调用标准 | `.agents/rules/agent-orchestration.md` |
| 重要原则 / 交付铁律 / 基线链 | `.agents/rules/work-principles.md` |
| 知识库速查 / Hook 门禁 | `.agents/rules/knowledge-and-hooks.md` |
| 项目结构 / 路径约定 | `.agents/rules/project-structure.md` |
| 记忆分层 / 三问门禁 / 工作台记忆 | `.agents/rules/memory-gates.md` |
| 语言 / 安全 / 编码底线 | `.agents/rules/write-safety.md` |
| 需求文档路由 / 转写门禁 | `.agents/rules/req-doc-workflow.md`、`.agents/rules/prd-to-srs-gate.md` |
| 编码 / 前端 / 安全规范 | `.agents/knowledge/conventions/` |
| SRS 语言与章节格式 | `.agents/knowledge/phase1-requirements/` |
| 设计规范 | `.agents/knowledge/phase2-design/` |
| UI 库参考 | `.agents/knowledge/ui-libs/` |
| 画图（架构图 / 流程图 / 时序图） | `../../08-办公/画图/README.md`（工作台层 D2，命令行渲 SVG / PNG） |
| 业务规范（原型 / 主题 / 资源 / Review） | `rules/`（入口 `rules/README.md`） |
| 压缩恢复检查表 | `.agents/rules/compaction-recovery.md` |
| 工作台层记忆 | `../../10-智能体记忆/BOOTSTRAP.md` |
| 全部「为什么」 | `.agents/rules/AGENTS-rationale.md` |
