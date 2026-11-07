# Vibe Design WEB · 图表规范

生成 / 增页含图表时读本文。**抄母版家族类名与模板**，勿在业务页另写色值、图例间距、圆环布局或入场动画。

样板真源：`frame/web/components/chart-*`。实现细节可对照母版 `assets/common/charts/`（`shadcn-charts.js` / `shadcn-chart.css` / `chart-palette.js`）与 Admin `ui-libs/arco-design-vue/charts.md`，**落地必须是 Vue 对照重写**，禁止 `<script src>` 指到 `frame/`。

与 Admin 的差异（必守）：

| 项 | WEB | Admin |
| --- | --- | --- |
| 标题左侧色条 | `--wa-color-primary` | `--pro-theme-color` / `--primary-6` |
| 系列色变量 | `var(--chart-N)`（同） | 同 |
| 配色刷新 | 须显式接工程主题变化（无 Admin `arco-theme` 自动注入假设） | `arco-pro-theme-change` |
| 外壳类 | 勿用 `pro-meter-fill` 等 `pro-*`；用 WEB / shadcn 家族类 | 可用 `pro-meter-fill` |

若 `{PROJECT_PATH}/README-DEV.md` 已规定图表底座，**以 README-DEV 为准**。

## 1. 生成时必守

### 取色

| 项 | 值 |
| --- | --- |
| 系列色 | `var(--chart-N)`；禁止写死 hex，禁止用 `primary-6` / `--wa-color-primary` 冒充系列色 |
| 独立单系列 | **一律 C1**（一页多张单系列图也全用 C1） |
| 多系列 / 多分类 | 从 C1 连续编号，勿跳号 |
| 涨跌 / 告警 | `success` / `danger` / `warning`，不当普通分类色 |
| 标题左侧色条 | `--wa-color-primary`，不跟图表配色方案 |
| 同组指标卡 | 主题单色 → 全组 C1；多彩方案 → 可按序 C1、C2… |

### 布局与挂载

| 项 | 值 |
| --- | --- |
| XY 底图例 | 只用 `.shadcn-chart-legend*`；间距走全局 CSS |
| XY 挂载 | `autoMargin: false`；`margin: { top: 6, bottom: 22, right: 8 }`（勿写死 `left`） |
| 圆环尺寸 | `height` / 宿主 **200**，`radius: 100`，`arcWidth: 28` |
| 圆环结构 | `.shadcn-donut-layout` + 父级 `.shadcn-donut-card`；≥**520px** 左环右例，不够则上下 |
| 精简圆环 | `.wa-chart-donut-slot` 中间槽垂直居中；图例贴底 |
| 圆环图例 | 新页默认单行 `--inline`；侧栏项含色点 / 名称 / 数值 / 占比 |
| 折线形态 | 折角 `curveType: 'linear'`；圆滑默认 `'monotoneX'` |
| 组合图 | 抄 `frame/web/components/chart-combo/`；`bars` + `line`，双轴 `lineAxis: 'right'`；禁止自造 `barSeries` / `lineSeries` |
| 入场 | 用封装默认；禁止对圆环宿主做 `transform` 入场 |

类名：`shadcn-chart-legend*`、`shadcn-donut-*`、`shadcn-chart-host`。

## 2. 工程落地

| 母版 | 工程默认 |
| --- | --- |
| Unovis + `shadcn-charts.js` | 工程内图表封装或 `public/vendor` 等价物（以 README-DEV 为准） |
| `chart-palette.js` | 工程配色工具；写入 `--chart-1…10`；主题切换须 remount |
| `shadcn-chart.css` | 并入 `src/styles/common/` 或图表组件旁；多页复用允许一份共享 |
| 漏斗 / 配色预览私有 css | 仅对应页/组件并入，勿全局误挂 |

挂载逻辑进 Composition API / 图表组件；**禁止**拷贝仅 `WebArco.mount` 的预览壳。

## 3. 结构模板（对照）

```vue
<div ref="chartHost" class="shadcn-chart-host" />
<div class="shadcn-chart-legend">
  <span v-for="item in legend" :key="item.key" class="shadcn-chart-legend-item">
    <span class="shadcn-chart-legend-dot" :style="{ '--legend-color': item.color }" />
    {{ item.label }}
  </span>
</div>
```

圆环、组合图对照 `frame/web/components/chart-donut|chart-combo/` 的 DOM 与 class，再改业务数据。

## 4. 禁止

- 业务页另写系列 hex / 自造图例间距 / 自造圆环入场
- 用 Admin `pro-*` 图表皮顶替 WEB
- 硬链 `frame/web` 下 charts 脚本或 css
- 命中 `chart-*` slug 后只抄结构、丢掉样式与挂载参数
