# 预览内容对话框

> 状态：preview · slug：`modal-content-preview` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「预览内容对话框」（`modal-content-preview`）。带标题栏的内容容器，主体为**静态**图片展示与规格说明（非看图层）。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-modal` + `a-image`；须带 `modal-class="pro-content-modal"`；`:preview="false"`，**禁止**点图再开 Image 看图层；要直接看图层用独立组件 `image-preview`
- `:footer="false"`，仅标题栏关闭
- 禁止外链 CDN 图

## 4. 视觉规格

- 布局 / 层级 / 强调：560 宽；静态大图 + 规格说明文案；无页脚；图不可点进预览层
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-button type="secondary" @click="visible = true">打开示例</a-button>
<a-modal
  v-model:visible="visible"
  title="封面信息"
  title-align="start"
  :width="560"
  unmount-on-close
  :footer="false"
  modal-class="pro-content-modal"
  @cancel="visible = false"
>
  <div class="mc-body mc-preview">
    <a-image :src="imgSrc" alt="封面图" :preview="false"></a-image>
    <p class="mc-lead">活动封面 · 1280×720 · PNG · 约 420KB</p>
  </div>
</a-modal>
```

> 换文案：只改汉字，勿改 class / type。点图放大看图层 → 用 `image-preview`，勿改本条 `:preview`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 点图不打开黑底看图层；无底部按钮

## 7. 预览

`components/modal-content/preview/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `modal-content-list` | `components/modal-content/list/` |  |
| `modal-content-form` | `components/modal-content/form/` |  |
| `modal-content-import` | `components/modal-content/import/` |  |
| `modal-content-export` | `components/modal-content/export/` |  |
| `modal-content-detail` | `components/modal-content/detail/` |  |
| `modal-content-steps` | `components/modal-content/steps/` |  |
| `modal-content-preview` | `components/modal-content/preview/` | （本条） |
| `modal-content-avatar-crop` | `components/modal-content/avatar-crop/` |  |
