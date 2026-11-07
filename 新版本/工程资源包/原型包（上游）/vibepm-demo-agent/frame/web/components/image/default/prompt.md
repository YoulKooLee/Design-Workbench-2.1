# 图片

> 状态：preview · slug：`image-default` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「图片」（`image-default`）。固定比例展示图片，铺满容器，不可点击预览。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/image/component.css` 中与 `.wa-image-fit` 相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-image；必须 `:preview="false"`（Arco 默认开启预览）
- 若有私有样式：规则真源在家族 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 禁止外链 CDN 图片；母版示例图真源 `assets/images/`；落地换成业务图 URL

## 4. 视觉规格

- 布局 / 层级 / 强调：外层 `.wa-image-fit` 宽 100%、`aspect-ratio: 3/2`；图 `fit="cover"` 铺满
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-image-fit">
  <a-image
    width="100%"
    height="100%"
    fit="cover"
    :preview="false"
    src="assets/images/image_01.jpg"
    alt="示例图"
  />
</div>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 点击图片不会打开预览层

## 7. 预览

`components/image/default/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `image-default` | `components/image/default/` | （本条） |
| `image-preview` | `components/image/preview/` | |
| `image-group` | `components/image/group/` | |
| `image-error` | `components/image/error/` | |
