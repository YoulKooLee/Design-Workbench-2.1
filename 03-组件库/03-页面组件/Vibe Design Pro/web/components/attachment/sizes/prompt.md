# 附件尺寸

> 状态：preview · slug：`attachment-sizes` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「附件尺寸」（`attachment-sizes`）。default / sm / xs 三档尺寸纵向叠放，适配列表与聊天输入。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/attachment/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：`.wa-attach` + `--sm` / `--xs`；xs 隐藏描述
- 附件为展示态（非 a-upload）；选文件走 `upload` 家族
- 禁止外链 CDN 图；图预览用本地 SVG data URI 或交付内资源
- 私有样式真源在 `components/attachment/component.css`；§5 **只贴 HTML**
- Vue 模板内自定义标签勿写成自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：单列叠放铺满容器；三档高度、圆角与媒体尺寸递减；xs 无描述
- 动效：上传中标题 shimmer；图块悬停显示关闭；其余仅 hover/focus
- 颜色：只用 `--wa-*` / Arco token

## 5. 直接粘贴

```html
<div class="wa-attach-stack">
  <div class="wa-attach">
    <div class="wa-attach__media"><icon-file :size="16"></icon-file></div>
    <div class="wa-attach__body">
      <div class="wa-attach__title">默认附件</div>
      <div class="wa-attach__desc">PDF · 2.4 MB</div>
    </div>

  </div>
  <div class="wa-attach wa-attach--sm">
    <div class="wa-attach__media"><icon-file :size="16"></icon-file></div>
    <div class="wa-attach__body">
      <div class="wa-attach__title">小号附件</div>
      <div class="wa-attach__desc">PDF · 2.4 MB</div>
    </div>

  </div>
  <div class="wa-attach wa-attach--xs">
    <div class="wa-attach__media"><icon-file :size="16"></icon-file></div>
    <div class="wa-attach__body">
      <div class="wa-attach__title">超小附件</div>
      <div class="wa-attach__desc">PDF · 2.4 MB</div>
    </div>

  </div>
</div>
```

> 换文案：只改汉字与文件名；勿改 class。有私有样式时并入宿主 CSS。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/attachment/sizes/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `attachment-gallery` | `components/attachment/gallery/` | |
| `attachment-uploading` | `components/attachment/uploading/` | |
| `attachment-states` | `components/attachment/states/` | |
| `attachment-sizes` | `components/attachment/sizes/` | （本条） |
| `attachment-group` | `components/attachment/group/` | |
