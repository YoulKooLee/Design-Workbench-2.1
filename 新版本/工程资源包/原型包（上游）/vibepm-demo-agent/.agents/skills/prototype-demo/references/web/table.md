# 表格列宽约定（WEB）

约束 WEB 交付页中 Arco `a-table` 的列宽写法。样板真源：`frame/web/components/table`；验收页：`frame/web/theme`。  
Admin 列表样板（如 `list-search-table`）同构，可对照；Admin 无单独「列宽」长文，以本文 + catalog 样板为准。

## 分配原则

1. **多数列显式 `width`**；只留 **1 列主字段**（名称 / 标题等）不设宽或用较大 `minWidth`，吃掉剩余空间。
2. **写了 `width` 的列会被钉死**；未写宽的列均分剩余宽度。若只钉后几列、前几列不钉，会出现「前面过宽、后面过窄」。
3. 长文案列加 `ellipsis: true`（必要时 `tooltip: true`）。
4. 列多（约 ≥ 7～8 业务列）时设 `:scroll="{ x: 总宽估算 }"`，操作列可 `fixed: 'right'`。
5. 勾选列：`row-selection` 的 `width: 48`（与 Admin / WEB `wa-atable` 一致）。

## 推荐宽度（px）

| 列类型 | 推荐 `width` | 说明 |
| --- | --- | --- |
| 勾选 | `48` | `row-selection.width` |
| 拖拽柄 | `44` | `table-actions` 首列 |
| 主字段（名称 / 标题） | 不设，或 `minWidth: 160` | **唯一**弹性列；过长用 ellipsis |
| 城市 / 短枚举 | `100` | |
| 负责人 / 指派人 | `100` | 三字名约够；更长用 `110` |
| 数量 / 短数字 | `90` | |
| 状态 Tag | `100`～`110` | 与 Tag 文案匹配，勿过窄挤换行 |
| 日期时间 | `160`～`180` | `YYYY-MM-DD HH:mm` 偏 `180` |
| 编号 / ID | `110`～`150` | 视格式 |
| 操作（仅「⋯」菜单） | `72`～`88` | `theme` 用 `88` |
| 操作（编辑 + 删除 + ⋯） | `120`～`160` | Admin 多按钮常用 `160` |

## 反例 / 正例

```js
// ❌ 只钉后列 → 名称/城市/负责人被拉得过宽，状态与操作显得挤
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

- 表体外层：`class="wa-atable"`（`frame/web/components/table/component.css`）。
- 工具栏 + 表体：`.wa-atable-shell` / `.wa-atable-toolbar`（见 `table-toolbar`）。
- 行操作图标区：`.wa-table-ops`（见 `table-actions`）。
- 状态：`a-tag` + `bordered` + 语义 `color`。
- **软环不被裁**：Input focus / secondary hover 外扩 `--wa-ctrl-ring`（默认 3px）。`.wa-atable-toolbar` 已自带呼吸区；其它 `overflow:hidden` 容器包控件时加 `.wa-ctrl-ring-safe`（`assets/common/css/components.css`）。

## 与 Admin 对齐

| 项 | WEB | Admin |
| --- | --- | --- |
| 弹性主列 + 其余钉宽 | 本文 | `list-search-table` 等样板同构 |
| 操作列固定右侧 | 列多时用 `fixed: 'right'` | 默认固定 + `pro-table-ops` |
| 勾选列 48 | 同左 | `pages-common` 锁宽 |

增页时优先复制 `frame/web/components/table/*` 的 columns 写法，再改业务字段；不要只给后几列写 `width`。
