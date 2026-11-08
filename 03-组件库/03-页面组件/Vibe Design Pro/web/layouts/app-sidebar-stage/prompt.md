# 灰栏工作台

> 状态：`preview`  
> slug：`app-sidebar-stage` · 类型：layout · 母版：`web` · surface：`app` · category：`sidebar`

## 1. 角色与目标

实现「灰栏工作台」（`app-sidebar-stage`），用于工作台类页面：左侧灰底导航（搜索在品牌右侧、无边框底），右侧白底工作台；顶栏左上展开/收起，旁为子菜单标题。从 `app-sidebar` 分叉，交互同源。

成功标准：框架分区清晰（brand / sider / navbar / content）；可折叠侧栏；窄屏抽屉；明暗可切；侧栏可切主色/浅色背景；内容区仅占位。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/app-sidebar-stage/` → **有则复用预览框架并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原框架信息架构。视觉跟宿主库。禁止外网 CDN。
- **样式落地**：多页共用允许交付内一份 `css/layout-app-sidebar-stage.css`；单页并入宿主 CSS。
- **脚本落地**：折叠 / 抽屉 / 窄屏逻辑并入宿主 `js/<page>.js`；预览挂载框架不拷。

## 3. 约束

- 类名 `wa-layout*`；禁止拷 Admin ProShell 运行时（`shell.js` / `routes` / `pro-*`）
- 默认 density=compact（`data-density`）；颜色用 `--wa-*` / `--wa-shell-*`
- 内容区仅占位；禁止外网 CDN
- 响应式：≤768px 对齐 Admin 左右布局窄屏——顶栏通栏（Logo + 圆形图标含菜单；主色侧栏反色标在浅色顶栏改回主色底），面包屑下到内容区（样式同宽屏，仅溢出时裁切），侧栏改抽屉
- 交互：侧栏折叠、明暗切换（`data-wa-theme-toggle`）、侧栏主色/浅色背景切换（顶栏按钮 + `is-sider-primary`）、顶栏搜索打开命令菜单（`command-shortcuts` 弹层，⌘/Ctrl+K）、导航选中示意、顶栏图标打开 `drawer-float-scroll` 切换页面框架；打开 / 刷新走 `spin-page` 页顶进度条

## 4. 视觉规格

- 侧栏 sticky 通顶、灰底；主列白底 sticky 顶栏；搜索在侧栏头 LOGO 右侧（无边框背景）；侧栏无阴影，主列左边线分隔；展开收起在主列顶左
- 默认浅色导航（表面色混底）；`is-sider-primary` 时侧栏铺 `--wa-shell-primary-bg`（主色压暗一阶，明暗同色），文字/选中态用 `--wa-color-on-primary` 反相
- 父级选中用实心底；子菜单无图标、无竖线，文字与父级标签左对齐，行高约 32px
- 明暗 / 品牌跟随 `theme.js`（明暗 + `WA_BRAND`）
- 密度只调 `--wa-shell-*`，勿另写一套 DOM

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| brand | 产品名 + 副标题 | Vibe Design / Layouts · App Shell |
| navGroups | 分组导航（标题仅分区，不可折叠） | 电商运营 / 项目管理 / 支付中心 / AI 对话 |
| nav item | 图标 + 文案；展开态内嵌子菜单（子项无图标） | 每项可独立展开/收起；仅显示该项相关子菜单（导出/设置/说明，点击刷新） |
| collapsed hover | 收起态悬停飞出当前项 | 该项标题 + 该项子菜单（与展开态一致，单层面板） |
| user | 侧栏底 + 顶栏用户面板 | 个人主页 / 账号设置 / 改密 / 退出（点击刷新） |
| siderAlert | `?preset=sider-alert` 导航区提示卡 | 存储将满 |
| siderMeter | `?preset=sider-storage` 用户区上方用量条 | 团队存储 8.6/10 GB |
| siderPlan | `?preset=sider-account` 用户区上方账号卡 | 专业版 / 升级 |
| toolbar | `?preset=toolbar` 面包屑下筛选条 | 状态 / 负责人 / 优先级 / 类型 / 日期 / 搜索；视图；批量下拉 |
| sectionTabs | 主列顶栏子菜单标题 | 当前一级菜单的子项横向切换 |
| command | 顶栏搜索 → 命令菜单 | 跳转导航 / 切主题 / 切导航背景 / 切框架 / 账号设置 |
| sider skin | 顶栏切换按钮 | 浅色导航 ↔ 主色导航（`is-sider-primary`，session 记忆） |
| content | 主内容区 | 引导容器：标签 + 大标题 + 描述；下方竖排时间线步骤；窄屏结构示意改到文案下方 |

## 6. 验收

- [ ] 与 §7 / 预览同一框架分区
- [ ] 无 ProShell 运行时、无 CDN、类名为 `wa-layout*`
- [ ] 亮/暗可读；窄屏抽屉可用；主色/浅色导航可切且对比足够
- [ ] 展开态：相关子菜单内嵌左侧（非下拉）；每项可独立展开/收起，且只显示该项自己的子菜单
- [ ] **A**：已复用 `layouts/app-sidebar-stage/` 填槽

## 7. 参考结构（骨架）

```html
<div class="wa-layout wa-layout--side" data-density="compact">
  <div class="wa-layout__body">
    <aside class="wa-layout__sider">
      <a class="wa-layout__brand">{{brand}}</a>
      <nav><!-- {{nav}} ；?preset=sider-alert 插在导航前 --></nav>
      <!-- ?preset=sider-storage / sider-account → 底扩展 -->
    </aside>
    <div class="wa-layout__main">
      <header class="wa-layout__navbar wa-layout__navbar--embedded">
        <a-breadcrumb><!-- {{crumb}} breadcrumb-default --></a-breadcrumb>
      </header>
      <main class="wa-layout__content">
        <!-- ?preset=toolbar → wa-layout__toolbar -->
        {{content}}
      </main>
    </div>
  </div>
</div>
```

## 8. 关联资源

| 类型 | 路径 | 说明 |
|------|------|------|
| list | `layouts/list.md` | 库存与选模板；单列通顶同类以本目录为源 |
| sibling | `layouts/app-topnav/` | 通栏顶栏；该类从 topnav 分叉，勿从本目录改 |
| component | `components/breadcrumb/default/` | 顶栏 `breadcrumb-default` |
| component | `components/card/default/` | 内容槽引导容器（最弱描边、无阴影、8px 圆角） |
| component | `components/command/shortcuts/` | 顶栏搜索弹出的命令菜单 |
| density | `design-library/references/layout-density.md` | 密度与 Admin 契约 |
| animation | `assets/effects/dashed-orbit` | 引导卡右侧虚线环 + 绕行点 |
