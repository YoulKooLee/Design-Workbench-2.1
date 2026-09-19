# 无 Hook 软门禁

> 本文件是「先读后改 / 完成前验证 / 审查勾选」的唯一长文真源。怎么跑见 `agent-runtime.md`；审多深见 `AGENTS.md`「交付模式」；怎么验证见 `.agents/skills/verification-before-completion/SKILL.md`。技能内只加短指针，禁止复制本文。

未接入 Hook 时以下三条仍须执行。已接入 Hook 时技能步骤不因此省略。禁止因无 Hook 把快速模式升为全量审查。

## 先读后改

改**已有**文件前必须先 Read。新建文件除外。禁止靠记忆覆盖未知内容。禁止改 eslint / tsconfig / prettier 等配置来消除报错。

## 完成前验证

宣称完成前按 `verification-before-completion`：IDENTIFY → RUN → READ → VERIFY，禁止空口断言。

- **文档类**（仅写 `docs/`、设计稿、计划、图表源）：可省略 `npm run build`；用本技能已有检查作证据（结构检查、禁用词 grep、`validate-diagram` 等）。
- **代码类**（改 `src/` 等源码）：必须跑项目验证命令；纯 JSON 语法检查不能单独充当改了 Vue/TS 后的完成证据。

## 审查勾选

仅当当前 `DELIVERY_MODE` 要求该审查角色时，宣称完成前勾选「已按该模式跑完」。若模式规定本步跳过该角色 → **整步跳过**（不扮演、不派发）。快速模式的「收窄」（如 page-reviewer 仅维 2）不是整步跳过。

## 技能适用表

| 技能 | 类别 | 完成前验证 | 审查勾选 |
| --- | --- | --- | --- |
| `srs-writer` | 文档 | 省略 build；禁用词 grep / 结构检查 | `req-reviewer`：快速整步跳过；标准抽检；严格全量 |
| `feasibility-report` | 文档 | 省略 build | 按本技能已有调度；无跳过表则不新造 |
| `hld-design` / `lld-design` | 文档 | 省略 build | `design-reviewer` 按本技能已有调度 |
| `delivery-plan` | 文档 | 计划本身省略 build；Step D 进入 `feature-dev` 后继承代码验证 | analyzer 非审查角色；下游步骤 6 按其模式 |
| `diagram-generator` | 文档 | 省略 build；`validate-diagram` 可作证据 | 无独立 reviewer；不因此新增 code-reviewer |
| `feature-dev` | 代码 | 必须 verification（5.1 build/type-check；标准/严格走步骤 6 维 1） | 按已有 6.0 表：快速仅维 2 + P0 安全 |
| `annotation` | 代码（改源码时） | 改了 `src/` 须 verification；JSON 校验保留但不够单独充当完成证据 | 改源码后按 `AGENTS.md` 勾选 `code-reviewer`；不新造快速跳过表 |
