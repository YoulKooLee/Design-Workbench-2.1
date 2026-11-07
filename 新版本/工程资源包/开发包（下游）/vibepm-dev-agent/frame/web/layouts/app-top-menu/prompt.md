# 顶栏全局菜单框架

> 状态：`preview`  
> slug：`app-top-menu` · 类型：layout · 母版：`web` · surface：`app` · category：`topnav`

## 1. 角色与目标

实现「顶栏全局菜单框架」（`app-top-menu`）：通栏顶栏在 **LOGO 左侧**放菜单图标，点击展开「产品与服务」面板（左分类 + 右列表）。**无水平顶栏导航**；无固定侧栏，主列全宽。

成功标准：菜单钮 ↔ 关闭（×）；面板自左侧展开、顶栏下通高、宽度约 880px（不满全屏）；遮罩只盖内容区不盖顶栏；Esc 关闭；点列表项跳转。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/app-top-menu/` → **有则复用预览框架并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原框架信息架构。视觉跟宿主库。禁止外网 CDN。
- **样式落地**：多页共用允许交付内一份 `css/layout-app-top-menu.css`；单页并入宿主 CSS。
- **脚本落地**：全局菜单开关 / 选中并入宿主 `js/<page>.js`；预览挂载框架不拷。

## 3. 约束

- 类名 `wa-layout*`、`wa-layout--top`、`wa-layout--top-only`、`wa-layout--top-menu`；禁止拷 Admin ProShell 运行时
- 默认 density=compact；颜色用 `--wa-*` / `--wa-shell-*`
- 内容槽为引导卡；禁止外网 CDN
- 交互：菜单展开/收起、分类筛选、搜索过滤、明暗与主色顶栏、命令菜单、框架切换

## 4. 视觉规格

- 顶栏：菜单图标 | 品牌 | 工作台胶囊 |（可选水平导航）| 操作区
- 展开面板：顶栏下全屏；左侧钉选（资源/收藏/产品）+ 分类（「全部」置顶，字号同钉选）；右侧标题+描述；产品有搜索（与下方容器同宽）；收藏同时在顶栏工作台旁（带图标）
- `is-navbar-primary` 时菜单图标与工作台反相

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| menuTrigger | LOGO 左侧菜单图标 | bars ↔ xmark |
| brand | 产品名 + 副标题 | Vibe Design |
| workbench | 品牌旁快捷入口 | 工作台 |
| megaPins | 面板左侧钉选 | 我的资源 / 我的收藏 / 产品与服务 |
| megaTopFavs | 顶栏「工作台」旁收藏快捷入口 | 来自标星项；带图标；放不下时收入「更多」（对齐 app-top-only） |
| megaCats | 面板左侧分类（`MEGA_CATALOG`） | 全部（默认）→ 电商 / 项目 / 支付 / AI / 分析 / 内容 / 客成 / 运维 / 安全 / 增长 |
| megaList | 右侧子集 | 产品：多列竖排常显全部，左侧分类仅高亮对应区块；收藏多列入口；资源：单行数值列表 |
| user / crumb / toolbar / command | 同顶栏壳惯例 | — |
| content | 主内容区全宽 | 引导卡 |

## 6. 验收

- [ ] LOGO 左侧菜单可开/关面板；遮罩与 Esc 可关
- [ ] 分类与搜索可过滤列表；点击项进入业务（刷新 nav）
- [ ] 无 ProShell 运行时、无 CDN、类名为 `wa-layout*`
- [ ] **A**：已复用 `layouts/app-top-menu/` 填槽

## 7. 参考结构（骨架）

```html
<div class="wa-layout wa-layout--top wa-layout--top-only wa-layout--top-menu" data-density="compact">
  <header class="wa-layout__navbar wa-layout__navbar--global">
    <div class="wa-layout__navbar-left">
      <button type="button" class="wa-layout__menu-trigger" aria-label="打开菜单"><!-- bars / xmark --></button>
      <a class="wa-layout__brand" href="./index.html">…</a>
      <a class="wa-layout__workbench" href="javascript:;">工作台</a>
    </div>
    <!-- 可选 topnav + actions -->
  </header>
  <div class="wa-layout__mega" role="dialog" aria-modal="true">
    <aside class="wa-layout__mega-sider">…pins + cats…</aside>
    <div class="wa-layout__mega-main">…title + search + list…</div>
  </div>
  <div class="wa-layout__body">
    <div class="wa-layout__main"><main class="wa-layout__content">…</main></div>
  </div>
</div>
```
