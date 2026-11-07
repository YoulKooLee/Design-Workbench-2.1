# 角色调度

何时必须跑哪个角色由本文件规定；怎么跑见 `agent-runtime.md`；话术见 `role-dispatch.md`。审查是否执行、审多深以 `DELIVERY_MODE` 为准。

## 自动执行规则（无需用户提示）

<EXTREMELY-IMPORTANT>
以下角色必须按 DELIVERY_MODE 执行。不存在「这次不需要」的例外。
跳过 = 违反项目规则。无独立子 Agent 时改为主会话扮演，不视为跳过。
</EXTREMELY-IMPORTANT>

### 必须执行的角色

| 触发条件 | 角色 | 时机 |
|---------|-------|------|
| 写完/修改任何代码后 | **code-reviewer** | 每组相关改动完成后，向用户报告前 |
| 复杂功能实现前（多文件、架构决策） | **planner** | 写代码前 |
| 构建失败 | 自行修复后重新验证 | 不报告"失败了" |

### 角色执行规则（派发或扮演）

1. 独立派发不继承主会话上下文；须注入 `spawn-subagent.md` 前置步骤。主会话扮演共享上下文，须先 Read 角色定义。统一按 `role-dispatch.md` 执行。
2. 被调度角色不触发技能流程
3. 被调度角色不得再调度其他角色
4. 被调度角色报告四状态：DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED

### code-reviewer 执行标准

**什么算"一组相关改动"：**
- 修改同一个功能的多个文件 → 全部改完后执行一次
- 修改不相关的多个功能 → 每个功能改完后各执行一次
- 单个文件的单次修改 → 改完立即执行

**code-reviewer 发现问题后：**
1. CRITICAL / HIGH → 必须修复
2. MEDIUM → 修复成本低就修
3. LOW → 记录但不一定修复
4. 修复后不需要再次 review（除非修复引入 >30 行新代码）
5. 如果不同意建议 → 说明理由，不盲目执行

**code-reviewer 报告四种状态：**
- **DONE** — 无问题，继续
- **DONE_WITH_CONCERNS** — 有 MEDIUM/LOW 问题，可继续但建议修复
- **NEEDS_CONTEXT** — 缺少上下文，需补充
- **BLOCKED** — 有 CRITICAL/HIGH 问题，必须修复
