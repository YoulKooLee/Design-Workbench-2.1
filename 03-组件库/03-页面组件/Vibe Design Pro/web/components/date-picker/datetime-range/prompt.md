# 日期时间范围

> 状态：preview · slug：`date-picker-datetime-range` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「日期时间范围」（`date-picker-datetime-range`）。选择起止日期时间（活动档期、值班班次等）。语义对照 Admin `component-form` DateTimeRange。

成功标准：业务页出现与 §5 一致的真日期时间范围控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-range-picker` + `show-time`；分隔符 `~`；可清空；格式含时分秒
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- `placeholder` 必须是长度为 2 的数组，勿传单字符串（会显示成「请 - 选」类残字）

## 4. 视觉规格

- 布局：控件本体；宽度由宿主表单决定（建议略宽于单日）
- 强调：占位与日历图标跟 Arco 默认
- 动效：无；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*`（若适用）

## 5. 直接粘贴

```html
<a-range-picker
  v-model="value"
  show-time
  format="YYYY-MM-DD HH:mm:ss"
  separator="~"
  :placeholder="['开始时间', '结束时间']"
  allow-clear
/>
```

> 换文案：只改数组内两段汉字；`placeholder` 必须是长度为 2 的数组。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 面板含日期与时间；确定后写入起止
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/date-picker/datetime-range/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------| `date-picker-default` | `components/date-picker/default/` |  |
| `date-picker-range` | `components/date-picker/range/` |  |
| `date-picker-datetime` | `components/date-picker/datetime/` |  |
| `date-picker-datetime-range` | `components/date-picker/datetime-range/` | （本条） |
| `date-picker-week` | `components/date-picker/week/` |  |
| `date-picker-month` | `components/date-picker/month/` |  |
| `date-picker-year` | `components/date-picker/year/` |  |
| `date-picker-quarter` | `components/date-picker/quarter/` |  |
| `date-picker-multiple` | `components/date-picker/multiple/` |  |
| `date-picker-disabled` | `components/date-picker/disabled/` |  |
