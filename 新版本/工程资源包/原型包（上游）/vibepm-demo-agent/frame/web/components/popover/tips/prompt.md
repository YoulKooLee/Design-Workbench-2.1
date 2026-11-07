# 分步引导气泡

> 状态：preview · slug：`popover-tips` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「分步引导气泡」（`popover-tips`）。在触发器上方展开分步说明，含步骤计数与下一步 / 重新开始。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将母版 `components.css` 中 Popover / `.wa-popover-*` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把 `tipStep` / `tipTexts` / `nextTip` / `restartTips` **并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-popover；`trigger="click"`；`position="top"`；正文 `.wa-popover-tips`
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：步骤弱化文案；正文主色；末步显示「重新开始」
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-popover trigger="click" position="top" content-class="wa-popover-panel wa-popover-panel--sm" :popup-visible="tipsOpen" @popup-visible-change="onTipsVisible">
  <a-button type="secondary">分步提示</a-button>
  <template #content>
    <div class="wa-popover-tips">
      <p class="wa-popover-tips__step">第 {{ tipStep }} / {{ tipTotal }} 步</p>
      <p class="wa-popover-tips__text">{{ tipTexts[tipStep - 1] }}</p>
      <div class="wa-popover-tips__foot">
        <a-button v-if="tipStep === tipTotal" type="text" size="mini" @click="restartTips">重新开始</a-button>
        <span v-else></span>
        <a-button type="primary" size="mini" @click="nextTip">{{ tipStep === tipTotal ? '完成' : '下一步' }}</a-button>
      </div>
    </div>
  </template>
</a-popover>
```

> 换文案：只改汉字与 `tipTexts` 数组，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 气泡在触发器上方；可走完三步并重新开始

## 7. 预览

`components/popover/tips/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `popover-default` | `components/popover/default/` | |
| `popover-bottom` | `components/popover/bottom/` | |
| `popover-left` | `components/popover/left/` | |
| `popover-right` | `components/popover/right/` | |
| `popover-form` | `components/popover/form/` | |
| `popover-notifications` | `components/popover/notifications/` | |
| `popover-tips` | `components/popover/tips/` | （本条）|
| `popover-share` | `components/popover/share/` | |
| `popover-feedback` | `components/popover/feedback/` | |
| `popover-profile` | `components/popover/profile/` | |
