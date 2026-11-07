# 展示字号

> 状态：preview · slug：`type-scale-display` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「展示字号」（`type-scale-display`）。运营标题与 Hero 大字，对应 font-size-display-1/2/3。

成功标准：业务页出现与 §5 一致的字号层级片段（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主排版。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/type-scale/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：静态字号样例（非可编辑控件）
- 私有样式真源在家族 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式

## 4. 视觉规格

- font-size-display-3/2/1：56 / 48 / 36px
- 字重约 600；行高约 1.2–1.23
- 用于运营大标题、Hero
- 颜色：`--color-text-1` / `--color-text-3`（辅文）

## 5. 直接粘贴

```html
<div class="wa-type-scale">
  <div class="wa-type-scale__row">
    <span class="wa-type-scale__meta">DISPLAY-3 · 56px</span>
    <p class="wa-type-scale__sample wa-type-scale--display-3">把想法做成可交付原型</p>
  </div>
  <div class="wa-type-scale__row">
    <span class="wa-type-scale__meta">DISPLAY-2 · 48px</span>
    <p class="wa-type-scale__sample wa-type-scale--display-2">把想法做成可交付原型</p>
  </div>
  <div class="wa-type-scale__row">
    <span class="wa-type-scale__meta">DISPLAY-1 · 36px</span>
    <p class="wa-type-scale__sample wa-type-scale--display-1">把想法做成可交付原型</p>
  </div>
</div>
```

> 换文案：只改汉字，勿改 class。须一并落地家族 `component.css` 中对应 `.wa-type-scale*` 规则。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/type-scale/display/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `type-scale-display` | `components/type-scale/display/` | （本条） |
| `type-scale-title` | `components/type-scale/title/` | |
| `type-scale-body` | `components/type-scale/body/` | |
| `type-scale-caption` | `components/type-scale/caption/` | |
