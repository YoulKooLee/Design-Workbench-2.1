# 产品设计工作台 v2 · 组件库迭代方案（CodeBuddy）

> 起草：2026-09-13 · CodeBuddy
> 输入：`更新资料\vibepm-dev-agent-v1.7\vibepm-dev-agent\frame\admin`（实地核验 11 个组件样板页 + 共享层 + `_meta`）
> 状态：**待评审**，标 ❓ 处需你拍板。
> 定位：本稿是 v2 方案的**第 4 份**，与前三稿并列、互补、**不覆盖**。
>
> | 稿件 | 治什么 |
> |---|---|
> | `-v2-迭代方案.md`（CodeBuddy 核验版） | 工作台**底座**：启动链路 / 记忆分层 / 目录卫生 |
> | `-v2-优化方案.md`（WorkBuddy 初稿） | 同上 |
> | `-v2-优化方案-综合稿.md`（豆包） | 同上 + 智能体通信集成 |
> | **本稿** | **设计资产**：把 v1.7 的组件从「样板」升级为「可 import 的组件库」 |

---

## 0. 摘要

一句话：**v1.7 的组件现在是"给人看的样板"，每次做业务页都要手抄一遍类名和结构；本稿把它变成"给工程调用的库"——`import { ProSearchPanel } from '@vibepm/ui'`。**

已拍板的三个前提（你 2026-09-13 决定）：

| 维度 | 决定 |
|---|---|
| 范围 | `frame/admin` 的 11 个 UI 组件样板页 |
| 形态 | **真组件库**：可 import + registry + 类型 + 按需引入 |
| 技术栈 | **Vue 3 + Arco**（对齐 `frame/admin` 原样）→ ⚠️ 2026-09-13 新增核验推翻"改造量最小"这个前提，见 **§1.4** 与 **§9-D1** |

v2 这一块做四件事：

| 动作 | 干什么 | 对应根因 |
|---|---|---|
| **建库** | 抽成 `@vibepm/ui` 单包多入口（Vue3 + Arco + TS） | R1/R2 |
| **立契** | `registry.json` 机器可读组件清单，Agent 与文档共用真源 | R6 |
| **消双写** | `frame/admin` 11 页改为**消费库**，修一次组件两处同步 | R1/R2 |
| **补治理** | registry 校验 + 单测 + 立账，顺手修 v1.7 三处已核实缺陷 | R7 |

---

## 1. 实测盘点（核验边界）

### 1.1 资产规模

- `frame/admin/`：**69 js / 50 html / 48 css / 23 woff2 / 8 svg**，共 205 文件。
- 11 个组件样板页：
  `component-` + `basic` / `extended` / `chart` / `chart-extended` / `chart-palette` / `form` / `form-extended` / `list` / `metric-card` / `rich-text` / `table-extended`。
- 结构**高度同构**：`component-showcase-page` > `a-alert` 说明 > 多个 `a-card` 分组。这是好事——展示壳本身就该抽成 `layout/*`。

### 1.2 地基已经存在（抽取的起点比想象中好）

| 设施 | 位置 | 职责 |
|---|---|---|
| **图表底座** | `js/charts/shadcn-charts.js`（**183KB**） | `ProShadcnCharts.mountXxx` **16 个挂载器**，底层 Unovis |
| **配色 token 层** | `js/chart-palette.js` → `window.ArcoProChartPalette` | 4 套方案，运行时 `setProperty('--chart-N')` + localStorage 跨页持久化 |
| **token 兜底** | `css/arco-theme-pro.css:15` | `--chart-N` 默认值，注释明写"正式值由 chart-palette.js 覆盖" |
| **指标卡样式** | `css/list-card.css`（36KB） | `list-card-metric-*` 家族 |
| **展示页样式** | `css/component-showcase.css` | 11 页共用壳样式 |

**共享层清单**（抽库时作为"基线依赖"）：
- CSS：`fonts/index.css`、`vendor/arco/css/arco.css`、`vendor/fontawesome/*`、`css/fa-icons.css`、`css/arco-theme-pro.css`、`css/layout.css`、`css/pages-common.css`、`css/component-showcase.css`
- JS：`vendor/vue`、`vendor/arco`、`js/{fa-icons,settings,locale,auth,routes,mock-data,arco-theme,shell,boot}.js`

**页面专属 CSS 只有 4 个**：`component-list.css`、`component-form.css`、`component-chart-extended.css`、`component-chart-palette.css`。
其余 7 页**没有专属 CSS**，样式全落在共享 `component-showcase.css` —— 这解释了 R2（类名混乱）。

### 1.3 可抽组件总量（实测，非估算）

| 批次 | 页面 | 可抽组件 | 其中"零耦合、直接可复用" |
|---|---|---|---|
| 基础类 | `component-basic`、`component-extended`、`component-list` | **12–15** | **6–8** |
| 表单类 | `component-form`、`component-form-extended`、`component-table-extended` | **9–10** | **0**（全部内联、尚未组件化） |
| 图表/指标类 | `chart`、`chart-extended`、`chart-palette`、`metric-card`、`rich-text` | **20–24** | **2**（配色方案卡、富文本外壳） |
| **合计** | 11 页 | **41–49** | 8–10 |

去重收敛后约 **40 个正式组件**。

### 1.4 v1.7 `admin/` 与 Axhub `admin/` 关系辨析（2026-09-13 新增核验）

D1 悬而未决的根源，是我此前把两个 `admin/` 当成"同类工程的两种栈"。实地核对后**结论相反：它们不是同一个东西，也不在同一层。**

| 维度 | v1.7 `frame/admin/` | Axhub `02-模板/_project-template/admin/` |
|---|---|---|
| 真实身份 | **静态视觉样板库**（"图纸"） | **可运行工程脚手架**（"工地"） |
| 工程属性 | **无 `package.json`、无构建**（实测 `package.json` 0 命中），双击即看 | `axuremart-ai-web`，Vite 7 + `vue-tsc`，`pnpm dev/build`（默认 Mock，端口 3006） |
| UI 库 | **Arco Design Vue**（`vendor/arco/`、`css/arco-theme-pro.css`） | **Element Plus 2.11** |
| 页面形态 | 50 个 `.html` + `js/pages/*.js`（Options API 对象，**无 SFC**） | `.vue` SFC + `<script setup>` + TS |
| 图表 | 自研 `js/charts/shadcn-charts.js`（Unovis 底座，16 个 mount 器） | ECharts 5.6 + @antv/g2 5.4 |
| 富文本 | `document.execCommand`（**已废弃 API**） | wangEditor 5.1 + TipTap 3.22 |
| 组件层 | **无**（组件全内联在页面脚本里，即本稿 R1） | **已有**：`src/components/core/` **43 个 `.vue`**（`art-*` 前缀）+ `business` + `custom` + `Annotation` |
| 状态/路由/i18n | 无 | Pinia 3 + vue-router 4 + vue-i18n 9 + Mock 体系 |
| 体量 | 205 文件（50 html / 63 js / 48 css） | 347 文件（src 323） |
| 实现规范 | 无（页面本身即基线） | `admin/README-DEV.md` **31KB**，Element Plus 单一事实源 |

**唯一共同点是名字都叫 `admin`、都是后台界面。**

#### 决定性事实：Axhub 没有 Arco 的规范落点

Axhub 模板的 UI 库规范目录 `.agents/knowledge/ui-libs/` 只有 **4 套**：`ant-design-vue` / `element-plus` / `shadcn` / `vant`。

- 对 `_project-template/**/*.md` 全文检索 `Arco`（区分大小写）→ **0 命中**。
- 每套 UI 库规范是 `{components.md, pages.md}` 两份（EP 实测），由 `page-generator` 技能按 `README-DEV.md` 的规范加载顺序读取。

**推论：抽出的 Arco 组件库在 Axhub 生态里是"有库、无说明书"** —— `page-generator` 生成页面时找不到 `ui-libs/arco/`，库抽了也接不进生成链路。这是 D1 此前没有暴露出的硬约束。

#### 附：Axhub 侧与 v1.7 同构的一处文档漂移

`admin/README-DEV.md:42-45` 声明工作区有 `shadcn/` 子项目（React + shadcn/ui，含自己的 `package.json` 与 `README-DEV.md`），实测 `_project-template/` 下**无 `shadcn/` 目录** —— 与 v1.7 `frame/README.md` 承诺 `web`/`app` 却只有 `admin` 完全同型（见 §2.1）。说明"文档声明 > 实物存在"是这套模板体系的**系统性风险**，不只是 v1.7 的单点问题。

#### 那么"能合并吗" —— 分三层，答案不同

| 层的"合并" | 可否 | 理由 |
|---|---|---|
| ① **合并成一个工程**（样板塞进 Vite） | ❌ 不该做 | 样板页的价值就在"零依赖、双击可看、AI 好读"；塞进 Vite 会触发全局 `vue.global.js` 与打包版 Vue 冲突，`js/pages/*.js` 需全量改写为 SFC，收益为 0 |
| ② **合并组件库**（v1.7 抽的库给 Axhub `admin/` 用） | ⚠️ 这才是你的真实诉求，但被栈卡死 | Arco 组件不能用于 EP 工程；且不只组件要重写 —— `README-DEV.md` 那 31KB 全是 `el-*` 专属规范（路由结构、`el-scrollbar` / `el-table` / 按钮 / 筛选表单 / 卡片布局），会一并作废 |
| ③ **合并设计 token**（颜色 / 间距 / 圆角 / 字号） | ✅ 现在就能做，零风险 | 两边都是 CSS 变量驱动：v1.7 的 `--chart-1..10` + `arco-theme-pro.css` 可转译为 EP 的 `--el-*` 覆盖 |

**所以真正的问题不是"合不合并"，而是"统一到哪套栈" —— 见 §9-D1。**

---

## 2. 为什么现在"不可维护"——7 条根因（均带证据）

| # | 根因 | 证据 | 后果 |
|---|---|---|---|
| **R1** | **组件没有"组件对象"**，只是「内联模板 + 页面 state」 | `component-form.js:952` 品牌选择器是一段内联 `<div class="component-form-picker">`；`component-list.js:647` 排行榜靠 `$refs` + `getComputedStyle(track).rowGap` + `setInterval` | 想复用只能整段复制；改一处要改 N 页 |
| **R2** | **类名体系混乱** | `component-extended` / `component-list` 大量借用 `component-basic-*` 前缀；样式实际都落在共享 `component-showcase.css` | 无法按组件切分样式，`scoped` 无从下手 |
| **R3** | **强耦合 Shell 全局** | `component-form-extended.js:274` 直接读 `ArcoProLocale.searchTable`、`ArcoProMock`；`mock-data.js`/`locale.js`/`auth.js`/`routes.js` 由 `boot.js` 全局注入 | 组件离开母版环境立即报错 |
| **R4** | **图表配置内联** | `component-chart.js:261` `ProShadcnCharts.mountAreaChart(this.$refs.areaChart, {...})` 挂在页面 `initCharts()` 里 | 图表卡无法独立复用 |
| **R5** | **同一概念两套实现** | 指标卡：`component-metric-card` 用 `list-card-metric-*`；dashboard 系列用 `anl-kpi-*`。**仅 token 层 `--chart-*` 共享** | "抽一次全站复用"做不到，需先建 KPI 抽象层 |
| **R6** | **无契约、无注册表** | `_meta/pages.catalog.json` 只登记**页级**样板；组件仅靠 `reuse.componentShowcases` 一句"缺控件时去抄用法" | "有哪些组件、怎么调"不可机器读 |
| **R7** | **无回归、无立账** | 11 个组件页零单测；改母版靠肉眼看 | 改坏无人知 |

补充一条技术债：`component-rich-text` 用的是 **已废弃的 `document.execCommand`**。

### 2.1 顺带核实的 v1.7 三处缺陷（一期顺手修）

| 缺陷 | 证据 |
|---|---|
| **`frame/index.json` 不是合法 JSON** | 第 17–18 行：`}` 之后直接 `"outputDir": "web",` —— **`"web"` 的键名整个丢了**；`"app"` 同样（第 28–29 行）；第 39 行多一个 `}`。任何 Agent 读它做端别选型都会解析失败 |
| **README 承诺的三端只实现了一端** | `frame/README.md` 维护核对要求"包根存在 `frame/{admin,web,app}`"，实测只有 `admin/`；而 `index.json` 却登记了 `web`/`app` |
| **悬空引用** | `frame/README.md:16` 引用 `[admin-usage.md](./admin-usage.md)`，该文件**不存在** |

---

## 3. 目标架构

### 3.1 设计原则

1. **一次抽取，两处受益**：组件库是唯一真源；`frame/admin` 样板页降级为"库的展示页"。
2. **零 Shell 依赖**：组件只认 props / slots / emits，不再读 `ArcoProMock` / `ArcoProLocale`。
3. **token 先行**：先把 `--chart-*`、`pro-*`、间距/圆角抽成 token 层，组件只消费 token。
4. **对 Arco 薄封装**：不自造轮子，Arco 能做的直接透传；只封装「Arco 没有 + 项目反复用」的那层。
5. **peerDependencies**：`vue` / `@arco-design/web-vue` / `@unovis/*` 不打进库，避免双实例。

### 3.2 分层（8 个域，约 40 个组件）

```
@vibepm/ui（单包多入口 + 按需引入）
├─ tokens/    设计令牌：--chart-*、配色方案 API、间距/圆角/字体、FA 图标桥
├─ layout/    ProShowcasePage / Group / Card（展示壳 + demo 容器）
├─ basic/     按钮组、标签徽标、头像、进度、空态加载、警告                （6–8）
├─ form/      ProSearchPanel、Pill、Segmented、BrandPicker、CategoryPicker、
│             Marker、DynamicRows、MemberCards、ProEditableTable          （9–10）
├─ table/     ProTable + 状态 Tag + 操作列 preset                          （2–3）
├─ chart/     ProChartCard + 柱/折线/面积/饼环/雷达/玫瑰/径向/仪表/水球/
│             漏斗/散点/K线 等挂载封装                                     （10–11）
├─ metric/    ProMetricCard 家族 + KPI 抽象层                              （8–9）
└─ editor/    富文本外壳（替换 document.execCommand）                       （1）
```

### 3.3 工程结构

```
产品设计工作台/
└─ 03-组件库/ui/                      ← 新（位置待拍板，见 §9-D2）
    ├─ package.json                   # @vibepm/ui · exports 多入口 · sideEffects
    ├─ vite.config.ts                 # lib 模式 + vue-tsc 出 d.ts + 自研 resolver
    ├─ registry.json                  # 【核心】机器可读组件清单
    ├─ src/{tokens,layout,basic,form,table,chart,metric,editor}/
    │    └─ <Component>/{index.ts, Component.vue, meta.ts, Component.spec.ts, Demo.vue}
    ├─ styles/                        # 由 component-showcase.css 等重构来的分域 CSS
    └─ scripts/validate-registry.mjs
```

`meta.ts` 即组件契约，构建期汇总成 `registry.json`：

```ts
export default {
  id: 'form.ProSearchPanel',
  name: 'ProSearchPanel',
  category: 'form',
  summary: '筛选面板：多行 / 单行 / 可折叠三态，含查询与重置',
  props: [{ name: 'columns', type: 'FilterColumn[]', required: true }],
  slots: ['default', 'actions'],
  sourceSample: 'frame/admin/component-form-extended.html',  // 母版来源锚点，便于上游 diff
  deps: ['form.ProFormItem'],
  status: 'stable',
}
```

### 3.4 消费方式（调用方怎么写）

```ts
// 全量
import VibepmUI from '@vibepm/ui'
import '@vibepm/ui/style'

// 按需（推荐）
import { ProSearchPanel, ProTable } from '@vibepm/ui'

// 或零 import —— 交给 unplugin-vue-components + 自研 resolver
Components({ resolvers: [VibepmUIResolver()] })
```

---

## 4. 抽取 SOP（把"内联模板"变成组件，四步）

| 步 | 动作 |
|---|---|
| **1 切** | 从样板页把该区块的「模板段 + data + methods + 相关 CSS」切成三份 |
| **2 剥** | 把 `ArcoProMock` / `ArcoProLocale` / `$refs` / 页面 `state` 全部改成 props / slots / emits；mock 数据搬到 `Demo.vue` |
| **3 正** | 类名从 `component-basic-*` / `component-form-*` 统一为 `pro-<域>-<组件>`；样式改 `scoped` 或 `styles/<域>.css` |
| **4 验** | 写 `*.spec.ts`（挂载 + props 变更 + emit）+ `Demo.vue`；跑 registry 校验 |

---

## 5. 可维护性机制（四道闸）

| 闸 | 做法 | 治 |
|---|---|---|
| **单一真源** | 组件源码唯一；`frame/admin` 11 页改为消费库渲染 | R1 / R2 双写 |
| **契约校验** | `validate-registry.mjs`：registry ↔ 源码 ↔ demo 三方一致；同时校验 `frame/index.json` 是合法 JSON、`pages.catalog.json` 无悬空路径 | R6 + §2.1 三缺陷 |
| **回归** | `vitest` 单测 + `vue-tsc --noEmit` + 产物体积基线；一条命令出结果 | R7 |
| **立账** | 库版本 + `CHANGELOG.md` + registry 版本号；与 v2 稿的 `04-维护台账/patches/` 立账同构 | R7 |

---

## 6. 分期路线与验收

| 期 | 内容 | 验收标准 |
|---|---|---|
| **一期 · 地基** | 库骨架 + token 层 + registry + 校验脚本；打通 **3 个"零耦合"组件**（如 标签徽标 / 空态 / 进度） | `pnpm build` 出 ESM + d.ts；`pnpm test` 绿；Demo 跑通；registry 校验通过；**顺手修好 `frame/index.json`** |
| **二期 · 基础层** | basic/extended 抽 6–8 个 + 展示壳 `layout/*` | `component-basic`、`component-extended` 两页改为消费库，肉眼无差异 |
| **三期 · 表单表格** | ProSearchPanel、Pill、Segmented、BrandPicker、CategoryPicker、Marker、DynamicRows、MemberCards、ProEditableTable、ProTable | `form`、`form-extended`、`table-extended` 三页改为消费库 |
| **四期 · 图表** | token 化配色 + `ProChartCard` + 12 族挂载封装 | `chart`、`chart-extended`、`chart-palette` 三页改为消费库；换配色不再改页面 |
| **五期 · 指标卡与富文本** | KPI 抽象层（**打通 metric-card 与 dashboard 两套实现**）+ ProMetricCard 家族 + 富文本外壳 | `metric-card`、`rich-text` 改为消费库；dashboard 系列可选用新 KPI |
| **六期 · 收口** | 11 页全量消费库化 + `gallery.html` 更新 + `README.md`/`index.json` 回填三端真实状态 | 无残留"手抄样板"页面；registry 与 gallery 清单一致 |

---

## 7. 风险

| # | 风险 | 对策 |
|---|---|---|
| **V1** | **调用方技术栈冲突**（§1.4 / §9-D1）：Axhub 原型工程根 = React 18 + Tailwind，Axhub `admin/` = Vue 3 + **Element Plus**，v1.7 = Vue 3 + **Arco** | **必须先定栈**：Arco 库无法直接进 EP 工程，也不能被原型页（React）调用；不定栈则库抽完无处落地 |
| **V6** | **Arco 在 Axhub 生态无规范落点**（§1.4）：`page-generator` 按 `README-DEV.md` 的加载顺序读 `ui-libs/<库>/`，而现只有 `ant-design-vue`/`element-plus`/`shadcn`/`vant` 四套 | 若坚持 Arco，须**同步新增** `.agents/knowledge/ui-libs/arco/{components,pages}.md`，否则"有库、无说明书"，接不进生成链路 |
| V2 | 一次性抽 40 个组件量太大 | 分期；一期只做 3 个打通管线，先证伪再铺量 |
| V3 | 视觉回归无参照 | 一期就引入截图对比，或至少"改造前后同页并排"人工核对 |
| V4 | R5 两套指标卡实现，硬合并有回归风险 | 不硬合并：先抽 KPI 抽象层 + 两套 skin，dashboard 逐步迁移 |
| V5 | 与 v1.7 上游脱钩后升级难回流 | 用 `meta.sourceSample` 记录母版来源锚点，上游更新可 diff |

---

## 8. 与前三稿的关系

- 前三稿治「**工作台能不能跑得稳**」；本稿治「**设计资产能不能被工程调用**」。
- 交集两处：
  1. 都提"有账可查"——本稿 §5「立账」与 v2 稿 `04-维护台账/patches/` 同构，可合并为一套资产台账。
  2. 都提"文档—代码版本漂移"——v2 稿用配置单一真源治，本稿用 registry 校验治，手段互补。
- 建议合稿时，本稿作为 v2 的**第四专项**，与综合稿 §3 的 A–G 并列。

---

## 9. 待拍板（你只需拍这些）

| # | 事项 | 我的建议 |
|---|---|---|
| **D1** | **组件库统一到哪套栈？**（已收窄为三选一，论证见 §1.4）<br>**D1-a** 统一到 **Element Plus**：v1.7 的 ~40 个组件按 EP 重写，Arco 样板降级为"设计基线参考"<br>**D1-b** 统一到 **Arco**：把 Axhub `admin/` 从 EP 迁到 Arco（43 个 core `.vue` + 18 views + 31KB EP 规范作废 + 新增 `ui-libs/arco/`）<br>**D1-c** 维持双轨：库只做"人看的对照规格"，不承诺代码复用 | 建议 **D1-a**。理由：Axhub `admin/` 的 43 个已组件化 `.vue`、Mock 体系、路由/Pinia/i18n 骨架、31KB 规范是**工程资产**（沉淀成本高、不可替代）；v1.7 的 Arco 是**样板资产**（无构建、无组件层、富文本还是废弃 API）。工程资产重做 > 样板资产重做。且 D1-a 后规范回到已有的 `ui-libs/element-plus/`，**无需新造 arco 规范、Axhub 生态零改动**<br>反方：若你未来主战场是"客户自带 Arco 的独立后台交付"，则 D1-b 才对 |
| **D2** | 组件库放哪 | `产品设计工作台/03-组件库/ui/`（编号与位置请你确认；按文件存放铁律不擅自创建新路径） |
| **D3** | 包形态 | **单包多入口**（`@vibepm/ui`），不做 monorepo 多包——个人工作台，单包更好维护 |
| **D4** | `frame/admin` 11 个页面的归属 | **改造为消费库**（消除双写），而非冻结只读 |
| **D5** | 是否修 v1.7 三处缺陷 | **一期顺手修**（`index.json` / `web`+`app` 缺失 / `admin-usage.md` 悬空） |
| **D6** | 一期范围 | **3 个零耦合组件打通管线**，先证伪再铺量 |
| **D7** | 是否接受"KPI 两套实现先并存" | 接受（V4），第五期再抽象合并 |

---

## 附：本稿核验边界

- 已实地核验：`frame/README.md`、`frame/index.json`、`frame/admin/_meta/{template.manifest.json,pages.catalog.json}`、11 个 `component-*.html` 壳及其 `js/pages/component-*.js`、`css/component-showcase.css`、`css/arco-theme-pro.css`（head）、`js/chart-palette.js`、`js/charts/shadcn-charts.js`（体量与导出）、`scripts/generate-html.mjs`。
- 组件清单与"可抽组件数"来自对 11 个页面脚本的分批通读（含代表性代码片段取证），非抽样推断。
- `[待补充]`：
  1. `component-basic.js` 等文件是否**由某个源生成**（`scripts/` 下有 `gen-mock-data.mjs`、`generate-html.mjs`，但未见生成 `js/pages/*` 的脚本）——若为纯手写，抽取即"迁移"；若为生成物，抽取前需先找到源。**建议一期第一件事把这条确认掉**。
  2. `frame/admin` 的 `version`（`template.manifest.json` v1.1.0）与上游 v1.7 包的版本对应关系未逐项核对。
