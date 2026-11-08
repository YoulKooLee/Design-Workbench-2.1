# 小型标签

> 状态：preview · slug：`tag-small` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「小型标签」（`tag-small`）。紧凑列表中的小型标签，视觉跟默认态一致（灰边无底）。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：灰边无底已写入全局 `assets/common/css/components.css`；本条勿再写 `color="gray"`（会走灰色填充预设，脱离默认描边态）。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-tag + `size="small"` + `bordered`；无 color
- 禁止加预设 `color`，否则不会套用全局默认描边

## 4. 视觉规格

- 布局 / 层级 / 强调：高度更矮的灰边无底标签
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：跟默认 Tag（`--color-border-2` / `--color-text-2`）

## 5. 直接粘贴

```html
<a-tag size="small" bordered>小型</a-tag>
```

> 换文案：只改汉字。宿主须已挂 `components.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 灰边无底（非灰色填充）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/tag/small/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `tag-color` | `components/tag/color/` | |
| `tag-bordered` | `components/tag/bordered/` | |
| `tag-default` | `components/tag/default/` | |
| `tag-closable` | `components/tag/closable/` | |
| `tag-small` | `components/tag/small/` | （本条） |
| `tag-checkable` | `components/tag/checkable/` | |
| `tag-icon` | `components/tag/icon/` | |
| `tag-loading` | `components/tag/loading/` | |
| `tag-soft` | `components/tag/soft/` | |
| `tag-option` | `components/tag/option/` | |
| `tag-icon-text` | `components/tag/icon-text/` | |
| `tag-icon-badge` | `components/tag/icon-badge/` | |

