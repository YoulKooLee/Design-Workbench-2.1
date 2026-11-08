# 时间格式

> 状态：preview · slug：`input-timestamp` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「时间格式」（`input-timestamp`）。按 `HH:mm:ss` 掩码录入时分秒。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把 `formatTimeMask` / `normalizeTime` / `watch` / `onTimeBlur` **并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-input.wa-input-timestamp`；仅数字；自动插入 `:`；失焦校正到合法时分秒
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局：柔和底输入；等宽数字感
- 强调：浅填充底；获焦主色描边
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*`（若适用）

## 5. 直接粘贴

```html
<a-input
  class="wa-input-timestamp"
  v-model="value"
  placeholder="00:00:00"
  allow-clear
  :max-length="8"
  @blur="onTimeBlur"
></a-input>
```

> 换文案：只改 placeholder；掩码逻辑随脚本落地一并迁入。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 输入数字可得到 `HH:mm:ss` 形态

## 7. 预览

`components/input/timestamp/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `input-default` | `components/input/default/` |  |
| `input-password` | `components/input/password/` |  |
| `input-number` | `components/input/number/` |  |
| `input-tag` | `components/input/tag/` |  |
| `input-tags-below` | `components/input/tags-below/` |  |
| `input-append` | `components/input/append/` |  |
| `input-search` | `components/input/search/` |  |
| `input-prefix` | `components/input/prefix/` |  |
| `input-copy` | `components/input/copy/` |  |
| `input-success` | `components/input/success/` |  |
| `input-char-limit` | `components/input/char-limit/` |  |
| `input-timestamp` | `components/input/timestamp/` | （本条） |
| `input-range` | `components/input/range/` |  |
| `input-group` | `components/input/group/` |  |
| `input-mention` | `components/input/mention/` |  |
| `input-autocomplete` | `components/input/autocomplete/` |  |
| `input-verification-code` | `components/input/verification-code/` |  |
| `input-textarea` | `components/input/textarea/` |  |
| `input-overlapping-label` | `components/input/overlapping-label/` |  |
| `input-disabled` | `components/input/disabled/` |  |
