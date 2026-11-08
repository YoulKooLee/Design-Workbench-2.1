# 查看代码

> 状态：preview · slug：`collapsible-code` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「查看代码」（`collapsible-code`）。文档或预览下方用折叠露出代码片段。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/collapsible/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把同目录 `component.js` 中的业务逻辑**并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：单面板；内容为 `<pre class="wa-collapsible-code">`
- 与 `collapse` 分工：本家族是**单段**展开；多条目 FAQ 组用 `collapse`
- 私有样式真源在 `components/collapsible/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- Vue 模板内自定义标签勿写成自闭合（如 `</icon-code>`、`</a-avatar>`）

## 4. 视觉规格

- 布局 / 层级 / 强调：描边壳；Code 图标 + 查看代码；展开等宽代码块
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-collapsible-code-shell">
  <a-collapse v-model:active-key="activeKey" :bordered="false" expand-icon-position="right" class="wa-collapsible">
  <template #expand-icon="{ active }">
    <span class="wa-collapsible-chevron wa-collapsible-chevron--sm" :class="{ 'is-open': active }" style="color: var(--color-text-3)"><icon-down :size="10"></icon-down></span>
  </template>
    <a-collapse-item key="1">
      <template #header>
        <span class="wa-collapsible-code__trigger"><icon-code :size="14"></icon-code> 查看代码</span>
      </template>
      <pre class="wa-collapsible-code"><code>function hello() {
  console.log("Hello, World!");
}</code></pre>
    </a-collapse-item>
  </a-collapse>
</div>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/collapsible/code/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `collapsible-show-more` | `components/collapsible/show-more/` | |
| `collapsible-code` | `components/collapsible/code/` | （本条） |
| `collapsible-form` | `components/collapsible/form/` | |
| `collapsible-comments` | `components/collapsible/comments/` | |
| `collapsible-card` | `components/collapsible/card/` | |
| `collapsible-tree` | `components/collapsible/tree/` | |
