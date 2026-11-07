---
name: req-doc-writing
description: 编写 PRD / SRS 需求规格说明书时按需加载。整合原 req-analyzer（项目上下文深度提取）+ req-writer（PRD/SRS 规范章节撰写）两个子 Agent 的能力，主 Agent 自己一气呵成，消除分析师-撰写师两段传递的信息损耗。
tools: Read, Glob, Grep
color: blue
memory: project
---

# 需求文档编写（req-doc-writing skill）

> 本 skill 整合原 `req-analyzer`（分析）与 `req-writer`（撰写）两个子 Agent。沈剑判据：分析师-撰写师两角色紧耦合、拆开后反而增加传递损耗；主 Agent 上下文内一气呵成更稳。
> 适用：编写 PRD、SRS（需求规格说明书）、需求章节生成、SRS 反向同步。

## 工作流程（两阶段合一）

### 阶段 1：上下文深度提取（原 req-analyzer 职责）

读取 `{PROJECT_PATH}/docs/` 下所有相关文档（概念版 / PRD / 已有 SRS / HLD），以及 `src/prototypes/<slug>/` 下已实现页面的入口与字段，输出**结构化功能摘要**（不进基线，本会话内使用）：

| 维度 | 抽取 |
|---|---|
| 角色 / 权限 | 文档中的角色表 + 代码里的 RBAC 标记 |
| 功能清单 | PRD 功能表 + 已实现页面的 `defineHashPageRoute` 注册列表 |
| 数据实体 | docs 中数据模型 + 代码中 TS 类型定义 |
| 状态机 | 文档描述的状态 + 代码中 `useState`/状态字段 |
| 接口契约 | 文档 API 列表 + 代码中 mock/调用点 |

### 阶段 2：PRD/SRS 章节撰写（原 req-writer 职责）

按阶段 1 摘要撰写章节：
- **功能详细设计**（SRS 第 3 章）：每个功能项含 入口/前置/操作/后置/异常 五要素
- **非功能需求**（SRS 第 4 章）：性能、安全、可用性按文档模板
- **反向同步**：当代码已实现某功能但 SRS 未登记 → 按 `req-doc-workflow.md` Step F 触发，**必须**用户确认后才写入基线

## 调用方式

主 Agent 命中"写 PRD / 写 SRS / 补 SRS / 反向同步"等触发词时，本 skill 自动加载；不要派子 Agent，主 Agent 直接按阶段 1→2 执行。

## 产出规范

- 章节编号严格按 `docs/01-需求与规划/*SRS*.md` 现有结构延续，不新建顶级章节
- 每个功能项必须引一条**来源**（PRD 第 X 节 / 已实现于 `src/.../<page>.tsx`），禁止凭空生造
- 写完必跑 `npm run typecheck` 与 `node .agents/scripts/build-knowledge-catalog.mjs`（若新增知识引用）

## 历史与依据

- 原 `req-analyzer.md` / `req-writer.md`（2026-11-07 合并）存档于 `_archive/agents/`
- 沈剑判据：子 Agent 拆分三信号（上下文装不下 / 职责说不清 / 失败会传染）均不满足，合并
- 详见 `02-模板/_project-template/.agents/rules/req-doc-workflow.md`（文档路由真源）
