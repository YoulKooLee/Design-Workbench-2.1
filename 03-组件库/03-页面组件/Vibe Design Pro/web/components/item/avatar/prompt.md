# 头像条目

> 状态：preview · slug：`item-avatar` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「头像条目」（`item-avatar`）。多名成员头像列表：姓名、邮箱与添加操作。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5**；换文案只改汉字。
- **B**（无母版）：按 §5 还原。
- **样式落地**：并入宿主 CSS；禁止独立 link `component.css`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：`.wa-item-group` 内多张描边行；a-avatar + text +
- 与 `list` 分工：Item 是单行原语/小组；a-list 多条目列表用 `list`
- 禁止 CDN 图；封面用本地 SVG data URI
- Vue 自定义标签勿自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：分行描边；头像 + 姓名/邮箱 + 右侧 +
- 动效：仅 hover/focus
- 颜色：`--wa-*` / Arco token

## 5. 直接粘贴

```html
<div class="wa-item-group">
  <div class="wa-item wa-item--outline">
    <a-avatar :size="36" style="background: #4b5563; color:#fff; font-size:12px">闪</a-avatar>
    <div class="wa-item__body">
      <div class="wa-item__title">闪灯</div>
      <div class="wa-item__desc">shandeng@acme.com</div>
    </div>
    <div class="wa-item__actions">
      <a-button type="text" size="mini" aria-label="添加">
        <icon-plus :size="14"></icon-plus>
      </a-button>
    </div>
  </div>
  <div class="wa-item wa-item--outline">
    <a-avatar :size="36" style="background: #6b7280; color:#fff; font-size:12px">启</a-avatar>
    <div class="wa-item__body">
      <div class="wa-item__title">启明</div>
      <div class="wa-item__desc">qiming@acme.com</div>
    </div>
    <div class="wa-item__actions">
      <a-button type="text" size="mini" aria-label="添加">
        <icon-plus :size="14"></icon-plus>
      </a-button>
    </div>
  </div>
  <div class="wa-item wa-item--outline">
    <a-avatar :size="36" style="background: #111827; color:#fff; font-size:12px">恶</a-avatar>
    <div class="wa-item__body">
      <div class="wa-item__title">恶兔</div>
      <div class="wa-item__desc">etu@acme.com</div>
    </div>
    <div class="wa-item__actions">
      <a-button type="text" size="mini" aria-label="添加">
        <icon-plus :size="14"></icon-plus>
      </a-button>
    </div>
  </div>
</div>
```

## 6. 验收

- [ ] 落地与 §5 同构
- [ ] 未混入其它形态

## 7. 预览

`components/item/avatar/index.html`

## 8. 兄弟形态

| slug | 路径 | |
|------|------|--|
| `item-basic` | `components/item/basic/` | |
| `item-variants` | `components/item/variants/` | |
| `item-alert` | `components/item/alert/` | |
| `item-avatar` | `components/item/avatar/` | （本条） |
| `item-team` | `components/item/team/` | |
| `item-playlist` | `components/item/playlist/` | |
| `item-link` | `components/item/link/` | |
