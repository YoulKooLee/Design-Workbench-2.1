# WEB 图表规范

生成 / 增页含图表时读本文。**抄母版家族类名与模板**，勿在业务页另写色值、图例间距、圆环布局或入场动画。

实现细节（动态轴边距、入场、配色 API）在：

| 用途 | 路径（相对交付根 / `frame/web`） |
| --- | --- |
| 挂载 API | `assets/common/charts/shadcn-charts.js`（`ProShadcnCharts.mount*Chart`） |
| 图表样式 | `assets/common/charts/shadcn-chart.css` |
| 配色方案 | `assets/common/charts/chart-palette.js`（`WaChartPalette` / `ArcoProChartPalette`） |
| Unovis | `vendor/unovis/unovis.min.js` |
| 漏斗样式 | `components/chart-funnel/component.css`（仅漏斗） |
| 配色预览页样式 | `components/chart-palette/component.css`（仅配色族） |

不必在业务页重算轴边距或复制入场 keyframes。

与 Admin 的差异：WEB **须显式**挂 `chart-palette.js`（无 `arco-theme` 自动注入）；标题色条用 `--wa-color-primary`，不用 `--pro-theme-color`。

## 1. 生成时必守

### 取色

| 项 | 值 |
| --- | --- |
| 系列色 | `var(--chart-N)`；禁止写死 hex，禁止用 `primary-6` / `--wa-color-primary` 冒充系列色 |
| 独立单系列 | **一律 C1**（一页多张单系列图也全用 C1） |
| 多系列 / 多分类 | 从 C1 连续编号，勿跳号 |
| 涨跌 / 告警 | `success` / `danger` / `warning`，不当普通分类色 |
| 标题左侧色条 | 界面主色（`--wa-color-primary`），不跟图表配色方案 |
| 同组指标卡 | 主题单色 → 全组 C1；多彩方案 → 可按序 C1、C2… |

`chart-palette.js` 写入 `--chart-1…10`；切明暗时 `theme.js` 会派发刷新事件，须走 `ProShadcnCharts` 挂载（内置 remount）。

### 布局与挂载

| 项 | 值 |
| --- | --- |
| XY 底图例 | 只用 `.shadcn-chart-legend*`；间距已在全局 CSS（轴下 20px、项间距 16px） |
| XY 挂载 | `autoMargin: false`；`margin: { top: 6, bottom: 22, right: 8 }`（勿写死 `left`） |
| 圆环尺寸 | `height` / 宿主 **200**，`radius: 100`，`arcWidth: 28` |
| 圆环结构 | `.shadcn-donut-layout` + 父级 `.shadcn-donut-card`（`container`）；≥**520px** 左环右例，不够则上下 |
| 精简圆环 | `.wa-chart-donut-slot` 中间槽垂直居中放环；`.shadcn-chart-legend` 贴底（对齐 Admin `.component-chart-donut-slot`） |
| 圆环图例 | 新页默认单行 `--inline`（对齐 `chart-donut` 基础圆环）；侧栏项含色点 / 名称 / 数值 / 占比 |
| 中心数字 | `mountDonutChart` 自动缩字号，业务侧一般不必再设 |
| 折线形态 | 折角 `curveType: 'linear'`；圆滑默认 `'monotoneX'` |
| 组合图 | 抄 `components/chart-combo/`；用 `bars` + `line`，双轴设 `lineAxis: 'right'`；**禁止**自造 `barSeries` / `lineSeries` |
| 入场 | 用 `mount*Chart` 默认；禁止对圆环宿主做 `transform` 入场 |

类名：`shadcn-chart-legend*`、`shadcn-donut-*`、`shadcn-chart-host`。样式：`assets/common/charts/shadcn-chart.css`。

### 资源挂链（含图表的页）

在既有 Arco / `global.css` / `components.css` 之后追加：

```html
<link rel="stylesheet" href="./assets/common/charts/shadcn-chart.css" />
<!-- 仅漏斗：components/chart-funnel/component.css -->
<!-- 仅配色预览：components/chart-palette/component.css -->
```
```html
<script src="./vendor/unovis/unovis.min.js"></script>
<script src="./assets/common/charts/chart-palette.js"></script>
<script src="./assets/common/charts/shadcn-charts.js"></script>
<script src="./js/<page>.js"></script>
```

落地时：挂载逻辑**并入** `js/<page>.js`；样式规则默认可并入页 CSS，或保留一份共享 `shadcn-chart.css`（多页复用时允许）。

## 2. 模板

### XY + 底部图例（柱 / 面积 / 折线）

对齐 `components/chart-bar/`、`chart-area/`、`chart-line/`。

```html
<div ref="xxxChart" class="shadcn-chart-host"></div>
<div class="shadcn-chart-legend">
  <span v-for="item in legend" :key="item.key" class="shadcn-chart-legend-item">
    <span class="shadcn-chart-legend-dot" :style="{ '--legend-color': item.color }"></span>{{ item.label }}
  </span>
</div>
```

```js
ProShadcnCharts.mountAreaChart(el, {
  // 或 mountLineChart / mountBarChart / mountStackedBarChart
  height: 280,
  margin: { top: 6, bottom: 22, right: 8 },
  autoMargin: false,
})
```

### 柱线组合图

对齐 `components/chart-combo/default/`。

```js
ProShadcnCharts.mountComboChart(el, {
  data: rows, // 含桌面/移动量 + rate
  height: 280,
  margin: { top: 6, bottom: 22, right: 8 },
  autoMargin: false,
  x: (d) => d.label,
  xLabel: (d) => d.label,
  curveType: 'linear',
  lineWidth: 2,
  xDomainPad: 0.35,
  lineAxis: 'right',
  rightYDomain: [0, 100],
  rightYTickValues: [0, 25, 50, 75, 100],
  rightYTickFormat: (v) => `${v}%`,
  bars: [
    { key: 'desktop', label: '桌面端', color: 'var(--chart-1)' },
    { key: 'mobile', label: '移动端', color: 'var(--chart-2)' },
  ],
  line: { key: 'rate', label: '达成率', color: 'var(--chart-3)' },
})
```

### 圆环 + 右侧图例（基础圆环）

对齐 `components/chart-donut/basic/`。父级加 `.shadcn-donut-card`（开启 container）；**≥520px** 自动左环右例。

```html
<div class="shadcn-donut-card"><!-- 或业务卡自身挂 container-name: shadcn-donut -->
  <div class="shadcn-donut-layout">
    <div class="shadcn-donut-chart">
      <div ref="donutChart" class="shadcn-chart-host shadcn-chart-host--donut shadcn-donut-host"></div>
    </div>
    <div class="shadcn-donut-legend-wrap">
      <ul class="shadcn-donut-legend shadcn-donut-legend--inline">
        <li v-for="item in items" :key="item.key" class="shadcn-donut-legend-item">
          <div class="shadcn-donut-legend-name-row">
            <i class="shadcn-donut-legend-dot" :style="{ background: item.color }"></i>
            <span class="shadcn-donut-legend-label">{{ item.name }}</span>
          </div>
          <div class="shadcn-donut-legend-meta">
            <span class="shadcn-donut-legend-value">{{ item.valueText }}</span>
            <span class="shadcn-donut-legend-pct">{{ item.percentText }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
```

```js
ProShadcnCharts.mountDonutChart(el, {
  height: 200,
  radius: 100,
  arcWidth: 28,
  padAngle: 0,
  centralLabel: '¥234,896',
  centralSubLabel: '合计',
})
```

### 圆环 + 底部图例（精简）

对齐 `components/chart-donut/compact/`：环在中间槽垂直居中，图例贴底；不强制左右排。

```html
<div class="wa-chart-donut-slot">
  <div ref="donutChart" class="shadcn-chart-host shadcn-chart-host--donut"></div>
</div>
<div class="shadcn-chart-legend"><!-- 底图例项 --></div>
```

```js
ProShadcnCharts.mountDonutChart(donutEl, {
  data,
  height: 200,
  radius: 100,
  arcWidth: 28,
  centralLabel: '¥12,345,678',
  centralSubLabel: '合计',
})
```

舞台（卡内）须为纵向 flex：`.wa-chart-donut-slot { flex:1; display:flex; align-items:center; justify-content:center }`，图例 `flex:0` + `margin-top: 20px`。

## 3. 禁止

- 另写业务图例类（如 `xxx-channel-legend`）；圆环侧栏一律 `.shadcn-donut-*`。
- 业务 CSS 覆盖 `.shadcn-chart-legend` 的 `margin-top`，或用空 `div` 冒充图例间距。
- 另写 `xxx-donut-layout`、固定图例宽 220/232px、或把断点降到 520px 以下强行左右排。
- 独立单系列用 C2/C3；用 success/danger 当普通分类色。
- 标题色条用 `--chart-*`。
- 组合图用 `barSeries` / `lineSeries`（正确为 `bars` / `line`）。
- 漏挂 `unovis` / `chart-palette` / `shadcn-charts`，或改用 CDN 图表库。
- 把 Admin Pro 壳、侧栏、`dashboard-*.css` 图例规则拷进 WEB 交付。

## 4. 抄哪一页（母版家族）

图例与挂载**以 `frame/web/components/chart-*` 为准**；业务页对齐同类形态。

| 场景 | 家族 / 成员 |
| --- | --- |
| XY + 底图例 | `chart-bar` / `chart-area` / `chart-line` |
| 柱线组合（双轴） | `chart-combo` |
| 条形 | `chart-horizontal-bar` |
| 圆环右侧单行图例 | `chart-donut` → `basic` |
| 圆环底图例 | `chart-donut` → `compact` |
| 半圆玫瑰（通栏 + 详细底图例） | `chart-rose` → `semi` |
| 径向文字/形状（居中，无底图例） | `chart-radial` → `text` / `shape` |
| 仪表（卡内居中，无底图例） | `chart-gauge` |
| 评分仪表 + 评估时间脚注 | `chart-gauge` → `score`（`.wa-chart-gauge-footer`） |
| 漏斗 + 侧栏图例 | `chart-funnel` |
| 雷达 / 玫瑰 / 径向 / 仪表 / 水球 | `chart-radar` / `chart-rose` / `chart-radial` / `chart-gauge` / `chart-liquid` |
| 配色预览 | `chart-palette` |

索引：`frame/web/components/index.html` → **Chart** 分类。

## 5. 排查（生成后画面不对时）

1. 图例与轴空白过大 → 是否 `autoMargin: false`，是否改了图例 `margin-top`。
2. Y 轴数字被裁 → 看宿主 `data-y-label-left`；提高 `yLabelMaxWidth`，勿只加大 `margin.bottom`。
3. 圆环图例贴边或右侧空一截 → 是否用 `.shadcn-donut-*`；勿写死列宽。
4. 精简圆环环偏上/贴顶 → 是否缺 `.wa-chart-donut-slot`；舞台须纵向 flex，环在槽内居中、图例贴底。
5. 切主题/配色后图不更新 → 须走 `ProShadcnCharts`；是否已挂 `chart-palette.js`。
6. 组合图只有轴无线柱 → 是否误用 `barSeries`/`lineSeries`；应改为 `bars`/`line`，并设 `lineAxis: 'right'`。
7. 基础圆环图例仍在下方 → 父级是否挂 `.shadcn-donut-card`（container）；卡宽是否 ≥520px（家族页侧栏类已放宽到 680）。
8. 家族对照页 XY 图例在右侧 → 舞台须纵向（母版已在 `components/index.css` 约束 `chart-*`）；业务页用「宿主 + 底图例」块级堆叠即可。
