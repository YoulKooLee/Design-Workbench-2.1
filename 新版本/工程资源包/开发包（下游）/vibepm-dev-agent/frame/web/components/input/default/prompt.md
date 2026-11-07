# 文本输入

> 状态：preview · slug：`input-default` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「文本输入」（`input-default`）。表单中输入单行文本（网址、标题等）。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：高度/圆角等密度已在母版 `assets/common/css/components.css`；业务页挂该文件即可，无需私有 `component.css`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-input`；可清空

## 4. 视觉规格

- 布局：控件本体；宽度由宿主表单决定
- 强调：WEB 默认密度（`components.css`）——高 40px、圆角 8px、字号 14px、左右内边距 12px
- 动效：无；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：描边/底色仍跟 `components.css` token

## 5. 直接粘贴

```html
<a-input
  v-model="value"
  placeholder="请输入"
  allow-clear
></a-input>
```

> 换文案：只改 placeholder / 汉字，勿改控件类型与 class。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 高度约 40px（跟 `components.css` WEB 密度）

## 7. 预览

`components/input/default/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `input-default` | `components/input/default/` | （本条） |
| `input-password` | `components/input/password/` |  |
| `input-number` | `components/input/number/` |  |
| `input-tag` | `components/input/tag/` |  |
| `input-tags-below` | `components/input/tags-below/` |  |
| `input-append` | `components/input/append/` |  |
| `input-search` | `components/input/search/` |  |
| `input-prefix` | `components/input/prefix/` |  |
| `input-copy` | `components/input/copy/` |  |
| `input-char-limit` | `components/input/char-limit/` |  |
| `input-timestamp` | `components/input/timestamp/` |  |
| `input-range` | `components/input/range/` |  |
| `input-group` | `components/input/group/` |  |
| `input-mention` | `components/input/mention/` |  |
| `input-autocomplete` | `components/input/autocomplete/` |  |
| `input-verification-code` | `components/input/verification-code/` |  |
| `input-textarea` | `components/input/textarea/` |  |
| `input-overlapping-label` | `components/input/overlapping-label/` |  |
| `input-success` | `components/input/success/` |  |
| `input-disabled` | `components/input/disabled/` |  |
