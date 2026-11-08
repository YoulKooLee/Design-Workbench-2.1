# WEB 母版区块登记列表

**真源：** [`catalog.json`](./catalog.json)（对齐 [Shadcn UI Kit Blocks](https://shadcnuikit.com/blocks)）  
**画廊：** [`index.html`](./index.html)（读 `catalog.json` / `catalog.data.js`）  
**类型页：** `blocks/{typeId}/index.html`（变体列表；右上角复制各 `prompt.md`）  
**类型页共用：** [`type.css`](./type.css) · [`type.js`](./type.js)（视口 / 主题 / iframe；勿再写进各类型目录）

| 层 | Shadcn UI Kit | 本母版 |
| --- | --- | --- |
| 分类 | Marketing / Ecommerce / … | `catalog.json` → `groups[]` |
| 类型 | Hero Section… | `catalog.json` → `types[]`；类型页 `blocks/{id}/` |
| 布局 / 变体 | 类型下 N blocks | `types[].layouts[]` → `blocks/{typeId}/{variant}/`；条目在 `blocks[]` |

优化列表时**优先改 `catalog.json`**，然后：

```bash
python scripts/sync-block-types.py
```

| 项 | 值 |
| --- | --- |
| 母版版本 | 1.1.0 |
| 文档日 | 2026-10-10 |
| 分类 | 4 |
| 类型 | 见 `catalog.json` → `types[]` |
| 已挂布局 | `hero-centered-announce`、`hero-centered-social`、`hero-centered-highlight`、`hero-ai-prompt` |

### 命名

- **类型目录** = 类型 id（如 `hero`），不必等于中文名「首屏」
- **变体目录 / slug** = 变体名（如 `centered-announce` / `hero-centered-announce`），与 `meta.yaml` · `catalog.blocks[].slug` · `prompt.md` 一致
- 展示名用 `label` / 中文标题，不要求目录用中文

### 边界

- 页面壳 → `layouts/`；控件 → `components/`
- 壳与控件勿塞进区块库存

### 当前有货映射

| 类型 id | 变体 slug | 路径 |
| --- | --- | --- |
| `hero-section` | `hero-centered-announce` | `blocks/hero-section/centered-announce/` |
| `hero-section` | `hero-centered-social` | `blocks/hero-section/centered-social/` |
| `hero-section` | `hero-centered-highlight` | `blocks/hero-section/centered-highlight/` |
| `hero-section` | `hero-ai-prompt` | `blocks/hero-section/ai-prompt/` |
