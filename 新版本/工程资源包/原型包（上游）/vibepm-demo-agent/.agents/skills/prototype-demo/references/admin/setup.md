# 后台模板 Setup（统一入口）

本文是 admin **挂载与工程约定**的唯一 Setup 文档。按 `admin/.admin-config.json` 的 `theme` / `frameworkId` 阅读对应章节。

| theme | 框架目录 | 本章节 |
| --- | --- | --- |
| `arco`（默认） | `frame/admin/` | [Arco Design Pro](#theme--arcoarco-design-pro) |

**新增框架接入**：在 `frame/` 根下建库并登记 `index.json` → 补 `_meta/template.manifest.json` + `pages.catalog.json` → **在本文增加一节**（脚本顺序、CSS 顺序、挂载 API、登录页、增页检查、禁止项），并更新上表与 `design-system-index.md`。不要另建 `xxx-setup.md`。

选型见 `design-system-index.md`；page-type 见 `pages.md`。

---

## theme = `arco`（Arco Design Pro）

Theme = `arco` 时遵循本节。模板：`frame/admin/`；Meta：`frame/admin/_meta/`（含 `pages.catalog.json`）。

### 架构

- **多 HTML 静态页**，每页独立入口
- 共享 Shell：`assets/common/js/boot.js` + `assets/common/js/shell.js`（`ProShell`）
- 菜单/路由：`assets/common/js/routes.js`（运行时 `ArcoProRoutes`；**须导出** `VibePMProRoutes` 供 Vibe Pack 扫描，见 `vibe-pack/references/admin-pro-routes-contract.md`）
- 鉴权：`assets/common/js/auth.js`
- 配置：`assets/common/js/settings.js`（`ArcoProSettings`）
- 图标：`assets/common/js/fa-icons.js`（`icon-*` → Font Awesome）
- HTML 生成：`scripts/generate-html.mjs`
- 目录树：`../delivery-structure.md`（共享进 `assets/common/`，页级留扁平 `css/` + `js/`）
- **与 WEB layouts**：形态可对齐，**不**用 `frame/web/layouts` 替代 ProShell；互鉴 / 整合见 `../cross-end.md`

### 壳核心 vs 按需（挂载分层）

| 档 | 资源 | 何时挂 |
| --- | --- | --- |
| **壳核心 CSS** | `fa-icons.css` → `arco-theme-pro.css` → `layout.css` → `pages-common.css` | 几乎所有 ProShell 业务页 |
| **壳核心 JS** | `fa-icons` → `settings` → `locale` → `auth` → `routes` → `arco-theme` → `shell` → `boot` | 几乎所有 ProShell 业务页（`chart-palette` 由 `arco-theme.js` 自动注入） |
| **按需 · 进度条** | `assets/common/progress/*`（`page-progress-early` 在 head） | 要页顶进度的业务页（多数 dashboard） |
| **按需 · 页签** | `assets/common/js/tab-bar.js` | 开启多页签时 |
| **按需 · 图表** | `vendor/unovis` + `assets/common/charts/*` | 含图表的页 |
| **按需 · 头像裁剪** | `assets/common/js/avatar-crop.js` | 用户设置等少数页 |
| **按需 · 假数据** | `assets/common/js/mock-data.js` | 原型列表/看板等需要共享 mock 时 |
| **登录** | 无 ProShell；`css/login-*.css`（`@import login-shared`）+ 精简 JS（settings/locale/auth/arco-theme + 页级） | 仅登录三页 |

### 脚本顺序（业务页 `<body>` 末尾）

```html
<script src="./vendor/vue/vue.global.prod.js"></script>
<script src="./vendor/arco/arco-vue.min.js"></script>
<!-- 壳核心 -->
<script src="./assets/common/js/fa-icons.js"></script>
<script src="./assets/common/js/settings.js"></script>
<script src="./assets/common/js/locale.js"></script>
<script src="./assets/common/js/auth.js"></script>
<script src="./assets/common/js/routes.js"></script>
<script src="./assets/common/js/mock-data.js"></script>  <!-- 按需 -->
<script src="./assets/common/js/arco-theme.js"></script>
<!-- chart-palette.js 由 arco-theme.js 自动注入，无需手写 -->
<script src="./assets/common/js/shell.js"></script>
<script src="./assets/common/js/tab-bar.js"></script>  <!-- 按需：多页签 -->
<script src="./assets/common/js/boot.js"></script>
<!-- 按需：进度条（与 head 内 early/css 成套） -->
<script src="./assets/common/progress/page-progress.js"></script>
<!-- 按需：图表 -->
<script src="./vendor/unovis/unovis.min.js"></script>
<script src="./assets/common/charts/shadcn-charts.js"></script>
<!-- 按需：avatar-crop.js -->
<script src="./js/xxx.js"></script>
```

### CSS 顺序（`<head>`）

```html
<link rel="stylesheet" href="./assets/fonts/index.css" />
<link rel="stylesheet" href="./vendor/arco/css/arco.css" />
<link rel="stylesheet" href="./vendor/fontawesome/css/all.min.css" />
<link rel="stylesheet" href="./vendor/fontawesome/css/sharp-light.css" />
<!-- 壳核心 -->
<link rel="stylesheet" href="./assets/common/css/fa-icons.css" />
<link rel="stylesheet" href="./assets/common/css/arco-theme-pro.css" />
<link rel="stylesheet" href="./assets/common/css/layout.css" />
<link rel="stylesheet" href="./assets/common/css/pages-common.css" />
<!-- 按需：进度条 -->
<link rel="stylesheet" href="./assets/common/progress/page-progress.css" />
<script src="./assets/common/progress/page-progress-early.js"></script>
<!-- 按需：图表 -->
<link rel="stylesheet" href="./assets/common/charts/shadcn-chart.css" />
<!-- 页面 css → ./css/<page>.css（登录页仅链页级；共用版式在 css/login-shared.css，由页级 @import） -->
```

### 登录页 CSS

- 共用：`css/login-shared.css`（原 `assets/common/css/login.css`）
- 页级：`css/login-cover|split|banner.css` 顶部 `@import "./login-shared.css"`
- HTML **只链一个**页级 css，禁止再 `<link>` shared / 旧 `common/css/login.css`

### 看板 / 工作台 CSS

- 共用：`css/dashboard-shared.css`（页头 `*-title` + 顶栏 `*-filters` / 刷新按钮）
- 页级：`css/dashboard-*.css`、`css/workplace.css` 顶部 `@import "./dashboard-shared.css"`
- HTML **只链**对应页级 css，禁止再 `<link>` `dashboard-shared`

### 多页重复皮（进 pages-common，勿在页内再抄一份）

`assets/common/css/pages-common.css` 已收：`.pro-block-title` 及各看板区块标题别名、`.pro-section-head` / `--stack` 及区头别名、rounded Tabs 选中皮、Steps 圆环皮、`.pro-page-card { margin-bottom: 16px }`。  
页级 **禁止**再写与上述完全相同的覆盖（例如 `.form-group-page .pro-page-card { margin-bottom: 16px }`）；仅当页内确有差异（改 padding、取消 margin 避让 gap 等）才保留覆盖。

配色用母版默认。用户**明确要求**改视觉（主色 / 明暗 / 布局 / Shell token / 字体等）时，按 **`style.md`** 执行；**不要**套用 `../web/style.md` 的创建选型流程。

### 页面挂载

业务页 JS 末尾调用：

```javascript
mountProPage({
  pageKey: 'workplace',           // 与 routes.js 中 key 一致
  pageComponent: 'WorkplacePage', // components 中注册的页面组件名
  breadcrumb: true,               // 可选
  components: { WorkplacePage: { /* ... */ } },
})
```

`boot.js` 内已 `app.use(window.ArcoVueIcon)`（FA 适配层）。

### 增页检查

- [ ] `pages.md` 定 page-type → `_meta/pages.catalog.json` 取路径并复制样板
- [ ] `routes.js` 增加菜单项
- [ ] `generate-html.mjs` → `pages` 数组
- [ ] `node scripts/generate-html.mjs`
- [ ] 未删除 Shell 结构；未使用 CDN

### 禁止

- `app.mixin()` 注入 Shell
- 在 HTML 手写完整 Shell（应走 `mountProPage` + 模板）
- 混用其它组件库的标签或 API

### 登录页

独立 `login-cover.html`（及 `login-banner` / `login-split`），不使用 `mountProPage`；`createApp` + `.use(ArcoVue).use(ArcoVueIcon)`，见 `js/login-cover.js`。
