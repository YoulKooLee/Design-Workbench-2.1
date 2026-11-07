# 居中高亮词

> 状态：preview · slug：`hero-centered-highlight` · 类型：block · 母版：web · surface：marketing · category：hero

## 1. 角色与目标

实现「居中高亮词」（`hero-centered-highlight`），用于落地首页首屏。

描述（同步源站并直译）：居中首屏，带版本公告胶囊，标题中一个词带倾斜紫色高亮，立即开始按钮，以及打开 YouTube 嵌入对话框的观看视频按钮。

源站英文：Centered hero with a version announcement pill, headline with one word on a skewed purple highlight, Get started button, and a Watch video button that opens a YouTube embed in a dialog.

成功标准：高亮词可读；观看视频打开对话框；预览内用本地占位，不外链视频 CDN；无整站导航。

## 2. 实现路径（只走一条）

- **A**（有 Vibe Design / `frame/web`）：**先查** `blocks/hero-section/centered-highlight/` → **有则整段复用并按 §5 填槽**；CTA 复用 `btn-primary` / `btn-outline`；视频对话框复用 `modal-content-preview`（`a-modal` + `modal-class="pro-content-modal"`），勿手写裸 Modal。
- **B**（无母版）：还原居中层级、倾斜高亮词、主 CTA + 视频对话框；视觉跟宿主库。禁止 CDN。
- **样式落地**：`block.css` 规则默认并入宿主页 CSS。
- **脚本落地**：逻辑并入宿主页 JS；禁止镜像母版 `block.js`。

## 3. 约束

- WEB 营销首屏；禁止 Admin 侧栏
- 禁止外网 CDN；视频槽落地时用自有嵌入地址
- 视频对话框须 `modal-class="pro-content-modal"`（对标 `components/modal-content/preview/`），禁止裸 `a-modal`
- 高亮底用 `--wa-color-primary`（斜切伪元素），勿污染 `:root`
- 轻量入场可用 `wa-fade-in`

## 4. 视觉规格

- 布局：单栏居中，内容约 44rem
- 层级：版本 pill → h1（一词倾斜高亮）→ lead → 立即开始 + 观看视频
- 颜色：只用 `--wa-*`
- 来源备注：构图对照 shadcnuikit hero3

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| `{{version}}` | 版本公告 | v2.2 现已发布 |
| `{{titleBefore}}` / `{{highlight}}` / `{{titleAfter}}` | 标题三段 | 用 / 创新 / 工具释放你的创造力 |
| `{{lead}}` | 说明 | 用一套工具释放你的潜力，把想法变成现实… |
| `{{ctaPrimary}}` | 主按钮 | 立即开始 |
| `{{ctaVideo}}` | 视频按钮 | 观看视频 |
| `{{videoSrc}}` | 嵌入地址 | （落地填入，预览用占位） |

## 6. 验收

- [ ] 与 §7 / 预览同一信息架构
- [ ] 符合 §3；无 CDN；视频对话框已挂 `pro-content-modal`
- [ ] **A 且已有 slug**：已复用本目录填槽

## 7. 参考结构（骨架）

```html
<section data-slug="hero-centered-highlight" class="wa-section" id="hero">
  <div class="wa-section__inner hero-centered-highlight">
    <a class="hero-centered-highlight__pill" href="#">…</a>
    <h1 class="wa-title">…<span class="hero-centered-highlight__mark">{{highlight}}</span>…</h1>
    <p class="wa-lead">{{lead}}</p>
    <div class="wa-btn-row hero-centered-highlight__actions"><!-- 主 CTA · 观看视频 --></div>
  </div>
</section>
<a-modal
  v-model:visible="videoOpen"
  title="产品演示"
  title-align="start"
  :footer="false"
  :width="720"
  unmount-on-close
  modal-class="pro-content-modal"
  @cancel="videoOpen = false"
>
  <!-- 落地挂视频；预览可用占位 -->
</a-modal>
```

预览：`blocks/hero-section/centered-highlight/index.html`

## 8. 关联资源（可选）

| 类型 | 路径 | 说明 |
|------|------|------|
| component | `components/btn-primary/` | 主 CTA |
| component | `components/modal-content/preview/` | 视频内容弹窗（须 `pro-content-modal`） |
| type | `blocks/hero-section/` | 类型页 |
