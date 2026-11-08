# 步进滑块

> 状态：preview · slug：`slider-stepper` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「步进滑块」（`slider-stepper`）。加减按钮与滑块联动调节积分额度。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把步进 / 档位文案 / 频段数据逻辑**并入**宿主页 `js/<page>.js`；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-slider；两侧圆形按钮步进；标签显示积分/月
- 若有私有样式：规则真源在同目录 `component.css`（亦可并入家族 `components/slider/component.css`）；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：标签 + 减/滑轨/加
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-slider-stepper">
  <div class="wa-slider-stepper__label">{{ value }} 积分/月</div>
  <div class="wa-slider-stepper__row">
    <a-button type="secondary" shape="circle" size="mini" aria-label="减少" @click="stepDown">
      <icon-minus></icon-minus>
    </a-button>
    <a-slider class="wa-slider" v-model="value" :min="0" :max="200" :step="10"></a-slider>
    <a-button type="secondary" shape="circle" size="mini" aria-label="增加" @click="stepUp">
      <icon-plus></icon-plus>
    </a-button>
  </div>
</div>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/slider/stepper/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `slider-default` | `components/slider/default/` | |
| `slider-range` | `components/slider/range/` | |
| `slider-marks` | `components/slider/marks/` | |
| `slider-ticks` | `components/slider/ticks/` | |
| `slider-labels` | `components/slider/labels/` | |
| `slider-output` | `components/slider/output/` | |
| `slider-volume` | `components/slider/volume/` | |
| `slider-stepper` | `components/slider/stepper/` | （本条） |
| `slider-mood` | `components/slider/mood/` | |
| `slider-price` | `components/slider/price/` | |
| `slider-input` | `components/slider/input/` | |
| `slider-vertical` | `components/slider/vertical/` | |
| `slider-vertical-range` | `components/slider/vertical-range/` | |
| `slider-equalizer` | `components/slider/equalizer/` | |
