# 居中公告条

> 状态：preview · slug：`hero-centered-announce` · 类型：block · 母版：web · surface：marketing · category：hero

## 1. 角色与目标

实现「居中公告条」（`hero-centered-announce`），用于落地首页首屏。

描述（同步源站并直译）：居中首屏，带边框的融资公告胶囊和了解更多链接，大标题，短段落，以及立即开始和幽灵式了解更多按钮并排。

源站英文：Centered hero with a bordered funding announcement pill and Read more link, a large headline, a short paragraph, and Get started and ghost Learn more buttons side by side.

成功标准：公告可点，价值主张一眼可读，主 CTA 明确；无整站导航（由独立顶栏承接）。

## 2. 实现路径（只走一条）

- **A**（有 Vibe Design / `frame/web` 或同约定工程）：**先查** `blocks/hero-section/centered-announce/` → **有则整段复用预览区段并按 §5 填槽**，勿无故按 §7 重写；CTA 优先 Arco Button。
- **B**（无母版 / 其它栈）：只还原居中层级与主次 CTA；视觉跟宿主库。禁止强行 import Arco、禁止外网 CDN。
- **样式落地**：若有同目录 `block.css`，默认将规则并入宿主页 CSS；**禁止**交付里强制镜像母版 `block.css` 路径。多页复用可抽一份共享 CSS。
- **脚本落地**：逻辑并入宿主页 `js/<page>.js`；禁止镜像母版 `block.js`。

## 3. 约束

- WEB 营销首屏；禁止 Admin 侧栏 / ProShell
- 禁止外网 CDN；无配图依赖
- 响应式：窄屏可隐藏公告 pill（与预览一致）
- 交互：主实心 + 次幽灵/文字链；勿扩成表单
- 轻量入场可用 `wa-fade-in`

## 4. 视觉规格

- 布局：单栏居中，内容最大约 42rem
- 层级：公告 pill → h1 → lead → 按钮行
- 强调：主按钮实心；次按钮文字 + 箭头
- 颜色：只用 `--wa-*`
- 来源备注：构图对照 shadcnuikit hero1（Free）

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| `{{announce}}` | 公告正文 | 宣布我们的新一轮融资。 |
| `{{announceLink}}` | 公告链文案 | 了解更多 |
| `{{title}}` | 主标题 | 用创新工具释放你的创造力 |
| `{{lead}}` | 说明 | 用一套工具释放你的潜力，把想法变成现实… |
| `{{ctaPrimary}}` | 主按钮 | 立即开始 |
| `{{ctaSecondary}}` | 次按钮 | 了解更多 |

## 6. 验收

- [ ] 与 §7 / 预览同一信息架构与主次 CTA
- [ ] 符合 §3；无 CDN
- [ ] **A 且已有 slug**：已复用 `blocks/hero-section/centered-announce/` 填槽

## 7. 参考结构（骨架）

```html
<section data-slug="hero-centered-announce" class="wa-section" id="hero">
  <div class="wa-section__inner hero-centered-announce">
    <div class="hero-centered-announce__pill">
      <span>{{announce}}</span>
      <a class="hero-centered-announce__pill-link" href="#">{{announceLink}}</a>
    </div>
    <h1 class="wa-title">{{title}}</h1>
    <p class="wa-lead">{{lead}}</p>
    <div class="wa-btn-row hero-centered-announce__actions">
      <!-- 主 CTA · 次 CTA（路径 A 可用 a-button） -->
    </div>
  </div>
</section>
```

预览：`blocks/hero-section/centered-announce/index.html`

## 8. 关联资源（可选）

| 类型 | 路径 | 说明 |
|------|------|------|
| component | `components/btn-primary/` | 主 CTA 语义 |
| type | `blocks/hero-section/` | 类型页 |
