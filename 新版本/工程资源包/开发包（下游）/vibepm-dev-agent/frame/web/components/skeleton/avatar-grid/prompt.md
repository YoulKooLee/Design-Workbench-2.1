# 头像网格骨架

> 状态：preview · slug：`skeleton-avatar-grid` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「头像网格骨架」（`skeleton-avatar-grid`）。标题条加多行圆形占位，用于团队成员或应用图标。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将同目录 `component.css`（或家族 `demo.css`）中的 `.wa-skel*` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-skeleton shape circle 网格
- 若有私有样式：规则真源在同目录 `component.css` / 家族 `demo.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：标题 + 两行圆形；尽量贴近真实内容尺寸，避免加载后布局跳动
- 动效：骨架 animation；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-skeleton animation>
  <div class="wa-skel wa-skel-grid" aria-busy="true">
    <div class="wa-skel-grid__title">
      <a-skeleton-line :rows="1" :widths="['100%']" :line-height="16"></a-skeleton-line>
    </div>
    <div class="wa-skel-grid__row">
      <a-skeleton-shape v-for="n in 4" :key="'a'+n" shape="circle" size="large"></a-skeleton-shape>
    </div>
    <div class="wa-skel-grid__row">
      <a-skeleton-shape v-for="n in 4" :key="'b'+n" shape="circle" size="large"></a-skeleton-shape>
    </div>
    <span class="sr-only">加载中</span>
  </div>
</a-skeleton>
```

> 换文案：只改 `sr-only` 等汉字；布局 class / 尺寸跟真实内容对齐。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 占位轮廓接近真实内容，无明显布局跳动

## 7. 预览

`components/skeleton/avatar-grid/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `skeleton-avatar` | `components/skeleton/avatar/` |  |
| `skeleton-card` | `components/skeleton/card/` |  |
| `skeleton-card-image` | `components/skeleton/card-image/` |  |
| `skeleton-list` | `components/skeleton/list/` |  |
| `skeleton-avatar-grid` | `components/skeleton/avatar-grid/` | （本条） |
| `skeleton-paragraphs` | `components/skeleton/paragraphs/` |  |
