# 固定时间点

> 状态：preview · slug：`time-picker-select` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「固定时间点」（`time-picker-select`）。从预置间隔列表中选一个时刻（预约档、营业整点等）。语义对齐 Element `el-time-select`；Arco 无同名控件，用原生 `a-select` + 时间选项实现。

成功标准：业务页出现与 §5 一致的真下拉时间列表（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字；按 §3 提供 `timeOptions`。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-select` + `:options`；可清空；后缀时钟用 `#arrow-icon` + `icon-clock-circle`（与 TimePicker 后缀同侧、同 12px）
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 勿用自造列表 DOM 冒充；勿改成 `a-time-picker` 滚轮（那是兄弟 `time-picker-default`）；勿把时钟放进 `#prefix`
- 页内须提供：`value`、`timeOptions`（`{ label, value }[]`，如 `08:30`…`18:00`，间隔 15 分钟）

## 4. 视觉规格

- 布局：控件本体；宽度由宿主表单决定
- 强调：后缀时钟（右侧）+ Select 下拉；描边跟 `components.css`；图标 12px 与 Picker 后缀一致
- 动效：无；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*`（若适用）

## 5. 直接粘贴

```html
<a-select
  v-model="value"
  :options="timeOptions"
  placeholder="请选择时间"
  allow-clear
>
  <template #arrow-icon>
    <icon-clock-circle />
  </template>
</a-select>
```

```js
// 页内提供（可改 start / end / stepMinutes）
function buildTimeOptions(start, end, stepMinutes) {
  function toMin(s) {
    const p = String(s || '').split(':')
    return Number(p[0]) * 60 + Number(p[1] || 0)
  }
  function pad(n) {
    return String(n).padStart(2, '0')
  }
  const from = toMin(start)
  const to = toMin(end)
  const step = Math.max(1, Number(stepMinutes) || 15)
  const list-default = []
  for (let m = from; m <= to; m += step) {
    const label = pad(Math.floor(m / 60)) + ':' + pad(m % 60)
    list.push({ label, value: label })
  }
  return list
}
const timeOptions = buildTimeOptions('08:30', '18:00', 15)
```

> 换文案：只改 placeholder；改时段改 `buildTimeOptions` 三个参数。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案 / 时段）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/time-picker/select/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `time-picker-default` | `components/time-picker/default/` |  |
| `time-picker-range` | `components/time-picker/range/` |  |
| `time-picker-select` | `components/time-picker/select/` | （本条） |
| `time-picker-select-range` | `components/time-picker/select-range/` |  |
| `time-picker-hour12` | `components/time-picker/hour12/` |  |
| `time-picker-disabled` | `components/time-picker/disabled/` |  |
