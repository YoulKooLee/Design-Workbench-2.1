# WEB 页面壳清单

权威目录：`frame/web/layouts/`。登记：`layouts/catalog.json` → `layouts[]`（**仅结构宿主**）。  
交付默认壳（用户未点名）：`_meta/config.json` 的 `layoutDefault` = `app-sidebar`。  
**新建 / 分叉壳：不要一律复制 `app-sidebar`。** 按「选模板」取结构最接近的已有目录整份复制。勿从空白 HTML 起手。细则真源为本文件。

## 展示形态（对齐 TypeUI）

[TypeUI](https://www.typeui.sh) 是 **栏目页 + 变体卡片网格**：Sidebars / Navbars / Application Shells 各一页，每张卡一个示意图，点进去看完整示例。卡片彼此独立展示，并不等于背后各有一套互不相干的工程。

我们同一套形态：

| 层 | TypeUI | 本母版 |
|----|--------|--------|
| 栏目 | Sidebars、Navbars、Application Shells | 侧栏框架 / 顶栏框架 / 站点框架（画廊标签与标题后的数字为该类卡片数量；不单开「整页/Shell」栏目） |
| 卡片 | 网格里每一例（含只换菜单、底卡的） | **展示变体**：结构壳或菜单 preset，清单和画廊各一张卡 |
| 详情 | 点卡片进该例 | 结构壳 → `layouts/{slug}/`；菜单变体 → 宿主页 `?preset=` |
| 工程 | （对方组件库自己的拆法） | **一结构一目录**；菜单变体只换槽数据，不拷 HTML |

所以：要 TypeUI 那种「分类下面一排变体卡」，不是「每个菜单套新建一个框架页」。`app-inset` 主列成岛仍是结构壳，单独目录、单独卡。

画廊页（[`layouts/index.html`](./index.html) 或官网 `/layouts`）与壳内「切换框架」都按 **栏目分组**，组内先结构壳、再该宿主的 preset。preset 卡片标题写槽差异（如「侧栏底用量」「侧栏底账号卡」），副标题统一为 `{宿主slug} · 变体`（与结构卡 `{slug} · 结构` 对齐）。画廊未接槽的 preset / 规划壳先灰色占位，不进 `catalog.layouts[]`。

`catalog.layouts[]` 只登记结构宿主，供交付套壳。preset 只写在本清单与预览数据里，不要进 `layouts[]` 冒充新壳。

## 结构宿主 vs 展示变体

| | 结构宿主 | 展示变体（preset） |
|--|--|--|
| 何时 | 分区变了 | 分区不变，只换菜单树、组、底栏卡、存储条等 |
| 磁盘 | `layouts/{slug}/` | 不新建目录 |
| 画廊 / 清单 | 一张卡 | 一张卡（标明宿主） |
| 切换列表 | 分在对应栏目下 | 同一栏目下，跟在宿主后面 |
| catalog | `layouts[]` | 否 |
| 例子 | `app-inset`、`app-topnav`、`app-dual-rail` | TypeUI 侧栏底用量条 / 账号卡 |

## 选模板

1. 先判断是 **新分区（开结构宿主）** 还是 **展示变体（preset）**。后者不新建目录。
2. 开壳时对照「已有」表，选 **分区形态最近** 的一条复制（`index.html` + `layout.css` + `layout.js` + `prompt.md` + `meta.yaml`）。
3. 对不上再看「规划」表里的推荐模板；仍对不上才回退 `app-sidebar`。
4. 同类已有更近的壳时，**禁止**再从 `app-sidebar` 重写一遍（例如多层顶栏从 `app-topnav` 分叉）。

| 目标结构 | 复制自 |
|----------|--------|
| 左侧单列导航通顶 + 嵌入顶栏 | `app-sidebar` |
| 左侧灰底 + 右侧白台工作台 | `app-sidebar-stage` |
| 同上，但主列成岛、周边留白 | `app-inset` |
| 主色留白岛 + 窄轨一级（图标下两字）+ 顶栏二级（无折叠） | `app-inset-stage` |
| 通栏顶栏含品牌，侧栏在顶栏下 | `app-topnav` |
| 图标轨 + 第二列面板 + 主列 | `app-dual-rail` |
| 图标文字模块轨 + 第二列 + 主列 | `app-icon-rail` |
| 悬浮圆形品牌 + 胶囊图标岛（无第二列） | `app-icon-island` |
| 顶栏圆形品牌 + 横向胶囊图标岛（无侧栏） | `app-top-island`（从 `app-icon-island` 分叉） |
| 左导航 + 主列 + 右侧边栏 | `app-sidebar` · `?preset=right-rail`（槽，不单开目录） |
| 2～3 层通栏顶栏 | `app-topnav` |
| 顶栏下独立页签条 | `app-topnav` |
| 通栏顶栏、无侧栏 | `app-topnav`（落地 `app-top-only`） |
| 营销顶栏+页脚（通栏） | `marketing-shell`（`surface: marketing`，`category: shell`） |
| 营销悬浮导航条 | `marketing-float`（从 `marketing-shell` 分叉；整条胶囊悬浮） |
| 文档/内容版心 | `docs-shell`（`surface: general`） |
| 登录（居中单卡） | `login-shell`（`surface: general`，`category: shell`） |
| 登录（左右分栏） | `auth-split`（从 `login-shell` 分叉） |

内容槽沿用引导卡（标签 + 页头 + 描述 + 步骤），禁止假看板。类名 `wa-layout-*`，密度 compact（`surface: app`）。  
**结构示意**：侧栏类宿主共用同一套示意（文案「侧栏框架 · 结构示意」）；顶栏类一律用 `wa-layout__guide-mock--top`（文案「顶栏框架 · 结构示意」）。勿再按壳做定制示意。  
**引导步骤**：四步文案各壳共用；**页头导语（lead）**按壳写结构差异。

## 已有结构宿主

| slug | 中文名 | 展示栏目 | category | 状态 | 结构 |
|------|--------|----------|----------|------|------|
| `app-sidebar` | 侧栏通顶 | 侧栏框架 | `sidebar` | preview | 左导航通顶 + 嵌入顶栏 + 主列；交付默认 |
| `app-sidebar-stage` | 灰栏工作台 | 侧栏框架 | `sidebar` | preview | 左灰底导航 + 右白台；搜索在 LOGO 右 |
| `app-inset` | 侧栏留白 | 侧栏框架 | `sidebar` | preview | 侧栏贴底；主列表面岛 |
| `app-inset-stage` | 窄轨二级 | 侧栏框架 | `sidebar` | preview | 主色留白岛；窄轨一级（图标下两字）+ 顶栏二级；底仅搜索图标/头像；内容区滚动 |
| `app-dual-rail` | 图标双轨 | 侧栏框架 | `sidebar` | preview | 图标轨 + 第二列槽 + 主列 |
| `app-icon-rail` | 文字双轨 | 侧栏框架 | `sidebar` | preview | 带文字模块轨（看板/项目/笔记/设置等）+ 第二列 + 主列 |
| `app-icon-island` | 图标岛侧栏 | 侧栏框架 | `sidebar` | preview | 悬浮圆形品牌 + 胶囊图标岛；无第二列 |
| `app-topnav` | 通栏顶栏 | 顶栏框架 | `topnav` | preview | 通栏顶栏 + 顶下侧栏 + 主列 |
| `app-module-nav` | 顶栏模块导航 | 顶栏框架 | `topnav` | preview | 顶栏一级模块 + 左侧当前模块菜单（默认展开） |
| `app-top-only` | 无侧栏通栏 | 顶栏框架 | `topnav` | preview | 通栏顶栏 + 水平主导航，无侧栏 |
| `app-stacked-nav` | 双层顶栏 | 顶栏框架 | `topnav` | preview | 顶栏（品牌+一级+操作）+ 第二层二级 |
| `app-top-island` | 图标岛顶栏 | 顶栏框架 | `topnav` | preview | 左品牌 + 居中带文字胶囊岛 + 右操作；无侧栏 |
| `marketing-shell` | 营销顶栏页脚 | 站点框架 | `shell` | preview | 通栏营销顶 + 主列 + 页脚；comfortable |
| `marketing-float` | 悬浮导航条 | 站点框架 | `shell` | preview | 整条悬浮胶囊导航 + 主列 + 页脚；从 marketing-shell 分叉 |
| `docs-shell` | 文档内容壳 | 站点框架 | `shell` | preview | 限宽三栏 + 悬浮胶囊顶栏（品牌/搜索/站点导航）；general |
| `login-shell` | 登录框架 | 站点框架 | `shell` | preview | 无主导航，居中登录表单；general |
| `auth-split` | 分栏登录 | 站点框架 | `shell` | preview | 左品牌叙事 + 右登录表单；从 login-shell 分叉 |

## 画廊栏目（规划）

卡片都要能点开展示；标「preset」的不新建目录。

### 侧栏框架

| 卡片 | 类型 | 宿主 | 说明 |
|------|------|------|------|
| 侧栏通顶 | 结构 | `app-sidebar` | 默认菜单 |
| 灰栏工作台 | 结构 | `app-sidebar-stage` | 左灰右白，顶栏子菜单标题 |
| 侧栏留白 | 结构 | `app-inset` | 主列成岛 |
| 窄轨二级 | 结构 | `app-inset-stage` | 主色窄轨（图标下两字）+ 顶栏二级；底仅搜索图标/头像 |
| 图标双轨 | 结构 | `app-dual-rail` | 分组图标轨 + 第二列菜单 |
| 文字双轨 | 结构 | `app-icon-rail` | 看板/日历/文件/笔记/成员/通知/收藏/表单/设置，图标下文字 |
| 图标岛侧栏 | 结构 | `app-icon-island` | 悬浮圆形品牌 + 胶囊图标岛，无第二列 |
| 侧栏提示卡 | preset | `app-sidebar` | 导航区告警/用量 |
| 侧栏底用量 | preset | `app-sidebar` | 底扩展槽：存储/额度条 |
| 侧栏底账号卡 | preset | `app-sidebar` | 底扩展槽：计划/账号卡 |
| 侧栏底任务 | preset | `app-sidebar` | `?preset=sider-tasks`，用户区上方任务列表 |
| 侧栏底消息 | preset | `app-sidebar` | `?preset=sider-messages`，用户区上方消息列表 |
| 默认图标轨 | preset | `app-sidebar` | 收起态作为默认展示 |
| 筛选工具条 | preset | `app-sidebar` | `?preset=toolbar`，矮控件筛选条 + 批量下拉；其它壳亦可挂 |
| 右侧边栏 | preset | `app-sidebar` | `?preset=right-rail`，主列旁宽栏详情 |

### 顶栏框架

| 卡片 | 类型 | 宿主 | 说明 |
|------|------|------|------|
| 通栏顶栏 | 结构 | `app-topnav` | 顶下仍有侧栏 |
| 顶栏模块导航 | 结构 | `app-module-nav` | 顶栏一级模块 + 左侧展开菜单 |
| 无侧栏通栏 | 结构 | `app-top-only` | 从 `app-topnav` 去 sider |
| 顶栏全局菜单 | 结构 | `app-top-menu` | LOGO 左菜单图标展开产品列表 |
| 双层顶栏 | 结构 | `app-stacked-nav` | 顶栏一级 + 第二层二级，无侧栏 |
| 图标岛顶栏 | 结构 | `app-top-island` | 左品牌 + 居中带文字胶囊岛，无侧栏 |
| 筛选工具条 | preset | `app-topnav` | `?preset=toolbar`，主列面包屑下 |
| 通栏多页签 | preset | `app-topnav` | `?preset=tabs`，主列顶页签条（表面底；点菜单新增页签） |
| 模块导航多页签 | preset | `app-module-nav` | `?preset=tabs`，模块顶栏 + 左栏菜单 + 主列页签 |
| 分类标签 | preset | `app-module-nav` | `?preset=category`，主列顶：左分类标签 + 右刷新 |
| 右侧边栏 | preset | `app-topnav` | `?preset=right-rail`，通栏下左栏 + 主列 + 右侧边栏 |
| 右侧工具栏 | preset | `app-topnav` | `?preset=aside-tools`，顶下贴右窄轨图标工具 |
| 区域切换 | preset | `app-topnav` | `?preset=region` |

### 站点框架

| 卡片 | 类型 | 宿主 | 说明 |
|------|------|------|------|
| 营销顶栏页脚 | 结构 | `marketing-shell` | 通栏营销顶 + 主列区块流 + 页脚；`surface: marketing` |
| 悬浮导航条 | 结构 | `marketing-float` | 整条悬浮胶囊导航 + 主列 + 页脚；勿与 `app-top-island` 混用 |
| 文档内容壳 | 结构 | `docs-shell` | 限宽三栏 + 悬浮胶囊顶栏（品牌/搜索/站点导航）；`surface: general` |
| 登录框架 | 结构 | `login-shell` | 无主导航，居中表单/空状态 |
| 分栏登录 | 结构 | `auth-split` | 左品牌叙事区 + 右登录表单；从 `login-shell` 分叉 |

## 规划开壳（分区变了）

| 顺序 | slug | 中文名 | 展示栏目 | category | 复制自 |
|------|------|--------|----------|----------|--------|
| 1 | `app-dual-rail` | 图标双轨 | 侧栏框架 | `sidebar` | （已完成）`app-sidebar` |
| 2 | — | toolbar | 侧栏框架卡片 | — | 槽已接；画廊挂 `app-sidebar` · `?preset=toolbar` |
| 3 | — | 右侧边栏 | 侧栏框架卡片 | — | 槽已接；画廊挂 `app-sidebar` · `?preset=right-rail`；顶栏宿主见 `app-topnav` · `?preset=right-rail` |
| 4 | `app-icon-rail` | 文字双轨 | 侧栏框架 | `sidebar` | （已完成）从 `app-dual-rail` 分叉；看板/日历/文件/笔记/成员/通知/收藏/表单/设置 |
| 4c | `app-icon-island` | 图标岛侧栏 | 侧栏框架 | `sidebar` | （已完成）从 `app-icon-rail` 分叉；悬浮胶囊岛 |
| 4c2 | `app-top-island` | 图标岛顶栏 | 顶栏框架 | `topnav` | （已完成）从 `app-icon-island` 分叉；岛移至顶栏 |
| 4d | `app-sidebar-stage` | 灰栏工作台 | 侧栏框架 | `sidebar` | （已完成）从 `app-sidebar` 分叉；左灰右白 |
| 4e | `app-inset-stage` | 窄轨二级 | 侧栏框架 | `sidebar` | （已完成）从 `app-inset` 分叉；顶栏二级同源 `app-sidebar-stage` |
| 4b | — | 提示 / 底扩展 / 默认收起 | 侧栏框架卡片 | — | `app-sidebar`：`sider-alert` / `sider-storage` / `sider-account` / `sider-collapsed` / `sider-tasks` / `sider-messages` |
| 5 | `app-stacked-nav` | 多层顶栏 | 顶栏框架 | `topnav` | （已完成）`app-topnav` |
| 8 | `app-top-only` | 无侧栏通栏 | 顶栏框架 | `topnav` | （已完成）`app-topnav`（去掉 sider） |
| 8b | `app-top-menu` | 顶栏全局菜单 | 顶栏框架 | `topnav` | （已完成）`app-top-only` + LOGO 左菜单面板 |
| 9 | `marketing-shell` | 营销顶栏页脚 | 站点框架 | `shell` | （已完成）勿从 App 复制；`surface: marketing` |
| 9b | `marketing-float` | 悬浮导航条 | 站点框架 | `shell` | （已完成）从 `marketing-shell` 分叉 |
| 10 | `docs-shell` | 文档内容壳 | 站点框架 | `shell` | （已完成）`surface: general` |
| 11 | `login-shell` | 登录框架 | 站点框架 | `shell` | （已完成）`surface: general` |
| 11b | `auth-split` | 分栏登录 | 站点框架 | `shell` | （已完成）从 `login-shell` 分叉 |

## 规划加槽（preset 的数据面）

槽做在宿主上，画廊用 preset 卡露出。不要按 Mailbox / Music / Crypto 拆目录。

### 侧栏槽

| 槽 | 位置 | 用途 |
|----|------|------|
| 侧栏提示卡 | 导航上方或组间 | 告警、用量、存储 |
| 侧栏通知 / 会话摘要 | 导航与底栏之间 | 通知、未读、联系人 |
| 侧栏底扩展 | 用户卡片上方 | 计划、额度；另有 `sider-tasks` / `sider-messages` |
| 表单面板 | `app-icon-rail` 第二列 | `?panel=form`，轨上「表单」入口 |
| 模块面板 | `app-icon-rail` 第二列 | 看板 / 日历 / 文件 / 笔记 / 成员 / 通知 / 收藏 / 表单 / 设置，由第一轨切换 |

`app-dual-rail` 第二列默认菜单树。任务/消息列表走 `app-sidebar` 的 `sider-tasks` / `sider-messages`。模块切换走 `app-icon-rail`；表单用 `?panel=form`。收起成图标轨是 `?preset=sider-collapsed`。

### 顶栏 / 主列槽

| 槽 | 位置 | 用途 | 优先挂 |
|----|------|------|--------|
| 顶栏模块导航 | 顶栏一级 + 左栏 | 模块切换 + 展开菜单 | `app-module-nav` |
| `toolbar` | 面包屑下、内容上 | 筛选、批量、视图切换 | 画廊：`app-sidebar` / `app-topnav` · `?preset=toolbar` |
| 通栏多页签 | 主列顶（侧栏右侧） | 可关闭页签条，对齐 Admin TabBar | `app-topnav` · `?preset=tabs` |
| 模块导航多页签 | 主列顶（模块顶栏 + 左栏） | 同上，宿主为模块导航 | `app-module-nav` · `?preset=tabs` |
| 分类标签 | 主列顶（同多页签条） | 左分类（下划线）+ 右刷新 | `app-module-nav` · `?preset=category` |
| 右侧边栏 | 主列旁 / 顶下贴右宽栏 | 当前项详情（非窄轨工具） | `app-sidebar` / `app-topnav` · `?preset=right-rail` |
| 右侧工具栏 | 顶下贴右 | 窄轨快捷入口（支持/文档/设置等） | `app-topnav` · `?preset=aside-tools` |
| 区域切换 | 品牌旁 | 区域、租户 | `app-topnav` · `?preset=region` |

Toast 用全局反馈控件，不进布局槽。

## 已删除

不再画廊上架，宿主也不再接对应 preset。勿恢复。

| 卡片 | 原类型 | 原接法 | 删除内容 |
|------|--------|--------|----------|
| 侧栏头操作 | preset | `app-sidebar` · `?preset=sider-head` | 品牌下搜索/新建槽、`wa-layout__sider-tools` |
| 公告条 | preset | 各壳 · `?preset=banner` | 壳顶 `banner` 槽、`wa-layout__banner` |
| 指标细条 | preset | 各壳 · `?preset=metrics` | 主列 `metrics` 槽、`wa-layout__metrics` |
| 分离页签 | 结构（规划） | `app-tabs-shell` | 与顶栏 `?preset=tabs` 重叠；页签只挂 `app-topnav` / `app-module-nav`，不单开壳 |
| 整页框架栏目 | 画廊栏目 | `cat-shell` | 右侧边栏改挂侧栏·顶栏 preset；不再单开 Shell 栏目 |
| `app-right-rail` / `app-split` | 结构目录 | 曾独立壳 | 右侧边栏并入 `app-sidebar` / `app-topnav` · `?preset=right-rail`；分栏变体已删除 |
| 主列分栏 | preset | `app-sidebar` · `?preset=split` | 价值不高，已删槽与画廊卡 |
| 双层顶栏 + 主列分栏 | preset | `app-stacked-nav` · `?preset=split` | 价值不高，已删槽与画廊卡 |

## 不做

- 不为 Storage / Alert / Mailbox / Music / Crypto 各开一页壳
- 不为第二列里的任务、表单、列表各开一套双轨壳；模块入口用 `app-icon-rail`，不要做成 `app-dual-rail` 的多个 typed preset
- 不为「右侧边栏」再拷目录；侧栏 / 顶栏宿主一律 `?preset=right-rail`，画廊卡同名
- 不为「主列分栏」「双层+分栏」恢复 preset 或画廊卡
- 不为分离页签再开 `app-tabs-shell`；主列页签用顶栏 `?preset=tabs`
- 不为通栏 vs 悬浮只换圆角再拆第三套营销壳；分栏认证用 `auth-split`，勿塞进 `login-shell`
- 不把 `marketing-float` 做成 App `app-top-island` 的变体
- 不把 preset / 组合卡写进 `catalog.layouts[]`
- 不恢复已删除的侧栏头操作、公告条、分离页签、整页框架画廊栏目、主列分栏变体
- 营销壳密度 comfortable，勿把 App compact 写进营销顶栏
- 不跟 TypeUI 视觉皮肤；只对齐 **栏目 + 变体卡片** 的展示结构；`wa-layout-*`
