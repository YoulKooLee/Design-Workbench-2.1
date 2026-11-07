# 通栏顶栏框架

> 状态：`preview`  
> slug：`app-topnav` · 类型：layout · 母版：`web` · surface：`app` · category：`topnav`

## 1. 角色与目标

实现「通栏顶栏框架」（`app-topnav`），用于产品站 / 控制台：顶栏通栏含品牌，侧栏固定在顶栏下方，主列随侧栏宽度铺开。交互与导航形态对齐默认基线 `layouts/app-sidebar/`，仅分区改为 Admin `layoutMode=top`。

成功标准：框架分区清晰（brand 在通栏顶栏 / sider 在顶栏下 / navbar actions / content）；可折叠侧栏；窄屏抽屉；明暗可切；通栏顶栏可切主色/浅色背景；内容槽为引导卡。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/app-topnav/` → **有则复用预览框架并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原框架信息架构。视觉跟宿主库。禁止外网 CDN。
- **样式落地**：多页共用允许交付内一份 `css/layout-app-topnav.css`；单页并入宿主 CSS。
- **脚本落地**：折叠 / 抽屉 / 窄屏逻辑并入宿主 `js/<page>.js`；预览挂载框架不拷。

## 3. 约束

- 类名 `wa-layout*`；禁止拷 Admin ProShell 运行时（`shell.js` / `routes` / `pro-*`）
- 默认 density=compact（`data-density`）；颜色用 `--wa-*` / `--wa-shell-*`
- 内容槽沿用 app-sidebar 引导卡接法（非假看板）；禁止外网 CDN
- 响应式：≤768px 顶栏保留 Logo + 操作；头像去掉浅色描边（主色顶栏尤其）；面包屑在内容区顶部样式同宽屏，仅放不下时裁切；侧栏改抽屉（从顶栏下方滑出）；点父级不关抽屉
- 交互：侧栏折叠、明暗切换（`data-wa-theme-toggle`）、通栏顶栏主色/浅色背景切换（顶栏按钮 + `is-navbar-primary`）、顶栏搜索打开命令菜单（⌘/Ctrl+K）、导航选中示意、顶栏图标打开 `drawer-float-scroll` 切换页面框架；打开 / 刷新走 `spin-page` 页顶进度条

## 4. 视觉规格

- 对齐 Admin `layoutMode=top`：固定通栏顶栏；品牌条宽度跟侧栏；侧栏 `top` = navbar 高；无侧栏竖分割线，用阴影分层
- `is-navbar-primary` 时通栏顶栏铺 `--wa-shell-primary-bg`（主色压暗一阶，明暗同色），品牌与图标反相；用户胶囊保持浅底，箭头用深色
- 父级选中用实心底；子菜单无图标、无竖线，文字与父级标签左对齐，行高约 32px
- 明暗 / 品牌跟随 `theme.js`（明暗 + `WA_BRAND`）
- 密度只调 `--wa-shell-*`，勿另写一套 DOM

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| brand | 顶栏左侧产品名 + 副标题 | Vibe Design / Layouts · App Shell |
| navGroups | 分组导航（标题仅分区，不可折叠） | 电商运营 / 项目管理 / 支付中心 / AI 对话 |
| nav item | 图标 + 文案；展开态内嵌子菜单（子项无图标） | 每项可独立展开/收起；仅显示该项相关子菜单 |
| collapsed hover | 收起态悬停飞出当前项 | 该项标题 + 该项子菜单（与展开态一致，单层面板） |
| user | 仅顶栏用户面板 | 个人主页 / 账号设置 / 改密 / 退出（点击刷新） |
| crumb | 内容区顶部面包屑（`breadcrumb-default`） | 首页 › 分组 › 一级菜单 › 子菜单 |
| toolbar | `?preset=toolbar` 面包屑下筛选条 | 状态 / 负责人 / 优先级 / 类型 / 日期 / 搜索；视图；批量下拉 |
| tabs | `?preset=tabs` 通栏多页签（主列顶） | 对齐 Admin：表面底栏；侧栏菜单点击新增/激活页签；滚动 / 关闭 / 右键 / 全部标签 |
| right-rail | `?preset=right-rail` 右侧边栏 | 通栏下左栏 + 主列 + 右侧宽栏详情；与 aside-tools 窄轨区分 |
| aside-tools | `?preset=aside-tools` 右侧快捷工具栏 | 顶下贴右窄轨：支持 / 文档等；底栏可收起为展开钮；窄屏隐藏 |
| region | `?preset=region` 品牌旁区域切换 | 华东 / 华北 / 全球 |
| command | 顶栏搜索 → 命令菜单 | 跳转导航 / 切主题 / 切顶栏背景 / 切框架 / 账号设置 |
| navbar skin | 顶栏切换按钮 | 浅色顶栏 ↔ 主色顶栏（`is-navbar-primary`，session 记忆） |
| content | 主内容区 | 引导容器：标签 + 大标题 + 描述；下方竖排时间线步骤；窄屏结构示意改到文案下方 |

## 6. 验收

- [ ] 与 §7 / 预览同一框架分区（品牌在通栏顶栏，侧栏在其下）
- [ ] 无 ProShell 运行时、无 CDN、类名为 `wa-layout*`
- [ ] 亮/暗可读；窄屏抽屉可用；主色/浅色顶栏可切且对比足够
- [ ] 展开态：相关子菜单内嵌左侧（非下拉）；每项可独立展开/收起
- [ ] **A**：已复用 `layouts/app-topnav/` 填槽

## 7. 参考结构（骨架）

```html
<div class="wa-layout wa-layout--top" data-density="compact">
  <header class="wa-layout__navbar wa-layout__navbar--global">
    <div class="wa-layout__navbar-left"><a class="wa-layout__brand">{{brand}}</a></div>
    <!-- actions -->
  </header>
  <div class="wa-layout__body">
    <aside class="wa-layout__sider"><nav><!-- {{nav}} --></nav></aside>
    <div class="wa-layout__main">
      <main class="wa-layout__content">
        <a-breadcrumb><!-- {{crumb}} --></a-breadcrumb>
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
| sibling | `layouts/app-sidebar/` | 交互与内容槽同源；通栏顶栏同类以本目录为源 |
| component | `components/breadcrumb/default/` | 顶栏 `breadcrumb-default` |
| component | `components/card/default/` | 内容槽引导容器（最弱描边、无阴影、8px 圆角） |
| component | `components/command/shortcuts/` | 顶栏搜索弹出的命令菜单 |
| density | `design-library/references/layout-density.md` | 密度与 Admin 契约 |
| animation | `assets/effects/dashed-orbit` | 引导卡右侧虚线环 + 绕行点 |
