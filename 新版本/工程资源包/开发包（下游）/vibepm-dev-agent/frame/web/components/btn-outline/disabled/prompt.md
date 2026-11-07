# 禁用描边按钮

> 状态：preview · slug：`btn-outline-disabled` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「禁用描边按钮」（`btn-outline-disabled`）。不可用描边按钮。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：描边透明底与悬停实心为全局样式（`assets/common/css/global.css`）；宿主已挂 global 即可，无需另拷组件 CSS。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-button disabled

## 4. 视觉规格

- 透明底描边；悬停实心填充、文字变白（全局 `type="outline"`）
- 布局 / 层级 / 强调：禁用描边
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-button type="outline" disabled>禁用按钮</a-button>
```

> 换文案：只改汉字，勿改 type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/btn-outline/disabled/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `btn-outline-default` | `components/btn-outline/default/` | |
| `btn-outline-success` | `components/btn-outline/success/` | |
| `btn-outline-warning` | `components/btn-outline/warning/` | |
| `btn-outline-danger` | `components/btn-outline/danger/` | |
| `btn-outline-disabled` | `components/btn-outline/disabled/` | （本条） |
| `btn-outline-loading` | `components/btn-outline/loading/` | |
