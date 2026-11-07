# 描边空状态

> 状态：preview · slug：`empty-outline` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「描边空状态」（`empty-outline`）。虚线描边壳 + 云盘插画语义图标 + 上传引导。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：家族 `component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-empty；外壳 `.wa-empty--border`；媒体 `icon-cloud`；主按钮带 `icon-upload`
- 私有样式真源在家族 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：虚线描边 + 云图标 + 上传 CTA
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-empty wa-empty--border">
  <a-empty>
    <template #image>
      <span class="wa-empty__media"><icon-cloud :size="48"></icon-cloud></span>
    </template>
    <div class="wa-empty__body">
      <div class="wa-empty__title">云盘还是空的</div>
      <p class="wa-empty__desc">上传文件到云盘，随时随地访问。</p>
      <a-button class="wa-empty__actions" type="primary" size="small">
        <template #icon><icon-upload></icon-upload></template>
        上传文件
      </a-button>
    </div>
  </a-empty>
</div>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/empty/outline/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `empty-default` | `components/empty/default/` | |
| `empty-message` | `components/empty/message/` | |
| `empty-avatars` | `components/empty/avatars/` | |
| `empty-icon` | `components/empty/icon/` | |
| `empty-action` | `components/empty/action/` | |
| `empty-outline` | `components/empty/outline/` | （本条） |
