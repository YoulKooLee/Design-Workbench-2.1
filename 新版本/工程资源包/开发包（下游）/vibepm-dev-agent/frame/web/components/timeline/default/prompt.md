# 纵向时间轴

> 状态：preview · slug：`timeline-default` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「纵向时间轴」（`timeline-default`）。竖向常用时间轴，事件摘要下方为日期标签（时钟图标 + 日期）。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-timeline；日期走 `#label` 插槽
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：竖向时间轴，内容在上、日期在下
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-timeline class="wa-tl-basic">
  <a-timeline-item>
    项目立项，完成需求评审与排期
    <template #label>
      <span class="wa-tl-date">
        <icon-clock-circle></icon-clock-circle>
        2024-01-08
      </span>
    </template>
  </a-timeline-item>
  <a-timeline-item>
    完成核心模块开发，进入联调阶段
    <template #label>
      <span class="wa-tl-date">
        <icon-clock-circle></icon-clock-circle>
        2024-03-15
      </span>
    </template>
  </a-timeline-item>
  <a-timeline-item>
    通过内测验收，开放灰度发布
    <template #label>
      <span class="wa-tl-date">
        <icon-clock-circle></icon-clock-circle>
        2024-05-20
      </span>
    </template>
  </a-timeline-item>
  <a-timeline-item>
    正式上线，开放全量用户访问
    <template #label>
      <span class="wa-tl-date">
        <icon-clock-circle></icon-clock-circle>
        2024-07-01
      </span>
    </template>
  </a-timeline-item>
  <a-timeline-item>
    完成首轮迭代，上线数据看板能力
    <template #label>
      <span class="wa-tl-date">
        <icon-clock-circle></icon-clock-circle>
        2024-09-12
      </span>
    </template>
  </a-timeline-item>
</a-timeline>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/timeline/default/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `timeline-default` | `components/timeline/default/` | （本条） |
| `timeline-icon` | `components/timeline/icon/` | |
| `timeline-horizontal` | `components/timeline/horizontal/` | |
| `timeline-icon-horizontal` | `components/timeline/icon-horizontal/` | |
