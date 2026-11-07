# Style 选型与换主题（WEB）

**创建** `web/`（流程 A）时：用下文「创建三问话术」一次问清，再 scaffold / 写首页。本文只管 Style 选型与换肤；站型默认壳见 `../config.md`。  
**增页**（流程 B）延续已有配置与 `assets/common/css/global.css`，**不**再问 Style。  
**换主题**：仅当用户明确要求换肤 / 换 Style / 换主题色系时，走下文「换主题」；禁止静默换包。

> 母版挂**多套**可选皮（`themes/*` + `data-brand`）属 `design-library` → `references/brand-themes.md`。  
> **本技能只烘焙一套 Style 进交付**；换主题 = 重写该套，不是加第二套皮。

---

## 创建三问话术（固定；勿自行发挥成长问卷）

用户未指定时，**同轮只发下面这一段**（可微调列举的风格文件名，结构和选项勿拆散）。已指定的项跳过，只问缺口。

```text
创建 WEB 原型前确认 3 点（直接回复序号或关键词即可）：

1）风格 Style
   - 包内：frame/.style/ 下 *-style.md（可对同名预览）
   - 或口述主色
   - 或回复「默认」

2）站型 siteKind
   - marketing｜官网 / 落地页（默认壳 marketing-shell；vendor 含 Vue+Arco+FA，不含 unovis）
   - product｜产品站 / 控制台（默认壳 app-sidebar；vendor 整包含 unovis）

3）页面壳 layout（可选；不选则按站型默认）
   - 营销常见：marketing-shell / marketing-float
   - 产品常见：app-sidebar / app-topnav / app-inset
   - 其它见 frame/web/layouts/list.md
```

定案后写入配置：`styleSource`、`siteKind`、`layoutDefault`、`vendorProfile`（随站型，见 `../config.md`）。  
说明：营销站仍使用 **Vue3 + Arco**，不是纯静态 HTML。

---

## 步骤（创建）

1. **未定稿** → 发「创建三问话术」；已定稿则跳过。Style 以 **`frame/.style/*-style.md`** 为准（更多主题见 [www.vibepm.net](https://www.vibepm.net)）。**禁止**在本文件维护固定风格清单。  
2. 选定后 **先读** `*-style.md`（有预览则打开）；tokens **整文件写入** `assets/common/css/global.css`，记入配置 `styleSource`（可选 `stylePrimary`）。  
3. 按序落实：字体本地化 → 预览同步或仅 Tokens → **清多皮**（下文）。scaffold 已预删 `themes/` 并去掉 themes `@import`；Style 烘焙后仍须自检清多皮。  
4. 气质参考 `frontend-design.md`，不得另起色板/字体（优先级：本文 > `component.md` > `frontend-design.md`）。  
5. 外部站点对齐 → `style-extractor` → `global.css` + 清多皮。

---

## 清多皮（硬门禁）

母版 `frame/web` 可挂多套 `themes/*`，经 `theme.js` 的 `WA_BRAND` 供预览切换。**用户交付站只烘焙一套 Style**，禁止把多品牌切换带进交付。

落实 Style **之后**必须：

1. 交付 `assets/common/css/global.css`：**删除**所有 `@import "./themes/…"`；亮色写 `:root`，暗色写 `html[data-theme="dark"]`（**不要** `data-brand`）。
2. **删除**交付内 `assets/common/themes/`（整目录），或确保无文件被引用。
3. 页面 **不要** 品牌下拉 / `?brand=` / `WA_BRAND.set`；不要挂多套 `themes/*`。
4. 可保留 `theme.js`（明暗）；交付站勿启用母版多品牌切换（即使 `WA_BRAND` 仍在脚本内）。

自检：全文搜索交付根无 `data-brand`、`assets/common/themes`、品牌下拉；切暗色只靠 `data-theme`。

---

## 换主题（已有交付根）

用户说「换肤 / 换 Style / 换成某某风格 / 换主题色」且指向**已有** `web/`（或约定交付根）时执行；**增页默认不走本节**。

### 门禁

1. **须用户明确要求**；范围不清时先确认：整站换 / 仅主色微调。  
2. **禁止**用母版多皮当交付换肤：勿恢复 `@import "./themes/…"`、勿写 `html[data-brand]`、勿加品牌下拉 / `?brand=` / `WA_BRAND.set`。  
3. **禁止**只改一两处硬编码色而留下旧 `--wa-*` / 字体栈不一致；须整文件重写视觉真源。  
4. 未要求改 IA / 页面结构时：**不**为换肤重新 scaffold、不删业务页。

### 步骤

1. **定案**：同创建时询问——枚举 `frame/.style/*-style.md`（可对预览）／口述主色／「默认」；用户也可提供从官网（[www.vibepm.net](https://www.vibepm.net)）取得的规范；写清将替换的 `styleSource`。  
2. **读新风格**：打开选定 `*-style.md`；有同名 `*-preview.html` 则一并作为视觉真源。  
3. **整文件重写**交付 `assets/common/css/global.css`（亮色 `:root` + 暗色 `html[data-theme="dark"]`，**无** `data-brand`）：按上文「字体本地化」→「预览同步」或仅 Tokens 描述落实。  
4. **清多皮**：再跑一遍上文「清多皮」门禁（防误把母版 themes 拷回）。  
5. **配置**：更新交付根 `.prototype-config.json` 的 `styleSource`（可选 `stylePrimary`）。  
6. **抽查**：首页 + 1～2 个已有业务页明暗切换；主色 / 字体 / CTA 跟新 Style；无 `data-brand`、无 `assets/common/themes`。

### 仅主色微调（窄范围）

用户只要「主色改成 #xxx」且明确不换整套 Style 时：可只改交付 `global.css` 中 `--wa-color-primary` 及由其派生的 soft / accent / 钮光晕 / `body` 上 `--primary-*`（及桥接所需），**仍禁止**引入 `themes/*`；`styleSource` 可保持或附注「primary override」。整套气质要变时仍走完整换主题步骤。

自检：新 `styleSource` 已写；`global.css` 无 themes `@import`；明暗可用；业务页未因换肤被误删或重 scaffold。

---

## 字体本地化

目标：风格规定的字体族在交付内闭环；**禁止**页面引用字体 CDN。

对齐风格预览变量名（`--font-sans` / `--font-display` / `--font-serif`）；写入交付时加 **`wa-` 前缀**（与母版 `global.css` 一致）。多皮库存写法见 `design-library` → `brand-themes.md`；**本技能只烘焙一套**进 `:root`，不挂 `themes/*`。

| Token（交付） | ← 预览 / `frame/.style` | 用途 |
|---------------|-------------------|------|
| `--wa-font-sans` | `--font-sans` | 全局正文、导航、控件 |
| `--wa-font-display` | `--font-display` | 展示标题 / Hero 字阶 |
| `--wa-font-serif` | `--font-serif` | 第三槽：真衬线，或 KPI/大数凝缩族 |

1. **解析**：读 `*-style.md` Typography；**有预览则以预览 `:root` 的 `--font-*` 完整栈为真源**（逐项一致，勿改写回退）。区分须下载的 Web 字体 vs 系统回退（只写栈）。
2. **检查** `assets/fonts/`：缺则补 `*.woff2` + `@font-face`。  
   - **有字体文件时**（对齐母版 / 专题站）：一族一目录 `assets/fonts/<family>/`（小写短横线，如 `plus-jakarta-sans/`），内放该族 css + woff2；根 `assets/fonts/index.css` 用 `@import` 聚合。  
   - **仅薄 CSS、无二进制**时可扁平放在 `assets/fonts/`，不必强行建子目录。  
   - 不得因只有 Inter 就换族顶替。
3. **引用**：`global.css` 写齐 `--wa-font-sans` / `--wa-font-display` / `--wa-font-serif`（栈内容照预览）；页面挂载本地字体 CSS（优先 `assets/fonts/index.css`）；正文吃 sans，展示标题吃 display，Statistic/KPI 等吃 serif。无独立第三族时：`--wa-font-serif: var(--wa-font-display)` 或 `var(--wa-font-sans)`。**禁止**再写已废弃名 `--wa-font-numeric` / `--font-numeric`。
4. 无法合法获取字体 → **告知用户**，禁止静默换族。

自检：三槽已写且与预览/风格一致；非系统字体已本地化；有 woff2 时按 `<family>/` + `index.css` 组织；无外链字体；无 `numeric` 旧名；`styleSource` 已写。

---

## 预览同步（有 `*-preview.html` 时）

**视觉真源 = 预览。** 抽 CSS/交互进交付，禁止整页复制预览 HTML，禁止只抄色板。

### 主规则（必读）

落实 Style 时 **扫描预览中的主题组件**，把其**样式 + 交互**写入基线（`assets/common/css/global.css` + 可复用 JS）。

- 范围 = **预览里实际有的组件**（清单不封闭；预览新增下次扫描即纳入，**不必改本文件**）。
- 本页 DOM **可以不挂**某组件，但类名与 API（如 combo、`showToast`）**必须就绪**；禁止等用到再补。
- **禁止**：裸 `<select>` / 未皮肤化原生勾选顶替主题控件；`alert()` 或随意条顶替主题 Toast；因「文档没点名」忽略预览已有组件。
- **可不拷**：swatch 墙、painterly 等纯演示排版。

### 同步层次

| 层 | 内容 |
| --- | --- |
| **A. Tokens** | `:root` / 主题块：色、半径、阴影、玻璃、字体（预览 `--font-*` → 交付 `--wa-font-*`，见「字体本地化」）、`--scrollbar-*`、动效相关变量（如 `--ease` / `motion.ease`、时长）等；色/半径等照抄，字体按上表加 `wa-` 前缀 |
| **B. Chrome** | 滚动条、`::selection`、`focus-visible` |
| **C. 组件基线** | 预览中的按钮、chip、表单、combo、field-error、Toast、alert、checkbox/radio/toggle 等（**含本页未用**）样式 + 通用交互 |
| **D. 气质** | 顶栏磨砂、主 CTA 策略等落到实际布局 |
| **E. Motion** | 见下节（组件微交互 + 可访问性；**不**整页拷贝演示编排） |

字段错误用 `.field-error`；短时成功/操作反馈用 **Toast**；页内说明用 `.alert`（若预览有）。

### E. Motion（动效）

**不单独询问动效套餐**；气质跟选定 Style / 预览。用户主动说「少动 / 更动感」时再记可选偏好并覆盖，否则跟预览。

**须同步（基线）：**

- Style / 预览中的缓动与时长 token（写入 `:root`；无变量则按 `*-style.md` 动效描述落到组件 `transition`）
- 组件自带的 hover / active / 展开 / Toast 进出等 `transition`（随 C 层一起拷）
- 预览若有 `@media (prefers-reduced-motion: reduce)`（或等价 JS），写入 `global.css`（及共用 JS），缩短或关闭动画

**不须 / 禁止整页照搬：**

- 预览演示用的入场秀、无限循环氛围动画、纯展示用 scroll-reveal
- 页面级编排（首屏入场、区块交错等）由实际页按 `frontend-design.md` **按需自写**，时长/缓动仍用本 Style 的 motion tokens，气质与预览一致即可

### 操作

1. 打开预览 → 抄 Tokens（含 motion）→ 抄 Chrome → 按主规则预置组件样式/交互（含微交互）→ 落实 `prefers-reduced-motion`。  
2. 结构 / IA 仍走 `component.md`（**component 管结构，预览/Style 管视觉与微交互**）。  
3. 无预览时回退 `*-style.md` 描述（含动效时长/缓动条文）。

自检：Tokens/chrome/animations 与预览一致；已扫描并预置预览组件；`prefers-reduced-motion` 已处理；交互可复用；无字体 CDN；**已执行「清多皮」**。

---

## 其它

- 页面级微调进 `css/xxx.css`；Element Plus 用 CSS 变量映射主题色。  
- 图标：本地 Font Awesome。  
- **admin** 创建不询问 Style；仅 web / app 走本文。
