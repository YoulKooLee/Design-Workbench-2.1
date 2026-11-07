# WEB 高频页 recipe（整页骨架）

优先于「从零拆装 blocks」。有交付态 recipe → **整套拷到交付根再改业务**；无则再走 `pages.md` 按 slug 组装。

## 交付态样板（优先）

路径：技能目录 `assets/web-recipes/<recipe-id>/`（相对技能根；也可用 `frame/web/layouts/` 回退）。

由 `scripts/sync-web-recipes.mjs` 从母版壳生成；**资源路径已是交付根形态**（`./vendor`、`./assets`、`./css`、`./js`）。母版 layouts 更新后重跑该脚本刷新样板。

| recipe | 拷到交付根 | 说明 |
| --- | --- | --- |
| `landing-home` | `index.html` + `css/index.css` + `css/layout-marketing-shell.css` + `js/index.js` | 营销默认首页 |
| `product-home` | 同上结构（`layout-app-sidebar.css`） | 产品站默认首页 |
| `login` | `login.html` + `css/login.css` + `css/layout-login-shell.css` + `js/login.js` | 居中登录 |

### 拷贝步骤

1. 确认交付根已 scaffold（含 `vendor` / `assets`）。  
2. 将 `assets/web-recipes/<id>/` 下 html、`css/`、`js/` **覆盖/写入**交付根对应路径（勿拷 `recipe.json` 进业务站，可选留作备注）。  
3. 删预览引导卡、画廊/切框架等调试控件；按业务换品牌与主列槽位。  
4. 主列区块优先复用 `frame/web/blocks/{slug}/`（样式并入页 CSS，见 `pages.md`）。

## 回退：仅有母版 layouts 时

1. 打开 `frame/web/layouts/<slug>/`。  
2. 以 `index.html` + `layout.css` + `layout.js` 为源；路径改成交付相对路径；`layout.css` → `css/layout-<slug>.css`。  
3. 其余同「拷贝步骤」3–4。

## 清单（含未生成交付态的）

| recipe | 适用 | 默认壳 | 交付态 | 母版源 |
| --- | --- | --- | --- | --- |
| `landing-home` | 官网/落地首页 | `marketing-shell` | `assets/web-recipes/landing-home/` | `layouts/marketing-shell/` |
| `landing-pricing` | 定价页 | 同站 `layoutDefault` | 无（拷 landing 壳换主列） | 同壳 + pricing blocks |
| `marketing-float-home` | 悬浮导航落地 | `marketing-float` | 无（从 layouts 组装） | `layouts/marketing-float/` |
| `product-home` | 产品站入口 | `app-sidebar` | `assets/web-recipes/product-home/` | `layouts/app-sidebar/` |
| `docs-page` | 文档长文 | `docs-shell` | 无 | `layouts/docs-shell/` |
| `login` | 居中登录 | `login-shell` | `assets/web-recipes/login/` | `layouts/login-shell/` |
| `auth-split` | 分栏登录 | `auth-split` | 无 | `layouts/auth-split/` |

未点名壳：营销 → `landing-home`；产品 → `product-home`。

## 禁止

- 有交付态 recipe 仍从空白 HTML 起手。  
- 把母版预览整目录镜像进交付根 `layouts/`。  
- 登录/文档页误套 `app-sidebar`；控制台页误套 `marketing-shell`。  
- 依赖 `assets/web-recipes` 内的 `../../` 母版路径（样板必须已是 `./`）。
