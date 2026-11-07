# 图标折叠面板

> 状态：preview · slug：`collapse-icon` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「图标折叠面板」（`collapse-icon`）。标题前带圆形图标，便于按主题扫读分区。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-collapse；`:bordered="false"`；`#header` 内放图标+标题；挂 `.wa-collapse-icon`
- 若有私有样式：规则真源在 `components/collapse/component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：无外边框；左侧圆形图标 + 标题；图标无底、保留 `border-3` 描边、无阴影；图标用 FA icon-*；私有样式真源在家族 `component.css`，落地并入宿主 CSS
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-collapse v-model:active-key="activeKey" :bordered="false" expand-icon-position="right" class="wa-collapse-chevron wa-collapse-icon">
  <template #expand-icon="{ active }">
    <icon-up v-if="active" :size="10" style="color: var(--color-text-3)"></icon-up>
    <icon-down v-else :size="10" style="color: var(--color-text-3)"></icon-down>
  </template>
  <a-collapse-item key="1">
    <template #header>
      <div class="wa-collapse-head">
        <span class="wa-collapse-head__icon"><icon-tag></icon-tag></span>
        <span class="wa-collapse-head__title">有哪些定价方案可选？</span>
      </div>
    </template>
    提供免费版、专业版与企业版，可按席位升级；核心能力各档通用，高级协作与专属支持随档位解锁。
  </a-collapse-item>
  <a-collapse-item key="2">
    <template #header>
      <div class="wa-collapse-head">
        <span class="wa-collapse-head__icon"><icon-check-circle></icon-check-circle></span>
        <span class="wa-collapse-head__title">可以随时取消订阅吗？</span>
      </div>
    </template>
    可随时在账户设置中取消。当期已付权益保留至账期结束，不会按天自动退款。
  </a-collapse-item>
  <a-collapse-item key="3">
    <template #header>
      <div class="wa-collapse-head">
        <span class="wa-collapse-head__icon"><icon-credit-card></icon-credit-card></span>
        <span class="wa-collapse-head__title">支持哪些支付方式？</span>
      </div>
    </template>
    支持支付宝、微信支付与主流信用卡；企业版可申请对公转账与发票。
  </a-collapse-item>
  <a-collapse-item key="4">
    <template #header>
      <div class="wa-collapse-head">
        <span class="wa-collapse-head__icon"><icon-message></icon-message></span>
        <span class="wa-collapse-head__title">提供什么类型的支持服务？</span>
      </div>
    </template>
    工作日在线客服；专业版含工单优先，企业版配备专属客户成功经理。
  </a-collapse-item>
</a-collapse>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/collapse/icon/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `collapse-default` | `components/collapse/default/` | |
| `collapse-accordion` | `components/collapse/accordion/` | |
| `collapse-bordered` | `components/collapse/bordered/` | |
| `collapse-plus` | `components/collapse/plus/` | |
| `collapse-icon` | `components/collapse/icon/` | （本条） |
| `collapse-subtext` | `components/collapse/subtext/` | |
| `collapse-stacked` | `components/collapse/stacked/` | |
| `collapse-active` | `components/collapse/active/` | |
