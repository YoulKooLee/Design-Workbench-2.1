# 需求文档技能路由（brainstorming / srs-writer / prd-writer）

> 位置：`.agents/rules/req-doc-routing.md` ｜ 读取层：按需（收到需求文档类任务时 Read）
> 来源：自 `AGENTS.md` v1.7「需求文档技能路由」专章外迁（v2.0 瘦身，2026-09-29）
> 变更：已剥离技能（`prototype-to-prd`、`feasibility-report`、`annotation`、`pm-product-pipeline` 等）的相关路由行同步移除

本包存在 **两套需求文档体系**，不可混为同一真源。收到需求文档类任务时 **先按本表选技能**，再 Read 对应 `SKILL.md`；禁止跳过路由直接写文档。

**探索与规格分开：** `brainstorming` 产出确认过的设计方案；`srs-writer` / `prd-writer` 分别写 SRS / PRD。未点名文档类型的想法，先探索，再问 SRS 还是 PRD。

---

## 一、体系对比

| 维度 | `srs-writer`（SRS · 研发交付） | `prd-writer`（PRD · 产品探索） |
| --- | --- | --- |
| 定位 | 企业交付、研发规格、角色审查 | 产品方向对齐、快速迭代 |
| 产出路径 | `docs/01-需求与规划/*-SRS需求规格说明书-V*.md` | `docs/YYYY-MM-DD-<主题>-概念版.md` + `*-PRD.md` |
| 语言规范 | `.agents/knowledge/phase1-requirements/prd-language.md` | 技能内 `references/`，含交互/状态/ASCII 线框 |
| 下游 | `feature-list`、`hld-design`、`lld-design`、`feature-dev`、`delivery-plan` | `diagram-generator`、`slides`（按需） |
| 角色 | req-analyzer → **req-writer** → req-reviewer | 无独立角色调度；主会话按 `references/` 执行 |

> **命名区分**：技能 `srs-writer`（目录 `.agents/skills/srs-writer/`）写整份 SRS；角色 `req-writer`（`.agents/agents/req-writer.md`）只写其中某一章。技能 `prd-writer` 写 PRD。三者不可互换。
>
> **别名（旧名仍走新技能）**：`req-doc` → `srs-writer`；`page-generator` → `feature-dev`。正式文档与目录一律用新名。
>
> **本包定位提示**：`_project-development` 是**研发工程包**，正常输入是已定稿的 SRS。`prd-writer` 保留仅用于两种情形：① 上游只给了 PRD，需走 Step F 转写；② 研发期发现需求缺口需补一份轻量 PRD 对齐方向。**不要在本包内做产品探索主流程**（那属 `_project-template`）。

---

## 二、触发路由（按优先级）

**规则：输入源优先于泛化触发词；研发/SRS 关键词优先于 PRD 关键词；未点名 SRS/PRD 的想法先 `brainstorming`；仅当明确产品探索语境或无 SRS 要求时用 `prd-writer`。**

| 优先级 | 用户意图 / 输入 | 选用技能 | 禁止 |
| --- | --- | --- | --- |
| 0 | 「我想做 / 做个功能 / 先对齐方案 / 需求还不清楚」且**未**点名 SRS 或 PRD | **`brainstorming`** | 不可直接 `srs-writer` Step A 落盘，也不可直接 `prd-writer` 落盘 |
| 1 | **SRS**、**需求规格说明书**、**需求说明书**、**细化/完善 SRS**、**代码反向同步需求**、**Word 模板提炼** | **`srs-writer`** | 不可用 `prd-writer` 产出 SRS 路径。**生成模式**若无确认设计方案且输入仍是想法/短清单 → **A1.5 回退 `brainstorming`**，禁止直接 A4 |
| 2 | 项目已进入 **研发交付**（已有/将要 SRS，或后续走 HLD/LLD/feature-dev） | **`srs-writer`** | 不可另起 `*-PRD.md` 作为研发真源 |
| 3 | **PRD**、**概念版**、**产品需求**、**从零写 PRD**、**MVP 功能范围**（口述无原型） | **`prd-writer`** | 不可套用 SRS 章节模板。未点名 PRD 的「我想做」走优先级 0 |
| 4 | **需求文档** / **写需求** / **补充需求** / **审查需求**（**未说明 SRS 或 PRD**） | **按默认规则推断**（见 §三）；仍无法判断时 **问一次** | 不可默认任选其一 |
| 5 | **导出 Word**（未指明文档类型） | 按 **已存在文件** 类型选导出；新建文档先完成上表路由 | — |

---

## 三、默认推断（优先级 4，减少无谓询问）

| 工作区信号 | 默认技能 |
| --- | --- |
| 存在 `docs/01-需求与规划/*SRS*` 或 `*需求说明书*` | **`srs-writer`**（审查/增量走 C/D；从零生成仍过 A1.5） |
| 存在 `docs/01-需求与规划/*设计方案*`，用户要写 SRS | **`srs-writer`**（A3 只补缺口，不重问目的/用户/模块） |
| 存在 `docs/*-PRD.md` 或 `*-概念版.md` | **`prd-writer`** |
| 存在 `docs/交接清单.md` 且 SPEC_SOURCE=SRS | **`srs-writer`**（审查/增量模式） |
| 用户说「正式立项 / 进开发 / 出 HLD」 | **`srs-writer`**（无设计方案且信息不足 → A1.5） |
| 用户说「对齐方向 / 轻量 PRD」 | **`prd-writer`** |
| 无设计方案、无 SRS、无 PRD，用户只描述想法 | **`brainstorming`** |
| 以上皆无 | 问一次 SRS vs PRD（见下） |

**歧义时的默认问句：**

> 这份需求是按 **研发交付 SRS**（`srs-writer`，路径 `docs/01-需求与规划/`，供设计与开发）还是 **产品探索 PRD**（`prd-writer`，概念版 + 落地版，供方向对齐）来写？

用户已声明「正式立项 / 要进开发 / 要 SRS」→ `srs-writer`；「先对齐方向 / 轻量 PRD」→ `prd-writer`。

---

## 四、触发词速查

| 技能 | 典型触发词（任一命中即进入路由） |
| --- | --- |
| **`brainstorming`** | 我想做、做个功能、先对齐、设计方案、需求还不清楚、简要需求清单 |
| **`srs-writer`** | SRS、需求规格说明书、需求说明书、生成/细化/审查 SRS、代码和需求对齐、反向更新需求、导入需求模板、`req-doc`、`/req-doc` |
| **`prd-writer`** | PRD、产品需求、概念版、从零写 PRD、整理/改进 PRD、MVP 范围、需求评审（PRD 语境） |
| **`feature-dev`** | 创建页面、生成页面、实现功能、开发 xx、连续实现、`page-generator`、`/page-generator` |

**重叠词**（需求文档、补充需求、导出 Word 等）：**不自动匹配**，按 §二 优先级 4 澄清，或根据已有文件扩展名/路径判断。有设计方案或 SRS 且要写规格 → `srs-writer`；只有想法 → `brainstorming`。

---

## 五、工作流衔接

| 上游 | 默认下游 | 备注 |
| --- | --- | --- |
| `brainstorming` 设计方案确认后 | 问用户：**SRS（srs-writer）** 或 **PRD（prd-writer）** | 选 SRS → 从 **A1.5 足够分支** 进入，A3 不重问 |
| **`srs-writer` Step A 信息不足**（无确认设计方案，且未给齐项目名/背景/模块/用户） | **`brainstorming`** | 仅生成模式；**B/C/D/E/F 不走本行** |
| `srs-writer` SRS 定稿 | **`hld-design`** → **`lld-design`** → **`delivery-plan`** → **`feature-dev`** | 研发主链路 |
| `prd-writer` PRD 确认且用户要进研发 | **强制 `srs-writer` Step F**（PRD→SRS 转写）；不可跳过直接 `feature-dev` | 转换时标注来源 PRD；登记 **`SPEC_SOURCE=SRS`**；规则见 §六 |
| `feature-list` / `hld-design` / `lld-design` / `delivery-plan` | 输入须为 **SRS 路径** | 若仅有 `*-PRD.md` → **阻断**，输出门禁话术，路由 **`srs-writer` Step F** |

---

## 六、PRD→SRS 转写门禁

> 完整规则：Read `.agents/rules/prd-to-srs-gate.md`；转写执行：`srs-writer` **Step F** + `references/prd-to-srs-handoff.md`。

**铁律**：`feature-dev`、`delivery-plan`（生成）、`hld-design`、`lld-design`、`feature-list` **不得**以 `*-PRD.md` 为规格真源。

| 场景 | 动作 |
| --- | --- |
| 仅有 PRD，用户要「实现/开发/生成页面/交付计划/概要设计」 | **先 Step F**，再下游 |
| PRD 刚落盘，用户说「进开发」 | 同上，不询问是否转写（批量默认转写） |
| SRS + PRD 并存 | `SPEC_SOURCE` 指向 SRS |
| 用户明确「跳过 SRS / 按 PRD 手动对齐」 | 仅 **单次** `feature-dev` 降级；须标注非正式真源，并在交接清单 §四 登记豁免 |

**触发 Step F 的典型说法**：PRD 转 SRS、进开发、转写需求、按 PRD 写 SRS。

**出口**：SRS 落盘 + §5 七项检查 + `SPEC_SOURCE` 更新 → 方可 `feature-dev`。

---

## 七、安装与依赖

- Word 导出：`srs-writer` / `prd-writer` 共用 `.agents/skills/common/export-word.*`（`.ps1` / `.py` / `.sh` 三平台）
- 已剥离技能（`prototype-to-prd`、`feasibility-report`、`annotation`、`frontend-design`、`pm-*`）不在本包，若任务需要请转 `_project-template`；归档位置 `08-文档/2.1更新文档/admin剥离存档/`

---

## 八、路由示例

✅ 用户：「写 SRS 需求说明书，后面要开发」→ `srs-writer`（有设计方案则 A3 只补缺口；无则 A1.5 → `brainstorming`）

✅ 用户：「我想做 CRM 客户管理」→ `brainstorming` → 确认设计方案 → 再问 SRS / PRD

✅ 用户：「根据现有前端代码更新需求说明书」→ `srs-writer` 反向同步

✅ 用户：「PRD 写好了，进开发」→ `srs-writer` **Step F** → `hld-design` → `delivery-plan` / `feature-dev`

❌ 用户：「写个需求说明书，我想做 CRM」且无设计方案 → 未过 A1.5 直接 `srs-writer` A4

❌ 用户：「写需求文档」→ 未路由直接写 `docs/*-PRD.md` 或 SRS

❌ 同一功能模块在 SRS 与 PRD 各写一套且未标注真源

❌ 用户：「PRD 写好了，开始实现」→ 未走 Step F 直接 `feature-dev`
