# 表格型描述列表

> 状态：preview · slug：`descriptions-bordered` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「表格型描述列表」（`descriptions-bordered`）。表格边框双列详情，宽度跟随容器，两值列等宽。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-descriptions；`bordered`；`table-layout="fixed"`；`:column="2"`；可用 `:span` 跨列
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：表格化双列；`table-layout="fixed"` 保持两值列等宽；宽度 100% 跟容器；长文案可用 `:span="2"`
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-descriptions :column="2" bordered table-layout="fixed" title="订单信息" style="width:100%">
  <a-descriptions-item label="订单号">VP-20260322</a-descriptions-item>
  <a-descriptions-item label="金额">¥128.00</a-descriptions-item>
  <a-descriptions-item label="支付方式">支付宝</a-descriptions-item>
  <a-descriptions-item label="状态">已支付</a-descriptions-item>
  <a-descriptions-item label="下单时间">2026-03-22 14:20</a-descriptions-item>
  <a-descriptions-item label="收货人">王芳</a-descriptions-item>
  <a-descriptions-item label="联系电话">138****5620</a-descriptions-item>
  <a-descriptions-item label="配送方式">顺丰快递</a-descriptions-item>
  <a-descriptions-item label="收货地址" :span="2">上海市浦东新区张江路 88 号 12 楼</a-descriptions-item>
</a-descriptions>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/descriptions/bordered/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `descriptions-default` | `components/descriptions/default/` | |
| `descriptions-bordered` | `components/descriptions/bordered/` | （本条） |
