# 级联选择

> 状态：preview · slug：`select-cascader` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「级联选择」（`select-cascader`）。省市区等多级路径选择（对照 Admin Cascader）。

成功标准：业务页出现与 §5 一致的真选择控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-cascader` + `path-mode`；`:options` 树；可清空
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局：控件本体；宽度由宿主表单决定（通栏触发器）
- 强调：描边 / 面板跟 Arco / `components.css`（品牌/分类面板见本目录 `component.css`）
- 动效：无；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-cascader
  v-model="value"
  :options="options"
  path-mode
  allow-clear
  placeholder="请选择"
/>
```

> 换文案：只改 placeholder / options 汉字。宿主需提供级联 `options`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/select/cascader/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------| `select-default` | `components/select/default/` |  |
| `select-multiple` | `components/select/multiple/` |  |
| `select-search` | `components/select/search/` |  |
| `select-create` | `components/select/create/` |  |
| `select-cascader` | `components/select/cascader/` | （本条） |
| `select-tree-select` | `components/select/tree-select/` |  |
| `select-brand` | `components/select/brand/` |  |
| `select-category` | `components/select/category/` |  |
| `select-disabled` | `components/select/disabled/` |  |
