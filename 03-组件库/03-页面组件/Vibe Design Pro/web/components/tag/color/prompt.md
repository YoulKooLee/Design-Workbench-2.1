# 彩色标签

> 状态：preview · slug：`tag-color` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「彩色标签」（`tag-color`）。用预设色区分业务状态（填充态）。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/tag/component.css` 中与 `.wa-tag-row` 相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。默认标签灰边无底已在全局 `components.css`，勿再拷。

## 3. 约束

- **本提示词只含这一种形态**（填充彩色；描边见 `tag-bordered`）
- 交互：真 a-tag + `color` 预设；「处理中」用主色 `arcoblue`
- 若有私有样式：规则真源在家族 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：多色填充标签横排（处理中置前）；间距用 `.wa-tag-row`
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：Arco 预设色名；主色用 `arcoblue`（跟主题 primary）

## 5. 直接粘贴

```html
<div class="wa-tag-row">
  <a-tag color="arcoblue">处理中</a-tag>
  <a-tag color="red">已拒绝</a-tag>
  <a-tag color="green">已通过</a-tag>
  <a-tag color="gray">已取消</a-tag>
  <a-tag color="orange">待审核</a-tag>
</div>
```

> 换文案：只改汉字；增减色只需改 `color` 与文案。单枚可去掉外层 `.wa-tag-row`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/tag/color/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `tag-color` | `components/tag/color/` | （本条） |
| `tag-bordered` | `components/tag/bordered/` | |
| `tag-default` | `components/tag/default/` | |
| `tag-closable` | `components/tag/closable/` | |
| `tag-small` | `components/tag/small/` | |
| `tag-checkable` | `components/tag/checkable/` | |
| `tag-icon` | `components/tag/icon/` | |
| `tag-loading` | `components/tag/loading/` | |
| `tag-soft` | `components/tag/soft/` | |
| `tag-option` | `components/tag/option/` | |
| `tag-icon-text` | `components/tag/icon-text/` | |
| `tag-icon-badge` | `components/tag/icon-badge/` | |

