# 刻度滑块

> 状态：preview · slug：`slider-marks` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「刻度滑块」（`slider-marks`）。滑轨上标出容量刻度（如 5 GB / 20 GB / 35 GB）。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把 `marks` 与 `formatTooltip`（0–100 → 5–35 GB）**并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-slider，marks 对象；format-tooltip 映射为 GB 文案（与刻度一致）
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：刻度文案在滑轨下方
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-slider class="wa-slider" v-model="value" :min="0" :max="100" :marks="marks" :format-tooltip="formatTooltip"></a-slider>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/slider/marks/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `slider-default` | `components/slider/default/` | |
| `slider-range` | `components/slider/range/` | |
| `slider-marks` | `components/slider/marks/` | （本条） |
| `slider-ticks` | `components/slider/ticks/` | |
| `slider-labels` | `components/slider/labels/` | |
| `slider-output` | `components/slider/output/` | |
| `slider-volume` | `components/slider/volume/` | |
| `slider-stepper` | `components/slider/stepper/` | |
| `slider-mood` | `components/slider/mood/` | |
| `slider-price` | `components/slider/price/` | |
| `slider-input` | `components/slider/input/` | |
| `slider-vertical` | `components/slider/vertical/` | |
| `slider-vertical-range` | `components/slider/vertical-range/` | |
| `slider-equalizer` | `components/slider/equalizer/` | |
