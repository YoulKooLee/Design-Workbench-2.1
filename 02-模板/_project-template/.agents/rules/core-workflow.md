# 核心工作流（框架先行 · 按模块推进）

> 位置：`.agents/rules/core-workflow.md` ｜ 读取层：按需 Read
> 2026-10-30 用户定调重写：原型任务按「框架 → 模块」推进。
> 依据：**上下文窗口是硬约束**，一次装不下整套产品；先把结构定下来，再按模块装配、验证、回写。

## 一、主干五步

```text
① 需求与功能设定
② 框架方案推荐
③ 用户确认框架 → PRD + 系统架构 + 数据模型（初稿）
④ 按模块循环：模块需求确认 → 原型确认与模拟验证 → 回写基线
⑤ 原型完成后转写 SRS
```

### ① 需求与功能设定

- 用户想做什么、边界在哪、什么算完成。
- 产出：一段能被复述的功能设定（做什么 / 不做什么 / 谁用 / 验收看什么）。

### ② 框架方案推荐

- 给 2–3 个结构方案（信息架构 + 主流程 + 页面骨架），讲清取舍。
- **成熟品类 / 有开源实现的**：直接产出三件给用户看，不要停留在文字讨论——
  ① **架构图**（分层与模块关系）
  ② **可运行原型**（能点、能走主流程）
  ③ **文字描述**（做什么、怎么用、取舍在哪）
- **第一手段是模型自身的知识**：常见品类（电商、CRM、OA 审批、报表看板、内容/漫剧平台、工单、门店管理等）不必先搜，直接做出一版成品原型通常比讨论更快；自己拿不准时再找开源实现参考，**找不到就自己做**。
- 需要停下来问：目标、范围、验收重点、信息架构、交互路径、视觉方向出现会改变产出方向的多种选择。

### ③ 确认框架 → 三件初稿

| 要写 | 落盘 | 说明 |
|-|-|-|
| PRD | `docs/**/*-PRD*.md` | 产品探索真源 |
| 系统架构 | `docs/02-架构与设计/*概要设计*.md` 的架构章节 | 分层 / 模块清单 / 模块依赖 |
| 数据模型 | 同上「数据模型」章节 | 实体 + 关系 + 关键字段 |

- 初稿即可，允许在 ④ 里反复改；**改了必须回写**。
- 此阶段不写 SRS：SRS 是 ⑤ 的产物，由 PRD 转写并过门禁。

### ④ 按模块循环（主战场）

```text
确认本模块需求 → 原型确认与模拟验证（可能来回多轮）→ 回写 PRD / 架构 / 数据模型 → 下一个模块
```

**模块粒度由上下文预算决定，不由页面数量决定。**
AI 自己规划：一个模块 = 一次装配装得下、一次能验完的范围；并**随窗口占用实时调整**——装不下就拆小，太碎就合并。某个功能反复修改也会把窗口顶满，此时按 `.agents/rules/context-assembly.md` 的滑窗重装配，或开新会话接续（先落盘再接）。

**模拟验证 = 按真实业务顺序走一遍**，只看两个判据：

1. **流程闭合**：每个动作点下去，状态或数据是否**真的变了**；有没有走不通的分支。
2. **数据一致**：同一条数据跨页是否同源；汇总数与明细是否对得上。

> 只检查「有没有这个页面」「路由通不通」**不算验证**。

**主规格**：本模块原型的方案依据是 `src/prototypes/<slug>/.spec/spec.md`（或 `.html`，同时存在以 HTML 为准）；确认与变更都落在它上面。它**不是** PRD / SRS / HLD / LLD，也不对外交付。

**上下文滑窗**：进入模块时按 `.agents/rules/context-assembly.md` 装配（常驻基线 0–6 + 模块滑窗 7–9），离开即卸载；单次装配 ≤ 120 KB，超限**阻断并压缩**，不允许「继续但注意」。

### ⑤ 转写 SRS

- 原型定稿后按 PRD→SRS 门禁转写：`req-doc` Step F / `.agents/rules/prd-to-srs-gate.md`。
- SRS 落地后 `SPEC_SOURCE=SRS`；`page-generator` 等研发技能**不得**以 `*-PRD.md` 为规格真源。

## 二、阶段确认表

| 阶段 | 继续前必须确认 | 参考 |
|-|-|-|
| 需求与设定 | 目标用户、核心任务、范围、功能清单、内容来源、验收重点 | `rules/requirements-alignment-guide.md` |
| 框架方案 | 信息架构、主流程、页面骨架、关键取舍、视觉方向 | `rules/requirements-alignment-guide.md` |
| 模块实现 | 本模块需求 + 该模块主规格已确认 | `rules/prototype-development-guide.md` |
| 转写 SRS | PRD 已定稿、转写门禁通过 | `.agents/rules/prd-to-srs-gate.md` |

## 三、可选阶段（验收后按需）

```text
Review（可选）→ 标注（可选）→ 发布（可选）
```

- 三个阶段可按任务需要独立进入；Review 发现问题时回到主规格、实现与验收闭环。
- 原型标注 `$prototype-annotation`；批注处理 `$handle-comments`（不属于原型标注阶段）。

## 四、不适用主规格流程的产物

- **主题 / 设计系统 / 设计规范**：`$build-design-system`（`rules/theme-guide.md`）
- **项目资料、文档、素材、画布**：`rules/resource-management-guide.md`

## 五、额外产物与 Make 链接信号

| 产物 / 场景 | 位置 | Make 信号 | 参考 |
|-|-|-|-|
| 原型 | `src/prototypes/<prototype-id>/` | `?p=<prototype-id>`；`&spec=1` 对应 `.spec/` | `rules/prototype-development-guide.md` |
| 主题 | `src/themes/<theme-key>/` | `?theme=<theme-key>` | `rules/theme-guide.md` |
| PRD | `docs/`（副本进 `src/resources/`） | `?doc=<resource-path>` | `$write-prd` |
| 资料 / 画布 | `src/resources/`；画布在原型目录 `canvas.excalidraw` | `?doc=<resource-path>` | `rules/resource-management-guide.md` |

Make 管理端默认 `http://localhost:53817/`；`check-app-ready` 返回 `serverUrl` 时以实际值为准。
