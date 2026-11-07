# Vibe Design WEB · 布局壳

适用于 `PROJECT_PATH=web/`。对照母版 `frame/web/layouts/`，工程实现为 Vue SFC，禁止粘贴母版 HTML / `window.*`，禁止改母版。

## 首期三壳

| siteKind / 场景 | 母版 slug | 工程组件 | 路由示意 |
| --- | --- | --- | --- |
| marketing | `marketing-shell` | `src/layouts/MarketingShell.vue` | `/` |
| product | `app-sidebar` | `src/layouts/AppSidebarLayout.vue` | `/app/*` |
| login | `login-shell` | `src/layouts/LoginShell.vue` | `/login` |

后置可选：`auth-split`（分栏登录）、`marketing-float`、其它 app-* 壳——按业务增量迁，不一次做全。

## 铁律

1. **禁混壳**：不得引入 Admin ProShell / `pro-layout` / `pro-*`。
2. 类名对齐母版：`wa-layout`、`wa-layout--site-marketing`、`wa-layout--side`、`wa-layout--site-login` 等。
3. 壳只负责导航/槽位；业务内容放 `views/`。
4. 样式真源：工程 `src/styles/layouts/*.css` 对照母版各壳 `layout.css`；token 用 `--wa-*`（`src/styles/common/global.css`）。

## 对照步骤

1. 打开 `frame/web/layouts/<slug>/index.html` + `layout.css` + `prompt.md`
2. 在工程壳组件中保留关键区域与 class
3. 交互（折叠、明暗、锚点）用 Vue composition 重写，不拷 `layout.js`
4. 与母版并排对照槽位（顶栏/侧栏/主列/页脚）

## 与 Admin 的边界

完整互鉴规则见 `cross-end.md`。摘要：

| | WEB | Admin |
| --- | --- | --- |
| 母版 | `frame/web` | `frame/admin` |
| 壳 | `wa-layout-*` | ProShell `pro-*` |
| 路由 | 扁平 | modules + meta 菜单 |

选型：多页 CRUD + 菜单中枢 → admin；营销/产品前台 → web。禁止同页双壳。
