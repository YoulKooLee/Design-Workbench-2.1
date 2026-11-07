# {{中文名}}

> 状态：`skeleton` | `preview` | `stable`  
> slug：`{{slug}}` · 类型：component · 母版：`web` · surface：`marketing` | `general` · category：`{{action|input|display|overlay}}`

<!--
复制为 components/{slug}/prompt.md（家族成员则为 components/{family}/{subdir}/prompt.md）。
整文件可一键复制给 Agent。§5 必带一段可粘贴 HTML；无兄弟形态则删 §8。
一形态一 slug；预览只展示这一种；其它态用兄弟 slug。
面向落地：勿写母版库存说明（如预览可保留独立 css、直开/embed=1、CDN 示例图等）——那些放 design-library 技能。
-->

## 1. 角色与目标

实现「{{中文名}}」（`{{slug}}`）。{{一句话场景}}。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**（**仅本条有业务脚本时写**；仅预览 `WebArco.mount` / 无 `component.js` 则整条删除）：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。多页共用助手（如 `upload-demo.js`）允许交付内**一份**共享脚本。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：{{本条规则}}
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`（或家族共享助手）；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：{{要点，2～4 条}}
- 动效：{{无 | 仅本控件轻交互（hover/focus 等，写在本目录 css/js）}}；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*`（若适用）

## 5. 直接粘贴

```html
<!-- 本形态完整片段（仅 HTML；私有样式落地时并入宿主 CSS） -->
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/{{path-or-slug}}/index.html`

## 8. 兄弟形态（同家族，可选）

无家族则整节删除。

| slug | 路径 | |
|------|------|--|
| `{{slug}}` | `components/{{family}}/{{subdir}}/` | （本条） |
| `{{sibling}}` | `components/{{family}}/{{subdir}}/` |  |
