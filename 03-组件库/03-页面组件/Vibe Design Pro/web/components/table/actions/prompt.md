# 行操作表格

> 状态：preview · slug：`table-actions` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「行操作表格」（`table-actions`）。左侧拖动手柄可排序；行尾提供编辑 / 删除图标按钮与更多菜单。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/table/component.css` 中 `.wa-table-drag-*` / 行拖拽态规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把拖拽排序逻辑**并入**宿主页 `js/<page>.js`；禁止镜像母版 `component.js` 再强制 `<script src>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-table；首列拖动手柄（`icon-drag-dot-vertical` + HTML5 DnD）；操作列用 a-button 图标 + a-dropdown
- 私有样式真源在 `components/table/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- 禁止外链 CDN 图片；示例可用本地质感图或 data URI

## 4. 视觉规格

- 布局 / 层级 / 强调：左侧 grip 手柄；行尾紧凑图标操作；拖拽中行半透明，目标行顶边高亮
- 动效：仅本控件轻交互（hover/focus/drag）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-table
  class="wa-atable"
  :columns="columns"
  :data="data"
  row-key="key"
  :pagination="false"
  :bordered="false"
  :row-class="rowClass"
>
  <template #drag="{ record }">
    <div
      class="wa-table-drag-cell"
      @dragover.prevent="onDragOver(record, $event)"
      @dragleave="onDragLeave(record)"
      @drop.prevent="onDrop(record)"
    >
      <button
        type="button"
        class="wa-table-drag-handle"
        draggable="true"
        aria-label="拖动排序"
        @dragstart="onDragStart(record, $event)"
        @dragend="onDragEnd"
      >
        <icon-drag-dot-vertical></icon-drag-dot-vertical>
      </button>
    </div>
  </template>
  <template #status="{ record }">
    <a-tag size="small" bordered :color="statusColor(record.status)">{{ record.status }}</a-tag>
  </template>
  <template #operations>
    <a-space class="wa-table-ops" :size="0">
      <a-button type="text" size="small" aria-label="编辑">
        <template #icon><icon-edit></icon-edit></template>
      </a-button>
      <a-button type="text" size="small" status="danger" aria-label="删除">
        <template #icon><icon-delete></icon-delete></template>
      </a-button>
      <a-dropdown position="br">
        <a-button type="text" size="small" aria-label="更多操作">
          <template #icon><icon-ellipsis></icon-ellipsis></template>
        </a-button>
        <template #content>
          <a-doption>
            <template #icon><icon-eye></icon-eye></template>
            查看
          </a-doption>
          <a-doption>
            <template #icon><icon-copy></icon-copy></template>
            复制
          </a-doption>
          <div class="wa-dropdown-sep" role="separator"></div>
          <a-doption class="wa-dropdown-danger">
            <template #icon><icon-delete></icon-delete></template>
            删除
          </a-doption>
        </template>
      </a-dropdown>
    </a-space>
  </template>
</a-table>
```

> 换文案：只改汉字，勿改 class / type。首列 `dataIndex: 'drag'`，`width: 44`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/table/actions/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `table-default` | `components/table/default/` | |
| `table-stripe` | `components/table/stripe/` | |
| `table-border` | `components/table/border/` | |
| `table-selection` | `components/table/selection/` | |
| `table-fixed` | `components/table/fixed/` | |
| `table-fixed-header` | `components/table/fixed-header/` | |
| `table-sortable` | `components/table/sortable/` | |
| `table-expand` | `components/table/expand/` | |
| `table-tree` | `components/table/tree/` | |
| `table-group` | `components/table/group/` | |
| `table-actions` | `components/table/actions/` | （本条） |
| `table-pagination` | `components/table/pagination/` | |
| `table-toolbar` | `components/table/toolbar/` | |
