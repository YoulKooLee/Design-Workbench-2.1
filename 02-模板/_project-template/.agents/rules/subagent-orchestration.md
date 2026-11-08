# 子 Agent 编排（3+3 精简版 · 2026-11-08）

> 位置：`.agents/rules/subagent-orchestration.md` ｜ 读取层：按需 Read
> 理论依据：沈剑《究竟什么时候该拆subagent？其实，大部分时候不该拆》
> 拆分三信号：上下文装不下 / 职责说不清 / 失败会传染 —— 一个都没有就别拆

## 当前可用子 Agent（3 个，全部是"审查者"角色）

独立上下文做审查，不带主流程的编写偏见：

| Agent | 文件 | 职责 | 调用时机 |
|---|---|---|---|
| `design-reviewer` | `.agents/agents/design-reviewer.md` | HLD/LLD 设计文档审查：结构完整性、分层边界、技术规范、可追溯性、设计质量五维度 | `hld-lld-writing` skill 写完每章后 |
| `design-note-reviewer` | `.agents/agents/design-note-reviewer.md`（3+3 精简保留，审查设计说明卡片） | 页面设计说明卡片审查：功能点完整性、文案规范（禁技术黑话）、与代码一致性三维度 | 原型工作流在每张页面设计说明写完后 |
| `page-reviewer` | `.agents/agents/page-reviewer.md` | 生成页面代码审查：需求完整性、规范符合、代码质量 | `page-generator` skill 步骤 6 |

## 已转 Skill 的能力（3 个，主 Agent 自己执行）

这些原本拆成子 Agent 是"分析师+撰写师"两段式，紧耦合传递反而损信息，主 Agent 一气呵成更稳：

| 原能力 | 现 Skill | 触发词 |
|---|---|---|
| req-analyzer + req-writer | `req-doc-writing` | 写 PRD / 写 SRS / 反向同步 |
| design-analyzer + design-writer | `hld-lld-writing` | 写 HLD / 写 LLD / DOC_TYPE=hld\|lld |
| page-spec-loader | `page-spec-loading` | 生成页面前按需加载 |

## 已废弃的能力（不再需要）

| 原 Agent | 处理方式 | 理由 |
|---|---|---|
| `code-reviewer` | 去掉 | `page-reviewer` 已覆盖页面级审查；通用代码审查暂不需要 |
| `planner` | 去掉 | 规划是主 Agent 核心职责，拆出来反增协调成本 |
| `diagram-drawer` | 去掉 | 画图主 Agent 自己做，产出不大 |
| `delivery-analyzer` | 去掉 | 产出不大，主 Agent 自己能做 |
| `template-analyzer` | 去掉 | 一次性工作，不需要专门 Agent |
| `annotation-prd-analyzer` / `annotation-code-locator` | 并入规范 | 标注规范合并到 `src/common/design-notes/规范.md` |
| `feasibility-*` 三个 | 去掉 | 可研报告频率低，放工作台知识库作参考模板即可 |

> 18 个原 Agent 定义全部存档于 `_archive/agents/`，需要回溯时可查。

## 强制调用清单（无需用户提示，不存在「这次可以跳过」的例外）

| 触发场景 | 调用 | 要求 |
|---|---|---|
| 写完/修改需求说明书后 | SRS 规范扫描 | 禁用词、跨章节一致性、内容分级，不通过不算完成 |
| 仅有 PRD 却要进研发类技能 | 转写门禁 | Read `.agents/rules/prd-to-srs-gate.md`；路由 **`req-doc` Step F**，不得静默用 PRD |
| 修改 PRD 前 | Read 技能 | Read `prd-writer/SKILL.md` 与对应 `references/` |
| 修改需求说明书前 | 读取规范 | 先 Read `prd-language.md` + `section-format.md`，不读不写（**仅 SRS / `req-doc` 产出**） |
| 写完页面设计说明 | `design-note-reviewer` | 每张页面设计说明卡片写完后 |
| 写完 HLD/LLD 章节 | `design-reviewer` | `hld-lld-writing` skill 写完每章后 |
| `page-generator` 步骤 6 | `page-reviewer` | 生成页面代码后 |
| 无依赖关系的独立操作 | 并行执行 | 不要无谓串行等待 |

## Agent 派发与调用细则

**知识库强制前置** — spawn 子 Agent 时 prompt 首行必须带：
`【强制前置步骤】开始工作前，先 Read(.agents/knowledge/conventions/coding.md) 获取编码规范；未完成前禁止执行后续操作。`

**模型路由** — 简单机械操作（重命名/格式化）用 haiku；标准 CRUD / 页面生成用 sonnet；架构设计、安全审查、复杂调试用 opus。

**并行派发** — 无依赖的独立操作必须同一条消息并行（如 3+ 失败因不同根因）；失败相互关联、需完整系统状态、会互改同一文件时不并行。Prompt 聚焦且自包含、明确输出；派发后读摘要 → 查冲突 → 跑完整测试。

**调用约束** — 只做职责内事；技能内部协作由技能自动调度，主流程不干预；**子 Agent 不得触发技能流程**（`<SUBAGENT-STOP>`）、不得再派发子 Agent；有 concerns 必须在输出中标注，不得静默忽略。

## 审查闭环（Evaluator-Optimizer）

> 依据：Anthropic《Building Effective Agents》Evaluator-Optimizer 模式——"生成→评估→反馈→重新生成→再评估"循环。

审查者 subagent 审查**不通过**时，主 Agent 必须按以下流程处理：

1. **提取反馈**：从 reviewer 输出中提取所有不通过项及具体修改建议
2. **针对性修改**：根据反馈修改产物（不是重写全部，只改被指出的问题）
3. **重新提交审查**：修改后再次调用同一 reviewer，prompt 中附带上一轮反馈摘要
4. **最多 2 轮**：第 2 轮仍不通过 → 暂停，列出分歧点请用户拍板。不得无限循环

**调用任何技能前，先输出一行计划**：「我打算用 X 技能做 Y，因为 Z」——既透明化路由判断，也让模型自检选技能是否合理。

> 各项的理由与成本依据见 `.agents/rules/AGENTS-rationale.md` §六。
