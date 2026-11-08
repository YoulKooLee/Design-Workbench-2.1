# 固定列表格

> 状态：preview · slug：`table-fixed` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「固定列表格」（`table-fixed`）。左右固定关键列，横向滚动浏览宽表。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-table；列 `fixed` + `:scroll="{ x }"`
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 禁止外链 CDN 图片；示例可用本地质感图或 data URI

## 4. 视觉规格

- 布局 / 层级 / 强调：左名称 / 右操作固定，中间可横滚
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-table
  class="wa-atable"
  :columns="columns"
  :data="data"
  row-key="key"
  :pagination="false"
  :scroll="{ x: 1400 }"
>
  <template #status="{ record }">
    <a-tag size="small" bordered :color="statusColor(record.status)">{{ record.status }}</a-tag>
  </template>
  <template #operations>
    <a-space class="wa-table-ops" :size="4">
      <a-button type="text" size="small">查看</a-button>
      <a-button type="text" size="small">编辑</a-button>
    </a-space>
  </template>
</a-table>
```

> 列配置需含 `fixed: 'left'|'right'` 与足够 `width`；表宽随容器 100%；`:scroll.x` 大于容器宽度时才会横滚并看出固定列。换文案只改汉字。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/table/fixed/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `table-default` | `components/table/default/` | |
| `table-stripe` | `components/table/stripe/` | |
| `table-border` | `components/table/border/` | |
| `table-selection` | `components/table/selection/` | |
| `table-fixed` | `components/table/fixed/` | （本条） |
| `table-fixed-header` | `components/table/fixed-header/` | |
| `table-sortable` | `components/table/sortable/` | |
| `table-expand` | `components/table/expand/` | |
| `table-tree` | `components/table/tree/` | |
| `table-group` | `components/table/group/` | |
| `table-actions` | `components/table/actions/` | |
| `table-pagination` | `components/table/pagination/` | |
| `table-toolbar` | `components/table/toolbar/` | |
