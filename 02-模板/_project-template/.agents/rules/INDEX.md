# 规则索引（索引层）

> 先在这里定位，再读对应文件全文。**不要逐个打开 `rules/` 下的文件**。
> 增删 `rules/` 下文件后，同步本表。

| 什么时候用 | 读哪个文件 | 一句话 |
|-|-|-|
| 派 / 编排子 Agent | `agent-orchestration.md` | 触发场景、协作流水线、模型路由、调用约束 |
| 发子 Agent 任务 | `spawn-subagent.md` | prompt 开头必须注入的强制指令 |
| 子 Agent 内要调技能时 | `subagent-stop.md` | 子 Agent 禁止触发技能，命中即停 |
| 写或改代码 | `coding-conventions.md` | 只做被要求的事，不加需求里没有的效果 |
| 写前端页面 / 样式 | `frontend-conventions.md` | 按功能/模块组织，不按文件类型 |
| 提交、开分支 | `git-workflow.md` | Conventional Commits 与提交粒度 |
| 走研发主链路 | `development-workflow.md` | 需求 → 设计 → 实现 → 验收的主干顺序 |
| 写原型「设计说明」 | `design-notes-conventions.md` | 必须用 `PrototypeLayout.tsx` 渲染，禁止手写内联说明层 |
| 写需求说明书 / 选文档技能 | `req-doc-workflow.md` | 三体系路由表与选择规则 |
| 只有 PRD 却要转 SRS | `prd-to-srs-gate.md` | 转写门禁与步骤 |
| 上下文被压缩后 | `compaction-recovery.md` | 逐项检查表，全过才继续 |
| 想查规则依据 | `AGENTS-rationale.md` | 每条规则为什么这么定 |
