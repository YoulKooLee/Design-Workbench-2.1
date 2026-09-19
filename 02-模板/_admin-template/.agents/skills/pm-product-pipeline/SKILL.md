---
name: pm-product-pipeline
description: "产品 AI Agent 全流程编排技能。将「市场调研 → 用户画像 → 功能优先级 → 产品路线图 → 需求文档（SRS/PRD）→ 前端原型 → 测试用例 → 操作手册 → 发版说明」九个阶段串联成一个完整的智能流水线。适用场景：(1) 用户想一次性走完产品从0到1的完整交付流程，(2) 用户说「走完整流程」「一键生成所有文档」「完整产品交付」时触发，(3) 用户提供一个产品想法，希望输出所有相关文档和原型"
---

# 产品 AI Agent 全流程编排

## 流程概览

### 完整流程（九个阶段）

```
用户输入想法
    ↓
[阶段0] 市场调研         → docs/market-research.md
    ↓
[阶段1] 用户画像         → docs/user-persona.md
    ↓
[阶段2] 功能优先级       → docs/feature-priority.md
    ↓
[阶段3] 产品路线图       → docs/roadmap.md
    ↓
[阶段4] 需求澄清         → docs/requirements.md
    ↓
[阶段5] 需求文档         → SRS 或 PRD（见 §阶段5 分支）
    ↓
[阶段6] 前端原型         → feature-dev（需 SRS 真源）
    ↓
[阶段7] 测试用例         → docs/test-cases.md
    ↓
[阶段8] 操作手册         → docs/operation-manual.md
    ↓
[阶段9] 发版说明         → docs/release-notes.md
```

### 快速流程（五个阶段）

如果用户已有明确需求，可跳过前置阶段：

```
需求澄清 → 需求文档（SRS/PRD）→ 前端原型 → 测试用例 → 操作手册
```

每个阶段**读取上一阶段的输出**，保证内容一致性和上下文传递。

---

## 启动流程

### Step 0: 初始化 — 了解全局信息

收到用户请求后，**首先**用 AskUserQuestion 一次性收集关键决策信息：

**问题1**：产品类型是什么？
- 管理后台系统（Vue3 + ElementPlus）
- 移动端 H5 应用（Vue3 + Vant）
- 企业官网（Vue3 + ElementPlus）
- 其他（请描述）

**问题2**：想走哪些阶段？
- 完整流程（市场调研 → 发版说明，共10个阶段）
- 快速流程（需求澄清 → 操作手册，共5个阶段）
- 只要文档（跳过前端原型代码生成）
- 自定义选择

**问题3**：阶段5 需求文档类型？（见 `AGENTS.md` 需求文档路由；**含阶段6 研发原型时默认 SRS**）
- **SRS 需求规格说明书**（`srs-writer` → `docs/01-需求与规划/`，供 feature-dev / HLD）
- **产品 PRD**（`prd-writer` → `docs/*PRD.md`，探索对齐；**不含阶段6** 或阶段6前须转 SRS）
- **先 PRD 后 SRS**（`prd-writer` → 用户确认后 `srs-writer` 转 SRS，再进阶段6）
- 已有 Axure/HTML/URL 原型 → 阶段5 走 **`prototype-to-prd`**

**问题4**：交付模式？（见 `AGENTS.md`「交付模式」；**流水线默认「标准」**，向下游传递 `DELIVERY_MODE`）
- 标准（**流水线默认**） / 严格 / 快速

> 阶段 6 调用 `feature-dev` 时使用本处所选模式；未单独改选时 stage 6 为 **标准双审查**；选 **快速** 则 stage 6 步骤 6 降级。

**问题5**：现在手头有什么？
- 只有一个想法/描述（从市场调研开始）
- 已有市场调研报告（从用户画像开始）
- 已有明确需求（从需求澄清开始）
- 已有 SRS 或 PRD（从原型或测试开始）
- 已有 Axure/站点原型（阶段5 从 prototype-to-prd 开始）

收集完成后，立即用 TaskCreate 创建任务清单。

---

## 任务清单创建规范

根据用户选择的阶段，创建对应任务。示例（完整流程）：

```
TaskCreate: 阶段0 - 市场调研
TaskCreate: 阶段1 - 用户画像
TaskCreate: 阶段2 - 功能优先级排序
TaskCreate: 阶段3 - 产品路线图
TaskCreate: 阶段4 - 需求澄清
TaskCreate: 阶段5 - 需求文档（SRS / PRD / 原型逆向）
TaskCreate: 阶段6 - 前端原型框架搭建
TaskCreate: 阶段6 - [模块A] 页面生成
TaskCreate: 阶段6 - [模块B] 页面生成
TaskCreate: 阶段7 - 测试用例
TaskCreate: 阶段8 - 操作手册
TaskCreate: 阶段9 - 发版说明
```

---

## 阶段0：市场调研

**目标**：分析市场规模、竞品情况、行业趋势，验证产品机会

**执行方式**：调用 `pm-market-research` skill

**必须调研的内容**：
1. 市场规模分析（TAM/SAM/SOM）
2. 目标用户群体特征
3. 竞品分析（3-5个主要竞品）
4. 行业趋势和机会点
5. 差异化定位建议

**输出**：`docs/market-research.md`

```markdown
# [产品名称] 市场调研报告

## 市场规模
- TAM（总体市场）：[规模估算]
- SAM（可服务市场）：[规模估算]
- SOM（可获得市场）：[规模估算]

## 目标用户
[用户群体特征、痛点、需求]

## 竞品分析
[竞品对比表格]

## 行业趋势
[趋势分析]

## 差异化定位
[建议的差异化方向]
```

**完成标志**：市场调研报告已写入 `docs/market-research.md`

---

## 阶段1：用户画像

**目标**：基于市场调研，创建详细的用户画像

**输入**：`docs/market-research.md`（阶段0输出）

**执行方式**：调用 `pm-user-persona` skill

**传入上下文**：
```
请读取 docs/market-research.md，基于目标用户群体创建用户画像。

要求：
- 创建 2-3 个典型用户画像
- 每个画像包含：基本信息、目标、痛点、使用场景
- 绘制用户旅程地图
```

**输出**：`docs/user-persona.md`

**完成标志**：用户画像文档已写入，包含至少2个典型用户画像

---

## 阶段2：功能优先级

**目标**：基于用户画像，对功能需求进行优先级排序

**输入**：
- `docs/market-research.md`（阶段0输出）
- `docs/user-persona.md`（阶段1输出）

**执行方式**：调用 `pm-feature-prioritization` skill

**传入上下文**：
```
请读取 docs/market-research.md 和 docs/user-persona.md，
对以下功能需求进行优先级排序：

[用户提供的功能列表]

使用 RICE 模型评估，输出：
- P0（必须有）功能列表
- P1（重要）功能列表
- P2（可选）功能列表
```

**输出**：`docs/feature-priority.md`

**完成标志**：功能优先级文档已写入，所有功能已分级

---

## 阶段3：产品路线图

**目标**：基于功能优先级，规划产品迭代路线图

**输入**：
- `docs/feature-priority.md`（阶段2输出）
- `docs/user-persona.md`（阶段1输出）

**执行方式**：调用 `pm-roadmap` skill

**传入上下文**：
```
请读取 docs/feature-priority.md，规划产品路线图。

要求：
- 将功能分配到 3-4 个版本
- V1.0 只包含 P0 功能（MVP）
- 每个版本设定里程碑和交付时间
- 说明版本间的依赖关系
```

**输出**：`docs/roadmap.md`

**完成标志**：产品路线图已写入，V1.0 功能范围明确

---

## 阶段4：需求澄清

**目标**：把用户的模糊想法转化为结构化的需求描述

**执行方式**：通过对话逐步澄清，不一次性抛出所有问题

**必须澄清的内容**：

```markdown
1. 产品是什么？解决谁的什么问题？
2. 目标用户是谁？（角色类型、使用场景）
3. 核心功能有哪些？（让用户列举，而不是猜）
4. 涉及哪些端？（Web管理后台 / 用户端 / 移动端）
5. 有没有特殊的业务规则或约束？
```

**输出**：`docs/requirements.md`

```markdown
# [产品名称] 需求概述

## 产品定位
[一句话描述]

## 目标用户
[用户角色列表]

## 核心功能清单
[功能列表，按模块组织]

## 涉及端
- [ ] Web 管理后台
- [ ] Web 用户端
- [ ] 移动端 H5

## 特殊说明
[业务规则、约束条件]
```

**完成标志**：用户确认需求描述准确，且已写入 `docs/requirements.md`

---

## 阶段5：需求文档（SRS / PRD 分支）

**目标**：将阶段4概述扩展为可交付的需求文档，并登记 **阶段5 真源路径**（供阶段6–9 读取）。

**输入**：
- `docs/requirements.md`（阶段4）
- `docs/roadmap.md`（阶段3，V1.0 范围）
- Step 0 选的文档类型、交付模式

### 5.0 分支选择（进入本阶段时执行一次）

| Step 0 选择 / 信号 | 调用技能 | 阶段5 真源路径 |
| --- | --- | --- |
| **SRS**（默认，且含阶段6） | **`srs-writer`** | `docs/01-需求与规划/{日期}-{项目}-SRS需求规格说明书-V*.md` |
| **PRD**（只要文档 / 不对接研发） | **`prd-writer`** | `docs/YYYY-MM-DD-<主题>-PRD.md`（+ 可选 `-概念版.md`） |
| **先 PRD 后 SRS** | **`prd-writer`** → **`srs-writer`** | 最终以 **SRS 路径** 为真源；PRD 路径写入 SRS 文首引用 |
| **已有 Axure/HTML/URL** | **`prototype-to-prd`** → **`prd-writer`** | 默认 PRD；若含阶段6，盘点+PRD 完成后 **须转 SRS**（`srs-writer` 或用户确认转写） |
| 用户未选但 **含阶段6** | **`srs-writer`** | 同 SRS 行（feature-dev 依赖 SRS 章节结构） |

**禁止**：含阶段6 时仅以 `*PRD.md` 为真源调用 feature-dev（除非用户明确接受手动对齐且跳过 SRS 模板）。

**交付模式**：传入各技能（`srs-writer` A6 抽检 / `prd-writer` 快路径等），见 `AGENTS.md`「交付模式」。

---

### 5A. SRS 路径（`srs-writer`）

**执行方式**：调用 `srs-writer`，传入阶段4 `requirements.md` + 阶段3 V1.0 范围。

**关键规范**：
- 只生成 V1.0 / P0 模块（对照 `roadmap.md`）
- 读取 `docs/requirements.md` 作为 analyzer 输入摘要
- 遵循 `srs-writer` **标准模式**（A6 抽检、P0 自动修）；流水线内 **不重复**额外全文审查

**输出**：SRS 文件（上表路径）

**完成标志**：SRS 覆盖 V1.0 功能模块；3.2/3.3/3.5.x 结构完整

**登记**：在会话中记录 `SPEC_SOURCE=<SRS 绝对或相对路径>`

---

### 5B. PRD 路径（`prd-writer`）

**执行方式**：调用 `prd-writer` 模式 A；以 `requirements.md` 写入概念版「已有输入摘要」。

**关键规范**：
- **标准/快速**：可说「跳过概念版」走快路径（见 `prd-writer` §0）
- MVP 以 §4 🔴 为准，流水线内 **不另开** MVP 口头确认（除非 **严格** 模式）
- 若后续含阶段6 且用户选「先 PRD 后 SRS」→ 本小节完成后执行 **5C**

**输出**：`docs/YYYY-MM-DD-<主题>-PRD.md`（及可选 `-概念版.md`、`-原型盘点.md`）

**完成标志**：PRD §4 功能树覆盖 V1.0 范围

**登记**：`SPEC_SOURCE=<PRD 路径>`（未转 SRS 前）

---

### 5C. PRD → SRS 转写（门禁 · 含阶段6 时强制）

**规则**：Read `.agents/rules/prd-to-srs-gate.md`。**含阶段6 时不可跳过。**

**触发**：阶段6 开始前 `SPEC_SOURCE` 仍指向 PRD；或用户说「进开发」且仅有 PRD。

**执行方式**：调用 **`srs-writer` Step F**（非 Step A 泛化生成）；输入 PRD + 可选 `requirements.md`；对照 `references/prd-to-srs-handoff.md`。

**完成标志**：SRS 落盘 + 门禁 §5 七项检查 + `SPEC_SOURCE` **更新为 SRS 路径**

**批量模式**：不询问「是否转写」，默认自动执行 5C。

---

### 5D. 原型逆向（`prototype-to-prd`）

**执行方式**：按 `prototype-to-prd/SKILL.md` 完成盘点 → `prd-writer`；**标准模式**下盘点 **默认继续**。

**含阶段6**：盘点+PRD 完成后执行 **5C**，再进入阶段6。

**登记**：`SPEC_SOURCE` 最终指向 SRS（含阶段6）或 PRD（仅文档）

---

### 阶段5 完成检查

```
SPEC_SOURCE 已登记 ✅
含阶段6 → SPEC_SOURCE 指向 SRS 文件 ✅
仅文档 + PRD → SPEC_SOURCE 指向 *PRD.md ✅
```

---

## 阶段6：前端原型

**目标**：基于 **阶段5 真源（`SPEC_SOURCE`，须为 SRS）** 生成可运行前端代码。

**前置**：`SPEC_SOURCE` 指向 SRS；若为 PRD，先完成 **阶段5C**。

**输入**：`SPEC_SOURCE`（SRS 路径）

**执行方式**：

### 6.1 — 项目框架

在已有业务项目中直接调用 **`feature-dev`**（旧名 `page-generator` 仍走本技能；勿使用已移除的 vue-admin-generator）。

传入：从 SRS 读取 3.1 菜单结构、3.3 页面清单、主题与登录方式（自 SRS 提取）。

### 6.2 — 逐功能页面

按 SRS 3.2/3.3 的 V1.0 模块，**每个功能一次** `feature-dev`（批量模式不在功能间询问「继续吗」）。

**交付模式**：继承 Step 0 所选 `DELIVERY_MODE`（**流水线默认标准**）。阶段 6 调用 `feature-dev` 时传入同一模式；未选快速则步骤 6 **全量双审查**。

**输出**：业务项目 `src/`（或子项目 `admin/`、`mobile/` 等）

**完成标志**：V1.0 页面可访问；`npm run dev` 可启动（verification 按 AGENTS 交付模式）

---

## 阶段7：测试用例

**目标**：基于阶段5 真源生成测试用例。

**输入**：`SPEC_SOURCE`（SRS 优先；仅 PRD 时读 `*PRD.md` 并注明「非 SRS 结构」）

**执行方式**：调用 `pm-test-cases` skill

**传入上下文**：
```
请读取 {SPEC_SOURCE}，为 V1.0 功能模块生成测试用例：
[从 SRS 3.2/3.3 或 PRD §4 列出模块名]

覆盖功能、边界、异常、权限；P0 覆盖主流程。
```

**输出**：`docs/test-cases.md`

**完成标志**：所有功能模块都有测试用例，P0 冒烟测试集不少于核心流程数量

---

## 阶段8：操作手册

**目标**：基于真源与（若有）原型生成操作手册。

**输入**：
- `SPEC_SOURCE`
- `src/`（阶段6，若有）

**执行方式**：调用 `pm-operation-manual` skill

**传入上下文**：
```
请读取 {SPEC_SOURCE}，生成用户操作手册。
系统名称、角色、模块从真源文档提取。
含阶段6 时可对照实际页面结构。
```

**完成标志**：手册覆盖所有核心功能，操作步骤可独立执行

---

## 阶段9：发版说明

**目标**：基于真源与交付物生成发版说明。

**输入**：
- `SPEC_SOURCE`
- `docs/roadmap.md`
- `src/`（若有）

**执行方式**：调用 `pm-release-notes` skill

**传入上下文**：
```
请读取 {SPEC_SOURCE} 与 docs/roadmap.md，生成 V1.0 发版说明。
功能列表从 SRS 3.2/3.3 或 PRD §4 提取。
```

**输出**：`docs/release-notes.md`

**完成标志**：发版说明清晰描述所有新功能，用户可快速了解版本更新内容

---

## 流程控制规则

### 阶段间传递规范

每个阶段完成后，必须确保输出文件已写入，才能进入下一阶段：

```
阶段0完成 → docs/market-research.md ✅ → 进入阶段1
阶段1完成 → docs/user-persona.md ✅ → 进入阶段2
阶段2完成 → docs/feature-priority.md ✅ → 进入阶段3
阶段3完成 → docs/roadmap.md ✅ → 进入阶段4
阶段4完成 → docs/requirements.md ✅ → 进入阶段5
阶段5完成 → SPEC_SOURCE 已登记 ✅ → 进入阶段6/7/8
阶段6完成 → src/ ✅ → 进入阶段8（手册可对齐原型）
阶段7完成 → docs/test-cases.md ✅
阶段8完成 → docs/operation-manual*.md ✅ → 进入阶段9
阶段9完成 → docs/release-notes.md ✅
```

### 可以并行的阶段

阶段5（需求文档）完成后，阶段6/7/8**可以并行**：
- 测试用例只依赖 `SPEC_SOURCE`，不依赖原型代码
- 操作手册主要依赖 `SPEC_SOURCE`，可以先生成再补充原型细节

### 用户确认节点（按交付模式）

| 节点 | 严格 | 标准（默认） | 快速 |
| --- | --- | --- | --- |
| 阶段0 调研结论 | 必须确认 | 摘要后默认继续 | 默认继续 |
| 阶段3 路线图 | 必须确认 | 必须确认 | 默认继续 |
| 阶段4 需求概述 | 必须确认 | 必须确认 | 无歧义则继续 |
| 阶段5 文档 | 必须确认 | **P0 已自动处理**；摘要后默认继续 | 默认继续 |
| 阶段6 每页 | 每页确认 | **批量不逐页问**；单次模式有问题才停 | 不逐页问 |

**禁止**（标准/快速 + 批量 feature-dev）：功能之间问「继续吗？」

### 进度汇报

每完成一个阶段，输出进度摘要：

```
✅ 阶段[N] 完成

产出文件：[文件路径]
核心内容：[2-3句话描述产出内容]
下一步：[说明下一阶段将做什么，需要用户确认什么]

---
整体进度：[N]/10 个阶段完成
```

---

## 目录结构规范

流程结束后，项目目录结构如下：

```
[项目目录]/
├── docs/
│   ├── market-research.md
│   ├── user-persona.md
│   ├── feature-priority.md
│   ├── roadmap.md
│   ├── requirements.md
│   ├── 01-需求与规划/
│   │   └── *-SRS需求规格说明书-V*.md   ← 阶段5A/5C（研发真源）
│   ├── YYYY-MM-DD-<主题>-PRD.md          ← 阶段5B（可选）
│   ├── YYYY-MM-DD-<主题>-概念版.md      ← 阶段5B（可选）
│   ├── YYYY-MM-DD-<主题>-原型盘点.md    ← 阶段5D（可选）
│   ├── test-cases.md
│   ├── operation-manual*.md
│   ├── quick-start.md
│   └── release-notes.md
└── src/                                 ← 阶段6
```

> 旧路径 `docs/spec.md` **已废弃**；断点续跑时若仅有 `spec.md`，提示迁移为 SRS 或重新跑阶段5。

---

## 快速恢复（断点续跑）

如果中途中断，再次启动时：

1. 检查 `docs/` 目录已有哪些文件
2. 根据已有文件判断完成到哪个阶段
3. 从未完成的阶段继续，无需重新开始

判断逻辑：
```
docs/market-research.md 存在     → 阶段0已完成
docs/user-persona.md 存在        → 阶段1已完成
docs/feature-priority.md 存在    → 阶段2已完成
docs/roadmap.md 存在             → 阶段3已完成
docs/requirements.md 存在        → 阶段4已完成
docs/01-需求与规划/*SRS* 存在
  或 docs/*PRD.md 存在           → 阶段5已完成（登记 SPEC_SOURCE）
src/ 有代码                       → 阶段6已完成或进行中
docs/*test-cases* 存在           → 阶段7已完成
docs/*operation-manual* 存在     → 阶段8已完成
docs/release-notes.md 存在       → 阶段9已完成
docs/spec.md 仅存在（遗留）      → 提示迁移 SRS 或重跑阶段5
```
