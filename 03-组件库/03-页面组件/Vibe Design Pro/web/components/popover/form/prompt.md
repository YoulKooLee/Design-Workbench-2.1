# 尺寸表单气泡

> 状态：preview · slug：`popover-form` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「尺寸表单气泡」（`popover-form`）。在触发器旁展开带标签的尺寸输入表单。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将母版 `components.css` 中 Popover / `.wa-popover-*` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-popover；`trigger="click"`；正文为双列尺寸表单
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：中性触发；标题「尺寸」；说明弱化；2×2 输入网格
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-popover title="尺寸" trigger="click" content-class="wa-popover-panel">
  <a-button type="secondary">打开气泡</a-button>
  <template #content>
    <p class="wa-popover-desc">设置元素的宽高约束。</p>
    <div class="wa-popover-form">
      <label class="wa-popover-form__field">
        <span class="wa-popover-form__label">宽度</span>
        <a-input default-value="100%" size="small" allow-clear></a-input>
      </label>
      <label class="wa-popover-form__field">
        <span class="wa-popover-form__label">最大宽度</span>
        <a-input default-value="300px" size="small" allow-clear></a-input>
      </label>
      <label class="wa-popover-form__field">
        <span class="wa-popover-form__label">高度</span>
        <a-input default-value="25px" size="small" allow-clear></a-input>
      </label>
      <label class="wa-popover-form__field">
        <span class="wa-popover-form__label">最大高度</span>
        <a-input default-value="none" size="small" allow-clear></a-input>
      </label>
    </div>
  </template>
</a-popover>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 点击打开，可在面板内编辑输入

## 7. 预览

`components/popover/form/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `popover-default` | `components/popover/default/` | |
| `popover-bottom` | `components/popover/bottom/` | |
| `popover-left` | `components/popover/left/` | |
| `popover-right` | `components/popover/right/` | |
| `popover-form` | `components/popover/form/` | （本条）|
| `popover-notifications` | `components/popover/notifications/` | |
| `popover-tips` | `components/popover/tips/` | |
| `popover-share` | `components/popover/share/` | |
| `popover-feedback` | `components/popover/feedback/` | |
| `popover-profile` | `components/popover/profile/` | |
