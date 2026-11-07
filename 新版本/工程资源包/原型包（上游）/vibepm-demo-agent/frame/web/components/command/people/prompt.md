# 成员搜索

> 状态：preview · slug：`command-people` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「成员搜索」（`command-people`）。带头像、邮箱与角色的人员列表，底部分隔可加操作。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。
- **样式落地**：将家族 `components/command/component.css` 规则**并入**宿主 CSS。
- **脚本落地**：把同目录 `component.js` 中的过滤/弹层逻辑**并入**宿主页 JS；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：头像用 a-avatar 字母；角色作 meta；底部分隔 + 添加
- 搜索图标在输入左侧（对照 shadcn CommandInput）；勿用 a-input-search 默认右图标布局冒充
- 私有样式真源在 `components/command/component.css`
- Vue 模板内自定义标签勿写成自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：头像+姓名邮箱 + 右侧角色
- 动效：仅 hover/focus；Shine / Glow → `animations/`
- 颜色：只用 `--wa-*` / Arco token

## 5. 直接粘贴

```html
<div class="wa-command">
  <div class="wa-command__search">
    <span class="wa-command__search-icon"><icon-search :size="15"></icon-search></span>
    <input class="wa-command__input" v-model="qPeople" type="text" placeholder="搜索成员…" autocomplete="off" />
    <button type="button" class="wa-command__clear" v-show="qPeople" @click="qPeople = ''" aria-label="清除"><icon-close :size="12"></icon-close></button>
  </div>
  <div class="wa-command__list">
    <button type="button" class="wa-command__item" v-for="u in people" :key="u.email">
      <div class="wa-command__person">
        <a-avatar :size="28" :style="{ background: u.bg, color: '#fff', fontSize: '11px' }">{{ u.initials }}</a-avatar>
        <div class="wa-command__person-text">
          <span class="wa-command__person-name">{{ u.name }}</span>
          <span class="wa-command__person-email">{{ u.email }}</span>
        </div>
      </div>
      <span class="wa-command__item-meta">{{ u.role }}</span>
    </button>
    <div class="wa-command__sep"></div>
    <button type="button" class="wa-command__item">
      <span class="wa-command__item-icon"><icon-plus :size="14"></icon-plus></span>
      <span class="wa-command__item-label">添加新成员</span>
    </button>
  </div>
</div>
```

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/command/people/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `command-default` | `components/command/default/` | |
| `command-shortcuts` | `components/command/shortcuts/` | |
| `command-files` | `components/command/files/` | |
| `command-people` | `components/command/people/` | （本条） |
| `command-actions` | `components/command/actions/` | |
| `command-settings` | `components/command/settings/` | |
| `command-filter-tabs` | `components/command/filter-tabs/` | |
| `command-footer` | `components/command/footer/` | |
