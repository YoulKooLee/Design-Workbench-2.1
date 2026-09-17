# Codebuddy Design — React 原型组件库（产品设计工作台 03-页面组件）

本目录是 **03-页面组件** 下的组件库之一（与 `Vibe Design Pro` 并列）：**React 18 + Tailwind v4 组件源码**，供 React 原型工程**整目录复制取用**。它**不是**运行时依赖，也不是 HTML 母版。

> **为什么有它**：`Vibe Design Pro` 是 Vue 3 + Arco 的 **静态 HTML 母版**，React 原型工程（React 18 + Tailwind v4，无 arco）无法直接 import 其组件。因此本库按母版的**组件字典**一次性提炼为 React 源码 —— 之后所有原型 `import` 即用，不再逐页重写。

> **当前交付状态（2026-09-17）**：`status = ready`，**48 个组件条目（合计 60 个导出组件）/ 6 个分类 / 68+ 个文件**；6 个分类 `基础` / `布局` / `表单` / `数据展示` / `反馈` / `业务组件` + `_kit`（主题 token）。库状态以 `./index.json` 与 `../component-registry.json` 为准，**不一致即视为缺陷**。

### 新增组件落位（两种，二选一）

| 落位 | 路径 | 适用 |
| --- | --- | --- |
| **分类真源** | `Codebuddy Design/<中文分类>/<Name>.tsx`（+ 该分类 `index.ts` 追加导出） | 手工新增组件，归入真源分组 |
| **独立组件目录** | `Codebuddy Design/<id>/`（与分类目录并列） | 工作台面板「上传模板 / 新增组件」自动落位，或第三方组件整包导入 |

两种落位都必须登记 **`_meta/components.catalog.json`** 与 **`../custom-components.json`**（含 prompt 提示词）；建议用 `node _meta/sync-registry.mjs` 做单向同步与一致性校验。

## 消费方式

| 角色 | 路径 |
| --- | --- |
| 组件选型 / 调用 | `./_meta/components.catalog.json`（component → 文件 / 导出 / 参数 / 场景 / prompt） |
| 库 → 端登记 | `./index.json`（本目录） |
| 组件用法与提示词 | `./提示词手册.md`（每个组件一条【组件引用】提示词） |
| 场景 / 模块 → 组件组合 | `./选型映射.md`（页面类型映射 + 整页提示词模板 + 反模式） |
| 预览墙 | `./gallery.html`（组件清单 + 提示词，可与面板 `/library/` 联用） |
| 全局登记 | `../component-registry.json`（组件库总登记） |
| 面板数据源 | `../custom-components.json`（工作台「组件库」页签 + 复制提示词） |

**复制取用（唯一入口）**：把本目录（含 `_kit` 与 6 个分类）**整体**复制到 React 原型工程的 `src/component-templates/axhub/`，然后：

```tsx
import { Button, Card, DataTable, ChartCard, LineChart, type Column } from '../component-templates/axhub';
```

> 组件之间有**跨分类引用**，不可只拷单个分类；目录名可自定，内部相对结构必须保持。

## 设计目标

| 目标 | 做法 |
| --- | --- |
| 复制即用 | 源码自包含：仅 `react` + `tailwindcss`（v4）；图标为内联 SVG，业务图标可用工程自带 `lucide-react`（仅 `SideMenu` 依赖） |
| 零第三方依赖 | **不引** arco / antd / clsx / dayjs；日期用原生控件实现，避免复制后缺包 |
| 视觉对齐母版 | 色板/圆角/阴影/字号全部走 `_kit/theme.css` 的 `@theme` token（来源：`Vibe Design Pro/admin` 的 Arco 色板） |
| 组合优于重写 | 列表页 `TableCard+FilterBar+DataTable`、详情页 `PageHeader+DetailCard+Descriptions`、看板 `KpiRow+ChartCard` —— 禁止各页手写同类控件 |
| 可扩展 | 新增组件 → 分类目录加 `Xxx.tsx` + 更新该分类 `index.ts` + 登记 `_meta/components.catalog.json` 与 `../custom-components.json` |

## 包结构（工作台内）

```text
03-组件库/
├── component-registry.json            ← 组件库总登记（库状态/分类/文档/registry 指向）
├── custom-components.json             ← 面板「组件库」页签数据源（58 条，含 prompt 提示词）
├── 03-页面组件/
│   ├── Vibe Design Pro/               ← 静态 HTML 母版（Vue+Arco，admin/web/app + _meta 50 页）
│   └── Codebuddy Design/              ← 本目录（React 组件源码）
│       ├── README.md                  ← 本文
│       ├── index.json                 ← 库登记（端 → 框架 → path/theme/capability/status）
│       ├── index.ts                   ← React 统一出口（自动加载主题 token）
│       ├── _meta/
│       │   ├── layout.manifest.json   ← 库元数据（id/theme/version/status/分类/消费方式/文档）
│       │   ├── components.catalog.json ← component → 文件/导出/参数/场景/prompt（选型真源）
│       │   └── sync-registry.mjs       ← catalog → custom-components.json 单向同步 / 一致性校验
│       ├── _kit/                      ← 底座：theme.css（@theme token）+ cn.ts（零依赖类名工具）
│       ├── 基础/    Button·Card·Tag·Badge·Avatar·Typography·Divider·Overlay·Popconfirm
│       ├── 布局/    Layout(Space/Row/Col/Grid)·PageHeader·Tabs·Breadcrumb·Steps·Toolbar
│       ├── 表单/    FormField·Input·Select·Choice·DatePicker·Upload·Transfer·Cascade·Slider·Suggest·VerificationCode
│       ├── 数据展示/ DataTable·Pagination·Descriptions·Progress·List·Tree·Chart·Timeline·Collapse·Calendar
│       ├── 反馈/    Modal·Drawer·Alert·Spin·ResultPage·Message·Notification
│       ├── 业务组件/KpiRow·FilterBar·TableCard·StatusTag·Kanban
│       ├── gallery.html               ← 预览墙（组件清单 + 提示词复制）
│       ├── 提示词手册.md               ← 每组件【组件引用】提示词
│       └── 选型映射.md                 ← 页面/模块 → 组件组合 + 整页提示词模板
└── 03-UI风格/                          ← 视觉风格规范（12 套 style.md）
```

## 职责划分

| 区域 | 放什么 | 不放什么 |
| --- | --- | --- |
| 本目录 `*.tsx` / `_kit` | 可复制即用的 React 组件源码、主题 token | 产品业务页、业务 mock 数据、PRD/SRS 长文 |
| `_meta/` | 供 Agent 读取的 catalog / manifest（选型真源） | 运行时代码（页面不应 import `_meta`） |
| `gallery.html` / `提示词手册.md` / `选型映射.md` | 人类与 Agent 的查阅与提示词 | 交付依赖（运行时不引用） |
| 各项目 `src/component-templates/axhub/` | 本库的**副本**（用时复制） | 直接编辑（真源改动后重新复制同步） |

**禁止**：交付页运行时引用本目录（必须复制后再引用）；在各项目副本里“就地改组件”而不回写真源。

## index.json 登记表

`index.json` 供 Agent / 维护者**选型**：端、默认库、`path`、能力级别、状态。只建文件夹不登记 → 文档与选型流程**不会**指向该库。

| 字段 | 含义 |
| --- | --- |
| `ends.<end>` | 端：`react-proto`（React 原型工程） |
| `outputDir` | 默认交付目录名（复制目标：`src/component-templates/axhub`） |
| `defaultFramework` | 默认库 id（`codebuddy-design`） |
| `frameworks.<id>.path` | 相对本目录的文件夹名（本库为 `.`，即根） |
| `capability` | 能力级别：`source-components`（源码组件，非 runtime） |
| `status` | `ready` 可用（目录必须真实存在） |
| `componentCount` / `catalog` / `manifest` | 组件数与 `_meta` 指向 |

> **状态一致性铁律**：`index.json` 与 `../component-registry.json` 的库状态、版本必须一致；`componentCount` 必须等于 `_meta/components.catalog.json` 的实际条目数。

## _meta/（供 Agent 读取）

| 文件 | 用途 |
| --- | --- |
| `layout.manifest.json` | 库 id、label、end、runtime、theme、version、status、分类、消费方式、文档指向 |
| `components.catalog.json` | `component-id → { label, category, file, exports, props, scene, prompt }`（**选型真源**，勿把路径写死在别处）+ 复用规则 |

## 与当前工作流的关系

```text
PRD / 原型设计 → 选型映射.md 选组件组合 → 复制本库到工程 → import 组合页面 → 提示词触发组件复用
```

1. **选型先行**：读 `_meta/components.catalog.json` 或 `选型映射.md`，先定组件组合再写页面。
2. **提示词复用**：把 `提示词手册.md` 或面板「组件库」页签的【组件引用】提示词整段给 Agent，避免自造样式。
3. **状态只读展示**：一律 `Tag` / `StatusTag`；破坏性操作 `ConfirmModal` / `Popconfirm`。
4. **图表规范**：必须用 `ChartCard` 承载标题与单位（标题在图表区顶部、单位紧邻标题下方加粗主色、统计周期单选在标题旁），多系列必须有可点击图例。

## 维护核对

- [ ] `index.json` 与真实目录、`defaultFramework` 一致（`ready` 库目录必须存在）
- [ ] `index.json` 与 `../component-registry.json` 的库版本 / 状态一致
- [ ] `componentCount` 等于 `_meta/components.catalog.json` 组件条目数
- [ ] 新增组件：分类目录加文件 → 更新分类 `index.ts` → 登记 `_meta/components.catalog.json` → 登记 `../custom-components.json`（含 prompt）→ 更新 `提示词手册.md` / `选型映射.md`
- [ ] 组件源码零第三方依赖（仅 `SideMenu` 依赖 `lucide-react`，因原型工程已内置）
- [ ] 视觉改动只改 `_kit/theme.css`；改完同步到各项目副本（用时复制模式）
- [ ] 使用方：整目录复制，保持内部相对结构；不自造同类控件

## 相关文件

| 路径 | 用途 |
| --- | --- |
| `./index.json` | 库登记（端 → 框架） |
| `./_meta/components.catalog.json` | 组件选型真源（含 prompt） |
| `./_meta/layout.manifest.json` | 库元数据 |
| `./index.ts` | React 统一出口 |
| `./_kit/theme.css` | 主题 token（Arco 色板） |
| `./提示词手册.md` / `./选型映射.md` / `./gallery.html` | 提示词 / 选型 / 预览墙 |
| `../Vibe Design Pro/` | 视觉与结构对照母版（HTML，勿改） |
| `../component-registry.json` | 组件库总登记 |
| `../custom-components.json` | 面板组件库数据源 |

---

_维护：CodeBuddy（2026-09-17 依用户指派填充并按 03-页面组件 规范迁移整改）；共享目录工程变更需与豆包协调排期。_
