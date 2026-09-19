# frame/ — 共享原型母版（产品设计工作台 03-组件库）

本目录是 **vibepm-dev-agent v1.7 组件库迁入**后的共享母版根（HTML 母版、`_meta` catalog），**不是交付工程**，也不是可 `import` 的运行时。

> **当前交付状态（2026-09-13）**：`frame/` 下**三端齐全**——`admin/`（Vibe Design Pro 管理后台母版）、`web/`（WEB 静态资源包）、`app/`（iOS/微信设备壳）均为 `ready`；另有 `.style/` 视觉风格库（12 套，由 vibepm-demo-agent-v1.4 互补导入）。端状态以 `frame/index.json` 与 `component-registry.json` 为准，**不一致即视为缺陷**（smoke-test 有语义校验把关）。

## 消费方式

`feature-dev` 按 SRS 在**各项目交付子工程**（如 `01-项目/<项目>/admin/`）里用 **Vue SFC 对照重写**；编码约定见项目 `README-DEV.md` 与 `03-组件库/ui-libs/`。约定长文**不要**复制进本目录。

| 角色 | 路径 |
| --- | --- |
| 组件选型 / 调用 | `03-组件库/component-registry.json` → `frame/admin/_meta/pages.catalog.json` |
| 端 → 库登记 | `./index.json`（本目录） |
| 组件库 / 设计规范 | `../ui-libs/<库>/`（5 套：ant-design-pro / arco-design-vue / element-plus / shadcn / vant） |
| Admin 母版预览 | `./gallery.html`（Gallery 预览墙，手写清单） |

> 技能正文（feature-dev / srs-writer 等）为 v1.7 源包内容（`C:\Users\游翔\Documents\AI work\更新资料\vibepm-dev-agent-v1.7\`），工作台按用户拍板**只放路由入口不内置技能**（T18）；生成链路所需技能知识以 v1.7 源包为权威真源。

## 设计目标

| 目标 | 做法 |
| --- | --- |
| 母版与交付分离 | `frame/` 只作对照；交付落在各项目 `admin/`（Vue 工程）等子工程 |
| 对照重写，不复制 runtime | 点名页面 id，继承 `pro-*` 结构后改业务；禁止粘贴母版 HTML / `window.*` |
| 端别清晰 | 默认三套目录与端同名：`admin` / `web` / `app`；**勿改名**；端状态以 index.json/registry 为准（v1.4 导入后三端齐备 status=ready） |
| 可扩展 | 新增组件模板库 → 在 `frame/` **根下新建文件夹** + 改 `index.json`（并同步 `component-registry.json`） |

## 包结构（工作台内）

```text
03-组件库/
├── component-registry.json     ← 端 / 库登记（pageTypeCount 必须与 catalog 实际页数一致）
├── frame/                      ← 共享母版（本目录）
│   ├── README.md               ← 本文
│   ├── index.json              ← 端 → 框架登记（选型用；三端 ready）
│   ├── gallery.html            ← 母版画廊（预览墙，手写清单，不读 index.json）
│   ├── .style/                 ← 视觉风格库（12 套：style.md + preview.html，v1.4 导入）
│   ├── admin/                  ← 后台 HTML 母版（Vibe Design Pro，status=ready）
│   │   └── _meta/
│   │       ├── template.manifest.json   ← 模板元数据 / pageTypes
│   │       └── pages.catalog.json       ← page-type → 样板路径（50 页）
│   ├── web/                    ← WEB 静态资源包（fonts/vendor/css/js，v1.4 导入，ready）
│   │   └── _meta/template.manifest.json
│   └── app/                    ← APP 设备壳（iOS/微信壳 + css/js/fonts/images/vendor，v1.4 导入，ready）
│       └── _meta/template.manifest.json
└── ui-libs/                    ← 组件库规范（ant-design-pro / arco-design-vue / element-plus / shadcn / vant）
```

## 职责划分

| 区域 | 放什么 | 不放什么 |
| --- | --- | --- |
| `frame/*` | 可预览的 HTML 母版、壳、`_meta` catalog | 产品业务页、SRS/PRD、技能流程长文 |
| 各项目 `admin/` 等交付工程 | 用户可运行的 Vue（或其它）工程 | 运行时 `href`/`src` 指向 `frame/` 或 `ui-libs/` |
| `ui-libs/` | 组件库设计规范、page-type 说明 | 交付依赖（运行时不引用） |

**禁止**：交付页运行时引用 `frame/` 或 `ui-libs/`。Admin 视觉基线由对照重写落到各项目 `src/assets/style/`；预览可对 `frame/<名>/` 起静态服务。

## 与当前工作流的关系

```text
SRS（v1.7 srs-writer）→ feature-dev → 对照 frame/<end> 在各项目 {PROJECT_PATH} 重写 Vue 页
```

1. **规格先行**：`feature-dev` 以 SRS 为真源（仅有 PRD 须先走 `srs-writer` Step F）。
2. **规范加载**：项目 `README-DEV.md` → `03-组件库/ui-libs/<库>/` → 通用 conventions。
3. **增页**：读 `frame/admin/_meta/pages.catalog.json` 点名 page-type → 对照 HTML 样板 → 在既有 `pro-*` 结构上改列/筛/状态/操作。
4. **主题**：未点名不改默认主色/明暗/布局；用户明确要求时只改**交付工程**，**禁止改本母版**。

## 目录与当前库

默认三套目录挂在本目录根下；端别由 `./index.json` 的 `ends` 声明；`path` 为相对本目录的文件夹名。

| 路径 | 端 | capability | 当前用法 |
| --- | --- | --- | --- |
| `admin/` | admin | `full-runtime` | **主路径（已交付）**：Vibe Design Pro HTML 样板；`feature-dev` 对照写入项目 Vue `admin/` |
| `web/` | web | `vendor-and-conventions` | **已交付（v1.4 导入）**：静态站 fonts/vendor；按需拷资源到交付目录 |
| `app/` | app | `shells-and-vendor` | **已交付（v1.4 导入）**：iOS/微信壳 HTML + vendor；按需选用壳模板 |

能力可以不对称：admin 是完整后台样板（50 页 catalog）；web/app 为基座资源包（fonts/vendor/壳），已随包交付。

| 框架目录 | 交付目录 | 说明 |
| --- | --- | --- |
| `frame/admin` | 项目 `admin/` | **对照重写**，不是整包复制 HTML runtime |
| `frame/web` | 项目 `web/`（若存在） | 首次建站可拷 `fonts` / `vendor` / `images`（v1.4 已导入） |
| `frame/app` | 项目 `app/`（若存在） | 选壳模板生成页面，并拷运行时资源（iOS/微信壳，v1.4 已导入） |

用户自建前端（不在工作台项目内）时：以该项目 `README-DEV.md` 为准，**禁止**静默用本目录覆盖已有工程。

## index.json 登记表

`index.json` 供 Agent / 维护者**选型**：端、默认库、`path`、能力级别、状态。只建文件夹不登记 → 文档与选型流程**不会**指向该库。

| 字段 | 含义 |
| --- | --- |
| `ends.<end>` | 端：`admin` \| `web` \| `app` |
| `outputDir` | 默认交付目录名 |
| `defaultFramework` | 未指定时使用的 framework id |
| `frameworks.<id>.path` | 相对 `frame/` 的文件夹名 |
| `theme` | （admin）组件库主题键（默认 `arco`） |
| `status` | `ready` 可用（目录必须真实存在）；`registered` 登记未交付（目录可不存在） |
| `capability` | 能力级别提示（文档/Agent 用） |

> **状态一致性铁律**：`status === "ready"` 的端其目录必须真实存在；`frame/index.json` 与 `component-registry.json` 的端状态必须一致（smoke-test `语义一致性` 段自动校验）。

## 扩展框架（示例：新后台库）

1. 在 `frame/` 根下新建，例如 `admin-element-plus/`（**不要**覆盖或重命名现有 `admin/`）。
2. 按需补 `_meta/template.manifest.json`（建议另加 `pages.catalog.json`）。
3. 在 `index.json` → `ends.admin.frameworks` 增加条目；默认仍用现有库时 **不要**改 `defaultFramework`。
4. 同步：该库 `_meta`、对应 `ui-libs/` 或项目 `README-DEV.md`；登记 `component-registry.json`（pageTypeCount 同步 catalog 实际页数）。
5. **上墙（可选）**：`gallery.html` **不**读 `index.json`。只有官方样板要出现在预览墙时，再改 Gallery 内手写清单（见下节）。不做预览墙则跳过。

web / app 扩展同理：根下新目录 + 挂到对应 `ends.web` / `ends.app`（并补资源后把 status 置 `ready`）。

## Gallery 预览

`./gallery.html` 是策展样板墙，**不是**交付选型源。`feature-dev` 增页以 SRS、`index.json` 与各库 `_meta/pages.catalog.json` 为准，不要改本页。

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

增页选型见 `../ui-libs/arco-design-vue/pages.md`；样板路径只读当前 framework 的 catalog。

## 维护

- 改后台母版：直接编辑 `frame/admin/`（优化落在 theme CSS / `boot.js` 等，勿改 `vendor/arco` 源码）。改完后按需把视觉同步到各项目 `src/assets/style/`。
- **生成业务页时禁止改本母版**（各项目规范见其 `README-DEV.md`）。
- 预览 admin 母版：打开 `frame/admin/login-cover.html`（演示账号 `admin` / `123456`）；浏览多页样板打开 `frame/gallery.html`。仅 `file://` 异常时再起静态服务。官方库增页后若要上墙，同步改 Gallery 手写清单（见「Gallery 预览」）。
- 端状态变更后：同步 `index.json` + `component-registry.json` + 本 README「目录与当前库」表，跑 `06-运行脚本/smoke-test.mjs` 验收。

## 维护核对

- [ ] `frame/index.json` 与真实文件夹、`defaultFramework` 一致（`ready` 端目录必须存在）
- [ ] `frame/index.json` 与 `component-registry.json` 端状态、version 一致
- [ ] `component-registry.json` 的 `pageTypeCount` 等于 `pages.catalog.json` 实际页数
- [ ] 后台增页走 `feature-dev`（v1.7 源包），对照 `frame/admin`，规范在项目 `README-DEV.md` + `ui-libs/arco-design-vue`
- [ ] 交付目录资源闭环；无运行时引用 `frame/` 或 `ui-libs/`
- [ ] 新增库：根下新文件夹 + 改 `index.json` + `_meta` + 补 `ui-libs/` 规范 + registry 登记
- [ ] （可选）官方样板要进预览墙时，同步 `gallery.html` 手写清单；不要假设它跟随 `index.json`

## 相关文件

| 路径 | 用途 |
| --- | --- |
| `./index.json` | 端 → 框架登记（三端 ready） |
| `./gallery.html` | 母版样板预览 Gallery（手写清单，不读 `index.json`） |
| `./admin/` | 后台 HTML 母版（Vibe Design Pro，已交付） |
| `./admin/_meta/template.manifest.json` | 模板元数据 / pageTypes |
| `./admin/_meta/pages.catalog.json` | page-type → 样板路径（50 页） |
| `../component-registry.json` | 端 / 库登记（pageTypeCount=50，与 catalog 一致） |
| `../ui-libs/arco-design-vue/pages.md` | 对照重写与 page-type（增页选型） |
| `../ui-libs/arco-design-vue/charts.md` | Admin 图表规范 |
| `../ui-libs/`（ant-design-pro / element-plus / shadcn / vant） | 其余组件库规范 |

## vendor 双副本同步维护声明（2026-09-19）

本目录 `web/vendor/` 与 `app/vendor/`（预览页运行时依赖，304 处 `./vendor/...` 相对引用）
与 `02-模板/vendor/{vibepm-web,vibepm-app}/`（新建项目装配到
`.agents/skills/{vibepm-web,app}-generator/assets/vendor` 的素材）内容 MD5 一致。

- **组件库侧 vendor**：预览页 gallery.html / frame 运行时必需，**不可删**（删即预览 404）。
- **模板侧 vendor**：新建 make 项目时 server.mjs 按需装配到项目 .agents，**不可删**（删即技能生成器找不到运行时）。
- **更新规则**：改任一侧 vendor 后，必须把改动同步到另一侧，保持两边 MD5 一致。
  验证命令：分别对两侧同子目录算 MD5 清单，diff 应为空。
- admin/vendor（5.00MB）为 admin 框架独有，不在双副本范围内。

