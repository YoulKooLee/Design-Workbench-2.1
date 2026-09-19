# Hook 厂商适配器（薄接线）

策略真源在 `.agents/hooks/*.cjs`，入口为 `.agents/hooks/run.cjs`。本目录（`.agents/adapters/`）只接线，**禁止**把 `skills/` / `agents/` / `knowledge/` 复制进 `.claude/` 或 `.cursor/`。

未复制适配器 ≠ 工作流不可用，走 `.agents/rules/soft-gates.md`。

## 接入

工作目录须为含 `.agents/` 的仓库根。命令一律：

```text
node .agents/hooks/run.cjs <hook-name>
```

| ADE | 复制 | 说明 |
| --- | --- | --- |
| Claude Code | `claude/settings.json` → 项目根 `.claude/settings.json` | matcher 含 `MultiEdit`；派发为 `Agent` |
| Cursor | `cursor/hooks.json` → 项目根 `.cursor/hooks.json` | **无 MultiEdit**；写文件含 `StrReplace`；派发为 `Task` |

Cursor 也可开启第三方 skills 读取 `.claude/settings.json`；本包默认用原生 `.cursor/hooks.json`。

Cline / Roo / Copilot：**不接线 Hook**。Skills 路径、只读子 Agent、角色注册见 [other-ade.md](./other-ade.md) 与 `.agents/rules/ade-compat.md`。Cline 可用 `link-skills.ps1` / `link-skills.sh` 把 `.cline/skills` 联到 `.agents/skills`，禁止拷贝。

## 不要做的事

- 不要把 skills 复制进 `.claude/` 或 `.cursor/`；资源包根目录也不预置这两份接线，由接入方按上表按需复制。
- 不要在 Cursor matcher 里加回 `MultiEdit`。
- 不要把 Hook 与「严格模式」绑死；Hook 仍为可选增强。
- 不要为 Cline/Roo/Copilot 复制整套 skills；不要宣称其硬门禁与 Cursor/Claude 等价。
