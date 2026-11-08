# 下拉选择

> 状态：preview · slug：`calendar-select` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「下拉选择」（`calendar-select`）。用年、月下拉切换面板，适合快速跳转到指定年月。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将 `header/component.css`（壳）与同目录 `component.css`（下拉宽）规则**并入**宿主 CSS；**禁止**写死独立 link。
- **脚本落地**：`value`、`selectLabel`、`selectYear`、`selectMonth`、`yearOptions`、`monthOptions`、`panelKey`、`goToday` 并入宿主页 JS；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-calendar` + 真 `a-select` 年月下拉；左标题「年 月」；右年/月下拉 + 中性「今天」；隐藏原生头
- 私有样式：壳在 `components/calendar/header/component.css`，下拉宽/高度在同目录 `component.css`；§5 **只贴 HTML**
- 禁止外链 CDN 图片；示例可用本地质感图或 data URI

## 4. 视觉规格

- 布局 / 层级 / 强调：左标题；右年/月下拉 +「今天」统一为中性按钮观感（白底描边、高 32px）
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-cal-wrap">
  <div class="wa-cal-toolbar">
    <span class="wa-cal-toolbar__title">{{ selectLabel }}</span>
    <div class="wa-cal-toolbar__actions">
      <div class="wa-cal-selects">
        <a-select
          class="wa-cal-selects__year"
          v-model="selectYear"
          :options="yearOptions"
          size="small"
          :allow-search="false"
          style="width:100px"
        ></a-select>
        <a-select
          class="wa-cal-selects__month"
          v-model="selectMonth"
          :options="monthOptions"
          size="small"
          :allow-search="false"
          style="width:80px"
        ></a-select>
      </div>
      <a-button type="secondary" class="wa-cal-today" @click="goToday">今天</a-button>
    </div>
  </div>
  <a-calendar :key="panelKey" v-model="value" :modes="['month']" />
</div>
```

> 换文案：只改汉字。业务页需提供 `value` / `selectLabel` / `selectYear` / `selectMonth` / `yearOptions` / `monthOptions` / `panelKey` / `goToday`（见预览 `component.js`）。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 年/月下拉可跳转面板；选日与下拉值同步；「今天」无实心选中态

## 7. 预览

`components/calendar/select/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `calendar-default` | `components/calendar/default/` | |
| `calendar-cell` | `components/calendar/cell/` | |
| `calendar-header` | `components/calendar/header/` | |
| `calendar-select` | `components/calendar/select/` | （本条） |
