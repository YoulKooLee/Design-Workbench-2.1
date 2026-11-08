# 营销顶栏页脚

> 状态：`preview`  
> slug：`marketing-shell` · 类型：layout · 母版：`web` · surface：`marketing` · category：`shell`

## 1. 角色与目标

实现「营销顶栏页脚」（`marketing-shell`），用于官网 / 落地页：通栏营销顶栏（品牌、锚点导航、登录/试用 CTA）+ 主列区块流 + 页脚。密度 comfortable，不套控制台侧栏。

成功标准：顶栏通栏贴边；主列可接 Hero / 能力 / 定价等区块；窄屏顶链可收；明暗可切；无 ProShell 运行时。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/marketing-shell/` → **有则复用预览框架并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原框架信息架构。视觉跟宿主库。禁止外网 CDN。
- **样式落地**：多页共用允许交付内一份 `css/layout-marketing-shell.css`；单页并入宿主 CSS。
- **脚本落地**：锚点滚动 / CTA 示意并入宿主 `js/<page>.js`；预览挂载框架不拷。

## 3. 约束

- 类名 `wa-layout*`、`wa-layout--site-marketing`；禁止拷 Admin ProShell 运行时
- 默认 density=comfortable；颜色用 `--wa-*`
- 勿从 App 侧栏壳复制；悬浮导航另用 `marketing-float`
- 禁止外网 CDN；内容为营销区块流，非控制台引导卡
- 响应式：窄屏收缩导航与 CTA 排布
- 交互：明暗切换（`data-wa-theme-toggle`）、锚点 `goNav`、CTA 示意

## 4. 视觉规格

- 顶栏一行通栏：品牌 | 站点导航 | 操作（明暗 / 登录 / 试用）；形态保持贴边 sticky，不改悬浮岛
- 氛围底：`wa-layout__site-bg` + `wa-layout--site-bg-wash`（不规则主色洗染 + icon 同款点阵）。颜色只用 `--wa-*`，明暗跟 `theme.js`
- Hero：居中文案 + 毛玻璃 eyebrow；产品舞台含 chrome（窗点 / meta / LIVE）+ 底部渐隐 mask
- 主列纵向区块：Hero → 能力 → 定价等（按业务删减）；CTA 条可带轻主色晕
- 页脚：版权与站点链接
- 明暗 / 品牌跟随 `theme.js`

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| brand | 顶栏品牌 | Beacon |
| siteNav | 顶栏锚点导航 | 能力 / 定价 / 客户 |
| cta | 顶栏与 Hero 主按钮 | 登录 / 试用 |
| sections | 主列区块流 | Hero、指标、能力、定价 |
| footer | 页脚 | © / 链接 |

## 6. 验收

- [ ] 与 §7 / 预览同一框架分区（通栏顶 + 主列 + 页脚）
- [ ] 无 ProShell 运行时、无 CDN、类名为 `wa-layout*`
- [ ] 亮/暗可读；窄屏可用
- [ ] **A**：已复用 `layouts/marketing-shell/` 填槽

## 7. 参考结构（骨架）

```html
<div class="wa-layout wa-layout--site-marketing">
  <header class="wa-layout__navbar">
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
| sibling | `layouts/marketing-float/` | 悬浮导航条分叉 |
| density | `design-library/references/layout-density.md` | 密度与 Admin 契约 |
