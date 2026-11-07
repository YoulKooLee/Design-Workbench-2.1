# 反馈气泡

> 状态：preview · slug：`popover-feedback` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「反馈气泡」（`popover-feedback`）。展开多行输入与发送按钮，用于就地收集产品意见。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将母版 `components.css` 中 Popover / `.wa-popover-*` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把 `feedbackText` / `sendFeedback` / 开关状态 **并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-popover；`trigger="click"`；`a-textarea` + 发送后关闭
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：标题「反馈」；多行输入占满宽度；主按钮右对齐
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-popover title="反馈" trigger="click" content-class="wa-popover-panel wa-popover-panel--lg" :popup-visible="feedbackOpen" @popup-visible-change="onFeedbackVisible">
  <a-button type="secondary">反馈</a-button>
  <template #content>
    <div class="wa-popover-feedback">
      <a-textarea
        v-model="feedbackText"
        placeholder="告诉我们哪里可以改进…"
        :auto-size="{ minRows: 3, maxRows: 5 }"
      ></a-textarea>
      <div class="wa-popover-feedback__actions">
        <a-button type="primary" size="small" :disabled="!feedbackText.trim()" @click="sendFeedback">发送反馈</a-button>
      </div>
    </div>
  </template>
</a-popover>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 空内容时发送禁用；发送后关闭气泡

## 7. 预览

`components/popover/feedback/index.html`

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
| `popover-feedback` | `components/popover/feedback/` | （本条）|
| `popover-profile` | `components/popover/profile/` | |
