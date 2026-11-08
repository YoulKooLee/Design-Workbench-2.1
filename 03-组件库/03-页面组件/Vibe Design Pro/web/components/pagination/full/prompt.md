# 完整分页

> 状态：preview · slug：`pagination-full` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「完整分页」（`pagination-full`）。展示总量与每页条数切换。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-pagination；show-total + show-page-size
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：总量文案 + 页容量选择 + 页码
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-pagination v-model:current="currentFull" :total="86" :page-size="10" show-total show-page-size />
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/pagination/full/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `pagination-default` | `components/pagination/default/` | |
| `pagination-mini` | `components/pagination/mini/` | |
| `pagination-jumper` | `components/pagination/jumper/` | |
| `pagination-full` | `components/pagination/full/` | （本条） |
| `pagination-all` | `components/pagination/all/` | |
| `pagination-simple` | `components/pagination/simple/` | |
| `pagination-prev-next` | `components/pagination/prev-next/` | |
| `pagination-counter` | `components/pagination/counter/` | |
| `pagination-text` | `components/pagination/text/` | |
| `pagination-joined` | `components/pagination/joined/` | |
| `pagination-disabled` | `components/pagination/disabled/` | |
