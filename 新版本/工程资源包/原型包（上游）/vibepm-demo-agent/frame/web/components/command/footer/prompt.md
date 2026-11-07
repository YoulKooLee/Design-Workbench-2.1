# 底栏键位

> 状态：preview · slug：`command-footer` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「底栏键位」（`command-footer`）。自定义顶栏（筛选图标 + 关闭）与底栏导航键提示。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。
- **样式落地**：将家族 `components/command/component.css` 规则**并入**宿主 CSS。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：`.wa-command__header` + `.wa-command__footer`；操作与关键词分组
- 搜索图标在输入左侧（对照 shadcn CommandInput）；勿用 a-input-search 默认右图标布局冒充
- 私有样式真源在 `components/command/component.css`
- Vue 模板内自定义标签勿写成自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：顶栏快捷键徽章；底栏 ↑↓ / esc
- 动效：仅 hover/focus；Shine / Glow → `animations/`
- 颜色：只用 `--wa-*` / Arco token

## 5. 直接粘贴

```html
<div class="wa-command">
  <div class="wa-command__header">
    <span class="wa-command__search-icon"><icon-filter :size="15"></icon-filter></span>
    <input class="wa-command__input" v-model="qFooter" type="text" placeholder="智能搜索…" autocomplete="off" />
    <span class="wa-command__shortcut">⌘+M</span>
    <button type="button" class="wa-command__clear" aria-label="关闭"><icon-close :size="12"></icon-close></button>
  </div>
  <div class="wa-command__list">
    <div class="wa-command__group">
      <div class="wa-command__heading">操作</div>
      <button type="button" class="wa-command__item">
        <span class="wa-command__item-lead"><a-avatar :size="24" style="background:#64748b;color:#fff;font-size:10px">斯</a-avatar></span>
        <span class="wa-command__item-label">指派给斯蒙</span>
      </button>
      <button type="button" class="wa-command__item">
        <span class="wa-command__item-lead"><icon-user :size="14"></icon-user></span>
        <span class="wa-command__item-label">指派给…</span>
        <span class="wa-command__shortcut">A</span>
      </button>
      <button type="button" class="wa-command__item">
        <span class="wa-command__item-lead"><icon-close :size="14"></icon-close></span>
        <span class="wa-command__item-label">取消指派</span>
        <span class="wa-command__shortcut">U</span>
      </button>
    </div>
    <div class="wa-command__sep"></div>
    <div class="wa-command__group">
      <div class="wa-command__heading">关键词</div>
      <button type="button" class="wa-command__item">
        <span class="wa-command__item-lead"><a-avatar :size="24" style="background:#475569;color:#fff;font-size:10px">斯</a-avatar></span>
        <div class="wa-command__person-text">
          <span class="wa-command__person-name">斯蒙·普鲁辛</span>
          <span class="wa-command__person-email">simon@example.com</span>
        </div>
      </button>
      <button type="button" class="wa-command__item">
        <span class="wa-command__item-lead"><icon-file :size="14"></icon-file></span>
        <span class="wa-command__item-label">注册流程</span>
        <span class="wa-command__item-meta">Notion</span>
      </button>
      <button type="button" class="wa-command__item">
        <span class="wa-command__item-lead"><icon-apps :size="14"></icon-apps></span>
        <span class="wa-command__item-label">注册流程设计</span>
        <span class="wa-command__item-meta">MSP-10</span>
      </button>
      <button type="button" class="wa-command__item">
        <span class="wa-command__item-lead"><icon-exclamation-circle :size="14"></icon-exclamation-circle></span>
        <span class="wa-command__item-label">注册错误</span>
        <span class="wa-command__item-meta">MSD-10</span>
      </button>
    </div>
  </div>
  <div class="wa-command__footer">
    <span><span class="wa-command__kbd">↑</span><span class="wa-command__kbd">↓</span> 导航</span>
    <span><span class="wa-command__kbd">↵</span> 确认</span>
    <span><span class="wa-command__kbd">esc</span> 关闭</span>
  </div>
</div>
```

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/command/footer/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `command-default` | `components/command/default/` | |
| `command-shortcuts` | `components/command/shortcuts/` | |
| `command-files` | `components/command/files/` | |
| `command-people` | `components/command/people/` | |
| `command-actions` | `components/command/actions/` | |
| `command-settings` | `components/command/settings/` | |
| `command-filter-tabs` | `components/command/filter-tabs/` | |
| `command-footer` | `components/command/footer/` | （本条） |
