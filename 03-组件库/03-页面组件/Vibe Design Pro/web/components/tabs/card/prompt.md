# 卡片标签页

> 状态：preview · slug：`tabs-card` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「卡片标签页」（`tabs-card`）。卡片式标签头，适合分区对比与配置页。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-tabs type="card"；标题用 #title 配图标（对齐由 .arco-tabs-tab-title flex 保证）
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：卡片标签头与内容区 1px 描边衔接；内容区内边距 16px；标签带图标
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-tabs class="wa-tabs-card" v-model:active-key="activeTabCard" type="card">
  <a-tab-pane key="overview">
    <template #title><icon-apps></icon-apps>概览</template>
    卡片标签下的概览面板。
  </a-tab-pane>
  <a-tab-pane key="billing">
    <template #title><icon-credit-card></icon-credit-card>账单</template>
    卡片标签下的账单面板。
  </a-tab-pane>
  <a-tab-pane key="security">
    <template #title><icon-safe></icon-safe>安全</template>
    卡片标签下的安全面板。
  </a-tab-pane>
</a-tabs>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/tabs/card/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `tabs-default` | `components/tabs/default/` | |
| `tabs-capsule` | `components/tabs/capsule/` | |
| `tabs-line` | `components/tabs/line/` | |
| `tabs-card` | `components/tabs/card/` | （本条） |
| `tabs-vertical` | `components/tabs/vertical/` | |
