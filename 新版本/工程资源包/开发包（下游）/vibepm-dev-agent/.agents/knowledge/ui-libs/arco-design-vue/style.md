# Style（Arco / Vibe Design Pro · 视觉覆盖 · 非增页选型）

> 对照源：`prototype-demo/references/admin/style.md`（静态母版交付）。  
> 本文件落点为 **Vue 交付工程**（如 `admin/`），路径以 `{PROJECT_PATH}/README-DEV.md` 为准。

**不是创建/增页时的 Style 选型。** 创建与普通增页 **不询问**、不注入营销站 `.style` 预览。  
仅当用户**明确要求**改后台视觉时执行。未点名的项保持工程默认。

---

## 何时触发

须同时满足：

1. 语境已是 **Arco Pro 后台**（`@arco-design/web-vue` + `pro-*` / ProShell），且  
2. 用户**主动**要求改视觉。

| 类型 | 示例 |
| --- | --- |
| 主题色 / 品牌 | 改品牌色、换主题色、默认主色改成蓝/紫 |
| 明暗 | 默认暗色 / 默认亮色 |
| 布局默认 | 默认侧栏通顶、顶栏布局、侧栏加宽 |
| Shell 气质 | 圆角、卡片边、滚动条、间距 |
| 字体 | 仅点名时 |

**不触发**：做用户管理页 / 加列表 → 走 `pages.md`；换组件库 → 不是本文。

---

## 门禁

| 做 | 不做 |
| --- | --- |
| 只在 **交付工程** 改主题/设置/覆盖 CSS | 改包根或仓库内 **`frame/admin` 母版** |
| 保留 Arco + `pro-*` / ProShell | 混装其它组件库；整页套 WEB `.style` / `themes/*` |
| 自定义主色后 **soft/mid 跟新 `--primary-6`** | 留下旧硬编码紫/蓝浅底 |
| 中性阶吃 `--pro-color-border\|fill\|text-*` 桥 | 用主色混出 fill/border（易发色偏） |

顶栏「主题色 / 明暗」运行时切换仍可用；本文改的是**默认值与基线 token**。

---

## 令牌纪律（与母版对齐）

真源：`src/styles/pro/arco-theme-pro.css`（对照母版 `frame/admin/assets/common/css/arco-theme-pro.css`）。

| Token | 用途 | 亮色默认 | 暗色 |
| --- | --- | --- | --- |
| `--pro-color-bg` / `--pro-content-bg` | **页画布**（`.pro-layout` / `.pro-content` / `.pro-main`） | `#f5f5f5` | `#0d0d0d` |
| `--pro-color-fill-1\|2\|3` | 控件/条浅铺（桥 `--color-fill-*`） | 黑透明度 | 白透明度 |
| `--pro-color-border-1\|2\|3` | 描边（桥 `--color-border-*`） | 黑透明度 | 白透明度 |
| `--pro-color-text-1…4` | 文字阶（桥 `--color-text-*`） | — | — |
| `--pro-theme-color-soft` / `mid` | 主色浅底 / 中强调 | 亮 `0.15` / `0.35` | 暗 `0.22` / `0.4` |
| `--pro-ctrl-h-*` / `--pro-input-h` | 控件密度（默认 medium **36px**） | — | — |
| `--pro-ctrl-ring` | 获焦 / secondary 悬停软环 | `3px` | — |

**画布 ≠ fill**：页背景用 `--pro-color-bg`，勿用 `--color-fill-2` 铺整页（叠白约 `#ebebeb`）。  
**禁止**引入 WEB 多品牌皮（`themes/*` / `data-brand` / `WA_BRAND`）。

运行时色板：`src/utils/frame-theme.ts`（`applyFrameTheme` / soft·mid）+ Pinia `pro-settings`；**勿在业务页写死整套 `--primary-*`**。

---

## 落点（优先顺序）

1. **Pinia `pro-settings` / localStorage 键** — 默认主题色、明暗、布局（对照母版 `assets/common/js/settings.js`）。  
2. **`src/utils/frame-theme.ts`** — 追加 PRESET（1–7 阶）、soft/mid 透明度。  
3. **`src/styles/pro/arco-theme-pro.css`**（或其后的 brand override）— Shell / 中性阶 / 控件密度；**勿写死整套 `--primary-*`**。  
4. **页面级** `src/styles/pages/<page>.css`（在对应 `views` 内 `import`）或 scoped — 单页例外。

---

## WEB / Style → Admin（只取主色阶；可无限追加）

**不限于下表示例。** 任意 `.style` 预置、WEB `themes/*`、交付 `global.css`、客户 VI，只要能抽出主色阶，都可落成工程 PRESET。

| 来源类型 | 抽什么 | 落点 |
| --- | --- | --- |
| 预置 `*-style.md`（+ 同名 preview；路径以仓库现状为准） | Tokens 主色 → 1–7 阶 | `THEME_PRESETS` 追加或复用 |
| WEB 品牌皮 `themes/*.css` | `--primary-1…7` | 同上 |
| WEB 交付视觉真源 CSS | 已烘焙 `--primary-*` / `--wa-color-primary` | 同上 |
| 口述 / VI hex | 自建 1–7 阶 | 同上 |

**规则**：只迁主色阶；soft/mid 跟新主色；**禁止**挂多皮 / 抄营销渐变与大圆角。  
查现有 `THEME_PRESETS` 是否同 hex → 有则复用 id，无则 **追加** 新 id，再改 `pro-settings` 默认。

**示例（非穷尽）**

| 示例来源 | hex | preset |
| --- | --- | --- |
| 默认紫雾 | `#6C5CE7` | **`indigo`**（已有） |
| `liangse-keji-lan` | `#165DFF` | **`blue`**（已有） |
| `baichang-ningshuo` | `#000000` | **须追加** |
| 其它 Style / 新皮 | （读文件） | **复用或追加** |

对照源：`prototype-demo/references/admin/style.md` 同节。

---

## preset 双份维护

| 侧 | 文件 |
| --- | --- |
| 母版 | `frame/admin/assets/common/js/arco-theme.js` → `PRESETS` |
| 工程 | `{PROJECT_PATH}/src/utils/frame-theme.ts` → `THEME_PRESETS` |

任一侧增改 preset 时：

- [ ] 另一侧同 id / hex / palette 1–7  
- [ ] 若改默认：母版 `assets/common/js/settings.js` 的 `themeColorPreset` ↔ 工程启动默认一致  
- [ ] soft/mid：亮 `0.15/0.35`，暗 `0.22/0.4`

---

## Agent 步骤

1. 确认是视觉覆盖，不是换 UI 库。  
2. 列出点名项；**未点名不改**。  
3. 读 `frame-theme.ts`、`pro-settings`、必要时 `arco-theme-pro.css`。  
4. 按上表落点修改；抽查按钮 / 表单描边悬停获焦 / 页画布；亮暗各一眼。  
5. 告知：顶栏切换仍可用；未改 `frame/admin`。

### 自检

- [ ] 未在增页流程主动询 Style  
- [ ] 未改 `frame/admin`；未换 UI 库  
- [ ] 仅改交付内点名项  
- [ ] soft/mid 跟新主色；中性阶未掺主色  
- [ ] 页画布用 `--pro-color-bg`，非 fill-2  
- [ ] 若改了 PRESET：母版 `arco-theme.js` 已双份对齐  

---

## 与其它文档

- 组件 / IA：`components.md`  
- 增页结构：`pages.md`  
- 图表：`charts.md`  
- 工程约定：`{PROJECT_PATH}/README-DEV.md`（冲突时以 README 为准）  
- 静态母版对照：`prototype-demo/references/admin/style.md`
