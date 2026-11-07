---
name: hld-lld-writing
description: 编写概要设计（HLD）/ 详细设计（LLD）时按需加载。整合原 design-analyzer（设计信息深度提取）+ design-writer（设计章节撰写）两个子 Agent，主 Agent 一气呵成。与 req-doc-writing 区别：设计文档允许且必须包含技术实现细节。
tools: Read, Glob, Grep
color: purple
memory: project
---

# 设计文档编写（hld-lld-writing skill）

> 本 skill 整合原 `design-analyzer`（分析）与 `design-writer`（撰写）两个子 Agent。沈剑判据：分析师-撰写师紧耦合，拆分反损信息传递。
> 适用：编写概要设计 HLD、详细设计 LLD、设计章节生成、反向同步设计文档。
> 调用触发：`DOC_TYPE=hld` / `DOC_TYPE=lld` / 用户说"写设计文档" / "写 HLD" / "写 LLD"。

## 工作流程

### 阶段 1：设计信息深度提取（原 design-analyzer）

读取 `{PROJECT_PATH}/docs/01-需求与规划/*SRS*.md`、`src/prototypes/<slug>/.spec/spec.md`、`src/prototypes/<slug>/` 下代码结构，按 `DOC_TYPE` 分档抽取：

| DOC_TYPE | 抽取深度 |
|---|---|
| `hld`（概要设计） | 系统分层、模块边界、对外接口、数据流总览、关键决策 |
| `lld`（详细设计） | 类/组件职责、函数签名、状态管理、算法、数据结构、错误处理 |

输出**结构化设计摘要**（本会话内使用，不直接进基线）：

| 维度 | hld 抽取 | lld 抽取 |
|---|---|---|
| 模块划分 | 子系统边界 + 数据流 | 组件/函数粒度 + 调用关系 |
| 接口 | 对外 HTTP/RPC 契约 | 函数入参出参 + 错误码 |
| 状态 | 系统级状态机 | 组件/函数级状态 |
| 算法 | 选算法 + 理由 | 伪代码 + 复杂度 |
| 数据模型 | ER 图 | 表结构 + 索引 |

### 阶段 2：设计文档章节撰写（原 design-writer）

按阶段 1 摘要撰写对应章节：
- HLD：`docs/02-架构与设计/*概要设计*.md`
- LLD：`docs/02-架构与设计/*详细设计*.md`
- 章节编号严格按现有结构延续
- 每个技术决策必须引一条**来源**（SRS 第 X 节 / 实现于 `src/.../<file>.tsx:行号`）
- 写完必跑 `npm run typecheck`

## 调用方式

主 Agent 命中触发词时自动加载本 skill，**不派子 Agent**；主 Agent 直接执行阶段 1→2。

## 历史

- 原 `design-analyzer.md` / `design-writer.md`（2026-11-07 合并）存档于 `_archive/agents/`
- 详见 `.agents/rules/req-doc-workflow.md`
