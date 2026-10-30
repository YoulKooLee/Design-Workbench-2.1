# `.claude/skills/` 是生成物，不是真源

> ⚠️ **禁止手改本目录任何文件**。真源在 `.agents/skills/`，本目录是给 Claude Code 宿主用的副本。
> 手改会在下次同步时被覆盖；改了真源却忘了同步，则 Claude Code 会按旧技能执行且**不报错**。

## 现状（2026-10-30 实测）

| 项 | 值 |
|-|-|
| 真源 `.agents/skills/` | 53 技能 |
| 副本 `.claude/skills/` | 13 技能 / 72 文件 / 365 KB |
| 当前一致性 | 72/72 MD5 一致（历史上靠手工复制维持，无机制） |

副本只收录了 13 个技能，**不是真源的完整镜像**：`annotation`、`frontend-design`、`page-generator`、`pm-*`（13 个）、`req-doc`、`write-prd` 之外的 40 个技能未复制给 Claude Code。同步脚本**不会自动新增**未收录技能——避免擅自扩大 Claude 可见技能面。

## 同步

```text
node .agents/scripts/sync-claude-skills.mjs          # 只检查，报告漂移（默认）
node .agents/scripts/sync-claude-skills.mjs --write  # 真源 → 副本单向同步
```

- **单向**：只会把 `.agents/skills/` 的内容写进 `.claude/skills/`，永不反向写回。
- **不自动删孤儿**：真源已删、副本仍残留的文件只报告为 `[ORPHN]`，需人工确认——删除属破坏性操作，不由脚本代办。
- check 模式发现不一致时 `exit=2`，可直接接进 CI / `build-all.js`。

## 什么时候必须跑

1. 改了 `.agents/skills/<已收录的 13 个之一>/` 下任何文件后
2. `check-doc-links.mjs` 报副本漂移时
3. 打包分发前（`templates/PACKAGING.md`）

## 更干净的替代方案（未采用，原因记录在此）

`_project-development` 侧的做法是 **Junction 联接**（`.agents/adapters/link-skills.ps1`），根本不存在副本、也就不会漂移，且其 `adapters/README.md` 明确写着「**禁止**把 skills 复制进 `.claude/`」。

本包没改成 Junction，理由：

1. `.claude/skills/` 现有 72 个文件是**实体副本**，改成 Junction 必须先删掉整个目录——属破坏性操作，需用户单独确认，不由本次修复代办；
2. 副本只含 13/53 个技能，是**有意的收窄**（不是遗漏）。直接联接到 `.agents/skills/` 会让 Claude Code 看到全部 53 个技能，**改变技能可见面**，属行为变更而非等价重构；
3. 本包 `.claude/` 下**没有 `settings.json`**，即 hook 对 Claude Code 本就没接线，技能副本是否值得保留接线，应先与用户确认取向。

若要切到 Junction 方案，正确顺序：确认技能可见面可以扩到 53 个 → 备份并删除 `.claude/skills/` → 复制 `_project-development/.agents/adapters/` 到本包 → 跑 `link-skills.ps1` → 补 `.claude/settings.json`（从 `.agents/adapters/claude/settings.json` 复制）。
