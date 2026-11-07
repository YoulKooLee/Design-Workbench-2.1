# 项目记忆

> 本项目专属记忆。**优先级最高**：与工作台通用规则（`10-智能体记忆/rules/`）冲突时，以本文件为准。
> AI 在本项目内开发时，先读本文件再动手；日常踩坑先记入「二、项目经验」，不急着进 `10-智能体记忆/rules/`。
>
> ⚠️ **本文件是上下文衰减的兜底**：`AGENTS.md` 只在会话首轮注入一次，压缩**不会**把它带回来（2026-10-15 实测）。
> **读到本行 → 顺手确认一次 `AGENTS.md` 是否还在上下文里**；不在就 Read 一次它和 `.agents/skills/INDEX.md`。（触发条件是「读到本行」这个动作，不是「想起它不在」——后者不可能发生。）
> **每个模块闭环后立即写快照**——压缩只保留「做了什么动作」，**不保留「看到了什么」**（工具结果正文 99.5% 被丢弃）。
> **会话别开太长**：按模块 / 阶段新开会话，是让 `AGENTS.md` 重新注入的唯一办法。

## 一、项目画像

- **定位**：厦门翔安南部新城园区的**公寓租赁 + 园区运营一体化数字化平台**，覆盖「找房 → 签约 → 入住 → 出账收款 → 报事维修 → 续退换房 → 商户结算」全链路，多端（微信小程序租客/商户/管家 + Web 管理端）。原型共 18 个模块、198 个页面，其中**126 个为有效页面**（72 个标注「初稿-无视」已排除）。
- **功能需求**：
  - 业务域 8 个、模块 42 个：D1 空间与产品配置 / D2 营销与获客 / D3 合同与签署 / D4 租务运营 / D5 财务结算 / D6 物业与工单 / D7 园区运营与商户 / D8 身份与权限
  - 核心实体 68 个，物理表 91 张；状态机 18 个；计算口径 28 条（集中定义，禁止各页面自算）
  - 文档基线（`docs/`）：
    - `00-总体/翔安南区新城-业务架构与数据架构说明-V1.0.md`（业务域/实体/数据契约/闭环校验）
    - `00-总体/翔安南区新城-原型盘点-V1.0.md`（126 页面清单，79 小程序 + 47 Web）
    - `01-需求与规划/翔安南区新城数字化平台-PRD-V1.0.md`（产品探索真源，**不得驱动研发**）
    - `01-需求与规划/翔安南区新城数字化平台-SRS需求规格说明书-V1.0.md`（**规格真源 SPEC_SOURCE**）
    - `02-架构与设计/翔安南区新城数字化平台-概要设计-HLD-V1.0.md`（服务划分/接口组/技术选型）
    - `02-架构与设计/翔安南区新城数字化平台-详细设计-LLD-V1.0.md`（类设计/18 状态机/91 表/29 接口组）
  - 7 项阻塞待确认 Q1~Q7（门锁水电表接口、市政大管家、CA 服务商、内网中台 SSO、押金监管、停车费归属、商户结算含税）
- **设计风格**：
  - 项目本身是**工程文档 + 原型工程**，无独立视觉稿；原型工程为 Axhub Make 客户端（React 18 + Vite + Tailwind CSS 4 + TS），页面统一用 `src/common/PrototypeLayout` 承载「页面结构 / 编写规范 / 需求说明」三段式
  - 文档风格：中文、表格化、结论先行；禁用布局位置词与 UI 组件名（`prd-language.md`），需求文档只描述业务行为
- **开发规范**：
  - 目录契约：`src/prototypes/` 原型页面、`src/themes/` 主题、`src/resources/` 资源、`docs/` 全部文档
  - 规则分层：`rules/` 产品与原型规则、`.agents/rules/` 智能体协作与工程规则、`.agents/knowledge/` 知识库
  - 需求链门禁：原型 → `prototype-to-prd`（先盘点）→ `prd-writer` → SRS（`req-doc` Step F）→ 才可出 HLD/LLD；研发链路只准以 SRS 为真源（`prd-to-srs-gate.md`）
  - 改完需求文档必须执行**禁用词扫描**，不通过不得报告完成
  - 文档粒度：HLD 只到模块/实体/接口组，不得下沉到字段与单接口；LLD 才写六列字段表与请求响应
- **技术约束**（HLD/LLD 已锁定，属设计建议，最终以研发团队确认为准）：
  - 架构：模块化单体（8 域分包）+ 独立任务进程；不上微服务、不上分布式事务、不上工作流引擎
  - 后端 Java 21 + Spring Boot 3 + MyBatis-Plus + MySQL 8.0 + Redis 7 + RocketMQ + MinIO
  - 前端 微信原生小程序 + TS；Web Vue 3 + TS + Vite + Element Plus + ECharts
  - 硬约束：金额全程整数「分」；外部调用不得在事务内；派生数据（房态/统计）只允许单一写入方；统计与分页解耦；数据范围服务端推导；审计表禁删


## 二、项目经验

> 本项目踩坑记录，一条一组。格式：`日期 | 场景 | 根因 | 修复 | 验证`。
> 判定可跨项目复用时，提炼为工作台层规则（`10-智能体记忆/rules/`）（scope: universal/workspace）并在「三、结项状态」登记规则 id。

- 2026-10-26 | 从 16.9MB 原型 HTML 提取 PROTO_DATA 做页面盘点 | 首次遍历只拿到 44 页，漏掉 82 页 | `walk()` 里对 `kind==='page'` 提前 `return`，导致 page 节点的子节点未被递归 | 去掉提前返回，递归与「是否收录」判断解耦；`req` 字段 HTML→Markdown 后按 `/初稿-无视/` 过滤 | 复跑得 126 页 / 114110 字，与原型页面树逐层核对一致 |
- 2026-10-26 | 用 `node -e "..."` 在 bash 里内联写含反引号的 JS | `unexpected EOF while looking for matching '`'` | bash 对模板字符串反引号做了命令替换 | 改成先 Write 成独立 `.mjs` 文件再 `node` 执行 | 脚本正常产出 |
- 2026-10-26 | SRS 首版含 15 处「左侧/右侧/顶部/底部/卡片/面板/隐藏/标橙」 | 写文档时直接照抄原型描述，未过语言门禁 | 全部改写为业务表述（如「顶部展示警示条」→「展示超期警示」、「标橙标红」→「预警级/紧急级」） | 禁用词扫描复跑仅剩业务语义词（标记/时间线），零布局与视觉词 |
- 2026-10-26 | 架构文档「68 个核心实体」与物理表数量对不上 | 原实体清单是业务枚举，未含营销规则、审批实例、审计队列等支撑实体 | 在 LLD 明确三类调整（合并四类内容为 `contents`、补强支撑实体、拆解签署任务与房源），并列出 91 张表全清单 | HLD/LLD 与业务架构文档可互相追溯，无「凭空表」也无「漏表」
- 2026-10-26 | 新建原型页只用 `import type` 引入 React，浏览器报「React is not defined」白屏 | 本工程 JSX 走 classic runtime（`React.createElement`），不是 `react-jsx`，`sample-page` 里显式 `import React` 就是这个原因 | 所有含 JSX 的文件改为 `import React, { ... } from 'react'` | 三页截图全部正常渲染 | |

## 三、过程层（T1 落地 · 压缩可丢 · 永不进基线）

> 以下三个小节为**过程层**：讨论、试错、被否决方案、任务进度等**不得写入基线**（PRD/SRS），一律落在这里。
> 压缩时可丢，但 `[否决]` 条目**必须保留理由一行**。写入规则见 AGENTS.md「写入侧三态门禁」。

### 决策记录（过程层·压缩可丢·永不进基线）

> 一条一组，格式：`日期 | [类型] | 决策 | 理由 | 状态(采纳/否决/挂起)`。类型 ∈ `[决策]` `[修复]` `[风险]` `[安全]`；否决必填理由。

- 2026-10-26 | [决策] | 采用模块化单体（8 域分包），不上微服务 | 用户规模小（386 人 / 200 QPS 峰值）而合同-账单-房态是强事务链，拆微服务会把本地事务变分布式事务，收益为负 | 采纳
- 2026-10-26 | [决策] | 房态用「物化快照 + 事件驱动重算」而非实时计算 | 房态是合同/订单/账单/工单/人工锁定五源派生，实时算成本高且必然漂移；快照保证房态图 1.5s 内出 | 采纳
- 2026-10-26 | [决策] | 计价引擎做成纯函数（不读库、不取系统时间） | 同一价格在详情/下单/账单三处出现，曾出现口径不一；纯函数可单测、可复算、可对账 | 采纳
- 2026-10-26 | [决策] | 审批不引入 Flowable 等工作流引擎，自研状态机 + 配置化审批链 | 审批链只是「固定节点 + 条件加签 + 或签会签」，引擎学习与改造成本高于收益 | 采纳
- 2026-10-26 | [决策] | 四类内容（公告/动态/活动/政务）合并为一张 `contents` 表 + 类型区分 | 原型曾把「园区活动」误当「园区动态」的分类，说明边界本就模糊；合并后发布流程/有效期/置顶/阅读数全部复用 | 采纳
- 2026-10-26 | [决策] | 3 处「凭空数据」（门锁台账、水电表读数、清洁派单）采取「内置兜底 + 接口预留 + 可替换执行器」 | Q1/Q2 外部系统未确认，但系统必须在无外部系统时也能跑通业务闭环，且外部就绪后不改模型 | 采纳
- 2026-10-26 | [否决] | 不用分布式事务框架（Seata AT 模式） | 本地事务 + 事务性发件箱 + 补偿已足够；AT 模式会引入全局锁与额外故障面，团队也无运维经验 | 否决
- 2026-10-26 | [决策] | 参考原型定性为「别人的原型，仅作参考」，需求重新梳理、原型重做；交付物改以《需求基线 V2.0》为准 | 用户明确原型要重做，V1 的 SRS/LLD 是逆向别人的原型，页面级结论不再作数 | 采纳（V1 PRD/SRS 已加失效横幅，LLD 暂停）
- 2026-10-26 | [决策] | 业务规则一律表述为「配置项 + 默认值 + 生效口径」，不写死数值 | 参考原型的押金/超时费阶梯/审批链/折扣/日租溢价全部是配置页，V1 误当硬规则；写死会导致原型重做时按错误前提设计 | 采纳
- 2026-10-26 | [决策] | 房态拆成「主态（空置/预定/待入住/在住/待清洁/停用）+ 角标（门锁/欠缴/维修/待退宿/待换房）」；业态（长租/日租）单列字段，只用于「长租中/日租中/临期」统计 | 原型把账单并进房态，导致「在租但欠费」无法表达；账单只应作角标；业态混进主态会让同一房间既是「长租中」又要表达「日租待入住」 | 采纳
- 2026-10-26 | [决策] | 参考原型中打勾（✓ / # / !）的 51 个页面视为「已开发页面」，作为新原型的一致性基线，操作与弹窗逐条登记、逐条核销 | 用户明确要求打勾页尽量保持一致、不许遗漏；此前只按页面清单建页，导致「页面画了、按钮少了」（合同缺编辑/催签/审批/转租赁/作废） | 采纳（基线文档已建）
- 2026-10-26 | [决策] | 报事由「申请单 + 工单」两张单合并为一张单 + 内部阶段 | 原型两张单状态不同步，租客无法判断以哪张为准；内部作业信息用字段可见性控制即可 | 采纳（推翻 V1 的 PD-10）
- 2026-10-26 | [决策] | 不实现「逾期自动锁门」，改为提醒 → 管家确认 → 门禁权限降级 | 欠租直接锁门等于剥夺居住权，有法律风险 | 采纳
- 2026-10-26 | [决策] | Web 后台由「园区服务 / 公寓管家管理」两分改为六分（运营工作台/租务/财务/园区运营/配置/统计） | 原两分法导致长租账单管理、财务账单管理、费用账单三页重复且口径各异，对账必错 | 待用户确认
- 2026-10-28 | [否决] | ~~后台左侧升级为 `common/side-menu` 全量目录（Web 43 + 租客 27 + 管家 22 = 92 页）、Make 宿主侧栏与壳内目录双载体并存~~ | 用户随后否定：原型壳本来就有自带页面菜单，不该在壳内重复建设；全量清单应放在 Make 框架外侧「原型」侧栏。壳内导航已回滚为手写 NAV，落地见流水末两条 2026-10-28 纠正/新增 | 否决
- 2026-10-28 | [决策] | 离线评审包采用「复用真实 React 组件的可交互应用」而非静态截图；独立 `vite.export.config.ts`（singlefile）隔离主 MPA 配置；文档走本地受控 md→HTML、流程图用真实 PNG 内联 + 自研查看器，不新增 marked/mermaid 等运行时依赖 | 用户拍板：可交互真实应用、只做核心页+四份主文档、左树右正文、内部评审/离线存档；兼顾体积、file:// 稳定性与零联网 | 采纳

### 变更流水（过程层·压缩可丢·永不进基线）

> 一条一组，格式：`日期 | [类型] | 变更 | 触发人 | 影响范围`。`[敏感]` 条目只口头说明，不写在这里。

- 2026-10-26 | [新增] | 建立 `docs/` 文档基线：业务架构与数据架构说明、原型盘点、PRD、SRS、HLD、LLD 共 6 份 | 用户 | 新建 `docs/00-总体`、`docs/01-需求与规划`、`docs/02-架构与设计` 三个目录 |
- 2026-10-26 | [修复] | SRS 与 PRD 共 16 处布局/视觉类表述改为业务表述 | 用户（要求按 prd-language 规范） | SRS §3.5.x、§3.6；PRD §五 |
- 2026-10-26 | [修复] | 合同签约页按参考原型 n075 重构：13 列（新增签署进度/待审批人/经办人/来源/更新时间）、8 类行操作、6 个弹窗（新增编辑/审批/转租赁/作废/详情四页签/验签） | 用户（指出缺编辑、催签、审批、转租赁、作废） | `src/prototypes/xanan-contract/` 由 260 行扩到 4 个文件约 1200 行
- 2026-10-26 | [修复] | 房态图补 10 组条件筛选、7 项统计格、5 项角标图例、5 个房间卡操作（办理入住/锁定/设为可租/欠缴锁门/临时恢复） | 用户（要求按打勾页核对不留遗漏） | `src/prototypes/xanan-room-status/` 重写，data 增加业态/面积/朝向/配套/门锁/工单字段
- 2026-10-26 | [新增] | 新建 W-104 预约看房管理：5 项筛选、9 列、详情一页多态（7 状态）、4 个子弹窗（确认/拒绝/变更/提交结果，含「提交并生成合同」） | 用户（要求继续推进） | `src/prototypes/xanan-viewing/`，已注册到 Make 工程 |
- 2026-10-26 | [新增] | 建立《已开发页面操作对照基线 V1.0》：51 个打勾页逐页登记操作与弹窗 | 用户 | 新增 `docs/01-需求与规划/翔安南区新城-已开发页面操作对照基线-V1.0.md`，并把 `对照基线` 加入 docs 同步规则 |

- 2026-10-26 | [修复] | 原型由「4 个独立原型各一套数据」改为「单入口多页面 + 全域同源」：`common/xanan/domain.ts` 统一 134 间房/64 份合同/192 张住宿账单/46 单日租/26 条预约/32 张工单等，`?page=` 路由打通三端 70 页 | 用户（反馈「功能太碎片化，不好测试」） | 新增 `xanan-web`/`xanan-mp`/`xanan-staff`/`xanan-index`，旧 4 页保留但不再作为主入口
- 2026-10-26 | [修复] | 全量自测修 26 处问题：工单类型与描述错配、预租「预留到期」误取 updatedAt、折扣平均写成 87.6 折、运营配置单位一律「小时」、欠费按房间合并时把逾期天数压成 12 天、退房办理默认房号不在下拉选项、管家端房间详情「不展示催缴入口」却仍显示催缴、日租预订 2 晚却用「满 3 晚」券等 | 自查（逐页截图 + 类型检查） | 三端各页
- 2026-10-26 | [新增] | 管家端补「合同生成及核对」`contract-review`（12 项变量核对 + 异常项标红 + 正文预览）与「合同详情」`contract-detail`（要素/收付款节点/审批签署记录/附件），51 个打勾页至此全覆盖 | 自查（对照基线发现 21、22 两页缺页） | `xanan-staff` 17 → 19 页，`xanan-index` 与 `.axhub/make/project.json` 同步页数

- 2026-10-27 | [决策] | 用户选「B 档」：补齐流程节点页 + 最小状态机（localStorage），要求流程能从头点到尾并留痕，而非只做静态页面 | 用户（"按B档修复，修复完成再核验一遍流程"） | `common/xanan/flow.ts`
- 2026-10-27 | [新增] | 新建 flow.ts：7 类实体状态 + 操作日志，只存变化量、初始态来自 domain；新增 `xanan-flowcheck` 自测页，18 条断言全绿 | 自查 | 三端共用
- 2026-10-27 | [修复] | 补齐 8 个流程节点页（mp view/sign/retire/prepay/pay、staff retire、web w-viewings/w-contracts/w-bills/w-room-status），并把旧 4 个独立原型移出导航 | 用户流程图核对（11 个节点无实现） | 三端
- 2026-10-27 | [修复] | 流程断点闭环：带看结果三岔、租客在线签字、管家审核签字、打回重签、两级审批真实推进、审批通过自动归档+房态转待入住、退租受理与沟通驳回、欠缴拦截、退房联动房态 | 自查（逐页截图 + 走查页断言） | 三端
- 2026-10-27 | [功能] | 新增设计说明评审台：`xanan-index?tab=doc` 三栏（side-menu 页面目录 208px / iframe 原型 / DesignNotesPanel 逐页说明 395px），80 页 175 条说明，目录与原型双向同步（点目录切页 + iframe 内跳转回写高亮）；原 8 章长文迁到 `tab=doc-overview` | 用户需求 | 完成
- 2026-10-27 | [风险] | A14 照片类凭证未单列上传位；C10 押金不足未自动生成补缴账单；鉴权未模拟（按钮权限只做文案标注） | 自查 | 待甲方口径
- 2026-10-27 | [修复] | 按钮动作全量补齐：新增全局动作总线（toast/confirmAct/formAct/detailAct/exportCsv）+ `ListPage.detailRef`，11 个 Web 页面 + 小程序 + 管家端共 90 余处补齐；`RowActs` 只写 label 不写 on 是「操作列点不了」的根因（74 项中 56 项未绑） | 用户（"很多按钮点不了，尤其是列表操作列"） | `common/xanan/ui.tsx`、`ListPage.tsx`、`Shell.tsx`、`mobile.tsx`
- 2026-10-27 | [纠正] | A14 归属纠正：照片/水电勾选项实际位于 `w-checkout` 的「验房记录」步骤，`w-checkin` 无验房步骤；C10 本质为 `refund = max(0, deposit - deduct)`，应扣超押金时超出部分直接消失、不生成补缴单 | 自查（逐步骤截图核对） | 待定方案
- 2026-10-27 | [纠正] | 页面目录落位：目录树真源从 `ReviewBoard.buildMenu()` 迁到 `src/common/side-menu/xanan-menu.ts`（`XANAN_MENU` 6 业务模块 + 2 移动端 / 17 分组 / 80 页），`side-menu` 的 `DEFAULT_ITEMS` 直接指向它，默认展开六个业务模块并补「展开/收起全部目录」；移动端页面清单上移到 `common/xanan/pages.ts`，`design-notes/catalog.ts` 改 re-export | 用户（"改 side-menu 目录本身，与原型目录结构一致"） | 43 路由冒烟 BAD=0，tsc 翔安零错误
- 2026-10-27 | [架构] | 目录上移到 **Make 宿主层**：`.axhub/make/project.json#resources.prototypes[].pages[].group`（连续同 group 自动合并成可折叠二级分组，`paddingLeft=8+depth*8`）+ `sidebar-tree.json#prototypes` 决定侧栏顶层，收敛为 5 项（流程走查/原型总览/租客端 22 页·4 组/管家端 20 页·6 组/管理后台 38 页·6 组）；原型内不再自建目录 | 用户（"左边是 make 客户端 side-menu，中间是原型，右边是设计说明"） | 备份 `project.json.bak-20261027`、`sidebar-tree.json.bak-20261027`
- 2026-10-27 | [新增] | 新增 `src/common/xanan/route.ts`：`routeParams()`（hash 优先合并 search）/`readPageKey()`/`readQuery()`/`usePageKey()`（监听 hashchange+popstate）。Make 用 `#page=` 切页且 **iframe 不重载**，三个入口必须改用 `usePageKey` | 自查（点宿主侧栏中间内容不动） | web/mp/staff 三个 index.tsx
- 2026-10-27 | [改造] | 设计说明下沉到页面壳：`Shell.tsx` 右侧主区改 flex（内容列 + `DesignNotesPanel`），`mobile.tsx#PhoneFrame` 按路径前缀认端（`xanan-staff`→`staff:`、`xanan-mp`→`mp:`）挂同一面板，80 页 175 条说明全复用；删掉侧栏底部「原型设计说明」入口与 `xanan-index` 的整屏评审台分支（`TabKey` 去 `'doc'`） | 用户（"每一功能页都有对应的设计说明"） | 三端逐页
- 2026-10-27 | [清理] | 旧 4 原型 `xanan-billing/contract/room-status/viewing` 移入 `src/prototypes/_archive/`（`../../common`→`../../../common` 修 14 处），`WorkbenchPages.tsx` 3 处旧跳转改指 `w-contracts`/`w-viewings`；entries 重建 117 js/117 html | 自查 | Make 工程现仅 5 个原型
- 2026-10-27 | [诊断] | 联动单向根因：make 客户端读 iframe 当前页用 `contentWindow.location.href`，**必须同源**；iframe(5199) 与宿主(53817) 跨源 → `SecurityError`，侧栏无法获知原型内换页。`acp.navigation.changed` 消息只写导航记忆，不改选中 | 用户（"原型不能联动 make 端目录"） | 三方案待用户选
- 2026-10-27 | [改造] | `DesignNotesPanel` 固定贴右：`.dn-right` → `position:fixed; right:0; height:100vh; z-index:40`（低于 Drawer 的 60），导出 `NOTES_PANEL_WIDTH`；新增 `moduleTrail`/`pageId` 标头；`Shell` 与 `PhoneFrame` 各留 360px 右边距（移动端由居中改「留右 + 剩余居中」） | 用户（"说明固定右侧贴边，移动端也要"） | 三端实测 gapRight=0 / height=vh
- 2026-10-27 | [新增] | `pageLocation()`/`allLocations()`/`noteCountOf()`/`isFallbackNote()` + `Coverage.tsx` + `refParity.ts`：原型总览新增「说明覆盖核对」页签（81 页/180 条/待补 0/对照 0-37-7），每页标端·模块·分组·page key·说明条数与参考差异 | 用户（"说明没标识模块，无法核对遗漏"） | 数据由 4 子代理逐页比对 44 页生成
- 2026-10-27 | [新增] | `w-access` 门禁管理页：四项概览 + 权限配置（新增/延期30天/撤销/重新授权，状态按有效期推导）+ 开闭记录（拒绝标红）+ 异常告警（转工单/标记已处理）；`w-room-status` 重做为楼层视图+八格统计+五类角标+十类筛选+卡片四动作+侧滑详情（含报事发起/门禁授权） | 用户（"房态图状态切换、房间详情报事发起、门禁授权缺失"） | 管理后台 38→39 页
- 2026-10-27 | [文档] | 新建 `docs/01-需求与规划/翔安南区新城-参考原型需求对照清单-V1.0.md`：对照原版参考原型内置的 44 页需求说明，0 已对齐 / 37 有差异 / 7 缺页 / 205 条差异，含整页缺失优先清单 | 用户要求与原版原型比对 | 数据即 `refParity.ts`
- 2026-10-27 | [坑] | `scripts/sync-project-metadata.mjs` 会**清空** `project.json#prototypes[].pages`，误跑后侧栏子目录全丢；恢复用 `.tmp-shots/write-make-tree.mjs`（先把最新 nav.ts/pages.ts 复制成 nav.mts/pages.mts 再 node --experimental-strip-types 运行）。另 `Room.building`='A' vs `BUILDINGS.name`='A 栋'，过滤用 id、展示用 name | 自查（误跑一次已恢复） | 写进踩坑记忆
- 2026-10-28 | [诊断] | 设计说明面板接入对照手册核验：卡片渲染/Web 43 页 key 对齐均正常；P1 连线与双向高亮全失效（prototypes 与 common/xanan 零 data-proto-id，211 条 bind 全是中文短语）；P2 移动端默认页无 ?page= 时推导出 mp:/staff: 查不到说明；P3 三端壳均未传 onSave（草稿模式），axhubSaveAdapter/ReviewBoard/StructureMonitorShell/PrototypeLayout 为死代码；P4 草稿跨页残留风险 | 用户反馈「设计说明接入异常」 | 结论落盘 `设计说明接入诊断-20261028.md`，修复方向 A补连线/B纯卡片/C只修硬bug 待用户拍板
- 2026-10-28 | [修复] | 设计说明硬 bug 闭环：P2 PhoneFrame 按端兜底（staff→workbench、mp→home）；P4 新增先于恢复 effect 的切页清空 effect、无草稿时显式置空 localOverride；P5 删除 StructureMonitorShell/PrototypeLayout/ReviewBoard 三个死 tsx；P1 机制层落地（ListPage 自动 -table/-kpis/-filters、ConsoleShell 页头 -actions、StatRow/SectionTitle/MSection/MCard/MFooterBar 透传 prop、面板 protoLabels 全量标签映射、补回 NOTES_PANEL_WIDTH 导出）；common 相关文件 tsc 零报错，Web 页 0 运行时错误、连线正常 | 用户（拍板全部修复） | `src/common/DesignNotesPanel.tsx`、`xanan/{Shell,mobile,ListPage,ui}.tsx`
- 2026-10-28 | [决策] | 设计说明「保存即写回 webNotes.ts/mobileNotes.ts 真源」（用户拍板，非纯草稿）：新增 `vite-plugins/designNotesSavePlugin.ts`（dev-only POST /api/design-notes/save，白名单两文件、块级定位、原子写盘、含 `${...}` 插值卡仅更新 title/bind 且保留 text/list 原文）+ `common/xanan/designNotesSaveAdapter.ts`；Shell/mobile 三端传 onSave；实测非法输入全拒绝且文件 hash 不变，round-trip 通过（插值未被固化、普通卡正常序列化、相邻块不波及），测试后已还原备份 | 用户（"保存即写回真源，按此执行"） | 真源写回链路打通
- 2026-10-28 | [决策] | 规范升级：根目录《设计说明连线标注规范.md》由纯连线细则重写为「接入流程 + 数据契约 + 标注细则 + 落盘 + 验收」全指南，第〇节立「开工必问是否接入、未问不得跳过」硬规则；`AGENTS.md` 第五节同步该常驻条目并指向规范文档 | 用户（规范讲清接入流程/规范，解决执行代理不知接入、接入后不懂规范） | 文档与常驻规则
- 2026-10-28 | [进度] | P1 连线标注铺开（#6，未完成、续作时先重跑 extract 刷新清单）：总 211 卡 = Web 102（已 3 / 待 99）+ 租客端 mp 63（已 63 / 待 0，完成、零悬空）+ 管家端 staff 46（已 0 / 待 46）；已覆盖 66、中文待映射 145、悬空英文 0；试点 w-rooms 3 卡连线实测通过。续作注意：ListPage auto-table 可脚本批量改 `-table`、自定义页需补 JSX 标注、条件容器 `-kpis/-actions` 须先核 prop 真传、弹层抽屉卡删 bind 豁免；**多片并行写 common 机制文件会覆盖竞争，按端串行或只改数据/页面文件**；覆盖率脚本 `.tmp-shots/extract-bind.mjs`/`check-bind-coverage.mjs` | 自查 | `webNotes.ts`/`mobileNotes.ts` bind 字段；页面 JSX data-proto-id
- 2026-10-28 | [修复] | 页面报错闭环：阻断错误为 `Shell.tsx`/`mobile.tsx` 引用未导出的 `NOTES_PANEL_WIDTH`（TS2614）+ 宿主多传 `moduleTrail/pageId/pageLocation` 且 `hint` 未声明（TS2322）；处理为面板补 `NOTES_PANEL_WIDTH=360` 导出、`hint` 改可选 prop 并渲染、删除无用标头引用。`pnpm typecheck` 过滤既有模板/测试噪声后业务代码零错误；浏览器实测 w-rooms cards3/lines3、mp home cards3/lines3、staff workbench 面板正常。残余控制台 404 均为 favicon 与仅 Make 壳注入的 `__axhub-preview-loader.js`（直访 51720 出现，无功能影响）；`Shell.tsx` 反复提示 Fast Refresh "td export incompatible" 源自壳文件既有聚合导出 th/td 非组件，非阻断、不改 | 用户（"页面报错了看下"） | `DesignNotesPanel.tsx`、`Shell.tsx`、`mobile.tsx`
- 2026-10-28 | [修复] | 设计说明面板「不贴边、右侧留白」：根因是 Web 主区 `paddingRight:360` 让位与面板作为 flex 子项并排形成双重占位，面板排在内容盒内、右侧空出一整块；标题栏单行在 360px 内被徽章+按钮挤得标题折行。修复为纯 flex 贴右（未沿用 10-27 的 fixed 方案）：`Shell.tsx` 主区删 `paddingRight`、面板作末位 flex 子项贴主区右缘，渲染条件改用 `hasNotes`，清理未用的 `NOTES_PANEL_WIDTH` 导入（移动端仍用、导出保留）；`.dn-right` 补 `flex-shrink:0;box-sizing:border-box;max-width:360;align-self:flex-start`；标题栏重构为「工具行(徽章/状态/保存/重置) + 标题行」两行、标题 ellipsis 不折行。验证：849 宽视口实测 panel.right=vw、gap=0、宽精确 360、cards3、console 0 错误；mp home cards3/lines3、面板 top24 与手机框顶对齐未破坏；typecheck 业务零错误。通用面板已同步补丁母版（备份 DesignNotesPanel.master.bak2）。注意 bu 内嵌视口在 241/849/939 间波动，241 时侧栏224已占满、面板横向溢出属测试环境限制，不代表桌面宽屏 | 用户（"设计说明为啥不贴边，丑死了"，w-contracts） | `DesignNotesPanel.tsx`、`Shell.tsx`；母版 `03-组件库/01-补丁源/design-notes/src/common/`
- 2026-10-28 | [修复] | 面板满高 + 移动端钉屏幕右缘（用户两张宽屏截图反馈：①Web 贴右但高度随内容、下方留白；②移动端面板跟在手机原型右侧、未靠右贴屏幕）。`.dn-right` 由 sticky 流内改为 `position:fixed;top:0;right:0;height:100vh;z-index:40;box-sizing:border-box;flex-shrink:0`（去掉 max-height/align-self）；标题栏 `.dn-rd-titlebar` 改面板内部 `position:sticky;top:0;background:#fff;z-index:1` 吸顶；Web `Shell.tsx` 恢复主区 `paddingRight: hasNotes?NOTES_PANEL_WIDTH:0` 让位（fixed 脱离文档流，不让位会盖住内容）并恢复 `NOTES_PANEL_WIDTH` 导入；移动端 `mobile.tsx` 外层 `paddingRight=NOTES_PANEL_WIDTH+16` 保留，面板 fixed 后钉 iframe 视口右缘、手机框在剩余空间居中，窄窗 `innerWidth<798` 时 roomy=false 自动隐藏面板的保护逻辑不变。验证：Web 实测 position=fixed/top=0/rightGap=0/height=innerHeight（满高）/width360/cards3/console 0 错误；typecheck 业务零错误；连线 SVG 同为 fixed 视口坐标、无需改。移动端 bu 视口 241<798 触发隐藏未能渲染实测，宽屏由同一 fixed 组件保证。通用面板已同步母版（备份 DesignNotesPanel.master.bak3）；Shell/mobile 为项目专属壳不进母版 | 用户（"不少页面没适配屏幕高度；移动端贴着原型没贴边靠右"） | `DesignNotesPanel.tsx`、`Shell.tsx`；母版 `03-组件库/01-补丁源/design-notes/src/common/`
- 2026-10-28 | [架构] | 后台全量目录落地：`side-menu/index.tsx` 向后兼容新增 `headerContent`/`sticky` 可选 props，`style.css` 加 `__header--custom` 去默认标题留白；`Shell.tsx` 删除手写 aside（ICONS/MOBILE_APPS/本地展开态一并删除），改挂 `<SideMenu sticky collapsible={false} width={224} selectedKey={page} openKeys 受控 onOpenChange onMenuSelect headerContent=品牌头 footer=账号卡>`；`handleSelect` 分流：Web key 查 NAV 拍平的 `WEB_PAGE_PATHS` 走同端 `?page=`，`mp:` 切片跳 `/prototypes/xanan-mp?page=`，`staff:` 跳 `/prototypes/xanan-staff?page=`；切页时 `xananAncestorsOf(page)` 把祖先模块并入展开。实测 bu：可点项 100（页面 92 + 父级 8）、分组 28、Web 点击 w-vars 后 URL=`?page=w-vars` 且选中跟随、mp home/staff workbench 直达、console 0 错误；typecheck 业务零错误（仅剩模板重导出/缺 vitest 既有 9 条噪声）。`spec.md` §2.5 由「原型内不再自建目录」旧口径改写为双载体并存，§2.3 页数口径更新为 92 页 / 28 分组。已知未改差异（待用户定）：①待办角标 badge 现为中性灰（旧手写为红底提醒色）；②openKeys 整页跳转/刷新后重置为默认展开六 Web、移动端分组收回（未持久化，同指标平台做法）；③side-menu 为项目专属组件，不进通用补丁母版 | 用户（"side-menu 没主要目录和子页面、不清楚移动端有哪些页，要像指标平台那样全量罗列且目录与切页同步"） | `common/side-menu/{index.tsx,style.css,spec.md}`、`common/xanan/Shell.tsx`

- 2026-10-28 | [纠正] | 撤回壳内全量目录方案：`Shell.tsx` 删除 SideMenu/xanan-menu 挂载与受控 openKeys/handleSelect，重建手写 `WebNav`（遍历 `nav.ts` 六模块 + `MOBILE_APPS` 两入口 + 账号卡）；设计说明接线（notesSaveAdapter、useHostNavSync、DesignNotesPanel、页头 data-proto-id、主区 paddingRight 让位）原样保留。旧壳备份 `.tmp-shots/backup/Shell.before-rollback-20261028.tsx` | 用户（"原型本来就有页面菜单，干嘛重复加；你改错地方了，说的是 Make 框架外侧侧栏"） | `common/xanan/Shell.tsx`；连线与 notes 真源零改动
- 2026-10-28 | [新增] | 全量页面清单改由 Make 外侧「原型」侧栏承载：三端各建纯声明 `routes.ts`（`defineHashPageRoute` 字面量；Web 43 / mp 27 / staff 22；group 连续排列、id 无冒号前缀、不被运行时 import）；跑 `pnpm metadata:sync` 重建 `project.json pages[]`（备份 `.bak-20261028-prepages.json`）。`/api/projects/翔安南区新城/resources` 实测三端 43/27/22、分组齐全，与参考指标平台 30 页同构；红框节点标题与 `PAGE_TITLES` 逐页零差异（宿主桥按标题文本点亮成立）；同步更正 mp/staff 入口 `@name` 注释页数（24→27、20→22）。注释口径回退：pages.ts / catalog.ts / design-notes/index.ts / Coverage.tsx 不再称 side-menu 为真源；`side-menu/spec.md` §2.3–2.5 改为「闲置备用件 + 外侧侧栏为真源」，并把「改 project.json 必须重启 server」纠正为「server 切换项目时按需读取、刷新 admin 即可」。`common/side-menu/*` 现无任何 import，去留待用户拍板（未删除）。typecheck 仅剩既有 9 条模板/测试噪声、业务零错误；红框分组树的宽屏视觉未在 bu 窄视口复现，待宽屏刷新复核 | 用户诉求：像指标平台那样罗列全部页面、目录切页同步 | `prototypes/xanan-{web,mp,staff}/routes.ts`、`.axhub/make/project.json`、`side-menu/spec.md` 及四处注释
- 2026-10-28 | [修复] | 删除闲置 `src/common/side-menu/` 整目录（index.tsx、xanan-menu.ts、side-menu-utils.ts、style.css、spec.md）：删除前全局核验目录外零 import，唯一外部命中是 `vite.config.ts` 的 vitest `coverage.include` 里一条 side-menu-utils.ts 字符串（非 import、不影响构建），已同步移除；全量目录真源固定为 Make 外侧侧栏 `pages[]`（三端 `routes.ts` → `metadata:sync` → `project.json`），壳内保留手写 NAV，不再需要该组件。删除后 `src/common` 仅余 design-notes / DesignMdBatchShowcase / ThemeShell / xanan | 用户（宽屏确认符合预期后拍板「删除闲置文件」） | 目录整删 + `vite.config.ts` coverage 条目移除
- 2026-10-28 | [新增] | 离线单文件评审包导出链：`scripts/build-export-data.mjs`（四份主文档 md→受控 HTML+大纲、10 张流程图→base64）→ `src/export/`（hash 路由 `#/proto|doc|flow`、外壳 App、ProtoStage/DocStage/FlowStage）→ `vite.export.config.ts`（独立 singlefile 配置，与主 MPA 配置隔离）；`pnpm export:build` 产出 `dist-export/index.html`（约 5.0MB / gzip 3.05MB），file:// 双击可用、零外链请求、控制台零错误。三板块：原型（Web 全量 43 页经自带导航可交互；移动端仅代表页 mp 4 + staff 3）/ 四份文档（左树+大纲锚点定位）/ 10 张流程图（滚轮缩放+拖拽+双击复位）。跳转统一走新建 `common/xanan/navBus.ts`（导出环境派发 `xanan:go` 事件替代 location.href，消除 file:// 硬编码跳转失效）；Shell/mobile 导出模式不挂保存面板、不留面板宽度。构建实测：1745 模块、typecheck 仅既有 9 条噪声 | 用户（原型+文档+流程图整合单个离线 HTML；拍板可交互真实应用、核心页+四份主文档、左树右正文、内部评审/离线存档） | 新增 `src/export/**`、`scripts/build-export-data.mjs`、`vite.export.config.ts`、`navBus.ts`；改 Shell/mobile 导出模式、三端 index 导出表、Web ROUTES 转 export
- 2026-10-28 | [边界] | 离线包口径与已知限制：①移动端仅代表页（mp home/contracts/pay/sign、staff workbench/ticket-detail/checkin-long），其余页面在 dev 原型查看；②SRS 50 处 `![](images/*.png)` 为磁盘失效引用，渲染「图示未归档」占位块、不编造图片；③离线包不含设计说明编辑保存（无 dev 保存插件、不发 POST）；④带参跳转（?room= 等）离线壳取默认/第一条数据；⑤重建命令 `pnpm export:build`（自动先重跑数据脚本）；产物最终命名版复制于项目根 | 自查（构建 + 浏览器实测三板块切换/事件桥切页/大纲锚点/流程图缩放） | 随交付说明告知用户
- 2026-10-28 | [交接] | 离线评审包三项补全移交 WorkBuddy，指令真源 `WorkBuddy交接-离线评审包补全指令.md`：①移动端扩全量 + 左侧分组导航（mp 27 / staff 22，复用两端 index 内部 `ROUTES` 全表，废弃代表页子集）；②SRS 50 张失效图补齐（25 组 operation-flow/sequence，行号清单见指令 §4，PNG 放 `docs/images/` 后由构建脚本自动内联）；③设计说明只读右侧面板（真源 `design-notes/index.ts#buildModules`，面板加 `readOnly` 开关，离线无 POST/无草稿；连线可选、不全不阻断）。验收基线：`pnpm export:build` 重建、typecheck 不新增、file:// 控制台 0 错误 0 外链、命名版自动同步根目录。注意用户澄清：**并无「只做核心页」口径，移动端应全量** | 用户（额度原因移交） | 待 WorkBuddy 按指令执行并回归 dev 行为不变
- 2026-10-28 | [新增] | 离线包任务一：两端入口新增 `export const MP_ROUTES / STAFF_ROUTES`（指向内部全量 `ROUTES`，dev 的 `App` 与子集导出表原样保留）；`ProtoStage` 的 `MobileView` 重写为三栏「左分组导航（`MP_GROUPS`/`STAFF_GROUPS`，含标题+副标题，可滚）+ 中 `PhoneFrame` 手机框 + 右只读说明」，缺失 key 兜底默认页并给提示；三端切换上移到 `App.tsx` 顶栏 `.exp-appseg`（原型板块内常驻），并记住最后一次原型页（从文档切回不弹回首页）；`styles.css` 删 `.proto-toolbar`/`.mobile-page-picker`，加 `.mobile-stage/.mobile-nav/.mobile-phone/.mobile-missing/.exp-appseg` | 用户（WorkBuddy 交接指令 §3） | `xanan-mp/index.tsx`、`xanan-staff/index.tsx`、`src/export/proto/ProtoStage.tsx`、`src/export/App.tsx`、`src/export/styles.css`；实测 mp 27/4 组、staff 22/7 组全量可进
- 2026-10-28 | [新增] | 离线包任务三：`DesignNotesPanel` 加可选 `readOnly`（隐藏编辑/删除/添加/保存/重置/悬停加说明，跳过 localStorage 草稿读写与 `onSave`，标题栏显示「只读」）；`Shell.tsx` 的 `hasNotes` 去掉 `!exportMode` 并把 `onSave` 在导出态置空；移动端面板由 `ProtoStage` 挂在右栏、`leftContentRef` 指向手机列；`styles.css` 加 `.exp-body .dn-right{top:52px;height:calc(100vh-52px)}` 避开顶栏。三端 92 页全部有面板（220 卡），无编辑入口、无 POST | 用户（指令 §5 方案 A） | `DesignNotesPanel.tsx`、`xanan/Shell.tsx`、`export/proto/ProtoStage.tsx`、`export/styles.css`；dev 三端面板仍可编辑（readOnly 默认关）
- 2026-10-28 | [修复] | 说明卡片悬停变白字回归：`DesignNotesPanel` 里 `.dn-desc.active-highlight` 又把整卡刷成主色、文字置白，与 `[data-proto-id].active-highlight` 双命中后变成浅蓝底白字（用户在 10-28 早前已投诉过同一问题，文件被外部写回旧版后复发）。改为卡片只加「白底 + 蓝框 + 3px 外发光」不改字色，左侧选择器加 `:not(.dn-desc)` 排除卡片自身；实测 hover 后 bg=`rgb(255,255,255)`、标题/正文 `rgb(31,41,55)`、左侧模块 1 处高亮 | 自查（离线包实测时发现） | `src/common/DesignNotesPanel.tsx`
- 2026-10-28 | [新增] | 离线包任务二：SRS 25 章 ×2 张图补齐（50 张 PNG，2.52MB，1080px 宽，单张 31–73KB）。内容取自各章「概述/功能设计/业务规则/边界与异常」，重排为三泳道操作流程 + 参与方时序图；生成链 `scripts/diagrams/{spec,render,build}.mjs`（内容真源 / HTML 版式 / 临时 headless Chrome 截图），可 `--only <组>` 单组重跑。**偏差**：指令建议 drawio 优先，本机无 drawio 导出链路且 50 张需统一中文排版，改 HTML→PNG，故这 50 张在 `docs/images/src/` 无 XML（原 10 张流程图 XML 未动），理由写入 `scripts/diagrams/README.md`。构建后 SRS 缺图占位 50→0，PRD/HLD/LLD 仍 0 | 用户（指令 §4） | 新增 `docs/images/*-operation-flow.png`、`*-sequence.png` 共 50 张 + `scripts/diagrams/`
- 2026-10-28 | [新增] | 命名版自动同步：新增 `scripts/copy-export-named.mjs`，`export:build` 末尾追加执行，把 `dist-export/index.html` 复制为中文名（`dist-export/` 与项目根各一份，先写 `.tmp` 再改名防半文件）；产物 8.53MB / gzip 5.6MB | 用户（指令 §6.2） | `package.json#scripts.export:build`、新增脚本
- 2026-10-28 | [纠正] | 推翻本文件前一条 [边界] 的离线包口径：移动端已全量（mp 27 + staff 22，不再只代表页）；SRS 50 处失效引用已补齐、占位归零；离线包**已有只读设计说明面板**（仍无编辑保存）。保留的有效边界：带参跳转取默认/第一条数据、localStorage 本地态、弹层区块按规范 6.4 豁免连线、单文件 8.53MB | 自查（本轮交付） | 交付说明 `离线评审包-交付说明-20261028.md`
- 2026-10-28 | [修复] | 离线包文档正文宽度：`.doc-content-inner` 原 `max-width:920px`，1600 屏两侧各空 ~190px、表格被挤到折行（「来源 PRD」拆两行）。改为随可用宽度铺开（1600 屏 1321px / 1280 屏 1001px），超宽屏 `@media(min-width:1800px)` 封顶 1500px，避免一行过长 | 用户（"设计文档屏幕宽度"） | `src/export/styles.css`
- 2026-10-28 | [修复] | 离线包流程图查看器：①原按原始像素（1800–2848px）显示且 `.flow-stage` 用 `place-items:center;overflow:hidden`，超出被裁、整页还会被撑出横向滚动；②缩放走 `transform:scale()`，分数倍缩放让细线重采样成波浪。改法：`FlowStage` 重写为「默认适配宽度」——`ResizeObserver` 量容器宽度算 fit（只缩不放、预留 16px 给竖滚动条），图片用 CSS `width/height` 缩放（比 transform 清晰），舞台改 `absolute inset:0 + overflow:auto + img{margin:auto}`（小时居中、大时可双向滚动），工具条保留 `− / % / ＋ / 适配宽度 / 100%`，滚轮缩放与拖拽平移保留；`.flow-layout` 补 `flex:1;min-width:0`（否则只按左栏 248px 收缩、查看器宽度 0）。`flows-data.ts` 由构建脚本写入 PNG 原始宽高（IHDR 16/20 字节），首屏不跳版。另新增 `scripts/shrink-flow-images.mjs`：临时 headless Chrome 把 10 张图按 1600px 宽重渲染，原图备份 `.tmp-shots/backup/flow-images-20261028/`，2.85MB→1.73MB | 用户（"线条歪歪扭扭；流程图适配屏幕宽度，可以压缩下图片"） | `src/export/flows/FlowStage.tsx`、`src/export/styles.css`、`scripts/build-export-data.mjs`、新增 `scripts/shrink-flow-images.mjs`、`docs/images/{flow,state}-*.png`（10 张）
- 2026-10-28 | [修复] | 侧栏「批量租赁配置」点了没反应：`xanan-web/index.tsx` 里 `'w-room-batch': RoomsPage` 直接复用房源管理组件，点进去标题与内容都不变。新建独立页 `pages/RoomBatch.tsx`（圈定范围 → 命中清单可逐条取消 → 配置项；在住批量停用阻断、已签合同不改价、`应用配置` 走 confirmAct 二次确认并写 `flow.setRec('room')`/`setRoom`），路由改指新页 | 用户（"运营工作台-批量租赁配置，点击没有反应"） | 新增 `src/prototypes/xanan-web/pages/RoomBatch.tsx`、改 `src/prototypes/xanan-web/index.tsx`
- 2026-10-28 | [修复] | 侧栏折叠态被切页重置：`WebNav` 的 `openSecs` 是组件内 `useState`，每次切页重挂（导出包切 hash、dev 整页跳转）都回到「全部展开」，用户收起的目录会自己弹开。改为 `sessionStorage` 持久化（键 `xanan.webnav.open`，读写都 try/catch，file:// 或隐私模式读不到则退回全展开） | 用户（"点击任一二级菜单，收起的目录会展开"） | `src/common/xanan/Shell.tsx#WebNav`
- 2026-10-28 | [修复] | 产物里残留 `fetch("/api/design-notes/save")`：只读面板只藏掉编辑按钮，`src/common/xanan/designNotesSaveAdapter.ts` 仍被静态 import，dev 那段 POST 逻辑整段打进了单文件包（指令 §5 要求「构建产物可执行路径不得出现 fetch(/api/…)」）。修法取**构建期换模块**而非运行时判断：新增 `src/export/offline/designNotesSaveAdapter.ts` 空实现（`async () => {}`，不落盘不发请求），`vite.export.config.ts` 的 alias 加 `find: /^\.\/designNotesSaveAdapter$/` 精确指向它；dev 与主 MPA 配置不动，开发态仍可编辑保存。重建后产物 `fetch(` 计数 **0**、`grep api/` 仅剩 3 处 LLD 正文 `<code>/api/v1</code>` | 自查（收尾复核时发现，前一轮只验了"运行时不发请求"、漏验"产物里不存在"） | `src/export/offline/designNotesSaveAdapter.ts`（新增 19 行）、`vite.export.config.ts`；重跑 23+15+4 项断言全过

### 任务进度（过程层·与 compaction-recovery.md 对齐）

> 与 `compaction-recovery.md` 恢复检查表第 1 项对齐：TaskList 中 in_progress 任务。
> 有且仅有一个 in_progress；压缩恢复时以此为准。

- 进行中：**离线评审包三项补全已完成并实测通过**（移动端全量 27+22 页三栏舞台 / SRS 50 张图占位归零 / 三端只读说明面板 220 卡），产物 7.03MB（10 张流程图压到 1600px 宽后再降 1.1MB），交付说明 `离线评审包-交付说明-20261028.md` | 下一步：① 用户复验 offline 包并回收问题；② 若甲方要求 drawio 源，按 `scripts/diagrams/spec.mjs` 另行导出（不影响现有图）；③ 看板指标口径与预警阈值待甲方确认
- 历史：原型重做 · 三端 92 页（Web 43 / 租客端 27 / 管家端 22）· 51 个打勾页全部有实现 · 共用层 `src/common/xanan/` · 主规格 `.spec/spec.md` · 设计基底 stripe；已知遗留：房态分布进度条 hover 时数字重绘闪烁（不影响阅读）

## 四、结项状态

- **结项日期**：
- **提炼到工作台层的方法论**：<规则 id 或「无」>
- **归档位置**：<<归档目录路径（**新建前先问用户**）或「无」> 或「无」>
