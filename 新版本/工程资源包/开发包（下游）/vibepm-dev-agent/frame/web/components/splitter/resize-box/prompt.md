# 可调宽面板

> 状态：preview · slug：`splitter-resize-box` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「可调宽面板」（`splitter-resize-box`）。可拖拽调整宽度的内容面板，用于左右对照与工具边栏。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有家族 `component.css`，将规则**并入**宿主页/模块 CSS；**禁止**写死 `<link …/component.css>`。
- **脚本落地**：把 `width` / `resizeHost` / `onResizeWidth` **并入**宿主页 `js/<page>.js`（见下方脚本）；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-resize-box；宽度须受控（`:width` + `@update:width`），并 **clamp 在容器内**（≥160px 且 ≤宿主 `clientWidth`）
- 预览壳勿进 §5

## 4. 视觉规格

- 可拖右缘调宽；拖动不超出父容器
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-resize-host" ref="resizeHost" style="width:100%;max-width:100%">
  <a-resize-box
    :width="width"
    :directions="['right']"
    style="min-height:140px;padding:12px;max-width:100%;min-width:160px"
    @update:width="onResizeWidth"
  >
    <p>可拖右缘调宽（约 {{ Math.round(width) }}px）</p>
  </a-resize-box>
</div>
```

脚本（并入宿主页）：

```js
const MIN_W = 160
const width = ref(220)
const resizeHost = ref(null)
function onResizeWidth(w) {
  const host = resizeHost.value
  const max = host && host.clientWidth ? host.clientWidth : w
  width.value = Math.min(Math.max(Math.round(w), MIN_W), max)
}
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 拖宽不低于 160px、不超过宿主容器宽度
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/splitter/resize-box/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `splitter-default` | `components/splitter/default/` | |
| `splitter-vertical` | `components/splitter/vertical/` | |
| `splitter-resize-box` | `components/splitter/resize-box/` | （本条） |
