# 纵向标签页

> 状态：preview · slug：`tabs-vertical` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「纵向标签页」（`tabs-vertical`）。标签在左侧纵向排列，适合设置类侧栏分区。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-tabs；position="left"；标题用 #title 配图标（对齐由 .arco-tabs-tab-title flex 保证）
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：左侧标签轨 + 右侧内容；标签带图标
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-tabs v-model:active-key="activeTabVertical" position="left" style="min-height:160px">
  <a-tab-pane key="profile">
    <template #title><icon-user></icon-user>资料</template>
    展示个人资料表单。
  </a-tab-pane>
  <a-tab-pane key="notify">
    <template #title><icon-notification></icon-notification>通知</template>
    展示通知偏好开关。
  </a-tab-pane>
  <a-tab-pane key="privacy">
    <template #title><icon-safe></icon-safe>隐私</template>
    展示隐私与可见性设置。
  </a-tab-pane>
</a-tabs>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/tabs/vertical/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `tabs-default` | `components/tabs/default/` | |
| `tabs-capsule` | `components/tabs/capsule/` | |
| `tabs-line` | `components/tabs/line/` | |
| `tabs-card` | `components/tabs/card/` | |
| `tabs-vertical` | `components/tabs/vertical/` | （本条） |
