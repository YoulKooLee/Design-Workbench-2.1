# 基础条目

> 状态：preview · slug：`item-basic` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「基础条目」（`item-basic`）。描边条目：标题、描述与右侧操作按钮。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5**；换文案只改汉字。
- **B**（无母版）：按 §5 还原。
- **样式落地**：并入宿主 CSS；禁止独立 link `component.css`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：`.wa-item--outline` + `.wa-item__actions` 内 a-button outline
- 与 `list` 分工：Item 是单行原语/小组；a-list 多条目列表用 `list`
- 禁止 CDN 图；封面用本地 SVG data URI
- Vue 自定义标签勿自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：圆角描边卡；左文右操作
- 动效：仅 hover/focus
- 颜色：`--wa-*` / Arco token

## 5. 直接粘贴

```html
<div class="wa-item wa-item--outline">
  <div class="wa-item__body">
    <div class="wa-item__title">基础条目</div>
    <div class="wa-item__desc">带标题与描述的简单条目。</div>
  </div>
  <div class="wa-item__actions">
    <a-button type="secondary" size="small">操作</a-button>
  </div>
</div>
```

## 6. 验收

- [ ] 落地与 §5 同构
- [ ] 未混入其它形态

## 7. 预览

`components/item/basic/index.html`

## 8. 兄弟形态

| slug | 路径 | |
|------|------|--|
| `item-basic` | `components/item/basic/` | （本条） |
| `item-variants` | `components/item/variants/` | |
| `item-alert` | `components/item/alert/` | |
| `item-avatar` | `components/item/avatar/` | |
| `item-team` | `components/item/team/` | |
| `item-playlist` | `components/item/playlist/` | |
| `item-link` | `components/item/link/` | |
