# 辅文字号

> 状态：preview · slug：`type-scale-caption` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「辅文字号」（`type-scale-caption`）。水印、标签与辅助说明，对应 font-size-caption（12px）。

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

- font-size-caption：12px
- 字重 400；颜色偏次要文本
- 用于水印、标签辅文、极次要说明
- 颜色：`--color-text-1` / `--color-text-3`（辅文）

## 5. 直接粘贴

```html
<div class="wa-type-scale">
  <div class="wa-type-scale__row">
    <span class="wa-type-scale__meta">CAPTION · 12px</span>
    <p class="wa-type-scale__sample wa-type-scale--caption">TAB · CAPS 标签 · 水印与辅助说明</p>
  </div>
</div>
```

> 换文案：只改汉字，勿改 class。须一并落地家族 `component.css` 中对应 `.wa-type-scale*` 规则。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/type-scale/caption/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `type-scale-display` | `components/type-scale/display/` | |
| `type-scale-title` | `components/type-scale/title/` | |
| `type-scale-body` | `components/type-scale/body/` | |
| `type-scale-caption` | `components/type-scale/caption/` | （本条） |
