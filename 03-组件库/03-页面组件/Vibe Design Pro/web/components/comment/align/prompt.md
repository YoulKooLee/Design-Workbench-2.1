# 右对齐评论

> 状态：preview · slug：`comment-align` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「右对齐评论」（`comment-align`）。时间与操作靠右，适合客服回复或作者侧展示。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/comment/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-comment`；`align="right"`（或 `:align="{ datetime: 'right', actions: 'right' }"`）；头像用 `#avatar` + `<img>`（同 `avatar-group-photo`）
- 私有样式真源在 `components/comment/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- 禁止外链 CDN 图片；母版示例图真源 `assets/images/`（`avatar_01.jpg`…）；落地换成业务图 URL

## 4. 视觉规格

- 布局 / 层级 / 强调：正文仍左起；`datetime` 与 `actions` 右对齐
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-comment class="wa-comment" align="right" author="李明" datetime="刚刚">
  <template #avatar>
    <a-avatar class="wa-comment-avatar" :size="36"><img alt="" src="assets/images/avatar_01.jpg" /></a-avatar>
  </template>
  <template #content>
    <p class="wa-comment__body">时间与操作靠右，适合客服回复或作者侧气泡。</p>
  </template>
  <template #actions>
    <span class="wa-comment-action"><icon-star></icon-star><span>8</span></span>
    <span class="wa-comment-action"><icon-message></icon-message><span>回复</span></span>
  </template>
</a-comment>
<a-comment class="wa-comment" align="right" author="王芳" datetime="3 分钟前">
  <template #avatar>
    <a-avatar class="wa-comment-avatar" :size="36"><img alt="" src="assets/images/avatar_02.jpg" /></a-avatar>
  </template>
  <template #content>
    <p class="wa-comment__body">已按你的口径改完，请再看一眼。</p>
  </template>
  <template #actions>
    <span class="wa-comment-action"><icon-star></icon-star><span>5</span></span>
    <span class="wa-comment-action"><icon-message></icon-message><span>回复</span></span>
  </template>
</a-comment>
<a-comment class="wa-comment" align="right" author="陈浩" datetime="15 分钟前">
  <template #avatar>
    <a-avatar class="wa-comment-avatar" :size="36"><img alt="" src="assets/images/avatar_03.jpg" /></a-avatar>
  </template>
  <template #content>
    <p class="wa-comment__body">附件已更新到最新版本。</p>
  </template>
  <template #actions>
    <span class="wa-comment-action"><icon-star></icon-star><span>2</span></span>
    <span class="wa-comment-action"><icon-message></icon-message><span>回复</span></span>
  </template>
</a-comment>
```

> 换文案与头像：只改汉字与 `img src`；勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] `align="right"` 生效（时间与操作靠右）

## 7. 预览

`components/comment/align/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `comment-default` | `components/comment/default/` | |
| `comment-nest` | `components/comment/nest/` | |
| `comment-align` | `components/comment/align/` | （本条） |
