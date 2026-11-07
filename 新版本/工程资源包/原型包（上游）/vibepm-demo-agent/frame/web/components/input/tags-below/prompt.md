# 标签外置

> 状态：preview · slug：`input-tags-below` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「标签外置」（`input-tags-below`）。输入框下方展示可关闭标签，回车添加。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。
## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-input` + `a-tag` 列表；回车添加（`press-enter` / `keydown.Enter`）、关闭移除
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局：输入在上、标签横排在下；宽度由宿主表单决定
- 强调：描边跟 `components.css`
- 动效：仅本控件轻交互（hover/focus/点击）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*`（若适用）

## 5. 直接粘贴

```html
<div class="wa-input-tags-below">
  <a-input
    v-model="draft"
    placeholder="添加标签，回车确认"
    allow-clear
    @press-enter="addTag"
    @keydown="onDraftKeydown"
  ></a-input>
  <div class="wa-input-tags-below__list">
    <a-tag
      v-for="tag in tags"
      :key="tag"
      closable
      @close="removeTag(tag)"
    >{{ tag }}</a-tag>
  </div>
</div>
```

> 换文案：只改 placeholder / 汉字，勿改控件类型与 class。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/input/tags-below/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `input-default` | `components/input/default/` |  |
| `input-password` | `components/input/password/` |  |
| `input-number` | `components/input/number/` |  |
| `input-tag` | `components/input/tag/` |  |
| `input-tags-below` | `components/input/tags-below/` | （本条） |
| `input-append` | `components/input/append/` |  |
| `input-search` | `components/input/search/` |  |
| `input-prefix` | `components/input/prefix/` |  |
| `input-copy` | `components/input/copy/` |  |
| `input-success` | `components/input/success/` |  |
| `input-char-limit` | `components/input/char-limit/` |  |
| `input-timestamp` | `components/input/timestamp/` |  |
| `input-range` | `components/input/range/` |  |
| `input-group` | `components/input/group/` |  |
| `input-mention` | `components/input/mention/` |  |
| `input-autocomplete` | `components/input/autocomplete/` |  |
| `input-verification-code` | `components/input/verification-code/` |  |
| `input-textarea` | `components/input/textarea/` |  |
| `input-overlapping-label` | `components/input/overlapping-label/` |  |
| `input-disabled` | `components/input/disabled/` |  |
