# 文本省略

> 状态：preview · slug：`typography-ellipsis` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「文本省略」（`typography-ellipsis`）。详情说明两行省略。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-typography-paragraph 的 `ellipsis`（`rows: 2`、`css: true`）
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：单段两行 CSS 省略（`css: true`）；颜色/宽度跟原生段落，不另设色宽；仅修正 Tooltip 外包 `trigger-wrapper`；悬停看全文
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-typo-ellipsis">
  <a-typography-paragraph
    style="margin:0"
    :ellipsis="{ rows: 2, css: true, showTooltip: true }"
  >本单为春季香氛礼盒欧洲线加急发运，主品与试用装已完成批次质检与报关预审；空运段预计 5–7 个工作日抵达法兰克福海外仓，再分拨德法站点。面单文件 eu-fragrance-label-v3.pdf，仓储节点 WMS · frankfurt-01，标签含香氛、礼盒、加急。</a-typography-paragraph>
</div>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 可见两行「…」截断

## 7. 预览

`components/typography/ellipsis/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `typography` | `components/typography/title/` |  |
| `typography-paragraph` | `components/typography/paragraph/` |  |
| `typography-text` | `components/typography/text/` |  |
| `typography-ellipsis` | `components/typography/ellipsis/` | （本条） |
| `typography-meta` | `components/typography/meta/` |  |
| `typography-fields` | `components/typography/fields/` |  |

