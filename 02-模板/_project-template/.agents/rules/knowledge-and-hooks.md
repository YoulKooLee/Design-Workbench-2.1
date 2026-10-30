# 知识库与 Hook 门禁

> 位置：`.agents/rules/knowledge-and-hooks.md` ｜ 读取层：按需 Read
> 来源：自 `AGENTS.md` v09（2026-09-19）该章节原文外移。**2026-10-30 已改写**：Hook 表标注真实强制力、catalog 维护改为跑脚本、补软门禁兜底，故不再是「原文」。

规范通过两层机制落地：

1. **按需读取** — 执行任务前，Read `.agents/knowledge/` 或 `.agents/rules/` 下的对应文件
2. **Hook 门禁**（可选）— 把 `.agents/settings.json`（Hook 配置**唯一真源**，不要再建 `hooks.json`）接入 IDE 后自动生效

> ⚠️ **宿主决定 Hook 是否生效，不要假设护栏在跑**：2026-09-22 实测 WorkBuddy 未接线时 8 个 hook 全不执行（`session-start` 不注入 INDEX → 技能路由入口整个断掉）。2026-10-30 已给两模板与 7 个项目补 `.codebuddy/settings.local.json` 薄接线（`wire-hooks.mjs`，绝对路径 + `startup|resume`），但**接线 ≠ 已生效**：宿主是否真的读它并 spawn hook，需新开一次会话、在日志见到 `HookExecutor spawn run.cjs` 才算证实；证实前一律按下述兜底执行。**生效未证实前按下表「无 Hook 兜底」执行**，并在 `project-memory.md`「运行态留痕」记一行「本次会话无 hook 保护」。

8 个 Hook 均在 `.agents/hooks/`，经 `run.cjs` 分发（注册见 `settings.json`）。**只有 `config-protection` 会真阻断**（含 deny / exit(2) 出口），其余 7 个都是提醒型——只往上下文加一句 `additionalContext`，不阻止动作本身。

|Hook|事件|作用|真实强制力|无 Hook 兜底|
|-|-|-|-|-|
|config-protection|PreToolUse|阻止改 eslint / tsconfig / prettier 等配置来消除报错|**真阻断**|改配置前先自问「是在修问题还是在藏报错」|
|GateGuard|PreToolUse|编辑已有文件前须先 Read，避免盲改|提醒|**先读后改**：改已有文件前必 Read，新建除外|
|context-budget|PreToolUse（Read\|Glob\|Grep）|命中高危目录递归/通配读时提醒改精确路径|提醒|动手前过一遍 `context-budget.md` 禁读清单|
|review-reminder|PostToolUse|代码改动后提醒调用 code-reviewer|提醒|写完/改完代码**必**跑一次审查|
|review-tracker|PostToolUse|记录本次会话是否已执行 code-reviewer|提醒|同上，自查是否漏审|
|stop-quality-gate|Stop|回复结束前检查 console.log 残留与审查合规|提醒|收口前自查禁用词与审查勾选|
|pre-compact|PreCompact|压缩前提醒先归档记忆|提醒|**检测到压缩就立即补模块快照**（见 `compaction-recovery.md`）|
|session-start|SessionStart|注入强制执行清单 + 提示按需 Read INDEX|提醒|会话开始主动 Read `.agents/skills/INDEX.md` 与本文件|

> 提醒型 Hook 的价值是**多一道提示**，不是护栏；`context-budget.md` 的禁读清单、`soft-gates` 三条纪律才是真正闸门。

复杂工作流约束（SRS 扫描、子 Agent 调度、Git 流程等）见 `.agents/rules/` 目录，按需 Read。

### 知识库速查

|用途|路径|
|-|-|
|编码规范|`.agents/knowledge/conventions/coding.md`|
|前端规范|`.agents/knowledge/conventions/frontend.md`|
|安全规范|`.agents/knowledge/conventions/security.md`|
|SRS 语言规范|`.agents/knowledge/phase1-requirements/prd-language.md`|
|SRS 章节格式|`.agents/knowledge/phase1-requirements/section-format.md`|
|概要设计规范|`.agents/knowledge/phase2-design/hld-spec.md`|
|详细设计规范|`.agents/knowledge/phase2-design/lld-spec.md`|
|Element Plus 组件|`.agents/knowledge/ui-libs/element-plus/components.md`|
|Element Plus 页面|`.agents/knowledge/ui-libs/element-plus/pages.md`|
|目录索引|`.agents/knowledge/catalog.json`|

### 知识库维护铁律

新增或删除 `.agents/knowledge/` 下任何 .md 文件后，必须重建 catalog.json，两处缺一即视为未完成：

1. **跑脚本，不要手写**：`node .agents/scripts/build-knowledge-catalog.mjs`（自动遍历 `knowledge/**/*.md` 生成 `categories`，并打印新增/移除清单）
2. 脚本输出的「新增 / 移除」条数应与你的改动条数一致；不一致说明有多余或缺失文件
3. 完成后自查：catalog.json 条数 == `knowledge/` 下 .md 文件数（`check-doc-links.mjs` 会断言双向差集为 0）

> **为什么禁止手写**：本包曾长期手工维护，导致 catalog 漏登记 11 个知识文件（含 `ui-libs/` 全部条目），"
> 而 catalog 是按需读取的唯一入口——漏登记等于该知识**永不会被检索到**，且无任何报错。2026-10-30 改为脚本生成。

### admin/ 实现规范

`page-generator` 在 `admin/` 子项目中生成页面时：

1. **WORKSPACE\_PATH** = 仓库根目录（含 `.agents/`、`AGENTS.md`）
2. **PROJECT\_PATH** = `admin/`
3. **项目规范** 从 `admin/README-DEV.md` 加载（路由、布局、Mock、组件用法）
4. **UI 库规范** 从 `.agents/knowledge/ui-libs/element-plus/` 加载
5. UI 库识别为 **Element Plus**

> `admin/README-DEV.md` 是 `admin/` 子项目实现规范的单一事实来源；冲突时以本文为准。

---
