# 其它 ADE 兼容（P3）

> 真源仍在 `.agents/`。禁止把 skills / agents / knowledge 复制成多套 IDE 副本。不追求各 IDE 硬门禁同构。Hook 接线见 `.agents/adapters/README.md`。

本文件管 **Cline / Roo / Copilot 等** 的路径映射、只读子 Agent、角色注册。怎么跑见 `agent-runtime.md`；调度话术见 `role-dispatch.md`。

## 产品承诺（分级）

| 能力 | 本包承诺 |
| --- | --- |
| 读 `AGENTS.md` + `.agents/skills` / `agents` / `rules` | 主链路可跑（L0+L1） |
| 无 Hook / 无独立派发 | 软门禁 + 主会话扮演（P1） |
| Claude / Cursor Hook | 薄接线可硬拦（P2） |
| Cline / Roo / Copilot 硬门禁 | **不承诺**；能映射 Skills 则映射，不能则走软门禁 |
| Stop 强制续写 | 仅增强环境；Copilot 等默认没有 |

## Skills 路径（不要复制目录）

真源：`.agents/skills/{name}/SKILL.md`。

| ADE | 是否原生读真源 | 若不能原生读取 |
| --- | --- | --- |
| Cursor / Claude Code | 以本包 `AGENTS.md` 约定加载 | 不用映射 |
| Roo | 是（项目 `.agents/skills/` 为跨工具路径） | 不用复制 |
| GitHub Copilot | 是（文档列出项目 `.agents/skills/`） | 不用复制 |
| Cline | 默认读 `.cline/skills/`（及 `.clinerules/skills/`），**不**把 `.agents/skills/` 当作第一路径 | 用目录联接/符号链接，禁止拷贝。脚本：`.agents/adapters/link-skills.ps1`（Windows）或 `link-skills.sh` |

映射原则：链接必须指向仓库内 `.agents/skills`；更新技能只改真源。断开链接后仍可靠 `AGENTS.md` 让模型 Read 技能文件。

## 只读子 Agent

Cline / Roo 的调研类子任务、Ask 模式、部分 Copilot 自定义 agent 常为**只读**。

本包角色默认「产出文本，主会话落盘」，因此只读派发通常可用。例外：

| 角色 | 只读派发 |
| --- | --- |
| analyzer / writer / 多数 reviewer、`diagram-drawer`、`page-spec-loader`、`planner` | 可以：只回收文本，由主会话 Write/Edit |
| `page-reviewer`、`code-reviewer` | 定义含 Bash/验证。若派发只读且无法跑命令 → **主会话扮演**，审查范围仍看 `DELIVERY_MODE` |

禁止：

- 让只读子任务执行 Write / Edit / 改配置
- 把「子任务只读」理解成可以跳过该角色
- 因只读而把快速模式升为全量审查

执行细则见 `role-dispatch.md`「只读独立派发」。

## 自定义角色注册（若产品支持）

角色定义真源：`.agents/agents/{role}.md`。各家 Subagent 产品格式不同，**默认不注册、不生成 N 份包装文件**。

若某 ADE 要求把角色放到它自己的目录才能独立派发：

1. 优先：派发无名通用子任务，prompt 要求先 Read `.agents/agents/{role}.md`（与 P0 话术一致）。
2. 次选：写一份 **≤20 行** 的薄包装（只含「去读真源 + 四状态」），禁止把角色正文拷进去。
3. Copilot 若用 `.github/agents/*.agent.md`：包装文件只引用 `.agents/agents/{role}.md`，不要同步 18 份全文。
4. Cline 的 `.cline/agents/`：同样只做薄包装或联接；格式不兼容时放弃注册，改为主会话扮演。

未注册 ≠ 角色可不跑。

## 明确不做

- 不维护 `.cline/`、`.roo/`、`.github/skills/` 下的技能全文副本
- 不为 Copilot 承诺 Stop / PreToolUse 硬拦
- 不把 P3 与「严格模式」绑死
