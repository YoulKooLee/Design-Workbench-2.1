# 标记选择

> 状态：preview · slug：`color-picker-marker` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「标记选择」（`color-picker-marker`）。在一排色点里点选标记色。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：色点互斥选中，选中显示勾
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：圆形色点，选中带勾
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-markers">
  <button
    v-for="color in options"
    :key="'mk-' + color"
    type="button"
    class="wa-marker"
    :class="{ 'is-active': value === color }"
    :style="{ backgroundColor: color }"
    :aria-label="color"
    @click="value = color"
  >
    <icon-check v-if="value === color" :size="12" />
  </button>
</div>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/color-picker/marker/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------| `color-picker-default` | `components/color-picker/default/` |  |
| `color-picker-show-text` | `components/color-picker/show-text/` |  |
| `color-picker-preset` | `components/color-picker/preset/` |  |
| `color-picker-history` | `components/color-picker/history/` |  |
| `color-picker-disabled` | `components/color-picker/disabled/` |  |
| `color-picker-marker` | `components/color-picker/marker/` | （本条） |
