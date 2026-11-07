# Vibe Design WEB - 开发规范

> **AI 协作说明**：技能触发与工作流见 [AGENTS.md](../AGENTS.md)；**本文为项目实现规范的单一事实来源**。
>
> 使用前请填写下方「项目配置」表格；`page-spec-loader` 优先读取本文，再从 `{WORKSPACE_PATH}/.agents/knowledge/` 加载通用与 UI 库规范；**冲突时以本文为准**。

## 项目配置（必填）

| 配置项 | 填写示例 | 你的值 |
|--------|---------|--------|
| 项目名称 | XX 官网 / 产品站 | Vibe Design WEB |
| WORKSPACE_PATH | 仓库根（含 `.agents/`） | 仓库根（含 `.agents/`） |
| PROJECT_PATH | 本子项目目录（含 `package.json`） | `web/` |
| UI 组件库 | @arco-design/web-vue | `@arco-design/web-vue` |
| 站型 siteKind | marketing / product | 默认 `marketing`；`/app/*` 为 `product` |
| 导航方式 | 营销顶栏 / 侧栏 | 营销顶栏 + 产品侧栏 + 登录居中 |
| 路由注册方式 | 扁平 `src/router/index.ts` | `src/router/index.ts`（无后台菜单中枢） |
| 菜单来源 | 壳内配置 / 路由 | 壳 props / 路由表 |
| 布局壳组件 | MarketingShell 等 | `src/layouts/MarketingShell.vue` · `AppSidebarLayout.vue` · `LoginShell.vue`（对照 `frame/web`） |
| 主题 / 布局 | — | Pinia `theme`：明暗；token `--wa-*` |
| 图表 | 按需 | **默认不装**；`product` 按需再加 |
| Mock 模式 | 手动 Mock + `VITE_USE_MOCK` | 手动 Mock + `VITE_USE_MOCK` |
| API 前缀 | `/api` | `/api` |
| 默认登录账号（Mock） | admin / 123456 | admin / 123456 |
| 开发端口 | 3010 | 3010 |

## 技术栈

- **框架**: Vue 3
- **构建工具**: Vite
- **语言**: TypeScript
- **UI 组件库**: Arco Design Vue
- **状态管理**: Pinia（仅主题等最小 store）
- **路由**: Vue Router（扁平）
- **HTTP 客户端**: axios（`src/utils/http/request.ts`）
- **图标**: Font Awesome Classic Pro（`public/vendor/fontawesome/` 本地，禁 CDN；**勿**引入 Sharp）
- **工程起点**: Vite `vue-ts` 薄工程；**不是** Arco Pro / admin 裁剪

## 底座与母版对照

| 层级 | 维护方 | 策略 |
|------|--------|------|
| **本工程**（`web/`） | Vibe / 项目团队 | 路由、三壳、Mock、主题、业务页自行演进 |
| **`frame/web`** | Vibe 母版 | UI / 壳 / 区块的**唯一对照源**；加页点名 layout/block id，禁止改母版、禁止整文件粘贴 HTML / `window.*` |
| **`@arco-design/web-vue`** | Arco 官方 npm | 独立升级 |

**对照优先级**（冲突时）：`README-DEV.md` → `frame/web` → `.agents/knowledge/ui-libs/vibe-design-web/` → （控件细节）`ui-libs/arco-design-vue/components.md` → 官方 Arco 文档。

**禁止**：引入 ProShell、`pro-*`、`pro-layout`、后台 meta 菜单生成、权限中枢等 Admin 运行时。

## 工作区目录

```
{WORKSPACE_PATH}/
├── .agents/
├── AGENTS.md
├── docs/
├── web/                   # 本子项目 PROJECT_PATH
│   ├── README-DEV.md
│   ├── package.json
│   └── src/
├── admin/                 # 管理后台（勿与本工程混壳）
└── frame/web/             # 原型母版（对照源，勿嵌进本工程）
```

## 规范加载顺序

| 优先级 | 来源 | 说明 |
|--------|------|------|
| 1 | 本文件 `README-DEV.md` | 路由、布局、Mock、项目约定 |
| 2 | `.agents/knowledge/ui-libs/vibe-design-web/` | WEB 壳 / 页面 / 样式 |
| 3 | `.agents/knowledge/ui-libs/arco-design-vue/components.md` | Arco 控件用法（按需） |
| 4 | `.agents/knowledge/conventions/project.md` | 通用目录与命名 |
| 5 | `.agents/knowledge/conventions/mock.md` | Mock 通用规则 |

## 环境要求

- **Node.js**: >= 20.19.0（建议）
- **包管理器**: pnpm >= 8.8.0（建议）

## 快速开始

```bash
cd web
pnpm install
pnpm dev
pnpm build
pnpm type:check
pnpm lint
pnpm format
```

请用 **`pnpm install`**（勿用 npm，避免 lock 不一致）。`prepare` 在无 `.git` 时会跳过 husky。

默认 Mock 账号：`admin` / `123456`（对齐母版 login-shell）。开发端口 **3010**（与 admin `3006` 错开）。

### 工程体验（P3-lite）

| 项 | 说明 |
|----|------|
| EditorConfig / Prettier | LF、`endOfLine: lf`（对齐 Windows） |
| ESLint 9 flat | `eslint.config.js`（recommended + vue + ts，规则偏宽） |
| husky | `scripts/prepare-husky.mjs`：无仓库则跳过 |

## 项目结构

```
src/
├── api/                 # 业务接口
├── mock/                # 手动 Mock
├── layouts/             # MarketingShell / AppSidebarLayout / LoginShell
├── views/               # home / app / login
├── router/              # 扁平路由
├── stores/              # theme
├── styles/              # common/（对照 frame/web assets/common/css）+ layouts/ + pages/
├── utils/http/          # request.get/post/put/del
├── plugins/             # 预留
└── components/          # 站点级小组件；blocks 按需从母版迁
```

## 核心开发规范

- 使用 `<script setup lang="ts">` + `defineOptions({ name: 'XxxPage' })`
- 新建页面：先定壳（marketing / product / login）→ mock → api → views → 注册扁平路由
- **对照 `frame/web` 重写**，禁止整文件粘贴母版 HTML / `window.*`；**禁止修改 `frame/web`**
- 类名使用 `wa-layout-*` / `wa-*`；**禁止** `pro-*` / ProShell
- WEB ↔ Admin 可互鉴结构，**禁混壳**
- HTTP 使用 `request.get/post/put/del`，禁止裸 `fetch`；拦截器挂在 `utils/http/request` 实例上：自动带 `Authorization`、校验 `code === 200`、过期码 `50008/50012/50014`（及 HTTP 401/403）弹窗回登录
- Token：`utils/auth.ts`（`wa_token` / `wa_user_name`）；登录写入、退出 `clearAuth`
- FA：`plugins/fa-icons.ts`（Classic Pro，注册 `icon-*` + MutationObserver 补丁）；**勿**用 Admin Sharp
- `VITE_USE_MOCK === 'true'` 时走 `src/mock/`，返回 `{ code: 200, message, data }`
- 完成后执行 `pnpm build`；不要长期占用 `pnpm dev`
- 未点名不做全壳、全 blocks、重图表

## 参考页面

- 营销首页：`src/views/home/index.vue`（对照 `marketing-shell`）
- 产品工作台：`src/views/app/workplace.vue`（对照 `app-sidebar`）
- 登录：`src/views/login/index.vue`（对照 `login-shell`）

## 项目特有约定

- `siteKind=marketing` 默认壳 MarketingShell；`product` 用 AppSidebarLayout；登录独立 LoginShell
- `auth-split`、其余 layouts、blocks 按业务增量迁，不一次做全
- 目录名 `web/` 可改，改后更新本文 `PROJECT_PATH`
