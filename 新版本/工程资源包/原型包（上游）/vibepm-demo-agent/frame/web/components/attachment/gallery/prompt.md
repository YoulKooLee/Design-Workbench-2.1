# 图片附件组

> 状态：preview · slug：`attachment-gallery` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「图片附件组」（`attachment-gallery`）。小号方图卡带描边，适合相册与截图引用。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/attachment/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：`.wa-attach-gallery` + `.wa-attach-tile`；悬停显示移除；本地 SVG 占位图（禁 CDN）
- 附件为展示态（非 a-upload）；选文件走 `upload` 家族
- 禁止外链 CDN 图；图预览用本地 SVG data URI 或交付内资源
- 私有样式真源在 `components/attachment/component.css`；§5 **只贴 HTML**
- Vue 模板内自定义标签勿写成自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：96 方图卡（内边距+描边）+ 文件名/体积；右上角圆形关闭
- 动效：上传中标题 shimmer；图块悬停显示关闭；其余仅 hover/focus
- 颜色：只用 `--wa-*` / Arco token

## 5. 直接粘贴

```html
<div class="wa-attach-gallery">
  <div class="wa-attach-tile">
    <div class="wa-attach-tile__media">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23d6cfc4'/%3E%3Cstop offset='1' stop-color='%239aab9c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='240' height='240' fill='url(%23g)'/%3E%3Crect x='28' y='48' width='120' height='80' rx='4' fill='%23f5f1ea' opacity='.55'/%3E%3Crect x='100' y='110' width='90' height='70' rx='4' fill='%23c9b8a0' opacity='.45'/%3E%3C/svg%3E" alt="工作区" />
      <button type="button" class="wa-attach-tile__x" aria-label="移除"><icon-close :size="11"></icon-close></button>
    </div>
    <div class="wa-attach-tile__name">工作区.png</div>
    <div class="wa-attach-tile__meta">PNG · 820 KB</div>
  </div>
  <div class="wa-attach-tile">
    <div class="wa-attach-tile__media">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop stop-color='%23e8e2d8'/%3E%3Cstop offset='1' stop-color='%23b7a994'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='240' height='240' fill='url(%23g)'/%3E%3Crect x='40' y='70' width='160' height='10' rx='2' fill='%23fff' opacity='.5'/%3E%3Crect x='40' y='95' width='120' height='8' rx='2' fill='%23fff' opacity='.35'/%3E%3Crect x='40' y='130' width='160' height='60' rx='6' fill='%23a89880' opacity='.35'/%3E%3C/svg%3E" alt="桌面参考" />
      <button type="button" class="wa-attach-tile__x" aria-label="移除"><icon-close :size="11"></icon-close></button>
    </div>
    <div class="wa-attach-tile__name">桌面参考.jpg</div>
    <div class="wa-attach-tile__meta">JPG · 1.1 MB</div>
  </div>
  <div class="wa-attach-tile">
    <div class="wa-attach-tile__media">
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='1' x2='1' y2='0'%3E%3Cstop stop-color='%23cfd5d0'/%3E%3Cstop offset='1' stop-color='%238f9e96'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='240' height='240' fill='url(%23g)'/%3E%3Ccircle cx='180' cy='50' r='28' fill='%23fff' opacity='.25'/%3E%3Crect x='30' y='100' width='100' height='90' rx='4' fill='%23eef1ef' opacity='.4'/%3E%3C/svg%3E" alt="办公参考" />
      <button type="button" class="wa-attach-tile__x" aria-label="移除"><icon-close :size="11"></icon-close></button>
    </div>
    <div class="wa-attach-tile__name">办公参考.jpg</div>
    <div class="wa-attach-tile__meta">JPG · 940 KB</div>
  </div>
</div>
```

> 换文案：只改汉字与文件名；勿改 class。有私有样式时并入宿主 CSS。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/attachment/gallery/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `attachment-gallery` | `components/attachment/gallery/` | （本条） |
| `attachment-uploading` | `components/attachment/uploading/` | |
| `attachment-states` | `components/attachment/states/` | |
| `attachment-sizes` | `components/attachment/sizes/` | |
| `attachment-group` | `components/attachment/group/` | |
