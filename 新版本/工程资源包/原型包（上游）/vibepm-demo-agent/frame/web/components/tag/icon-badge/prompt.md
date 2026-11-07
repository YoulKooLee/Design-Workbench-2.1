# 图标徽标

> 状态：preview · slug：`tag-icon-badge` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「图标徽标」（`tag-icon-badge`）。28×28 圆角方徽：主色实底、主色浅底、灰色描边，用于特性点缀与列表前缀（非状态文字标签）。

成功标准：业务页出现与 §5 一致的结构与皮肤（FA 图标，非 emoji）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换图标只改 `icon-*`。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止外网 CDN 图标。
- **样式落地**：`.wa-icon-badge*` 已写入全局 `assets/common/css/components.css`；交付站须挂同文件。

## 3. 约束

- **本提示词只含这一种形态**（纯图标方徽；带文字胶囊见 `tag-icon-text`）
- 交互：装饰性 `<span class="wa-icon-badge">` + 母版 `icon-*`；非 `a-tag`
- 有意义时补 `aria-label`；纯装饰用 `aria-hidden="true"`

## 4. 视觉规格

- 布局 / 层级 / 强调：28×28、圆角 8px；solid / soft / outline 三态
- 动效：无
- 颜色：只用 `--wa-color-primary` / border·text token；图标 13px

## 5. 直接粘贴

```html
<div class="wa-icon-badge-row" aria-label="图标徽标示例">
  <span class="wa-icon-badge wa-icon-badge--solid" aria-hidden="true"><icon-lock /></span>
  <span class="wa-icon-badge wa-icon-badge--solid" aria-hidden="true"><icon-safe /></span>
  <span class="wa-icon-badge wa-icon-badge--soft" aria-hidden="true"><icon-logo /></span>
  <span class="wa-icon-badge wa-icon-badge--soft" aria-hidden="true"><icon-star-fill /></span>
  <span class="wa-icon-badge wa-icon-badge--outline" aria-hidden="true"><icon-notification /></span>
  <span class="wa-icon-badge wa-icon-badge--outline" aria-hidden="true"><icon-clock-circle /></span>
</div>
```

> 换图标：只改 `icon-*`。宿主须已挂 `components.css` 与 FA。

## 6. 验收

- [ ] 落地与 §5 同构（允许换图标）
- [ ] 三态可区分；无 CDN / emoji
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/tag/icon-badge/index.html`

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
| `tag-icon-text` | `components/tag/icon-text/` | |
| `tag-icon-badge` | `components/tag/icon-badge/` | （本条） |
