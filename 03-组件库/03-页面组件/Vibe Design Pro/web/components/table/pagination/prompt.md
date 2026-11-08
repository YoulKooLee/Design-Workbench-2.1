# 分页表格

> 状态：preview · slug：`table-pagination` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「分页表格」（`table-pagination`）。表体外独立分页条，并带行多选，适合中长列表浏览。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/table/component.css` 中 `.wa-atable-shell` / `.wa-atable-footer` 等规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把分页切片、多选状态逻辑**并入**宿主页 `js/<page>.js`；禁止镜像母版 `component.js` 再强制 `<script src>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-table（`:pagination="false"`）+ 表外 `a-pagination`；`row-selection` 复选列
- 私有样式真源在 `components/table/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- 禁止外链 CDN 图片；示例可用本地质感图或 data URI

## 4. 视觉规格

- 布局 / 层级 / 强调：圆角表框只包表体；分页条在框外右对齐；左侧复选列
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-atable-shell">
  <a-table
    class="wa-atable"
    :columns="columns"
    :data="pageRows"
    row-key="key"
    :bordered="false"
    :pagination="false"
    :row-selection="{ type: 'checkbox', showCheckedAll: true }"
    :selected-keys="selectedKeys"
    @selection-change="onSelectionChange"
  >
    <template #status="{ record }">
      <a-tag size="small" bordered :color="statusColor(record.status)">{{ record.status }}</a-tag>
    </template>
  </a-table>
  <div class="wa-atable-footer">
    <a-pagination
      :total="allData.length"
      :current="current"
      :page-size="pageSize"
      show-total
      show-page-size
      :page-size-options="[5, 10]"
      @change="onPageChange"
      @page-size-change="onPageSizeChange"
    ></a-pagination>
  </div>
</div>
```

> 换文案：只改汉字，勿改 class / type。`pageRows` 由 `allData` 按 `current` / `pageSize` 切片。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/table/pagination/index.html`

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
| `table-actions` | `components/table/actions/` | |
| `table-pagination` | `components/table/pagination/` | （本条） |
| `table-toolbar` | `components/table/toolbar/` | |
