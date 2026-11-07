# Style（admin · 视觉覆盖 · 非创建选型）

**本文件不是创建时 Style 选型。** 与 `../web/style.md` / `../app/style.md` 职责不同：  
创建 / 增页 **不询问**、不注入 `.style` 预览。

仅当用户**明确要求**改后台视觉时执行——不限于品牌色，也包括默认明暗、布局默认、Shell 气质 token、点名换字体等。未点名的项保持母版默认。

**改动范围 = 交付目录**（通常为项目根 `admin/`，或用户指定的后台交付根）。  
**禁止**改包根 `frame/admin/` 母版，也禁止为单次换肤去改 `frame/` 内源文件；下次 scaffold 仍从母版拷出干净基线。

勿整页套用 `.style` / `*-preview.html`，勿按 web 的字体本地化 / 组件预置 / Motion E 层去改后台。

---

## 何时触发（关键词 / 场景）

本文件**不在** AGENTS 技能触发表单独占一行；挂在 `prototype-demo` 内，且须同时满足：

1. 语境已是 **admin 后台**（已有 `admin/` 或正在做后台），且  
2. 用户**主动**要求改视觉（创建 / 普通增页**不**自动走本文）。

| 类型 | 示例说法（命中任一且指向后台即可） |
| --- | --- |
| **主题色 / 品牌** | 改品牌色、换主题色、默认主色改成蓝/紫、客户 VI 主色、对齐品牌色 |
| **明暗** | 默认暗色、默认 dark、默认亮色主题 |
| **布局默认** | 默认侧栏通顶、默认顶栏布局、侧栏加宽/收窄 |
| **Shell 气质** | 圆角大一点、卡片边更弱、滚动条样式、间距收紧 |
| **字体** | 后台换成某某字体（仅点名时） |
| **综合** | 换肤、改后台视觉、按设计稿改配色（仍落在 Arco 变量，不换组件库） |

**不触发本文**（举例）：「做一个用户管理页」「加一个列表」→ 走 `pages.md`；「换成其它组件库」→ 换 Theme，不是本文；「创建后台」→ 用母版默认，不询 Style。

---

## 触发与禁止

| 做 | 不做 |
| --- | --- |
| 用户点名：主色 / 品牌色、默认明暗、布局默认、圆角边距、字体等 | 创建时主动询 Style 或枚举 `frame/.style/` |
| **只**在交付 `admin/`（或指定交付根）改 `settings.js` / `arco-theme.js` / 覆盖 CSS | **改 `frame/admin/` 母版**；改 `vendor/arco` 编译产物语义 |
| 保留 Arco + `pro-*` / Shell | 换 theme、混装其它组件库，或假装成 web Style 包 |

**换 Theme（组件库）≠ 视觉覆盖**：已有 `.admin-config.json` 时不得擅自换 `theme`（见 `design-system-index.md`）。

---

## 可覆盖范围（须用户点名）

| 类别 | 典型诉求 | 落点 |
| --- | --- | --- |
| **主题色** | 默认蓝/紫、自定义品牌主色 | `settings.js` → `themeColorPreset`；或 `arco-theme.js` 追加 PRESET |
| **明暗** | 默认 dark / light | `arco-theme.js` 已有明暗机制设默认 |
| **布局默认** | 顶栏通栏 vs 侧栏通顶、侧栏宽、是否持久化 | `settings.js`（`layoutMode`、`menuWidth`、`themePersist` / `layoutPersist` 等） |
| **Shell / Pro 气质** | 圆角、卡片边、间距、阴影、滚动条 | `arco-theme-pro.css` 或其后的 `css/brand-override.css` |
| **字体** | 指定字体族 | 用户明确要求时才本地化替换；默认不改 |
| **单页例外** | 某页特殊强调色/间距 | 该页 `css/xxx.css`，不扩散为全站 |

| 默认不改 | 说明 |
| --- | --- |
| `.style` 预览组件与营销气质 | 后台保持 Arco Pro 信息密度 |
| 动效体系 | 跟 Arco；不强制同步 web Motion |
| 业务页 DOM / `pro-*` 结构 | 不为换肤重写样板 |
| `vendor/arco` | 禁止改编译产物语义 |

顶栏「主题色 / 明暗切换」仍可用；本文件改的是**默认值与基线 token**，不是拆掉运行时切换。

---

## 换主题 / 换肤（已有交付根）

与 WEB `../web/style.md`「换主题」**对位**：须用户明确要求；只改**交付** `admin/`；**禁止**改 `frame/admin/`、禁止引入 WEB 多皮（`themes/*` / `data-brand` / `WA_BRAND`）。

Admin **不**整文件套 `.style` 预览；换主题色优先走 preset，气质 token 走 override。

### 门禁

1. **须用户明确要求**；范围不清先确认：仅默认主色 / 明暗默认 / Shell 气质 / 综合。  
2. **禁止**静默换组件库 `theme`；禁止为换肤重 scaffold 业务页。  
3. **禁止**在交付里挂母版多品牌切换或抄 `frame/web/assets/common/themes/`。  
4. 自定义主色时：**主色派生**（`--pro-theme-color-soft` / mid）须跟新 `--primary-6`，勿留下旧硬编码紫/蓝浅底。  
5. **中性阶**（描边 / 浅底 / 文字）默认吃母版 `arco-theme-pro` 的 `--pro-color-border|fill|text-*` 桥；勿用主色混出 fill/border（易发色偏）。点名改边/字色时改 `--pro-color-*` 或受控覆盖，并保持亮暗两套。  
6. **页画布**用 `--pro-color-bg` / `--pro-content-bg`（亮 `#f5f5f5` / 暗 `#0d0d0d`）；**勿**用 `--color-fill-2` 铺整页（叠白约 `#ebebeb`）。fill 仅控件/条浅铺。

### WEB / Style → Admin（只取主色阶；可无限追加）

**不限于下表 3 例。** 任意来源只要能抽出主色阶，都可落成 Admin PRESET：

| 来源类型 | 典型路径 | 抽什么 |
| --- | --- | --- |
| 预置 Style | `frame/.style/*-style.md`（可对同名预览；亦可用户从官网 www.vibepm.net 取得的规范） | Tokens 主色（如 `brand.primary`）+ 可推 1–7 阶 |
| WEB 品牌皮 | 母版 `themes/*.css`（可选皮） | 皮内 `--primary-1…7`（或 `--wa-color-primary` 再派生阶） |
| WEB 交付已烘焙 Style | 交付站视觉真源 CSS（通常为 `global.css`） | 亮/暗段 `--primary-*` 或 `--wa-color-primary` |
| 客户 VI / 口述主色 | hex 或设计稿 | 自建 1–7 阶（或至少 1–7 够用）后追加 PRESET |

**迁入规则（每套 Style 相同）**：只迁主色阶 → 追加或复用 `arco-theme.js` PRESET → 改 `themeColorPreset`；soft/mid 跟新主色。  
**禁止**：挂 `themes/*`、`data-brand`、整文件抄营销渐变/大圆角/黑胶囊 CTA；Admin 不引入多皮切换。

**通用步骤**

1. 定来源（上表任一）；读主色 hex 与已有 `--primary-1…7`（没有则从主色派生浅→深阶）。  
2. 在现有 `PRESETS` 中按 **hex / primary-6** 查是否已有同色 → 有则只用其 id；**无则追加**新 id（kebab 或简短英文，如 `keji-lan`、`brand-red`）。  
3. 交付：`themeColorPreset` = 该 id；自定义色写进交付 `arco-theme.js`（勿改母版除非维护库存）。  
4. 若同时维护 Vue 工程：同步 `frame-theme.ts`（见「preset 双份维护」）。

**已有对照（示例，非穷尽；目录新增 Style/皮后按上表追加行即可）**

| 示例来源 | 主色 hex | Admin preset |
| --- | --- | --- |
| 默认紫雾（无 `data-brand`） | `#6C5CE7` | **`indigo`**（已有） |
| `themes/liangse-keji-lan` | `#165DFF` | **`blue`**（已有） |
| `themes/baichang-ningshuo` | `#000000` | **须追加**近黑 preset |
| 其它预置 Style / 新品牌皮 / 交付视觉真源 | （读文件） | **复用或追加** |

Vue 工程对位：`frame-theme.ts` 的 `THEME_PRESETS` + `pro-settings`（细则见 dev-agent `ui-libs/arco-design-vue/style.md`）。

### preset 双份维护

母版 `frame/admin/assets/common/js/arco-theme.js` 的 `PRESETS` 与 Vue `admin/src/utils/frame-theme.ts` 的 `THEME_PRESETS` **手抄同步**。任一侧增改 preset 时：

- [ ] 另一侧同 id / hex / palette 1–7  
- [ ] 默认 preset id（`settings.js` ↔ 工程默认）一致（若本次改默认）  
- [ ] soft/mid 透明度约定未分叉（亮 0.15/0.35，暗 0.22/0.4）

### 步骤（Agent）

1. 列出点名项；读交付 `assets/common/js/settings.js`、`assets/common/js/arco-theme.js`、必要时 `assets/common/css/arco-theme-pro.css` / `brand-override.css`。  
2. **仅主色 / 默认 preset**：改 `themeColorPreset`；自定义色则在交付 `arco-theme.js` **追加** PRESET（含 1–7 阶），再改 preset id。  
3. **明暗默认**：按交付 `arco-theme.js` 现有机制设初始 mode（勿拆顶栏切换）。  
4. **Shell / 圆角边距等**：交付 `arco-theme-pro.css` 或其后的 `brand-override.css`；**勿写死整套 `--primary-*`**（仍由 `arco-theme.js` 写入）。  
5. **抽查**：按钮 / 链接 / Alert 浅底 / 表单描边；亮暗各看一眼；无 CDN；未改 `frame/admin/`。

### 仅主色微调（窄范围）

用户只要「默认主色改成 #xxx」：追加或改 preset + `themeColorPreset` 即可；确认 soft/mid 跟新主色。整套气质要变时仍走完整换肤步骤。

---

## 改哪里（优先顺序）

1. **`assets/common/js/settings.js`** — 默认主题色预设、布局与持久化等开关（仅点名项）。  
2. **自定义主色（不在现有 PRESETS 内）** — 在交付 `assets/common/js/arco-theme.js` **追加** preset，再改 `themeColorPreset`；或加 `assets/common/css/brand-override.css`（挂在 `arco-theme-pro.css` 之后），保证与 `arco-theme.js` 写入方式一致，避免锁死按钮主色。  
3. **`assets/common/css/arco-theme-pro.css`** — Shell / Pro 非色板硬编码；页画布 `--pro-color-bg`；中性阶 `--pro-color-border|fill|text-*`（已桥 `--color-*`）；**勿在此写死整套 `--primary-*`**（色板由 `arco-theme.js` 动态写入）。  
4. **页面级** `css/xxx.css` — 单页例外。

可选写入 `.admin-config.json` 备注（不参与 scaffold）：

```json
"brandOverride": {
  "themeColorPreset": "blue",
  "note": "客户要求科技蓝默认主色；侧栏宽保持 220"
}
```

---

## 操作步骤（Agent）

1. 确认是 **视觉覆盖**（主色 / 明暗 / 布局 / Shell token / 字体等），不是换组件库 Theme。  
2. 列出用户点名的项；**未点名不改**。完整换肤走上文「换主题 / 换肤」。  
3. 读交付目录 `assets/common/js/arco-theme.js`、`assets/common/js/settings.js`、必要时 `assets/common/css/arco-theme-pro.css`。  
4. 按上表落点修改；新主色则追加 preset 或受控覆盖 CSS。  
5. 自检：按钮 / 链接 / `--pro-theme-color`、Shell、中性描边/浅底、点名项是否生效；**禁止** CDN；**未**改动 `frame/admin/`。  
6. 告知用户：顶栏切换仍可用；本次改的是交付目录默认与基线。

### 自检

- [ ] 未在创建/增页流程中主动询 Style  
- [ ] **未修改 `frame/admin/`**；未改 `vendor/arco`；未切换 `theme`  
- [ ] 仅改交付目录内用户点名项  
- [ ] Shell / `pro-*` / 样板结构仍在  
- [ ] 未引入 `themes/*` / `data-brand`；自定义主色后 soft 跟新主色  
- [ ] 页画布为 `--pro-color-bg`，非 fill-2  
- [ ] 若改了 PRESET：Vue `frame-theme.ts`（或反向）已双份对齐  

---

## 与其它文档

- Theme 选型与创建默认：`design-system-index.md`  
- CSS/脚本挂载顺序：`setup.md`  
- 增页结构：`pages.md` / `component.md`  
- WEB 交付换主题（对照，勿抄多皮）：`../web/style.md`「换主题」  
- WEB → Admin 控件回灌：`design-library` → `references/web-to-admin-controls-sync.md`  
- WEB ↔ Admin 跨端互鉴 / 整合：`../cross-end.md`  
- Vue 工程对位规范：`vibepm-dev-agent` → `.agents/knowledge/ui-libs/arco-design-vue/style.md`
