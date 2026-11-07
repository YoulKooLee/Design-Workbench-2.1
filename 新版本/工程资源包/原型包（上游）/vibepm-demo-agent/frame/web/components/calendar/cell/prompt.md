# 自定义单元格

> 状态：preview · slug：`calendar-cell` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「自定义单元格」（`calendar-cell`）。在日期格内展示短标签或日程摘要。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将同目录 `component.css` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：`value` 为 `Date`；`cellMark(year, month, date)` 返回当日短文案（可无）；逻辑并入宿主页 JS，预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-calendar`；用 `#default="{ year, month, date }"` 自定义格内容（对照 Element `date-cell`）；`month` 为 1–12
- 私有样式真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- 禁止外链 CDN 图片；示例可用本地质感图或 data URI

## 4. 视觉规格

- 布局 / 层级 / 强调：日期数字 + 可选短标签；格高略增高以容纳摘要；头部「今天」为中性按钮（与 default 同源）
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）
- 「今天」样式真源在 `assets/common/css/components.css`（`.arco-calendar-header-left > .arco-btn`）

## 5. 直接粘贴

```html
<a-calendar v-model="value" :modes="['month']">
  <template #default="{ year, month, date }">
    <div class="wa-cal-cell">
      <div class="wa-cal-cell__day">{{ date }}</div>
      <div v-if="cellMark(year, month, date)" class="wa-cal-cell__mark">{{ cellMark(year, month, date) }}</div>
    </div>
  </template>
</a-calendar>
```

> 换文案：只改汉字与 `cellMark` 返回值。业务页需 `value: ref(new Date())` 与 `cellMark`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 有标记的日期格显示短标签，选日仍可用

## 7. 预览

`components/calendar/cell/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `calendar-default` | `components/calendar/default/` | |
| `calendar-cell` | `components/calendar/cell/` | （本条） |
| `calendar-header` | `components/calendar/header/` | |
| `calendar-select` | `components/calendar/select/` | |
