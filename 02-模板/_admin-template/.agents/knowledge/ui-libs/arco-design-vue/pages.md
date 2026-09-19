# Arco Design Vue 页面规范

适用于使用 `@arco-design/web-vue` 的管理后台页面。

> 布局壳、路由目录、Pro 基建组件名以 `{PROJECT_PATH}/README-DEV.md` 为准。  
> 气质与复用原则对齐 `frame/admin` 母版，实现路径为 **Vue SFC 对照重写**，禁止粘贴母版 HTML / `window.*`。

## 核心铁律：继承 Pro 皮肤，改业务内容

母版样板（如 `frame/admin` 的 `list-search-table`）与工程参考页已对 Arco 做过 Pro 级优化。  
**生成页必须看起来像母版 / 参考页，而不是官方文档里的默认 Arco。**

| 必须保留（从样板 / 参考页继承） | 必须按业务改 |
| --- | --- |
| 页根 class（如 `list-search-table-page`）与配套 `src/assets/style/frame/` 样式 | 筛选字段、表格列、状态机、主/次操作 |
| `general-card`、`pro-page-card`、`pro-search-panel`、`pro-search-form`、`pro-search-actions`、`pro-toolbar`、`pro-table-footer`、`pro-table-ops`、`pro-detail*` 等 | mock 数据与文案（locale） |
| 表格：`:bordered="false"`、密度/`size`、固定操作列 | 详情分区标题与字段；可增删业务区块，区块仍用母版写法 |
| 布局壳（ProShell / `default-layout`），勿手写侧栏顶栏 | 路由 key / 菜单名 |

| 禁止 | 原因 |
| --- | --- |
| 丢开样板，按 Arco 文档从零写 `layout="inline"` 筛选 | 退回未优化默认皮肤 |
| 用简易 `a-descriptions bordered` 顶替 `pro-detail*` | 详情气质不一致 |
| 不复用 `pro-*` / frame 样式，只写裸 `a-card`+`a-table` | 丢失间距/搜索栏/工具栏优化 |
| 只改文案不改业务列/操作 | 换皮 |
| 把 `views/components/*`（`component-*` 橱窗）改名当业务路由 | 演示不是业务 IA |

**正确心智**：点名 `frame/admin` 页面 id + 对照工程参考页 → 在既有 `pro-*` 结构上改「里子」→ 外观仍是 Pro。

## 组件复用优先级

| 优先级 | 做什么 | 说明 |
| --- | --- | --- |
| **1. 工程参考页 / 母版样板** | 对照同 page-type 的 Vue 页或 `frame/admin` 样板结构 | 禁止只抄逻辑、丢掉 DOM/`pro-*` 类名 |
| **2. 业务改造** | 在样板结构上改列/筛/状态/操作/详情分区 | 新区块也从样板或橱窗抄类名 |
| **3. 框架共享层** | Shell、`assets/style/frame`、ProChart、ProSearchPanel 等 | 禁止手写侧栏顶栏 |
| **4. 组件橱窗** | 缺控件时从 `views/components/*` / `views/charts/*` 抄用法与类名 | **禁止橱窗改名当业务页** |
| **5. 官方文档** | 仅当母版与橱窗都无接近模式 | 仍用 `a-*` + 母版变量，套进现有 `pro-*` 容器 |

## 需求 → page-type 速查

| 用户描述 | 优先 page-type | 工程侧落点（已有则优先） |
| --- | --- | --- |
| 登录、注册 | `login` / `login-cover` | `views/login`；母版 `login-cover` 等 |
| 首页、工作台、Dashboard、数据概览 | `dashboard` | `views/dashboard/workplace`；母版 `dashboard` |
| 列表、表格、筛选、CRUD、分页 | `list` | `views/list/search-table`；母版 `list-search-table` |
| 卡片列表、宫格 | `list-card` | 对照母版 `list-card` 重写 |
| 看板 Kanban | `list-kanban` | 对照母版 |
| 左树右表 | `list-tree-table` | 对照母版 |
| 左筛右表 | `list-filter-table` | 对照母版 |
| 标签筛选 | `list-tag-filter` | 对照母版 |
| 主从分栏 | `list-master-detail` | 对照母版 |
| 可编辑表格 | `list-editable` | 对照母版 |
| 日历 / 排期 | `list-calendar` | 对照母版 |
| 素材 / 资源库 | `list-media` | 对照母版 |
| 导入向导 | `list-import` | 对照母版 |
| 基础 / 简单表单 | `form-basic` | `views/form/basic` |
| 分组 / 分步表单 | `form` / `form-step` / `form-step-vertical` | 对照母版 |
| 详情 / 高级详情 | `detail` / `detail-advanced` | 对照母版；列表内可用 `pro-detail*` 抽屉 |
| 结果页 | `result-*` | `views/result/*` |
| 403 / 404 / 500 | `exception-*` | `views/exception/*` |
| 个人中心 / 设置 / 消息 | `user-home` / `user-setting` / `user-message` | `views/user/*` |
| 图表分析看板 | `visualization` | `views/charts/*` + 业务页；图表细则见 `charts.md` |
| 组件演示 | `component-*` | **仅参考**，不改名交付 |

无匹配时：选最接近的 page-type，或询问用户。实现前打开对应母版 html / 已有 Vue 参考页对照。

## 页面布局原则

列表页常用双卡片纵向排列（间距约 16px）：

```
.page-root（如 list-search-table-page）
  ├── a-card.general-card.pro-page-card（筛选区）
  └── a-card.general-card.pro-page-card（工具栏 + 表格 + 页脚）
```

- 卡片：无边框、无阴影；优先复用 `general-card` / `pro-page-card` / `pro-*`
- 不要把筛选和表格塞进同一张卡，除非参考页明确如此

## 标准列表页结构

```
筛选卡
  └── a-form.pro-search-form（a-row / a-col 栅格）
        ├── a-input / a-select / a-range-picker …
        └── 操作列：搜索（primary）+ 重置 + 展开/收起

数据卡
  ├── 工具栏（左侧主操作：新增/导入；右侧：刷新/密度/列设置/导出）
  ├── a-table（bordered=false，操作列 type="text" + pro-table-ops）
  └── 页脚 pro-table-footer：批量操作 + a-pagination
```

推荐参考：

- `src/views/list/search-table/index.vue`
- 优先复用：`ProSearchPanel` / `ProToolbar` / `useTableDensity`（以 README-DEV 为准）

自检：

- [ ] 与同 page-type 参考页并排对比，搜索区/工具栏/表格气质一致
- [ ] 未用 `layout="inline"` 简易筛选顶替 `pro-search-panel`（除非所选样板本身如此）
- [ ] 业务列与主操作已不是样板原领域文案

## 标准表单页结构

```
介绍卡（标题 + 简短说明，可选）
表单卡
  └── a-form（label/wrapper col props）
        ├── 字段
        └── 操作：提交 primary + 重置
```

推荐参考：`src/views/form/basic/index.vue`

## 概览 / 仪表盘

- KPI：优先 `metric-card` 与 `list-card-metric-*` / `workplace-*` 类名
- 图表：见同目录 `charts.md`；禁止遗留 echarts 业务图

推荐参考：`src/views/dashboard/workplace/index.vue`

## 弹窗 / 抽屉 CRUD

```
列表页
  ├── a-modal / a-drawer（新建、编辑）
  ├── a-drawer（详情只读，优先 pro-detail* 结构）
  └── Modal.confirm（删除、批量危险操作）
```

## 异常与结果页

- 403 / 404 / 500：复用 `views/exception/*`；插画用 SVG/`?url` import
- 结果页：对齐 `views/result/*`

## 页面开发流程（Arco Pro 类项目）

1. 用上表定 **page-type**，打开母版 + 工程参考页
2. `src/types/xxx.ts` — 类型
3. `src/mock/xxx.ts` — 手动 Mock（若启用）
4. `src/api/xxx.ts` — `USE_MOCK` 分支 + `request.*`
5. `src/views/.../index.vue` — 在 `pro-*` 结构上改业务
6. `src/router/routes/modules/xxx.ts` — 路由（Pro glob 自动汇总时无需改 index）
7. `locale/zh-CN.ts`、`en-US.ts` + 页面 locale（菜单键）
8. `pnpm build` 验证

> 若子项目路由是 `src/router/modules/` + 手动 `routeModules`，按该项目 README-DEV。

## 对照原型

存在 `frame/admin` 时：点名页面 id **对照重写**，禁止整文件粘贴 HTML / `window.*` 脚本；禁止改母版目录本身。
