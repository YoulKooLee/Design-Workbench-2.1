# 空团队条目

> 状态：preview · slug：`item-team` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「空团队条目」（`item-team`）。重叠灰阶头像 + 无成员文案 + 邀请。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5**；换文案只改汉字。
- **B**（无母版）：按 §5 还原。
- **样式落地**：并入宿主 CSS；禁止独立 link `component.css`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：`.wa-item-avatars` 叠放；outline 邀请
- 与 `list` 分工：Item 是单行原语/小组；a-list 多条目列表用 `list`
- 禁止 CDN 图；封面用本地 SVG data URI
- Vue 自定义标签勿自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：叠放头像组 + 文案 + 按钮
- 动效：仅 hover/focus
- 颜色：`--wa-*` / Arco token

## 5. 直接粘贴

```html
<div class="wa-item wa-item--outline">
  <div class="wa-item-avatars">
    <a-avatar :size="28" style="background:#bbb;color:#fff;font-size:10px">甲</a-avatar>
    <a-avatar :size="28" style="background:#999;color:#fff;font-size:10px">乙</a-avatar>
    <a-avatar :size="28" style="background:#777;color:#fff;font-size:10px">丙</a-avatar>
  </div>
  <div class="wa-item__body">
    <div class="wa-item__title">暂无团队成员</div>
    <div class="wa-item__desc">邀请成员一起协作本项目。</div>
  </div>
  <div class="wa-item__actions">
    <a-button type="secondary" size="small">邀请</a-button>
  </div>
</div>
```

## 6. 验收

- [ ] 落地与 §5 同构
- [ ] 未混入其它形态

## 7. 预览

`components/item/team/index.html`

## 8. 兄弟形态

| slug | 路径 | |
|------|------|--|
| `item-basic` | `components/item/basic/` | |
| `item-variants` | `components/item/variants/` | |
| `item-alert` | `components/item/alert/` | |
| `item-avatar` | `components/item/avatar/` | |
| `item-team` | `components/item/team/` | （本条） |
| `item-playlist` | `components/item/playlist/` | |
| `item-link` | `components/item/link/` | |
