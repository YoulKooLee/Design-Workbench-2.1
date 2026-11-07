# Ant Design Pro 页面规范

适用于 **React 19 + Umi Max 4 + antd 6 + @ant-design/pro-components** 管理后台。

> 路由（`config/routes.ts`）、Layout（`src/app.tsx`）、Mock、权限以 `{PROJECT_PATH}/README-DEV.md` 为准。  
> 组件用法见同目录 `components.md`；图表见 `charts.md`。

## 核心铁律：用 Pro 基建，改业务内容

**生成页必须像工程内参考页（ProTable / PageContainer / ProForm），而不是 antd 文档里的最小示例。**

| 必须保留 | 必须按业务改 |
| --- | --- |
| `PageContainer` 页壳 | 筛选字段、表格列、表单字段 |
| `ProTable` / `ProForm` / `ProDescriptions` 等 Pro 容器 | mock 数据、文案、枚举 |
| `config/routes.ts` 注册 + `menu.ts` 翻译键 | 路由 path、`name`、`icon` |
| React Query 请求与 mutation 模式（参考 `table-list`） | API 路径与类型 |

| 禁止 | 原因 |
| --- | --- |
| 裸 `Table` + `Form` 拼完整 CRUD 页 | 丢失搜索栏、工具栏、分页约定 |
| 页面文件不在 `src/pages/` 或未写进 `routes.ts` | Umi 不会编译、菜单不出现 |
| 手写侧栏顶栏替代 Umi Layout | 与 Pro 布局体系冲突 |
| Mock 用随机数 | 不利于演示与测试稳定 |

## 需求 → 页面类型速查

| 用户描述 | 优先实现 | 工程参考页 |
| --- | --- | --- |
| 登录 | 无 Layout 登录页 | `src/pages/user/login` |
| 工作台 / Dashboard | 图表 + 指标卡 | `src/pages/dashboard/workplace` |
| 监控大屏 | 多图表布局 | `src/pages/dashboard/monitor` |
| 列表、筛选、CRUD、分页 | `ProTable` | `src/pages/table-list` |
| 卡片列表 | `List` + `PageContainer` | `src/pages/list/card-list` |
| 标准列表（非 ProTable） | `List` 组件页 | `src/pages/list/basic-list` |
| 搜索列表（Tab） | Tab + 子路由 | `src/pages/list/search` |
| 基础表单 | `ProForm` | `src/pages/form/basic-form` |
| 分步表单 | `StepsForm` | `src/pages/form/step-form` |
| 高级 / 分组表单 | 多 Card + ProForm | `src/pages/form/advanced-form` |
| 基础详情 | `ProDescriptions` | `src/pages/profile/basic` |
| 高级详情 | 多区块 + 步骤 | `src/pages/profile/advanced` |
| 成功 / 失败结果 | `Result` | `src/pages/result/success`、`fail` |
| 403 / 404 / 500 | 异常页 | `src/pages/exception/*` |
| 账户设置 | 表单 + 列表混合 | `src/pages/account/settings` |

无匹配时选最接近参考页，或询问用户。

## 标准列表页结构

```
PageContainer
  └── ProTable
        ├── search（内置筛选区）
        ├── toolBarRender（新建等）
        ├── columns（含 valueType / valueEnum）
        ├── rowSelection + FooterToolbar（可选，批量操作）
        └── Drawer + ProDescriptions（可选，行内详情）
```

复杂新建/编辑拆到 `src/pages/{feature}/components/`。

## 标准表单页结构

```
PageContainer
  └── Card variant="borderless"
        └── ProForm（layout="vertical" 或参考页）
              └── ProFormText / ProFormSelect / ...
```

弹窗表单不放页面主文件时，用 `components/*Form.tsx` + `ModalForm`。

## 页面开发流程

1. `src/pages/{module}/data.d.ts` 或 `src/services/**/typings.d.ts` — 类型
2. `mock/{module}.ts` 或 `src/pages/{module}/_mock.ts` — Mock（若需要）
3. `src/services/{module}.ts` — API
4. `src/pages/{module}/index.tsx` — 页面（及 `components/` 子组件）
5. `config/routes.ts` — 注册路由与菜单
6. `src/locales/zh-CN/menu.ts` + `en-US/menu.ts` — 菜单翻译
7. `npm run build` — 验证

## 路由与菜单（摘要）

```typescript
// config/routes.ts
{
  path: '/order',
  name: 'order',
  icon: 'table',
  routes: [
    { path: '/order', redirect: '/order/list' },
    { path: '/order/list', name: 'order-list', component: './order/list' },
  ],
},
```

- `component: './order/list'` → 文件 `src/pages/order/list/index.tsx`
- 隐藏菜单：`hideInMenu: true`；无 Layout：`layout: false`（登录页）
- 权限：`access: 'canAdmin'`，逻辑在 `src/access.ts`

## 参考页面（优先对照）

| 类型 | 路径 |
| --- | --- |
| 列表 + CRUD + 抽屉详情 | `src/pages/table-list/index.tsx` |
| 基础表单 | `src/pages/form/basic-form/index.tsx` |
| 基础详情 | `src/pages/profile/basic/index.tsx` |
| 工作台 | `src/pages/dashboard/workplace/index.tsx` |

实现前打开同类型参考页，继承其 import 结构、Query/Mutation 写法与组件组合，再改业务字段。
