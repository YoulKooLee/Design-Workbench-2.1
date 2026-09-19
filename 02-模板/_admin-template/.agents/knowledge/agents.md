---
updated: 2026-08-18
version: 1.2
scope: global
description: 角色调度架构说明，各技能内部角色与调度关系（派发或扮演）
---
# 角色调度架构

各技能内部通过角色调度协作完成复杂任务；无独立子 Agent 时主会话按定义扮演。主流程不干预内部调度。调度方式见 `.agents/rules/role-dispatch.md`。

## srs-writer 技能

```
req-analyzer    → 从设计文档/代码提取功能摘要
req-writer      → 将摘要转化为 PRD 语言的章节内容
req-reviewer    → 四维度审查（语言规范/章节结构/三要素/提示文案）
```

## feasibility-report 技能

```
feasibility-analyzer  → 分析项目文档，输出结构化摘要
feasibility-writer    → 撰写可研报告章节
feasibility-reviewer  → 审查报告质量
```

## feature-dev 技能

```
page-spec-loader  → 检测技术栈，加载组件库规范
page-reviewer     → 验收（标准/严格：四维度；**快速：仅需求完整性**）
code-reviewer     → 质量+安全（**快速：仅 P0 安全**；与 page-reviewer 并行）
```

## annotation 技能

```
annotation-prd-analyzer       → 读取需求文档，生成标注清单
annotation-code-locator       → 读取页面代码，定位 DOM 节点，输出注入清单
```

## 角色定义文件位置

`.agents/agents/` 目录下，每个角色一个 `.md` 文件，包含角色定义、工具权限、输出格式。
