# shadcn-admin → Make 客户端适配说明

## 适配结果

从 `satnaing/shadcn-admin` v2.2.1 剥离，适配 Axhub Make 客户端（React 18.2 + Vite 5 + Tailwind v4 + MPA）。

### 已删除（不兼容 Make 栈）

| 类别 | 内容 |
|---|---|
| SPA 路由 | `src/routes/`、`src/routeTree.gen.ts`、`src/main.tsx`（TanStack Router） |
| 认证 | `@clerk/react` 相关路由、Clerk logo、`src/features/auth/` |
| 业务页 | `src/features/`（apps/chats/dashboard/settings/tasks/users）——是示例页不是组件 |
| SPA 布局壳 | `src/components/layout/`（app-sidebar/top-nav/nav-user/nav-group/authenticated-layout） |
| Router 业务组件 | command-menu、profile-dropdown、sign-out-dialog、navigation-progress |
| 服务端 | `src/context/`、`src/stores/`（auth-store）、`lib/cookies.ts`、`lib/handle-server-error.ts` |
| 工程配置 | `.github/`、`.vscode/`、`netlify.toml`、`public/`、测试文件、test-utils |

### 保留（可直接搬入 Make）

**`src/components/ui/` — 30 个 shadcn/ui 基础组件（零 router 依赖）：**

alert-dialog、alert、avatar、badge、button、calendar、card、checkbox、collapsible、command、dialog、dropdown-menu、form、input-otp、input、label、popover、radio-group、scroll-area、select、separator、sheet、sidebar、skeleton、sonner、switch、table、tabs、textarea、tooltip

**`src/components/data-table/` — TanStack Table 封装（6 文件）：**
bulk-actions、column-header、faceted-filter、index、pagination、toolbar、view-options

**独立工具组件（11 个）：**
coming-soon、config-drawer、confirm-dialog、date-picker、learn-more、long-text、password-input、search、select-dropdown、skip-to-main、theme-switch

**通用：**
`lib/utils.ts`（cn 函数）、`hooks/use-mobile.tsx`、`hooks/use-dialog-state.tsx`、`styles/`（index.css + theme.css）、`assets/`（logo + brand-icons + custom icons）

### package.json 变更

| 项 | 原 | 改后 |
|---|---|---|
| React | 19.2.5 | **18.2.0** |
| Vite | 8.0.8 | **5.4.21** |
| TypeScript | 6.0.3 | **5.9.3** |
| lucide-react | 1.8.0 | **0.562.0**（与 Make 一致） |
| zod | 4.3.6 | **3.25.0** |
| 已删依赖 | @clerk/react、@tanstack/react-router、@tanstack/react-query、@tanstack/router-plugin、@tanstack/react-query-devtools、@tanstack/react-router-devtools、axios、zustand、react-top-loading-bar、@hookform/resolvers、@radix-ui/react-direction、@radix-ui/react-icons | — |

## 搬入 Make 客户端的步骤

在 Make 客户端项目（如 `01-项目/AI漫剧工作台`）执行：

```bash
# 1. 装依赖（Make 客户端目前只装了 lucide-react 和 @xyflow/react）
pnpm add @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox \
  @radix-ui/react-collapsible @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-radio-group \
  @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator \
  @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-tooltip \
  @tanstack/react-table class-variance-authority clsx cmdk date-fns input-otp \
  react-day-picker react-hook-form recharts sonner tailwind-merge tw-animate-css zod@3
```

```bash
# 2. 把组件拷到 Make 的 component-templates 下
# ui/ → src/component-templates/基础/（或新建 src/component-templates/shadcn/）
# data-table/ → src/component-templates/数据展示/
# lib/utils.ts → src/lib/utils.ts（或合并到现有 common）
```

### 注意事项

1. **Tailwind v4 主题**：`src/styles/theme.css` 里的 CSS 变量要和 Make 客户端现有主题合并，不要直接覆盖。
2. **React 19 语法回退**：原组件用了 React 19 的 `use()`、新 JSX transform 等，搬入 Make 前需逐个文件检查（vite.config.ts 里 Make 用的是 `jsxRuntime: 'classic'` + `jsxFactory: 'React.createElement'`）。
3. **sidebar.tsx** 依赖 `use-mobile.tsx` hook 和 `Sheet` 组件，已保留。
4. **form.tsx** 依赖 `react-hook-form` + `zod`，版本对齐。
5. **calendar.tsx** 依赖 `react-day-picker@9.14.0`，注意和 date-fns v4 兼容。
