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
- 无 `title`/`header` 时，body 内边距与卡片间距以项目全局样式为准（Admin：约 16px，筛选卡保留与表格卡间距；母版 `.pro-page-card` 默认 `margin-bottom: 16px` 在 `pages-common`，勿页内再抄相同覆盖）
- 不要为「好看」额外加阴影、重边框

## Tabs / 分段（对照母版 `component-basic`）

| 形态 | 说明 | 选中 / 悬停约定 |
| --- | --- | --- |
| 分段选择器 | 整块描边 + 项间分割；非 `a-tabs` | 选中实心主色白字；悬停未选项仅文字主色 |
| 基础 Tabs | `a-tabs type="rounded"` 无灰底轨道 | 选中半透明主色底 + 主色描边；悬停仅文字主色、不加底 |
| 胶囊 Tabs | `type="rounded"` + 灰底轨道外框（弱描边） | 选中白底主色字 + 浅阴影；悬停仅文字主色、不加底 |

看板 / 设置等页的 rounded Tabs 皮在母版 `pages-common`；灰底轨道分段式勿套那套主色描边皮。

## 表格

**必须规则：**

- 列用 `TableColumnData[]`（或等价）配置，`dataIndex` / `slotName` / `title` 齐全
- **列宽（与静态母版 / WEB `table.md` 同构）**：
  1. **多数列显式 `width`**；只留 **1 列主字段**（名称 / 标题）不设宽或用较大 `minWidth`，吃剩余空间  
  2. 写了 `width` 的列会被钉死；未写宽的列均分剩余——**勿只钉后几列**（会导致前面过宽、操作列挤）  
  3. 长文案列加 `ellipsis: true`（必要时 tooltip）  
  4. 列多（约 ≥ 7～8）时设 `:scroll="{ x: 总宽估算 }"`（或项目已有的 `tableScroll`）；操作列可 `fixed: 'right'`  
  5. 勾选：`row-selection.width: 48`；拖拽柄约 `44`
- 推荐像素（px）：短枚举/负责人 `100`；短数字 `90`；状态 Tag `100`–`110`；日期时间 `160`–`180`；ID `110`–`150`；操作仅「⋯」`72`–`88`；编辑+删除+⋯ 约 `120`–`160`（多按钮可到 `220`）。完整表见 demo-agent `prototype-demo/references/web/table.md`
- `:bordered="false"`；分页可外置（`:pagination="false"` + 页脚自管）或走 Arco 内置，与参考页一致
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
- 业务逻辑放在页面组件内；沿用 ProShell，**禁止**手写空壳侧栏顶栏；**禁止**用 WEB `layouts`（`wa-layout*`）替换 ProShell
- 侧栏一级菜单不宜超过 7 个；图标走 `icon-*`（FA 映射）
- **窄屏（≤768，与母版 / WEB layouts IA 对齐）**：顶栏通栏（含菜单入口）；侧栏改抽屉；面包屑可下沉到内容区。实现跟工程 Shell，不拷 WEB `layout.js`
- PageHeader / 页头区：标题层级清晰；**主操作 1 个、次操作 ≤ 2**
- 列表：筛选约 3～5 项 + 查询/重置 → 表格 → 分页；须有加载/空态
- 登录页：**无** ProShell（独立布局），与母版 `login-*` 一致
- 状态完整：`default` / `hover` / `active` / `disabled`（表单另含 `focus` / `error`）
- 信息密度适中，克制；忌营销大 Hero、强装饰背景、APP 壳当主布局
- 同项目按钮/表格/表单皮肤统一；颜色/间距/圆角优先母版变量与 `pro-*`（与 WEB 营销气质**不强求视觉统一**）
- 增页外观必须以样板 / 参考页为准（细则见同目录 `pages.md`）
- Dashboard / 含图页：指标卡 → 图表 → 快捷入口；**取色 / 轴边距 / 图例 / 圆环**一律遵循同目录 `charts.md`

## 视觉覆盖与令牌（摘要）

细则见同目录 **`style.md`**（对照 prototype-demo `references/admin/style.md`）。

- **未点名不改**：增页不主动换主色、明暗默认、侧栏宽、圆角等
- 用户明确要求时只改 **交付工程**（`frame-theme.ts` / `pro-settings` / `styles/pro/`），**禁止改 `frame/admin` 母版**
- **页画布**用 `--pro-color-bg` / `--pro-content-bg`（亮 `#f5f5f5`）；**勿**用 `--color-fill-2` 铺整页
- **中性阶** `--pro-color-border|fill|text-*` 桥到 `--color-*`；勿用主色混 fill/border
- **soft/mid** 跟 `--primary-6`（亮 `0.15/0.35`，暗 `0.22/0.4`）；改主色须一并刷新
- **控件密度**：默认 medium **36px**（`--pro-input-h`）；悬停白底加深描边，获焦主色 + `--pro-ctrl-ring`
- 禁止 WEB 多品牌皮（`themes/*` / `data-brand`）；换组件库 ≠ 视觉覆盖
