# Vibe Design WEB · 表格列宽约定

约束 `PROJECT_PATH=web/` 中 Arco `a-table` 的列宽写法。样板真源：`frame/web/components/table`（及 `table-toolbar` / `table-actions`）。Admin 列表样板可对照 IA，皮肤跟 WEB。

## 分配原则

1. **多数列显式 `width`**；只留 **1 列主字段**（名称 / 标题等）不设宽或用较大 `minWidth`，吃掉剩余空间。
2. **写了 `width` 的列会被钉死**；未写宽的列均分剩余宽度。若只钉后几列、前几列不钉，会出现「前面过宽、后面过窄」。
3. 长文案列加 `ellipsis: true`（必要时 tooltip）。
4. 列多（约 ≥ 7～8 业务列）时设 `:scroll="{ x: 总宽估算 }"`，操作列可 `fixed: 'right'`。
5. 勾选列：`row-selection` 的 `width: 48`。

## 推荐宽度（px）

| 列类型 | 推荐 `width` | 说明 |
| --- | --- | --- |
| 勾选 | `48` | `row-selection.width` |
| 拖拽柄 | `44` | `table-actions` 首列 |
| 主字段（名称 / 标题） | 不设，或 `minWidth: 160` | **唯一**弹性列；过长用 ellipsis |
| 城市 / 短枚举 | `100` | |
| 负责人 / 指派人 | `100` | 三字名约够；更长用 `110` |
| 数量 / 短数字 | `90` | |
| 状态 Tag | `100`～`110` | |
| 日期时间 | `160`～`180` | `YYYY-MM-DD HH:mm` 偏 `180` |
| 编号 / ID | `110`～`150` | |
| 操作（仅「⋯」菜单） | `72`～`88` | |
| 操作（编辑 + 删除 + ⋯） | `120`～`160` | |

## 反例 / 正例

```ts
// ❌ 只钉后列 → 名称/城市/负责人被拉得过宽
;[
  { title: '名称', dataIndex: 'name' },
  { title: '城市', dataIndex: 'city' },
  { title: '负责人', dataIndex: 'owner' },
  { title: '数量', dataIndex: 'count', width: 90 },
  { title: '状态', dataIndex: 'status', width: 100, slotName: 'status' },
  { title: '操作', dataIndex: 'operations', width: 72, slotName: 'operations' },
]

// ✅ 主列弹性，其余钉宽
;[
  { title: '名称', dataIndex: 'name' },
  { title: '城市', dataIndex: 'city', width: 100 },
  { title: '负责人', dataIndex: 'owner', width: 100 },
  { title: '数量', dataIndex: 'count', width: 90 },
  { title: '状态', dataIndex: 'status', width: 110, slotName: 'status' },
  { title: '操作', dataIndex: 'operations', width: 88, slotName: 'operations' },
]
```

## 皮肤与结构

- 表体外层：`class="wa-atable"`（对照母版 `component.css`，样式并入工程 pages/组件样式）。
- 工具栏 + 表体：`.wa-atable-shell` / `.wa-atable-toolbar`。
- 行操作图标区：`.wa-table-ops`。
- 状态：`a-tag` + `bordered` + 语义 `color`。
- **软环不被裁**：Input focus 等外扩环；`overflow:hidden` 容器包控件时加 `.wa-ctrl-ring-safe`（对照 `components.css`）。

## 与 Admin

| 项 | WEB | Admin |
| --- | --- | --- |
| 弹性主列 + 其余钉宽 | 本文 | `list-search-table` 等样板同构 |
| 操作列固定右侧 | 列多时用 `fixed: 'right'` | 常固定 + `pro-table-ops` |
| 勾选列 48 | 同左 | 同 |
| 外壳类 | `wa-atable*` | `pro-*` 表壳；**勿**把 Admin 表壳类拷进 WEB |

增页时优先对照 `frame/web/components/table/*` 的 columns 写法，再改业务字段；不要只给后几列写 `width`。
