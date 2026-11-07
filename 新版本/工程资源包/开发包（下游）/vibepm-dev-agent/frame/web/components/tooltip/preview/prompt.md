# 产品预览提示

> 状态：preview · slug：`tooltip-preview` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「产品预览提示」（`tooltip-preview`）。悬停展示缩略图 + 标题 + 一行说明，适合商品或素材轻预览。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将母版 `components.css` 中 `.wa-tooltip-preview*` / `.wa-tooltip-preview-popup` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-tooltip；`content-class="wa-tooltip-preview-popup"`；content 槽内图 + 标题 + 说明；触发器用 outline 按钮
- 禁止外链 CDN 图片；母版示例图真源 `assets/images/`；落地换成业务图 URL
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：中性触发；预览宽约 240px；16:9 图圆角 6px；标题加粗、说明弱化
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-tooltip content-class="wa-tooltip-preview-popup">
  <template #content>
    <div class="wa-tooltip-preview">
      <img
        class="wa-tooltip-preview__img"
        src="assets/images/image_01.jpg"
        width="240"
        height="135"
        alt="产品预览"
      />
      <p class="wa-tooltip-preview__title">产品预览</p>
      <p class="wa-tooltip-preview__desc">查看完整产品详情与规格说明</p>
    </div>
  </template>
  <a-button type="secondary">产品预览</a-button>
</a-tooltip>
```

> 换文案：只改汉字，勿改 class / type。落地时把 `src` 换成业务图。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 图片非外链 CDN

## 7. 预览

`components/tooltip/preview/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| tooltip-default | components/tooltip/default/ | 
| tooltip-bottom | components/tooltip/bottom/ | 
| tooltip-left | components/tooltip/left/ | 
| tooltip-right | components/tooltip/right/ | 
| tooltip-no-icon | components/tooltip/no-icon/ | 
| tooltip-no-arrow | components/tooltip/no-arrow/ | 
| tooltip-icon | components/tooltip/icon/ | 
| tooltip-with-title | components/tooltip/with-title/ | 
| tooltip-stats | components/tooltip/stats/ | 
| tooltip-preview | components/tooltip/preview/ | （本条）
