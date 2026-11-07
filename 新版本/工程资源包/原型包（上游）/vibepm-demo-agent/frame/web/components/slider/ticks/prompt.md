# 刻度点滑块

> 状态：preview · slug：`slider-ticks` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「刻度点滑块」（`slider-ticks`）。轨下主/次刻度 + 偶数数字标签，适合离散档位。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把 `tickScale`（0–12）数据**并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-slider，0–12 步进 1；轨下自定义刻度尺（主刻偶数 + 标签，次刻奇数）；勿用 `show-ticks`
- 若有私有样式：规则真源在家族 `components/slider/component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：滑轨上方；轨下主/次竖刻 + 偶数数字；半拇指内缩，0 / 12 对准拇指中心（外缘贴轨端）
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-slider-ticks">
  <a-slider class="wa-slider" v-model="value" :min="0" :max="12" :step="1" :show-tooltip="false"></a-slider>
  <div class="wa-slider-scale" aria-hidden="true">
    <div class="wa-slider-scale__col" v-for="n in tickScale" :key="n">
      <span
        class="wa-slider-scale__tick"
        :class="{ 'wa-slider-scale__tick--major': n % 2 === 0 }"
      ></span>
      <span v-if="n % 2 === 0" class="wa-slider-scale__label">{{ n }}</span>
    </div>
  </div>
</div>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/slider/ticks/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `slider-default` | `components/slider/default/` | |
| `slider-range` | `components/slider/range/` | |
| `slider-marks` | `components/slider/marks/` | |
| `slider-ticks` | `components/slider/ticks/` | （本条） |
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
