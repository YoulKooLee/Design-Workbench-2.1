# 文字头像组

> 状态：preview · slug：`avatar-group-text` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「文字头像组」（`avatar-group-text`）。多人姓氏文字叠放并截断多余；真实照片叠放用 `avatar-group-photo`。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-avatar-group`；成员须 `:auto-fix-font-size="false"`；溢出气泡须 `:max-popover-trigger-props="{ contentClass: 'wa-avatar-group-popover' }"`（气泡 teleport 到 body，否则字号会按尺寸自动放大）
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：叠放头像组，超出显示 +N；组内 / +N / 气泡内文字统一 **14px**
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-avatar-group
  :size="36"
  :max-count="3"
  :max-popover-trigger-props="{ contentClass: 'wa-avatar-group-popover' }"
>
  <a-avatar
    :auto-fix-font-size="false"
    :style="{ backgroundColor: 'rgb(var(--primary-6))' }"
  >张</a-avatar>
  <a-avatar
    :auto-fix-font-size="false"
    :style="{ backgroundColor: 'rgb(var(--cyan-6))' }"
  >李</a-avatar>
  <a-avatar
    :auto-fix-font-size="false"
    :style="{ backgroundColor: 'rgb(var(--warning-6))' }"
  >王</a-avatar>
  <a-avatar
    :auto-fix-font-size="false"
    :style="{ backgroundColor: 'rgb(var(--danger-6))' }"
  >赵</a-avatar>
</a-avatar-group>
```

> 换文案：只改汉字，勿改 class / type。气泡字号规则随 `component.css` 并入宿主。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/avatar/group-text/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `avatar-default` | `components/avatar/default/` | |
| `avatar-square` | `components/avatar/square/` | |
| `avatar-text` | `components/avatar/text/` | |
| `avatar-trigger` | `components/avatar/trigger/` | |
| `avatar-group-text` | `components/avatar/group-text/` | （本条） |
| `avatar-group-photo` | `components/avatar/group-photo/` |  |
