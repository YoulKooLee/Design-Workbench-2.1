# 双层顶栏框架

> 状态：`preview`  
> slug：`app-stacked-nav` · 类型：layout · 母版：`web` · surface：`app` · category：`topnav`

## 1. 角色与目标

实现「双层顶栏框架」（`app-stacked-nav`），用于无侧栏控制台：**顶栏**含品牌 + **一级横向菜单** + 全局操作；**第二层**为当前一级对应的二级菜单。

成功标准：分区为 global navbar（含 L1）/ L2 sub navbar / content；无 sider；类名 `wa-layout wa-layout--top wa-layout--stacked`；内容槽为引导卡。

## 2. 实现路径

- **A**：复用 `layouts/app-stacked-nav/` 预览框架并按 §5 填槽。
- **B**：其它栈只还原信息架构；禁止外网 CDN。

## 3. 约束

- 类名 `wa-layout*`；默认 `data-density=compact`；颜色 `--wa-*` / `--wa-shell-*`
- 无侧栏、无 `wa-layout__sider`；顶栏一级溢出收进「更多」（对齐 `app-top-only`）；第二层二级可横向滚动
- 窄屏：隐藏顶栏一级与第二层，汉堡打开下拉导航抽屉（分组 + 展开子项，对齐 `app-top-only`）
- 交互：点击一级 → 第二层换成该项子菜单，并默认选中第一个子项；明暗（`data-wa-theme-toggle`）、通栏主色/浅色（`is-navbar-primary` **只铺第一层**，第二层始终表面色）、命令菜单（⌘/Ctrl+K）、框架切换抽屉、`spin-page` 页顶进度条
- `?preset=toolbar` 仅在**内容区**面包屑下出现筛选条

## 4. 顶栏分层

| 层 | 类名 | 默认 | 说明 |
|----|------|------|------|
| 1 | `wa-layout__navbar--global` | 是 | 品牌 + **一级菜单**（`wa-layout__topnav`）+ 搜索 / 主题 / 切壳 / 用户 |
| 2 | `wa-layout__navbar--sub` | 有子项时 | **二级菜单**；随一级切换而更换 |

面包屑留在主列顶部（`wa-layout__page-crumb`）。

## 5. 可变槽位

| 槽位 | 说明 |
|------|------|
| brand | 顶栏左侧产品名 |
| flatNav / L1 | 顶栏中间一级入口（`wa-layout__topnav`） |
| secondaryNav / L2 | 第二层子菜单（`navbar--sub`） |
| crumb | 内容区顶部面包屑 |
| toolbar | `?preset=toolbar` 内容区筛选条 |
| content | 引导卡（kicker「双层顶栏」） |

## 6. Preset 查询参数

| preset | 效果 |
|--------|------|
| （无） | 顶栏一级 + 第二层二级 + 内容区面包屑 |
| `toolbar` | 内容区 toolbar |

## 7. 参考结构

```html
<div class="wa-layout wa-layout--top wa-layout--stacked" data-density="compact">
  <header class="wa-layout__navbar wa-layout__navbar--global">
    {{brand}}
    <nav class="wa-layout__topnav">{{一级横向导航}}</nav>
    {{actions}}
  </header>
  <nav class="wa-layout__navbar wa-layout__navbar--sub">{{二级横向导航}}</nav>
  <div class="wa-layout__body">
    <div class="wa-layout__main">
      <main class="wa-layout__content">
        <a-breadcrumb />
        <div v-if="toolbar" class="wa-layout__toolbar" />
        {{content}}
      </main>
    </div>
  </div>
</div>
```

## 8. 关联

| 路径 | 说明 |
|------|------|
| `layouts/list.md` | 库存 |
| `layouts/app-topnav/` | 分叉源（去 sider、加 stacked 导航） |
| `layouts/app-top-only/` | 同属无侧栏顶栏族（一级在顶栏、子项用下拉；窄屏汉堡抽屉） |
