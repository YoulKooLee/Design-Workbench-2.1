# Vibe Design WEB · 页面规范

适用于 `PROJECT_PATH=web/`。气质对齐 `frame/web`，实现路径为 **Vue SFC 对照重写**。

规范优先级：`style.md` > `layouts.md` > `components.md` > `frontend-design.md` > 本文。整页骨架见 `recipes.md`；图表 `charts.md`；表格 `table.md`；跨端 `cross-end.md`。

## page-type 速查

| 用户说法 | page-type | 壳 | 参考 |
| --- | --- | --- | --- |
| 官网首页、落地页、营销首页 | `marketing-home` | MarketingShell | `views/home`；母版 `marketing-shell`；recipe `landing-home` |
| 定价页 | `marketing-pricing` | 同站营销壳 | recipe `landing-pricing` + pricing blocks |
| 产品工作台、应用首页 | `product-workplace` | AppSidebarLayout | `views/app/workplace`；recipe `product-home` |
| 登录 | `login` | LoginShell | `views/login`；recipe `login` |
| 分栏登录 | `login-split` | 后置 `auth-split` | 母版 `auth-split` |

无匹配时：选最接近的壳 + 在 `views/` 新增页；blocks / components 按 `components.md` 从 `frame/web` 对照迁入。

## 生成顺序

1. 定 siteKind / 壳（见 `layouts.md`）
2. 高频页先看 `recipes.md`：有同类型已有 views → 复制骨架再改业务；否则再按 slug 组装
3. 扫用户说法 / SRS / **粘贴的 `prompt.md`** 中的区块与控件名 → 在 `frame/web/blocks|components|layouts` 查 slug
4. **命中**：按 `components.md`「官网 prompt 阅读顺序」+「迁入决策」对照重写；**未命中**：再按 §7 / 业务从零写，仍遵守通用原则
5. 含图表 → 读 `charts.md`；含 `a-table` → 读 `table.md`
6. types → mock → api（如需）→ views → 扁平路由；样式进 `src/styles/pages/` 或组件旁，token 用 `--wa-*`
7. 跑 `components.md`「落地自检」后再宣称完成

## 官网 prompt / 按 slug 组装

契约与 prototype-demo 相同（§1–§8 地图见 `components.md`）。用户粘贴官网设计库 `prompt.md` 或点名 slug 时：

1. 读 **slug** → `frame/web`（或工程已迁副本）查 `blocks|components|layouts/{slug}/`
2. **命中**：对照重写 + §5 填槽；禁止无故按 §7 从零重写
3. **未命中**：按 §7 实现
4. 落地自检通过后再交付

| 命中 | 默认落地 | 禁止 |
| --- | --- | --- |
| layout | 工程壳组件（`layouts.md`） | views 内再造顶栏/侧栏 |
| block / component | Vue 模板 + 样式并入 pages/组件样式 | 粘贴 HTML；镜像母版 css 路径；带入橱窗 chrome |
| 图表 | 对照 `frame/web/components/chart-*` + `charts.md` | 另起未对齐 `--wa-*` 的色板；用 Admin `pro-*` 图皮 |
| 表格 | `wa-atable*` + `table.md` 列宽 | 只钉后列导致主列过宽 |
| 有 recipe | **整页骨架优先**（`recipes.md`） | 有骨架仍从零拆装 |

## 文件与样式

| 用途 | 路径 |
| --- | --- |
| 页 | `src/views/**` |
| 壳 | `src/layouts/*` |
| 可复用区块组件 | `src/components/web/`（或页内子组件） |
| 全站 token / 控件皮 | `src/styles/common/*`（仅 `main.ts` 挂 common） |
| 壳样式 | `src/styles/layouts/*.css`（随壳组件 import） |
| 页样式 | `src/styles/pages/*`（随 view import） |

换肤只改交付工程 `common/global.css` / theme store，**禁止改 `frame/web`**。

## 禁止

- 用 ProShell / 后台 CRUD 样板顶替营销或产品站壳（见 `cross-end.md`）
- 整文件粘贴母版 HTML / `window.*`；修改 `frame/web`
- 把组件橱窗当业务路由（Starter 无橱窗需求时）
- 命中 slug 后只抄结构、丢掉私有样式与交互，导致与母版观感不一致
- CDN 字体 / 外链样式；页级样式误挂进 `main.ts` 全量入口
