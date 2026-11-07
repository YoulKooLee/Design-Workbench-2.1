# 样式变体

> 状态：preview · slug：`item-variants` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「样式变体」（`item-variants`）。默认 / 描边 / 弱化三态，带图标媒体槽。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5**；换文案只改汉字。
- **B**（无母版）：按 §5 还原。
- **样式落地**：并入宿主 CSS；禁止独立 link `component.css`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：三张 `.wa-item`：默认透明、outline 描边、muted 浅底
- 与 `list` 分工：Item 是单行原语/小组；a-list 多条目列表用 `list`
- 禁止 CDN 图；封面用本地 SVG data URI
- Vue 自定义标签勿自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：左圆角图标槽 + 标题描述
- 动效：仅 hover/focus
- 颜色：`--wa-*` / Arco token

## 5. 直接粘贴

```html
<div class="wa-item-stack">
  <div class="wa-item">
    <div class="wa-item__media"><icon-email :size="15"></icon-email></div>
    <div class="wa-item__body">
      <div class="wa-item__title">默认变体</div>
      <div class="wa-item__desc">透明背景，无描边。</div>
    </div>
  </div>
  <div class="wa-item wa-item--outline">
    <div class="wa-item__media"><icon-email :size="15"></icon-email></div>
    <div class="wa-item__body">
      <div class="wa-item__title">描边变体</div>
      <div class="wa-item__desc">可见边框的描边样式。</div>
    </div>
  </div>
  <div class="wa-item wa-item--muted">
    <div class="wa-item__media"><icon-email :size="15"></icon-email></div>
    <div class="wa-item__body">
      <div class="wa-item__title">弱化变体</div>
      <div class="wa-item__desc">浅底背景，适合次要内容。</div>
    </div>
  </div>
</div>
```

## 6. 验收

- [ ] 落地与 §5 同构
- [ ] 未混入其它形态

## 7. 预览

`components/item/variants/index.html`

## 8. 兄弟形态

| slug | 路径 | |
|------|------|--|
| `item-basic` | `components/item/basic/` | |
| `item-variants` | `components/item/variants/` | （本条） |
| `item-alert` | `components/item/alert/` | |
| `item-avatar` | `components/item/avatar/` | |
| `item-team` | `components/item/team/` | |
| `item-playlist` | `components/item/playlist/` | |
| `item-link` | `components/item/link/` | |
