# frame/ — 共享原型母版

本目录是资源包根级的 **视觉与结构对照源**（HTML 母版、壳、vendor、`_meta`），不是交付工程，也不是可 `import` 的运行时。

当前消费方式（v1.8）：`feature-dev` 按 SRS 在交付子项目（`admin/` 或 `web/` 等）里用 **Vue SFC 对照重写**；编码约定在 `{PROJECT_PATH}/README-DEV.md` 与 `.agents/knowledge/ui-libs/`。约定长文**不要**再复制进本目录。

| 角色 | 路径 |
| --- | --- |
| 增页 / 实现功能 | [CODE0](../.agents/skills/feature-dev/SKILL.md) |
| Admin 实现规范 | [CODE0](../admin/README-DEV.md) |
| Arco 页面 / 图表 | [CODE0](../.agents/knowledge/ui-libs/arco-design-vue/) |
| 端 → 库登记 | [CODE0](./index.json) |

包级触发与技能路由见 [CODE0](../AGENTS.md)。

Admin 母版用法：[admin-usage.md](./admin-usage.md)。

## 设计目标

| 目标 | 做法 |
| --- | --- |
| 母版与交付分离 | `frame/` 只作对照；交付落在项目根 **`admin/`**（Vue 工程）等子项目 |
| 对照重写，不复制 runtime | 点名页面 id，继承 `pro-*` 结构后改业务；禁止粘贴母版 HTML / `window.*` |
| 端别清晰 | 本包母版目录：`admin` / `web`（**无** `app`）；**勿改名** |
| 可扩展 | 新增组件模板库 → 在 `frame/` **根下新建文件夹** + 改 `index.json` |

## 包结构

```text
vibepm-dev-agent/
├── frame/                       ← 共享母版（本目录）
│   ├── README.md                ← 本文
│   ├── index.json               ← 端 → 框架登记（选型用）
│   ├── gallery.html             ← 母版画廊（Admin / WEB / STYLE；无 APP）
│   ├── .style/                  ← 可选色板；Gallery STYLE 预览
│   ├── admin/                   ← 后台 HTML 母版（Vibe Design Pro）
│   └── web/                     ← WEB HTML 母版（layouts / blocks / components）
├── admin/                       ← 交付工程（Vue 3 + Vite + Arco Pro）
├── web/                         ← 交付工程（Vue 3 + Vite + Arco 薄壳）
├── .agents/skills/feature-dev/
├── .agents/knowledge/ui-libs/   ← arco-design-vue · vibe-design-web · …
└── AGENTS.md
```


## 职责划分

| 区域 | 放什么 | 不放什么 |
| --- | --- | --- |
| `frame/*` | 可预览的 HTML 母版、壳、vendor、`_meta` | 产品业务页、SRS/PRD、技能流程长文 |
| `feature-dev` + `README-DEV.md` | 端别、路由、Mock、对照重写、审查 | 把 `frame/` 当 npm 依赖或复制进 `src/` |
| 交付 `admin/`、`web/` 等 | 用户可运行的 Vue（或其它）工程 | 运行时 `href`/`src` 指向 `frame/` |

**禁止**：交付页运行时引用 `frame/` 或技能目录。Admin 视觉基线在 `admin/src/styles/{pro,charts,pages}/`；WEB 在 `web/src/styles/{common,layouts,pages}/`；静态图在各工程 `src/assets/images/`。预览打开 `frame/gallery.html`，或对 `frame/<名>/` 起静态服务。

## 与当前工作流的关系

```text
SRS（srs-writer）→ feature-dev → 对照 frame/<end> 在 {PROJECT_PATH} 重写 Vue 页
```

1. **规格先行**：`feature-dev` 以 SRS 为真源（仅有 PRD 须先走 `srs-writer` Step F）。
2. **规范加载**：`{PROJECT_PATH}/README-DEV.md` → `.agents/knowledge/ui-libs/` → 通用 conventions。
3. **增页**：读本目录 `_meta/pages.catalog.json`（或等价 catalog）点名 page-type → 对照 HTML 样板 → 在既有 `pro-*` 结构上改列/筛/状态/操作。
4. **主题**：未点名不改默认主色/明暗/布局；用户明确要求时只改**交付工程**（如 `applyFrameTheme` / Pinia），**禁止改本母版**。

`frontend-design` 做独立界面/海报时不强制走本目录；后台功能页仍以 `feature-dev` + 本母版为准。

## 目录与当前库

本包母版目录挂在本目录根下；端别由 [index.json](./index.json) 的 `ends` 声明；`path` 为相对本目录的文件夹名。

| 路径 | 端 | capability | 当前用法 |
| --- | --- | --- | --- |
| `admin/` | admin | `full-runtime` | Vibe Design Pro HTML 样板；`feature-dev` 对照写入 Vue `admin/` |
| `web/` | web | `layouts-blocks-components` | 页面壳 / 区块 / 组件 HTML；`feature-dev` 对照写入 Vue `web/` |

| 框架目录 | 交付目录 | 说明 |
| --- | --- | --- |
| `frame/admin` | `admin/` | **对照重写**，不是整包复制 HTML runtime |
| `frame/web` | `web/` | **对照重写**三壳与页面；禁 ProShell |

用户自建前端（不在本包 `admin/`）时：以该子项目 `README-DEV.md` 为准，**禁止**静默用本目录覆盖已有工程。

## index.json 登记表

`index.json` 供 Agent / 维护者**选型**：端、默认库、`path`、能力级别。只建文件夹不登记 → 文档与选型流程**不会**指向该库。

```json
{
  "ends": {
    "admin": {
      "outputDir": "admin",
      "defaultFramework": "admin",
      "frameworks": {
        "admin": {
          "path": "admin",
          "theme": "arco",
          "capability": "full-runtime",
          "label": "管理后台 · Vibe Design Pro",
          "status": "ready"
        }
      }
    }
  }
}
```

| 字段 | 含义 |
| --- | --- |
| `ends.<end>` | 端：`admin` \| `web` \| `app` |
| `outputDir` | 默认交付目录名 |
| `defaultFramework` | 未指定时使用的 framework id |
| `frameworks.<id>.path` | 相对 `frame/` 的文件夹名 |
| `theme` | （admin）组件库主题键 |
| `status` | `ready` 可用；`pending` 仅预览、不作为默认对照源 |
| `capability` | 能力级别提示（文档/Agent 用） |

根目录 framework id **全局唯一**。多端同名库用可区分文件夹名（如 `admin-element-plus`），避免两个 end 抢同一个 `path`。

## 扩展框架（示例：新后台库）

1. 在 `frame/` 根下新建，例如 `admin-element-plus/`（**不要**覆盖或重命名现有 `admin/`）。
2. 按需补 `_meta/template.manifest.json`（建议另加 `pages.catalog.json`）。
3. 在 `index.json` → `ends.admin.frameworks` 增加条目；默认仍用现有库时 **不要**改 `defaultFramework`。
4. 同步：该库 `_meta`、对应 `ui-libs/` 或子项目 `README-DEV.md`。交付工程按新库对照重写。
5. **上墙（可选）**：`gallery.html` **不**读 `index.json`。只有官方样板要出现在预览墙时，再改 Gallery 内手写清单（见下节）。不做预览墙则跳过。

web / app 扩展同理：根下新目录 + 挂到对应 `ends.web` / `ends.app`。

## Gallery 预览

[gallery.html](./gallery.html) 是策展样板墙，**不是**交付选型源。`feature-dev` 增页以 SRS、`index.json` 与各库 `_meta/pages.catalog.json` 为准，不要改本页。

| 要点 | 说明 |
| --- | --- |
| 不同步注册表 | 端 / 页 / 主题清单写在页面脚本里（`ENDS`、`ADMIN_PAGES`、`APP_PAGES`、`STYLE_CATALOG`）。只改 `index.json` **不会**自动上墙 |
| 何时改 | 官方默认库增了要展示的样板，或新库明确要进预览墙 |
| 改什么 | 对应端的页面数组 + `PAGES_BY_END`；新端还要改 `ENDS`（`ready` / `base`） |
| 预览桥 | admin 用 `?galleryPreview=1` 跳过登录（非交付行为）；app 壳页须挂 `js/gallery-bridge.js` |
| 不要当源 | 交付与增页路径以 catalog 为准；Gallery 字段（分类、iframe 尺寸、`live`）只服务预览壳 |

页内「使用说明」面向浏览者（对照样板、跟 Agent 说「参考某某页」），不讲接入。WEB 端若仍显示「即将」，表示该端尚未写入 Gallery 清单，与 `frame/web` 是否可供对照无关。

## _meta/（可选）

各框架目录可含 `_meta/`，供 Agent 读取，**不复制**到交付工程，浏览器跑 Vue 应用时也不应依赖它。

| 文件 | 用途 |
| --- | --- |
| `template.manifest.json` | 模板 id、theme、version、`pageTypes` / shells、status（建议有） |
| `pages.catalog.json` | （admin 等 full-runtime 建议提供）`page-type →` 样板 html/js/css；**以各库为准**，勿把路径写死在技能正文 |

增页选型见 `.agents/knowledge/ui-libs/arco-design-vue/pages.md`；样板路径只读当前 framework 的 catalog。

## 维护

- 改后台母版：直接编辑 `frame/admin/`（优化落在 theme CSS / `boot.js` 等，勿改 `vendor/arco` 源码）。改完后按需把视觉同步到 `admin/src/styles/{pro,charts,pages}/`。
- **生成业务页时禁止改本母版**（见 `admin/README-DEV.md`）。
- 预览母版：打开 `frame/gallery.html`（Admin / WEB / STYLE）；单页也可直接打开如 `frame/admin/login-cover.html`、`frame/web/layouts/marketing-shell/index.html`。仅 `file://` 异常时再起静态服务。
- 交付工程预览：`cd admin && pnpm dev`；`cd web && pnpm dev`。
- WEB 壳上墙：改 `frame/web/layouts/catalog.json` 后，同步更新 `gallery.html` 中 `WEB_PAGES`（或按维护脚本重生成）。

## 维护核对

- [ ] 包根存在 `frame/{admin,web}` 且**目录名不变**（本包不包含 `frame/app`）
- [ ] `frame/index.json` 与真实文件夹、`defaultFramework` 一致
- [ ] 后台增页走 `feature-dev`，对照 `frame/admin`，规范在 `admin/README-DEV.md` + `ui-libs/arco-design-vue`
- [ ] 交付目录资源闭环；无运行时引用 `frame/`
- [ ] 新增库：根下新文件夹 + 改 `index.json` + `_meta` + 补知识库/README-DEV
- [ ] （可选）官方样板要进预览墙时，同步 `gallery.html` 手写清单；不要假设它跟随 `index.json`

## 相关文件

| 路径 | 用途 |
| --- | --- |
| [index.json](./index.json) | 端 → 框架登记 |
| [admin-usage.md](./admin-usage.md) | Admin 母版使用说明 |
| [gallery.html](./gallery.html) | 母版样板预览 Gallery（手写清单，不读 `index.json`） |
| [CODE0](./admin/) | 后台 HTML 母版（Vibe Design Pro） |
| [CODE0](./admin/_meta/template.manifest.json) | 模板元数据 / pageTypes |
| [CODE0](./admin/_meta/pages.catalog.json) | page-type → 样板路径 |
| [CODE0](./web/) | WEB 默认资源 |
| [CODE0](./app/) | APP 默认壳与 vendor |
| [CODE0](../admin/README-DEV.md) | Vue 交付工程实现规范 |
| `../.agents/skills/feature-dev/SKILL.md` | 按 SRS 实现功能 |
| `../.agents/knowledge/ui-libs/arco-design-vue/pages.md` | 对照重写与 page-type |
| `../.agents/knowledge/ui-libs/arco-design-vue/charts.md` | Admin 图表规范 |
| `../AGENTS.md` | 包级触发与工作流 |
