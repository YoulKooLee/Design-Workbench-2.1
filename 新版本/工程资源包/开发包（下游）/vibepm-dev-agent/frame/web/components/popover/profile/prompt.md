# 资料卡片气泡

> 状态：preview · slug：`popover-profile` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「资料卡片气泡」（`popover-profile`）。头像触发器展开资料卡：头像+姓名邮箱、简介、查看资料 / 发消息胶囊按钮。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将母版 `components.css` 中 Popover / `.wa-popover-profile*` / `.wa-popover-panel--profile` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-popover；`trigger="click"`；面板内含头像行 + 简介 + 双胶囊按钮；发消息带纸飞机图标
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：头像灰底缩写；姓名加粗、邮箱弱化；简介正文；「查看资料」描边胶囊、「发消息」主色胶囊+图标
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token；面板圆角 `--wa-radius-lg`

## 5. 直接粘贴

```html
<a-popover trigger="click" content-class="wa-popover-panel wa-popover-panel--profile">
  <a-button type="text" class="wa-popover-profile__trigger">
    <a-avatar :size="32" class="wa-popover-profile__avatar">PJ</a-avatar>
    <span class="wa-popover-profile__trigger-who">
      <span class="wa-popover-profile__trigger-name">陈晓</span>
      <span class="wa-popover-profile__trigger-handle">@chenxiao</span>
    </span>
  </a-button>
  <template #content>
    <div class="wa-popover-profile">
      <div class="wa-popover-profile__head">
        <a-avatar :size="40" class="wa-popover-profile__avatar">PJ</a-avatar>
        <div class="wa-popover-profile__meta">
          <p class="wa-popover-profile__name">陈晓</p>
          <p class="wa-popover-profile__email">chenxiao@example.com</p>
        </div>
      </div>
      <p class="wa-popover-profile__bio">产品设计师，专注界面设计、无障碍与设计系统，追求像素级的落地效果。</p>
      <div class="wa-popover-profile__actions">
        <a-button type="secondary" shape="round">查看资料</a-button>
        <a-button type="primary" shape="round" class="wa-popover-profile__msg">
          <template #icon><i class="fa-light fa-paper-plane" aria-hidden="true"></i></template>
          发消息
        </a-button>
      </div>
    </div>
  </template>
</a-popover>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 面板含头像行、简介与双胶囊按钮；发消息带纸飞机图标

## 7. 预览

`components/popover/profile/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `popover-default` | `components/popover/default/` | |
| `popover-bottom` | `components/popover/bottom/` | |
| `popover-left` | `components/popover/left/` | |
| `popover-right` | `components/popover/right/` | |
| `popover-form` | `components/popover/form/` | |
| `popover-notifications` | `components/popover/notifications/` | |
| `popover-tips` | `components/popover/tips/` | |
| `popover-share` | `components/popover/share/` | |
| `popover-feedback` | `components/popover/feedback/` | |
| `popover-profile` | `components/popover/profile/` | （本条）|
