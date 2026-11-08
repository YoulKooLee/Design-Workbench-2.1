# 自定义颜色进度条

> 状态：preview · slug：`progress-color` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「自定义颜色进度条」（`progress-color`）。用 `color` 指定指示条颜色，可配合加粗线宽。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-progress；`color` 覆盖状态色；可调 `:stroke-width`
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：线形；自定义指示色 + 略粗描边
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：`color` 可用品牌色；轨道仍走 Arco token

## 5. 直接粘贴

```html
<a-progress class="wa-progress-demo" :percent="0.62" color="#14C9C9" :stroke-width="8"></a-progress>
```

> 换文案：只改汉字，勿改 class / type。改色只动 `color`。`.wa-progress-demo` 并入宿主 CSS；勿单独 link。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/progress/color/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `progress-default` | `components/progress/default/` | |
| `progress-label` | `components/progress/label/` | |
| `progress-animation` | `components/progress/animation/` | |
| `progress-success` | `components/progress/success/` | |
| `progress-warning` | `components/progress/warning/` | |
| `progress-danger` | `components/progress/danger/` | |
| `progress-color` | `components/progress/color/` | （本条） |
| `progress-steps` | `components/progress/steps/` | |
| `progress-circle` | `components/progress/circle/` | |
| `progress-mini` | `components/progress/mini/` | |
| `progress-striped` | `components/progress/striped/` | |
| `progress-upload` | `components/progress/upload/` | |
| `progress-usage` | `components/progress/usage/` | |
| `progress-metrics` | `components/progress/metrics/` | |
| `progress-setup` | `components/progress/setup/` | |
| `progress-status` | `components/progress/status/` | |
