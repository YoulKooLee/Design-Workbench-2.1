# Arco Design Vue 图表规范

适用于 `@arco-design/web-vue` 项目中需要统计图、趋势图、仪表盘图表的页面。

> 若 `{PROJECT_PATH}/README-DEV.md` 已规定图表底座，**以 README-DEV 为准**。  
> 生成 / 增页含图表时以本文为准。  
> 轴边距动态算法、入场毫秒等实现细节可对照 `{WORKSPACE_PATH}/frame/admin/_meta/charts.md` 与工程内 `ProChart` / `shadcn-charts` 封装，**不必在业务页重算**。

## 默认方案（Vibe Design Pro 对齐）

- 业务图默认使用 **`ProChart`**（`src/components/charts/`）
- 底层：Unovis + `public/vendor/charts/shadcn-charts.js`（或 README-DEV 写明的等价包）
- 配色：`utils/chart-palette.ts`（对齐母版 `chart-palette.js`）；主题变化响应 `arco-pro-theme-change`
- 样式类：`shadcn-chart-legend*`、`shadcn-donut-*`；自定义横条填色用 `pro-meter-fill`
- **抄样板类名与模板**，勿在业务页另写色值、图例间距、圆环布局或入场动画

## 1. 生成时必守

### 取色

| 项 | 值 |
| --- | --- |
| 系列色 | `var(--chart-N)`；**禁止**写死 hex，**禁止**用 `primary-6` 冒充系列色 |
| 独立单系列 | **一律 C1**（一页多张单系列图也全用 C1） |
| 多系列 / 多分类 | 从 C1 连续编号，勿跳号 |
| 涨跌 / 告警 | `success` / `danger` / `warning`，不当普通分类色 |
| 标题左侧色条 | 界面主色（`--pro-theme-color` / `--primary-6`），**不跟**图表配色方案 |
| 同组指标卡 | 主题单色 → 全组 C1；多彩方案 → 可按序 C1、C2…；卡内分段条仍按多系列 |

### 布局与挂载

| 项 | 值 |
| --- | --- |
| XY 底图例 | 只用 `.shadcn-chart-legend*`；间距走全局 CSS（轴下 20px、项间距 16px） |
| XY 挂载 | `autoMargin: false`；`margin: { top: 6, bottom: 22, right: 8 }`（勿写死 `left`） |
| 圆环尺寸 | `height` / 宿主 **200**，`radius: 100`，`arcWidth: 28` |
| 圆环结构 | `.shadcn-donut-card` + `.shadcn-donut-layout`；≥**520px** 左环右例，不够则上下 |
| 圆环图例 | **新页默认单行** `shadcn-donut-legend--inline`（对齐基础圆环图）。叠排（名称上 / 金额下 / 占比右）为定制，仅对齐财务「账户分配」类卡片，**不要**加 `--inline` |
| 中心数字 | 封装自动缩字号，业务侧一般不必再设 |
| 折线形态 | 折角 `curveType: 'linear'`；圆滑默认 `'monotoneX'` |
| 组合图 / 标题行图例 | 对照 `views/charts` 扩展橱窗 / 母版 `component-chart-extended`，勿自写双轴 |
| 自定义横条 | 填色元素加 **`pro-meter-fill`**；禁止业务页自写 keyframes |
| 入场 | 用封装默认入场；禁止对圆环宿主做 `transform` 入场 |

## 2. 模板（结构对齐）

### XY + 底部图例

```vue
<div ref="chartHost" class="shadcn-chart-host" />
<div class="shadcn-chart-legend">
  <span v-for="item in legend" :key="item.key" class="shadcn-chart-legend-item">
    <span class="shadcn-chart-legend-dot" :style="{ '--legend-color': item.color }" />
    {{ item.label }}
  </span>
</div>
```

（若 `ProChart` 已内置图例，以组件与橱窗为准，类名仍须对齐。）

### 圆环 + 右侧单行图例（新页默认）

```vue
<a-card class="… shadcn-donut-card">
  <div class="shadcn-donut-layout">
    <div class="shadcn-donut-chart">
      <div ref="donutHost" class="shadcn-chart-host shadcn-chart-host--donut shadcn-donut-host" />
    </div>
    <div class="shadcn-donut-legend-wrap">
      <ul class="shadcn-donut-legend shadcn-donut-legend--inline">
        <li v-for="item in items" :key="item.key" class="shadcn-donut-legend-item">
          <div class="shadcn-donut-legend-name-row">
            <i class="shadcn-donut-legend-dot" :style="{ background: item.color }" />
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
</a-card>
```

### 圆环 + 右侧叠排图例（定制）

新页不要默认用。仅金额+占比需上下分行时对照财务类样板：无 `--inline`，用 `.shadcn-donut-legend-main`，占比与金额底对齐。

## 3. 禁止

- 业务页使用遗留 echarts / `<Chart>` 做新图
- 另写 `workplace-channel-*` / `crm-channel-*` 等业务图例类；圆环侧栏一律 `.shadcn-donut-*`
- 业务 CSS 覆盖 `.shadcn-chart-legend` 的 `margin-top`，或用空 `div` 冒充图例间距
- 另写 `xxx-donut-layout`、固定图例宽 220/232px、或把断点降到 520px 以下强行左右排
- 独立单系列用 C2/C3；用 success/danger 当普通分类色
- 标题色条用 `--chart-*`
- 在业务页 CSS 复制 `pro-meter-grow` / `pro-donut-in` / 顺时针 veil 等入场动画

## 4. 抄哪一页（工程优先）

图例与挂载**以橱窗为准**，业务看板对齐同类卡片。

| 场景 | 工程参考 | 母版对照（可选） |
| --- | --- | --- |
| XY + 底图例 | `src/views/charts/*`、workplace | `component-chart` |
| 圆环右侧单行图例 | 图表橱窗基础圆环 | `component-chart` 基础圆环 |
| 圆环右侧叠排（定制） | 财务类看板若已迁入 | `dashboard-finance` 账户分配 |
| 标题行图例 / 组合图 | `views/charts` 扩展 | `component-chart-extended` |
| 指标卡 / spark | `components/metric-card`、橱窗 | `component-metric-card` |
| 配色预览 | `views/charts` palette | `component-chart-palette` |

## 5. 排查（画面不对时）

1. 图例与轴空白过大 → 是否 `autoMargin: false`，是否改了图例 `margin-top`
2. Y 轴数字被裁 → 看封装动态左边距；勿只加大 `margin.bottom`
3. 圆环图例贴边或右侧空一截 → 是否用 `.shadcn-donut-*`；勿写死列宽
4. 切主题/配色后图不更新 → 须走 `ProChart` / ProShadcnCharts（内置 remount）
5. 自定义条无载入 → 是否加了 `pro-meter-fill`

## 回退

若目标子项目未接入 ProChart，而 README-DEV 指定了其他图表库，按该库文档实现，并在实现说明中注明来源。
