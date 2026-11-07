# 侧栏留白框架

> 状态：`preview`  
> slug：`app-inset` · 类型：layout · 母版：`web` · surface：`app` · category：`sidebar`

## 1. 角色与目标

实现「侧栏留白框架」（`app-inset`）：页面底色铺在左侧导航上，右侧内容是一整块表面，上下左右留出空隙、不贴边。导航与交互对齐默认基线 `layouts/app-sidebar/`。

成功标准：侧栏贴背景、内容岛圆角完整、周边可见页面底；可折叠侧栏；窄屏抽屉；明暗可切；侧栏可切主色/浅色背景。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/app-inset/` → **有则复用预览框架并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原框架信息架构。视觉跟宿主库。禁止外网 CDN。
- **样式落地**：多页共用允许交付内一份 `css/layout-app-inset.css`；单页并入宿主 CSS。
- **脚本落地**：折叠 / 抽屉 / 窄屏逻辑并入宿主 `js/<page>.js`；预览挂载框架不拷。

## 3. 约束

- 类名 `wa-layout*`；禁止拷 Admin ProShell 运行时（`shell.js` / `routes` / `pro-*`）
- 默认 density=compact；颜色用 `--wa-*` / `--wa-shell-*`（含 `--wa-shell-inset`）
- 内容槽沿用引导卡接法（非假看板）；岛内不再套第二层描边卡片
- 响应式：≤768px 内容岛仍留边；顶栏 Logo 在浅色顶栏用主色底（不沿用主色侧栏反色标）；面包屑样式同宽屏，仅溢出时裁切；侧栏改抽屉
- 交互：侧栏折叠、明暗切换、侧栏主色/浅色背景切换（顶栏按钮 + `is-sider-primary`）、侧栏搜索框打开命令菜单（⌘/Ctrl+K）、导航选中示意、顶栏图标打开框架抽屉；打开 / 刷新走 `spin-page`

## 4. 视觉规格

- 默认侧栏背景透明，落在 `--wa-color-bg` 上；无侧栏竖线 / 重阴影
- `is-sider-primary` 时整页底（除内容岛）铺 `--wa-shell-primary-bg`（主色压暗一阶，明暗同色），侧栏透明贴底；文字/选中态用 `--wa-color-on-primary` 反相；内容岛顶栏用户胶囊箭头保持深色
- 主列四周留边；滚动后内容岛顶贴窗口（仅底部圆角）。`.wa-layout__stage` 圆角表面（约 16px）+ 最弱描边
- 页脚在内容岛下方、页面底色上，不进入岛内
- 引导卡右侧装饰用 `assets/effects/dashed-orbit`（虚线环 + 绕行点），色跟 `--wa-color-primary`
- 面包屑与账号在内容岛内顶栏，不跨到侧栏上方

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| brand | 侧栏顶产品名 + 副标题 | Vibe Design / Layouts · App Shell |
| navGroups | 分组导航（标题仅分区） | 电商运营 / 项目管理 / 支付中心 / AI 对话 |
| nav item | 图标 + 文案；展开态内嵌子菜单 | 每项可独立展开/收起 |
| user | 仅内容岛顶栏用户面板 | 个人主页 / 账号设置 / 改密 / 退出 |
| command | 侧栏搜索框 → 命令菜单 | 跳转导航 / 切主题 / 切导航背景 / 切框架 / 账号设置 |
| sider skin | 顶栏切换按钮 | 浅色导航 ↔ 主色导航（`is-sider-primary`，session 记忆） |
| toolbar | `?preset=toolbar` 面包屑下筛选条 | 状态 / 负责人 / 优先级 / 类型 / 日期 / 搜索；视图；批量下拉 |
| content | 岛内主内容 | 引导：标签 + 大标题 + 描述 + 步骤；窄屏结构示意改到文案下方 |

## 6. 验收

- [ ] 与 §7 / 预览同一框架分区（侧栏贴底、内容整块留边）
- [ ] 无 ProShell 运行时、无 CDN、类名为 `wa-layout*`
- [ ] 亮/暗可读；窄屏抽屉可用；主色/浅色导航可切且对比足够
- [ ] **A**：已复用 `layouts/app-inset/` 填槽

## 7. 参考结构（骨架）

```html
<div class="wa-layout wa-layout--inset" data-density="compact">
  <div class="wa-layout__body">
    <aside class="wa-layout__sider">
      <a class="wa-layout__brand">{{brand}}</a>
      <nav><!-- {{nav}} --></nav>
    </aside>
    <div class="wa-layout__main">
      <div class="wa-layout__stage">
        <header class="wa-layout__navbar wa-layout__navbar--embedded">{{crumb}} {{actions}}</header>
        <main class="wa-layout__content">{{content}}</main>
      </div>
      <footer class="wa-layout__footer">{{footer}}</footer>
    </div>
  </div>
</div>
```

## 8. 关联资源

| 类型 | 路径 | 说明 |
|------|------|------|
| list | `layouts/list.md` | 库存与选模板 |
| sibling | `layouts/app-sidebar/` | 导航同源；留白岛同类以本目录为源 |
| sibling | `layouts/app-topnav/` | 通栏顶栏 |
| component | `components/breadcrumb/default/` | 内容岛顶栏面包屑 |
| component | `components/command/shortcuts/` | 侧栏搜索框弹出的命令菜单 |
| density | `design-library/references/layout-density.md` | 密度与 Admin 契约 |
| animation | `assets/effects/dashed-orbit` | 引导卡右侧虚线环 |
