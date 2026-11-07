# 标签

> 状态：preview · slug：`tag-default` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「标签」（`tag-default`）。灰色描边、无填充底的默认态标签。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：默认灰边无底已写入全局 `assets/common/css/components.css`（交付站须挂同文件或等价规则）；**无需**再从家族 `component.css` 拷贝。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-tag + `bordered`（无 color）；样式跟全局 Tag 默认态
- 禁止在业务页再写一套默认 Tag 覆盖色，除非有意偏离母版

## 4. 视觉规格

- 布局 / 层级 / 强调：灰边、透明底、次要文字色
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：描边 `--color-border-2`；文字 `--color-text-2`（随主题）

## 5. 直接粘贴

```html
<a-tag bordered>默认</a-tag>
```

> 换文案：只改汉字。宿主须已挂 `components.css`（或等价默认 Tag 规则）。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 灰边、无填充底
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/tag/default/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `tag-color` | `components/tag/color/` | |
| `tag-bordered` | `components/tag/bordered/` | |
| `tag-default` | `components/tag/default/` | （本条） |
| `tag-closable` | `components/tag/closable/` | |
| `tag-small` | `components/tag/small/` | |
| `tag-checkable` | `components/tag/checkable/` | |
| `tag-icon` | `components/tag/icon/` | |
| `tag-loading` | `components/tag/loading/` | |
| `tag-soft` | `components/tag/soft/` | |
| `tag-option` | `components/tag/option/` | |
| `tag-icon-text` | `components/tag/icon-text/` | |
| `tag-icon-badge` | `components/tag/icon-badge/` | |

