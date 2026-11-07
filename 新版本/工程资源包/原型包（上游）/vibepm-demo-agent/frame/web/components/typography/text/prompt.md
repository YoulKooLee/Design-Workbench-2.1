# 标题段落

> 状态：preview · slug：`typography-text` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「标题段落」（`typography-text`）。页标题与说明段落组合。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-typography-title（`:heading="5"`）+ a-typography-paragraph（`type="secondary"`）
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：上标题下段落；间距 8px；段落次要色；宽度跟容器撑满
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div style="display:flex;flex-direction:column;gap:8px;width:100%">
  <a-typography-title :heading="5" style="margin:0">春季香氛礼盒 · 欧洲线加急发运</a-typography-title>
  <a-typography-paragraph type="secondary" style="margin:0">
    本单为春季香氛礼盒欧洲线加急发运，含主品、试用装与多语说明书。已完成质检与报关预审，计划空运至法兰克福海外仓后分拨德法站点。
  </a-typography-paragraph>
</div>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/typography/text/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `typography` | `components/typography/title/` |  |
| `typography-paragraph` | `components/typography/paragraph/` |  |
| `typography-text` | `components/typography/text/` | （本条） |
| `typography-ellipsis` | `components/typography/ellipsis/` |  |
| `typography-meta` | `components/typography/meta/` |  |
| `typography-fields` | `components/typography/fields/` |  |

