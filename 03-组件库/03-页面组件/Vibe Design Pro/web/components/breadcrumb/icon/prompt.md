# 图标首页

> 状态：preview · slug：`breadcrumb-icon` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「图标首页」（`breadcrumb-icon`）。首项仅展示首页图标（无「首页」文案），节省横向空间。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：可点项悬停规则在 `assets/common/css/components.css`（`.arco-breadcrumb-item a`）；图标首页热区用 `.wa-breadcrumb-home-icon`；宿主已挂 components.css 即可。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-breadcrumb；首项仅 `icon-home`（包在可点 `<a class="wa-breadcrumb-home-icon" aria-label="首页">` 内）；中间项可点、末项不可点
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：首项仅图标；可点文字/图标悬停字色加深（`text-2` → `text-1`）
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-breadcrumb>
  <a-breadcrumb-item>
    <a class="wa-breadcrumb-home-icon" href="javascript:;" aria-label="首页"><icon-home></icon-home></a>
  </a-breadcrumb-item>
  <a-breadcrumb-item><a href="javascript:;">常用组件</a></a-breadcrumb-item>
  <a-breadcrumb-item>基础组件</a-breadcrumb-item>
</a-breadcrumb>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 首项无「首页」文案，仅图标且可悬停

## 7. 预览

`components/breadcrumb/icon/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `breadcrumb-default` | `components/breadcrumb/default/` | |
| `breadcrumb-icon` | `components/breadcrumb/icon/` | （本条） |
| `breadcrumb-separator` | `components/breadcrumb/separator/` | |
| `breadcrumb-max-count` | `components/breadcrumb/max-count/` | |
