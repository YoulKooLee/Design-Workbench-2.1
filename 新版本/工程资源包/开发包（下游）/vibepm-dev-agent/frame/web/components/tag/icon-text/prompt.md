# 图标文字标签

> 状态：preview · slug：`tag-icon-text` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「图标文字标签」（`tag-icon-text`）。胶囊 + 前置图标：主色实底、主色浅底、灰色描边。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：`.wa-tag--pill` / `--solid` / `--soft` / `--muted` 已写入全局 `assets/common/css/components.css`；`.wa-tag-row` 并入宿主 CSS。

## 3. 约束

- **本提示词只含这一种形态**（三态并排；纯图标方徽见 `tag-icon-badge`；单色图标标签见 `tag-icon`）
- 交互：真 a-tag + `#icon` 槽 + `wa-tag--*`；图标用母版 `icon-*`（FA）；勿加预设 `color`
- §5 **只贴 HTML**

## 4. 视觉规格

- 布局 / 层级 / 强调：左图标 + 文案，30px 胶囊；实底白字 / 浅底主色描边 / 灰描边
- 动效：无
- 颜色：只用 `--wa-*` / Arco token；图标跟随文字色（勿依赖 Arco 默认 text-2）

## 5. 直接粘贴

```html
<div class="wa-tag-row">
  <a-tag bordered class="wa-tag--pill wa-tag--solid">
    <template #icon><icon-safe /></template>主色实底标签
  </a-tag>
  <a-tag bordered class="wa-tag--pill wa-tag--soft">
    <template #icon><icon-logo /></template>图标文字标签
  </a-tag>
  <a-tag bordered class="wa-tag--pill wa-tag--muted">
    <template #icon><icon-notification /></template>灰色描边标签
  </a-tag>
</div>
```

> 换文案：只改汉字；换图标只改 `icon-*`。宿主须已挂 `components.css` 与 FA。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 图标与文字同色系；未混入预设 `color`
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/tag/icon-text/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `tag-color` | `components/tag/color/` | |
| `tag-bordered` | `components/tag/bordered/` | |
| `tag-default` | `components/tag/default/` | |
| `tag-closable` | `components/tag/closable/` | |
| `tag-small` | `components/tag/small/` | |
| `tag-checkable` | `components/tag/checkable/` | |
| `tag-icon` | `components/tag/icon/` | |
| `tag-loading` | `components/tag/loading/` | |
| `tag-soft` | `components/tag/soft/` | |
| `tag-option` | `components/tag/option/` | |
| `tag-icon-text` | `components/tag/icon-text/` | （本条） |
| `tag-icon-badge` | `components/tag/icon-badge/` | |
