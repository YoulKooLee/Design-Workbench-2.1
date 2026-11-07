# 通知气泡

> 状态：preview · slug：`popover-notifications` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「通知气泡」（`popover-notifications`）。铃铛触发器带未读角标，展开通知列表并可一键已读。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将母版 `components.css` 中 Popover / `.wa-popover-*` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把 `notices` / `unreadCount` / `markAllRead` **并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-popover；`trigger="click"`；触发器为 `a-badge` + `icon-notification`；列表 `.wa-popover-notify`
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：角标未读数；未读圆点主色；已读弱描边；「全部已读」文本按钮
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-popover trigger="click" content-class="wa-popover-panel wa-popover-panel--lg" :popup-visible="notifyOpen" @popup-visible-change="onNotifyVisible">
  <a-badge :count="unreadCount" :dot="false">
    <a-button type="secondary" aria-label="通知">
      <icon-notification></icon-notification>
    </a-button>
  </a-badge>
  <template #content>
    <div class="wa-popover-notify__head">
      <p class="wa-popover-notify__title">通知</p>
      <a-button type="text" size="mini" :disabled="unreadCount === 0" @click="markAllRead">全部已读</a-button>
    </div>
    <ul class="wa-popover-notify">
      <li class="wa-popover-notify__item" v-for="item in notices" :key="item.id">
        <span class="wa-popover-notify__dot" :class="{ 'wa-popover-notify__dot--read': item.read }"></span>
        <div class="wa-popover-notify__body">
          <p class="wa-popover-notify__name">{{ item.title }}</p>
          <p class="wa-popover-notify__meta">{{ item.meta }}</p>
        </div>
      </li>
    </ul>
  </template>
</a-popover>
```

> 换文案：只改汉字，勿改 class / type。`notices` 为 `{ id, title, meta, read }[]`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 角标随未读数变化；全部已读后角标为 0

## 7. 预览

`components/popover/notifications/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `popover-default` | `components/popover/default/` | |
| `popover-bottom` | `components/popover/bottom/` | |
| `popover-left` | `components/popover/left/` | |
| `popover-right` | `components/popover/right/` | |
| `popover-form` | `components/popover/form/` | |
| `popover-notifications` | `components/popover/notifications/` | （本条）|
| `popover-tips` | `components/popover/tips/` | |
| `popover-share` | `components/popover/share/` | |
| `popover-feedback` | `components/popover/feedback/` | |
| `popover-profile` | `components/popover/profile/` | |
