# 图标双轨框架

> 状态：`preview`  
> slug：`app-dual-rail` · 类型：layout · 母版：`web` · surface：`app` · category：`sidebar`

## 1. 角色与目标

实现「图标双轨框架」（`app-dual-rail`），用于需要「分组图标轨 + 第二列菜单面板」的产品壳。从 `layouts/app-sidebar/` 分叉：分区多一列轨，导航数据与内容槽同源。

成功标准：轨 / 面板 / 嵌入顶栏 / 主内容分区清晰；收起只留图标轨；窄屏抽屉含轨+面板；明暗与主色侧栏可切。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/app-dual-rail/` → **有则复用预览框架并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原框架信息架构。视觉跟宿主库。禁止外网 CDN。
- **样式落地**：多页共用允许交付内一份 `css/layout-app-dual-rail.css`；单页并入宿主 CSS。
- **脚本落地**：折叠 / 换组 / 抽屉 / 窄屏逻辑并入宿主 `js/<page>.js`；预览挂载框架不拷。

## 3. 约束

- 类名 `wa-layout*`；禁止拷 Admin ProShell 运行时（`shell.js` / `routes` / `pro-*`）
- 默认 density=compact（`data-density`）；颜色用 `--wa-*` / `--wa-shell-*`
- 内容区仅占位；禁止外网 CDN
- 响应式：≤768px 顶栏通栏（Logo + 菜单），轨与第二列一并进抽屉；面包屑下到内容区
- 交互：点轨切换第二列分组（`panelGroupKey`）；收起隐藏面板、保留轨；主色导航只换第一轨；其余同 `app-sidebar`（明暗、命令菜单、切框架、页顶进度条）

## 4. 视觉规格

- 侧栏 `flex-direction: row`：`--wa-shell-rail-width` + `--wa-shell-panel-width`
- 轨图标 36px；选中为浅主色底 + 描边，勿与 Logo 实心标同形
- 轨底头像区高度固定 `--wa-shell-rail-user-h`，顶部分隔线与悬停底铺满轨宽
- 第二列父级选中用实心底；子菜单无图标、无竖线，文字与父级标签左对齐，行高约 32px
- 收起宽度等于轨宽；`is-sider-primary` 只换第一轨，第二列保持浅色菜单
- 明暗 / 品牌跟随 `theme.js`
- 第二列内容是槽，不为任务/表单/列表各开一壳

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| brand | 轨顶 Logo 标 | Vibe Design 标 |
| rail | 分组图标轨 | 电商 / 项目 / 支付 / AI |
| panel | 当前分组菜单 + 子菜单 | 数据看板及子项；可换成任务列表（`dual-tasks`） |
| user | 轨底头像 | 个人主页 / 账号设置 / 改密 / 退出 |
| crumb | 顶栏面包屑 | 首页 › 分组 › 一级 › 子菜单 |
| toolbar | `?preset=toolbar` 面包屑下筛选条 | 状态 / 负责人 / 优先级 / 类型 / 日期 / 搜索；视图；批量下拉 |
| command | 顶栏搜索 → 命令菜单 | 同 app-sidebar |
| sider skin | 顶栏切换 | 浅色 ↔ 主色导航 |
| content | 主内容区 | 引导卡；窄屏结构示意在文案下方 |

## 6. 验收

- [ ] 与 §7 / 预览同一框架分区
- [ ] 无 ProShell 运行时、无 CDN、类名为 `wa-layout*`
- [ ] 点轨只换第二列；点子项才进页面
- [ ] 收起后仅轨可见，再点轨展开面板
- [ ] 亮/暗可读；窄屏抽屉含双列；主色导航对比足够
- [ ] **A**：已复用 `layouts/app-dual-rail/` 填槽

## 7. 参考结构（骨架）

```html
<div class="wa-layout wa-layout--side wa-layout--dual" data-density="compact">
  <div class="wa-layout__body">
    <aside class="wa-layout__sider">
      <div class="wa-layout__rail">
        <a class="wa-layout__brand wa-layout__brand--rail">{{brand mark}}</a>
        <nav class="wa-layout__rail-nav"><!-- {{rail groups}} --></nav>
      </div>
      <div class="wa-layout__panel">
        <div class="wa-layout__panel-title">{{group}}</div>
        <nav><!-- {{panel items}} --></nav>
      </div>
    </aside>
    <div class="wa-layout__main">
      <header class="wa-layout__navbar wa-layout__navbar--embedded">
        <a-breadcrumb><!-- {{crumb}} --></a-breadcrumb>
      </header>
      <main class="wa-layout__content">{{content}}</main>
    </div>
  </div>
</div>
```

## 8. 关联资源

| 类型 | 路径 | 说明 |
|------|------|------|
| list | `layouts/list.md` | 选模板清单；双列轨同类以本目录为源 |
| sibling | `layouts/app-sidebar/` | 单列通顶；本壳从此分叉 |
| sibling | `layouts/app-inset/` | 侧栏留白；单列侧栏变体 |
| component | `components/breadcrumb/default/` | 顶栏面包屑 |
| component | `components/card/default/` | 内容槽引导容器 |
| component | `components/command/shortcuts/` | 命令菜单 |
| density | `design-library/references/layout-density.md` | 密度与 Admin 契约 |
| animation | `assets/effects/dashed-orbit` | 引导卡虚线环 |
