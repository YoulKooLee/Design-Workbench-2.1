# 居中口碑

> 状态：preview · slug：`hero-centered-social` · 类型：block · 母版：web · surface：marketing · category：hero

## 1. 角色与目标

实现「居中口碑」（`hero-centered-social`），用于落地首页首屏。

描述（同步源站并直译）：居中首屏，可点击的新徽章公告、标题、段落、立即开始和了解更多按钮，以及四个重叠评价头像、五星、5.0 分和评价数。

源站英文：Centered hero with a linked New badge announcement, headline, paragraph, Get started and Learn more buttons, then four overlapping reviewer avatars beside five stars, a 5.0 score and a review count.

成功标准：口碑行紧贴按钮下方，评分与人数可读；无整站导航。

## 2. 实现路径（只走一条）

- **A**（有 Vibe Design / `frame/web` 或同约定工程）：**先查** `blocks/hero-section/centered-social/` → **有则整段复用预览区段并按 §5 填槽**，勿无故按 §7 重写；CTA 优先 Arco Button。
- **B**（无母版 / 其它栈）：只还原居中层级、双 CTA、头像组 + 星级行；视觉跟宿主库。禁止 CDN。
- **样式落地**：`block.css` 规则默认并入宿主页 CSS；勿强制镜像母版路径。
- **脚本落地**：逻辑并入宿主页 JS；禁止镜像母版 `block.js`。

## 3. 约束

- WEB 营销首屏；禁止 Admin 侧栏 / ProShell
- 头像可用本地色块/首字，禁止外链图床
- 交互：主次按钮各一；徽章可链到更新说明
- 轻量入场可用 `wa-fade-in`

## 4. 视觉规格

- 布局：单栏居中；口碑行在 CTA 下方横排
- 层级：新徽章 → h1 → lead → 按钮 → 照片头像 + 星级
- 文案：区内标题/说明/公告直译源站；头像用 `assets/images/avatar_*.jpg`
- 颜色：只用 `--wa-*`；星可用强调色
- 来源备注：构图对照 shadcnuikit Hero Section 2（Pro 源码未拉取，按页面说明重实现）

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| `{{badgeTag}}` | 徽章标签 | New |
| `{{badgeText}}` | 徽章说明 | 提示词与预览同源… |
| `{{title}}` | 主标题 | 被团队验证过的首屏结构 |
| `{{lead}}` | 说明 | 居中传达价值主张… |
| `{{ctaPrimary}}` | 主按钮 | 立即开始 |
| `{{ctaSecondary}}` | 次按钮 | 了解更多 |
| `{{score}}` | 评分 | 5.0 |
| `{{reviewCount}}` | 评价规模 | 来自 200+ 条评价 |
| `{{avatars[4]}}` | 照片头像 | `assets/images/avatar_01.jpg`…`04.jpg` |

## 6. 验收

- [ ] 与 §7 / 预览同一信息架构
- [ ] 符合 §3；无 CDN 头像
- [ ] **A 且已有 slug**：已复用 `blocks/hero-section/centered-social/` 填槽

## 7. 参考结构（骨架）

```html
<section data-slug="hero-centered-social" class="wa-section" id="hero">
  <div class="wa-section__inner hero-centered-social">
    <a class="hero-centered-social__badge" href="#">
      <span class="hero-centered-social__badge-tag">{{badgeTag}}</span>
      <span>{{badgeText}}</span>
    </a>
    <h1 class="wa-title">{{title}}</h1>
    <p class="wa-lead">{{lead}}</p>
    <div class="wa-btn-row hero-centered-social__actions"><!-- CTA --></div>
    <div class="hero-centered-social__proof">
      <div class="hero-centered-social__avatars"><!-- 4 avatars --></div>
      <div class="hero-centered-social__rating">
        <span class="hero-centered-social__stars"><!-- stars --></span>
        <span class="hero-centered-social__score"><strong>{{score}}</strong> · {{reviewCount}}</span>
      </div>
    </div>
  </div>
</section>
```

预览：`blocks/hero-section/centered-social/index.html`

## 8. 关联资源（可选）

| 类型 | 路径 | 说明 |
|------|------|------|
| component | `components/btn-primary/` | 主 CTA |
| type | `blocks/hero-section/` | 类型页 |
