# Vibe Design WEB · 与 Admin 跨端边界

**互鉴默认只谈结构、功能与工程契约；样式 / 气质允许且预期差异大。**

| | WEB（`PROJECT_PATH=web/`） | Admin（`PROJECT_PATH=admin/`） |
| --- | --- | --- |
| 母版 | `frame/web` | `frame/admin` |
| 壳 | `wa-layout*` / MarketingShell 等 | ProShell `pro-*` |
| Token | `--wa-*` | `--pro-*` |
| 规范库 | `ui-libs/vibe-design-web/*` | `ui-libs/arco-design-vue/*` |
| 路由 | 扁平 | modules + meta 菜单 |
| 适合 | 营销站、产品前台、少量控制台页 | 多页 CRUD、菜单中枢 |

## 可对齐（结构 / 契约）

- 侧栏通顶分区：brand / sider / navbar / content；窄屏抽屉行为可对标，皮不同。
- 列表 IA：筛 → 表 → 分页；主操作 1、次操作 ≤2。
- 表格列宽逻辑：见 `table.md`（弹性主列 + 其余钉宽）。
- 图表挂载约定：见 `charts.md`（系列色 `var(--chart-N)`、图例/圆环 class）；标题色条跟各端 primary。
- 禁 CDN；图标 FA Classic Pro。

## 禁止互换

- 同页双壳（ProShell + marketing-shell）。
- 把 Admin `pages.md` / `pro-*` 当 WEB 真源；或把营销 blocks 当 Admin CRUD 壳。
- 为「看起来像」强行拉齐圆角、密度、营销皮。
- 多页 CRUD + 菜单中枢仍硬做在 `web/`（应走 admin）。

## 例外（须用户点名）

- 主色阶 WEB→Admin 映射（只取阶，不取皮）→ Admin `style.md`。
- 控件皮肤回灌专项 → 以专项文档为准，禁止整文件拷营销胶囊。
