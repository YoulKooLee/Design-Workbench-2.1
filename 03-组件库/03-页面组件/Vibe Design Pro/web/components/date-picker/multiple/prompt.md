# 多选日期

> 状态：preview · slug：`date-picker-multiple` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「多选日期」（`date-picker-multiple`）。一次勾选多个不连续日期（休假日、开放日等）。母版 Arco 无原生 `multiple`，用「自定义描边触发器（Tag 在框内）+ 原生 `show-confirm-btn` + `#cell` 多日高亮」组合。

成功标准：业务页出现与 §5 一致的带边框触发器、可关闭标签、面板已选高亮、一键清除、底部确定（选中后可点；非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字；按 §3 补数组与回调。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：`show-confirm-btn` 保持面板不自动关；`@select-default` 累加/再点取消并写入 `draft`（此时原生「确定」才可点）；`@ok` 关闭面板；打开面板时清空 `draft` 使确定禁用
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- `#cell` 用 `isPicked` 给 `value` 内所有日期加 `.dp-multi-cell--picked`（勿只依赖 Arco 单日选中态）
- 触发器右侧：有值悬停显示清除（`onClearAll`），隐藏日历图标；样式只作用在 `.dp-multi` 内
- `popup-container` 挂到 `.dp-multi`，避免面板样式泄漏
- 勿加 `#extra` 自定义确定、勿加 `disabled-date` 禁已选日（会导致确定一直灰）
- 勿与 `a-range-picker`（连续区间）混用；勿写不存在的 `multiple` prop
- 页内须提供：`value`、`draft`、`panelOpen`、`popupContainer`、`isPicked`、`cellDay`、`onSelect`、`onConfirm`、`onPopupChange`、`onRemove`、`onClearAll`（可参考本目录 `component.js`）

## 4. 视觉规格

- 布局：描边框内放 Tag / 占位；右侧清除 + 日历；宽度由宿主表单决定
- 强调：描边用 `--color-border-*`；已选日主色圆底；展开时主色描边
- 动效：无；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="dp-multi" ref="multiRoot">
  <a-date-picker
    v-model="draft"
    v-model:popup-visible="panelOpen"
    :popup-container="popupContainer"
    format="YYYY-MM-DD"
    value-format="YYYY-MM-DD"
    show-confirm-btn
    :show-now-btn="false"
    @select-default="onSelect"
    @ok="onConfirm"
    @popup-visible-change="onPopupChange"
  >
    <template #cell="{ date }">
      <div class="arco-picker-date">
        <div
          class="arco-picker-date-value"
          :class="{ 'dp-multi-cell--picked': isPicked(date) }"
        >{{ cellDay(date) }}</div>
      </div>
    </template>
    <div
      class="dp-multi__field"
      :class="{ 'dp-multi__field--open': panelOpen, 'dp-multi__field--has-value': value.length }"
      tabindex="0"
    >
      <div class="dp-multi__tags" v-if="value.length">
        <a-tag
          v-for="d in value"
          :key="d"
          closable
          @click.stop
          @close.stop="onRemove(d)"
        >
          <template #close-icon><icon-close /></template>
          {{ d }}
        </a-tag>
      </div>
      <span v-else class="dp-multi__placeholder">请选择多个日期</span>
      <span class="dp-multi__suffix">
        <span
          v-if="value.length"
          class="arco-icon-hover arco-picker-clear-icon"
          role="button"
          aria-label="清除"
          @click.stop="onClearAll"
        >
          <icon-close></icon-close>
        </span>
        <span class="arco-picker-suffix-icon">
          <icon-calendar></icon-calendar>
        </span>
      </span>
    </div>
  </a-date-picker>
</div>
```

> 换文案：只改 placeholder 汉字。`value` 须为 `YYYY-MM-DD` 字符串数组。样式见同目录 `component.css`（仅限 `.dp-multi`）。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 已选多日在面板内均有选中样式
- [ ] 有值悬停出现一键清除，可清空全部
- [ ] 未选日期时「确定」禁用；选中后可点并关闭面板
- [ ] 不影响同页其它 DatePicker / Range / DateTime 面板
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/date-picker/multiple/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------| `date-picker-default` | `components/date-picker/default/` |  |
| `date-picker-range` | `components/date-picker/range/` |  |
| `date-picker-datetime` | `components/date-picker/datetime/` |  |
| `date-picker-datetime-range` | `components/date-picker/datetime-range/` |  |
| `date-picker-week` | `components/date-picker/week/` |  |
| `date-picker-month` | `components/date-picker/month/` |  |
| `date-picker-year` | `components/date-picker/year/` |  |
| `date-picker-quarter` | `components/date-picker/quarter/` |  |
| `date-picker-multiple` | `components/date-picker/multiple/` | （本条） |
| `date-picker-disabled` | `components/date-picker/disabled/` |  |
