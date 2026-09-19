# 角色调度模板

> 本文件为技能内调度角色的**唯一标准话术**。运行时降级见 `agent-runtime.md`。独立派发时的强制前置注入见 `spawn-subagent.md`。

禁止在技能或角色定义中写死厂商工具名（含把某一 IDE 写成运行前提）。

## 标准话术

技能调用点一律使用（仅替换 `{role_name}` 与输入）：

```text
【角色】{role_name}
【定义】.agents/agents/{role_name}.md
【交付模式】{DELIVERY_MODE}
【执行】
  - 若当前环境支持独立子 Agent（独立上下文派发）：派发后只回收结果；
  - 否则：主会话按该定义逐步执行（运行时降级）。
  - 不得因环境能力不足而偏离 DELIVERY_MODE 规定的审查范围。
【输入 / Prompt】
交付模式：{DELIVERY_MODE}
{原 prompt 正文}
【输出】四状态：DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED
（若 DELIVERY_MODE 规定本步跳过该审查角色，则整步跳过，不扮演、不派发。）
```

若环境仅提供无名通用子任务，仍须先 Read 角色定义再执行，不得跳过定义文件。

### 只读独立派发

若当前环境能派发但子任务为只读（Cline/Roo 调研类、Ask 模式等）：

1. 只产出文本的角色仍可派发，主会话回收后再 Write/Edit。
2. 角色定义需要 Bash 或写文件（如 `page-reviewer`、`code-reviewer`）且派发无法跑命令：改为主会话扮演，审查范围仍看 `DELIVERY_MODE`。
3. 不得让只读子任务改文件；不得把只读理解成跳过该角色。

路径映射与承诺边界见 `.agents/rules/ade-compat.md`。

## 执行细则

### 独立上下文派发

1. 角色执行 prompt 开头注入 `spawn-subagent.md` 的强制前置步骤，并声明只执行分配任务、不触发技能。
2. 只回收结果与四状态；被调度角色不得再调度其他角色。
3. 独立派发不继承主会话上下文，所需文件路径与约束必须写进 prompt。

### 主会话扮演

1. 先 Read `.agents/agents/{role_name}.md`，按该定义逐步执行。
2. 扮演期间适用 `subagent-stop.md`：不触发其他技能、不串戏、不再调度其他角色。
3. 扮演段结束后回到技能主流程，技能触发恢复生效。
4. 扮演时共享主会话上下文，但仍须输出四状态。

### 共通

- 角色执行 prompt **首行**传入 `交付模式：{DELIVERY_MODE}`。
- 输出四状态：`DONE` / `DONE_WITH_CONCERNS` / `NEEDS_CONTEXT` / `BLOCKED`。
- 无独立派发时，原并行组改为串行扮演，审查范围不变。
