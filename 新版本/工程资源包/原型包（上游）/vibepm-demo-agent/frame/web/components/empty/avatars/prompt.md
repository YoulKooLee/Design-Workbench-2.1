# 头像组空状态

> 状态：preview · slug：`empty-avatars` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「头像组空状态」（`empty-avatars`）。真实照片叠放头像 + 无搜索结果说明与清除操作。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：家族 `component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- 禁止外链 CDN 图片；母版示例图真源 `assets/images/`（`avatar_01.jpg`…）；落地换成业务图 URL

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-empty + `a-avatar-group`；成员内 `<img>` 真实照片；禁止外链 CDN 图
- 说明内链可换业务 URL；清除搜索为 outline 按钮
- 私有样式真源在家族 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：照片头像组媒体 + 标题说明 + 清除搜索
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-empty">
  <a-empty>
    <template #image>
      <a-avatar-group
        :size="40"
        :max-count="3"
        :max-popover-trigger-props="{ contentClass: 'wa-avatar-group-popover' }"
      >
        <a-avatar :size="40"><img alt="" src="assets/images/avatar_01.jpg" /></a-avatar>
        <a-avatar :size="40"><img alt="" src="assets/images/avatar_02.jpg" /></a-avatar>
        <a-avatar :size="40"><img alt="" src="assets/images/avatar_03.jpg" /></a-avatar>
      </a-avatar-group>
    </template>
    <div class="wa-empty__body">
      <div class="wa-empty__title">未找到设计师</div>
      <p class="wa-empty__desc">没有匹配「林晓」的结果，请重试或<a href="javascript:void(0)">创建资料</a>。</p>
      <a-button class="wa-empty__actions" type="secondary" size="small">清除搜索</a-button>
    </div>
  </a-empty>
</div>
```

> 换文案：只改汉字，勿改 class / type。照片路径随业务资源替换。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/empty/avatars/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `empty-default` | `components/empty/default/` | |
| `empty-message` | `components/empty/message/` | |
| `empty-avatars` | `components/empty/avatars/` | （本条） |
| `empty-icon` | `components/empty/icon/` | |
| `empty-action` | `components/empty/action/` | |
| `empty-outline` | `components/empty/outline/` | |
