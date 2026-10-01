# 其它 ADE（Cline / Roo / Copilot）

策略与技能真源在 `.agents/`。本页只说明 **路径映射与只读限制**，不接线 Hook（Cline/Roo/Copilot 硬门禁不统一，本包不承诺同构）。

完整规则：`.agents/rules/ade-compat.md`。

## 先看能不能原生读 `.agents/skills`

| ADE | 建议 |
| --- | --- |
| **Roo** | 直接用仓库根 `AGENTS.md` + `.agents/skills/`。不要复制到 `.roo/skills/`。 |
| **GitHub Copilot** | 项目级可认 `.agents/skills/`。不要再复制到 `.github/skills/`。自定义 agent 若要用 `.github/agents/*.agent.md`，只写薄包装指向 `.agents/agents/{role}.md`。 |
| **Cline** | 默认读 `.cline/skills/`。在仓库根执行联接脚本，让 `.cline/skills` 指向 `.agents/skills`： |

Windows（PowerShell，管理员非必须；Junction）：

```powershell
./.agents/adapters/link-skills.ps1
```

Git Bash / macOS / Linux：

```bash
sh .agents/adapters/link-skills.sh
```

不要把 `.agents/skills` 拷进 `.cline/skills`。Cline 仍可能读工作区 `AGENTS.md`；联接只为 Skills 面板/自动发现。

## 只读子 Agent

独立派发若是只读：analyzer / 文本型 writer 仍可派发，主会话落盘。`page-reviewer` / `code-reviewer` 需要跑命令时改为主会话扮演。详见 `ade-compat.md`。

## 不要做的事

- 不要为 Cline/Roo/Copilot 复制整套 skills 或 agents
- 不要宣称这些 IDE 已具备与 Cursor/Claude 等价的 Stop 硬拦
- 未联接 / 未注册时走 `soft-gates.md` + 主会话扮演，工作流仍可用
