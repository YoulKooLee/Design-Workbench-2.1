# 左右字段

> 状态：preview · slug：`typography-fields` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「左右字段」（`typography-fields`）。详情页左右标签值只读字段表；`:column` 按版面取 1 / 2 / 3。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-descriptions；`:column` 为 `1` / `2` / `3`（预览示例用 `3`，非唯一列数）
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：列等分；label 固定约 6 字宽、次要色；value 主色；可用 `:span` 跨列
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-descriptions :column="3" size="large" class="wa-typo-fields">
  <a-descriptions-item label="订单类型">跨境零售</a-descriptions-item>
  <a-descriptions-item label="物流渠道">空运专线 / 海外仓中转</a-descriptions-item>
  <a-descriptions-item label="清关语种">英语 / 德语</a-descriptions-item>
  <a-descriptions-item label="目的地区">欧盟 · DE</a-descriptions-item>
  <a-descriptions-item label="预计时效">5–7 工作日</a-descriptions-item>
  <a-descriptions-item label="包裹重量">2.4 kg</a-descriptions-item>
  <a-descriptions-item label="下单时间">2026-04-10 09:18:00</a-descriptions-item>
  <a-descriptions-item label="发运时间">2026-04-12 11:05:00</a-descriptions-item>
  <a-descriptions-item label="仓储节点">WMS · frankfurt-01</a-descriptions-item>
  <a-descriptions-item label="面单文件">eu-fragrance-label-v3.pdf</a-descriptions-item>
  <a-descriptions-item label="标签" :span="2">香氛, 礼盒, 加急</a-descriptions-item>
</a-descriptions>
```

> 换文案：只改汉字；列数改 `:column`（`1` / `2` / `3`），勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案与 `:column`）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/typography/fields/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `typography` | `components/typography/title/` |  |
| `typography-paragraph` | `components/typography/paragraph/` |  |
| `typography-text` | `components/typography/text/` |  |
| `typography-ellipsis` | `components/typography/ellipsis/` |  |
| `typography-meta` | `components/typography/meta/` |  |
| `typography-fields` | `components/typography/fields/` | （本条） |
