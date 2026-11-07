# 项目状态

> 状态：preview · slug：`progress-status` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「项目状态」（`progress-status`）。卡片容器内分组展示多阶段进度，适合项目看板与阶段汇报。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-progress；外层 `.wa-progress-status` 卡片；内层复用 `.wa-progress-metrics`
- 若有私有样式：规则真源在家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：卡片标题 + 多项标签进度；指示条深色
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：阶段条可用成功/品牌/警告色区分；文字走 `--color-text-*`

## 5. 直接粘贴

```html
<div class="wa-progress-status">
  <div class="wa-progress-status__title">项目状态</div>
  <div class="wa-progress-metrics">
    <div class="wa-progress-metrics__item">
      <div class="wa-progress-label__meta">
        <span>设计阶段</span>
        <span class="wa-progress-label__value">85%</span>
      </div>
      <a-progress class="wa-progress-demo" :percent="0.85" :show-text="false" color="rgb(var(--success-6))" :stroke-width="8"></a-progress>
    </div>
    <div class="wa-progress-metrics__item">
      <div class="wa-progress-label__meta">
        <span>开发阶段</span>
        <span class="wa-progress-label__value">60%</span>
      </div>
      <a-progress class="wa-progress-demo" :percent="0.6" :show-text="false" color="rgb(var(--primary-6))" :stroke-width="8"></a-progress>
    </div>
    <div class="wa-progress-metrics__item">
      <div class="wa-progress-label__meta">
        <span>测试阶段</span>
        <span class="wa-progress-label__value">30%</span>
      </div>
      <a-progress class="wa-progress-demo" :percent="0.3" :show-text="false" color="rgb(var(--warning-6))" :stroke-width="8"></a-progress>
    </div>
  </div>
</div>
```

> 换文案：只改汉字与百分比（与 `:percent` 一致）。相关 class 并入宿主 CSS；勿单独 link。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/progress/status/index.html`

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
| `progress-setup` | `components/progress/setup/` | |
| `progress-status` | `components/progress/status/` | （本条） |
