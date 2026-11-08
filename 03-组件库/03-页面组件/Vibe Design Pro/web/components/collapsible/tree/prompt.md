# 嵌套文件夹

> 状态：preview · slug：`collapsible-tree` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「嵌套文件夹」（`collapsible-tree`）。文件夹嵌套折叠，展开显示文件与子目录。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/collapsible/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把同目录 `component.js` 中的业务逻辑**并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：嵌套 a-collapse；外层 `.wa-collapsible-tree`；`src` → `components` / `utils`
- 与 `collapse` 分工：本家族是**单段**展开；多条目 FAQ 组用 `collapse`
- 私有样式真源在 `components/collapsible/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- Vue 模板内自定义标签勿写成自闭合（如 `</icon-code>`、`</a-avatar>`）

## 4. 视觉规格

- 布局 / 层级 / 强调：圆角树壳；行高统一；子项缩进；右侧 chevron 固定列；展开行浅底
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-collapsible-tree">
  <a-collapse v-model:active-key="activeFolder" :bordered="false" expand-icon-position="right" class="wa-collapsible">
    <template #expand-icon="{ active }">
      <span class="wa-collapsible-chevron wa-collapsible-chevron--sm" :class="{ 'is-open': active }"><icon-down :size="10"></icon-down></span>
    </template>
    <a-collapse-item key="src">
      <template #header>
        <span class="wa-collapsible-tree__row">
          <icon-folder-open v-if="activeFolder.indexOf('src') >= 0" :size="14"></icon-folder-open>
          <icon-folder v-else :size="14"></icon-folder>
          <span>src</span>
        </span>
      </template>
      <div class="wa-collapsible-tree__children">
        <a-collapse v-model:active-key="activeNested" :bordered="false" expand-icon-position="right" class="wa-collapsible">
          <template #expand-icon="{ active }">
            <span class="wa-collapsible-chevron wa-collapsible-chevron--sm" :class="{ 'is-open': active }"><icon-down :size="10"></icon-down></span>
          </template>
          <a-collapse-item key="components">
            <template #header>
              <span class="wa-collapsible-tree__row">
                <icon-folder-open v-if="activeNested.indexOf('components') >= 0" :size="14"></icon-folder-open>
                <icon-folder v-else :size="14"></icon-folder>
                <span>components</span>
              </span>
            </template>
            <div class="wa-collapsible-tree__children">
              <div class="wa-collapsible-tree__file"><icon-file :size="14"></icon-file><span>button.tsx</span></div>
              <div class="wa-collapsible-tree__file"><icon-file :size="14"></icon-file><span>card.tsx</span></div>
            </div>
          </a-collapse-item>
          <a-collapse-item key="utils">
            <template #header>
              <span class="wa-collapsible-tree__row">
                <icon-folder-open v-if="activeNested.indexOf('utils') >= 0" :size="14"></icon-folder-open>
                <icon-folder v-else :size="14"></icon-folder>
                <span>utils</span>
              </span>
            </template>
            <div class="wa-collapsible-tree__children">
              <div class="wa-collapsible-tree__file"><icon-file :size="14"></icon-file><span>helpers.ts</span></div>
            </div>
          </a-collapse-item>
        </a-collapse>
        <div class="wa-collapsible-tree__file"><icon-file :size="14"></icon-file><span>app.tsx</span></div>
        <div class="wa-collapsible-tree__file"><icon-file :size="14"></icon-file><span>index.ts</span></div>
      </div>
    </a-collapse-item>
  </a-collapse>
  <div class="wa-collapsible-tree__file"><icon-file :size="14"></icon-file><span>package.json</span></div>
  <div class="wa-collapsible-tree__file"><icon-file :size="14"></icon-file><span>tsconfig.json</span></div>
</div>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/collapsible/tree/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `collapsible-show-more` | `components/collapsible/show-more/` | |
| `collapsible-code` | `components/collapsible/code/` | |
| `collapsible-form` | `components/collapsible/form/` | |
| `collapsible-comments` | `components/collapsible/comments/` | |
| `collapsible-card` | `components/collapsible/card/` | |
| `collapsible-tree` | `components/collapsible/tree/` | （本条） |
