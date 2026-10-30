# 上下文预算（最高铁律）

> 位置：`.agents/rules/context-budget.md` ｜ 读取层：按需 Read
> 适用：`_project-development`（研发工程包）。预算分层与装配公式见 `context-assembly.md`，本文件只管**禁读清单 + 越界自检**。
> 名单真源：`.agents/hooks/context-budget.cjs` 的 `HIGH_RISK_PATTERNS`——**改声明必须同步改名单**（历史事故见 `delivery-and-hooks.md` §2.4）。

**禁止**：遍历 / 批量 Read（含通配符、递归）：`.agents/skills/`、`.agents/knowledge/`、`.agents/rules/`、`03-组件库/`（母版 catalog）、`vendor/`、`node_modules/`。

**体量实测基线**（2026-10-30 复测，改动后须重测）：本文件 **2.9 KB**；`.agents/skills/` **1.36 MB / 93 文件**（`SKILL.md` 合计 176 KB）；`.agents/knowledge/` **239 KB / 50 文件**，其中 `conventions/` 85 KB、`ui-libs/` 64 KB（5 目录）、`diagram/` 26 KB、`phase1-requirements/` 25 KB。

> 注：`AGENTS.md` §四 里的技能目录体量必须与本行同源；不一致时以本文件实测值为准，并同步另一处。

**技能匹配**：只用 `.agents/skills/INDEX.md`（会话开始主动 Read，见 `AGENTS.md` §四；宿主未接线时 `session-start` 不注入）；命中后仅加载那一个技能的 `SKILL.md`。INDEX 缺失或过期跑 `node .agents/scripts/build-skills-index.mjs`。

**知识库匹配**：只用 `.agents/knowledge/catalog.json`（49 条，增删知识文件后跑 `node .agents/scripts/build-knowledge-catalog.mjs` 重建）；命中后按精确路径读单个 `.md`。**手写 catalog 会与磁盘脱节**（本包曾漏登记 18 个，含「写页面必读」的 `conventions/react-to-vue`）。

**自检**：目标命中上述目录时，先估单次调用是否 >2 万 token，会则改精确路径读单文件。

**安全替代**：

* UI 库 → 只读 `knowledge/ui-libs/README.md` 判断该加载哪一套，再精确读那套的 `components.md` / `pages.md` / `charts.md`；**严禁递归 `ui-libs/` 全部 5 套**（本工程只用 `element-plus`，另 4 套是多栈支持用）
* 组件 → 以项目内 `src/components/`、`src/views/` 为真源精确读；`03-组件库` 是母版 catalog，只反查单个组件，**严禁整目录 Read**
* 原型参照 → `_project-template` 迁来的 React 原型**只作视觉与交互参照**，禁止 import / 拷贝其代码、样式、常量、图标名（转换规范：`knowledge/conventions/react-to-vue.md`）

> ⚠️ **当前只有提示、没有强制**：`.agents/hooks/context-budget.cjs` 在 preToolUse 命中上述目录时返回 `additionalContext` 提醒，**不含 deny / exit(2) 出口，不会阻止这次读取**；且 hook 是否执行取决于宿主接线（2026-10-30 已补 `.codebuddy` 薄接线，但生效性需新会话验证，见 `delivery-and-hooks.md` §2.3）。所以真正的闸门是**你自己动手前过一遍本节禁令**，hook 只是第二道提醒；无 hook 时按 `soft-gates.md` 执行，并在 `project-memory.md` 记一行「本次会话无 hook 保护」。
