# 分类搜索列表

> 状态：preview · slug：`command-default` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「分类搜索列表」（`command-default`）。最简命令菜单：搜索框 + 带图标的分类列表与空态。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。
- **样式落地**：将家族 `components/command/component.css` 规则**并入**宿主 CSS。
- **脚本落地**：把同目录 `component.js` 中的过滤/弹层逻辑**并入**宿主页 JS；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：`.wa-command`；左侧搜索图标输入；列表可过滤
- 搜索图标在输入左侧（对照 shadcn CommandInput）；勿用 a-input-search 默认右图标布局冒充
- 私有样式真源在 `components/command/component.css`
- Vue 模板内自定义标签勿写成自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：圆角描边面板；左图标行；无匹配时居中空态
- 动效：仅 hover/focus；Shine / Glow → `animations/`
- 颜色：只用 `--wa-*` / Arco token

## 5. 直接粘贴

```html
<div class="wa-command">
  <div class="wa-command__search">
    <span class="wa-command__search-icon"><icon-search :size="15"></icon-search></span>
    <input class="wa-command__input" v-model="qCats" type="text" placeholder="搜索分类…" autocomplete="off" />
    <button type="button" class="wa-command__clear" v-show="qCats" @click="qCats = ''" aria-label="清除"><icon-close :size="12"></icon-close></button>
  </div>
  <div class="wa-command__list">
    <template v-if="filteredCats.length">
      <button type="button" class="wa-command__item" v-for="item in filteredCats" :key="item.label">
        <span class="wa-command__item-icon"><component :is="item.icon" :size="14"></component></span>
        <span class="wa-command__item-label">{{ item.label }}</span>
      </button>
    </template>
    <div class="wa-command__empty" v-else>未找到匹配结果</div>
  </div>
</div>
```

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/command/default/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `command-default` | `components/command/default/` | （本条） |
| `command-shortcuts` | `components/command/shortcuts/` | |
| `command-files` | `components/command/files/` | |
| `command-people` | `components/command/people/` | |
| `command-actions` | `components/command/actions/` | |
| `command-settings` | `components/command/settings/` | |
| `command-filter-tabs` | `components/command/filter-tabs/` | |
| `command-footer` | `components/command/footer/` | |
