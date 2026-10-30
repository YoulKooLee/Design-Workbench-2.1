# 子 Agent 编排

> 位置：`.agents/rules/subagent-orchestration.md` ｜ 读取层：按需 Read
> 来源：自 `AGENTS.md` v09（2026-09-19）该章节**原文外移**，正文未改写。

以下调用为强制要求，无需用户提示，不存在「这次可以跳过」的例外：

|触发场景|调用对象|要求|
|-|-|-|
|写完/修改代码后|`code-reviewer`|每组相关改动完成后审查；**`page-generator` 步骤 6 已并行 code-reviewer 的功能，同功能内不再重复调用**|
|涉及认证/权限/加密|`code-reviewer`|重点审查安全漏洞|
|修改需求说明书前|读取规范|先 Read `prd-language.md` + `section-format.md`，不读不写（**仅 SRS / `req-doc` 产出**）|
|仅有 PRD 却要研发类技能|转写门禁|Read `.agents/rules/prd-to-srs-gate.md`；路由 **`req-doc` Step F**，不得静默用 PRD|
|修改 PRD 前|读取技能|Read `prd-writer/SKILL.md` 与对应 `references/`（**`*-PRD.md` / 概念版**）|
|修改需求说明书后|SRS 规范扫描|禁用词、跨章节一致性、内容分级，不通过不算完成|
|多文件变更或架构决策前|`planner`|先规划再动手|
|无依赖关系的独立操作|并行执行|不要无谓串行等待|

子 Agent 定义位于 `.agents/agents/`。

### 技能内协作流水线

|技能|子 Agent 流水线|
|-|-|
|`req-doc`|req-analyzer → req-writer（**子 Agent**）→ req-reviewer（先写后审）；template-analyzer（Word 模板提炼）；**Step F** PRD→SRS 转写|
|`prd-writer`|无子 Agent；主 Agent 按 `references/` + `self-check.md`|
|`prototype-to-prd`|盘点阶段无子 Agent；写 PRD 阶段交接 **`prd-writer`**|
|`feasibility-report`|feasibility-analyzer → feasibility-writer → feasibility-reviewer|
|`hld-design` / `lld-design`|design-analyzer → design-writer → design-reviewer|
|`page-generator`|page-spec-loader → 编码 → page-reviewer + code-reviewer（并行）|
|`annotation`|annotation-prd-analyzer → annotation-code-locator|
|`diagram-generator`|diagram-drawer（Task `generalPurpose` + Read `diagram-drawer.md`）|
|`delivery-plan`|delivery-analyzer|

### Agent 派发与调用细则

**知识库强制前置** — spawn 子 Agent 时 prompt 首行必须带：
`【强制前置步骤】开始工作前，先 Read(.agents/knowledge/conventions/coding.md) 获取编码规范；未完成前禁止执行后续操作。`

**模型路由** — 简单机械操作（重命名/格式化）用 haiku；标准 CRUD / 页面生成用 sonnet；架构设计、安全审查、复杂调试用 opus。

**并行派发** — 无依赖的独立操作必须同一条消息并行（如 3+ 失败因不同根因）；失败相互关联、需完整系统状态、会互改同一文件时不并行。Prompt 聚焦且自包含、明确输出；派发后读摘要 → 查冲突 → 跑完整测试。复杂问题可拆需求/可行性/安全/一致性多视角子 Agent。

**调用约束** — 只做职责内事；技能内部协作由技能自动调度，主流程不干预；**子 Agent 不得触发技能流程**（`<SUBAGENT-STOP>`）、不得再派发子 Agent；有 concerns 必须在输出中标注，不得静默忽略。

> 各项的理由与成本依据见 `.agents/rules/AGENTS-rationale.md` §六。

---
