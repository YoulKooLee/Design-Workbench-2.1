# 上下文预算（最高铁律）

> 位置：`.agents/rules/context-budget.md` ｜ 读取层：按需 Read
> 来源：自 `AGENTS.md` v09（2026-09-19）该章节原文外移。**2026-10-30/31 已改写**：体量按实测更正、末行「技术强制」改为诚实表述、接线指向修正为本包 `knowledge-and-hooks.md`。

**被禁目录的实测体量**（改动后须重测）：`.agents/skills/` **2.4 MB / 273 文件**（其中 `SKILL.md` 合计 446 KB）；`.agents/knowledge/` 200 KB / 48 文件；根级 `rules/` 0.43 MB / 47 文件。推导与事故见 rationale §一。

> 注：本文件是上述体量的**唯一实测真源**。`AGENTS.md` §四 已写「严禁遍历技能目录」不带数字，避免两处数字打架；要引用体量一律引本行。

**禁止**：遍历 / 批量 Read（含通配符、递归）：`.agents/skills/`、`.agents/knowledge/`、`.agents/rules/`、根级 `rules/`、`src/themes/`、`03-组件库/**/vendor/`。

**技能匹配**：只用 session-start hook 注入的 `.agents/skills/INDEX.md`（2026-10-30 已恢复全文注入；hook 未生效时须自己主动 Read）；命中后仅加载那一个技能。

**自检**：目标命中上述目录时，先估单次调用是否 >2 万 token，会则改精确路径读单文件。

**安全替代**：

* `src/themes/` → 只读 `theme.json` 的 name 字段或列一级目录名，严禁递归
* 组件 → 用 `.agents/component-manifest.json`（若工程内有） 反查单组件，严禁整目录 Read `03-组件库`

> ⚠️ **当前只有提示、没有强制**：`.agents/hooks/context-budget.cjs` 在 preToolUse 命中上述目录时返回 `additionalContext` 提醒，**不含 deny / exit(2) 出口，不会阻止这次读取**；且 hook 是否执行取决于宿主接线（2026-10-30 已补 `.codebuddy/` 薄接线，但生效性需新会话验证，见 `.agents/rules/knowledge-and-hooks.md`）。所以真正的闸门是**你自己动手前过一遍本节禁令**，hook 只是第二道提醒。若要把某项升级为真阻断，须显式改 hook 加 deny 出口，并把本段同步改掉——别再写「技术强制」。
