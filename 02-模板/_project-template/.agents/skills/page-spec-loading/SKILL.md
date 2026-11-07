---
name: page-spec-loading
description: 生成页面前按需加载。原 page-spec-loader 子 Agent 转型为 skill：检测项目技术栈、加载对应 UI 库参考、规划组件使用，输出"生成前准备清单"。主 Agent 自己执行，不再派子 Agent。
tools: Read, Glob, Grep
color: cyan
memory: project
---

# 页面规格加载（page-spec-loading skill）

> 原 `page-spec-loader` 子 Agent 转型。沈剑判据：加载 UI 库参考 + 检测技术栈属于"信息收集"，不需要独立上下文；合并到主 Agent 更省 token。
> 触发：主 Agent 即将生成新页面 / 用户说"准备做新页面" / 命中 `page-generator` / `prototype-list` 等前置依赖。

## 工作流程

### 1. 技术栈检测

```
读取 {PROJECT_PATH}/package.json
  ├── dependencies 含 react → React 项目 → UI 库候选 = shadcn / antd / mantine
  ├── dependencies 含 vue   → Vue 项目   → UI 库候选 = element-plus / naive-ui / vuetify
  └── 两者都不含 → 询问用户
```

### 2. UI 库参考加载（仅加载一套）

按 `package.json` 已安装的 UI 库，**只读一套**：
- React 项目：`.agents/knowledge/ui-libs/shadcn/`（或 antd/mantine，按实际）
- Vue 项目：`.agents/knowledge/ui-libs/element-plus/`（或 naive/vuetify，按实际）

**禁止**整目录读 ui-libs（实测约 50KB，单会话爆窗）；只读当前页面类型相关的子目录（如表单类页面只读 `forms/`）。

### 3. 组件规划

输出**生成前准备清单**（本会话内使用）：

| 项 | 内容 |
|---|---|
| 页面类型 | 列表 / 表单 / 详情 / 看板 / 仪表盘 / 自定义 |
| 推荐组件 | 从 UI 库选 3-5 个核心组件（Table / Form / Modal / Charts 等） |
| 业务组件 | 查 `src/component-templates/` 有无现成业务组件（按 `.agents/component-manifest.json` 反查） |
| 数据源 | 该页面依赖的 mock/API 路径 |
| 路由 | 注册位置（`src/prototypes/<slug>/index.tsx` 的 `defineHashPageRoute`） |

### 4. 与下游 skill 衔接

- 准备清单 → 传给 `page-generator`（生成）或 `prototype-annotation`（标注）
- 不要重复做生成工作，本 skill 只到"规划"为止

## 历史

- 原 `page-spec-loader.md`（2026-11-07 转型）存档于 `_archive/agents/`
