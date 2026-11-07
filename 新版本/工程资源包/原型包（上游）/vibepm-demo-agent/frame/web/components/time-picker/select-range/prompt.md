# 固定时间点范围

> 状态：preview · slug：`time-picker-select-range` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「固定时间点范围」（`time-picker-select-range`）。从预置间隔列表中选起止时刻（营业时段、预约档等）。Arco 无 TimeSelectRange，用双 `a-select` + 分隔符；结束侧选项随开始时间过滤（结束 ≥ 开始）。

成功标准：业务页出现与 §5 一致的双下拉时间范围（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字；按 §3 提供选项与回调。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。多页共用助手（如 `upload-demo.js`）允许交付内**一份**共享脚本。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真双 `a-select`；可清空；时钟仅在**结束**侧 `#arrow-icon`（对齐 TimeRange 单后缀）；开始侧 `#arrow-icon` 置空，勿放左侧 `#prefix`
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`（或家族共享助手）；§2 须有「脚本落地」；勿在 §5 写独立 script src
- 结束选项须过滤为 ≥ 开始；开始改大导致结束非法时清空结束
- 勿用 `a-time-picker type="time-range"`（那是兄弟 `time-picker-range` 滚轮）
- 页内须提供：`start`、`end`、`startOptions`、`endOptions`、`onStartChange`；样式类 `.tp-select-range`（见成员 `component.css`）

## 4. 视觉规格

- 布局：一行双 Select + `-` 分隔；宽度由宿主表单决定
- 强调：右侧 12px 时钟；描边跟 `components.css`
- 动效：无；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*`（若适用）

## 5. 直接粘贴

```html
<div class="tp-select-range">
  <a-select
    v-model="start"
    :options="startOptions"
    placeholder="开始时间"
    allow-clear
    @change="onStartChange"
  >
    <template #arrow-icon><span></span></template>
  </a-select>
  <span class="tp-select-range__sep">-</span>
  <a-select
    v-model="end"
    :options="endOptions"
    placeholder="结束时间"
    allow-clear
  >
    <template #arrow-icon>
      <icon-clock-circle />
    </template>
  </a-select>
</div>
```

```css
.tp-select-range {
  display: inline-flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  gap: 0;
}
.tp-select-range .arco-select {
  flex: 1 1 0;
  min-width: 0;
}
.tp-select-range__sep {
  flex: 0 0 auto;
  padding: 0 6px;
  color: var(--color-text-3, #86909c);
  line-height: 1;
  user-select: none;
}
```

```js
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
function toMin(s) {
  if (!s) return NaN
  const p = String(s).split(':')
  return Number(p[0]) * 60 + Number(p[1] || 0)
}
const allOptions = buildTimeOptions('08:30', '18:00', 15)
const start = ref()
const end = ref()
const startOptions = allOptions
const endOptions = computed(() => {
  if (!start.value) return allOptions
  const min = toMin(start.value)
  return allOptions.filter((o) => toMin(o.value) >= min)
})
function onStartChange(v) {
  if (v && end.value && toMin(end.value) < toMin(v)) end.value = undefined
}
```

> 换文案：只改两段 placeholder；改时段改 `buildTimeOptions` 三个参数。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案 / 时段）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/time-picker/select-range/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `time-picker-default` | `components/time-picker/default/` |  |
| `time-picker-range` | `components/time-picker/range/` |  |
| `time-picker-select` | `components/time-picker/select/` |  |
| `time-picker-select-range` | `components/time-picker/select-range/` | （本条） |
| `time-picker-hour12` | `components/time-picker/hour12/` |  |
| `time-picker-disabled` | `components/time-picker/disabled/` |  |
