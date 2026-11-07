# 照片头像组

> 状态：preview · slug：`avatar-group-photo` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「照片头像组」（`avatar-group-photo`）。多人真实照片叠放并截断多余；与文字头像组 `avatar-group-text` 分立。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- 禁止外链 CDN 图片；母版示例图真源 `assets/images/`（`avatar_01.jpg`…）；落地换成业务图 URL

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-avatar-group` + 成员内 `<img>`；溢出气泡须 `:max-popover-trigger-props="{ contentClass: 'wa-avatar-group-popover' }"`
- 禁止外链 CDN 图；示例用 `assets/images/avatar_*.jpg` 或业务同源图
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：36px 叠放；默认可见 **5** 个（`:max-count="5"`）；更多时超出显示 +N；图 `object-fit: cover`
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-avatar-group
  :size="36"
  :max-count="5"
  :max-popover-trigger-props="{ contentClass: 'wa-avatar-group-popover' }"
>
  <a-avatar :size="36"><img alt="" src="assets/images/avatar_01.jpg" /></a-avatar>
  <a-avatar :size="36"><img alt="" src="assets/images/avatar_02.jpg" /></a-avatar>
  <a-avatar :size="36"><img alt="" src="assets/images/avatar_03.jpg" /></a-avatar>
  <a-avatar :size="36"><img alt="" src="assets/images/avatar_04.jpg" /></a-avatar>
  <a-avatar :size="36"><img alt="" src="assets/images/avatar_05.jpg" /></a-avatar>
</a-avatar-group>
```

> 换图：只改 `src`；勿改 class / type。照片真源在 `assets/images/`（`avatar_01.jpg`…）。

## 6. 验收

- [ ] 落地与 §5 同构（允许改图路径）
- [ ] 未混入文字头像组或其它形态
- [ ] 气泡内照片与组内同尺寸铺满

## 7. 预览

`components/avatar/group-photo/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `avatar-default` | `components/avatar/default/` |  |
| `avatar-square` | `components/avatar/square/` |  |
| `avatar-text` | `components/avatar/text/` |  |
| `avatar-trigger` | `components/avatar/trigger/` |  |
| `avatar-group-text` | `components/avatar/group-text/` |  |
| `avatar-group-photo` | `components/avatar/group-photo/` | （本条） |
