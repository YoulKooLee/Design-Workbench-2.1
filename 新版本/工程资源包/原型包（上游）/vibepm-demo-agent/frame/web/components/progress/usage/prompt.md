# 用量进度

> 状态：preview · slug：`progress-usage` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「用量进度」（`progress-usage`）。标题 + 状态徽章 + 进度条 + 底部用量说明，适合存储/配额展示。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-progress + a-tag；`:show-text="false"`；`color` / `track-color` 区分已用与余量
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：上标题与徽章；中进度条；下左用量右百分比
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：指示条用品牌色，轨道用浅底 `--color-fill-3`

## 5. 直接粘贴

```html
<div class="wa-progress-usage">
  <div class="wa-progress-usage__head">
    <span class="wa-progress-usage__title">存储用量</span>
    <a-tag size="small" color="gray">中等</a-tag>
  </div>
  <a-progress
    class="wa-progress-demo"
    :percent="0.75"
    :show-text="false"
    color="rgb(var(--primary-6))"
    track-color="var(--color-fill-3)"
    :stroke-width="10"
  ></a-progress>
  <div class="wa-progress-usage__foot">
    <span>已用 7.5 GB / 共 10 GB</span>
    <span class="wa-progress-usage__pct">75%</span>
  </div>
</div>
```

> 换文案：只改汉字与用量数字（与 `:percent` 一致）。`.wa-progress-usage` / `__*` / `.wa-progress-demo` 并入宿主 CSS；勿单独 link。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/progress/usage/index.html`

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
| `progress-usage` | `components/progress/usage/` | （本条） |
| `progress-metrics` | `components/progress/metrics/` | |
| `progress-setup` | `components/progress/setup/` | |
| `progress-status` | `components/progress/status/` | |
