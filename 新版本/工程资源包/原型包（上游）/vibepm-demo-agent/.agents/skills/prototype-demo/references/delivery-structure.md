# 三端交付目录（统一）

**web / admin / app 共用同一棵交付树**；端别只多扩展目录，不另起平行规范。  
页级 / 共享分工与 `lite-site` → `references/structure.md` 对齐：**页级**在根 `css|js/`，**全站共享**在 `assets/common/css|js/`。

```text
<out>/                          # web | admin | app | 用户锁定的 --out
├── *.html                      # 业务页与首页同级（禁 */index.html 子目录页）
├── css/                        # **页级**样式（web/app 页 CSS；admin 业务页 CSS）
├── js/                         # **页级**脚本（与 html 同名扁平：`js/<page>.js`）
├── assets/
│   ├── common/
│   │   ├── css/                # **全站共享**样式（global / chrome / components / fa-icons / layout…）
│   │   ├── js/                 # **全站共享**脚本（theme / shell / boot / fa-icons / routes…）
│   │   ├── charts/             # **可选模块**（web/admin）：图表 css+js 同目录
│   │   ├── progress/           # **可选模块**（admin）：全局页顶进度条 css+js
│   │   └── themes/             # **可选模块**（web 母版）：品牌皮 CSS（global @import）
│   ├── effects/                # **本站一等方共用特效**（按特效名分子目录；非第三方包）
│   │   └── {effect}/           # 例：dashed-orbit/dashed-orbit.css + .js
│   ├── fonts/                  # 本地字体（有 woff2 → <family>/ + index.css）
│   ├── icons/                  # 可选：本站 SVG / favicon（图标多时单独建；非第三方图标库）
│   └── images/                 # 端内图（照片、插画、壳图、登录大图等）；图标少时可直接放此目录
├── vendor/                     # 第三方：Vue/Arco/FA/Unovis/Vant/第三方特效包…（一包一目录）
├── _meta/                      # admin / app 母版元数据（可选）
└── .prototype-config.json      # web / app
    或 .admin-config.json       # admin
```

## 分工

| 路径 | 放什么 |
|------|--------|
| `*.html` | 页面；同级多页 |
| `css/`、`js/` | **本页**样式/脚本；勿放全站壳/主题，勿塞第三方整包 |
| `css/shared.css`、`js/shared.js`（可选） | （web 等）**多页共用版式 / 编排**；**不**进 `assets/common`；页级 css `@import "./shared.css"`；HTML **不**直链 |
| `css/login-shared.css` | （admin 登录）三套登录页共用版式；页级 `@import "./login-shared.css"`；HTML **不**直链 |
| `css/dashboard-shared.css` | （admin）看板 / 工作台共用：页头大标题 + 顶栏筛选条；`dashboard-*.css` / `workplace.css` 顶部 `@import`；HTML **不**直链 |
| `css/{特效名}.css`、`js/{特效名}.js` | **仅本页**使用的页级装饰特效（与页级目录平铺；不进 `assets/effects`） |
| `assets/common/css/` | 全站共享样式（global / chrome / components / fa-icons / layout / **pages-common**…） |
| `assets/common/js/` | 全站共享脚本（theme / shell / boot / routes…） |
| `assets/common/charts/` | （web/admin）图表模块：css + js 同目录，按需挂链 |
| `assets/common/progress/` | （admin）全局页顶进度条：`page-progress.css` + `page-progress.js` + `page-progress-early.js` |
| `assets/common/themes/` | （web 母版）可选品牌皮 CSS；交付站烘焙单 Style 后通常删除 |
| `assets/effects/{特效名}/` | **多页共用**的本站一等方页级装饰特效（layouts / blocks / theme / 交付多页示范）；非正式 `/animations` 库存 |
| `assets/fonts/` | 字体；约定见 `web/style.md` |
| `assets/icons/` | **可选**；图标较多时单独建，放本站手写/裁剪 SVG、favicon；**不是** Font Awesome 整包 |
| `assets/images/` | 照片、插画、壳装饰大图、登录背景等；**图标较少时可直接放此处**，不必强建 `icons/` |
| `vendor/<name>/` | 第三方组件库、**图标库**、图表库、**第三方特效包**（非本站手写共用片段） |

## 端别扩展（不打破上树）

| 端 | 额外 |
|----|------|
| **web** | `assets/common` 含 `css|js` + 可选 `charts/`；可选 `assets/effects/`；scaffold 自 `frame/web` 拷 `assets` + 按 `--profile` 的 `vendor`（marketing 无 unovis；交付预清 `themes/`） |
| **admin** | `_meta/`、`scripts/`；共享在 `assets/common/`；页级样式/脚本在根 `css/`、`js/`（扁平） |
| **app** | 壳 html 在根；壳形态 CSS 在 `css/*-frame*.css`；壳结构 `assets/common/css/chrome.css`（换肤不动）+ Style 真源 `assets/common/css/global.css`（可整文件烘焙）；引入顺序 chrome → global → 壳形态；scaffold 默认 `--profile lean`（vue+vant+FA；`full` 含 f2）；壳 UI SVG → `assets/icons/`（少则可放 `images/`） |

## 禁止

- 业务页用 `foo/index.html` 子目录  
- 第三方组件库 / 图标库 / 特效**包**整包进 `assets/common/css|js|icons` 或页级 `css|js`（仍进 `vendor/<name>/`）  
- 把本站一等方共用特效塞进 `vendor/`，或把第三方特效包装成 `assets/effects/`  
- 未授权 CDN；运行时依赖 `frame/`；交付业务站勿长期相对挂 `frame/web/assets/effects`  

## 跨端（WEB ↔ Admin）

交付树已统一；**壳运行时仍分家**（ProShell vs `layouts`）。跨端互鉴以结构/功能为主、样式默认分家，见 **`cross-end.md`**。
