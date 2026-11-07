# 交付配置字段

写入交付根内的 `.prototype-config.json` / `.admin-config.json` 时对照本文。脚手架参数含义见技能 `SKILL.md`（`--end` / `--framework` / `--out`）。

---

## `.prototype-config.json`（web / app）

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `end` | 建议 | `web` 或 `app` |
| `frameworkId` | 建议 | 母版 id（`frame/index.json` / `--framework`） |
| `frameworkVersion` | 可选 | 来自母版 manifest |
| `outputDir` | 建议 | 交付目录名（与 `--out` 一致） |
| `styleSource` | web/app 创建后应有 | 如 `.style/电光玻璃-style.md` 或 `existing` |
| `stylePrimary` | 可选 | 口述主色等备注 |
| `siteKind` | **web 创建后应有** | `marketing`（官网/落地）或 `product`（产品站/控制台） |
| `layoutDefault` | **web 创建后应有** | 未点名壳时的 slug；默认随 `siteKind`：`marketing` → `marketing-shell`，`product` → `app-sidebar` |
| `vendorProfile` | web 建议 | `marketing`（**仍含** vue+arco+FA，无 unovis）或 `product`（整包含 unovis）；与 scaffold `--profile` 一致 |
| `shell` | **app 创建后应有** | 壳文件名，如 `ios_frame.html`（见 `app/shells.md`） |
| `shellFamily` | app 建议 | `ios` 或 `wechat` |
| `vendorProfile` | app 建议 | `lean`（vue+vant+FA，默认）或 `full`（含 f2 等）；与 scaffold `--profile` 一致 |
| `scaffoldMode` | 流程 C 必填 | `external`；官方 scaffold 也可记 |
| `sourcePath` | 流程 C | 外置母版相对路径 |

### web：站型 → 默认壳 / vendor

| `siteKind` | 默认 `layoutDefault` | 默认 `vendorProfile` |
| --- | --- | --- |
| `marketing` | `marketing-shell` | `marketing` |
| `product` | `app-sidebar` | `product` |

用户点名其它 layout slug 时写入 `layoutDefault`（或增页时按点名套壳，不改配置除非用户要求改默认）。站型不清时先问；仍不清可暂按 `marketing` 并在交付摘要注明。

### web：旧根补字段（流程 B 门禁）

已有交付根、配置缺 `siteKind` / `layoutDefault` / `vendorProfile` 任一（或无配置但已是本技能结构）时：**增页 / 改页前先补齐并写回** `.prototype-config.json`，禁止长期空缺。

**推断顺序**（能判则写；冲突或全无信号 → 问一次，默认暂按 `marketing`）：

1. **`siteKind`**  
   - 页内 / 共享 CSS 见 `wa-layout--site-marketing`、`layout-marketing-*`、营销顶栏+页脚且无侧栏通顶 → `marketing`  
   - 见 `wa-layout--side` / `wa-layout--top`、侧栏产品壳、工作台 IA → `product`  
2. **`layoutDefault`**  
   - 已有 `css/layout-<slug>.css` 或 HTML 可对应 `layouts/` slug → 用该 slug  
   - 否则按上表随 `siteKind` 填默认  
3. **`vendorProfile`**  
   - 存在 `vendor/unovis/`（或页已挂 unovis）→ `product`  
   - 仅有 vue/arco/FA（或无 vendor 记录）→ 随 `siteKind`（`marketing`→`marketing`，`product`→`product`）  
4. 补写时保留已有 `styleSource` 等字段；`outputDir` 与当前交付根目录名一致。交付摘要注明「已回写三字段」。

### web：流程 C / 脏目录 → 配置门禁

| 场景 | 要求 |
| --- | --- |
| **流程 C**（外置/自建基座） | 写入 `.prototype-config.json` 时 **必须**含 `siteKind`、`layoutDefault`、`vendorProfile`（可与 `styleSource: existing` 同写）；缺一不可进入增页 |
| **脏目录**选「换新 `--out` / 清空重建」 | 走流程 A，scaffold 自动写入三字段 |
| **脏目录**选流程 C（少见） | 同流程 C：登记配置时强制三字段；推断规则同上，推断不了则先问 |
| 脏目录未确认前 | 禁止 scaffold、禁止热补、也禁止只写页面不写配置 |

### app：旧根补字段（流程 B 门禁）

配置缺 `shell` / `styleSource`（或建议的 `shellFamily` / `vendorProfile`）时：**增页前先补齐写回**。

**推断**：

1. **`shell`**：根目录存在 `ios_frame*.html` / `wechat-frame*.html` → 取实际使用的壳文件名；多份则问一次。  
2. **`shellFamily`**：文件名含 `wechat` → `wechat`，否则 `ios`。  
3. **`styleSource`**：已有烘焙过的 `assets/common/css/global.css` 且无多皮 → `existing`；否则问 Style 或标 `existing`。  
4. **`vendorProfile`**：存在 `vendor/f2/` → `full`，否则 `lean`。  

### app：流程 C / 脏目录

与 web 同门禁：流程 C 必须含 `shell`、`styleSource`（建议并写 `shellFamily`、`vendorProfile`）；脏目录换根/清空走 A；未确认禁止只改屏不写配置。

---

## `.admin-config.json`（admin）

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `end` | 建议 | `admin` |
| `frameworkId` | **创建后应有** | 母版 id，官方多为 `admin` |
| `theme` | **官方创建后应有** | 如 `arco`；external 可为 `custom` |
| `templateId` | 可选 | 与 framework / manifest 对齐 |
| `outputDir` | 建议 | 交付目录名 |
| `scaffoldMode` | **建议** | `lean` / `full` / `external` |
| `sourcePath` | 流程 C | 外置源路径 |
| `brandOverride` | 可选 | 视觉覆盖备注对象（见 `admin/style.md`） |

### admin：旧根补字段（流程 B 门禁）

缺 `end` / `theme` / `frameworkId` / `scaffoldMode` / `outputDir` 任一（或无配置但已是 ProShell 交付）时：**增页前补齐写回** `.admin-config.json`。

**推断**：见 `pro-layout` / `shell.js` / `assets/common/js/boot.js` → `theme=arco`、`frameworkId=admin`、`scaffoldMode=lean`（已有大量业务页可仍标 `lean`）；`outputDir` = 当前目录名。冲突或全无信号 → 问一次。

### admin：流程 C / 脏目录

| 场景 | 要求 |
| --- | --- |
| **流程 C** | `.admin-config.json` 须含 `end`、`theme`、`frameworkId`、`scaffoldMode=external`、`sourcePath`；缺一不可增页 |
| **脏目录**换根/清空 | 走流程 A（lean scaffold） |
| **脏目录**选 C | 同上强制字段 |
| 未确认前 | 禁止 scaffold / 热补 / 只写业务页不登记配置 |

---

## 盘点交付根

动手前在**项目根**：

1. 列出含 `.admin-config.json` 或 `.prototype-config.json` 的目录 → 正式交付候选。  
2. 列出标准名 `admin/`、`web/`、`app/`（不论有无配置）。  
3. 有内容但无配置、且不像本技能交付 → **脏目录**，先问再写（确认后走 A 或 C；**web** C 带齐站型三字段，**app** C 带齐 `shell`/`styleSource`，**admin** C 带齐 theme 等，见上节）。  
4. 锁定根后：web 缺站型三字段 / app 缺 `shell` / admin 缺 theme 配置 → 先「旧根补字段」，再增页。  
5. 多根时询问并锁定**一个** `--out` 后再 scaffold / 增页。
