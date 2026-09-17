# Arco Design Vue 组件规范

适用于使用 `@arco-design/web-vue` 的项目（Vue 3 + TypeScript）。

> 路由、布局壳、Mock、图表底座等以 `{PROJECT_PATH}/README-DEV.md` 为准；冲突时以 README-DEV 为准。

## 基础约定

- 组件前缀 `a-`，通常已全局注册（`app.use(ArcoVue)`），业务页无需再 import 组件
- Vue API（`ref` / `computed` 等）按项目自动导入或手动导入约定执行
- 使用 `defineOptions({ name: 'XxxPage' })` + `<script setup lang="ts">`
- 消息：`import { Message } from '@arco-design/web-vue'` → `Message.success/error/warning/info`
- 确认：`import { Modal } from '@arco-design/web-vue'` → `Modal.confirm({ ... })`
- 表单实例类型：`import type { FormInstance } from '@arco-design/web-vue'`
- 表格列类型：`import type { TableColumnData } from '@arco-design/web-vue'`

## 图标

- **默认方案以项目 README-DEV 为准**。Vibe Design Pro：模板/菜单/KPI 使用已映射的 `icon-*`（Font Awesome 桥接），禁止 `app.use(ArcoVueIcon)`，禁止从 `@arco-design/web-vue/es/icon` 引入业务图标
- 按钮图标槽位示例：

```vue
<a-button type="primary">
  <template #icon><icon-plus /></template>
  新增
</a-button>
```

- 新增图标先补项目的 `FA_ICON_MAP`（或等价映射），再使用对应 `icon-*` 标签

## 卡片

- 列表/表单页常用：`a-card` + `class="general-card pro-page-card"`，`:bordered="false"`（或全局无边框）
- 无 `title`/`header` 时，body 内边距与卡片间距以项目全局样式为准（Admin：约 16px，筛选卡保留与表格卡间距）
- 不要为「好看」额外加阴影、重边框

## 表格

**必须规则：**

- 列用 `TableColumnData[]`（或等价）配置，`dataIndex` / `slotName` / `title` / `width` 齐全
- 操作列固定右侧：`fixed: 'right'`，宽度按按钮数量留足（约 160–220）
- `:bordered="false"`；分页可外置（`:pagination="false"` + 页脚自管）或走 Arco 内置，与参考页一致
- 需要横向滚动时用 `:scroll="{ x: '100%' }"` 或项目已有的 `tableScroll` 计算，避免随意写死过大数字
- 行选择：`:row-selection` + `row-key` + `selected-keys` / `@selection-change`

```vue
<a-table
  :columns="columns"
  :data="data"
  :loading="loading"
  row-key="id"
  :bordered="false"
  :pagination="false"
>
  <template #status="{ record }">
    <a-badge :status="statusBadge[record.status]" :text="statusLabels[record.status]" />
  </template>
  <template #operations="{ record }">
    <a-space :size="4">
      <a-button type="text" size="small" @click="openEdit(record)">编辑</a-button>
      <a-button type="text" size="small" status="danger" @click="onDelete(record)">删除</a-button>
    </a-space>
  </template>
</a-table>
```

状态展示：

- 只读状态：优先 `a-tag` / `a-badge`，不要默认用 Switch
- 行内可切换：才用 `a-switch`

操作列按钮：`type="text"`，危险操作用 `status="danger"`；删除前 `Modal.confirm`。

## 表单

- 校验字段用 `field`（不是 `name`）：`<a-form-item field="title" label="标题">`
- `:model` + `:rules`；提交前 `formRef.value?.validate()`
- 可清空输入：`allow-clear`；可搜索选择：`allow-search`
- 栅格常用：`:label-col-props` / `:wrapper-col-props`（如 `{ span: 6 }` / `{ span: 18 }`）
- 筛选区表单可 `label-align="left"`，与样板列表一致

```vue
<a-form ref="formRef" :model="form" :rules="rules" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }">
  <a-form-item field="title" label="标题" required>
    <a-input v-model="form.title" placeholder="请输入标题" allow-clear />
  </a-form-item>
</a-form>
```

对话框 / 抽屉：

```vue
<a-modal v-model:visible="visible" :title="title" :mask-closable="false" @cancel="close">
  <!-- 表单 -->
  <template #footer>
    <a-button @click="close">取消</a-button>
    <a-button type="primary" :loading="saving" @click="onSave">确定</a-button>
  </template>
</a-modal>
```

（若项目用 `v-model:visible` 以外的写法，以参考页为准。）

## 按钮

| 场景 | 写法 |
|------|------|
| 主操作（新增、搜索、提交） | `type="primary"` |
| 次要（重置、取消、导出） | 默认按钮 |
| 表格行操作 | `type="text"`，可加 `size="small"` |
| 删除 / 危险 | `status="danger"` + 确认框 |

## HTTP / Mock

- API：`request.get/post/put/del`，禁止裸 `fetch`
- Mock：**优先 README-DEV**。常见：业务接口 `VITE_USE_MOCK === 'true'` 时走 `src/mock/`，返回 `{ code: 200, message: 'success', data }`
- Mock 数据用固定值，不用随机数

## 国际化

- 页面正文可直接中文，或以页面 `locale` 文件为准（看参考页）
- 侧栏菜单：`meta.locale` 翻译键，同步 `locale/zh-CN.ts` 与 `en-US.ts`

## Shell / 页面 IA（B 端气质）

- 布局：左侧导航 + 顶栏 + 主内容；默认侧栏约 **220px**、顶栏约 **60px**（以 README-DEV / `pro-settings` 为准）
- 业务逻辑放在页面组件内；沿用 ProShell，**禁止**手写空壳侧栏顶栏
- 侧栏一级菜单不宜超过 7 个；图标走 `icon-*`（FA 映射）
- PageHeader / 页头区：标题层级清晰；**主操作 1 个、次操作 ≤ 2**
- 列表：筛选约 3～5 项 + 查询/重置 → 表格 → 分页；须有加载/空态
- 状态完整：`default` / `hover` / `active` / `disabled`（表单另含 `focus` / `error`）
- 信息密度适中，克制；忌营销大 Hero、强装饰背景、APP 壳当主布局
- 同项目按钮/表格/表单皮肤统一；颜色/间距/圆角优先母版变量与 `pro-*`
- 增页外观必须以样板 / 参考页为准（细则见同目录 `pages.md`）
- Dashboard / 含图页：指标卡 → 图表 → 快捷入口；**取色 / 轴边距 / 图例 / 圆环**一律遵循同目录 `charts.md`

## 视觉覆盖原则

- **未点名不改**：创建/增页不主动换主色、明暗默认、侧栏宽、圆角等
- 用户明确要求改视觉时，只改 **交付工程**（如 `applyFrameTheme` / Pinia `pro-settings` / 项目 CSS），**禁止改 `frame/admin` 母版**
- 换组件库 ≠ 视觉覆盖；本规范只覆盖 `@arco-design/web-vue` + Pro 皮肤
