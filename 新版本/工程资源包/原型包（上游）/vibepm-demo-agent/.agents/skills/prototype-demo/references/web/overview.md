# WEB 交付约定摘要

- **目录**：与 admin / app 共用 `../delivery-structure.md`。
- 交付根：默认 `web/` 或锁定的 `--out`；scaffold 自 **`frame/web`** 拷 `assets` + 按 `--profile` 的 `vendor`。
- **创建顺序**：一次问清 Style + `siteKind` + 壳 → scaffold（`--profile`）→ 落实 tokens（`./style.md`）→ 首页优先 `./recipes.md`，再 `./pages.md` 填块。
- **默认壳**：`marketing` → `marketing-shell`；`product` → `app-sidebar`（写入 `layoutDefault`，见 `../config.md`）。
- **vendorProfile**：`marketing` = vue+arco+FA；`product` = 整包（含 unovis）。  
  **注意**：`marketing` **仍用 Vue3 + Arco**（营销壳 CTA/折叠等依赖）；与 `product` 的差别是默认壳 + 是否带 unovis，不是「营销纯静态」。
- **创建问句**：固定三问见 `./style.md`「创建三问话术」。
- **规范优先级**：`style.md` > `component.md` > `frontend-design.md`。
- 首页：优先拷 `assets/web-recipes/` 交付态（见 `./recipes.md`）；`index.html` + `css/index.css` + 可选 `js/index.js`。
- 样式：`assets/common/css/global.css` + `chrome.css` + 按需 `components.css` + 页级 `css/<name>.css`。
- 字体 / 特效 / 图标：见 `../delivery-structure.md`——FA 等第三方库 → `vendor/`；本站 SVG → `assets/icons/`；本站共用特效 → `assets/effects/`；仅本页特效 → 页级 `css|js`；禁 CDN。
- 交互：Vue3 + Arco（营销/产品皆然）；图表见 `./charts.md`（通常要 `product` profile）。
- 增页：`./pages.md`；组装决策表见该文；表格列宽 `./table.md`。
- **脏目录**：勿直接 scaffold；见 `SKILL.md` 第 0 步。
- **与 Admin**：`../cross-end.md`。

细节：`style.md`、`pages.md`、`recipes.md`、`component.md`、`../config.md`、技能 `SKILL.md`。
