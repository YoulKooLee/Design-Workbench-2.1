# 多列画廊

> 状态：preview · slug：`gallery-multiple` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「多列画廊」（`gallery-multiple`）。一屏展示多张图片，左右切换整组。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/gallery/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把本形态交互状态与前后切换逻辑**并入**宿主页 `js/<page>.js`；**禁止**镜像母版 `component.js` 再强制 `<script src>`。
## 3. 约束

- **本提示词只含这一种形态**
- 交互：自定义多列轨道 + a-button outline circle 前后按钮（同 gallery-arrows）；一屏约 3 张；图片来自本地 assets/images
- 若有私有样式：规则真源在家族 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 禁止外链 CDN 图片；母版示例图真源 `assets/images/`；落地换成业务图 URL
- 图标用母版 `icon-left` / `icon-right`（Font Awesome 映射），禁止 emoji / 外网图标 CDN

## 4. 视觉规格

- 布局 / 层级 / 强调：一屏约三列等宽图；间距 8px；两侧圆形 outline 按钮（与 gallery-arrows 同款）；禁用态在首末
- 动效：仅本控件轻交互（切换 / hover）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-gallery-wrap wa-gallery-wrap--multiple">
  <a-button type="secondary" shape="circle" size="small" aria-label="上一组" :disabled="multiIndex <= 0" @click="multiPrev">
    <icon-left></icon-left>
  </a-button>
  <div class="wa-gallery-viewport">
    <div class="wa-gallery-track" :style="multiTrackStyle">
    <div class="wa-gallery-cell">
      <img src="assets/images/image_01.jpg" alt="产品图一" />
    </div>
    <div class="wa-gallery-cell">
      <img src="assets/images/image_02.jpg" alt="产品图二" />
    </div>
    <div class="wa-gallery-cell">
      <img src="assets/images/image_03.jpg" alt="产品图三" />
    </div>
    <div class="wa-gallery-cell">
      <img src="assets/images/image_04.jpg" alt="产品图四" />
    </div>
    <div class="wa-gallery-cell">
      <img src="assets/images/image_05.jpg" alt="产品图五" />
    </div>
    </div>
  </div>
  <a-button type="secondary" shape="circle" size="small" aria-label="下一组" :disabled="multiIndex >= multiMax" @click="multiNext">
    <icon-right></icon-right>
  </a-button>
</div>
```

> 换文案：只改汉字与图片路径，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案与业务图）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/gallery/multiple/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `gallery-default` | `components/gallery/default/` |  |
| `gallery-dots` | `components/gallery/dots/` |  |
| `gallery-thumbnails` | `components/gallery/thumbnails/` |  |
| `gallery-counter` | `components/gallery/counter/` |  |
| `gallery-thumbnails-side` | `components/gallery/thumbnails-side/` |  |
| `gallery-progress` | `components/gallery/progress/` |  |
| `gallery-multiple` | `components/gallery/multiple/` | （本条） |
| `gallery-arrows` | `components/gallery/arrows/` |  |
| `gallery-arrows-bottom` | `components/gallery/arrows-bottom/` |  |
| `gallery-arrows-dots` | `components/gallery/arrows-dots/` |  |
