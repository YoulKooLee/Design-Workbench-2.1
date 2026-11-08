# 趋势统计数值

> 状态：preview · slug：`statistic-trend` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「趋势统计数值」（`statistic-trend`）。附加涨跌箭头与百分比，表达趋势。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/statistic/component.css` 中 `.wa-stat-row` 等相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-statistic；`#extra` 内趋势行（FA icon-trending-up/down）
- 若有私有样式：规则真源在 `components/statistic/component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：绿涨红跌；图标 + 百分比；卡内多组用 `.wa-stat-row` 三列
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-stat-row">
  <a-statistic title="访问量" :value="9280" show-group-separator>
    <template #extra>
      <span class="wa-stat-trend wa-stat-trend--up"><icon-trending-up :size="12"></icon-trending-up> 12.4%</span>
    </template>
  </a-statistic>
  <a-statistic title="跳出率" :value="32.8" :precision="1">
    <template #suffix>%</template>
    <template #extra>
      <span class="wa-stat-trend wa-stat-trend--down"><icon-trending-down :size="12"></icon-trending-down> 3.1%</span>
    </template>
  </a-statistic>
  <a-statistic title="付费转化" :value="4.2" :precision="1">
    <template #suffix>%</template>
    <template #extra>
      <span class="wa-stat-trend wa-stat-trend--up"><icon-trending-up :size="12"></icon-trending-up> 0.6%</span>
    </template>
  </a-statistic>
</div>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/statistic/trend/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `statistic-default` | `components/statistic/default/` | |
| `statistic-prefix` | `components/statistic/prefix/` | |
| `statistic-suffix` | `components/statistic/suffix/` | |
| `statistic-extra` | `components/statistic/extra/` | |
| `statistic-animation` | `components/statistic/animation/` | |
| `statistic-trend` | `components/statistic/trend/` | （本条） |
| `statistic-countdown` | `components/statistic/countdown/` | |
