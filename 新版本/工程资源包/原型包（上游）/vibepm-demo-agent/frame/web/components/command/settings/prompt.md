# 设置搜索

> 状态：preview · slug：`command-settings` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「设置搜索」（`command-settings`）。设置项分组列表：通用 / 安全 / 外观，组分隔。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。
- **样式落地**：将家族 `components/command/component.css` 规则**并入**宿主 CSS。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：多 `.wa-command__group` + `.wa-command__sep`
- 搜索图标在输入左侧（对照 shadcn CommandInput）；勿用 a-input-search 默认右图标布局冒充
- 私有样式真源在 `components/command/component.css`
- Vue 模板内自定义标签勿写成自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：分组标题 + 设置项行；组分隔线
- 动效：仅 hover/focus；Shine / Glow → `animations/`
- 颜色：只用 `--wa-*` / Arco token

## 5. 直接粘贴

```html
<div class="wa-command">
  <div class="wa-command__search">
    <span class="wa-command__search-icon"><icon-search :size="15"></icon-search></span>
    <input class="wa-command__input" v-model="qSettings" type="text" placeholder="搜索设置…" autocomplete="off" />
    <button type="button" class="wa-command__clear" v-show="qSettings" @click="qSettings = ''" aria-label="清除"><icon-close :size="12"></icon-close></button>
  </div>
  <div class="wa-command__list">
    <div class="wa-command__group">
      <div class="wa-command__heading">通用</div>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-settings :size="14"></icon-settings></span><span class="wa-command__item-label">通用设置</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-notification :size="14"></icon-notification></span><span class="wa-command__item-label">通知</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-book :size="14"></icon-book></span><span class="wa-command__item-label">语言</span></button>
    </div>
    <div class="wa-command__sep"></div>
    <div class="wa-command__group">
      <div class="wa-command__heading">安全</div>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-lock :size="14"></icon-lock></span><span class="wa-command__item-label">密码</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-safe :size="14"></icon-safe></span><span class="wa-command__item-label">隐私</span></button>
    </div>
    <div class="wa-command__sep"></div>
    <div class="wa-command__group">
      <div class="wa-command__heading">外观</div>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-moon :size="14"></icon-moon></span><span class="wa-command__item-label">主题</span></button>
    </div>
  </div>
</div>
```

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/command/settings/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `command-default` | `components/command/default/` | |
| `command-shortcuts` | `components/command/shortcuts/` | |
| `command-files` | `components/command/files/` | |
| `command-people` | `components/command/people/` | |
| `command-actions` | `components/command/actions/` | |
| `command-settings` | `components/command/settings/` | （本条） |
| `command-filter-tabs` | `components/command/filter-tabs/` | |
| `command-footer` | `components/command/footer/` | |
