# projects-index — 项目总索引

> **所有原型项目的清单**：路径 / 入口URL / 产物位置 / 当前状态。
> 处理任何具体项目前，先在这里定位它，再按路径去读工程文件。
> 项目状态以 `session-handoff.md` 里的「进行中任务」为最新。

---

## 一、项目总览表

<!-- AUTO-SYNC:projects START（由 06-运行脚本/sync-projects-index.mjs 自动生成；块内结构勿手改，「状态（人工）」列的值会被保留） -->
| # | 项目名 | 磁盘路径（相对 `01 产品设计工作台\01-项目\`） | 原型 | 页面 | 初始化 | 负责智能体 | 状态（人工） |
|---|--------|------------------------------------------|------|------|--------|------------|--------------|
| 1 | 结构监测 | `结构监测` | 1 | 5 | 已初始化 | codebuddy | 生产中 |
| 2 | Dingcan_app | `Dingcan_app` | 1 | 0 | 已初始化 | — | 生产中 |
| 3 | 数字孪生 | `数字孪生` | 46 | 0 | 已初始化 | — | 生产中（最大） |
| 4 | 崂山国家实验室项目 | `崂山国家实验室项目` | 1 | 0 | 已初始化 | — | — |
| 5 | 指标管理平台 | `指标管理平台` | 1 | 27 | 已初始化 | doubao | — |
| 6 | Markdown 轻量编辑器 | `Markdown 轻量编辑器` | 1 | 0 | 已初始化 | workbuddy | — |
| 7 | 结构监测 | `_backup-上下文同步-20261015\结构监测` | 0 | — | 未初始化 | codebuddy | — |
| 8 | 指标管理平台 | `_backup-上下文同步-20261015\指标管理平台` | 0 | — | 未初始化 | doubao | — |
> 自动列：原型 / 页面 取自 `.axhub/make/project.json`，初始化 按 `package.json` + 原型数判定，负责智能体 取自项目 `project-memory.md` 协作信息表；`状态（人工）` 由人维护、同步时按项目名保留。
<!-- AUTO-SYNC:projects END -->

> 完整绝对路径前缀：`C:\Users\游翔\Documents\AI work\01 产品设计工作台\01-项目\`

---

## 二、各项目详情

### 1. 结构监测（主力项目）
- **路径**：`01-项目\结构监测`
- **原型**（`src/prototypes/`）：`alarm`、`dashboard`、`devices`、`diagnosis`、`report`
- **业务来源**：《物联网平台测点数据推送说明文档.docx》（桌面：泛卓办公/06 常州建科院/接口文档/结构监测/）
- **监测项**：24 项（振动频率/倾斜/应变-应力/水平位移/沉降/深层水平位移/轴力/测缝/水位/混凝土支撑轴力/挠度/温湿度/拉线/磁致测缝/振动索力/八通道温度/六通道应变/静压水准/表贴弦式应变/弦式钢筋计/弦式土压力/弦式锚杆测力/光纤光栅-应变/光纤光栅测缝或位移）
- **知识库**：`design-knowledge/`、`docs/`、`rules/`
- **预览**：`http://localhost:53817/?projectId=结构监测&p=<原型id>`

### 2. 健康档案
- **路径**：`01-项目\健康档案`
- **原型**（`src/prototypes/`）：`health-dashboard`、`enterprise-supply-chain-management-dashboard-community`
- **知识库**：`rules/`

### 3. Dingcan_app（点餐应用）
- **路径**：`01-项目\Dingcan_app`
- **原型**：`dingcan`
- **知识库**：`rules/`

### 4. 演示项目
- **路径**：`01-项目\演示项目`
- **原型**：`annotation-demo`、`beginner-guide`、`touch-and-talk-annotation-demo`
- **用途**：Axhub Make 功能演示 / 新智能体上手练习

### 5. 数字孪生（最大项目）
- **路径**：`01-项目\数字孪生`
- **原型**：40 个，涵盖告警（alarm-action/biztype/convergence/event/level/linkage/list/rule/status-config/topology）、配置（config-category/dictionary/vendor）、自定义字段（custom-field）、dashboard 等
- **知识库**：`docs/`、`rules/`

### 6. Nanshan_Visualization
- **路径**：`01-项目\Nanshan_Visualization`
- **状态**：占位，尚未初始化（无 package.json / 无原型）
- 若要使用，需先按模板初始化。

### 7. Rongzhihui_app
- **路径**：`01-项目\Rongzhihui_app`
- **状态**：占位，尚未初始化（无 package.json / 无原型）

---

## 三、每个项目的标准目录结构（理解"东西放哪"）

以结构监测为例，每个完整项目大致如此：

```
<项目>\
├── AGENTS.md           ← 给智能体的项目工作约定（必读！）
├── CLAUDE.md           ← 同 AGENTS（兼容层）
├── README.md           ← 项目说明
├── src\
│   ├── prototypes\<原型id>\   ← 原型代码（?p=<原型id>）
│   │     └── .spec\           ← 原型规格/评审（?p=<原型id>&spec=1）
│   ├── resources\      ← PRD/需求文档/项目资料（?doc=<path>）
│   ├── themes\<主题key>\      ← 设计系统/主题
├── rules\              ← 项目级规则（prototype-development-guide 等）
├── docs\               ← 项目业务文档
├── design-knowledge\   ← 设计知识库（部分项目有）
├── templates\          ← 文档模板
├── package.json / vite.config.ts
└── vite-plugins\
```

**产物如何预览（重要）**：
| 场景 | 位置 | Make 链接信号 |
|---|---|---|
| 原型开发/验收 | `src/prototypes/<id>/` | `?p=<id>` |
| PRD / SRS / 设计文档 | PRD `docs/*-PRD.md`；SRS `docs/01-需求与规划/`；HLD/LLD `docs/02-架构与设计/` | `?doc=` 仅对 `src/resources/` 下的资源有效 |
| 主题/设计系统 | `src/themes/<key>/` | `?theme=<key>` |

---

## 四、给新智能体的操作指引

1. 在 `session-handoff.md` 确认有没有"进行中的任务"涉及某个项目。
2. 到本项目路径，**先读 `AGENTS.md`**（它定义了本项目的工作流程、产物规范、对齐方式）。
3. 要理解需求 → 读 `docs/` 下的 PRD / 概念版（SRS 在 `docs/01-需求与规划/`）；资料、画布与素材在 `src/resources/`。
4. 要改原型 → 进 `src/prototypes/<id>/`，遵循 `rules/prototype-development-guide.md`。
5. 改完要预览 → 用 `http://localhost:53817/?projectId=<项目名>&p=<原型id>`（必须先启动该项目的开发栈）。
6. **跨项目通用规范**（24项监测项/向量模/监测粒度5种/单位/图表规范）见 `10-智能体记忆/`（`rules/` 与 `skills/`）。

---

## 五、维护约定

- **第一节总表已自动同步**（`<!-- AUTO-SYNC:projects -->` 块）：项目增删/改名、原型与页面数、初始化状态、负责智能体 由 `06-运行脚本/sync-projects-index.mjs` 从磁盘生成；面板运行期间 `01-项目` 一有变动就自动重写。
  - 想手动刷新：`node 06-运行脚本/sync-projects-index.mjs`；想校验：加 `--check`（`smoke-test.mjs` 已接入）。
  - **唯一需要人工维护的是表内「状态（人工）」列**（如 生产中/演示/学习），同步时按项目名保留，不会被覆盖。
- 第二节各项目详情（用途/知识库/清单）仍为人工维护：新增/删除/重命名项目时补写这一段。
- 块外散文与本节约定，AI 改动前先告知用户。
