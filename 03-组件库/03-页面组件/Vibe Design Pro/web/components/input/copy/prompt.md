# 一键复制

> 状态：preview · slug：`input-copy` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「一键复制」（`input-copy`）。只读链接/文本，后缀复制到剪贴板。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。
## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-input.wa-input-copy` + `#suffix`；`a-tooltip` 悬停「复制/已复制」；点击后图标切 `icon-check` 约 1.6s 后恢复；只读；不用全局 Message
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局：柔和底输入 + 右侧复制/已复制图标
- 强调：获焦主色描边；悬停气泡提示；成功仅图标切换
- 动效：仅本控件轻交互（hover/focus/点击图标切换）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*`（若适用）

## 5. 直接粘贴

```html
<a-input
  class="wa-input-copy"
  v-model="value"
  readonly
>
  <template #suffix>
    <a-tooltip :content="copied ? '已复制' : '复制'">
      <span
        class="wa-input-copy__btn"
        :class="{ 'is-copied': copied }"
        role="button"
        tabindex="0"
        :aria-label="copied ? '已复制' : '复制'"
        @click="copyValue"
        @keydown.enter.prevent="copyValue"
      >
        <icon-check v-if="copied"></icon-check>
        <icon-copy v-else></icon-copy>
      </span>
    </a-tooltip>
  </template>
</a-input>
```
> 换文案：只改 placeholder / 汉字，勿改控件类型与 class。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/input/copy/index.html`

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
| `input-copy` | `components/input/copy/` | （本条） |
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
