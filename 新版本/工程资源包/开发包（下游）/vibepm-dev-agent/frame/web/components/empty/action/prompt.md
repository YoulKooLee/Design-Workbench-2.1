# 带操作空状态

> 状态：preview · slug：`empty-action` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「带操作空状态」（`empty-action`）。图标砖 + 标题说明 + 主/次操作，用于首次创建引导。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：家族 `component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-empty；媒体用 `.wa-empty__media--icon` + `icon-folder`；默认槽放标题/说明/双按钮
- 外壳 `.wa-empty--border` 虚线描边；勿与 `#description` 并用
- 私有样式真源在家族 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：虚线描边壳 + 图标砖 + 双按钮
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-empty wa-empty--border">
  <a-empty>
    <template #image>
      <span class="wa-empty__media wa-empty__media--icon"><icon-folder :size="28"></icon-folder></span>
    </template>
    <div class="wa-empty__body">
      <div class="wa-empty__title">还没有任何项目</div>
      <p class="wa-empty__desc">创建你的第一个项目开始吧。</p>
      <a-space class="wa-empty__actions" :size="8">
        <a-button type="primary" size="small">新建项目</a-button>
        <a-button type="secondary" size="small">导入项目</a-button>
      </a-space>
    </div>
  </a-empty>
</div>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/empty/action/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `empty-default` | `components/empty/default/` | |
| `empty-message` | `components/empty/message/` | |
| `empty-avatars` | `components/empty/avatars/` | |
| `empty-icon` | `components/empty/icon/` | |
| `empty-action` | `components/empty/action/` | （本条） |
| `empty-outline` | `components/empty/outline/` | |
