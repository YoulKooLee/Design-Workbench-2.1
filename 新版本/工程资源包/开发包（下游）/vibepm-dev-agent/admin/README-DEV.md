# Vibe Design Pro - 开发规范

> **AI 协作说明**：技能触发与工作流见 [AGENTS.md](../AGENTS.md)；**本文为项目实现规范的单一事实来源**。
>
> 使用前请填写下方「项目配置」表格；`page-spec-loader` 优先读取本文，再从 `{WORKSPACE_PATH}/.agents/knowledge/` 加载通用与 UI 库规范；**冲突时以本文为准**。

## 项目配置（必填）

| 配置项 | 填写示例 | 你的值 |
|--------|---------|--------|
| 项目名称 | XX 管理后台 | Vibe Design Pro |
| WORKSPACE_PATH | 仓库根（含 `.agents/`） | 仓库根（含 `.agents/`） |
| PROJECT_PATH | 本子项目目录（含 `package.json`） | `admin/` |
| UI 组件库 | element-plus / vant | `@arco-design/web-vue` |
| 导航方式 | 侧边栏 / 顶部栏 / 底部 Tabbar | 侧边栏 |
| 路由注册方式 | `src/router/modules/` + `routeModules` | `src/router/routes/modules/`（Pro glob 自动汇总） |
| 菜单来源 | 路由 meta 自动生成 / 独立菜单配置 | 路由 meta 自动生成 |
| 布局壳组件 | `@/views/index/index.vue` | `@/layout/default-layout.vue`（ProShell：`pro-layout`，对照 `frame/admin`） |
| 主题 / 布局 | — | Pinia `pro-settings`：主题色预设、明暗、顶栏/侧栏通顶、图表 palette |
| 图表 | ProChart / shadcn-charts（默认） | Unovis + `public/vendor/charts/shadcn-charts.js`；顶栏切换 `--chart-*`；**勿**再用 echarts/`<Chart>` 做业务图 |
| Mock 模式 | 手动 Mock + `VITE_USE_MOCK` | 登录：Pro mockjs；业务页：手动 Mock + `VITE_USE_MOCK` |
| API 前缀 | `/admin` / `/api` | `/api` |
| 默认登录账号（Mock） | admin / 123456 | admin / 123456 |
| 开发端口 | 3006 | 3006 |

## 技术栈

- **框架**: Vue 3
- **构建工具**: Vite
- **语言**: TypeScript
- **UI 组件库**: Arco Design Vue
- **状态管理**: Pinia
- **路由**: Vue Router
- **HTTP 客户端**: axios（`src/utils/http/request.ts`）
- **工程起点**: 曾基于 [Arco Design Pro（Vue）](https://github.com/arco-design/arco-design-pro-vue) 裁剪；**现为 Vibe 自维护交付工程，不再追踪该上游**

## 底座与自维护策略

官方 [arco-design-pro-vue](https://github.com/arco-design/arco-design-pro-vue) 自 **2024-05** 起已无实质更新，**不可再作为持续演进的上游**。本工程按 **自维护交付底座** 运营：日常开发与 Agent 生成均对照 **`frame/admin`** 与本仓库约定，**不**依赖官方 Pro 仓库同步。

| 层级 | 维护方 | 策略 |
|------|--------|------|
| **本工程**（`admin/`） | Vibe / 项目团队 | 路由、Layout（`pro-shell`）、Mock、主题、`pro-*` 组件、图表封装等**自行演进** |
| **`frame/admin`** | Vibe 母版 | UI / 交互 / 页面类型的**唯一对照源**；加页点名母版 id，禁止改母版、禁止整文件粘贴 |
| **`@arco-design/web-vue`** | Arco 官方 npm | **独立升级**；与 Pro 模板停更无关，按小版本定期跟进 |
| **Arco Design Pro 模板** | 上游（已停更） | **不追踪**；勿期望 merge 官方 Layout、示例页或 Vite 配置 |
| **工具链**（Vite / TS / axios 等） | 本工程 | **自行规划**分步现代化；不等待 Pro 上游 |

**对照优先级**（冲突时）：`README-DEV.md` → `frame/admin` → `.agents/knowledge/ui-libs/arco-design-vue/` → 官方 Arco 组件文档。**勿**以官方 Pro 文档或 Pro 示例页作为本工程写法依据。

**升级节奏（建议）**：

1. `@arco-design/web-vue`：业务需要或安全通告时升级；升级后跑 `pnpm build` 与代表页冒烟。
2. 工具链：单独立项、分批推进（如 Vite → TypeScript → axios），与业务页开发解耦。
3. 新能力（页面模式、图表、布局）：优先在 `frame/admin` 与 `admin/` 内沉淀，**不**从停更的 Pro 仓库拉取。

**分批方案**：详见 [UPGRADE.md](./UPGRADE.md)（P0 清理与安全 → P1 Vite/TS → P2 Vue 生态 → P3 Lint 可选）。合并前本地跑 `pnpm type:check` + `pnpm build` 做门禁。

**备选路线**：若 Arco 生态或工具链风险不可接受，工作区另有 `element-plus/`、`ant-design-pro/`、`shadcn/` 等 Starter；新立项时可评估切换，现有 `admin/` 工程仍可按本策略自维护至迁移完成。

## 工作区目录

```
{WORKSPACE_PATH}/
├── .agents/
├── AGENTS.md
├── docs/
├── admin/                 # 本子项目 PROJECT_PATH（Vibe Design Pro）
│   ├── README-DEV.md
│   ├── package.json
│   └── src/
├── element-plus/          # Vue + Element Plus（可选 Starter）
├── ant-design-pro/        # React + Umi Max + antd Pro（可选 Starter）
├── shadcn/                # React + shadcn/ui（可选 Starter）
└── frame/admin/           # 原型母版（对照源，勿嵌进本工程）
```

## 规范加载顺序

| 优先级 | 来源 | 说明 |
|--------|------|------|
| 1 | 本文件 `README-DEV.md` | 路由、布局、Mock、项目约定 |
| 2 | `.agents/knowledge/ui-libs/arco-design-vue/` | Arco 组件 / 页面 / 图表（`components`·`pages`·`charts`） |
| 3 | `.agents/knowledge/conventions/project.md` | 通用目录与命名 |
| 4 | `.agents/knowledge/conventions/mock.md` | Mock 通用规则 |

## 环境要求

- **Node.js**: >= 20.19.0（建议）
- **包管理器**: pnpm >= 8.8.0（建议）

## 快速开始

```bash
cd admin
pnpm install
pnpm dev
pnpm build
```

默认账号：`admin` / `123456`。

## 项目结构

路径相对于 **PROJECT_PATH**：

```
src/
├── assets/images/       # 对照 frame/admin/images（登录底图、异常插画、个人页横幅）
├── components/charts/   # ProChart（Unovis + ProShadcnCharts）
├── components/metric-card/
├── components/pro-search-panel/ · pro-toolbar/
├── plugins/fa-icons.ts  # FA 全量 icon-* 映射
├── api/                 # 业务接口（ticket / workplace / form-basic）
├── mock/                # 业务手动 Mock
├── router/routes/modules/  # 含 components / charts 橱窗
├── types/
├── utils/http/          # request.get/post/put/del
├── layout/              # default-layout 壳（ProShell）
├── views/dashboard/workplace/
├── views/list/search-table/
├── views/form/basic/
├── views/components/    # 常用组件橱窗（basic / list / form / form-extended / metric-card，对齐母版）
└── views/charts/        # 图表橱窗（basic / extended / palette）
```

## 核心开发规范

- 使用 `<script setup lang="ts">` + `defineOptions({ name: 'XxxPage' })`
- 新建页面：先定 page-type（见 `.agents/knowledge/ui-libs/arco-design-vue/pages.md`）→ types → mock → api → views → `router/routes/modules/` → locales 菜单键
- **禁止裸 Arco 拼页**：必须继承 `pro-search-*` / `pro-toolbar` / `pro-table-footer` / `pro-detail*` 等 Pro 结构；禁止用 `layout="inline"` 简易筛选顶替 `pro-search-panel`（除非母版样板本身如此）
- **禁止橱窗当业务页**：`views/components/*`、`views/charts/*` 仅作写法参考，不得改名注册为业务菜单
- 页面正文直接中文；菜单 `meta.locale` 用翻译键，同步 `locale/zh-CN.ts` 与 `en-US.ts` 以及页面 locale 文件
- Mock 数据使用固定数据，不用随机数
- 列表页：优先用 `ProSearchPanel` + `ProToolbar` + `useTableDensity`；卡片无边框、无阴影
- 列表/筛选卡间距：无 `title`/`header` 的 `.general-card` body 须为 **16px**（`global.less` 已全局处理）；筛选卡加 `pro-page-card` 以保留与下方表格卡 **16px** 间距。勿再写 `padding: 0 20px 20px` 类局部覆盖
- 图表：**默认** `ProChart`（`components/charts/`，底层 Unovis + ProShadcnCharts / `public/vendor/charts/shadcn-charts.js`），读 `--chart-1…10`；顶栏可切换图表配色（`utils/chart-palette.ts`，对齐母版 `chart-palette.js`）。主题色/明暗/布局变化会派发 `arco-pro-theme-change` 触发刷新。禁止业务页使用遗留 echarts `<Chart>`。**取色**：系列色只用 `var(--chart-N)`，独立单系列一律 C1，标题色条用主题色勿用 `--chart-*`；圆环新页默认 `shadcn-donut-legend--inline`。细则见 `.agents/knowledge/ui-libs/arco-design-vue/charts.md`
- 图标：Font Awesome 为默认方案。模板/菜单/KPI 只用已映射的 `icon-*`；新增图标先补 `FA_ICON_MAP`，禁止 `app.use(ArcoVueIcon)` 或从 `@arco-design/web-vue/es/icon` 引入。Arco 内置控件 SVG（清除、下拉箭头、日期、密码显隐、表头排序）由 `fa-icons.css` / 表头 patcher 替换。403/404/500 插画与图表绘制保持 SVG。**作 `<img src>` 使用时必须** `import x from '@/assets/images/xxx.svg?url'`（本项目启用了 `vite-svg-loader`，裸 import 会变成 Vue 组件）
- 业务 API：`VITE_USE_MOCK === 'true'` 时走 `src/mock/`，返回 `{ code: 200, message: 'success', data }`
- 登录仍走 Pro mockjs 拦截（成功码 `20000`），勿与业务手动 Mock 混用同一套包装
- HTTP 使用 `request.get/post/put/del`，禁止裸 `fetch`
- 完成后执行 `pnpm build`；不要长期占用 `pnpm dev`
- 对照 `frame/admin` 重写页面，禁止整文件粘贴 HTML / `window.*` 脚本；**禁止修改 `frame/admin` 母版**
- 静态图：优先放 `src/assets/images/`，与 `frame/admin/images` 同步；登录底图由 `login-cover.css` 引用，异常页/个人中心在组件内 import
- 视觉基线：`src/styles/pro/`（壳：`arco-theme-pro` / `layout` / `pages-common` / `fa-icons` / `bridge`，`main.ts` 全局挂）+ `src/styles/charts/`（图表共用）+ `src/styles/pages/`（页级，在对应 `views` 内 `import`）。页侧共用：`login-shared.css`、`dashboard-shared.css` 由变体/业务页 css `@import`，views **不**直挂。样板页优先使用 `workplace-*` / `pro-*` / `form-basic-*` / `list-card-metric-*` / `component-*` 类名
- 主题：启动时 `applyFrameTheme()`（`src/utils/frame-theme.ts`）写入默认品牌紫（`#6C5CE7`）与色板；顶栏切换走 Pinia `pro-settings`。**未点名不改**默认主色/明暗/布局。用户点名换肤 / 对齐 WEB 主色时：读 `.agents/knowledge/ui-libs/arco-design-vue/style.md`（含 WEB→Admin preset 对照、令牌纪律）；只改本工程，**禁止改 `frame/admin`**。改 PRESET 时须与母版 `frame/admin/assets/common/js/arco-theme.js` 双份对齐（见该 style.md「preset 双份维护」）
- Windows 换行统一 LF（`.editorconfig` + Prettier `endOfLine: lf`），避免 vite-plugin-eslint 因 `Delete ␍` 中断页面


## 参考页面

- 列表页参考：`src/views/list/search-table/index.vue`（对齐母版 `list-search-table`，菜单名「数据列表」）
- 表单页参考：`src/views/form/basic/index.vue`
- 概览页参考：`src/views/dashboard/workplace/index.vue`
- 原型对照：`frame/admin` 的 `dashboard` / `list-search-table` / `form-basic` / `login-cover`

## 项目特有约定

- 工程起点为官方 `arco-design-pro-vite` 裁剪版；第一期已移除可视化、结果页、详情页、卡片列表、步骤/分组表单等 Pro 示例，并替换为 Vibe 定制壳与 `frame/admin` 对齐能力（详见上文「底座与自维护策略」）
- 403/404/500 与个人中心路由保留，但侧栏 `hideInMenu`
- 目录名 `admin/` 可改，改后更新本文 `PROJECT_PATH`
- 后续加页请点名 `frame/admin` 页面 id，对照重写进本工程
