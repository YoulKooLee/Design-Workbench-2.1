# Element Plus 项目图表规范（本工程实测）

适用于本工程（`_project-development`，工程根=项目根，模板骨架在 `src/admin`）及任何 `package.json` 含 `element-plus` + `echarts` 的子项目。

> 优先级：`{PROJECT_PATH}/README-DEV.md` > 本文 > 读现有页面推断。
> 本文所有写法均照工程真实代码采集（2026-09-29 实测），不是通用 ECharts 教程。

## 0. 底座（不要另起炉灶）

| 层 | 位置 | 说明 |
|---|---|---|
| ECharts 按需注册 | `src/utils/echarts.ts` | 已注册 Bar/Line/Pie/Scatter/Radar/Map/Candlestick + Title/Tooltip/Grid/Legend/DataZoom/MarkPoint/MarkLine/Toolbox/Brush/Geo/VisualMap + CanvasRenderer |
| 图表 composable | `src/composables/useChart.ts`（16.4KB） | 主题联动、明暗切换重绘、自动 resize（多档延迟 + rAF）、IntersectionObserver 懒初始化、空态、销毁清理 |
| 主题色板 | `useChartOps()` | `chartHeight: '16rem'`、`fontSize: 13`、`fontColor: '#999'`、`themeColor: getCssVar('--el-color-primary-light-1')`、7 色 `colors` 组 |
| 现成图表组件 | `src/components/core/charts/` | `art-line-chart`、`art-bar-chart`、`art-h-bar-chart`、`art-ring-chart`、`art-radar-chart`、`art-scatter-chart`、`art-k-line-chart`、`art-dual-bar-compare-chart`、`art-map-chart` |
| 样式工具 | `src/utils/ui`（`getCssVar`、`hexToRgba`） | 取 CSS 变量、颜色透明度处理 |
| 类型 | `src/types/component/chart.ts` | `BaseChartProps`、`ChartThemeConfig`、`UseChartOptions`、各图表 Props |

**硬性要求**：`import { echarts } from '@/utils/echarts'` —— 禁止 `import * as echarts from 'echarts'` 全量导入（体积翻数倍且重复注册）。

## 1. 首选：直接用现成 Art* 图表组件

已有 9 个封装组件覆盖常见图型，**先找组件，找不到再自己写**。用法（以 `art-line-chart` 为例，实测 props）：

```vue
<template>
  <ElCard shadow="never">
    <ArtLineChart
      :data="seriesData"
      :x-axis-data="xLabels"
      height="18rem"
      :loading="loading"
      :is-empty="!seriesData.length"
      smooth
      show-area-color
      show-legend
      legend-position="bottom"
    />
  </ElCard>
</template>
```

`ArtLineChart` 关键 props（`withDefaults` 默认值实测）：

| prop | 默认 | 用途 |
|---|---|---|
| `height` | `useChartOps().chartHeight`（`16rem`） | 容器高度 |
| `loading` | `false` | 走 `v-loading` |
| `isEmpty` | `false` | 空数据态 |
| `colors` | `useChartOps().colors`（7 色） | 系列色，**不要自己塞 hex** |
| `data` | `[0,0,0,0,0,0,0]` | 系列数据，支持多组 |
| `xAxisData` | `[]` | X 轴标签 |
| `lineWidth` / `smooth` / `symbol` / `symbolSize` | `2.5` / `true` / `'none'` / `6` | 线型 |
| `showAreaColor` | `false` | 面积渐变 |
| `showAxisLabel` / `showAxisLine` / `showSplitLine` | `true` | 轴线三件套 |
| `showTooltip` / `showLegend` / `legendPosition` | `true` / `false` / `'bottom'` | 交互 |

组件无需 import（`unplugin-vue-components` 自动注册，见 `src/types/components.d.ts`）。

## 2. 需要自定义图型时：用 useChart 写

```vue
<template>
  <div ref="chartRef" class="my-chart" :style="{ height: '20rem' }" v-loading="loading" />
</template>

<script setup lang="ts">
import { echarts, type EChartsOption } from '@/utils/echarts'
import { useChart, useChartOps } from '@/composables/useChart'

const {
  chartRef,
  isDark,
  initChart,
  getAxisLineStyle,
  getAxisLabelStyle,
  getAxisTickStyle,
  getSplitLineStyle,
  getTooltipStyle,
  getLegendStyle,
  getGridWithLegend
} = useChart()   // 明暗重绘、自动 resize、懒初始化、销毁清理全部内置

const ops = useChartOps()

const buildOption = (): EChartsOption => ({
  color: ops.colors,
  grid: getGridWithLegend({ showLegend: true }),
  tooltip: { ...getTooltipStyle(), trigger: 'axis' },
  legend: getLegendStyle(),
  xAxis: {
    type: 'category',
    data: ['一', '二', '三'],
    axisLine: getAxisLineStyle(),
    axisLabel: getAxisLabelStyle(),
    axisTick: getAxisTickStyle(),
    splitLine: getSplitLineStyle()
  },
  yAxis: { type: 'value', axisLabel: getAxisLabelStyle(), splitLine: getSplitLineStyle() },
  series: [{ type: 'bar', data: [12, 34, 56], barMaxWidth: 24 }]
})

onMounted(() => initChart(buildOption()))
watch(isDark, () => initChart(buildOption()))   // 明暗切换重绘
</script>
```

**不要自己写** resize 监听、主题订阅、空态 DOM、销毁逻辑——`useChart` 已全包（内部用 `RESIZE_DELAYS = [50,100,200,350]` 多档 + `requestAnimationFrame` + `IntersectionObserver` 阈值 0.1）。

## 3. 取色规则

| 项 | 规则 |
|---|---|
| 系列色 | 用 `useChartOps().colors` 或 `var(--el-color-primary-light-1)`；**禁止写死 hex** |
| 主题主色 | `getCssVar('--el-color-primary')`（来自 `@/utils/ui`） |
| 涨跌/告警 | Element Plus 语义色 `--el-color-success` / `--el-color-danger` / `--el-color-warning`，不当普通分类色 |
| 半透明填充 | `hexToRgba(color, 0.2)`（`@/utils/ui` 提供），不要手写 `rgba()` |
| 字号/字色 | `ops.fontSize`（13）/ `ops.fontColor`（`#999`） |

## 4. 其他图表底座（按需）

工程同时装了：

- **@antv/g2 ^5.4**：`utils/chartUtils.ts`、`utils/chartTypeMapper.ts` 有配套；G2 图型（如复杂统计图）走它。
- **three ^0.150**：`utils/map3d/`；3D 场景/地图走它。
- 地图：`art-map-chart` + echarts `MapChart` + `GeoComponent`（已注册）。

选型顺序：`Art*` 现成组件 → `useChart` + echarts → `@antv/g2` → `three`。**不要为一个常规柱/折/饼图引入新图表库。**

## 5. 禁止

- `import * as echarts from 'echarts'` 全量导入
- 绕过 `useChart` 自己 `echarts.init` + 手写 resize/dispose
- 自己订阅主题（应由 `useChart` 的 `isDark` 驱动）
- 写死颜色 hex / 自造色板
- 用 Arco 的 `ProChart`、`shadcn-charts`、Unovis 等**本工程不存在**的封装（历史知识库残留，见 `ui-libs/README.md`）
- 图表容器不设高度（`useChartOps().chartHeight` 为 `16rem`，自定义时显式给）
- 忘记 `isEmpty` / `loading` 态（表格与图表都要有空态）

## 6. 排查

| 现象 | 查什么 |
|---|---|
| 图表不显示 | 容器有无高度；`initChart` 是否在 `onMounted` 里；数据是否空但没给 `isEmpty` |
| 切主题后颜色不变 | 是否 `watch(isDark, ...)` 重建 option；是否用了 `getCssVar` 而非硬编码 |
| 窗口 resize 后错位 | 是否绕过 `useChart` 自己 init |
| 打包体积暴涨 | 是否有全量 `import * as echarts` |
| 首屏卡顿 | 是否未用 IntersectionObserver 懒初始化（`useChart` 默认带） |
