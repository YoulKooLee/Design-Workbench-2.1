# 箭头变形

> 状态：preview · slug：`btn-fx-arrow-morph` · 类型：component · 母版：web · surface：marketing · category：`basic`

## 1. 角色与目标

实现「箭头变形」（`btn-fx-arrow-morph`）。在按钮上挂修饰 class（及必要内部结构），呈现约定动效。不是按钮语义态本身。

成功标准：业务页宿主加 class 后出现约定动效，文案保持可读。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。
- **样式落地**：将家族 `components/btn-fx/component.css` 中相关规则并入宿主 CSS；禁止独立 link `component.css`。
- 纯 CSS（或仅本条结构 class），无需外链脚本

## 3. 约束

- **本提示词只含这一种形态**
- 宿主：`a-button` + `.wa-btn-arrow-morph`；有标签时用 `<span class="wa-btn-fx__label">`
- 私有样式真源在 `components/btn-fx/component.css`；§5 只贴 HTML
- 禁止外链 CDN

## 4. 视觉规格

- 动效：本条即按钮装饰；色走 `--wa-color-primary`；遵守 `prefers-reduced-motion`
- 颜色：只用 `--wa-*` / Arco token

## 5. 直接粘贴

```html
<a-button class="wa-btn-arrow-morph" size="large" type="primary"><span class="wa-btn-fx__label">初始化</span></a-button>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 悬停/点击后文案可读
- [ ] 遵守 `prefers-reduced-motion`

## 7. 预览

`components/btn-fx/arrow-morph/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `btn-fx-shine-sweep` | `components/btn-fx/shine-sweep/` |  |
| `btn-fx-background-wipe` | `components/btn-fx/background-wipe/` |  |
| `btn-fx-two-tone-sweep` | `components/btn-fx/two-tone-sweep/` |  |
| `btn-fx-border-glow` | `components/btn-fx/border-glow/` |  |
| `btn-fx-border-follow` | `components/btn-fx/border-follow/` |  |
| `btn-fx-icon-nudge` | `components/btn-fx/icon-nudge/` |  |
| `btn-fx-arrow-fly` | `components/btn-fx/arrow-fly/` |  |
| `btn-fx-label-roll` | `components/btn-fx/label-roll/` |  |
| `btn-fx-attention-pulse` | `components/btn-fx/attention-pulse/` |  |
| `btn-fx-center-fill` | `components/btn-fx/center-fill/` |  |
| `btn-fx-side-sweep` | `components/btn-fx/side-sweep/` |  |
| `btn-fx-pinch-fill` | `components/btn-fx/pinch-fill/` |  |
| `btn-fx-fill-slide-out` | `components/btn-fx/fill-slide-out/` |  |
| `btn-fx-fill-collapse` | `components/btn-fx/fill-collapse/` |  |
| `btn-fx-skew-sweep` | `components/btn-fx/skew-sweep/` |  |
| `btn-fx-arrow-morph` | `components/btn-fx/arrow-morph/` | （本条） |
| `btn-fx-shape-flood` | `components/btn-fx/shape-flood/` |  |
| `btn-fx-arrow-sweep` | `components/btn-fx/arrow-sweep/` |  |
| `btn-fx-circle-drop` | `components/btn-fx/circle-drop/` |  |
| `btn-fx-frame-swap` | `components/btn-fx/frame-swap/` |  |
| `btn-fx-zoom-fill` | `components/btn-fx/zoom-fill/` |  |
| `btn-fx-expanding-icon` | `components/btn-fx/expanding-icon/` |  |
| `btn-fx-tap-spring` | `components/btn-fx/tap-spring/` |  |
| `btn-fx-ripple-press` | `components/btn-fx/ripple-press/` |  |
| `btn-fx-plus-close` | `components/btn-fx/plus-close/` |  |
| `btn-fx-bounce-in` | `components/btn-fx/bounce-in/` |  |
