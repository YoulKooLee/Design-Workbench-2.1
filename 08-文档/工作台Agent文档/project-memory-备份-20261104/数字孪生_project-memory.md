# 项目记忆

> ⚠️ **本文件是上下文衰减的兜底**：`AGENTS.md` 只在会话首轮注入一次，压缩**不会**把它带回来（2026-10-15 实测）。
> **读到本行 → 顺手确认一次 `AGENTS.md` 是否还在上下文里**；不在就 Read 一次它和 `.agents/skills/INDEX.md`。（触发条件是「读到本行」这个动作，不是「想起它不在」——后者不可能发生。）
> **每个模块闭环后立即写快照**——压缩只保留「做了什么动作」，**不保留「看到了什么」**（工具结果正文 99.5% 被丢弃）。
> **会话别开太长**：按模块 / 阶段新开会话，是让 `AGENTS.md` 重新注入的唯一办法。

> 本项目专属记忆。**优先级最高**：与工作台通用规则（`10-智能体记忆/rules/`）冲突时，以本文件为准。
> AI 在本项目内开发时，先读本文件再动手；日常踩坑先记入「二、项目经验」，不急着进 `10-智能体记忆/rules/`。

## 一、项目画像

- **定位**：腾讯数字孪生底座（`https://dtwin.tencent.com/worker/home?w=1133&t=100001`）真实生产环境的 **1:1 高保真复刻原型工程**。目标不是重新设计，而是把真实系统逐页还原到可渲染、可交互、可验收，作为交付 / 外包 / 开发的视觉与交互真源。
- **功能需求**（真源 `docs/2026-07-24-腾讯数字孪生底座-PRD.md` v1.2）：
  - 首页看板：4 统计卡 + 空间数据 + 设备环形图 + 按设备类型进度条（**真实首页无「告警数据」板块**）
  - 物联管理 9 页：产品 / 模型 / 设备 / 分组 / 自定义字段 / 标签 / 设备调试 / 协议 + 告警中心 11 页
  - 数据融合 14 页：工作台（场景搭建 / 节点创建 / 场景模板 / 流程模板）、资源库（数据源 / 模型 / 指标 / 定时）、资产库
  - 资源管理 3 页、配置管理 3 页（+2 个菜单别名）、应用列表 1 页、项目成员 1 页
  - 合计 **46 个原型页，覆盖真实站点 45 条路由**；逐页状态见 `docs/1to1复刻进度.md`
- **设计风格**：
  - 页面壳沿用真实站点：背景 `#f3f4f7`、侧边栏纯白、主色 `#0076FF`、强调色 `#107C10`
  - 右侧「设计说明 DESIGN NOTES」Xbox 风：直角、扁平无阴影、白底绿边、编号卡片 + SVG 贝塞尔连线 + 悬停高亮
  - 文本色阶 `#0f172a` / `#64748b` / `#94a3b8`
  - **1:1 优先**：不得为了「好看」改变真实站点的信息层级与文案；样式增强只加在设计说明侧
- **开发规范**：
  - React 18 + Vite 5 + Tailwind 4，`type: module`，包管理 **pnpm**（`packageManager: pnpm@10.20.0`）
  - 一页一目录 `src/prototypes/<pageKey>/index.tsx`（可选 `annotation-source.json`）
  - 公共层 `src/common/`：`PrototypeLayout.tsx`（三栏壳 + 设计说明连线）、`SharedComponents.tsx`、`Theme.ts`、`useHashPage.ts`、`side-menu/`、`PrototypeNav.tsx`（2026-10-25 新增，原型内联全站导航）
  - 每个页面文件头必须有 `// @name 中文显示名`，侧边栏与元数据靠它取中文名
  - 新建页流程：建目录 → Write `index.tsx` → `node scripts/sync-project-metadata.mjs` → 渲染验收
- **技术约束**：
  - **严禁 npm install**（pnpm 项目，装依赖用 node22+pnpm）
  - 预览固定 `http://localhost:51722/prototypes/<pageKey>`；Make 管理端 `http://localhost:53817/`
  - 渲染验收 `node scripts/verify-all.cjs`（46 页、复用 tab、命令超时、增量写 `imports/verify/verify-all-result.json`；`ONLY="a,b"` 指定页）
  - 真实站点访问依赖调试 Chrome `--remote-debugging-port=9222` + 用户登录态，保活会过期
  - 禁止整目录 Read `src/component-templates/`、工作台 `03-组件库`（体积大）；单组件查 `.agents/component-manifest.json`

## 二、项目经验

> 本项目踩坑记录，一条一组。格式：`日期 | 场景 | 根因 | 修复 | 验证`。
> 判定可跨项目复用时，提炼为工作台层规则（`10-智能体记忆/rules/`）（scope: universal/workspace）并在「四、结项状态」登记规则 id。

- 2026-08-25 | 按早期 PRD 做出真实站点不存在的「告警数据」板块 | 07-24 盘点含设想内容，未与真实抓取对齐 | 全站 45 路由抓图后逐页核对，删掉设想板块，6 份文档加「1:1 校准横幅」 | `imports/site-capture/1to1/001-home.png` 对照 + 46/46 渲染验收
- 2026-08-26 | 菜单「设备产品 / 设备主数据」找不到对应原型 | 真实系统这两项是 `iot-product` / `iot-device` 的别名，非独立页 | 配置管理下按别名复用，不新建页 | 侧边栏条目与真实菜单一致
- 2026-08-28 | 场景搭建节点清单与真实不符 | 早期按截图肉眼采集，未走接口 | 交叉验证 `node/listNode`(108) + `catalog/getAllCatalogs` + `flow/get`，逐个点击 5 个工具条分类 | 定版 58 可见节点 / 33 分组；早期把「上报模拟数据」误录为「消费Kafka数据」已修正
- 2026-08-28 | 节点配置面板部分字段选择后白屏 | `select` 值与节点 schema 不匹配时渲染抛错 | select 字段加空值容错 | 逐个节点点开配置面板无白屏
- 2026-09-02 | 新增页面在 Make 里看不见 | `entries.json` 未重新生成 | 跑 `sync-project-metadata.mjs`；判断页签有无条目以 `.axhub/make/entries.json` 为准 | entries.json 含该 `prototypes/<key>`
- 2026-09-29 | 设计说明面板落盘 409 | 预览服务 `?raw` 有两种包裹（双引号 JSON / 反引号模板）且需保留 CRLF，未完整反转义则文本替换匹配不上 | 适配器反转义到与磁盘逐字节一致再 replace | 保存成功且回读一致
- 2026-10-25 | `vite` 起不来：`@vitejs/plugin-react` 报 ESM 文件不能被 require | **package.json 带 UTF-8 BOM**，Vite 用 `JSON.parse` 读它失败 → 误判为 CJS 包 → 配置按 CJS 打包 | 用 node 剥掉 BOM（符合「数据文件必须无 BOM」规范） | `JSON.parse` 通过、vite 正常启动
- 2026-10-25 | `http://localhost:53817/prototypes/*` 返回 503 | 只有 Make 管理端在跑，Vite 预览服务 51722 未启动 | 先起 51722，再用 51722 地址预览与验收 | 51722 起来后页面 200
- 2026-10-25 | 新会话读到 `project-memory.md` 是空模板，项目事实全丢 | 模板未按项目实际内容填写，压缩后无兜底 | 补写真实画像与经验（本文件 v1） | 本文件含定位 / 46 页 / 约束 / 踩坑
- 2026-10-25 | **「真实首页无告警板块」这个定论是错的（险些二次传播）** | 站点是 App Shell + **内容区内部滚动**，`Page.captureScreenshot({captureBeyondViewport:true})` 在无 `clip` 时只拿到视口高度（1920×945），折叠线以下不在图里；而 DOM 提取能拿到全部表格 —— 两轮抓取注册表都在首页记录了 7 列告警类型表（`rowCount` 24 / 1） | 撤回定论改为「待复核」，恢复 PRD §5.5 规格与 §4.1 线框，6 份文档统一标注待复核 | `grep -rn "已证伪" docs/*.md` 无残留；裁定需登录后分段截图
- 2026-10-25 | 全站导航接入后，验收脚本会「假通过」 | 判定条件是 `document.body.innerText.length > 30`，导航文字本身就够 30 字符，白屏页也会 PASS | 改为只统计 `.plx-left`（内容区）长度，并把预览地址抽成 `BASE` 环境变量（端口会漂移 51720/51721/51722） | 46/46 PASS 且内容字数落在合理区间

## 二·五、模块快照（每模块闭环后立即写，压缩不失忆）

> 格式见 `.agents/rules/compaction-recovery.md`。只放摘要与路径，不放正文。

### 模块快照：告警拓扑规则（端：web）
- **状态**：已完成（2026-10-29）
- **职责**：定义设备间告警的**一对多**级联归属，把下属设备的告警归到上级节点
- **对外接口**：`AlarmTopology{name, period, enabled, nodes: TopologyNode[]}` → 保存 → 列表卡片树形展示；`TopologyNode{device, type, children[]}`
- **依赖模块**：上游 设备管理（取设备名下拉）、告警类型树（`src/core/alarmTypes.ts`，9 类 79 细类，抓自线上左树）；下游 告警收敛/影响面分析（未接执行，仅数据就绪）
- **数据实体**：`alarmTopologies`（种子 4 条已改树形，SEED_VERSION 17）
- **关键决策**：① 数据模型从线性数组改 `children` 树 —— 线性结构物理上无法表达 1 对多；② 新增/编辑改整页而非弹窗 —— 真实环境是带 `‹ 返回` 的整页；③ 根节点唯一且不可删 —— 真实画布只有一个 L1
- **跨端差异**：画布依赖横向滚动，移动端需改纵向折叠树
- **未完成 TODO**：① 拓扑尚未参与实际告警收敛计算（仅配置态）；② 节点拖拽排序未做（真实环境有此能力，本次未验证）

### 模块快照：告警拓扑规则 · 关键文件
- 画布组件 `src/core/features/TopologyCanvas.tsx`（层列 + 贝塞尔连线 + 树增删）
- 表单与校验 `src/core/features/TopologyEditor.tsx`
- 列表页 `src/prototypes/alarm-topology/index.tsx`、整页编辑 `src/prototypes/alarm-topology-edit/index.tsx`
- 文档：SRS 3.5.3.10（V1.4 重写）/ HLD 5.2 实体行（V1.3）/ LLD 3.5 TopologyService + 4.3.21 表结构（V1.4）

### 模块快照：告警阈值规则（端：web）
- **状态**：已完成（2026-10-29）
- **职责**：定义「哪些事件 + 什么判断规则 + 什么频率」生成什么类型级别的告警
- **对外接口**：`AlarmRule{name, ruleDesc, eventIds[], logicOp, freqMode, freqMinutes, clearFreqMode, clearFreqMinutes, bizType, level, validPeriod, enabled, expression}` → 列表 9 列
- **依赖模块**：上游 事件管理（`alarmEvents`，选触发事件）、告警业务类型、告警级别配置；下游 告警列表生成、联动触发、逆规则自动消除
- **数据实体**：`alarmRules`（种子 8 条已补 eventIds/logicOp/freqMode，SEED_VERSION 18）
- **关键决策**：① 新增/编辑改**整页**而非弹窗 —— 真实是带 `‹ 返回` 的三区整页；② 事件由单选改**多选**（`eventIds[]`），配 `logicOp` 才能表达 or/and/混合；③ 规则编号系统生成，不占表单 —— 真实新增页无编码字段；④ 列表去掉级别/业务类型/状态筛选 —— 真实只有搜索框
- **跨端差异**：三区表单在窄屏需改纵向单列；事件选择弹窗在移动端可改全屏选择页
- **未完成 TODO**：① 混合逻辑计算（mix）目前只做了下拉项与文案，未实现分组表达式编辑器；② 频率条件未接入实际判定链路（`execution.ts` 仍按旧 expression 判定）

### 模块快照：告警阈值规则 · 关键文件
- 列表 `src/prototypes/alarm-rule/index.tsx`（9 列 + toolbarInline + onAdd 跳整页）
- 编辑 `src/prototypes/alarm-rule-edit/index.tsx`（三区表单 + 事件多选弹窗）
- 通用能力 `src/core/crud/EntityListPage.tsx` 新增 `onAdd` / `toolbarInline`（新增与搜索同行，真实列表页形态）
- 文档：SRS 3.5.3.4（V1.5 重写）/ HLD 5.2 阈值规则实体行（V1.4）/ LLD 3.5 RuleService + 4.3.16 表结构（V1.4 续）

### 模块快照：模型功能定义编辑态（端：web）
- **状态**：已完成（2026-10-29）
- **职责**：在整页中维护一个物模型的属性/事件/服务，草稿编辑 + 发布生效
- **对外接口**：`ModelFunction{id, identifier, name, kind, dataType, rw, description}` 数组 → `updateOne(TABLES.deviceModels, id, { functions })`
- **依赖模块**：上游 模型管理（选模型，`sessionStorage['model:func']` 传 id）；下游 设备调试（取属性做上报/下发）、数据融合解析模型（字段映射目标）
- **数据实体**：`deviceModels.functions`（高压进线柜补齐 12 属性 + 1 服务，SEED_VERSION 19）
- **关键决策**：① 编辑态做**独立整页**而非弹窗 —— 真实是「‹ 模型功能定义 + 发布/取消」整页；② 草稿只在本地 state，发布才 `updateOne` —— 真实提示「需发布后才会正式生效」；③ 判重键用 `identifier` 而非名称 —— 真实以「ID」列判重；④ `KIND_LABEL/TYPE_LABEL/schemaOf` 抽到 `core/features/modelFunctionMeta.ts` 供列表页与编辑页共用
- **跨端差异**：8 列表格在移动端需横向滚动；弹窗可改全屏抽屉
- **未完成 TODO**：① 「导入模型json」只给提示，未做文件解析；② 拖拽排序用上下箭头替代（真实是拖拽手柄），视觉已用 ▲▼ 表达

### 模块快照：模型功能定义 · 关键文件
- 编辑页 `src/prototypes/iot-model-func/index.tsx`、列表页 `src/prototypes/iot-model/index.tsx`（已改为跳转）
- 共享口径 `src/core/features/modelFunctionMeta.ts`
- 文档：SRS 3.5.2.2（V1.6 重写，含 3.5.2.2 编辑态小节）/ HLD 5.2 功能项实体行（V1.5）/ LLD 4.3.3 功能项表 + 4.3.2b 发布策略（V1.4 续 2）

### 模块快照：工作台逻辑编排画布（端：web）
- **状态**：已完成（2026-10-29），四件齐（原型 + SRS + HLD + LLD + 快照）
- **职责**：维护一个「自定义节点」的编排定义——画布上的节点卡片与连线即节点内容，发布后供场景编排引用
- **对外接口**：`NodeFlow{nodes:{id,kind,title,x,y,params[]}[],edges:{id,from,to}[]}` → `create/updateOne(TABLES.dataNodes, { flow, name, desc, nodeType, status:'已发布' })`
- **依赖模块**：上游 场景编排（实例化已发布节点）；下游 无。列表入口 `data-node-create`，画布页 `data-node-canvas`
- **数据实体**：`dataNodes.flow`（种子 DNODE-0003 3 节点 2 连线、DNODE-0007 获取能耗数据 5 节点 5 连线，SEED_VERSION 24）
- **关键决策**：① 新建/编辑做**独立整页画布**而非弹窗 —— 真实环境节点详情页本身就是编排器；② 画布**随节点定义整体存储**（单份 flow），不另建 flow 表；③ 草稿只在本地 state，点「发布」才落库并置已发布；④ 列表「节点类型」由画布分类派生（含输出→转换 / 含连接→连接 / 含过滤逻辑→逻辑 / 其余→存储），保证左树四类过滤与画布七类分类两套维度能对上；⑤ 画布尺寸按容器与内容取大值，首次进入按内容自适应缩放（下限 70%），避免一进来就横向滚动
- **跨端差异**：画布依赖拖拽与悬停，移动端只读展示；右侧设置面板在窄屏改抽屉
- **未完成 TODO**：① 缩放只做按钮，未做 Ctrl+滚轮/空格拖拽平移；② 连线只支持点选端口，未做按住拖线；③ 画布未做撤销重做与框选；④ 节点参数区未做必填与类型联动校验

### 模块快照：逻辑编排画布 · 关键文件
- 画布页 `src/prototypes/data-node-canvas/index.tsx`、列表页 `src/prototypes/data-node-create/index.tsx`（新增入口改为跳转）
- 画布组件 `src/core/features/NodeFlowCanvas.tsx`、画布口径与操作 `src/core/features/nodeFlowMeta.ts`
- 模型 `src/core/models.ts`（NodeKind / NodeParam / FlowNode / FlowEdge / NodeFlow，DataNode 补 flow 与 creator）
- 文档：SRS 3.5.5.2（V1.7 重写）/ HLD 5.2 原子节点实体行（V1.6）/ LLD 4.7.3 + 3.8.4.5 + F-15~F-18（V1.4 续 3）
- 验证：`imports/shot-check/m4-canvas4.png`（画布）、`m4-list.png`（列表）、CDP 实测「加节点 5→6 / 连线 2→3 / 拖动 40,420→126,491 / 发布回列表」；回归场景 `verify-interaction.cjs m4canvas`（10 项全通过：列表→新建进画布→默认两节点→加节点→连线→发布→落库→重进回填）；`verify-all.cjs` 全量 54 页通过

## 三、过程层（T1 落地 · 压缩可丢 · 永不进基线）

> 以下三个小节为**过程层**：讨论、试错、被否决方案、任务进度等**不得写入基线**（PRD/SRS），一律落在这里。
> 压缩时可丢，但 `[否决]` 条目**必须保留理由一行**。写入规则见 AGENTS.md「写入侧三态门禁」。

### 决策记录（过程层·压缩可丢·永不进基线）

> 一条一组，格式：`日期 | [类型] | 决策 | 理由 | 状态(采纳/否决/挂起)`。类型 ∈ `[决策]` `[修复]` `[风险]` `[安全]`；否决必填理由。

- 2026-07-31 | 范围定为「全站 1:1 还原」而非只做首页看板 | 单页还原支撑不了交付评审，全站才能暴露真实信息架构 | 采纳
- 2026-08-26 | 真实抓取产物为唯一权威基准；PRD 设想章节保留并加校准横幅 | 直接删会丢失设计推演痕迹 | 采纳（2026-10-25 改为「正文直接改写为真实结构 + 保留修订记录」，理由：横幅已不足以指挥后续开发）
- 2026-08-28 | 场景搭建用 `React.createElement` 而非 JSX 写动态节点树 | 1800+ 行、节点树由配置驱动，createElement 更直接 | 采纳
- 2026-09-02 | 不做原型内联全站导航，导航交给 Make 客户端 | PrototypeLayout 三栏改造风险高 | **挂起 → 2026-10-25 重新评估通过**：改为「可选」导航（默认开启，`nav={false}` 可关），不影响既有页面渲染
- 2026-09-29 | 设计说明模块做成可复制打包件，不强绑 Axhub | 需复用到其他项目，落盘走 `onSave` 适配器 | 采纳（仍 0 页接入，能力就绪未落地）
- 2026-10-25 | 不把 `docs/demo.html`、`设计说明模块-接入手册.html` 纳入需求基线 | 前者是临时演示页，后者是打包件说明，均非需求真源 | 采纳
- 2026-10-27 | SRS/HLD/LLD 三份文档改为「内版本号升级、文件名不改」 | 文件名带版本号会牵动 src/resources 副本与引用，改内版本可避免断链；版本以 1.1 版本历史为准 | 采纳
- 2026-10-27 | 数据融合第二批按 8 个模块覆盖 14 页，不按页拆章 | 模型 4 页、指标 2 页、模板 2 页、数据源 2 页各自同构，按页拆会产生大量重复条文 | 采纳
- 2026-10-27 | 四类数据模型合表（`data_models.kind`）而非分四张表 | 列表、查询、发布流程完全一致，分表会产生四份重复服务代码 | 采纳
- 2026-10-27 | 场景画布的节点/连线设计为独立表（`scene_nodes`/`scene_edges`），连线以 `node_key` 而非主键关联 | 画布整体覆盖保存需先删后插，用稳定键可避免主键顺序依赖 | 采纳，原型尚未落库
- 2026-10-27 | REA 试水判定「收益不足，停用」 | 本机 Node 22.22.2 不满足 `^22.23.4`；`analyze-javascript-application` 跑 150 秒仍停在 inventory 阶段、证据包为空；其网站分析与现有 CDP 方案重叠，且分析对象是自有代码，无逆向价值 | 否决（理由如上）

### 变更流水（过程层·压缩可丢·永不进基线）

> 一条一组，格式：`日期 | [类型] | 变更 | 触发人 | 影响范围`。`[敏感]` 条目只口头说明，不写在这里。

- 2026-07-24 | 原型盘点（首页 CDP 抓取 + 完整菜单树） | 用户 | docs
- 2026-07-27 | 信息架构 + 交互补充规范（45 路由） | 用户 | docs
- 2026-07-31 | PRD v1.2 定稿 | 用户 | docs
- 2026-08-26 | 1:1 全站抓取 + 6 份文档加校准横幅 | 用户 | docs / imports
- 2026-08-31 | 批次 1–4 复刻完成，46 页全量渲染验收通过 | 用户 | src/prototypes
- 2026-09-02 | 场景搭建节点体系全量核对（58 节点 / 33 分组） | 用户 | data-scene + docs
- 2026-09-11 | 「数字孪生原型完整交付」大提交 `34e2144` | 用户 | 全工程
- 2026-09-29 | 设计说明模块打包件产出（规范 + 接入手册 + 组件） | 用户 | src/common + docs
- 2026-10-25 | 项目记忆补写 / 六份文档「证伪→待复核」修正 / 原型内联全站导航（新增 `prototype-menu.ts` + `PrototypeNav.tsx`）/ `verify-all.cjs` 加 BASE 与内容区判定 / package.json 去 BOM | 用户 | 全工程
- 2026-10-27 | 第一批 SRS V1.0 / HLD V1.0 / LLD V1.0 落地（2531 / 714 / 2949 行） | 用户 | docs
- 2026-10-27 | 原型三条运行链路打通：接入→解析→告警→处置、场景发布、定时任务；新增 4 张运行过程表，`TABLES` 39→44 | 用户 | src/core + src/prototypes
- 2026-10-27 | 第二批落地：SRS V1.1（3615 行、+9 节 3.5.5、+8 条 DFU）/ HLD V1.1（731 行、+14 实体 +1 接口分组）/ LLD V1.1（4521 行、+3.8 模块、+14 表、+62 接口、+6 个重点接口详设） | 用户 | docs + src/resources
- 2026-10-27 | P2 十二项结构对齐落地（统一列表范式组件 ResourceListPage、场景列表页、告警/设备列表补齐、标准模型树、节点卡片、首页口径）+ 第三批 SRS V1.3（4851 行、+3.5.6~3.5.9 共 11 页）/ HLD V1.2（753 行、+3 模块 +13 实体 +3 分组）/ LLD V1.3（5924 行、+3.9 模块、+13 表与 DDL、+4.10 字段补强、+4 接口详设、清单 189 条）；TABLES 49、种子版本 14 | 用户 | docs + src/core + src/prototypes

### 任务进度（过程层·与 compaction-recovery.md 对齐）

> 与 `compaction-recovery.md` 恢复检查表第 1 项对齐：TaskList 中 in_progress 任务。
> 有且仅有一个 in_progress；压缩恢复时以此为准。

- 2026-10-25 四项待办：① 真实快照 **完成** → ② docs 深度修订 **完成** → ③ 侧边菜单串联 **完成**（46/46 通过）→ ④ 真实环境复验 **阻塞**：9222 已拉起但登录态失效（跳 `cloud.tencent.com/login`），等用户登录后做「首页告警板块」分段截图裁定
- 2026-10-27 **首页告警板块争议已关闭**：`imports/site-capture/首页.txt` 第 267–289 行有完整证据（告警总数 1236 / 处理率 50.32% / 7 列表头）；站点为 App Shell + 内容区内部滚动，截图只取视口高度才看不到。PRD 已回写，dashboard 已补齐，验收 10/10
- 2026-10-27 第一批交付完成（`verify-all` 46/46、`verify-interaction` 129/129、typecheck 0 错）
- 2026-10-27 第二批交付完成（SRS/HLD/LLD 内版本均升至 V1.1，三份文档禁用词 0、无 BOM、围栏配平；`docs:sync` 已同步 3 份副本）
- 2026-10-27 **数据融合 5 处链路缺口已按用户指令补齐**：① 接入读解析模型（上报按产品找已发布模型 + 字段映射归一标准字段）② 场景画布落库（sceneNodes/sceneEdges 整体覆盖保存）③ 模型字段映射编辑面板 ④ 指标参与判定（规则可仅绑 metricId）⑤ 数据源发布闸门 + 页面权限 + 真实批量测试。新增 3 表（TABLES 44→47）、种子版本 10；evalRule 左值放宽支持中文标准字段名。回归：`verify-all` 46/46、`verify-interaction` **145/145**（新增 datafusion 场景 16 断言）、typecheck 0 错；SRS 3.5.5.9 补齐记录与 LLD 4.7/A.1 状态已同步，docs:sync 完成
- 2026-10-27 **业务流程走查发现的问题当日修复完毕**（用户指令「一起修」）：P0 五项闭环（设备激活入口+前置校验、告警状态四状态单一真源、收敛不新增记录改累加重复次数、定时任务补执行对象真实驱动、告警联动执行动作落 linkageRuns）+ P1 六项（全站表头重复列清零、级别颜色/业务类型下拉读配置、接入日志标准字段、自定义字段种子、命令下发-回执分离三态）。TABLES 47→48（linkageRuns），种子版本 12（电表补智能电表标准模型，修复 MET-0001 悬空）；新增 src/core/execution.ts。回归：verify-all 46/46、verify-interaction **170/170**（新增 p0closure 场景 23 断言）、typecheck 0 错、9 张目检截图。SRS/LLD 内版本 V1.2，走查报告追加第八章修复记录，docs:sync 完成
- 2026-10-27 **P2 对齐 + 第三批交付完成**（verify-all 46/46、verify-interaction 174/174、typecheck 0 错、11 页目检截图；SRS V1.3 / HLD V1.2 / LLD V1.3，docs:sync 副本行数一致）。第三批实际 11 页（原口径 12 页含 1 个菜单别名）；config-category / config-dictionary 面包屑「配置中心」已统一为「配置管理」
- **下一步**：全部三批交付完毕，无排队任务；真实环境复验仍待用户开调试 Chrome
- **待拍板**：① 真实环境复验需用户开着调试模式的 Chrome ② 两处未补缺口属真实环境研发范围：模板创建场景的快照复制、场景执行引擎（真实取数与计算）③ LLD 附录 B 新增 L-7~L-10（厂商类型枚举收敛 / 目录改 parent_id 迁移 / 区划层级不连续样本 / 成员页开放范围）
- **待拍板**：① 真实环境复验需用户开着调试模式的 Chrome（本会话浏览器已关闭，脚本 `启动Chrome调试模式.bat` 会结束全部 chrome 进程）② 两处未补的缺口属真实环境研发范围：模板创建场景的快照复制、场景执行引擎（真实取数与计算）

## 四、结项状态

- **结项日期**：未结项（原型交付版本已提交 `34e2144`；2026-10-27 第一、二批文档已交付，第三批待启动）
- **提炼到工作台层的方法论**：无（1:1 复刻流程暂未提炼为工作台规则；「JSON 无 BOM」属工作台层既有规范，此处仅作实例）
- **归档位置**：无

### 全站一致性抽查（2026-10-29 17:30）

- 方法：用 CDP 实时抓「当前原型页渲染的 thead 表头 + 全部可点元素文本」，与 `imports/compare-20261029/real/*.json` 的真实 heads/buttons 逐页比对（48 页）。**同一 CDP 标签页同一时刻只允许一个脚本占用**，否则会互相导航导致结果错位（本次踩坑：与 verify-interaction 并行，报出 70+ 假失败）。
- 结果：48 页里 12 页曾报差异，核实后**表头 9 页全对**（iot-device / alarm-list / data-source 只多一个全选空列，真实同样有），真正缺口 4 处，已修：
  - `config-space-type` 工具栏补「建筑园区实体类型」（`space-type-tree`）
  - `config-space-code` 工具栏补「建筑园区实体编码规则及层级」（`space-code-tree`）
  - `project-roles` 行内「详情」改「查看」→ `EntityListPage` 新增通用 prop `detailText`
  - `project-members` / `config-region` / `iot-group` / `iot-protocol` 经核实无缺口（「项目角色」「维护行政区划」等是 `<a>` 链接，按 button 抓会误判）
- 仍待办：`iot-debug` 缺真实按钮「选择调试设备」（现用设备下拉承载选择）；`iot-group`/`iot-protocol` 真实抓取 heads 为空，需回真实环境复核是卡片式还是抓取失败。
