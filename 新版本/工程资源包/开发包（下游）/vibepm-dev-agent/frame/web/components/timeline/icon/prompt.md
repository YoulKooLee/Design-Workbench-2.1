# 图标时间轴

> 状态：preview · slug：`timeline-icon` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「图标时间轴」（`timeline-icon`）。自定义圆点图标节点，左侧标题/描述、右侧日期；危险态用红色圆点。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-timeline；圆点走 `#dot` 插槽
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：32px 图标圆点；正文与日期左右分栏；危险节点 `wa-tl-dot--danger`
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-timeline class="wa-tl-icon">
  <a-timeline-item>
    <template #dot>
      <span class="wa-tl-dot">
        <icon-location></icon-location>
      </span>
    </template>
    <div class="wa-tl-body">
      <div class="wa-tl-main">
        <div class="wa-tl-title">发布 1.0 版本</div>
        <div class="wa-tl-desc">完成核心功能上线，开放首批内测</div>
      </div>
      <div class="wa-tl-date">
        <icon-clock-circle></icon-clock-circle>
        2015-09-09
      </div>
    </div>
  </a-timeline-item>
  <a-timeline-item>
    <template #dot>
      <span class="wa-tl-dot">
        <icon-location></icon-location>
      </span>
    </template>
    <div class="wa-tl-body">
      <div class="wa-tl-main">
        <div class="wa-tl-title">发布 2.0 版本</div>
        <div class="wa-tl-desc">支持批量导入与权限分组管理</div>
      </div>
      <div class="wa-tl-date">
        <icon-clock-circle></icon-clock-circle>
        2015-09-20
      </div>
    </div>
  </a-timeline-item>
  <a-timeline-item>
    <template #dot>
      <span class="wa-tl-dot wa-tl-dot--danger">
        <icon-bug></icon-bug>
      </span>
    </template>
    <div class="wa-tl-body">
      <div class="wa-tl-main">
        <div class="wa-tl-title">严重故障</div>
        <div class="wa-tl-desc">服务异常中断约 2 小时，已完成恢复</div>
      </div>
      <div class="wa-tl-date">
        <icon-clock-circle></icon-clock-circle>
        2016-09-10
      </div>
    </div>
  </a-timeline-item>
  <a-timeline-item>
    <template #dot>
      <span class="wa-tl-dot">
        <icon-location></icon-location>
      </span>
    </template>
    <div class="wa-tl-body">
      <div class="wa-tl-main">
        <div class="wa-tl-title">发布 3.0 版本</div>
        <div class="wa-tl-desc">重构消息中心，提升推送稳定性</div>
      </div>
      <div class="wa-tl-date">
        <icon-clock-circle></icon-clock-circle>
        2016-09-19
      </div>
    </div>
  </a-timeline-item>
  <a-timeline-item>
    <template #dot>
      <span class="wa-tl-dot">
        <icon-location></icon-location>
      </span>
    </template>
    <div class="wa-tl-body">
      <div class="wa-tl-main">
        <div class="wa-tl-title">发布 4.0 版本</div>
        <div class="wa-tl-desc">新增数据看板与自定义报表</div>
      </div>
      <div class="wa-tl-date">
        <icon-clock-circle></icon-clock-circle>
        2016-11-15
      </div>
    </div>
  </a-timeline-item>
</a-timeline>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/timeline/icon/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `timeline-default` | `components/timeline/default/` | |
| `timeline-icon` | `components/timeline/icon/` | （本条） |
| `timeline-horizontal` | `components/timeline/horizontal/` | |
| `timeline-icon-horizontal` | `components/timeline/icon-horizontal/` | |
