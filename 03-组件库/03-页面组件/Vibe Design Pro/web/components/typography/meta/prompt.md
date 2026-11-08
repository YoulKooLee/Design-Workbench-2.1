# 上下字段

> 状态：preview · slug：`typography-meta` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「上下字段」（`typography-meta`）。详情页头下方「上标签下值」只读信息条；条目按需增减，列数随容器自适应。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：静态键值排版；增减 `.wa-typo-meta__item` 即可（预览示例 4 项，非唯一数量）
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：`auto-fit` 栅格（非固定列数）；标签 12px 次要色、值 14px 主色；列间距 24px；需固定 N 列时可覆盖 `grid-template-columns: repeat(N, 1fr)`
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-typo-meta">
  <div class="wa-typo-meta__item">
    <span class="wa-typo-meta__label">订单编号</span>
    <span class="wa-typo-meta__value">OD-20260412-8831</span>
  </div>
  <div class="wa-typo-meta__item">
    <span class="wa-typo-meta__label">负责人</span>
    <span class="wa-typo-meta__value">林晓薇</span>
  </div>
  <div class="wa-typo-meta__item">
    <span class="wa-typo-meta__label">所属部门</span>
    <span class="wa-typo-meta__value">履约运营组</span>
  </div>
  <div class="wa-typo-meta__item">
    <span class="wa-typo-meta__label">更新时间</span>
    <span class="wa-typo-meta__value">2026-04-12 16:48:00</span>
  </div>
</div>
```

> 换文案：只改汉字；条目增减 `__item`，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案与条目数）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/typography/meta/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `typography` | `components/typography/title/` |  |
| `typography-paragraph` | `components/typography/paragraph/` |  |
| `typography-text` | `components/typography/text/` |  |
| `typography-ellipsis` | `components/typography/ellipsis/` |  |
| `typography-meta` | `components/typography/meta/` | （本条） |
| `typography-fields` | `components/typography/fields/` |  |
