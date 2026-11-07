# 媒体列表

> 状态：preview · slug：`item-playlist` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「媒体列表」（`item-playlist`）。独立描边行：封面 + 标题/副标签 + 专辑 + 时长，整行可点。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5**；换文案只改汉字。
- **B**（无母版）：按 §5 还原。
- **样式落地**：并入宿主 CSS；禁止独立 link `component.css`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：`.wa-item-group` 内多张 `.wa-item--outline.wa-item--link`；本地 SVG 封面
- 与 `list` 分工：Item 是单行原语/小组；a-list 多条目列表用 `list`
- 禁止 CDN 图；封面用本地 SVG data URI
- Vue 自定义标签勿自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：分行描边；标题旁副标签同行；下方专辑名；右侧时长
- 动效：仅 hover/focus
- 颜色：`--wa-*` / Arco token

## 5. 直接粘贴

```html
<div class="wa-item-group">
  <a class="wa-item wa-item--outline wa-item--link" href="javascript:void(0)">
    <div class="wa-item__media wa-item__media--image"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%231a1a2e'/%3E%3Cstop offset='1' stop-color='%234a3f6b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='160' height='160' fill='url(%23g)'/%3E%3Ccircle cx='120' cy='40' r='30' fill='%23e8c547' opacity='.35'/%3E%3C/svg%3E" alt="" /></div>
    <div class="wa-item__body">
      <div class="wa-item__title-row">
        <div class="wa-item__title">午夜城灯</div>
        <span class="wa-item__subtitle">电光之夜</span>
      </div>
      <div class="wa-item__desc">霓虹梦境</div>
    </div>
    <span class="wa-item__meta">3:45</span>
  </a>
  <a class="wa-item wa-item--outline wa-item--link" href="javascript:void(0)">
    <div class="wa-item__media wa-item__media--image"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='1' x2='1' y2='0'%3E%3Cstop stop-color='%233d2914'/%3E%3Cstop offset='1' stop-color='%23c4a574'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='160' height='160' fill='url(%23g)'/%3E%3C/svg%3E" alt="" /></div>
    <div class="wa-item__body">
      <div class="wa-item__title-row">
        <div class="wa-item__title">咖啡馆闲谈</div>
        <span class="wa-item__subtitle">都市故事</span>
      </div>
      <div class="wa-item__desc">晨间冲泡</div>
    </div>
    <span class="wa-item__meta">4:05</span>
  </a>
  <a class="wa-item wa-item--outline wa-item--link" href="javascript:void(0)">
    <div class="wa-item__media wa-item__media--image"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop stop-color='%230a1628'/%3E%3Cstop offset='1' stop-color='%231e4d6b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='160' height='160' fill='url(%23g)'/%3E%3Ccircle cx='40' cy='120' r='40' fill='%2346e0c0' opacity='.25'/%3E%3C/svg%3E" alt="" /></div>
    <div class="wa-item__body">
      <div class="wa-item__title-row">
        <div class="wa-item__title">数字雨</div>
        <span class="wa-item__subtitle">二进制节拍</span>
      </div>
      <div class="wa-item__desc">赛博交响</div>
    </div>
    <span class="wa-item__meta">3:30</span>
  </a>
</div>
```

## 6. 验收

- [ ] 落地与 §5 同构
- [ ] 未混入其它形态

## 7. 预览

`components/item/playlist/index.html`

## 8. 兄弟形态

| slug | 路径 | |
|------|------|--|
| `item-basic` | `components/item/basic/` | |
| `item-variants` | `components/item/variants/` | |
| `item-alert` | `components/item/alert/` | |
| `item-avatar` | `components/item/avatar/` | |
| `item-team` | `components/item/team/` | |
| `item-playlist` | `components/item/playlist/` | （本条） |
| `item-link` | `components/item/link/` | |
