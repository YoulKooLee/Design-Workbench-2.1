# 交付模式与 Hook 接线细则

> 位置：`.agents/rules/delivery-and-hooks.md` ｜ 读取层：按需（用户声明模式、或要接 Hook 时 Read）
> 来源：自 `AGENTS.md` v1.7「交付模式」「知识库与 Hook 门禁」外迁（v2.0 瘦身，2026-09-29）

---

## 一、交付模式（三档审查强度）

用户可在首句声明 **快速 / 标准 / 严格**，覆盖分技能默认。**未声明时按下表取值，不是全局统一默认。**

### 1.1 分技能默认

| 技能 | 默认 | 理由 |
| --- | --- | --- |
| `srs-writer` | **标准** | 研发真源，不宜默认跳过 req-reviewer |
| `hld-design` / `lld-design` | **标准** | 基线文档，返工代价高 |
| `feature-dev` | **快速** | 批量出页优先速度，步骤 6 降级 |
| `delivery-plan` | **标准** | 全流程编排，向下游传递 `DELIVERY_MODE` |

### 1.2 三档强度

| 模式 | 触发词示例 | SRS（srs-writer） | 代码（feature-dev） |
| --- | --- | --- | --- |
| **快速** | 快速模式、先出稿、跳过审查 | 仅结构检查 + grep，不跑 reviewer | 步骤 6 降级：page-reviewer **仅维2**；code-reviewer **仅 P0 安全**；维1/3/4 跳过 |
| **标准** | 标准模式 | A6 抽检 reviewer；P0 自动修，P1 问一次 | 步骤 6 **全量双审查** |
| **严格** | 严格模式、正式交付、完整审查 | 全量 req-reviewer；修复前确认 | 全量 + 可按需加审 |

### 1.3 模式规则

- **自动升档**：用户消息含「正式交付、验收、上线、提测、完整审查、严格模式」→ **整任务升为严格**，直至用户另声明模式。
- **模式冲突**：同一任务只认 **用户最新一句** 声明；优先级 **自动升档 > 用户显式声明 > 分技能默认**。
- **快速模式批量收口**：批量全部功能完成（或单次任务宣称完成）时，须运行 `npm run build` 或项目等效 `type-check`；步骤 6 跳过的 type-check/lint 在此补做。
- **记录与传递**：各技能须在步骤 1（或等效门禁）记录 `DELIVERY_MODE`；角色执行 prompt 首行传入 `交付模式：{DELIVERY_MODE}`。
- **正交性**：审查降档（本表三档）与运行时降级（无独立派发 / 无 Hook 时换执行方式，见 `agent-runtime.md`）**互不影响**。

---

## 二、Hook 门禁接线

规范通过两层机制落地：

1. **按需读取** — 执行任务前 Read `.agents/knowledge/` 或 `.agents/rules/` 下对应文件
2. **Hook 门禁**（可选）— 接线后由 IDE 在写文件 / 派发 / 结束时硬拦

**未接线 ≠ 工作流不可用**，此时执行 `.agents/rules/soft-gates.md` 软门禁。Hook 不与「严格模式」绑死。

### 2.1 接线步骤

IDE **不会**自动读 `.agents/settings.json`，须把薄接线复制到它认识的路径（**不要拷贝** `skills/` / `agents/` / `knowledge/`）：

| ADE | 复制（仓库根、含 `.agents/`） |
| --- | --- |
| Cursor | `.agents/adapters/cursor/hooks.json` → `.cursor/hooks.json` |
| Claude Code | `.agents/adapters/claude/settings.json` → `.claude/settings.json` |

复制后**新开对话**。命令一律 `node .agents/hooks/run.cjs <hook-name>`。详细步骤与禁忌见 `.agents/adapters/README.md`；Cline / Roo / Copilot **不接线 Hook**，见 `.agents/rules/ade-compat.md`。

### 2.2 Hook 清单（8 个）

| Hook | 事件 | 作用 |
| --- | --- | --- |
| `session-start` | SessionStart | 注入强制执行清单 + 技能索引 `INDEX.md` |
| `context-budget` | PreToolUse（Read\|Glob\|Grep） | 拦截命中高危目录（skills / knowledge / rules / vendor / `03-组件库`）的递归·通配读取 |
| `gateguard` | PreToolUse（Edit\|Write） | 编辑文件前须先 Read，避免盲改 |
| `config-protection` | PreToolUse（Edit\|Write） | 阻止修改 eslint、tsconfig 等配置来消除报错 |
| `review-reminder` | PostToolUse | 代码改动后提醒调度 code-reviewer |
| `review-tracker` | PostToolUse | 记录本次会话是否已执行 code-reviewer |
| `stop-quality-gate` | Stop | 回复结束前检查 console.log 残留与审查合规 |
| `pre-compact` | PreCompact | 上下文压缩前保存状态（配合 `compaction-recovery.md`） |

### 2.3 已知失效场景（必读）

> ⚠️ **宿主决定 Hook 是否生效，不要假设护栏在跑。**

2026-09-22 实测（MarkDesk 项目，证据 `09-协作/agents/workbuddy/上下文实测-证据/T-2-*`）：

- **WorkBuddy 宿主不加载项目内 `.agents/hooks/`** → 8 个 hook 全不执行；
- 连锁后果：`session-start` 不注入 `INDEX.md` → **技能路由入口整个断掉**（执行者不知有哪些技能，凭通用能力直接写，出现"未走 prd-writer 技能路由"的真实偏差）；
- 因此该宿主下 AGENTS.md 里所有"技术强制"表述**实际退化为纯文字约束**。

**接线后必须验证一次最小触发**（例如故意 Glob 一次 `skills/` 整目录，看是否被拦）。未生效时按 `soft-gates.md` 执行，并在 `project-memory.md` 记一行「本次会话无 hook 保护」。

### 2.4 历史坑（改动 hook 相关配置时必读）

| 坑 | 教训 |
| --- | --- |
| 双配置分裂 | 曾同时存在 `hooks.json` 与 `settings.json` 且内容不一致 → 读错一份即静默失效。**现已合一，`settings.json` 为唯一真源，不要再建 `hooks.json`** |
| 拦截名单与声明不符 | `context-budget.cjs` 的名单曾漏 3 处（根级 `rules/`、`03-组件库` 父目录、`component-templates`），导致 AGENTS.md 声明的禁区实际裸奔。**改声明必须同步改名单** |
| BOM 导致静默不拦 | hook 的 io 库遇 UTF-8 BOM 会静默失效。`.agents` 下配置文件**一律无 BOM** |
| 注册未接线 | hook 脚本存在、配置也注册了，但分发器 `run.cjs` 白名单缺该项 → 永不执行。**新增 hook 要三处同步：脚本 + settings.json + run.cjs 白名单** |
