# Ant Design Pro 组件规范

适用于 **React + Umi Max + antd + @ant-design/pro-components** 管理后台（如 `{PROJECT_PATH}` 为 `ant-design-pro/`）。

> 路由、Mock、Layout、`config/routes.ts` 等项目约定以 `{PROJECT_PATH}/README-DEV.md` 为准；本文仅作 Pro Components 与 antd 用法补充。

## 基础约定

- 页面使用 React 函数组件 + TypeScript（`.tsx`）
- 布局与表格/表单容器优先从 `@ant-design/pro-components` 引入，**禁止**用裸 `antd` 拼完整后台页（会丢失 Pro 间距与工具栏习惯）
- 数据请求优先 `@tanstack/react-query` 的 `useQuery` / `useMutation`（参考 `table-list`）
- HTTP 使用 `@umijs/max` 的 `request`，API 放在 `src/services/`
- 消息：`message.useMessage()` + `contextHolder`，或 `message.success/error`
- 页面内容可直接中文；菜单走 `config/routes.ts` 的 `name` + `src/locales/**/menu.ts`

## 页面容器

```tsx
import { PageContainer } from '@ant-design/pro-components';

export default function ExamplePage() {
  return (
    <PageContainer content="页面说明（可选）">
      {/* 业务内容 */}
    </PageContainer>
  );
}
```

- 列表 / 表单 / 详情页根节点统一包 `PageContainer`
- 需要页头操作时用 `extra` / `footer` / `tabList`（参考 `profile/advanced`）

## ProTable（列表页默认）

```tsx
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { getXxxList } from '@/services/xxx';

const columns: ProColumns<API.XxxItem>[] = [
  { title: '名称', dataIndex: 'name' },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: {
      0: { text: '禁用', status: 'Default' },
      1: { text: '启用', status: 'Success' },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    render: (_, record, __, action) => [
      <a key="edit" onClick={() => handleEdit(record)}>编辑</a>,
      <a key="delete" onClick={() => handleDelete(record, action)}>删除</a>,
    ],
  },
];

export default function XxxListPage() {
  const actionRef = useRef<ActionType>();

  return (
    <PageContainer>
      <ProTable<API.XxxItem>
        headerTitle="列表标题"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 120 }}
        request={async (params) => {
          const msg = await getXxxList(params);
          return {
            data: msg.data ?? [],
            success: msg.success,
            total: msg.total,
          };
        }}
        columns={columns}
        toolBarRender={() => [<CreateForm key="create" reload={actionRef.current?.reload} />]}
      />
    </PageContainer>
  );
}
```

| 要点 | 规则 |
| --- | --- |
| 列定义 | 用 `ProColumns<T>`；筛选用 `hideInTable` / `hideInSearch` / `valueType` |
| 状态列 | 优先 `valueEnum` + `status`，不要手写 Tag 除非参考页如此 |
| 刷新 | `actionRef.current?.reload()` 或 `reloadAndRest()` |
| 批量操作 | `rowSelection` + `FooterToolbar`（参考 `table-list`） |
| 详情抽屉 | 列表内 `Drawer` + `ProDescriptions`（参考 `table-list`） |

## 表单

### 独立表单页 — ProForm

```tsx
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { Card } from 'antd';

<PageContainer>
  <Card variant="borderless">
    <ProForm layout="vertical" onFinish={onFinish}>
      <ProFormText name="title" label="标题" rules={[{ required: true }]} />
    </ProForm>
  </Card>
</PageContainer>
```

参考：`src/pages/form/basic-form/index.tsx`

### 弹窗 / 抽屉表单 — ModalForm / DrawerForm

```tsx
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';

<ModalForm
  title="新建"
  trigger={<Button type="primary">新建</Button>}
  onFinish={async (values) => {
    await addXxx(values);
    return true;
  }}
>
  <ProFormText name="name" label="名称" rules={[{ required: true }]} />
</ModalForm>
```

- 新建 / 编辑优先拆到 `components/CreateForm.tsx`、`UpdateForm.tsx`（参考 `table-list/components/`）
- 分步表单用 `StepsForm`（参考 `form/step-form`）

## ProDescriptions（详情）

```tsx
import { PageContainer, ProDescriptions } from '@ant-design/pro-components';

<PageContainer>
  <ProDescriptions column={2} title="基本信息">
    <ProDescriptions.Item label="名称">{data.name}</ProDescriptions.Item>
  </ProDescriptions>
</PageContainer>
```

参考：`src/pages/profile/basic/index.tsx`、`profile/advanced/index.tsx`

## 按钮与反馈

- 主操作：`type="primary"`，可加 `@ant-design/icons`
- 表格内链接操作：`<a>` 或 `Button type="link"`，与参考页保持一致
- 删除：先 `Modal.confirm` 或 `Popconfirm`，成功后 `message.success` 并刷新表格
- 提交 loading：`modalProps={{ okButtonProps: { loading } }}` 或 mutation `isPending`

## 样式

- 页面级样式优先 `style.style.ts`（`antd-style` 的 `createStyles`），参考现有页面
- 工程已启用 Tailwind v4 时，可与 Pro 组件混用，但不要破坏 Pro 默认间距
- 不要全局覆盖 `.ant-table` / `.ant-pro-table` 除非 README-DEV 允许

## Mock 与 API

- Mock：Umi `mock/` 或页面 `_mock.ts`；路径与 `services` 中 `request` 一致
- 类型：`src/services/**/typings.d.ts` 或页面 `data.d.ts` 的 `API` 命名空间
- 函数命名：`getXxxList`、`getXxxDetail`、`addXxx`、`updateXxx`、`removeXxx`
