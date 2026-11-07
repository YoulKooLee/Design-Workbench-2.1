# 胶囊标签

> 状态：preview · slug：`tag-soft` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「胶囊标签」（`tag-soft`）。营销/产品页的状态与分类胶囊：中性、强调实底、信息浅底、描边版本号。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：胶囊修饰类已写入全局 `assets/common/css/components.css`（`.wa-tag--pill` / `--neutral` / `--solid` / `--soft` / `--outline`）；交付站须挂同文件。横排间距把家族 `components/tag/component.css` 中 `.wa-tag-row` **并入**宿主 CSS。

## 3. 约束

- **本提示词只含这一种形态**（四枚静态胶囊并排；可选组见 `tag-option`）
- 交互：真 a-tag + `bordered` + `wa-tag--*`；**勿**加 Arco 预设 `color`（否则不走修饰类）
- §5 **只贴 HTML**；勿写死 `<link …/component.css>`

## 4. 视觉规格

- 布局 / 层级 / 强调：高度 30px、全圆角胶囊；中性灰底 → 主色实底 → 主色浅底描边 → 透明描边
- 动效：无；Shine / Glow 等 → `animations/`
- 颜色：只用 `--wa-color-primary` / Arco fill·border·text token

## 5. 直接粘贴

```html
<div class="wa-tag-row">
  <a-tag bordered class="wa-tag--pill wa-tag--neutral">中性标签</a-tag>
  <a-tag bordered class="wa-tag--pill wa-tag--solid">强调标签</a-tag>
  <a-tag bordered class="wa-tag--pill wa-tag--soft">信息标签</a-tag>
  <a-tag bordered class="wa-tag--pill wa-tag--outline">v1.0</a-tag>
</div>
```

> 换文案：只改汉字。单枚可去掉外层 `.wa-tag-row`。宿主须已挂 `components.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 四态视觉可区分；未混入预设 `color`
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/tag/soft/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `tag-color` | `components/tag/color/` | |
| `tag-bordered` | `components/tag/bordered/` | |
| `tag-default` | `components/tag/default/` | |
| `tag-closable` | `components/tag/closable/` | |
| `tag-small` | `components/tag/small/` | |
| `tag-checkable` | `components/tag/checkable/` | |
| `tag-icon` | `components/tag/icon/` | |
| `tag-loading` | `components/tag/loading/` | |
| `tag-soft` | `components/tag/soft/` | （本条） |
| `tag-option` | `components/tag/option/` | |
| `tag-icon-text` | `components/tag/icon-text/` | |
| `tag-icon-badge` | `components/tag/icon-badge/` | |
