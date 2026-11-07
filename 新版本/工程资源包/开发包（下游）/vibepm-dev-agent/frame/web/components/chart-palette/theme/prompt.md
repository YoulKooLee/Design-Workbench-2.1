# 主题单色

> 状态：preview · slug：`chart-palette-theme` · 类型：component · 母版：web · surface：general · category：`chart`

## 1. 角色与目标

实现「主题单色」（`chart-palette-theme`）。跟随主色深浅阶梯。

成功标准：业务页可调用 `WaChartPalette.set(...)` 写入 `--chart-1…10`，色板展示与 §5 同构（chip + soft + hex meta）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库；图表色用 `--chart-1…10`（由图表配色方案写入）。
- **样式落地**：将 `components/chart-palette/component.css`（及 `--chart-*` 相关 token）规则**并入**宿主页/模块 CSS；**禁止**在交付里写死母版相对 link。
- **脚本落地**：挂载逻辑用 `WaChartPalette.set('theme')`；依赖本地 `chart-palette`；并入宿主页 `js/<page>.js`。预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：色板展示 + `WaChartPalette.set`；家族页可切换方案；本条不附示例图表
- 颜色：系列色用 `var(--chart-n)`，由 `WaChartPalette` / `ArcoProChartPalette` 写入
- 禁止外链 CDN

## 4. 视觉规格

- 布局：chip（主色）+ soft（浅底）+ meta（id/名称 + hex），与 Admin `component-chart-palette` 一致
- 动效：无强制动效
- 颜色：只用 `--chart-*` / `--wa-*` / Arco text token

## 5. 直接粘贴

```html
<div class="chart-palette-swatches cols-10"><!-- chip + soft + meta --></div>
```

> 换文案：只改汉字与数据；样式/脚本并入宿主，勿单独 link 母版路径。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案与数据）
- [ ] 未混入其它形态或整页橱窗
- [ ] 无 CDN；配色走 `--chart-*`

## 7. 预览

`components/chart-palette/theme/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `chart-palette-theme` | `components/chart-palette/theme/` | （本条） |
| `chart-palette-colorful` | `components/chart-palette/colorful/` | |
| `chart-palette-brand` | `components/chart-palette/brand/` | |
| `chart-palette-muted` | `components/chart-palette/muted/` | |
