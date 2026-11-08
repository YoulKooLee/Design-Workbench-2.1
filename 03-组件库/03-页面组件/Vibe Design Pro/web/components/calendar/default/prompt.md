# 日历

> 状态：preview · slug：`calendar-default` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「日历」（`calendar-default`）。完整月历面板，展示与选择日期。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：`value` 须为 `Date`（如 `ref(new Date())`）；仅预览挂载壳不拷进业务页。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-calendar`；`v-model` 绑定 `Date`；头部含翻月、「今天」与月/年分段切换（默认 `modes`）
- 紧凑选日请用 `date-picker` 家族，勿用 Calendar 的 `panel` 模式冒充
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 禁止外链 CDN 图片；示例可用本地质感图或 data URI

## 4. 视觉规格

- 布局 / 层级 / 强调：月历全视图；右上「今天」为中性按钮（白底描边）+ 月/年分段
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）
- 「今天」样式真源在 `assets/common/css/components.css`（`.arco-calendar-header-left > .arco-btn`）

## 5. 直接粘贴

```html
<a-calendar v-model="value" />
```

> 换文案：只改汉字，勿改 class / type。业务页需提供 `value: ref(new Date())`（或等价 `Date`）。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 选日 / 翻月 /「今天」/ 月年切换正常，选中态与 `value` 同步

## 7. 预览

`components/calendar/default/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `calendar-default` | `components/calendar/default/` | （本条） |
| `calendar-cell` | `components/calendar/cell/` | |
| `calendar-header` | `components/calendar/header/` | |
| `calendar-select` | `components/calendar/select/` | |
