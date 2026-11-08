# 可选标签

> 状态：preview · slug：`tag-checkable` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「可选标签」（`tag-checkable`）。可点选切换选中态；未选中跟默认灰边无底一致，选中为主色填充。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：未选中/选中态已写入全局 `assets/common/css/components.css`；交付站须挂同文件或等价规则。
- **脚本落地**：把 `checked`（或等价选中态）**并入**宿主页 `js/<page>.js`；**禁止**镜像母版 `component.js` 再强制 `<script src>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-tag + `checkable` + `bordered`；可用 v-model:checked 或 :checked + @check
- 勿加预设 `color`（未选中需走全局默认描边）
- 若有私有业务脚本：真源在同目录 `component.js`；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：未选中灰边无底；选中主色底 + 白字
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：未选中跟默认 Tag；选中 `rgb(var(--primary-6))`

## 5. 直接粘贴

```html
<a-tag checkable bordered v-model:checked="checked">筛选条件</a-tag>
```

> 换文案：只改汉字。宿主须已挂 `components.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未选中灰边无底；选中主色
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/tag/checkable/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `tag-color` | `components/tag/color/` | |
| `tag-bordered` | `components/tag/bordered/` | |
| `tag-default` | `components/tag/default/` | |
| `tag-closable` | `components/tag/closable/` | |
| `tag-small` | `components/tag/small/` | |
| `tag-checkable` | `components/tag/checkable/` | （本条） |
| `tag-icon` | `components/tag/icon/` | |
| `tag-loading` | `components/tag/loading/` | |
| `tag-soft` | `components/tag/soft/` | |
| `tag-option` | `components/tag/option/` | |
| `tag-icon-text` | `components/tag/icon-text/` | |
| `tag-icon-badge` | `components/tag/icon-badge/` | |

