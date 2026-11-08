# 条纹进度条

> 状态：preview · slug：`progress-striped` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「条纹进度条」（`progress-striped`）。线形进度带斜向条纹与流动动效，适合上传与长时间任务反馈。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-progress；条纹与流动由 `.wa-progress-striped` CSS 提供（Arco 无 striped API）
- 若有私有样式：规则真源在家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：线形进度；指示条斜纹；默认带右侧百分比
- 动效：条纹横向流动（`wa-progress-striped-flow`）；尊重 `prefers-reduced-motion`
- 颜色：指示条用品牌色；条纹用半透明白叠加

## 5. 直接粘贴

```html
<a-progress
  class="wa-progress-demo wa-progress-striped"
  :percent="0.5"
  :stroke-width="8"
></a-progress>
```

> 换文案：只改汉字，勿改 class / type。`.wa-progress-demo` / `.wa-progress-striped` 并入宿主 CSS；勿单独 link。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/progress/striped/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `progress-default` | `components/progress/default/` | |
| `progress-label` | `components/progress/label/` | |
| `progress-animation` | `components/progress/animation/` | |
| `progress-success` | `components/progress/success/` | |
| `progress-warning` | `components/progress/warning/` | |
| `progress-danger` | `components/progress/danger/` | |
| `progress-color` | `components/progress/color/` | |
| `progress-steps` | `components/progress/steps/` | |
| `progress-circle` | `components/progress/circle/` | |
| `progress-mini` | `components/progress/mini/` | |
| `progress-striped` | `components/progress/striped/` | （本条） |
| `progress-upload` | `components/progress/upload/` | |
| `progress-usage` | `components/progress/usage/` | |
| `progress-metrics` | `components/progress/metrics/` | |
| `progress-setup` | `components/progress/setup/` | |
| `progress-status` | `components/progress/status/` | |
