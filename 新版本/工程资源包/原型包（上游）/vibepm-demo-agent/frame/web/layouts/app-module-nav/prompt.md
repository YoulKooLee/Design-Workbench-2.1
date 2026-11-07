# 顶栏模块导航

> 状态：`preview`  
> slug：`app-module-nav` · 类型：layout · 母版：`web` · surface：`app` · category：`topnav`

## 1. 角色与目标

实现「顶栏模块导航」（`app-module-nav`）：**顶栏一级模块**（电商运营 / 项目管理 / 支付中心 / AI 对话）+ **左侧当前模块菜单**（默认全部展开）+ 主列内容。由原 `app-topnav?preset=icon-nav` 升为独立结构。

成功标准：类名 `wa-layout wa-layout--top wa-layout--module-nav`；顶栏切换一级只换左侧菜单树；子项进页面；无假数据看板。

## 2. 实现路径

- **A**：复用 `layouts/app-module-nav/` 预览框架并按 §5 填槽。
- **B**：其它栈只还原信息架构；禁止外网 CDN。

## 3. 约束

- 类名 `wa-layout*`；默认 `data-density=compact`；颜色 `--wa-*` / `--wa-shell-*`
- 顶栏一级为模块级；左侧仅为当前模块下的菜单项 + 子项
- 进入页或切换一级时，左侧菜单**默认全部展开**（仍可手动收起单项）
- 窄屏：汉堡打开顶栏下方菜单面板（对齐 `app-top-only`），按一级模块分组；列表默认不全部展开
- 交互：明暗、顶栏主色/浅色、命令菜单、框架切换抽屉、`spin-page`

## 4. 分区

| 区 | 类名 | 说明 |
|----|------|------|
| 顶栏 | `wa-layout__navbar--global` | 品牌 + 一级模块（`wa-layout__group-nav`）+ 操作 |
| 侧栏 | `wa-layout__sider` | 当前一级下的菜单，默认展开（桌面） |
| 窄屏菜单 | `wa-layout__mobile-nav` | 顶栏下拉面板，按一级模块分组 |
| 主列 | `wa-layout__content` | 面包屑 + 业务内容槽 |

## 5. 可变槽位

| 槽位 | 说明 |
|------|------|
| brand | 顶栏左侧 |
| groupNav | 顶栏一级模块 |
| siderNav | 当前模块菜单 |
| crumb / toolbar | 内容区可选 |
| tabs | `?preset=tabs` 模块导航多页签（主列顶） |
| category | `?preset=category` 分类标签条（左分类 + 右刷新） |
| content | 引导卡（kicker「顶栏模块导航」） |

## 6. Preset

| preset | 效果 |
|--------|------|
| `toolbar` | 内容区筛选条 |
| `tabs` | 模块导航多页签：点左侧/顶栏模块菜单新增或激活页签；滚动 / 关闭 / 右键 / 全部标签 |
| `category` | 分类标签：主列顶同多页签条宿主；左侧为当前菜单子项分类（下划线选中）；右侧刷新按钮 |

## 7. 参考结构

```html
<div class="wa-layout wa-layout--top wa-layout--module-nav">
  <header class="wa-layout__navbar wa-layout__navbar--global">
    {{brand}}
    <nav class="wa-layout__group-nav">{{一级模块}}</nav>
    {{actions}}
  </header>
  <div class="wa-layout__body">
    <aside class="wa-layout__sider">{{当前模块菜单，默认展开}}</aside>
    <main class="wa-layout__content">{{content}}</main>
  </div>
</div>
```

## 8. 关联

| 路径 | 说明 |
|------|------|
| `layouts/app-topnav/` | 分叉源 |
| `layouts/list.md` | 库存 |
