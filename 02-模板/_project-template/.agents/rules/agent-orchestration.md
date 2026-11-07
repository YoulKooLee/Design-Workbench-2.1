# Agent 编排（3+3 精简版 · 2026-11-08）

## 自动调用规则（无需用户提示）

<EXTREMELY-IMPORTANT>
以下 agent 调用是强制的。不存在这次不需要的例外。
跳过 = 违反项目规则。
</EXTREMELY-IMPORTANT>

### 必须调用的 Agent（3 个审查者）

| 触发条件 | Agent | 时机 |
|---------|-------|------|
| 写完 HLD/LLD 章节后 | **design-reviewer** | `hld-lld-writing` skill 写完每章后 |
| 写完页面设计说明卡片后 | **design-note-reviewer** | 原型工作流每张页面设计说明写完后 |
| `page-generator` 步骤 6 | **page-reviewer** | 生成页面代码后 |

### 子 Agent 规则

1. 子 Agent 不继承主流程上下文
2. spawn 时必须在 prompt 开头注入知识库调用指令（见 spawn-subagent.md）
3. 子 Agent 不触发技能流程
4. 子 Agent 不派发更多子 Agent
5. 子 Agent 报告四状态：DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED

### 审查者报告标准

**发现问题后的处理：**
1. CRITICAL / HIGH → 必须修复
2. MEDIUM → 修复成本低就修
3. LOW → 记录但不一定修复
4. 修复后不需要再次 review（除非修复引入 >30 行新代码）
5. 如果不同意建议 → 说明理由，不盲目执行

**报告四种状态：**
- **DONE** — 无问题，继续
- **DONE_WITH_CONCERNS** — 有 MEDIUM/LOW 问题，可继续但建议修复
- **NEEDS_CONTEXT** — 缺少上下文，需补充
- **BLOCKED** — 有 CRITICAL/HIGH 问题，必须修复

## 子 Agent 不可用时的自审兜底

当宿主不支持 `.agents/agents/` 定义（部分宿主只认自己的路径）时，不强行调用审查者，按以下清单自行审查：

1. 构建 / type-check 通过，且有输出为证（不主观判断）
2. 无 `console.log` 残留、无裸写 `fetch`
3. 新增页面已同步注册路由
4. 认证 / 权限 / 加密相关改动逐条自查
5. 设计说明卡片按 `src/common/design-notes/规范.md` Part C §8.1 自查
6. 改动点由自己精确重读一遍（**不派子 Agent 审查**——实测会返回截断）
