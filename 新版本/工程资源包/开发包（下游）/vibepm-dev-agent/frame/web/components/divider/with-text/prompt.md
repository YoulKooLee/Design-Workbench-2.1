# 文字分割线

> 状态：preview · slug：`divider-with-text` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「文字分割线」（`divider-with-text`）。居中文字的分隔线。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：家族 `component.css` 仅含预览演示壳（`.wa-divider-demo*`），**无需**并入业务页。线色由母版 `components.css`（`--color-border-2`）统一；业务页直接用 §5 即可。线宽跟父级容器走，勿写死像素宽度。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-divider orientation=center；HTML 须显式闭合 `</a-divider>`（禁止自闭合）
- 预览壳勿进 §5；勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：线中嵌文字
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：线色跟 `--color-border-2` / 宿主边框 token
- 宽度：跟父级 100%，勿固定像素

## 5. 直接粘贴

```html
<a-divider orientation="center">分割线</a-divider>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/divider/with-text/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `divider-default` | `components/divider/default/` | |
| `divider-dashed` | `components/divider/dashed/` | |
| `divider-with-text` | `components/divider/with-text/` | （本条） |
| `divider-with-text-dashed` | `components/divider/with-text-dashed/` | |
