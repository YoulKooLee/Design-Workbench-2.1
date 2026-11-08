# 封面卡片

> 状态：preview · slug：`card-cover` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「封面卡片」（`card-cover`）。顶部通栏封面图 + 标题摘要与阅读入口，适合博客 / 案例预览。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/card/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-card；`#cover` 用本地质感块（禁 CDN）；`hoverable`；正文标题 / 说明 / 底栏数据 + 阅读链接
- 私有样式真源在 `components/card/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- 禁止外链 CDN 图片；封面用本地质感块或 data URI
- Vue 模板内自定义标签勿写成自闭合（如 `</a-card-meta>`、`</a-avatar>`）

## 4. 视觉规格

- 布局 / 层级 / 强调：顶图满宽；角标；正文标题 + 两行说明；底栏左浏览/收藏数据、右阅读链接
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `components/surface-fx`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-card class="wa-acard wa-acard--shadow wa-acard--cover" hoverable style="width:320px">
  <template #cover>
    <div class="wa-acard-cover wa-acard-cover--blog" role="img" aria-label="文章封面">
      <span class="wa-acard-cover__badge">设计</span>
    </div>
  </template>
  <h3 class="wa-acard-cover__title">如何做出惊艳的渐变背景</h3>
  <p class="wa-acard-cover__desc">用简单 CSS 混合色彩与动态纹理，提升落地页氛围与品牌识别。</p>
  <div class="wa-acard-cover__foot">
    <div class="wa-acard-cover__stats">
      <span class="wa-acard-cover__stat"><icon-eye></icon-eye> 1.2k</span>
      <span class="wa-acard-cover__stat"><icon-star></icon-star> 345</span>
    </div>
    <a class="wa-acard-cover__link" href="javascript:;">阅读更多 <icon-right></icon-right></a>
  </div>
</a-card>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/card/cover/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `card-default` | `components/card/default/` | |
| `card-hoverable` | `components/card/hoverable/` | |
| `card-shadow` | `components/card/shadow/` | |
| `card-bordered` | `components/card/bordered/` | |
| `card-actions` | `components/card/actions/` | |
| `card-footer` | `components/card/footer/` | |
| `card-extra` | `components/card/extra/` | |
| `card-tabs` | `components/card/tabs/` | |
| `card-cta` | `components/card/cta/` | |
| `card-dark` | `components/card/dark/` | |
| `card-form` | `components/card/form/` | |
| `card-cover` | `components/card/cover/` |  （本条） |
