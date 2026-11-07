# 项目记忆
>
> ⚠️ **本文件是上下文衰减的兜底**：`AGENTS.md` 只在会话首轮注入一次，压缩**不会**把它带回来（2026-10-15 实测）。
> **读到本行 → 顺手确认一次 `AGENTS.md` 是否还在上下文里**；不在就 Read 一次它和 `.agents/skills/INDEX.md`。（触发条件是「读到本行」这个动作，不是「想起它不在」——后者不可能发生。）
> **每个模块闭环后立即写快照**——压缩只保留「做了什么动作」，**不保留「看到了什么」**（工具结果正文 99.5% 被丢弃）。
> **会话别开太长**：按模块 / 阶段新开会话，是让 `AGENTS.md` 重新注入的唯一办法。

> 本项目专属记忆。**优先级最高**：与工作台通用规则（`10-智能体记忆/rules/`）冲突时，以本文件为准。
> AI 在本项目内开发时，先读本文件再动手；日常踩坑先记入「二、项目经验」，不急着进 `10-智能体记忆/rules/`。

## 〇、协作信息（v2 新增）

| 字段 | 值 | 说明 |
|---|---|---|
| owner_agent |  doubao| 负责智能体：doubao / codebuddy / workbuddy / deepseek / qwen |
| collaboration | single | single=单智能体 / pipeline=流水线 / dispatch=路由分诊 |
| room | （未关联） | 可选：共享目录 `rooms/<项目>-<任务>` |
| handoff | `handoff.md` | 交接包：进度 / 推理注释 / 产物 / 已知坑（双写：共享目录 + 项目本地） |

## 一、项目画像

* **定位**：数字孪生底座的数据中台管理端「指标管理平台」——1:1 复刻内网现网（http://172.16.9.121/xagtdc-data-indicators，sysadmin）+ 指标看板首页 + 对标《应标：指标平台功能清单》补充。产品定位为**工具**；为应标 2.x/3.x，**本期补充用户/角色/菜单权限（仅页面骨架，不接真实鉴权）**，分角色承担申请与授权。
* **功能需求**：
  * 需求基线（按序）：概念版 `docs/2026-09-08-指标管理平台-概念版.md` → PRD `docs/2026-09-08-指标管理平台-PRD.md`（v1.3）→ 原型盘点 `docs/2026-09-08-指标管理平台-原型盘点.md`（28 页）
  * 对标真源：《应标：指标平台功能清单》`docs/应标：指标平台功能清单.docx`（响应情况已蓝色标注于文档内；编号 改-01~04 / 增-01~08 与原型设计说明一一对应；3.2 画布保留暂不响应）
  * 变更编号：改-01 数据源关联指标数量列；改-02 专题维表类型；改-03 编目字段+发布/批量/导入导出/复制/发布状态合并；改-04 生成规则 8 类型+三步向导；增-01 图表配置（🟢 本期收敛：仅即时预览、不落库不建图表表，2026-11-02 确认）；增-02 临时值（🟢 本期不做）；增-03 指标定时调度（🟢 本期不做；拉取类调度保留在「数据维护」，指标侧不存结果值）；增-04 监控统计；增-05 日志查询；**增-06 指标目录（2.1/2.2）；增-07 申请审批（3.1，固定流程 申请→审批→授权，通过自动授权/不通过/指派）；增-08 系统管理三页（用户/角色/菜单权限骨架）**；暂不响应：3.2 画布流程配置
* **设计风格**：青绿主色（#1EB195 / #23666F），桌面 Web 后台 ≥1280px；弹窗外围点击不关闭；示例数据 2-10 条；设计说明卡片一个模块一张（无蓝色阴影）
* **开发规范**：原型层 React（`src/prototypes/indicator-platform/`），页面生成规范见 `.agents/knowledge/`；开发层 `admin/`（Vue3+Element Plus，page-generator 交付目标，须先 SRS）
* **技术约束**：物理表命名=拼音首字母（t_ 前缀）；指标编码按规则生成（ZB- 自增）；预警推送=站内+第三方API；预览链接 `http://localhost:51720/prototypes/indicator-platform/#page=<page>`；Make 管理端 `http://localhost:53817/`
* **本期架构拍板速览（2026-11-02 汇总，开发必读）**：
  * 数据只有 raw 单层贴源，无 topic / biz 加工层；对外 API 实时 SQL 查询，指标不存结果值、无临时值、无指标调度
  * 接入方式 5 类落库：manual 手工填报 / pull 平台拉取 / push 订阅推送 / report_http 接口主动上报 / report_db 数据表主动上报；另有 db_direct 旁路只读（现网业务库旧表，不新建不迁移不落 raw）
  * 图表只做即时预览（仅维度计算规则），不建图表配置表；展示形态由大屏端定
  * 高风险等保必做：真实鉴权 + 双因子 + 三权分立（SYS_ADMIN / SEC_ADMIN / AUDIT_ADMIN 互斥，审计只读）+ 操作审计 append-only；二次鉴权、文件导入导出、厂商推送端点本期不做
  * 接口「登记」与「绑定」分离：登记在接口数据源，绑定在原始库专题配置；限流由 API 网关统一管控，平台只登记凭证与白名单
  * 通用现网复刻后台页（用户/角色/审计/JDBC/预警分类等）设计说明不单列逐区块卡，由聚合卡覆盖（2026-11-02 用户拍板豁免）

## 二、项目经验

> 本项目踩坑记录，一条一组。格式：`日期 | [类型] | 场景 | 根因 | 修复 | 验证`（类型 ∈ `[决策]` `[修复]` `[风险]` `[安全]`）。
> 判定可跨项目复用时，提炼为工作台层规则（`10-智能体记忆/rules/`，scope: universal/workspace）并在「三、结项状态」登记规则 id。

* 2026-09-11 | 设计说明面板调出 | 示例引导页删除后 DESIGN NOTES 面板入口消失 | 面板由原型运行时注入，与示例页无关；按「规格」按钮/面板入口调出 | 浏览器验证
* 2026-09-11 | 原型页面 hash 导航验证 | 直接 `#topic-library` 不切页 | SPA 用 `#page=<pageId>` 格式 | 浏览器验证
* 2026-09-11 | 应标 2.x/3.x 响应口径 | 用户否决「二期」，要求本期完成申请/审批授权 | 确认三点：画布暂不响应、审批固定流程 申请→审批→授权、上传凭证+暂存架保留、系统管理只做页面骨架；docx 2.x/3.1 改「本期已实现」（增-06/07/08） | docx 回读 + 原型浏览器验证
* 2026-10-22 | [决策] | 等保三级范围界定 | 高风险项不写清边界易被开发自由发挥 | 真实鉴权 / 双因子 / 三权分立 / 操作审计 / 口令加密必做；二次鉴权本期不做；审计只 append-only、不做校验值哈希链 | HLD §7/§9.6、LLD §5、SRS §5.1
* 2026-10-27 | [决策] | 去专题库改造 | 三层（biz/topic/raw）与实时计算定位冲突，易多出加工中间层 | 删 topic 层改单层 raw 贴源；指标 API 实时 SQL；无定时加工结果表；拉取调度只保留在数据维护 | HLD v1.2、原型去专题库菜单（任务 #11）
* 2026-10-30 | [决策] | 生成规则与接入收敛 | 标书 8 类规则把「算法」与「接入方式」混在一起 | 算法收敛 3 类（SQL开发 / 维度计算 / 指标计算）；接入收敛 5 类；删临时值覆盖逻辑；限流归 API 网关统一管控 | HLD v1.3、LLD v1.2、SRS v1.1
* 2026-11-01 | [决策] | 更新统计展示位置 | 独立 Tab 与列表列信息重复、维护两套 | 不设独立 Tab，落在接口数据源「更新统计」列，绑定关系弹窗同步展示；从未取数显示「—」 | SRS FR-DS-08（v1.2）
* 2026-11-02 | [决策] | 合规补缺执行口径 | 卡片存在空卡与缺区块说明；文档缺直连 / 图表边界；docs 目录与家规 §4.2 路径不一致 | 用户拍板：①卡片只补说明文字进现有分支、功能结构缺口列清单交核对；②docs 保持平铺不迁移不改名，只补内容；③通用现网复刻后台页豁免逐区块卡；④演讲稿用 Markdown 大白话口播稿 | 见本文件第四节基线登记 + `docs/2026-11-02-合规检查功能缺口清单.md`

## 三、结项状态

* **结项日期**：
* **提炼到工作台层的方法论**：<规则 id 或「无」>
* **归档位置**：<归档目录路径（**新建前先问用户**）或「无」>

## 四、基线变更登记（AGENTS §4.3.1：影响需求 / 概念版 / PRD / SRS / HLD / LLD 任一基线即登记一行）

| 日期 | 基线与版本变化 | 变更摘要 | 产物位置 |
| --- | --- | --- | --- |
| 2026-10-27 | HLD → v1.2 | 去 topic 层改单层 raw 贴源；API 实时 SQL 查询；删定时加工 / 结果表（拉取调度保留在数据维护） | `docs/2026-10-20-指标管理平台-HLD.md`；原型任务 #11 |
| 2026-10-30 | PRD v2.1；HLD → v1.3；LLD → v1.2；SRS → v1.1 | 算法收敛 3 类 + 接入 5 类；删临时值覆盖逻辑；审计不做校验值 / 哈希链；限流归 API 网关统一管控 | 四份基线文档 |
| 2026-11-01 | SRS → v1.2 | 「更新统计」不设独立 Tab，落接口数据源「更新统计」列（FR-DS-08），绑定弹窗同步 | `docs/2026-10-20-指标管理平台-SRS.md` |
| 2026-11-02 | LLD → v1.3；HLD → v1.4；SRS → v1.3 | ①access_mode 补 `db_direct`：业务库直连只读现网旧表，不新建 / 不迁移 / 不落 raw；②图表只做即时预览，不建图表配置表；③新增 FR-DS-09 接口登记与绑定分离；④右侧卡片补说明：tcf-04 / tcf-05（两种主动上报）、ind-04 / ind-04c / ind-04d（详情基础信息 / 入出参 / 溯源）、per-02 / per-03（角色列表 / 菜单树），并补写空卡 ind-chart-ctrl | 三份设计文档；`src/prototypes/indicator-platform/index.tsx` |
| 2026-11-02（第二轮 · 原型补齐，基线版本不变） | 原型层补齐；PRD / SRS / HLD / LLD 版本均不升 | ①J2：指标列表补批量导入 / 导出前端入口与弹窗（模板字段说明、导出范围选择），文件解析校验与清单生成归后端联调，指标数值不进导入、走数据维护手工填报；②J10：拍板不做拖拽流程画布，新增简化「审批配置」页（固定三节点 提交→审批→授权，仅人工审批节点配审批角色 + 指定审批人），拖拽编排 / 会签 / 多级流转留二期流程引擎 | `src/prototypes/indicator-platform/`（pages-indicator.tsx、pages-approval-config.tsx、index.tsx、ui.tsx）；清单 `docs/2026-11-02-合规检查功能缺口清单.md` §1.4 与 J2 / J10 行 |
| 遗留结构建议（未执行，用户决定保持平铺） | SRS / HLD / LLD | 家规 §4.2 要求 SRS 落 `docs/01-需求与规划/`、HLD/LLD 落 `docs/02-架构与设计/` 且文件名含「概要设计 / 详细设计」；当前平铺 docs 根目录，用户 2026-11-02 决定只补内容、不迁移不改名 | 详见 `docs/2026-11-02-合规检查功能缺口清单.md` 第二节 |
| 2026-11-02（第三轮 · 豆包清单乙1/2/3/4/5a/5b部分/乙6，基线版本不变） | 原型层修复；新增交付说明文档 | ①乙1 补 `api-form` 卡片分支（api-17a/17c 移入）；②乙2 菜单树父子级联 + 审计管理员只读视角（仅操作审计）+ 保存写操作审计；③乙3 删 RawTablePage/TopicTablePage 死页（PageKey/标题/8 打标）；④乙4 cfg-algo 保留标补卡 icf-09；⑤乙5a 删指标侧存值规则死代码（RULES 只剩 3 类算法、FieldMap/VALUE_TARGETS 全删）；⑥乙5b 部分：Switch 支持 onToggle 并接 10 处列表启停；⑦乙6 新增 `docs/2026-11-02-原型与正式版差异对照表.md`。待办：乙5b 余项（空提交弹窗/9 静态筛选页/登录页）、乙5c 三日志同源、乙5d 文档回写 → 工单 #13-#18 | `src/prototypes/indicator-platform/`（index/ui/pages-system/pages-database/pages-indicator-rule 等 10 文件）；差异表 `docs/2026-11-02-原型与正式版差异对照表.md` |
| 2026-11-02（第四轮 · 设计说明卡片范围收窄，基线版本不变） | 原型层卡片真源；PRD / SRS / HLD / LLD 版本均不升 | 按用户拍板：右侧设计说明卡只保留 11 个应标增补功能页——数据看板 dashboard 6、接口数据源 datasource-interface 16、原始库管理 topic-library 11、指标列表 indicator-list 11、标签管理 indicator-tag 6、指标监控统计 indicator-monitor 6、指标日志查询 indicator-log 9、指标接入日志 ingest-log 4、API管理 api-manage 8、指标目录 indicator-catalog 9、申请审批 indicator-approval 12；其余 21 个非应标页面 `buildModules` 分支物理清空为 `return [];`（页面组件 / 路由 / 菜单注册全部保留，仅右侧面板不渲染说明卡；`approval-config` 上一轮 J10 的三张卡随之清空，页面与路由仍在）。清空方式与落盘适配器抽块规则一致：保留 `if (sub === 'key') { }` 外壳，只换数组块，运行时与导出抽取均为空；清空前已留源码备份 | `src/prototypes/indicator-platform/index.tsx`；复核统计（白名单卡数 / 非白名单 0）见本次 agent workspace `audit_after.txt` |
| 2026-11-02（第五轮 · J2 导出勾选闭环，基线版本不变） | 原型层交互补全；PRD / SRS / HLD / LLD 版本均不升 | 指标列表补勾选列：表头全选 / 反选当前筛选行、行勾选、工具栏实时显示已勾选数与导出按钮数量角标、删除行时同步移除勾选；批量导出弹窗「勾选的指标」按勾选数校验——未勾选时「开始导出」置灰并提示先勾选，已勾选显示数量，提交导出后自动清空勾选；右侧卡片 ind-05b 补勾选交互口径 | `pages-indicator.tsx`、`index.tsx`（ind-05b） |
| 2026-11-02（第六轮 · 修复设计说明面板模块转译 500，基线版本不变） | 原型层故障修复；PRD / SRS / HLD / LLD 版本均不升 | `design-notes/DesignNotesPanel.tsx` 出现双重编码乱码且多处中文字符串右引号丢失，babel 报 Unexpected digit after hash token，模块 HTTP 500，进而导致入口 index 整图 preview-module-graph-load 失败；用 `.backup/design-notes-20261102-1930` 干净版字节级还原（含 NOTES_PANEL_WIDTH 导出与关联选择搜索框，具名加默认导出，props 与宿主两处调用点 modules/pageKey/pageSub/leftContentRef/onSave/contentKey 契约一致）；还原后面板转译 200、11 个白名单页源码卡片条数与 DOM 计数逐项吻合、面板 tsc 零报错；损坏件留证于本 agent workspace | `src/prototypes/indicator-platform/design-notes/DesignNotesPanel.tsx` |
| 2026-11-02（第七轮 · 原始库 / 专题配置 / 数据维护三页卡片补齐，基线版本不变） | 原型层卡片真源；PRD / SRS / HLD / LLD 版本均不升 | 按现行 v2.0 单卡双页签规范补齐三页 buildModules：①topic-library 10 卡——修正 tlb-04 bind→tlb-data-table、tlb-09 bind→tlb-form 两处错位，新增 tlb-02 操作区 / tlb-06 查看筛选 / tlb-07 分页 / tlb-08 目录表单，tlb-01 并入页面总览（职责 / 入口 / 前置 / 相邻 / 卡清单）；②topic-config 5 卡——tcf-01 接入方式与接口对接（含总览，apiRich 覆盖拉取 PL / 推送 PS 落库与三种存储方式）、tcf-02 接口主动上报（apiRich）、tcf-03 数据表主动上报（apiRich）、tcf-04 改绑确认（触发条件 / 角色 / 后果三段式）、tcf-05 数据预览表；③topic-maintenance 6 卡——tmt-01 总览与手工 / 记录两形态列表、tmt-02 操作组、tmt-03 分页、tmt-04 数据行表单、tmt-05 执行拉取（apiRich）、tmt-06 执行 / 接收记录。覆盖核对：21 卡绑定 21 个打标区块、无悬空 bind、卡片 id 无重复；tsc 仅余基线既有报错，index.tsx 与 pages-topic.tsx 零新增报错；浏览器 DOM 计数 10 / 5 / 6 与源码一致，双页签卡 1 / 3 / 1，console 零报错 | `src/prototypes/indicator-platform/index.tsx`（buildModules 三分支）；核对脚本见 agent workspace `verify_topic_cards.py` |
| 2026-11-02（第八轮 · topic-library 两版卡片合并，基线版本不变） | 原型层卡片真源；PRD / SRS / HLD / LLD 版本均不升 | 比对用户手工旧版（16:32 旧 11 卡快照 + WorkBuddy 19:53 / 20:00 / 20:17 三段改造记忆）与第七轮版本，按源码 `pages-topic.tsx` 逐条裁定：①并入 tlb-08「新增预填」父级推导（选中未挂表一级目录建二级、选中已挂表一级回退建一级、编辑态父级只读不挪层级）与提交期父级已挂表末级防御（与选项层置灰双保险）；②tlb-04 边界补存储方式指向（增量追加 / 整批替换 / 临时清存由专题配置定，查看弹窗只读展示落表结果，原始层以追加为主）；③tlb-05 补目录节点选中 / 清除全部筛选 / 重置三者联动交叉引用。不并入项：三层目录说法（现行两级）、批次 P 前缀（现行 PL / PS）、台账字段数 / 总行数列（源码表头无）、维表 parent_id / stat_date 保存校验（saveTable 无此实现）、专题配置数组字段拆多行（映射区无实现）；用户手改的 tcf-01 标题保留不回退；旧版「临时值」口径与 #15 删码决策冲突，未写回、留用户拍板。复核：verify_topic_cards.py ALL_OK（21 卡 bind 全覆盖、id 无重复）；tsc 本轮 index.tsx / pages-topic.tsx 零新增报错；浏览器 topic-library 卡片 10、双页签容器 1、console 空 | `src/prototypes/indicator-platform/index.tsx`（tlb-04 / tlb-05 / tlb-08 list 增补）；合并脚本 `merge_topic_library.py` 与核对输出 `verify_after_merge.txt` 见 agent workspace |
| 2026-11-03（第九轮 · indicator-config 指标配置页补卡，基线版本不变） | 原型层卡片真源；PRD / SRS / HLD / LLD 版本均不升 | 指标配置页三步向导（数据配置→字段配置→入参配置）从零建卡 9 张 icf-*：icf-01 配置步骤向导（并入页面总览 + apiRich 定义保存 CRUD 与实时查询口径）、icf-02 基本信息、icf-03 生成规则三选一（RulePicker，含接入类 5 种去专题配置的去向提示）、icf-04 规则配置面板（维度计算 factTable/metric 聚合/dims 四维表/grain 与指标计算公式实时校验、跨表两指标对齐、多指标对齐维度）、icf-05 数据配置三段式（数据源表 db_direct 旁路 vs 原始库表贴源）、icf-06 SQL 编辑与试算（apiRich，#{参数名} 绑定与错误码）、icf-07 字段配置出参、icf-08 入参配置（从 SQL 解析正则）、icf-09 选择插入指标弹窗（未发布灰显 / 不可组合原因 / 已插入标签）。区块清单以 Grep 复扫为准：初查 7 块，实得 9 块（RulePicker 自带 cfg-rules、RuleConfigPanel 自带 cfg-pick 弹窗，均在 pages-indicator-rule.tsx 跨文件渲染）。落盘中途两 apiRich 串首尾引号不一致（单引号开 / 反引号收）导致 TS1002，修后重跑通过。复核：verify_icf.py ALL_OK（9 区块 bind 全覆盖、id 无重复）；tsc 29 条全为基线既有报错，index.tsx 与 pages-indicator-config.tsx 零新增；浏览器 `#page=indicator-config` `.dn-desc-title`=9、`.dn-tabs`=2（icf-01 / icf-06）、console 无应用层报错 | `src/prototypes/indicator-platform/index.tsx`（indicator-config 分支 return 数组）；核对脚本 `verify_icf.py`、落盘与修引号脚本 `write_icf_cards.py` / `fix_icf_quotes.py` 见 agent workspace |
| 2026-11-03（第十轮 · 接口数据源加「业务上报」对接模式并打通专题配置，基线版本不变） | 原型层交互与卡片真源；PRD / SRS / HLD / LLD 版本均不升 | 拍板补第三项对接模式，解决「接口主动上报」与「订阅推送(HTTP)」方向裂缝：①data.ts InterfaceSource.testStatus 类型放宽加 '—'，interfaceSources 末尾加样例「业务数据上报端点」（platform 空、mode=业务上报、subUrl=/openapi/metric/report、method=POST、auth=Token 鉴权、testStatus='—'）；②pages-datasource-interface.tsx MODES 加业务上报，加 isBusiness 分支——基本信息页签业务上报时显示接收地址输入、不显示转发方式 RadioGroup；接收配置页签 brief 换成「对接方式/接收地址/鉴权/报文格式/落库方式/所属平台（我方开放端点）」六格，订阅数据类型 form-row、加密块、有效期、平台规则 ID/状态整块隐藏；formToRow 加 business 分支（url=subUrl、method=POST、auth=Token 鉴权、forwardType=HTTP 推送、mqUrl/topicName/subType/subId 空）；列表测试状态/tag/最近执行/测试弹窗标题/删除确认/绑定详情落库方式全部按 business 分流（落库=按业务主键去重追加）；③pages-topic.tsx ifacePool 映射 mode='接口主动上报'→s.mode='业务上报'，commitSave/trySave/changeMode/savedMsg 条件全部扩展接口主动上报，选择接口区块对主动上报也显示，tcf-report 区块 repAddr/repToken input 改只读（地址从 curIface.subUrl 带出、Token 打码展示），报文模板 pre 用 curIface.subUrl；④卡片 dsi-12 加三模式口径、tcf-01 前置条件与存储方式补主动上报、tcf-02 口径改为「从台账选业务上报端点，本页不填地址/Token」。复核：tsc 29 条全为基线既有报错（新增 1 条 data.ts 类型错后放宽类型修复），pages-datasource-interface.tsx / pages-topic.tsx / index.tsx 零新增；浏览器 #page=datasource-interface 对接模式三 Radio 齐全、业务上报时 tab 切「基本信息/接收配置/出参字段」、接收配置 brief 六格无订阅残留；#page=topic-config 切接口主动上报时接口下拉列出「业务数据上报端点 · 未绑定」、tcf-report 摘要三格地址与打码 Token 正确、console 空 | src/prototypes/indicator-platform/data.ts、pages-datasource-interface.tsx、pages-topic.tsx、index.tsx；落盘脚本 step1_data.py / step2_dsi.py / step3_topic.py / step4_cards.py 见 agent workspace |
| 2026-11-04（第十一轮 · 算法规则 3 类收敛为 2 类，**基线变更**） | PRD / SRS / HLD / LLD 版本待升（本轮只改原型层，用户未要求回写文档） | **「指标计算」整类删除**，算法规则由 `SQL开发 / 维度计算 / 指标计算` 收敛为 `SQL开发 / 维度计算` 二选一。判定依据：①`ZB-2026-000058` 应急值班到岗率属真实业务（被预警 4 条 + 审批 + 监控 + 日志共 11 处引用），规则改为维度计算、定义改为「实际到岗人数 / 排班人数 × 100%，按值班日期分组」；②`ZB-2026-000065` 设备在线率反算校验是我自建的演示用例（仅 3 处引用），整条删除。连带清除 6 层残留：RuleKind 类型取值 / data.ts 两条指标 / RuntimeIndicator 的 formula 与 calcAlignDim 字段 / indicatorCalcDemo 演示数据 / 配置页 import / 导入模板文案 / 设计说明 7 张卡（含 icf-09 整卡删除）。**指标列表 8 条 → 7 条（`indicatorTotal = 7`）**，`publishedNos` 同步移除 000065。同时把「维度计算」预览从示意图改为真算：新建 `dim-calc.ts`（聚合口径唯一真源，配置页与列表图表预览共用，避免同一配置两个入口算出两个数）+ `dim-calc-preview.tsx`（四形态全部按结果集分组聚合，图下配明细表）；饼图/环形图按可加性收窄，求平均/最大值/最小值只给柱状（5 个在线率相加 = 468% 无意义）。复核：`npx tsc --noEmit` **零错误**（原基线错 pages-api 的 `Property 'no' does not exist on RuntimeApi` 一并修复——`RuntimeApi` 本无 `no` 字段，改按 `name` 比对，并补回被其他进程破坏的 return 根节点 fragment）；CDP 实测四条链路口径：在线率 5 行 97.31/96.29/94.17/91.41/89.19、设备总数环形 1,284 台、到岗率 3 行 87.5/85.41/100、压测样本双维 36 组；5 页导航零 JS 异常 | `src/prototypes/indicator-platform/`（新增 dim-calc.ts、dim-calc-preview.tsx；改 data.ts、pages-indicator-rule.tsx、pages-indicator-config.tsx、pages-indicator-chart.tsx、pages-indicator.tsx、pages-api.tsx、index.tsx、style.css）；测试记录 `08-文档/工作台Agent文档/上下文测试记录/20261104-维度计算改造与指标计算清理.md` |
