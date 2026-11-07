# 全高 AI 提示

> 状态：preview · slug：`hero-ai-prompt` · 类型：block · 母版：web · surface：marketing · category：hero

## 1. 角色与目标

实现「全高 AI 提示」（`hero-ai-prompt`），用于 AI / 生成类产品首屏。

描述（同步源站并直译）：全高 AI 首屏，径向紫色渐变，带 logo 顶栏和侧滑移动菜单，提示文本框与添加、发送图标按钮，四个建议链接和条款说明。

源站英文：Full-height AI hero on a radial purple gradient with logo navbar and Sheet mobile menu, a prompt textarea with Add and Send icon buttons, four suggestion links and a terms note.

成功标准：提示框可输入；建议一键填入；窄屏可开抽屉菜单；渐变仅区块内；交付骨架不绑死整站导航。

## 2. 实现路径（只走一条）

- **A**（有 Vibe Design / `frame/web`）：**先查** `blocks/hero-section/ai-prompt/` → **有则整段复用并按 §5 填槽**；输入用 Arco Textarea，抽屉用 Arco Drawer。
- **B**（无母版）：还原全高渐变 + 提示框 + 建议芯片；视觉跟宿主库。禁止 CDN。
- **样式落地**：`block.css` 规则默认并入宿主页 CSS。
- **脚本落地**：逻辑并入宿主页 JS。

## 3. 约束

- 预览可带**演示用简化顶栏**；§7 默认交付骨架以内容区为主，整站导航另接 `navbars` / layouts
- 渐变写在 `section[data-slug]` 内，可用 `color-mix` + `--wa-color-primary`，勿写进 `:root`
- 禁止外网 CDN
- embed 预览勿强行 `100vh` 撑死 iframe（standalone 可用）

## 4. 视觉规格

- 布局：section 通栏渐变；顶栏 `w-full` + `md:px-16 / lg:px-24 / xl:px-32`；内容列约 `48rem`（宽屏预览；源站 demo 为 max-w-xl，预览壳下加宽以免偏窄）
- 层级：演示顶栏 → h1 → lead → 文本框（添加/发送）→ 四个建议 → 条款
- 来源备注：构图对照 shadcnuikit hero4；顶栏与内容列宽度节奏勿混用同一 max-width

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| `{{title}}` | 主标题 | 用 AI 设计界面。 |
| `{{lead}}` | 说明 | 把一段短提示变成精致、可投产的布局，只需几秒。 |
| `{{placeholder}}` | 输入占位 | 描述你想设计的界面 |
| `{{suggestions}}` | 四个建议文案 | SaaS 财务看板布局。… |
| `{{logo}}` | 品牌标 | 主色底 + 实心 FA 图标，不加产品名（默认） |
| `{{terms}}` | 条款说明 | 向我们发送消息即表示… |

## 6. 验收

- [ ] 与 §7 / 预览同一信息架构
- [ ] 符合 §3；无 CDN
- [ ] **A 且已有 slug**：已复用本目录填槽

## 7. 参考结构（骨架）

```html
<section data-slug="hero-ai-prompt" class="wa-section" id="hero">
  <!-- 可选：演示顶栏；交付可删，改接独立导航 -->
  <div class="wa-section__inner hero-ai-prompt">
    <h1 class="wa-title">{{title}}</h1>
    <p class="wa-lead">{{lead}}</p>
    <div class="hero-ai-prompt__box"><!-- textarea + 添加/发送 --></div>
    <div class="hero-ai-prompt__suggestions"><!-- 四个建议 --></div>
    <p class="hero-ai-prompt__terms">{{terms}}</p>
  </div>
</section>
```

预览：`blocks/hero-section/ai-prompt/index.html`

## 8. 关联资源（可选）

| 类型 | 路径 | 说明 |
|------|------|------|
| type | `blocks/hero-section/` | 类型页 |
| note | `navbars` / layouts | 正式顶栏另接 |
