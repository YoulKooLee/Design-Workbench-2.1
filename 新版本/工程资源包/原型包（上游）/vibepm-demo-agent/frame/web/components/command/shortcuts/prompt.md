# 分组快捷键

> 状态：preview · slug：`command-shortcuts` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「分组快捷键」（`command-shortcuts`）。导航 / 操作 分组，行尾展示键盘快捷键。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。
- **样式落地**：将家族 `components/command/component.css` 规则**并入**宿主 CSS。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：多 `.wa-command__group` + `.wa-command__shortcut`
- 搜索图标在输入左侧（对照 shadcn CommandInput）；勿用 a-input-search 默认右图标布局冒充
- 私有样式真源在 `components/command/component.css`
- Vue 模板内自定义标签勿写成自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：分组标题 + 图标行 + 右侧 ⌘ 提示
- 动效：仅 hover/focus；Shine / Glow → `animations/`
- 颜色：只用 `--wa-*` / Arco token

## 5. 直接粘贴

```html
<div class="wa-command">
  <div class="wa-command__search">
    <span class="wa-command__search-icon"><icon-search :size="15"></icon-search></span>
    <input class="wa-command__input" v-model="qShortcuts" type="text" placeholder="输入命令或搜索…" autocomplete="off" />
    <button type="button" class="wa-command__clear" v-show="qShortcuts" @click="qShortcuts = ''" aria-label="清除"><icon-close :size="12"></icon-close></button>
  </div>
  <div class="wa-command__list">
    <div class="wa-command__group">
      <div class="wa-command__heading">导航</div>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-home :size="14"></icon-home></span><span class="wa-command__item-label">首页</span><span class="wa-command__shortcut">⌘+H</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-file :size="14"></icon-file></span><span class="wa-command__item-label">文档</span><span class="wa-command__shortcut">⌘+D</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-folder :size="14"></icon-folder></span><span class="wa-command__item-label">项目</span><span class="wa-command__shortcut">⌘+P</span></button>
    </div>
    <div class="wa-command__group">
      <div class="wa-command__heading">操作</div>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-search :size="14"></icon-search></span><span class="wa-command__item-label">搜索</span><span class="wa-command__shortcut">⌘+K</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-settings :size="14"></icon-settings></span><span class="wa-command__item-label">设置</span><span class="wa-command__shortcut">⌘+,</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-user :size="14"></icon-user></span><span class="wa-command__item-label">个人资料</span><span class="wa-command__shortcut">⌘+U</span></button>
    </div>
  </div>
</div>
```

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/command/shortcuts/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `command-default` | `components/command/default/` | |
| `command-shortcuts` | `components/command/shortcuts/` | （本条） |
| `command-files` | `components/command/files/` | |
| `command-people` | `components/command/people/` | |
| `command-actions` | `components/command/actions/` | |
| `command-settings` | `components/command/settings/` | |
| `command-filter-tabs` | `components/command/filter-tabs/` | |
| `command-footer` | `components/command/footer/` | |
