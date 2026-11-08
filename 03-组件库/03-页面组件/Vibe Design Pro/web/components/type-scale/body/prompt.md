# 正文字号

> 状态：preview · slug：`type-scale-body` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「正文字号」（`type-scale-body`）。正文与次要正文，对应 font-size-body-3/2/1（默认 14px）。

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

- font-size-body-3/2/1：14 / 13 / 12px
- 字重 400；行高约 1.5715
- 默认正文 14px（body-3）
- 颜色：`--color-text-1` / `--color-text-3`（辅文）

## 5. 直接粘贴

```html
<div class="wa-type-scale">
  <div class="wa-type-scale__row">
    <span class="wa-type-scale__meta">BODY-3 · 14px</span>
    <p class="wa-type-scale__sample wa-type-scale--body-3">正文用于说明内容与表单提示，默认 14px。</p>
  </div>
  <div class="wa-type-scale__row">
    <span class="wa-type-scale__meta">BODY-2 · 13px</span>
    <p class="wa-type-scale__sample wa-type-scale--body-2">小号正文用于次级说明与列表辅线。</p>
  </div>
  <div class="wa-type-scale__row">
    <span class="wa-type-scale__meta">BODY-1 · 12px</span>
    <p class="wa-type-scale__sample wa-type-scale--body-1">辅助正文用于紧凑信息与次要文案。</p>
  </div>
</div>
```

> 换文案：只改汉字，勿改 class。须一并落地家族 `component.css` 中对应 `.wa-type-scale*` 规则。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/type-scale/body/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `type-scale-display` | `components/type-scale/display/` | |
| `type-scale-title` | `components/type-scale/title/` | |
| `type-scale-body` | `components/type-scale/body/` | （本条） |
| `type-scale-caption` | `components/type-scale/caption/` | |
