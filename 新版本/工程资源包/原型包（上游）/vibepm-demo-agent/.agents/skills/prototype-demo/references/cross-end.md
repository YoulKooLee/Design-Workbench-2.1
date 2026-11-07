# WEB ↔ Admin 跨端对照与互用规则

**互鉴默认只谈结构、功能与工程契约；样式 / 气质允许且预期差异大。**  
不要为「看起来像」去拉齐圆角、密度、营销皮或 Pro 密排。

相关真源：

| 主题 | 路径 |
| --- | --- |
| 统一交付树 | `delivery-structure.md` |
| Admin 壳 / 挂载 | `admin/setup.md`（ProShell） |
| WEB 壳 / 套壳 | `web/pages.md` + `frame/web/layouts/` |
| 图表（挂载与类名约定） | `web/charts.md` ↔ `admin/charts.md` |
| 表格列宽（布局约定） | `web/table.md` |
| 控件皮肤回灌（**仅用户点名 / 专项**） | `design-library` → `web-to-admin-controls-sync.md` |
| 主色 WEB→Admin（**仅用户点名**） | `admin/style.md`「WEB / Style → Admin」 |

---

## 1. 一句话分工

| 端 | 壳是什么 | 适合 |
| --- | --- | --- |
| **admin** | **ProShell 运行时**（`shell.js` + `routes` + `auth` + `mountProPage`） | 多页 CRUD、菜单中枢、页签、登录闸、样板工业化 |
| **web** | **HTML 页面壳**（`layouts/*` 的 `wa-layout*` + 槽位） | 营销站、产品站、少量控制台页、壳变体试验 |

形态分区可对标（如 `app-sidebar` ↔ Admin `layoutMode=side`）≠ 实现互换，也 ≠ 视觉统一。

---

## 2. 结构 / 功能上应对齐

改一侧时对照另一侧，避免**信息架构、行为契约、工程约定**漂移。样式跟各端宿主。

| 层 | 对齐什么 | 不要求对齐 |
| --- | --- | --- |
| **交付树** | 同级 `*.html` + 根 `css|js` + `assets/` + `vendor/` | — |
| **vendor** | Vue / Arco / FA / Unovis 本地化、禁 CDN | 主题皮、圆角气质 |
| **图标** | FA + `fa-icons` 语义（`icon-*`） | 图标在顶栏/侧栏的装饰样式 |
| **壳分区（侧栏通顶）** | brand / sider / navbar / content；窄屏 ≤768：顶栏通栏 + 侧栏抽屉、面包屑下沉 | 侧栏色、选中态皮、密度 token |
| **布局模式模型** | Admin：`layoutMode` top/side；WEB：换 layout slug | 不要做成同一套热切换 UI |
| **菜单职责** | Admin：`routes.js` + `pageKey` 为真源；WEB：槽位/页内导航 | 假数据导航 ↔ routes |
| **挂载契约** | Admin：`mountProPage`；WEB：填槽 / `WebArco.mount`（预览壳不进业务） | 同名 `boot.js` 可互换 |
| **列表 / CRUD IA** | 筛 → 表 → 分页；加载/空态；主操作 1、次操作 ≤2 | `pro-*` DOM、搜索面板皮肤 |
| **表格列宽逻辑** | 多数列钉宽、1 列主字段弹性；勾选 `48`（`web/table.md`） | 表头/斑马纹/卡片化外观 |
| **图表能力** | `mount*Chart`、图例/圆环结构类名、520px 断点、系列色 `var(--chart-N)` | 卡片外框、标题色条跟哪套 primary |
| **登录形态** | 居中单卡 / 左右分栏 / 封面插画（分区） | login 插画风、表单圆角 |
| **顶栏能力** | 可有搜索、用户区、快捷跳转（能力清单） | command 菜单皮肤、图标排列 |
| **页顶进度** | 打开/刷新有进度示意 | 条样式、API 名 |
| **鉴权 / 页签** | Admin 有则走 `auth` / `tab-bar`；WEB 默认无 | 假装 layouts 已具备 |
| **配置** | `.admin-config.json` vs `.prototype-config.json` 各管各端 | 字段互通 |
| **字体目录** | `assets/fonts/<family>/` + `index.css` | 选用哪一族（跟 Style / 母版） |
| **换肤触发** | 仅用户明确要求 | 创建时强行两端同皮 |

---

## 3. 样式：默认分家

两端视觉差异大是正常的。下列**不要**当日常互鉴目标：

| 项 | Admin | WEB |
| --- | --- | --- |
| Token / 类前缀 | `--pro-*`、`pro-*` | `--wa-*`、`wa-layout*` |
| 密度 / 圆角 | Pro 密排、小圆角 | Style / 营销可更松 |
| 控件皮 | `arco-theme-pro` | Style + `components.css` 等 |
| 多品牌皮 | 不引入 | 母版可有 `themes/*`；**交付只烘焙一套** |
| 内容区皮肤 | `pages-common` + catalog | blocks/components，不拷 `pro-*` |

**例外（须用户点名或专项文档）**：

- 控件皮肤回灌 → sync 对照表（映射 token，禁止整文件/营销胶囊）  
- 主色阶 WEB→Admin PRESET（只取阶，不取皮）  
- 图表系列色与挂载约定（功能层，已在 `charts.md`）

---

## 4. 选型（形态相似时）

| 信号 | 选 |
| --- | --- |
| 多业务页、统一菜单、CRUD 样板、登录/页签 | **admin** |
| 少页产品站、壳变体（inset / dual-rail / 顶栏岛等）、营销+轻控制台 | **web** + `layouts/{slug}` |
| 「Admin 但换成 layouts 那种壳」 | **先改端为 web**，或「去 ProShell」专项（§5）；不是 admin 配置项 |

语境含糊 → **先问端别**。

---

## 5. 后期整合（按层抽结构/能力，不抽气质）

目标：**共享原语与 IA 规范**，保留两端皮肤与运行时。

### 5.1 可抽（优先结构 / 能力）

1. 交付树、vendor、字体目录约定  
2. 壳分区 + ≤768 行为（各端自己实现 DOM）  
3. 表格列宽逻辑（`web/table.md`）  
4. 图表挂载 API 与结构类名  
5. CRUD / 登录的**分区与流程**（不共享 CSS）  
6. 主色阶映射脚本（可选；仍禁止多皮进 Admin）

### 5.2 禁止合并

- `shell.js` ↔ `layouts/*/layout.js`  
- `theme.js` ↔ `arco-theme.js`  
- 配置文件字段互通  
- `--pro-*` / `--wa-*` 无映射混用  
- `pro-search-panel` 与营销 blocks 互拷皮肤  
- 为「统一观感」合并增页流水线  

### 5.3 Admin 要某 layout 的「结构」

| 路径 | 做法 |
| --- | --- |
| **A. 换端** | web + 目标 slug |
| **B. 去壳换壳** | 去掉 ProShell，接 layout 结构（须标明偏离 `setup.md`） |
| **C. 仅对齐分区/窄屏** | 留 ProShell，改 IA 行为（**推荐渐进**；不引入 `wa-layout` 双类名） |

**禁止**：ProShell 外包 `wa-layout` 当皮肤。

---

## 6. Agent 检查清单

- [ ] 跨端对照时优先核对 **分区 / 流程 / 挂载 / 配置**，未强行拉齐样式气质  
- [ ] 未因侧栏长得像就互换 ProShell 与 layouts，或同页双壳  
- [ ] 图表改结构/挂载约定时对照另一端 `charts.md`；未要求卡片皮一致  
- [ ] 列表互鉴只复用 IA（筛→表→分页），未整段拷 `pro-*` 或营销块皮肤  
- [ ] 控件回灌 / 主色 PRESET 仅在用户点名或走专项文档时做  
- [ ] 「Admin + layouts 壳」按 §4 / §5 选型并写进交付摘要  

---

## 7. 文档维护

- 新增跨端项 → 先归入 **§2（结构/功能）** 或 **§3（样式例外）**，再改各端文档。  
- 控件回灌批次 → 只维护 sync 文档。  
- 表格列宽 → 只维护 `web/table.md`。  
- 若抽 `frame/shared/`：只放无皮肤绑定的能力层；**不得**让两端互相 `script src` 对方壳文件。  
