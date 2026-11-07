# 规则索引（索引层）

> 先在这里定位，再读对应文件全文。**不要逐个打开 `rules/` 下的文件**。
> 增删 `rules/` 下文件后，同步本表。

## 工作流与交付

| 什么时候用 | 读哪个文件 | 一句话 |
|-|-|-|
| 画原型、走探索主链路 | `core-workflow.md` | 框架先行、按模块推进的五步主干 |
| 走研发主链路 | `development-workflow.md` | 需求 → 设计 → 实现 → 验收的主干顺序 |
| 判断本次交付要多严 | `delivery-modes.md` | 快速 / 标准 / 严格三档，分技能默认与升档规则 |
| 想查交付铁律与原则 | `work-principles.md` | 十条重要原则、五条交付铁律、基线链术语 |

## 上下文与记忆

| 什么时候用 | 读哪个文件 | 一句话 |
|-|-|-|
| 每次会话装什么进上下文 | `context-assembly.md` | 常驻基线 / 阶段滑窗 / 模块滑窗三层装配 |
| 动手前怕读爆窗口 | `context-budget.md` | 禁读清单、被禁目录实测体量、越界自检 |
| 上下文被压缩后 | `compaction-recovery.md` | 逐项检查表，全过才继续 |
| 信息该存哪一层 | `memory-gates.md` | 四层记忆、三问门禁、工作台记忆引用 |

## 技能与子 Agent

| 什么时候用 | 读哪个文件 | 一句话 |
|-|-|-|
| 任务开始先选技能 | `skill-routing.md` | 先匹配后动手、六类借口、同类技能裁决 |
| 派 / 编排子 Agent | `agent-orchestration.md` | 触发场景、协作流水线、模型路由、调用约束 |
| 子 Agent 何时强制调用 | `subagent-orchestration.md` | 强制调用场景，无「这次可跳过」的例外 |
| 发子 Agent 任务 | `spawn-subagent.md` | prompt 开头必须注入的强制指令 |
| 子 Agent 内要调技能时 | `subagent-stop.md` | 子 Agent 禁止触发技能，命中即停 |

## 编码、前端与 Git

| 什么时候用 | 读哪个文件 | 一句话 |
|-|-|-|
| 写或改代码 | `coding-conventions.md` | 只做被要求的事，不加需求里没有的效果 |
| 写前端页面 / 样式 | `frontend-conventions.md` | 按功能/模块组织，不按文件类型 |
| 查语言 / 安全 / 编码底线 | `write-safety.md` | 行数上限、禁 console.log、配置保护、语言与安全 |
| 提交、开分支 | `git-workflow.md` | Conventional Commits 与提交粒度 |

## 需求文档、原型说明与机制

| 什么时候用 | 读哪个文件 | 一句话 |
|-|-|-|
| 写需求说明书 / 选文档技能 | `req-doc-workflow.md` | 三体系路由表与选择规则 |
| 只有 PRD 却要转 SRS | `prd-to-srs-gate.md` | 转写门禁与步骤 |
| 写原型「设计说明」 | `design-notes-conventions.md`（真源 `src/common/design-notes/规范.md`） | 新页按 v3.0 接 DesignNotesPanel（打标→卡片→落盘），PrototypeLayout/description 仅旧页兼容 |
| 查 Hook 强制力与知识库维护 | `knowledge-and-hooks.md` | 8 个 Hook 真实强制力、无 Hook 兜底、catalog 维护、admin 实现规范 |

## 依据与结构

| 什么时候用 | 读哪个文件 | 一句话 |
|-|-|-|
| 想查规则依据 | `AGENTS-rationale.md` | 每条规则为什么这么定 |
| 查目录树与路径约定 | `project-structure.md` | 项目结构、路径别名、各层职责 |

## 低频与专项（2026-11-07 自 AGENTS.md §三 地图并入）

| 什么时候用 | 读哪里 | 一句话 |
|-|-|-|
| 画图（架构 / 流程 / 时序 / 思维导图） | `.agents/skills/d2-diagram/SKILL.md` | d2 渲染技能；旧机「08-办公/画图」目录在本机不存在 |
| SRS 语言与章节格式 | `.agents/knowledge/phase1-requirements/` | 需求文档写作口径 |
| 需求文档路由与 PRD→SRS 转写门禁 | `req-doc-workflow.md`、`prd-to-srs-gate.md` | 先路由再动笔 |
| UI 库参考（4 套，按 package.json 只读一套） | `.agents/knowledge/ui-libs/` | 禁整目录读 |
| daisyUI 语义类名组件（展示道具/主题用） | `src/component-templates/daisyui/README.md` | CSS 组件，非 React |
| 系统化调试四阶段全文 | `.agents/knowledge/conventions/debugging.md` | AGENTS §4.7 的展开 |
| Hook 真实强制力 / catalog 维护 / admin 实现规范 | `knowledge-and-hooks.md` | 8 个 hook 的兜底口径 |
| 子 Agent 编排与调用标准 | `subagent-orchestration.md`、`agent-orchestration.md`、`spawn-subagent.md`、`subagent-stop.md` | 当前停用筛选期，未经用户点名不得调用 |
| 项目结构与路径约定 | `project-structure.md` | 目录树与别名 |
| 全部「为什么这么定」 | `AGENTS-rationale.md` | 规则依据 |
| 维护者须知（写规则 / 迁移判据） | `../templates/project-init.md` | 模板维护 |
