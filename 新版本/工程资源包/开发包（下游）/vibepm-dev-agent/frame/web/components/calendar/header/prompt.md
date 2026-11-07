# 自定义头部

> 状态：preview · slug：`calendar-header` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「自定义头部」（`calendar-header`）。外置标题 + 分段翻月/年 +「今天」，替代默认日历头。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将同目录 `component.css` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：`value`、`headerLabel`、`panelKey`、`selectDate` 并入宿主页 JS；用 `:key="panelKey"` 在换月时重挂面板；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-calendar`；翻月/年用 `.wa-cal-nav` 分段；「今天」用中性 `a-button.wa-cal-today`；隐藏 `.arco-calendar-header`
- 私有样式真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- 禁止外链 CDN 图片；示例可用本地质感图或 data URI

## 4. 视觉规格

- 布局 / 层级 / 强调：左标题；右分段导航 +「今天」统一中性按钮（白底描边、高 32px）
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-cal-wrap">
  <div class="wa-cal-toolbar">
    <span class="wa-cal-toolbar__title">{{ headerLabel }}</span>
    <div class="wa-cal-toolbar__actions">
      <div class="wa-cal-nav">
        <button type="button" class="wa-cal-nav__item" @click="selectDate('prev-year')">上一年</button>
        <button type="button" class="wa-cal-nav__item" @click="selectDate('prev-month')">上一月</button>
        <button type="button" class="wa-cal-nav__item" @click="selectDate('next-month')">下一月</button>
        <button type="button" class="wa-cal-nav__item" @click="selectDate('next-year')">下一年</button>
      </div>
      <a-button type="secondary" class="wa-cal-today" @click="selectDate('today')">今天</a-button>
    </div>
  </div>
  <a-calendar :key="panelKey" v-model="value" :modes="['month']" />
</div>
```

> 换文案：只改汉字。业务页需提供 `value`、`headerLabel`、`panelKey`、`selectDate`（见预览 `component.js`）。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 分段翻月/年与「今天」可用；「今天」无实心选中态；无双头部

## 7. 预览

`components/calendar/header/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `calendar-default` | `components/calendar/default/` | |
| `calendar-cell` | `components/calendar/cell/` | |
| `calendar-header` | `components/calendar/header/` | （本条） |
| `calendar-select` | `components/calendar/select/` | |
