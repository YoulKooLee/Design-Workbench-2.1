# 悬浮导航条

> 状态：`preview`  
> slug：`marketing-float` · 类型：layout · 母版：`web` · surface：`marketing` · category：`shell`

## 1. 角色与目标

实现「悬浮导航条」（`marketing-float`），用于官网 / 落地页：整条悬浮胶囊导航（品牌、锚点、CTA）+ 主列区块流 + 页脚。从 `marketing-shell` 分叉，仅顶栏形态不同。

成功标准：导航呈悬浮胶囊、不贴边通栏；主列与页脚与营销壳同构；勿与 App `app-top-island` 混用；明暗可切。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/marketing-float/` → **有则复用预览框架并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原框架信息架构。视觉跟宿主库。禁止外网 CDN。
- **样式落地**：多页共用允许交付内一份 `css/layout-marketing-float.css`；单页并入宿主 CSS。
- **脚本落地**：锚点 / CTA 并入宿主 `js/<page>.js`；预览挂载框架不拷。

## 3. 约束

- 类名 `wa-layout*`（沿用营销壳修饰 + 悬浮顶栏规则）；禁止 ProShell 运行时
- 默认 density=comfortable；勿从 App 图标岛顶栏复制
- 通栏营销顶用 `marketing-shell`，本条只做悬浮胶囊
- 禁止外网 CDN
- 交互：明暗切换、锚点、CTA 示意

## 4. 视觉规格

- 顶栏：整条胶囊悬浮于页面上方（品牌 | 导航 | CTA）
- 主列 / 页脚：与 `marketing-shell` 同级区块流
- 明暗 / 品牌跟随 `theme.js`

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| brand | 胶囊内品牌 | Beacon |
| siteNav | 胶囊内锚点 | 能力 / 定价 |
| cta | 胶囊内按钮 | 登录 / 试用 |
| sections | 主列区块流 | Hero、能力、定价 |
| footer | 页脚 | © / 链接 |

## 6. 验收

- [ ] 顶栏为悬浮胶囊，非通栏贴边
- [ ] 无 ProShell 运行时、无 CDN、类名为 `wa-layout*`
- [ ] 未误用 `app-top-island` 结构
- [ ] **A**：已复用 `layouts/marketing-float/` 填槽

## 7. 参考结构（骨架）

```html
<div class="wa-layout wa-layout--site-marketing is-nav-float">
  <header class="wa-layout__navbar wa-layout__navbar--float">
    <div class="wa-layout__navbar-inner">
      <a class="wa-layout__brand">{{brand}}</a>
      <nav class="wa-layout__site-nav"><!-- {{siteNav}} --></nav>
      <div class="wa-layout__actions"><!-- {{cta}} --></div>
    </div>
  </header>
  <main class="wa-layout__main">
    <div class="wa-layout__site-stack"><!-- {{sections}} --></div>
  </main>
  <footer class="wa-layout__footer">{{footer}}</footer>
</div>
```

## 8. 关联资源

| 类型 | 路径 | 说明 |
|------|------|------|
| list | `layouts/list.md` | 库存与选模板 |
| sibling | `layouts/marketing-shell/` | 通栏营销顶源 |
| density | `design-library/references/layout-density.md` | 密度与 Admin 契约 |
