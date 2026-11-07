# 横向滚动

> 状态：preview · slug：`scrollbar-horizontal` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「横向滚动」（`scrollbar-horizontal`）。定宽容器内横向滑动，用于画廊、标签行与卡片横滑。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有家族 `component.css`，将 `.wa-sb-h` / `.wa-sb-track` / `.wa-sb-card*` 规则**并入**宿主页/模块 CSS；**禁止**写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-scrollbar；`type="embed"` 悬停显条；宽度锁在 **outer-style** + 祖先 `min-width:0`（防 grid 子项被内容撑开）
- `:disable-vertical="true"`；轨道 `width:max-content` 超出可视宽
- 条目用默认卡片（`a-card.wa-acard`：标题 + 正文），勿用封面色块冒充卡片
- 容器浅灰底（`--color-fill-2`）
- 预览壳勿进 §5

## 4. 视觉规格

- 定宽横滑；条目为默认卡片（圆角 / 软阴影 / 标题加粗）；容器浅灰底
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-scrollbar
  type="embed"
  :disable-vertical="true"
  outer-class="wa-sb-h"
  :outer-style="{ width: '100%', maxWidth: '100%', height: '150px' }"
  style="height:100%;width:100%;overflow:auto"
>
  <div class="wa-sb-track">
    <a-card
      v-for="n in 10"
      :key="n"
      class="wa-sb-card wa-acard"
      :title="'卡片标题 ' + n"
    >
      <p class="wa-acard-desc">这里是卡片主体内容说明。</p>
    </a-card>
  </div>
</a-scrollbar>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 容器不被内容撑宽，悬停出现细横向滚动条（无轨道底）
- [ ] 条目为真 a-card，无封面色块
- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/scrollbar/horizontal/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `scrollbar-vertical` | `components/scrollbar/vertical/` | |
| `scrollbar-horizontal` | `components/scrollbar/horizontal/` | （本条） |
