# 无侧栏通栏框架

> 状态：`preview`  
> slug：`app-top-only` · 类型：layout · 母版：`web` · surface：`app` · category：`topnav`

## 1. 角色与目标

实现「无侧栏通栏框架」（`app-top-only`），用于产品站 / 控制台：通栏顶栏含品牌与水平主导航及操作区，**无左侧侧栏**，主内容列全宽。导航数据与交互语义对齐 `layouts/app-topnav/`（一级项 + 子菜单），仅信息架构改为顶栏水平导航。

成功标准：框架分区清晰（brand / 水平 nav / navbar actions / 全宽 content）；窄屏顶链收进抽屉；明暗可切；通栏顶栏可切主色/浅色；内容槽为引导卡；支持 `?preset=toolbar`。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/app-top-only/` → **有则复用预览框架并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原框架信息架构。视觉跟宿主库。禁止外网 CDN。
- **样式落地**：多页共用允许交付内一份 `css/layout-app-top-only.css`；单页并入宿主 CSS。
- **脚本落地**：窄屏抽屉 / 顶栏导航选中并入宿主 `js/<page>.js`；预览挂载框架不拷。

## 3. 约束

- 类名 `wa-layout*`、`wa-layout--top`、`wa-layout--top-only`；禁止拷 Admin ProShell 运行时（`shell.js` / `routes` / `pro-*`）
- 默认 density=compact（`data-density`）；颜色用 `--wa-*` / `--wa-shell-*`
- 内容槽沿用 app-sidebar 引导卡接法（非假看板）；禁止外网 CDN
- 响应式：≤768px 顶栏保留 Logo + 汉堡 + 操作；水平导航隐藏，汉堡打开顶链抽屉（非左侧 sider）；面包屑在内容区顶部
- 交互：明暗切换（`data-wa-theme-toggle`）、通栏顶栏主色/浅色（`is-navbar-primary`）、顶栏搜索命令菜单（⌘/Ctrl+K）、导航选中（`goMenu` + 面包屑）、框架切换抽屉；打开 / 刷新走 `spin-page` 页顶进度条

## 4. 视觉规格

- 顶栏一行：品牌 | 水平主导航（可溢出横向滚动） | 操作区
- 一级项可悬停/点击展开 `a-dropdown` 子菜单；点一级项同时选中并更新面包屑
- `is-navbar-primary` 时通栏顶栏铺 `--wa-shell-primary-bg`，品牌与图标反相；用户胶囊保持浅底
- 明暗 / 品牌跟随 `theme.js`（明暗 + `WA_BRAND`）

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| brand | 顶栏左侧产品名 + 副标题 | Vibe Design / Layouts · App Shell |
| topNav | 顶栏水平一级导航（`NAV_GROUPS` 各项） | 数据看板 / 商品管理 / 项目概览 … |
| topNav children | 一级项下拉子菜单（子项无图标） | 经营总览 / 转化漏斗 … |
| user | 顶栏用户面板 | 个人主页 / 账号设置 / 改密 / 退出 |
| crumb | 内容区顶部面包屑 | 首页 › 分组 › 一级 › 子菜单 |
| toolbar | `?preset=toolbar` 面包屑下筛选条 | 状态 / 负责人 / 优先级 / 类型 / 日期 / 搜索；视图；批量下拉 |
| command | 顶栏搜索 → 命令菜单 | 跳转导航 / 切主题 / 切顶栏 / 切框架 |
| navbar skin | 顶栏切换按钮 | 浅色顶栏 ↔ 主色顶栏（session `wa.app-top-only.navbarPrimary`） |
| content | 主内容区全宽 | 引导容器：标签 + 大标题 + 描述 + 四步 + 顶栏无侧栏结构示意 |

## 6. 验收

- [ ] 与 §7 / 预览同一框架分区（无 `aside` / sider）
- [ ] 无 ProShell 运行时、无 CDN、类名为 `wa-layout*`
- [ ] 亮/暗可读；窄屏顶链抽屉可用；主色/浅色顶栏可切
- [ ] 一级顶栏导航 + 子菜单下拉；`?preset=toolbar` 可演示
- [ ] **A**：已复用 `layouts/app-top-only/` 填槽

## 7. 参考结构（骨架）

```html
<div class="wa-layout wa-layout--top wa-layout--top-only" data-density="compact">
  <header class="wa-layout__navbar wa-layout__navbar--global">
    <div class="wa-layout__navbar-left"><a class="wa-layout__brand">{{brand}}</a></div>
    <nav class="wa-layout__topnav" aria-label="主导航"><!-- {{topNav}} --></nav>
    <!-- actions -->
  </header>
  <div class="wa-layout__body">
    <div class="wa-layout__main">
      <main class="wa-layout__content">
        <a-breadcrumb><!-- {{crumb}} --></a-breadcrumb>
        <!-- toolbar when ?preset=toolbar -->
        {{content}}
      </main>
    </div>
  </div>
</div>
```

## 8. 关联资源

| 类型 | 路径 | 说明 |
|------|------|------|
| list | `layouts/list.md` | 库存与选模板 |
| sibling | `layouts/app-topnav/` | 同源导航数据；本壳去 sider |
| sibling | `layouts/app-stacked-nav/` | 多层顶栏变体 |
| component | `components/breadcrumb/default/` | 面包屑 |
| component | `components/card/default/` | 内容槽引导容器 |
| component | `components/command/shortcuts/` | 命令菜单 |
| density | `design-library/references/layout-density.md` | 密度契约 |
| animation | `assets/effects/dashed-orbit` | 引导卡右侧虚线环 |
