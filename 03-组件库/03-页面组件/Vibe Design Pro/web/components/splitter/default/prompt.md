# 分割面板

> 状态：preview · slug：`splitter-default` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「分割面板」（`splitter-default`）。左右可拖分割，用于对照预览与双栏工作区。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有家族 `component.css`，将 `.wa-split-pane*` 规则**并入**宿主页/模块 CSS；**禁止**写死 `<link …/component.css>`。
- **脚本落地**：把 `size` 的 ref / v-model **并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-split；比例须 v-model:size
- 预览壳勿进 §5

## 4. 视觉规格

- 可拖分隔线的双栏面板
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-split v-model:size="size" style="height:180px;width:100%">
  <template #first>
    <div class="wa-split-pane">左侧面板</div>
  </template>
  <template #second>
    <div class="wa-split-pane">右侧面板</div>
  </template>
</a-split>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/splitter/default/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `splitter-default` | `components/splitter/default/` | （本条） |
| `splitter-vertical` | `components/splitter/vertical/` | |
| `splitter-resize-box` | `components/splitter/resize-box/` | |
