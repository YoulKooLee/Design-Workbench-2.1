# 工具栏表格

> 状态：preview · slug：`table-toolbar` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「工具栏表格」（`table-toolbar`）。顶栏搜索、列显隐与批量操作，适合可筛选的业务列表。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/table/component.css` 中 `.wa-atable-shell` / `.wa-atable-toolbar` 等规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把搜索过滤、列显隐、多选状态逻辑**并入**宿主页 `js/<page>.js`；禁止镜像母版 `component.js` 再强制 `<script src>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-table + 顶栏 `a-input-search` + 列设置 `a-dropdown`（内嵌 `a-checkbox`）+ `row-selection` 批量操作
- 私有样式真源在 `components/table/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- 禁止外链 CDN 图片；示例可用本地质感图或 data URI

## 4. 视觉规格

- 布局 / 层级 / 强调：顶栏左搜索、右列设置；列设置用方块复选框；有选中行时出现批量删除；表体仍用 `wa-atable` 皮肤
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-atable-shell">
  <div class="wa-atable-toolbar">
    <a-input-search
      v-model="keyword"
      allow-clear
      placeholder="搜索名称 / 城市 / 负责人"
    ></a-input-search>
    <a-space :size="8">
      <a-button v-if="selectedKeys.length" type="secondary" status="danger" size="small">
        批量删除（{{ selectedKeys.length }}）
      </a-button>
      <a-dropdown :hide-on-select="false" position="br">
        <a-button type="secondary">
          <template #icon><icon-list></icon-list></template>
          列设置
        </a-button>
        <template #content>
          <a-doption
            v-for="col in columnOptions"
            :key="col.key"
            class="wa-dropdown-check-option"
          >
            <a-checkbox
              :model-value="visibleKeys.includes(col.key)"
              @change="toggleColumn(col.key)"
              @click.stop
            >{{ col.label }}</a-checkbox>
          </a-doption>
        </template>
      </a-dropdown>
    </a-space>
  </div>
  <a-table
    class="wa-atable"
    :columns="visibleColumns"
    :data="filteredData"
    row-key="key"
    :pagination="false"
    :bordered="false"
    :row-selection="{ type: 'checkbox', showCheckedAll: true }"
    :selected-keys="selectedKeys"
    @selection-change="onSelectionChange"
  >
    <template #status="{ record }">
      <a-tag size="small" bordered :color="statusColor(record.status)">{{ record.status }}</a-tag>
    </template>
  </a-table>
</div>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/table/toolbar/index.html`

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
| `table-pagination` | `components/table/pagination/` | |
| `table-toolbar` | `components/table/toolbar/` | （本条） |
