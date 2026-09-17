# 组件模板库（React 原型可直接复用）

> **真源**：`03-组件库\组件模板\`（产品设计工作台）
> **形态**：React 18 + TypeScript + Tailwind v4 组件源码（不是静态 HTML 片段，也不是母版 runtime）
> **用途**：绘制 React 原型时，**复制即用**，不需要重新编码；配合提示词与选型映射，告诉智能体「哪个模块用哪个组件」。
> **来源**：按 `vibepm-demo-agent-v1.4` admin 母版（Vibe Design Pro / Arco Design）的组件字典 1:1 提炼为 React 组件，视觉对齐 `03-组件库\frame\admin`。

---

## 1. 为什么是 React 源码而不是搬 HTML

`vibepm-demo-agent-v1.4` 的组件是 **Vue 3 + Arco 静态 HTML 母版**（`frame/admin` 下 `.html` + `a-*` 标签 + 原生 JS），React 原型工程（React 18 + Tailwind v4，无 arco 依赖）**无法直接 import**。
因此本库把母版组件**一次性提炼为 React + Tailwind 源码**：之后所有原型 `import` 即用，不再逐页重写 —— 这就是「直接复用、无需重新编码」的落地方式。

母版与交付的关系不变：母版 `frame/` 只作**视觉与结构对照**，交付落在原型工程里。

## 2. 目录结构

```text
组件模板/
├── index.ts                 ← 统一出口（一键导出全部组件 + 主题）
├── README.md                ← 本文
├── 提示词手册.md             ← 每个组件可直接复制的提示词（给智能体用）
├── 选型映射.md               ← 页面/模块 → 用哪些组件（告诉智能体哪个模块用哪个组件）
├── _kit/                    ← 共用底座
│   ├── theme.css            ← Tailwind v4 @theme token（Arco 色板 / 圆角 / 阴影 / 字号）
│   └── cn.ts                ← 类名拼接（零依赖）
├── base/                    ← 基础：Button·ButtonGroup / Card·SectionCard / Tag / Badge / Avatar·AvatarGroup / Title·Text·Paragraph / Divider / Tooltip·Dropdown·Popover
├── layout/                  ← 布局：Space / Row·Col·Grid / PageHeader / Tabs / Breadcrumb / Steps / Toolbar
├── form/                    ← 表单：FormField·FormRow·FormActions / Input·Textarea·InputNumber·SearchBar / Select / RadioGroup·CheckboxGroup·Switch / DatePicker·RangePicker·TimePicker / Upload
├── data/                    ← 数据展示：DataTable / Pagination / Descriptions / Progress·RingProgress / List·ListItem / Tree（并 re-export StatCard·KpiRow）
├── feedback/                ← 反馈：Modal·ConfirmModal / Drawer / Alert / Spin·Skeleton·Empty / ResultPage / message·MessageHost
└── business/                ← 业务：StatCard·KpiRow / FilterBar·FilterBarInline / TableCard·DetailCard / StatusTag·STATUS_PRESETS
```

> 目录名用英文（避免中文路径进 import 语句），中文说明见各目录 `index.ts` 顶部注释与本文件。

## 3. 怎么用到原型工程（用时复制）

**一次性整体复制**（组件之间有跨分类引用，必须整包复制，保持内部相对结构）：

```text
源：03-组件库\组件模板\
目标：<项目>\src\component-templates\axhub\        ← 目录名可自定
```

PowerShell 示例（在项目根执行）：

```powershell
robocopy "C:\Users\游翔\Documents\AI work\产品设计工作台\03-组件库\组件模板" ".\src\component-templates\axhub" /E
```

页面里直接 import（无需任何额外配置）：

```tsx
import { Button, Card, DataTable, FilterBar, FormField, Input, Select, KpiRow, StatCard, Tag, type Column } from '../component-templates/axhub';

export default function ProjectList() {
  const columns: Column<Row>[] = [
    { title: '名称', key: 'name', sortable: true },
    { title: '状态', key: 'status', render: (r) => <Tag color="green">{r.status}</Tag> },
  ];
  return (
    <Card title="项目列表" extra={<Button variant="primary">新增</Button>} flush>
      <DataTable columns={columns} data={rows} rowKey="id" />
    </Card>
  );
}
```

## 4. 依赖与约束

| 项 | 说明 |
| --- | --- |
| React | 18.x（原型工程自带） |
| Tailwind | v4（`@tailwindcss/vite`，原型工程自带） |
| 图标 | 组件内部图标为**内联 SVG**，零依赖；业务图标可自行用工程自带 `lucide-react` |
| 第三方库 | **不引** arco / antd / clsx / dayjs —— 复制即用，不会缺依赖 |
| 主题入口 | `_kit/theme.css` 已 `@import "tailwindcss"`；若工程里已有其它 Tailwind 入口（如旧 `Design-components/theme.css`），**两者不要同时引**，只保留一份 |
| 日期 | `DatePicker/RangePicker/TimePicker` 用原生日期控件实现（零依赖、跨浏览器可用） |
| 上传 | `Upload` 只负责选文件与列表展示，真实上传由父级在 `onChange` 里处理 |

## 5. 与旧 `design-components` 的关系

- `03-组件库\design-components\`（9 个组件：Button/Card/StatCard/Tag/DataTable/FormField/Modal/ResultPage + theme）是 2026-09-14 的早期版本。
- 本目录是其**超集与继任者**：API 向后兼容（`Button`/`Card`/`Tag`/`DataTable`/`FormField`/`Modal`/`ResultPage` 参数一致），新增 30+ 组件与 token。
- 新原型**统一用本库**；旧项目可继续用 `design-components`，迁移时只需改 import 路径。

## 6. 规则（给智能体与使用者）

1. **不要自造**：页面区块、按钮、表格、表单字段、状态标签、弹窗 —— 已覆盖的场景必须用本库组件，不要新写一套样式。
2. **组合优先**：列表页用 `TableCard` + `FilterBar` + `DataTable` + `Pagination`；详情页用 `PageHeader` + `DetailCard` + `Descriptions`；看板用 `KpiRow` + `Card` + `Progress`。
3. **状态只读展示**：用 `Tag` / `StatusTag`（不要用 Switch 表示状态）。
4. **弹窗 vs 抽屉**：需保留列表上下文用 `Drawer`，需强打断确认用 `Modal`；破坏性操作前用 `ConfirmModal`。
5. **视觉改动只改 token**：`_kit/theme.css` 是唯一色板/圆角来源，不要在组件里写死颜色。
6. 新增组件请登记 `03-组件库\custom-components.json`（面板展示 + 复制提示词）。

## 7. 登记与追溯

- 面板「组件库」页签读 `03-组件库\custom-components.json`（每条含 `id / label / category / framework / notes / prompt / previewUrl`）。
- 组件库整体信息登记在 `03-组件库\component-registry.json`。
- 组件模板静态预览路径：面板 `/library/<分类>/<文件>`；本库为源码组件，**真实预览请在原型工程里跑**（复制后启动开发栈）。

---

_维护：CodeBuddy（2026-09-17 依用户指派填充）；共享目录工程修改需与豆包协调排期。_
