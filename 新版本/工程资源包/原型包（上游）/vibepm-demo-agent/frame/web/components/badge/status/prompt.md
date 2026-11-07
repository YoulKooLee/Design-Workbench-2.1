# 状态徽标

> 状态：preview · slug：`badge` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「状态徽标」（`badge`）。用多色状态点区分业务进度（处理中 / 拒绝 / 通过 / 取消 / 待审）。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将 `.wa-badge-row` 规则（见 `components/index.css` 或家族 `component.css`）**并入**宿主 CSS；多枚并排靠子项 `padding-inline-end`，勿只靠相邻空隙。

## 3. 约束

- **本提示词只含这一种形态**（状态点 + 文案；数字/圆点见兄弟 slug）
- 交互：真 a-badge + `status`（`processing` / `danger` / `success` / `normal` / `warning`）
- 多枚必须包在 `.wa-badge-row` 内，否则项间距会贴死

## 4. 视觉规格

- 布局 / 层级 / 强调：处理中置前；项间距 16px；点与文案跟 Arco 默认（约 8px）
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：Arco status 预设；`processing` 为主色蓝

## 5. 直接粘贴

```html
<div class="wa-badge-row">
  <a-badge status="processing" text="处理中"></a-badge>
  <a-badge status="danger" text="已拒绝"></a-badge>
  <a-badge status="success" text="已通过"></a-badge>
  <a-badge status="normal" text="已取消"></a-badge>
  <a-badge status="warning" text="待审核"></a-badge>
</div>
```

> 换文案：只改 `text` 汉字；增减态改 `status`。单枚可去掉 `.wa-badge-row`。
> **注意**：DOM 模板里勿写 `<a-badge … />` 自闭合，浏览器会把后续徽章嵌进前一个，项间距全部失效；须写成 `></a-badge>`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 后一项圆点不贴前一项文字
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/badge/status/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `badge` | `components/badge/status/` | （本条） |
| `badge-count` | `components/badge/count/` | |
| `badge-max` | `components/badge/max/` | |
| `badge-dot` | `components/badge/dot/` | |
