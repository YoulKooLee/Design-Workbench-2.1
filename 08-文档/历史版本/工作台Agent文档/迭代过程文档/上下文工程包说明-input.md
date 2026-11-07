---
title: 上下文工程包说明
subtitle: 产品设计工作台 · _project-template 现行版（2026-09-25 更新后）
author: qwen
date: 2026-09-25
style: tech
abstract: |
  本文说明「上下文工程包」的设计原理、分层架构、执行流程与本次更新内容。

  工程包要解决三个真实痛点：过程性讨论污染需求文档、跨端开发失忆、上下文溢出。核心思路是一条装配公式——整个工程不必全部塞进上下文，执行时只聚焦「当前模块设计 + 总体/业务架构 + 模块间数据流」，模块完成即压缩，再进下一个。

  围绕这条公式，工程包用四层机制落地：常驻入口（AGENTS.md 6.5 KB）、三层装配（常驻基线 / 模块滑窗 / 按需检索）、技术强制（8 个 hook 注册点 + 7 条拦截名单）、写入侧纪律（三态门禁 + 基线三件套 + 模块快照）。本文所有体量数字均为 2026-09-25 实测值。
---

## 一、这套工程包解决什么问题

### 1.1 三个真实痛点

| 痛点 | 现象 | 工程包的对策 |
|---|---|---|
| 过程讨论污染规格 | 智能体把方案对比、试错、自己的推断一并写进 PRD，导致需求文档抓不住重点 | 写入侧三态门禁：`[事实]` 才可进基线，`[讨论]` / `[否决]` 只进过程层 |
| 跨端开发失忆 | 同一业务分 Web 与移动端，Web 做完换到移动端，前序决策全丢，只能重来 | 模块完成快照（≤300 字，含接口契约与跨端差异）入常驻基线，换端只读快照不读实现 |
| 上下文溢出 | 智能体遍历读技能库、组件库等大目录，单次调用即吞掉数十万 token | 路径级技术拦截（context-budget hook）+ 体量瘦身 + 按需检索分层 |

### 1.2 一条装配公式

整套机制的源头是一句话：

> 整个工程没必要全部塞进上下文，执行过程只需要聚焦当前模块设计方案 + 总体架构、业务架构 + 模块之间数据流，这个模块完成就压缩上下文做下个模块。

这句话被拆成三层可执行规则：**常驻基线**对应"总体架构 + 业务架构 + 模块间数据流"，**模块滑窗**对应"当前模块设计方案"，**按需检索**对应"整个工程没必要全部塞进"。

::: callout 设计取向
工程包不追求"让智能体记住一切"，而追求"让该忘的能被安全忘掉、该记的永远在文件里"。因此有一条贯穿全文的原则：**别指望压缩时被保住，让基线永远是文件，丢了按路径重读。**
:::

## 二、整体架构

### 2.1 四层结构

::: tech-flow
::: tech-node 常驻入口层
AGENTS.md 6.5 KB
每次会话必读，只写本工程独有的事实与约定
:::
::: tech-arrow
:::
::: tech-node 装配层
常驻基线 / 模块滑窗 / 按需检索
决定"这次装什么、装多少"
:::
::: tech-arrow
:::
::: tech-node 强制层
8 个 hook 注册点
把约定变成拦得住的技术门禁
:::
::: tech-arrow
:::
::: tech-node 记忆层
三态门禁 + 基线三件套 + 模块快照
决定"什么能留下、留在哪"
:::
:::

### 2.2 目录职责与体量

| 层 | 路径 | 职责 | 文件数 | 体量 | 常驻性 |
|---|---|---|---:|---:|---|
| 入口 | `AGENTS.md` | 本工程独有事实、分流规则、基线约定、读取地图 | 1 | 6.5 KB | 常驻 |
| 入口 | `CLAUDE.md` | 指针文件，指向 AGENTS.md 唯一真源 | 1 | 0.3 KB | 常驻 |
| 记忆 | `project-memory.md` | 过程层：决策记录、变更流水、任务进度（只放摘要+路径） | 1 | 2.2 KB | 常驻 |
| 技能 | `.agents/skills/` | 51 个技能，每个含 SKILL.md | 272 | 2.40 MB | 仅 INDEX 常驻 |
| 技能索引 | `.agents/skills/INDEX.md` | 技能名 + 触发词，会话启动注入 | 1 | 5.8 KB | 常驻（注入） |
| 知识 | `.agents/knowledge/` | 分阶段规范（需求/设计/开发/测试/约定/图表/UI库） | 47 | 205 KB | 按需 |
| 规则 | `.agents/rules/` | Agent 协作与工程规则（12 文件） | 12 | 51 KB | 按需 |
| 子 Agent | `.agents/agents/` | 18 个子 Agent 定义（审查、规划、需求撰写等） | 18 | 113 KB | 按需 |
| 门禁 | `.agents/hooks/` | 9 个 hook 脚本 + lib + 分发器 | 13 | 13 KB | 运行时 |
| 配置 | `.agents/settings.json` | hook 注册**唯一真源** | 1 | 2.9 KB | 启动读取 |
| 组件 | `src/component-templates/` | 组件真源，每个含 index.html + index.tsx | 393 | 1.46 MB | 禁止整目录读 |
| 业务规范 | `rules/`（根级） | 产品/原型业务规范（需求对齐、原型开发、评审、主题） | 47 | 436 KB | 按需 |
| 交付 | `templates/` | PACKAGING / 项目初始化 / PRD / 评审模板 | 9 | — | 按需 |

表: 工程包目录职责与实测体量（2026-09-25） {#tab-layout}

::: chart 各层体量分布（KB，对数感知） {#chart-size}
```json
{
  "tooltip": { "trigger": "axis", "axisPointer": { "type": "shadow" } },
  "grid": { "left": "3%", "right": "10%", "bottom": "3%", "top": "6%", "containLabel": true },
  "xAxis": { "type": "value", "name": "KB" },
  "yAxis": {
    "type": "category",
    "data": ["AGENTS.md", "hooks", "rules(.agents)", "knowledge", "agents", "rules(根级)", "component-templates", "skills"]
  },
  "series": [
    {
      "type": "bar",
      "data": [6.5, 13, 51, 205, 113, 436, 1495, 2460],
      "label": { "show": true, "position": "right", "formatter": "{c} KB" },
      "barWidth": "58%"
    }
  ]
}
```
:::

::: callout 体量与常驻的关系
图中体量最大的三层（skills 2.40 MB、component-templates 1.46 MB、根级 rules 436 KB）**全部禁止整目录读取**，只允许精确单文件访问；真正常驻的只有 AGENTS.md（6.5 KB）+ INDEX.md（5.8 KB）+ project-memory.md（2.2 KB），合计约 14.5 KB。这是"大库存在但不进上下文"的关键设计。
:::

### 2.3 会话启动时的装配链路

::: tech-flow
::: tech-node 宿主启动会话
读取 `.agents/settings.json`
:::
::: tech-arrow
:::
::: tech-node SessionStart hook
清理上轮状态文件（edited / read / review-called）
:::
::: tech-arrow
:::
::: tech-node 注入常驻内容
强制执行清单 + 技能索引 INDEX.md（5.8 KB）
:::
::: tech-arrow
:::
::: tech-node 注入项目上下文
AGENTS.md 全文（6.5 KB）
:::
::: tech-arrow
:::
::: tech-node 就绪
智能体凭索引匹配触发词，按需读单个技能
:::
:::

::: warning 生效前提
上述链路依赖宿主支持并加载 `.agents/` 钩子约定。当前 Claude Code / CodeBuddy 系宿主支持；WorkBuddy 宿主实测不加载（其配置文件无 hooks 段），此时全部 hook 不生效，AGENTS.md 的约束退化为纯文字。跨宿主使用前应先确认接线状态。
:::

## 三、装配原理：三层上下文模型

### 3.1 三层划分

| 层 | 装什么 | 何时装 | 体量取向 |
|---|---|---|---|
| 常驻基线 | 总体架构、业务模型、数据模型、模块间数据流、已完成模块快照 | 每次会话都在 | 只存**条目级摘要**，禁止全文灌入 |
| 模块滑窗 | 当前模块的 HLD / LLD、manifest 反查到的组件、上下游契约切片 | 进入模块时装、离开时卸 | 单模块级，用完即走 |
| 按需检索 | 技能正文、知识库规范、组件源码、业务规范 | 命中需求时精确读单文件 | **永不常驻** |

### 3.2 跨端不失忆的机制

::: tech-flow
::: tech-node Web 端开发
完成模块 A 的实现
:::
::: tech-arrow
:::
::: tech-node 闭环验收
数据流闭环判据通过（无孤儿数据、无凭空数据）
:::
::: tech-arrow
:::
::: tech-node 写快照
≤300 字：接口契约 + 跨端差异 + 关键决策
:::
::: tech-arrow
:::
::: tech-node 入常驻基线
快照成为基线的一部分
:::
::: tech-arrow
:::
::: tech-node 移动端启动
装配 = 基线（含 Web 端快照）+ 移动端滑窗
:::
:::

关键在最后一跳：移动端读到的是**接口契约与跨端差异**，不是 Web 端的实现代码。因此既不失忆，也不需要重读一遍 Web 端源码。

### 3.3 模块快照的固定字段

| 字段 | 内容要求 |
|---|---|
| 模块名 + 端 | web / mobile / both |
| 状态 | 已完成 / 进行中（完成度百分比） |
| 职责 | 一句话 |
| 对外接口 | 契约形式：输入实体 → 处理 → 输出实体，**不写实现** |
| 依赖模块 | 上游取什么数据、下游给什么数据 |
| 数据实体 | 本模块读写的实体名，与数据模型对齐 |
| 关键决策 | ≤3 条，只写结论 + 一句理由 |
| 跨端差异 | Web 已实现部分，移动端需注意什么 |
| 未完成 TODO | ≤3 条 |

表: 模块完成快照字段（总长 ≤300 字） {#tab-snapshot}

### 3.4 压缩闸门：给"模块完成"一个客观定义

"这个模块完成就压缩上下文"这句话，如果"完成"由智能体自报，等于没有门禁。工程包把闭环验收升级为闸门：

::: tech-flow
::: tech-node 数据流闭环验收
A 模块的输出都能被某模块接住
无孤儿数据、无凭空数据
:::
::: tech-arrow
:::
::: tech-node 才写模块快照
:::
::: tech-arrow
:::
::: tech-node 才允许压缩上下文
:::
::: tech-arrow
:::
::: tech-node 才进下个模块
:::
:::

闭环判据落在设计阶段的质量清单中，不由智能体自报完成。

## 四、技术强制层：hook 门禁体系

### 4.1 唯一真源与注册表

`.agents/settings.json` 是 hook 注册的**唯一真源**（本次更新已删除并存的 `hooks.json`，消除双配置分裂）。事件名统一 PascalCase，共 8 个注册点：

| 事件 | matcher | hook | 作用 |
|---|---|---|---|
| SessionStart | `*` | session-start | 清理上轮状态 + 注入强制清单与技能索引 |
| PreToolUse | `Edit\|Write\|MultiEdit` | config-protection | 阻止改 eslint / tsconfig 等配置来消除报错 |
| PreToolUse | `Edit\|Write\|MultiEdit` | gateguard | 首次编辑前检查是否已 Read 过，防盲改 |
| PreToolUse | `Read\|Glob\|Grep` | context-budget | 拦截高危目录的通配 / 递归 / 目录级读取 |
| PostToolUse | `Edit\|Write\|MultiEdit` | review-reminder | 代码改动后提醒调用 code-reviewer |
| PostToolUse | `Read` | gateguard | 记录已读文件，供后续编辑校验 |
| PostToolUse | `Agent` | review-tracker | 追踪本会话是否已执行审查 |
| PreCompact | `*` | pre-compact | 压缩前保存工作状态快照 |
| Stop | `*` | stop-quality-gate | 回复结束前检查 console.log 残留与审查合规 |

表: hook 注册表（`.agents/settings.json`） {#tab-hooks}

所有 hook 经统一分发器 `run.cjs` 调用：`node .agents/hooks/run.cjs <hookName>`，按参数动态加载同名 `.cjs` 并执行其 `run(input)`，有返回则输出 JSON 给宿主。

### 4.2 context-budget 的拦截判定

这是唯一管"读了什么、读多少目录"的护栏，7 条高危名单：

| # | 拦截目标 | 说明 |
|---|---|---|
| 1 | `.agents/skills/` | 技能库 2.40 MB，只许读 INDEX.md 与命中的单个 SKILL.md |
| 2 | `.agents/knowledge/` | 分阶段规范 205 KB，按阶段精确读 |
| 3 | `.agents/rules/` | 工程规则 51 KB，按需精确读 |
| 4 | 根级 `rules/` | 业务规范 436 KB，入口是 `rules/README.md` |
| 5 | `src/themes/` | 只需主题名时读 `theme.json` 的 name 字段 |
| 6 | `src/component-templates/` | 组件真源 1.46 MB，用 manifest 反查单组件 |
| 7 | `03-组件库/` | 工程外共享母版层，整目录禁止 |

表: context-budget 高危名单（7 条） {#tab-patterns}

判定流程：

::: tech-flow
::: tech-node 收到 Read / Glob / Grep
提取目标路径，反斜杠归一化
:::
::: tech-arrow
:::
::: tech-node 命中名单？
7 条正则逐一匹配
未命中 → 直接放行
:::
::: tech-arrow
:::
::: tech-node 是批量操作？
含通配符 `*?[]{}`
或 Glob/Grep 检索
或 Read 目标是目录
:::
::: tech-arrow
:::
::: tech-node 阻断并给指引
返回拦截原因 + 安全替代路径
:::
:::

::: tip 防误伤设计
三个条件全不满足（即**精确单文件 Read**）时直接放行。所以"读某一个组件的 index.tsx"永远合法，被拦的只有"整目录扫一遍"。这条设计让护栏可用而不至于阻碍正常工作。
:::

### 4.3 安全替代路径

| 想做的事 | 被拦的写法 | 正确写法 |
|---|---|---|
| 找合适组件 | 整目录 Read `src/component-templates/` | 查 `.agents/component-manifest.json` 反查单组件 |
| 找主题 | 递归读 `src/themes/` | 只读目标主题的 `theme.json` 取 name 字段 |
| 匹配技能 | 遍历 `.agents/skills/**/SKILL.md` | 读 session-start 注入的 `INDEX.md`，命中后只读那一个 |
| 查业务规范 | 整目录 Read 根级 `rules/` | 从 `rules/README.md` 入口按表精确读单个 guide |
| 查阶段规范 | 递归读 `.agents/knowledge/` | 按当前阶段读对应子目录下 1-2 个文件 |

## 五、知识路由：技能索引机制

### 5.1 为什么不遍历

`.agents/skills/` 实测 272 文件 / 2.40 MB，SKILL.md 正文合计约 44 万字符。历史上曾出现"技能正文全量约 400 KB"的错误自述，实测低估 8.3 倍——单个 `diagram-generator` 目录就接近百万字符。因此技能匹配必须有轻量入口。

### 5.2 索引链路

::: tech-flow
::: tech-node 生成
`build-skills-index.mjs` 解析各技能 frontmatter，生成 INDEX.md
:::
::: tech-arrow
:::
::: tech-node 注入
session-start hook 把 INDEX.md（5.8 KB）全文注入会话
:::
::: tech-arrow
:::
::: tech-node 匹配
智能体用索引里的触发词比对当前意图
:::
::: tech-arrow
:::
::: tech-node 加载
命中后**只读那一个** SKILL.md
:::
::: tech-arrow
:::
::: tech-node 兜底
没命中就用通用能力，并说明"本次未匹配到技能"
:::
:::

INDEX.md 已从 21.7 KB 瘦身至 5.8 KB（只保留技能名与触发词），使"注入即常驻"与"永不常驻"的表述不再冲突。

### 5.3 需求文档类的特殊路由

需求文档（PRD / SRS / 说明书）不走通用匹配，有专门的两步前置：

::: tech-flow
::: tech-node 识别需求文档任务
:::
::: tech-arrow
:::
::: tech-node 读 req-doc-workflow.md
按路由表选技能
:::
::: tech-arrow
:::
::: tech-node 读 prd-to-srs-gate.md
确认 PRD→SRS 转写门禁
:::
::: tech-arrow
:::
::: tech-node 再读命中的 SKILL.md
:::
:::

规则明确：**禁止跳过路由直接写文档**。若只有 PRD 而产出要交给别人接手，必须先走转写门禁，不得静默用 PRD 当规格真源。

### 5.4 子 Agent 的使用边界

| 适合 | 不适合 |
|---|---|
| 盘点取结论：把几十 KB 文件换成几 KB 结论清单，省一个数量级 | 审查：必须自己读改动点，实测派子 Agent 审查会返回截断、白花时间 |

子 Agent 不可用时（部分宿主只认自己的子 Agent 路径、读不到 `.agents/agents/`），按 `.agents/rules/agent-orchestration.md` 的「子 Agent 不可用时的自审兜底」章节自行审查。

## 六、记忆与写入侧纪律

### 6.1 三态门禁

病根在写入侧而非读取侧——读取分层再细，也拦不住过程讨论被写进 PRD。所以进基线前必须先归类：

| 标记 | 内容 | 去向 |
|---|---|---|
| `[事实]` | 客户原话 / 已签字需求 / 实测数据 | **可进基线**（PRD / SRS），并带来源标注 |
| `[讨论]` | 方案对比、试错过程、智能体推断 | **只能进过程层** `project-memory.md`「决策记录」小节 |
| `[否决]` | 被否方案 + **否决理由（必填）** | **只能进过程层**，压缩时理由必须保留一行 |

表: 写入侧三态门禁 {#tab-tristate}

`[否决]` 必留理由的原因很直接：否则失忆后智能体会重提已被否决的方案、重走一遍弯路。

另有一条硬规则：`[智能体补全待确认]` 不得作为规格真源。未经用户确认的补全内容若成为真源，会把智能体的推断固化成需求，后续所有开发都建立在未确认的假设上。

::: warning 当前性质
三态门禁目前是**纪律约定，写入侧无技术兜底**。现有 hook 中，context-budget 只管读取、gateguard 只检查"写前是否读过"、stop-quality-gate 只检查 console.log 残留——没有任何一个环节校验写入内容的分类。实测中出现过否决理由被写进功能清单的真实泄漏，靠执行者自查纠正。使用时需知悉这一边界。
:::

### 6.2 基线三件套与基线链

| 件 | 落盘路径（按需创建，不预置空文件） |
|---|---|
| SRS（需求规格，研发唯一真源） | `docs/01-需求与规划/*SRS*.md` 或 `docs/**/*需求*说明书*.md` |
| HLD（系统架构 + 数据模型） | `docs/02-架构与设计/*概要设计*.md` |
| LLD（逐模块实现） | `docs/02-架构与设计/*详细设计*.md` |
| 过程与索引 | `project-memory.md`（只放摘要 + 路径，不放正文） |

表: 基线三件套落盘路径 {#tab-baseline}

基线链的术语已锁定（SRS = 需求规格说明书，不翻转）：

::: tech-flow
::: tech-node 客户需求
:::
::: tech-arrow
:::
::: tech-node PRD
产品探索真源
:::
::: tech-arrow
:::
::: tech-node SRS
需求规格真源
:::
::: tech-arrow
:::
::: tech-node HLD
系统架构 + 数据模型
:::
::: tech-arrow
:::
::: tech-node LLD
逐模块实现
:::
:::

其中"系统架构 + 数据模型"是 HLD 的两个章节，引用既有规范文件，**不新建文档**（避免双份真源）。

每份基线头部登记版本号 + 变更时间 + 一句话摘要；**实现改变了基线事实必须回写，否则视为未完成**。

### 6.3 记忆去向判定

::: tech-flow
::: tech-node 产出信息
:::
::: tech-arrow
:::
::: tech-node 影响基线？
是 → 写入基线文档并更新索引
:::
::: tech-arrow
:::
::: tech-node 项目级可复用？
是 → `项目答疑手册.md`
:::
::: tech-arrow
:::
::: tech-node 工作台级可复用？
是 → `../../08-文档/工作台答疑手册.md`
:::
::: tech-arrow
:::
::: tech-node 全否
一次性操作 / 可从代码还原 → 不保存
:::
:::

无法判断去向时**主动询问人类，禁止自作主张**。

工程包刻意不新建 `DECISIONS.md` / `CHANGELOG.md` / `TASKS.md`：它们与压缩恢复检查表、答疑手册、基线版本登记高度重叠，两套进度记录并存会导致压缩恢复时不知以哪个为准。

## 七、压缩与恢复

### 7.1 压缩前：先归档再压缩

::: tech-flow
::: tech-node 压缩触发
PreCompact hook 或长会话自动摘要
:::
::: tech-arrow
:::
::: tech-node 记忆门禁三问
影响基线 / 项目可复用 / 工作台可复用
:::
::: tech-arrow
:::
::: tech-node 值得保留 → 落盘
写入对应记忆层并更新索引
:::
::: tech-arrow
:::
::: tech-node 无法判断 → 先问人
归档完成后才执行压缩
:::
:::

保留原则：**过程层可丢，基线层不可丢**；`[否决]` 压缩时必须保留理由一行。

### 7.2 压缩后：四项恢复检查

| # | 检查项 | 判定标准 | 异常处置 |
|---|---|---|---|
| 1 | 任务进度 | 有且仅有一个 in_progress 任务 | 无 → 回到上一条用户消息重新确认目标；多个 → 合并到当前主线 |
| 2 | 未完成改动 | 最近一次编辑的目标文件存在且内容与最后动作一致 | 丢失 → 用 git status 找回或告知用户；不符 → 重新读取 |
| 3 | 下一步计划 | 有明确文件路径 + 动作 + 验收方式 | 不明确 → 一句话复述计划并请用户确认 |
| 4 | 依赖上下文 | 相关规范已预加载或可按需重读 | 需要 → **只重读当前依赖的 1 个文件，禁止整库重读** |

表: 压缩后恢复检查表 {#tab-recovery}

恢复顺序固定为：先恢复"任务状态"（我在做什么）→ 再恢复"文件状态"（改到哪了）→ 最后确认"下一步"（做什么、怎么做、怎么验收）。

三条禁区：不重复已完成的工作、不擅自扩大范围、状态不确定时先问不猜。

## 八、执行流程：从需求到验收

### 8.1 原型探索主路径

::: tech-flow
::: tech-node 读上下文
:::
::: tech-arrow
:::
::: tech-node 需求对齐
问清一次
:::
::: tech-arrow
:::
::: tech-node 设计方向对齐
:::
::: tech-arrow
:::
::: tech-node 主规格草案
:::
::: tech-arrow
:::
::: tech-node 评审确认
:::
::: tech-arrow
:::
::: tech-node 实现
:::
::: tech-arrow
:::
::: tech-node 同步主规格
:::
::: tech-arrow
:::
::: tech-node 预览链接
:::
::: tech-arrow
:::
::: tech-node 验收
:::
:::

主规格不是空白起点：需求与设计完成第一轮对齐后再建草案。局部文案 / 样式 / 素材替换 / 明确 bug 修复可跳过正式对齐，但若改动改变了原型事实，仍需同步主规格。

### 8.2 先分流，再决定要不要停下来问人

| 情况 | 做法 |
|---|---|
| 方向已定，要尽快看到东西 | 先做出来再收敛；开工前把目标 / 范围 / 验收问清一次，之后不反复请示 |
| 方向会变：目标、范围、验收重点、信息架构、交互路径、视觉方向出现多种选择 | **停下来问人** |
| 范围会变：要加模块、要改数据模型 | **停下来问人** |
| 产出要交给别人接手 | 规格先行：SRS 是唯一真源；只有 PRD 时先走转写门禁 |

其余自己判断，**不要为了请示而请示**。

### 8.3 编码底线（读不到规范时的自判约定）

- 禁止改 `.eslintrc` / `tsconfig.json` 等配置来消除报错
- **新增原型页面必须同步注册路由**
- 避免 `console.log` 残留与裸写 `fetch`
- 其余风格按现有代码对齐
- 单文件建议 ≤600 行，超了按页面 / 职责拆——理由不是"人看着累"，而是**改动后要重读一次，太贵**

## 九、本次更新（2026-09-25）

### 9.1 瘦身成效

::: chart 常驻内容瘦身前后对比（KB） {#chart-slim}
```json
{
  "tooltip": { "trigger": "axis", "axisPointer": { "type": "shadow" } },
  "legend": { "data": ["更新前", "更新后"] },
  "grid": { "left": "3%", "right": "8%", "bottom": "3%", "top": "18%", "containLabel": true },
  "xAxis": { "type": "category", "data": ["AGENTS.md", "skills/INDEX.md"] },
  "yAxis": { "type": "value", "name": "KB" },
  "series": [
    { "name": "更新前", "type": "bar", "data": [35.0, 21.7], "label": { "show": true, "position": "top", "formatter": "{c}" } },
    { "name": "更新后", "type": "bar", "data": [6.5, 5.8], "label": { "show": true, "position": "top", "formatter": "{c}" } }
  ]
}
```
:::

AGENTS.md 从 35.0 KB 降至 6.5 KB（-81%），INDEX.md 从 21.7 KB 降至 5.8 KB（-73%）。瘦身方式不是删规则，而是**分层**：机制的"为什么"与预算推导移入 `.agents/rules/AGENTS-rationale.md`（18.1 KB，按需读取），AGENTS.md 只留执行所需的结论。

::: note 正本与派生关系
`AGENTS.md` 是**唯一正本**，新建项目时由面板从模板整体拷贝，项目初始即带该文件，不存在"由 template 再生成一次"的步骤。`AGENTS.template.md` 由 `build-agents-template.mjs` 从正本**单向派生**，只插入维护提醒与占位符，定位接近备份参考。因此改 AGENTS.md 即刻对新项目生效；跑生成器同步 template 是可选收尾动作，不是生效前提。当前两文件剥离插入块后正文逐字符相等，零漂移。
:::

### 9.2 修复清单

| # | 问题 | 修复动作 | 状态 |
|---|---|---|---|
| X1 | 双配置分裂：`hooks.json`（小写事件名，含 context-budget）与 `settings.json`（PascalCase，不含）互相矛盾 | 删除 hooks.json，settings.json 成唯一真源；5 个事件名全 PascalCase，context-budget 正确注册到 `Read\|Glob\|Grep` | 已闭环 |
| X2 | 拦截名单窄于文档禁区声明（3 处缺口） | 名单 6 → 7 条：新增 `src/component-templates/`；`03-组件库` 从"仅 vendor 层"改为父目录整拦；根级 `rules/` 从"仅 impeccable 子路径"改为主目录整拦 | 已闭环 |
| X3 | INDEX.md 21.7 KB 全量注入，与"永不常驻"表述冲突且有截断风险 | 瘦身至 5.8 KB，只留技能名 + 触发词 | 已闭环 |
| X4 | `build-all.js` 在 Windows 下 `spawnSync('npx', …)` 无 shell 无法启动，退出码 null | 加 `shell: process.platform === 'win32'` | 已闭环 |
| X5 | AGENTS.md L93 引用工作台层记忆缺相对前缀，从工程根解析断链 | 改为 `../../10-智能体记忆/BOOTSTRAP.md`，与同文件其他工程外引用风格统一 | 已闭环 |
| X6 | `session-context.md` 死文件：全工程 0 引用，内容仍是 Vue 3 + Element Plus 环境（与本工程 React 不符），且带 BOM | 删除该文件 | 已闭环 |
| X7 | "子 Agent 不可用时按 agent-orchestration.md 自行审查"引用落空，该文件无兜底内容 | 新增「子 Agent 不可用时的自审兜底」章节 | 已闭环 |
| X8 | 根级空壳 `skills-lock.json`（35 B）与 `.agents/skills-lock.json`（2.4 KB 真源）同名并存 | 删除根级空壳 | 已闭环 |
| Y1 | 写入侧门禁的工作台级去向 `../../08-文档/工作台答疑手册.md` 文件不存在 | 文件已放回 08-文档 根下，引用实测可达 | 已闭环 |
| Y2 | `compaction-recovery.md` 引用 AGENTS.md「上下文装配协议」章节与"常驻基线第 6 项"，瘦身后两者已删，模块快照落盘锚点丢失 | 改为指向现存锚点，该文件对 AGENTS.md 的章节引用清零 | 已闭环 |
| Y3 | 预算红线（40 / 120 / 113 KB）在 AGENTS.md 与 rationale 间归属不清 | 从 AGENTS.md 删除，rationale 保留为历史依据并加瘦身说明 | 已闭环 |
| Y4 | 模板携带 `settings.local.json`，含 31 条免确认权限（`curl:*` / `kill:*` / `chmod:*` / `bash:*`）+ `enableAllProjectMcpServers: true` + macOS 路径残留，每个新项目自动继承 | 精简至 22 条无副作用权限，删除高危通配与 MCP 自动信任开关，清除 macOS 残留 | 已闭环 |
| Y5 | 3 个规则文件带 BOM（`io.cjs` 不处理 BOM，未来任何 hook 读取即静默失效） | 清理 33 个文本文件 BOM，`.agents` 全量扫描 0 个 BOM | 已闭环 |
| Y6 | 双配置合一采用改名备份，`hooks.json.bak` 残留在 `.agents/` 根下 | 删除备份文件 | 已闭环 |

表: 2026-09-25 更新修复清单（X 系列来自模板审查，Y 系列来自更新后复验） {#tab-fixes}

### 9.3 AGENTS.md 现行结构

瘦身后只剩六章，全部是"本工程独有"的内容：

| 章 | 内容 |
|---|---|
| 一 | 本工程独有的事实（组件真源、反查方式、母版层、主题、预览入口、工程根构成） |
| 二 | 先分流，再决定要不要停下来问人 |
| 三 | 基线与实现：不规定先后，但收口时两者都要有且必须一致 |
| 四 | 技能与子 Agent |
| 五 | 原型探索路径 |
| 六 | 按需读取地图（永不常驻） |

表: AGENTS.md 六章结构 {#tab-agents}

设计原则写在文件开头：**只写三类内容**——本工程独有的事实、本工程独有的约定、上下文被压缩时该保住什么。通用工程能力（设计、编码、审查、写文档、调技能）交给智能体自己的判断和宿主自带能力，不必等这份文件的许可。

## 十、已知边界与遗留

::: clause-card risk-high 宿主接线决定护栏是否生效
全部 hook 依赖宿主加载 `.agents/` 钩子约定。实测 WorkBuddy 宿主的配置文件无 hooks 段，此时 context-budget、session-start 等 9 个脚本**一个都不运行**，技能索引不注入、预算不拦截，AGENTS.md 的约束退化为纯文字。跨宿主使用前必须确认接线状态，不能假设护栏在场。
:::

::: clause-card risk-medium 预算红线无字节级技术强制
context-budget 是**路径拦截器**（判断"读了哪个目录"），不含任何字节阈值。因此"常驻基线 ≤40 KB""单次装配 ≤120 KB"这类体量约束目前只是文档约定，没有技术手段阻断。一次实测中单个阶段装配达 172 KB，主因是规格产物全量回读——属必要质量动作，但现行机制既不拦也不记账。
:::

::: clause-card risk-medium 写入侧三态门禁纯靠纪律
如 §6.1 所述，没有任何 hook 校验写入内容的分类。已有真实泄漏案例（否决理由被写进基线文档），靠执行者自查发现。这是设计与实现之间的洞：文档认定"病根在写入侧"，但写入侧没有对应技术件。
:::

::: clause-card risk-low 其他遗留项
- Vibe vendor 双副本 8.40 MB（30 文件与 `02-模板/vendor` MD5 完全相同）：删除不可逆，待用户拍板。
- 3 个在役项目的 AGENTS.md 仍是旧版（无装配协议、无三态门禁）：按既有裁定"要用的时候再同步"。
- `settings.local.json` 仍随模板分发，`.gitignore` 未排除该项：剩余 22 条均为无副作用权限，风险已降至低。
- `_DSH-template` 已归档至 `08-文档/2.1更新文档/`，其改进已吸收进本模板；归档副本仍是修复前状态（`hooks.json` 尚存），复活前需重新核对。
:::

## 十一、使用指引

### 11.1 新建项目

面板从 `02-模板/_project-template` 整体拷贝（排除 `node_modules` 与 `.git`），项目初始即带 AGENTS.md 与完整 `.agents/`。新建原型页面后需运行 `node scripts/scan-entries.js` 重扫入口清单，否则面板中不出现该条目、预览路由 404。

### 11.2 修改规则时的动作

| 改了什么 | 必须跟着做 |
|---|---|
| `AGENTS.md` | 运行 `node .agents/scripts/build-agents-template.mjs` 同步派生模板（可选但推荐，避免副本过期误导） |
| 增删技能 | 运行 `node .agents/scripts/build-skills-index.mjs` 重生成 INDEX.md |
| 增删 `.agents/knowledge/` 下 .md | 同步 `catalog.json` |
| 新增禁区目录 | 同步更新 `context-budget.cjs` 的名单——**文档声明与技术名单必须一致**，两者错位就是溢出事故 |
| 新增规则文件 | 在对应 README / 索引表补一行 |

::: tip 一条反复验证过的教训
预算声明必须与实测一致，且禁令覆盖范围必须与工作流实际引导的目录一致。历史上两次溢出事故的根因都是这两者错位：一次是自述体量低估 8.3 倍，一次是禁令未覆盖工作流命令智能体去读的目录。改动后请重新实测，不要沿用旧数字。
:::

### 11.3 排查智能体行为异常时

先读 `.agents/rules/AGENTS-rationale.md`（讲"为什么这么设计"，日常执行不需要读）。三种情况该读它：要修改 AGENTS.md 的规则时、规则之间看似冲突需判断优先级时、排查智能体行为异常需理解设计意图时。

若怀疑护栏未生效，按此顺序确认：宿主是否加载 `.agents/settings.json` → SessionStart 是否注入技能索引 → context-budget 是否对目标路径产过拦截输出。文件存在不等于宿主已接线。
