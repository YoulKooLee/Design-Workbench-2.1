# Design-components 组件库（React + Tailwind v4）

原型设计中可直接 `import` 的高频 UI 组件，视觉对齐 `03-组件库/frame/admin` 母版（Arco Design）。

## 位置与用法（2026-09-14 调整：组件模板独立目录 src/component-templates，区别于开发栈工具组件 src/components）

```
src/component-templates/Design-components/
├── index.ts          ← 统一出口（import 时自动加载主题 token）
├── theme.css         ← Tailwind v4 @theme（色板/圆角，对齐母版 Arco token）
├── Button.tsx  Card.tsx  StatCard.tsx  Tag.tsx
├── DataTable.tsx  FormField.tsx  Modal.tsx  ResultPage.tsx
├── docs/             ← 组件清单静态页（预览+提示词+复制按钮，任何环境可打开）
└── README.md
```

组件库卡片浏览入口：`src/component-templates/component-library/`（Make「组件」页签可打开，卡片展示+分类筛选+真实预览+复制提示词）。

在原型页面直接 import（无需额外配置）：

```tsx
import { Button, Card, StatCard, Tag, DataTable, FormField, Input, Select, Modal, ResultPage } from '../../component-templates/Design-components';
```

完整演示页：`src/prototypes/axhub-components/index.tsx`（启动工程后在原型列表可见）。

## 组件清单

| 组件 | 用途 | 关键 Props |
| --- | --- | --- |
| `Button` | 按钮 | `variant`: primary/secondary/outline/text/danger/success；`size`: sm/md/lg；`loading`；`icon`；`ghost` |
| `Card` | 卡片容器 | `title`；`extra`（标题右侧）；`bordered`；`flush`（无内边距，嵌表格） |
| `StatCard` | 统计指标卡 | `label`/`value`/`trend`/`trendUp`；`icon`；`tone`: primary/success/warning/danger/default |
| `Tag` | 状态标签 | `color`: blue/green/orange/red/gray；`closable`+`onClose` |
| `DataTable` | 数据表格 | `columns`（含 sortable/align/render/width）；`data`；`rowKey`；`loading`；`emptyText`；`plain` |
| `FormField` | 表单字段 | `label`/`required`/`hint`/`error`；`horizontal` |
| `Input` | 输入框 | 原生 input props + `prefix`（前置图标） |
| `Select` | 下拉选择 | `options`（{label,value,disabled}）；`placeholder` |
| `FormRow` | 表单多列网格 | `cols` |
| `Modal` | 模态弹窗 | `open`/`onClose`/`title`/`footer`/`width`；`maskClosable` 默认 **false**（防误关）；Esc 关闭；内容超高自动滚动 |
| `ResultPage` | 结果页 | `status`: success/error/warning/waiting；`title`/`desc`/`actions` |

## 视觉 token（theme.css）

| Token | 值 | 来源 |
| --- | --- | --- |
| `--color-primary` | `#165dff` | 母版 arcoblue-6 |
| `--color-success` | `#00b42a` | 母版 green-6 |
| `--color-warning` | `#ff7d00` | 母版 orange-6 |
| `--color-danger` | `#f53f3f` | 母版 red-6 |
| `--color-neutral-*` | 1-10 灰阶 | 母版 neutral 系 |
| `--radius-sm/md/lg` | 2/4/8px | 母版圆角 |

## 扩展规范（给维护者）

- **新增组件**：放 `src/component-templates/axhub/<Name>.tsx`，在 `index.ts` 导出；组件用 Tailwind 类 + theme.css token，**不引 arco、不引额外依赖**（图标用 lucide-react）。
- **改视觉**：只改 `theme.css`（token 级），组件类名不改。
- **母版升级同步**：frame/admin 视觉升级时，先比对 token 差异再更新 theme.css。
- **验收**：跑 `npm run build`（或 `tsc --noEmit`）+ 打开 `axhub-components` 演示页核对。
