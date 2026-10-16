# 资源指南

`src/resources/` 是**原型工程的资料层**：项目资料、画布、图表、图片、数据样例、业务附件，以及产品规划文件（`src/resources/prd/`）——它们可作为资源在 Make 里打开（`?doc=<path>`）、嵌入画布或原型。

> ⚠️ **文档一律走 `docs/`，本指南只管辖资源层**。`src/` 只放原型（`src/prototypes/`、`src/themes/` 及其运行所需），**不放文档**。
>
> | 内容 | 落点 |
> |---|---|
> | PRD / 概念版、SRS、功能清单、设计方案、可研、调研/会议纪要/报告 | **`docs/`**（SRS 等在 `docs/01-需求与规划/`，HLD/LLD 在 `docs/02-架构与设计/`，PRD 在 `docs/` 根） |
> | 画布、图片、图表、数据样例、业务附件 | **`src/resources/`**（本指南管辖） |
> | SRS / PRD / 概要设计 / 详细设计 的 **markdown 副本**（供 Make 预览） | **`src/resources/`**（真源仍在 `docs/`；用 `npm run docs:sync` 同步） |
>
> **副本机制**：Make 只识别 **markdown**，docx / pdf 等格式预览不出来。所以把 `docs/` 里 **PRD / SRS / 概要设计 HLD / 详细设计 LLD** 四类 `.md` **各复制一份**到 `src/resources/`（平铺、同名），供管理端打开。
> ⚠️ **`docs/` 是唯一真源，`src/resources/` 只是副本**——改文档只改 `docs/`，然后跑 `npm run docs:sync`（`npm run build` 已自动前置）。副本过期会被 `node scripts/sync-docs-to-resources.mjs --check` 检出。
>
> 技能按 `docs/` 的路径 Glob 扫描文档；放错位置等于没写。

常见内容包括：

- 文档：Markdown、HTML 文档，如需求说明、页面说明、调研记录、会议纪要
- 图表：Draw.io 可编辑图表，如 `.drawio`、`.drawio.svg`
- 数据样例：JSON、CSV、TSV、YAML、TXT、表格导出文件
- 设计或业务附件：图片、PDF、Office 文档、压缩包等

## HTML 资源能力

创建或修改 `src/resources/**/*.html` 前，必须阅读 [Make HTML 资源 Agent 能力协议](./html-agent-capabilities.md)。该分文档只声明普通 HTML 可使用的 Make 宿主能力、接入标记和文件边界，不规定评审清单或具体业务场景。

原型评审、计划评审、指定方案评审等场景如果有额外要求，应使用独立的场景文档；不得把场景规则反向写成所有 HTML 都必须遵守的通用协议。

## 目录边界

- `src/resources/` 存放长期项目资料、画布、图表、数据样例和业务附件（**不含** PRD / SRS / HLD / LLD 等需求与研发文档——那些走 `docs/`）。
- 项目固定文档模板位于根目录 `templates/`，通过项目设置预览和编辑；缺失时可恢复默认模板。
- 画布是普通资源文件，保存为 `src/resources/**/*.excalidraw`；画布内图片、截图和 AI 生成图统一保存到 `src/resources/.assets/<资源相对路径>/`，例如 `src/resources/.assets/flows/order.excalidraw/`。
- 原型页面专属素材放在对应原型目录内，例如 `src/prototypes/<name>/assets/`。
- 主题素材放在对应主题目录内，例如 `src/themes/<theme-key>/assets/`。

设计图、流程图、图表、参考图等 AI 产物默认保存到 `src/resources/`，需要时再作为资源嵌入画布或原型。

## 资源链接

资源通常保留两种链接：

- 只读链接：用于预览、嵌入、下载或外部读取。
- 编辑链接：Make 管理端地址，用于打开资源详情页，带顶部工具栏和系统编辑能力。

本节示例是资源路由格式，可用于文档、metadata 或运行时字段。回复用户时，如果要作为可点击链接使用，必须先按当前 Make 管理端或 runtime origin 补齐完整 URL；无法确认 origin 时，只能标为“资源路径/预览路径”。

编辑链接统一使用 Make 管理端 deep link：

```text
/?projectId=<projectId>&doc=<resource-path>
```

其中 `resource-path` 是相对 `src/resources/` 的路径，例如 `documents/prd.md`、`flows/app.excalidraw` 或 `flows/order-status.drawio`。

除 Markdown 外，所有资源的只读链接统一使用文档资源文件地址：

```text
/api/docs/<encoded-resource-path>?projectId=<projectId>
```

Markdown 文档 `.md` 的只读预览使用文档预览页：

```text
/spec-template.html?url=<encoded-doc-api-url>
```

其中 `doc-api-url` 通常是 `/api/docs/<encoded-resource-path>?projectId=<projectId>`。
