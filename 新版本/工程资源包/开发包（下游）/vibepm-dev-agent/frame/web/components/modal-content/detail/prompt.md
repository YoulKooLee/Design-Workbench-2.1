# 详情内容对话框

> 状态：preview · slug：`modal-content-detail` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「详情内容对话框」（`modal-content-detail`）。带标题栏的内容容器，主体为只读上下字段。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将 `components/typography/meta/component.css`（`.wa-typo-meta*`）规则**并入**宿主页/模块 CSS；**禁止**在交付里写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-modal` + `typography-meta`（`.wa-typo-meta`）；须带 `modal-class="pro-content-modal"`；`:footer="false"`，仅标题栏关闭，勿再放底部按钮
- 勿用 `a-descriptions` 边框表格冒充本形态

## 4. 视觉规格

- 布局 / 层级 / 强调：560 宽；上标签下值栅格横排；无页脚
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-button type="secondary" @click="visible = true">打开示例</a-button>
<a-modal
  v-model:visible="visible"
  title="工单详情"
  title-align="start"
  :width="560"
  unmount-on-close
  :footer="false"
  modal-class="pro-content-modal"
  @cancel="visible = false"
>
  <div class="mc-body">
    <div class="wa-typo-meta">
      <div class="wa-typo-meta__item">
        <span class="wa-typo-meta__label">工单编号</span>
        <span class="wa-typo-meta__value">TK-889204</span>
      </div>
      <div class="wa-typo-meta__item">
        <span class="wa-typo-meta__label">优先级</span>
        <span class="wa-typo-meta__value">高</span>
      </div>
      <div class="wa-typo-meta__item">
        <span class="wa-typo-meta__label">处理人</span>
        <span class="wa-typo-meta__value">周明远</span>
      </div>
      <div class="wa-typo-meta__item">
        <span class="wa-typo-meta__label">所属产品</span>
        <span class="wa-typo-meta__value">履约中台</span>
      </div>
      <div class="wa-typo-meta__item">
        <span class="wa-typo-meta__label">创建时间</span>
        <span class="wa-typo-meta__value">2026-05-08 10:16</span>
      </div>
      <div class="wa-typo-meta__item">
        <span class="wa-typo-meta__label">当前状态</span>
        <span class="wa-typo-meta__value">处理中</span>
      </div>
      <div class="wa-typo-meta__item">
        <span class="wa-typo-meta__label">来源渠道</span>
        <span class="wa-typo-meta__value">客户门户</span>
      </div>
      <div class="wa-typo-meta__item">
        <span class="wa-typo-meta__label">影响范围</span>
        <span class="wa-typo-meta__value">华东门店</span>
      </div>
      <div class="wa-typo-meta__item">
        <span class="wa-typo-meta__label">预计完成</span>
        <span class="wa-typo-meta__value">2026-05-12</span>
      </div>
      <div class="wa-typo-meta__item">
        <span class="wa-typo-meta__label">关联订单</span>
        <span class="wa-typo-meta__value">SO-552018</span>
      </div>
      <div class="wa-typo-meta__item">
        <span class="wa-typo-meta__label">联系人</span>
        <span class="wa-typo-meta__value">陈思远</span>
      </div>
      <div class="wa-typo-meta__item">
        <span class="wa-typo-meta__label">联系电话</span>
        <span class="wa-typo-meta__value">138****6201</span>
      </div>
    </div>
  </div>
</a-modal>
```

> 换文案：只改汉字，勿改 class / type。须并入 `typography/meta` 的 `.wa-typo-meta*` 样式。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 无底部按钮；主体为 `.wa-typo-meta`，非 `a-descriptions`

## 7. 预览

`components/modal-content/detail/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `modal-content-list` | `components/modal-content/list/` |  |
| `modal-content-form` | `components/modal-content/form/` |  |
| `modal-content-import` | `components/modal-content/import/` |  |
| `modal-content-export` | `components/modal-content/export/` |  |
| `modal-content-detail` | `components/modal-content/detail/` | （本条） |
| `modal-content-steps` | `components/modal-content/steps/` |  |
| `modal-content-preview` | `components/modal-content/preview/` |  |
| `modal-content-avatar-crop` | `components/modal-content/avatar-crop/` |  |
