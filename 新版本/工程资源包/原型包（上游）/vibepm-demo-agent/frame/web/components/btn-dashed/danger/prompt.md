# 危险虚线按钮

> 状态：preview · slug：`btn-dashed-danger` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「危险虚线按钮」（`btn-dashed-danger`）。危险色虚线边框操作。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：虚线状态色走 Arco `type="dashed"` + `status`；宿主已挂 arco.css 即可，无需另拷组件 CSS。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-button dashed+danger

## 4. 视觉规格

- 布局 / 层级 / 强调：危险色虚线描边
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-button type="dashed" status="danger">危险按钮</a-button>
```

> 换文案：只改汉字，勿改 type / status。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/btn-dashed/danger/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| btn-dashed-default | components/btn-dashed/default/ | |
| btn-dashed-primary | components/btn-dashed/primary/ | |
| btn-dashed-success | components/btn-dashed/success/ | |
| btn-dashed-warning | components/btn-dashed/warning/ | |
| btn-dashed-danger | components/btn-dashed/danger/ | （本条） |
| btn-dashed-disabled | components/btn-dashed/disabled/ | |
