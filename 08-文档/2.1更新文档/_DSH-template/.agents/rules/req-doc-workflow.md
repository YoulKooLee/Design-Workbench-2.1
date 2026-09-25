# 需求说明书工作流

## 铁律

```
没有读取规范的需求编写 = 违规
没有规范扫描的需求修改 = 违规
没有跨章节同步检查的局部修改 = 违规
```

## 适用范围

对 SRS 需求规格说明书（`*需求*说明书*.md`）的任何修改操作，包括：
- 通过 req-doc 技能的完整流程
- 主流程直接 Edit 修改
- 用户要求的局部调整

无论修改大小，无论是否调用技能，以下流程都是强制的。

---

## 修改前：读取规范（强制）

<EXTREMELY-IMPORTANT>
修改需求说明书前，必须先读取规范。不存在"这次内容简单不需要"的例外。
跳过 = 违反项目规则。
</EXTREMELY-IMPORTANT>

### 必读规范

每次修改 SRS 前，必须 Read 以下文件（可并行读取）：

| 文件 | 路径 | 用途 |
|------|------|------|
| PRD 语言规范 | `.agents/knowledge/phase1-requirements/prd-language.md` | 禁止词汇、内容分级 |
| 章节格式规范 | `.agents/knowledge/phase1-requirements/section-format.md` | 结构要求 |

### 读取后内化的核心规则

**L1 层（3.2 需求功能清单、3.3 页面功能清单）：**
- 格式：动词 + 对象 + 条件
- 禁止：布局方位、组件名称、图表视觉类型、尺寸数值、颜色

**L2 层（3.5.x 功能设计主体）：**
- 写"做什么"，不写"长什么样"
- 禁止：像素值、颜色代码、CSS属性、动画描述、视觉效果词

**全局禁止：**
- UI 组件名（el-xxx、a-xxx、van-xxx、ElTable、ElDrawer 等）
- 技术实现词（API、接口、路由、组件、v-model、ref 等）
- 布局描述（左侧面板、右侧滑出、顶部居中、底部展示、浮动卡片）

---

## 修改后：规范扫描（强制）

<EXTREMELY-IMPORTANT>
修改需求说明书后，必须执行规范扫描。不通过不能向用户报告完成。
</EXTREMELY-IMPORTANT>

### 与 req-doc A6 审查的去重

| 情况 | 扫描范围 |
| --- | --- |
| **当次会话 A6/B6/C/D 已跑 req-reviewer**（标准/严格） | 仅对 **A6 之后新增/修改的段落** 做禁用词 grep + 交叉一致性；**不重复**全章 req-reviewer |
| **快速模式** 或 **仅主流程 Edit 小改** | 完整禁用词扫描 + 交叉一致性（主流程自行执行，不调用 agent） |
| **用户手动 Edit SRS、未走 req-doc** | 完整扫描（门禁 2–4 全部执行） |

---

### 扫描步骤

#### 第 1 步：禁用词扫描

对本次修改的内容，逐行检查是否包含以下禁用词：

**布局方位词：** 左侧、右侧、顶部、底部、居中、浮动、滑出、弹出面板
**组件名称：** 卡片（作为UI组件时）、面板、进度条、切换器、折线图、饼图、柱状图、网格布局、气泡、浮窗、时间线
**视觉描述：** 虚线、旋转、隐藏（作为视觉效果时）、标记、高亮、灰色、渐变、阴影、毛玻璃
**技术术语：** 任何 CSS 值、组件库名、路由路径、API 路径

**发现禁用词时：** 立即修正，不询问用户。

#### 第 2 步：跨章节一致性检查

检查本次修改是否影响其他章节：

| 修改了什么 | 必须同步检查 |
|-----------|------------|
| 3.5.x 功能详细设计（新增/删除/重命名功能） | 3.2 需求功能清单 + 3.3 页面功能清单 + 3.4 权限矩阵 |
| 3.3 页面功能清单（新增/删除页面） | 3.5.x 对应章节是否存在 |
| 3.2 需求功能清单（新增/删除模块） | 3.1 架构 + 3.3 + 3.4 + 3.5.x |
| 任何功能的操作/按钮变更 | 3.3 对应行的功能描述 |
| 状态枚举变更 | 所有引用该状态的章节 |

**发现不一致时：** 立即修正，在报告中说明同步了哪些章节。

#### 第 3 步：内容分级验证

- 3.2/3.3 中的内容是否符合 L1（动词+对象+条件，无视觉描述）？
- 3.5.x 中的内容是否符合 L2（功能行为，无视觉实现）？

---

## 执行流程总结

```
1. 接到修改需求
2. 【门禁1】Read prd-language.md + section-format.md
3. 执行修改
4. 【门禁2】禁用词扫描 → 发现即修正
5. 【门禁3】跨章节一致性检查 → 发现即同步
6. 【门禁4】内容分级验证 → 不符合即改写
7. 全部通过 → 向用户报告完成
```

门禁 2-4 任何一项不通过，修正后重新扫描，直到全部通过。

---

## 与 code-reviewer 的对照

| 维度 | code-reviewer | SRS 规范扫描 |
|------|--------------|-------------|
| 触发条件 | 写完/修改代码后 | 写完/修改需求说明书后 |
| 执行方式 | 调用 code-reviewer agent | 主流程自行执行扫描 |
| 不通过处理 | CRITICAL/HIGH 必须修复 | 禁用词/不一致必须修正 |
| 跳过后果 | 违反项目规则 | 违反项目规则 |

---

## 常见违规模式（红旗思维）

| 想法 | 现实 |
|------|------|
| "只改了一行，不需要扫描" | 一行也可能包含禁用词 |
| "这是用户要求的原文" | 用户的原文也要转换为 PRD 语言 |
| "只改了 3.5.x，不影响 3.3" | 功能变更必须检查页面功能清单 |
| "这次是紧急修改" | 紧急不是跳过规范的理由 |
| "我记得规范内容" | 规范会更新，每次都要读当前版本 |
| "内容太多，先写完再说" | 写完后扫描是强制的，不是可选的 |

---

## 需求文档技能路由（req-doc / prd-writer / prototype-to-prd）

本包存在 **两套需求文档体系**，不可混为同一真源。收到任务时 **先按本表选技能**，再 Read 对应 `SKILL.md`；禁止跳过路由直接写文档。

### 体系对比

| 维度 | `req-doc`（SRS · 研发交付） | `prd-writer`（PRD · 产品探索） |
| --- | --- | --- |
| 定位 | 企业交付、研发规格、Hook/子 Agent 审查 | 产品方向对齐、Vibe 原型、快速迭代 |
| 产出路径 | `docs/01-需求与规划/*-SRS需求规格说明书-V*.md` | `docs/YYYY-MM-DD-<主题>-概念版.md` + `*-PRD.md` |
| 语言规范 | `.agents/knowledge/phase1-requirements/prd-language.md` | 技能内 `references/`，含交互/状态/ASCII 线框 |
| 下游 | `feature-list`、`hld-design`、`page-generator`、`annotation` | `diagram-generator`、静态原型、测试/手册（按需） |
| 子 Agent | req-analyzer → **req-writer**（子 Agent）→ req-reviewer | 无；主 Agent 按 `references/` 执行 |

> **命名区分**：子 Agent `req-writer`（`.agents/agents/req-writer.md`）仅服务于 `req-doc`；技能 `prd-writer` 是独立技能目录，二者不可互换。

### 触发路由（按优先级）

**规则：输入源优先于泛化触发词；研发/SRS 关键词优先于 PRD 关键词；仅当明确产品探索语境或无 SRS 要求时用 prd-writer。**

| 优先级 | 用户意图 / 输入 | 选用技能 | 禁止 |
| --- | --- | --- | --- |
| 1 | 提供 **Axure 导出包**、**线上 URL**、**本地 HTML 原型** 要写 PRD | **`prototype-to-prd`** → 盘点后 **`prd-writer`** | 不可用 `req-doc` 代替盘点；不可跳过盘点写 §5 |
| 2 | **SRS**、**需求规格说明书**、**需求说明书**、**细化/完善 SRS**、**代码反向同步需求**、**Word 模板提炼** | **`req-doc`** | 不可用 `prd-writer` 产出 SRS 路径 |
| 3 | 项目已进入 **研发交付**（已有/将要 SRS，或后续走 HLD/LLD/page-generator） | **`req-doc`** | 不可另起 `*-PRD.md` 作为研发真源 |
| 4 | **PRD**、**概念版**、**产品需求**、**从零写 PRD**、**MVP 功能范围**（口述无原型） | **`prd-writer`** | 不可套用 SRS 章节模板 |
| 5 | **需求文档** / **写需求** / **补充需求** / **审查需求**（**未说明 SRS 或 PRD**） | **按默认规则推断**（见下）；仍无法判断时 **问一次** | 不可默认任选其一 |
| 6 | **导出 Word**（未指明文档类型） | 按 **已存在文件** 类型选导出；新建文档先完成上表路由 | — |

**默认推断（优先级 5，减少无谓询问）：**

| 工作区信号 | 默认技能 |
| --- | --- |
| 存在 `docs/01-需求与规划/*SRS*` 或 `*需求说明书*` | **`req-doc`** |
| 存在 `docs/*-PRD.md` 或 `*-概念版.md` | **`prd-writer`** |
| 用户 @ Axure / URL / HTML 原型 | **`prototype-to-prd`** |
| 用户说「正式立项 / 进开发 / 出 HLD」 | **`req-doc`** |
| 用户说「对齐方向 / 轻量 PRD / 做原型」 | **`prd-writer`** |
| 以上皆无 | 问一次 SRS vs PRD（见下） |

**歧义时的默认问句（优先级 5）：**

> 这份需求是按 **研发交付 SRS**（`req-doc`，路径 `docs/01-需求与规划/`，供设计与开发）还是 **产品探索 PRD**（`prd-writer`，概念版 + 落地版，供方向对齐与原型）来写？

用户已声明「正式立项 / 要进开发 / 要 SRS」→ `req-doc`；「先对齐方向 / 做原型 / 轻量 PRD」→ `prd-writer`。

### 触发词速查

| 技能 | 典型触发词（任一命中即进入路由） |
| --- | --- |
| **`prototype-to-prd`** | Axure 转 PRD、原型转需求、网站转 PRD、逆向 PRD、HTML 原型转文档、`/prototype-to-prd` |
| **`req-doc`** | SRS、需求规格说明书、需求说明书、生成/细化/审查 SRS、代码和需求对齐、反向更新需求、导入需求模板 |
| **`prd-writer`** | PRD、产品需求、概念版、从零写 PRD、整理/改进 PRD、MVP 范围、需求评审（PRD 语境） |

**重叠词**（需求文档、补充需求、导出 Word 等）：**不自动匹配**，按上表优先级 5 澄清，或根据已有文件扩展名/路径判断。

### 工作流衔接

| 上游 | 默认下游 | 备注 |
| --- | --- | --- |
| `brainstorming` 设计方案确认后 | 问用户：**SRS（req-doc）** 或 **PRD（prd-writer）** | 不再默认仅 req-doc |
| `prototype-to-prd` 盘点确认后 | **`prd-writer`** 模式 A | 模板复用 `prd-writer/references/`，禁止复制第二套 |
| `prd-writer` PRD 确认且用户要进研发 | **强制 `req-doc` Step F**（PRD→SRS 转写）；不可跳过直接 `page-generator` | 转换时标注来源 PRD；登记 **`SPEC_SOURCE=SRS`**；规则见 **§ PRD→SRS 转写门禁** |
| `pm-product-pipeline` 阶段 5 | Step 0 选文档类型：**含阶段6 默认 `req-doc`（SRS）**；PRD / 原型逆向须 **5C→Step F** 后再进阶段6 | 登记 **`SPEC_SOURCE`**；含阶段6 时真源须为 SRS |
| `feature-list` / `annotation` / `hld-design` / `delivery-plan` | 输入须为 **SRS 路径** | 若仅有 `*-PRD.md` → **阻断**，输出门禁话术，路由 **`req-doc` Step F** |

### PRD→SRS 转写门禁

> 完整规则：Read `prd-to-srs-gate.md`；转写执行：`req-doc` **Step F** + `../skills/req-doc/references/prd-to-srs-handoff.md`。

**铁律**：`page-generator`、`delivery-plan`（生成）、`hld-design`、`lld-design`、`feature-list`、`annotation` **不得**以 `*-PRD.md` 为规格真源。

| 场景 | 动作 |
| --- | --- |
| 仅有 PRD，用户要「实现/开发/生成页面/交付计划/概要设计」 | **先 Step F**，再下游 |
| PRD 刚落盘，用户说「进开发」 | 同上，不询问是否转写（批量/流水线默认转写） |
| SRS + PRD 并存 | `SPEC_SOURCE` 指向 SRS |
| 用户明确「跳过 SRS / 按 PRD 手动对齐」 | 仅 **单次** `page-generator` 降级；须标注非正式真源 |

**触发 Step F 的典型说法**：PRD 转 SRS、进开发、转写需求、按 PRD 写 SRS。

**出口**：SRS 落盘 + §5 七项检查 + `SPEC_SOURCE` 更新 → 方可 `page-generator`。

### 安装与依赖

- `prototype-to-prd` **必须与 `prd-writer` 同装**（硬依赖 `../skills/prd-writer/references/`）
- Word 导出：三技能均共用 `../skills/common/export-word.*`
- `prototype-to-prd` **不可单独安装使用**

### 路由示例

✅ 用户：「把这个 Axure 文件夹转成 PRD」→ `prototype-to-prd` → `-原型盘点.md` → `prd-writer`

✅ 用户：「写 SRS 需求说明书，后面要开发」→ `req-doc`

✅ 用户：「我有个 App 想法，先写 PRD 对齐方向」→ `prd-writer`

✅ 用户：「根据现有前端代码更新需求说明书」→ `req-doc` 反向同步（非 prototype-to-prd）

❌ 用户：「写需求文档」→ 未路由直接写 `docs/*-PRD.md` 或 SRS

❌ 同一功能模块在 SRS 与 PRD 各写一套且未标注真源

❌ 用户：「PRD 写好了，开始实现」→ 未走 Step F 直接 `page-generator`

✅ 用户：「PRD 写好了，进开发」→ `req-doc` **Step F** → `delivery-plan` 或 `page-generator`

