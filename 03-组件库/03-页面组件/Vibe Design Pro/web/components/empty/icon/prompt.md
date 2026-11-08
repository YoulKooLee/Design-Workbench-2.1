# 无结果空状态

> 状态：preview · slug：`empty-icon` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「无结果空状态」（`empty-icon`）。紧凑收件箱图标砖 + 标题 + 清除筛选，适合小面板与筛选无结果。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：家族 `component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-empty；紧凑壳 `.wa-empty--compact`；媒体砖内 `icon-empty`；底部 outline「清除筛选」
- 私有样式真源在家族 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：紧凑收件箱图标砖 + 短标题 + 操作按钮
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-empty wa-empty--compact">
  <a-empty>
    <template #image>
      <span class="wa-empty__media wa-empty__media--icon"><icon-empty :size="28"></icon-empty></span>
    </template>
    <div class="wa-empty__body">
      <div class="wa-empty__title">未找到相关项</div>
      <a-button class="wa-empty__actions" type="secondary" size="small">清除筛选</a-button>
    </div>
  </a-empty>
</div>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/empty/icon/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `empty-default` | `components/empty/default/` | |
| `empty-message` | `components/empty/message/` | |
| `empty-avatars` | `components/empty/avatars/` | |
| `empty-icon` | `components/empty/icon/` | （本条） |
| `empty-action` | `components/empty/action/` | |
| `empty-outline` | `components/empty/outline/` | |
