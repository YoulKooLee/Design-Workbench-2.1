# 卡片走马灯

> 状态：preview · slug：`carousel-card` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「卡片走马灯」（`carousel-card`）。卡片透视切换，两侧可见前后页。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/carousel/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-carousel；`animation-name="card"`（勿写 card-default）；`show-arrow="hover"`
- 私有样式真源在 `components/carousel/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- 禁止外链 CDN 图片；示例用渐变色块即可

## 4. 视觉规格

- 布局 / 层级 / 强调：3D 卡片层叠；悬停出箭头；宽度跟随容器（勿写死 320px）
- 动效：轮播切换；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）；示例渐变可保留

## 5. 直接粘贴

```html
<a-carousel class="wa-carousel wa-carousel--card" animation-name="card" show-arrow="hover">
  <a-carousel-item>
    <div class="wa-carousel-slide wa-carousel-slide--1">
      <span>产品发布</span>
      <span class="wa-carousel-slide__sub">全新版本已上线</span>
    </div>
  </a-carousel-item>
  <a-carousel-item>
    <div class="wa-carousel-slide wa-carousel-slide--2">
      <span>客户案例</span>
      <span class="wa-carousel-slide__sub">增长团队真实反馈</span>
    </div>
  </a-carousel-item>
  <a-carousel-item>
    <div class="wa-carousel-slide wa-carousel-slide--3">
      <span>设计系统</span>
      <span class="wa-carousel-slide__sub">组件与规范同步</span>
    </div>
  </a-carousel-item>
  <a-carousel-item>
    <div class="wa-carousel-slide wa-carousel-slide--4">
      <span>活动报名</span>
      <span class="wa-carousel-slide__sub">限时早鸟通道开启</span>
    </div>
  </a-carousel-item>
  <a-carousel-item>
    <div class="wa-carousel-slide wa-carousel-slide--5">
      <span>更新日志</span>
      <span class="wa-carousel-slide__sub">本周能力速览</span>
    </div>
  </a-carousel-item>
</a-carousel>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/carousel/card/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `carousel-default` | `components/carousel/default/` | |
| `carousel-autoplay` | `components/carousel/autoplay/` | |
| `carousel-card` | `components/carousel/card/` | （本条） |
| `carousel-fade` | `components/carousel/fade/` | |
| `carousel-vertical` | `components/carousel/vertical/` | |
| `carousel-line` | `components/carousel/line/` | |
