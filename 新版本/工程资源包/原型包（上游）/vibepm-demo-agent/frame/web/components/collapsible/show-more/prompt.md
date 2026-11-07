# 展开更多

> 状态：preview · slug：`collapsible-show-more` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「展开更多」（`collapsible-show-more`）。标题行幽灵按钮；常显星标仓库，展开后露出更多 handle。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/collapsible/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把同目录 `component.js` 中的业务逻辑**并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：头行「星标仓库」+ ghost chevron；常显列表在折叠外；禁止把触发器写成「展开更多」面板标题
- 与 `collapse` 分工：本家族是**单段**展开；多条目 FAQ 组用 `collapse`
- 私有样式真源在 `components/collapsible/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- Vue 模板内自定义标签勿写成自闭合（如 `</icon-code>`、`</a-avatar>`）

## 4. 视觉规格

- 布局 / 层级 / 强调：标题右幽灵 chevron；常显 @handle + star；展开更多 bordered 行
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-collapsible-showmore">
  <div class="wa-collapsible-showmore__head">
    <h4 class="wa-collapsible-showmore__title">星标仓库</h4>
    <a-button
      type="text"
      size="mini"
      class="wa-collapsible-ghost"
      :aria-expanded="isOpen ? 'true' : 'false'"
      aria-label="展开/收起"
      @click="toggle"
    >
      <span class="wa-collapsible-chevron" :class="{ 'is-open': isOpen }"><icon-down :size="14"></icon-down></span>
    </a-button>
  </div>
  <ul class="wa-collapsible-showmore__list">
    <li><icon-star :size="14"></icon-star> @shadcn</li>
    <li><icon-star :size="14"></icon-star> @vercel</li>
  </ul>
  <a-collapse v-model:active-key="activeKey" :bordered="false" :show-expand-icon="false" class="wa-collapsible wa-collapsible--bare">
    <a-collapse-item key="1" :show-expand-icon="false">
      <ul class="wa-collapsible-showmore__list">
        <li><icon-star :size="14"></icon-star> @radix-ui</li>
        <li><icon-star :size="14"></icon-star> @stitches</li>
        <li><icon-star :size="14"></icon-star> @peduarte</li>
      </ul>
    </a-collapse-item>
  </a-collapse>
</div>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/collapsible/show-more/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `collapsible-show-more` | `components/collapsible/show-more/` | （本条） |
| `collapsible-code` | `components/collapsible/code/` | |
| `collapsible-form` | `components/collapsible/form/` | |
| `collapsible-comments` | `components/collapsible/comments/` | |
| `collapsible-card` | `components/collapsible/card/` | |
| `collapsible-tree` | `components/collapsible/tree/` | |
