# 错误通知

> 状态：preview · slug：`notification-error` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「错误通知」（`notification-error`）。带标题的失败/错误通知。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。多页共用助手（如 `upload-demo.js`）允许交付内**一份**共享脚本。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：按钮触发 Notification.error
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`（或家族共享助手）；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：中性触发按钮；通知卡片圆角无描边、非实心状态图标
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-button type="secondary" status="danger" @click="showNotification">错误通知</a-button>
<!-- methods: ArcoVue.Notification.error({ title: '操作失败', content: '提交失败，请检查网络后重试。' }) -->
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/notification/error/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| notification-default | components/notification/default/ | 
| notification-success | components/notification/success/ | 
| notification-warning | components/notification/warning/ | 
| notification-error | components/notification/error/ | （本条）
| notification-closable | components/notification/closable/ | 
| notification-no-icon | components/notification/no-icon/ | 

