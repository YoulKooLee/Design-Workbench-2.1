# 配置进度

> 状态：preview · slug：`progress-setup` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「配置进度」（`progress-setup`）。标题与步骤计数 + 总进度条 + 已完成/待办清单，适合引导配置流程。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-progress + icon-check；待办用 `.wa-progress-setup__dot`；`:show-text="false"`
- 若有私有样式：规则真源在家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：上标题与 2/4；中进度条；下勾选/空心步骤列表
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：指示条用品牌色；文字走 `--color-text-*`

## 5. 直接粘贴

```html
<div class="wa-progress-setup">
  <div class="wa-progress-setup__head">
    <span class="wa-progress-setup__title">配置进度</span>
    <span class="wa-progress-setup__count">2/4</span>
  </div>
  <a-progress class="wa-progress-demo" :percent="0.5" :show-text="false" color="rgb(var(--primary-6))" :stroke-width="8"></a-progress>
  <ul class="wa-progress-setup__list">
    <li class="wa-progress-setup__item is-done">
      <icon-check class="wa-progress-setup__icon"></icon-check>
      <span>账号</span>
    </li>
    <li class="wa-progress-setup__item is-done">
      <icon-check class="wa-progress-setup__icon"></icon-check>
      <span>资料</span>
    </li>
    <li class="wa-progress-setup__item is-todo">
      <span class="wa-progress-setup__dot" aria-hidden="true"></span>
      <span>设置</span>
    </li>
    <li class="wa-progress-setup__item is-todo">
      <span class="wa-progress-setup__dot" aria-hidden="true"></span>
      <span>复核</span>
    </li>
  </ul>
</div>
```

> 换文案：只改汉字与百分比（与 `:percent` 一致）。相关 class 并入宿主 CSS；勿单独 link。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/progress/setup/index.html`

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
| `progress-striped` | `components/progress/striped/` | |
| `progress-upload` | `components/progress/upload/` | |
| `progress-usage` | `components/progress/usage/` | |
| `progress-metrics` | `components/progress/metrics/` | |
| `progress-setup` | `components/progress/setup/` | （本条） |
| `progress-status` | `components/progress/status/` | |
