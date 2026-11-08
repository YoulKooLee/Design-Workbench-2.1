# 悬停抬起

> 状态：preview · slug：`surface-fx-lift` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「悬停抬起」（`surface-fx-lift`）。在卡片或区块宿主上挂 `.wa-lift`，悬停呈现表面装饰。不是卡片控件本身。

成功标准：业务页宿主加 class 后悬停出现约定动效。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。
- **样式落地**：将家族 `components/surface-fx/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- 纯 CSS，无需额外脚本

## 3. 约束

- **本提示词只含这一种形态**
- 宿主：`.wa-lift` 可挂 `a-card` / `section` 等；可与 `.wa-acard`、`hoverable`、阴影态组合
- 私有样式真源在 `components/surface-fx/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- 禁止外链 CDN

## 4. 视觉规格

- 布局 / 层级 / 强调：表面修饰，不改变卡片信息结构
- 动效：本条即表面装饰；色走 `--wa-color-primary`；遵守 `prefers-reduced-motion`
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

卡片：

```html
<a-card class="wa-acard wa-lift" style="width:320px">
  <h3 class="wa-acard-title">悬停抬起</h3>
  <p class="wa-acard-desc">悬停上移并加强阴影，不跟鼠标。</p>
</a-card>
```

区块：

```html
<section class="wa-lift">…</section>
```

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 遵守 `prefers-reduced-motion`

## 7. 预览

`components/surface-fx/lift/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `surface-fx-spotlight` | `components/surface-fx/spotlight/` |  |
| `surface-fx-shine` | `components/surface-fx/shine/` |  |
| `surface-fx-border-flow` | `components/surface-fx/border-flow/` |  |
| `surface-fx-lift` | `components/surface-fx/lift/` | （本条） |
