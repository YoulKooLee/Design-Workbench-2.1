# 基础漏斗图

> 状态：preview · slug：`chart-funnel-default` · 类型：component · 母版：web · surface：general · category：`chart`

## 1. 角色与目标

实现「基础漏斗图」（`chart-funnel-default`）。阶段转化与流失。

成功标准：业务页出现与 §5 一致的真图表（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库；图表色用 `--chart-1…10`（由图表配色方案写入）。
- **样式落地**：将 `assets/common/charts/shadcn-chart.css` 规则**并入**宿主页/模块 CSS（漏斗另并 `components/chart-funnel/component.css`；配色预览另并 `components/chart-palette/component.css`）；**禁止**在交付里写死母版相对 link。
- **脚本落地**：挂载逻辑用 `梯形漏斗 DOM（crm-funnel）`；依赖本地 Unovis + `shadcn-charts` + `chart-palette`；并入宿主页 `js/<page>.js`。预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 Unovis 图表宿主（`.shadcn-chart-host`）或漏斗 DOM；禁止用静态图片冒充实图
- 颜色：系列色用 `var(--chart-n)` / `var(--chart-radial-n)`，由 `WaChartPalette` / `ArcoProChartPalette` 写入
- 禁止外链 CDN

## 4. 视觉规格

- 布局 / 层级 / 强调：阶段转化与流失；图例与宿主同卡
- 动效：图表入场/悬停提示由 Unovis 封装处理；漏斗用 crm-funnel-in
- 颜色：只用 `--chart-*` / `--wa-*` / Arco text token

## 5. 直接粘贴

```html
<div class="shadcn-donut-layout wa-chart-funnel-layout">
  <div class="shadcn-donut-chart">
    <div class="crm-funnel crm-funnel--trap"><!-- 阶段步进 --></div>
  </div>
  <div class="shadcn-donut-legend-wrap">
    <ul class="shadcn-donut-legend shadcn-donut-legend--inline"><!-- 图例 --></ul>
  </div>
</div>
```

> 换文案：只改汉字与数据；样式/脚本并入宿主，勿单独 link 母版路径。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案与数据）
- [ ] 未混入其它形态或整页橱窗
- [ ] 无 CDN；配色走 `--chart-*`

## 7. 预览

`components/chart-funnel/default/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `chart-funnel-default` | `components/chart-funnel/default/` | （本条） |
