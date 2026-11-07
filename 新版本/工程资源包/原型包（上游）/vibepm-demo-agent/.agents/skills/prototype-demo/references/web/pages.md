# WEB 增页约定

创建基座见技能 `SKILL.md` 流程 A · web 与 `./style.md`。本文只管**在已有交付根上增页 / 改页**。

## 前置

1. 已锁定唯一交付根（见 `SKILL.md` 多端防冲突；字段见 `../config.md`）。  
2. 读该根 `.prototype-config.json`；缺 `siteKind` / `layoutDefault` / `vendorProfile` → 先按 `../config.md`「旧根补字段」写回，再继续。  
3. **延续** `styleSource`、三字段与 `assets/common/css/global.css`，不重问 Style / 站型（刚补字段时除外）。  
4. 同名 `*.html` 已存在 → 先问覆盖 / 换名 / 改已有页。  
5. 高频页先看 `./recipes.md`：有 **`assets/web-recipes/<id>/` 交付态**则整套拷入交付根再改业务；否则再按 slug 从 `frame/web/layouts` 组装。

## 文件

| 用途 | 路径 |
| --- | --- |
| 页面 | 与 `index.html` **同级**的 `<name>.html`（如 `pricing.html`、`about.html`）；**禁止** `pricing/index.html` 子目录页 |
| 页样式 | `css/<name>.css`（页级；HTML **只链这一个**页级文件；勿把第三方整包塞进此处） |
| 多页共用版式（可选） | `css/shared.css`：landing / section / 营销卡面等；页级 css 顶部 `@import "./shared.css"`；**禁止** HTML 直接 `<link>` shared；**禁止**把 token / 顶栏壳 / 控件基线塞进 shared（那些进 `assets/common/css`） |
| 页脚本 | 有交互才建 `js/<name>.js`（编排/业务；第三方整包见 `vendor/`） |
| 多页共用编排（可选） | `js/shared.js`：多页同套顶栏/页脚/悬浮工具等编排；在页级 js **之前**挂载 |
| 全局 | 只改 `assets/common/css/global.css` 中确属全站的 token/组件；页面私有样式不进 global |
| 第三方库（Vue/Arco/FA/Unovis/第三方特效**包**） | `vendor/<name>/`；勿散落 `assets/common` 或页级 `css|js` |
| 本站多页共用特效 | `assets/effects/{名}/`（非第三方包） |
| 仅本页装饰特效 | `css|js/{名}.*` |
| 本站 SVG / favicon | `assets/icons/`（少 → `images/`）；**不是** FA 整包 |

首页固定为 `index.html` + `css/index.css` + 可选 `js/index.js`。  
多页营销站出现重复版式时再建 `css/shared.css`（及按需 `js/shared.js`）；单页不必强建。

## 结构与挂链

- **壳**：读配置 `layoutDefault`；用户本页点名其它 slug 则用点名。未写入配置时按 `siteKind`：`marketing` → `marketing-shell`，`product` → `app-sidebar`（见 `../config.md`）。多页共用一份 `css/layout-<slug>.css`（及共享 JS）。对照 `layouts/list.md`。勿另起一套壳。  
- **营销落地**：套 `marketing-shell`（或 `marketing-float` 等点名壳）后，主列用 `section` 区块流。  
- **产品站 / 控制台**：默认 `app-sidebar` 一类产品壳。  
- **与 Admin**：侧栏通顶 / 窄屏可对齐 Pro 的 IA，**禁止**引入 ProShell（`shell.js` / `routes` / `pro-*`）。多页 CRUD + 菜单中枢应改走 **admin** 端。跨端互鉴与整合见 `../cross-end.md`。  
- **挂链**：顶栏、页脚、站内 CTA 链到新页；从新页可回到首页或主导航。  
- 复用已有导航 markup，保持与首页一致的信息架构。  
- 规范优先级：`style.md` > `component.md` > `frontend-design.md`。
- **含图表**：先读 `./charts.md`；样板抄 `frame/web/components/chart-*`（需 `vendorProfile=product` 或已有 unovis）。

### 按 slug 组装（决策表）

| 命中 | 默认落地 | 禁止 |
| --- | --- | --- |
| block / component CSS | **并入** `css/<页>.css` | 交付根镜像 `blocks|components/{slug}/` 再 `<link>` 母版 css |
| block / component JS（真交互） | **并入** `js/<页>.js` | 镜像 `component.js` / `block.js`；仅 `WebArco.mount` 的预览壳不进业务页 |
| layout | DOM 进页；`layout.css` → 一份 `css/layout-<slug>.css` | 交付根建整棵 `layouts/{slug}/` |
| 多页同皮 / 同助手 | 允许一份 `css/block-<slug>.css` 或 `js/<助手>.js` | 路径跟交付约定，不跟母版目录镜像 |
| 有 recipe（`./recipes.md`） | **整页骨架优先**，再填槽 | 有骨架仍从零拆装 |

用户粘贴官网设计库 `prompt.md`（或 Gallery「更多」引导粘贴）或点名 slug 时：

**`prompt.md` 章节地图**（与 design-library / vibepm-dev-agent `vibe-design-web` 对齐）：

| 节 | 含义 | demo 动作 |
| --- | --- | --- |
| §1 | 角色与目标 | 对齐成功标准 |
| §2 | 实现路径 A/B；样式/脚本落地 | 有母版走 A；CSS/JS **并入**页级文件，禁止镜像母版路径 |
| §3 | 约束（surface、禁 CDN、Modal 皮等） | 全遵守 |
| §4 | 视觉规格 | 服从交付 `global.css` / Style |
| §5 | 组件可粘贴 HTML / 区块填槽 | **组件**：整段贴 §5 再换文案；**区块**：按槽填；私有 CSS 仍并入页 CSS |
| §6 | 验收 | 并入下节落地自检 |
| §7 | 无母版还原 | **仅未命中**时用；命中禁止无故按 §7 重写 |
| §8 | 兄弟形态 / 动效 | 按需 |

1. 读 **slug** → 交付根或 `frame/web` 查 `blocks|components|layouts/{slug}/`。  
2. **命中**：按上表组装，§5 填槽；特效按来源落盘（第三方包→`vendor/`，本站共用→`assets/effects/`，仅本页→页级 css/js）；禁止 CDN。  
3. **禁止**命中后无故按 §7 从零重写。  
4. **未命中**：再按 `prompt.md` §7 实现。  
5. **落地自检**（下节）通过后再交付。

与 **dev（feature-dev / vibe-design-web）** 的差异：demo 并入静态 HTML/CSS/JS；dev 对照重写为 Vue SFC（禁止原样粘贴 §5 HTML）。

### 落地自检（与母版一致）

按 slug 组装或粘贴 `prompt.md` 后，对**每一个**命中的组件 / 区块勾选。不通过则补齐样式或交互，勿只交裸 HTML。

**结构**

- [ ] DOM 与母版预览 / 提示词 §5 **同构**（允许换业务文案与槽位；未擅自改标签层级、关键 class、Arco 组件类型）
- [ ] 未把对照页橱窗、`wa-comp-meta`、embed 页壳等母版预览 chrome 带进业务页

**样式**

- [ ] 若母版有 `component.css` / `block.css` / `page.css`：规则已**并入**交付页 CSS（或约定的一份共享文件），观感与母版预览一致
- [ ] 未在交付根镜像 `frame/web/.../component|block|page.css` 后再强制 `<link>` 母版相对路径
- [ ] §5 中的必要 inline 布局（如 Typography `margin:0`）保留，或等价写进页 CSS且效果相同
- [ ] 颜色 / 间距优先 `--wa-*` 与交付 `global.css`；未用 CDN 字体或外链样式；无残留 `assets/common/themes` / 品牌切换 UI

**交互**

- [ ] 若母版有业务脚本（上传、`Modal.*` / `Message.*`、自定义事件等）：逻辑已**并入** `js/<page>.js`（或一份共享助手），行为与母版预览一致
- [ ] 未拷贝仅 `WebArco.mount('#app')` 的预览挂载壳；未镜像母版 `component.js` 路径再 `<script src>`
- [ ] 提示词写了「脚本落地」的条目：交付页该交互可点可反馈（非死按钮 / 假上传）

**对照**

- [ ] 能与 `frame/web` 对应预览（或 `?embed=1`）并排比对：结构、私有样式、关键交互无肉眼偏差（文案除外）

**窄屏与明暗**

- [ ] 约 375 / 768：无整页横向滚动；多列/双栏自然叠成单列；导航可点且不挡主 CTA
- [ ] 有 `theme.js` / `data-theme` 时：亮↔暗可切、无闪白/闪黑；暗色下字/描边/主次钮对比可读；页级色优先 `--wa-*`（勿只写死浅色 hex）

## 禁止

- 静默覆盖已有页；引入 CDN；把页面写到其它端目录。  
- 用 `*/index.html` 子目录充当业务页（多页须与 `index.html` 同级 `*.html`）。  
- 把**第三方**特效包 / 组件库 / 图标库整包塞进 `assets/common` 或页级 `css|js`（应进 `vendor/`）；或把本站特效塞进 `vendor/` / 把第三方包装成 `assets/effects/`。  
- 为增页重新 scaffold 或换 Style 包（除非用户明确要求换肤；换肤步骤见 `style.md`「换主题」）。
- 命中 slug 后只贴 HTML、丢掉私有 CSS / 业务 JS，导致与母版观感或交互不一致。
