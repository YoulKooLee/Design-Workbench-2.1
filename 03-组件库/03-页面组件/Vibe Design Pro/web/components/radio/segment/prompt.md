# 分段选择

> 状态：preview · slug：`radio-segment` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「分段选择」（`radio-segment`）。一组相连选项里只能选中一段。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：分段按钮互斥选中
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：整段轨道（圆角跟 `--wa-input-radius`），选中段为主色底
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-segment">
  <button
    v-for="opt in options"
    :key="'sg-' + opt.value"
    type="button"
    class="wa-segment-item"
    :class="{ 'is-active': value === opt.value }"
    @click="value = opt.value"
  >{{ opt.label }}</button>
</div>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/radio/segment/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------| `radio-default` | `components/radio/default/` |  |
| `radio-button` | `components/radio/button/` |  |
| `radio-border` | `components/radio/border/` |  |
| `radio-pill` | `components/radio/pill/` |  |
| `radio-disabled` | `components/radio/disabled/` |  |
| `radio-segment` | `components/radio/segment/` | （本条） |
