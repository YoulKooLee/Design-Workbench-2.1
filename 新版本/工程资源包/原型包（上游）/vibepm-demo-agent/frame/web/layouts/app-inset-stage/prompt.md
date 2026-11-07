# 窄轨二级

> 状态：`preview`  
> slug：`app-inset-stage` · 类型：layout · 母版：`web` · surface：`app` · category：`sidebar`

## 1. 角色与目标

实现「窄轨二级」（`app-inset-stage`）：在 `app-inset` 留白岛结构上改为默认主色底、仅两级菜单——左侧窄轨一级（仅 LOGO；图标下两字）、顶栏二级分类（同源 `app-sidebar-stage` 的 `section-tabs`）。无侧栏收起展开；底栏仅搜索图标与头像；无页脚；窗口不滚动，滚动条在内容区右侧。

成功标准：主色底默认开启；侧栏窄轨约 72px；顶栏横向二级可切；窄屏抽屉；明暗可切；内容区独立滚动；主色底时内容岛顶部有内阴影，浅色导航无内阴影。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/app-inset-stage/` → **有则复用预览框架并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原框架信息架构。视觉跟宿主库。禁止外网 CDN。
- **样式落地**：多页共用允许交付内一份 `css/layout-app-inset-stage.css`；单页并入宿主 CSS。
- **脚本落地**：抽屉 / 窄屏 / 二级切换逻辑并入宿主 `js/<page>.js`；预览挂载框架不拷。

## 3. 约束

- 类名 `wa-layout*`；禁止拷 Admin ProShell 运行时（`shell.js` / `routes` / `pro-*`）
- 默认 density=compact；颜色用 `--wa-*` / `--wa-shell-*`（含 `--wa-shell-inset`）
- 内容槽沿用引导卡接法（非假看板）；岛内不再套第二层描边卡片
- **无**侧栏收起/展开；菜单仅两级
- 响应式：≤768px 内容岛仍留边；侧栏改抽屉；二级标签仍在顶栏
- 交互：明暗切换、侧栏主色/浅色背景切换（默认主色）、侧栏底搜索打开命令菜单（⌘/Ctrl+K）、顶栏图标打开框架抽屉；打开 / 刷新走 `spin-page`

## 4. 视觉规格

- 默认 `is-sider-primary`：整页底（除内容岛）铺 `--wa-shell-primary-bg`，侧栏透明贴底
- 侧栏顶仅 LOGO（无品牌文案）；一级为图标 + 下方两字简称（13px，不加粗）；图标约 15px
- 选中：图标换 `fa-solid`，外罩半透明实心圆（约 36px）；无菜单项外层底/阴影；文字不加粗
- 悬停：仅图标出现更淡的半透明圆，不铺整块项背景
- 顶栏左侧为二级 `section-tabs`（非面包屑）；右侧为框架切换 / 明暗 / 导航底色
- 侧栏底：仅搜索图标 + 头像
- 无页脚；`html/body` 禁窗口滚动，`.wa-layout__content` 纵向滚动
- **主色底**时内容岛顶部内阴影；**浅色导航**去掉内阴影，仅保留轻外阴影
- 引导卡右侧装饰用 `assets/effects/dashed-orbit`

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| brand | 侧栏顶仅 LOGO（可 `aria-label`） | Vibe Design |
| flatNav | 一级窄轨（图标 + 两字简称） | 数据 / 商品 / …（`short` 或取 label 前两字） |
| sectionTabs | 顶栏二级分类 | 当前一级下的子页 |
| user | 侧栏底仅头像触发用户菜单 | 个人主页 / 账号设置 / 改密 / 退出 |
| command | 侧栏底搜索图标 → 命令菜单 | 跳转导航 / 切主题 / 切导航背景 / 切框架 |
| sider skin | 顶栏切换按钮 | 浅色导航 ↔ 主色导航（默认主色，session 记忆） |
| toolbar | `?preset=toolbar` 面包屑下筛选条 | 状态 / 负责人 / 优先级 / 类型 / 日期 / 搜索；视图；批量下拉 |
| content | 岛内主内容 | 引导：标签 + 大标题 + 描述 + 步骤 |

## 6. 验收

- [ ] 与 §7 / 预览同一框架分区（主色窄轨、顶栏二级、内容岛）
- [ ] 无折叠控件、无页脚、窗口无滚动条、内容区有滚动条
- [ ] 选中为半透明圆 + 实心图标；浅色导航无内容岛内阴影
- [ ] 无 ProShell 运行时、无 CDN、类名为 `wa-layout*`
- [ ] 亮/暗可读；窄屏抽屉可用；默认主色导航对比足够
- [ ] **A**：已复用 `layouts/app-inset-stage/` 填槽
- [ ] 画廊卡 `layouts/index.html` 使用 `wa-lg-mini--inset-stage` 缩略

## 7. 参考结构（骨架）

```html
<div class="wa-layout wa-layout--inset wa-layout--inset-stage is-sider-primary" data-density="compact">
  <div class="wa-layout__body">
    <aside class="wa-layout__sider">
      <a class="wa-layout__brand" aria-label="{{brand}}"><!-- mark only --></a>
      <nav><!-- {{flatNav}} 图标 + 两字 --></nav>
      <div class="wa-layout__sider-tail">
        <button class="wa-layout__sider-search" aria-label="搜索">{{command}}</button>
        <div class="wa-layout__user"><!-- avatar only -->{{user}}</div>
      </div>
    </aside>
    <div class="wa-layout__main">
      <div class="wa-layout__stage">
        <header class="wa-layout__navbar wa-layout__navbar--embedded">
          <nav class="wa-layout__section-tabs"><!-- {{sectionTabs}} --></nav>
          {{actions}}
        </header>
        <main class="wa-layout__content">{{content}}</main>
      </div>
    </div>
  </div>
</div>
```

## 8. 关联资源

| 类型 | 路径 | 说明 |
|------|------|------|
| list | `layouts/list.md` | 库存与选模板 |
| gallery | `layouts/index.html` | 画廊卡 + `wa-lg-mini--inset-stage` |
| sibling | `layouts/app-inset/` | 留白岛结构源 |
| sibling | `layouts/app-sidebar-stage/` | 顶栏二级 `section-tabs` 同源 |
| component | `components/command/shortcuts/` | 侧栏底搜索弹出的命令菜单 |
| density | `design-library/references/layout-density.md` | 密度与 Admin 契约 |
| animation | `assets/effects/dashed-orbit` | 引导卡右侧虚线环 |
| catalog | `layouts/catalog.json` → `layouts[]` · `app-inset-stage` | 结构宿主登记 |
