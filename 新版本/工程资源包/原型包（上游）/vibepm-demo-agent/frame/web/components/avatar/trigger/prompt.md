# 可编辑头像

> 状态：preview · slug：`avatar-trigger` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「可编辑头像」（`avatar-trigger`）。圆形头像框 + 角标相机，点击选图更换头像。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：圆框展示当前图或占位 `a-avatar`；点击触发 hidden `input[type=file]`；选图后更新预览（本条**不含**裁剪弹窗）。需要圆形裁剪 → 组合 `modal-content-avatar-crop`
- 校验：仅图片；单文件 ≤ 2MB（可按业务调整）
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：40px 圆框（底色同 Arco 默认 `--color-fill-4`）；右下角约 22px 白底相机角标，图标 **12px**；悬停角标主色填充（无缩放）
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div
  class="wa-avatar-trigger"
  title="更换头像"
  role="button"
  tabindex="0"
  @click="onAvatarClick"
  @keydown.enter.prevent="onAvatarClick"
>
  <input
    ref="avatarInput"
    class="wa-avatar-trigger__input"
    type="file"
    accept="image/png,image/jpeg,image/webp,image/gif"
    @change="onAvatarChange"
    @click.stop
  />
  <div class="wa-avatar-trigger__shell" :class="{ 'has-image': !!avatarUrl }">
    <img v-if="avatarUrl" class="wa-avatar-trigger__img" :src="avatarUrl" alt="avatar" />
    <span v-else class="wa-avatar-trigger__placeholder" aria-hidden="true"><icon-avatar /></span>
  </div>
  <span class="wa-avatar-trigger__camera" aria-hidden="true"><icon-camera /></span>
</div>
```

> 换文案：只改汉字，勿改 class / type。选图后要裁剪 → 粘贴 `modal-content-avatar-crop`，在 `onAvatarChange` 里打开裁剪弹窗而非直接赋 `avatarUrl`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 未把裁剪弹窗写进本条

## 7. 预览

`components/avatar/trigger/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `avatar-default` | `components/avatar/default/` |  |
| `avatar-square` | `components/avatar/square/` |  |
| `avatar-text` | `components/avatar/text/` |  |
| `avatar-trigger` | `components/avatar/trigger/` | （本条） |
| `avatar-group-text` | `components/avatar/group-text/` |  |
| `avatar-group-photo` | `components/avatar/group-photo/` |  |
