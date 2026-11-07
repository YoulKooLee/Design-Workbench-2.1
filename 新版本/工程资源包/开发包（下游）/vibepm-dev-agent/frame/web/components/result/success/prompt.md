# 成功结果页

> 状态：preview · slug：`result` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「成功结果页」（`result`）。成功提交结果页。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-result status=success；图标走母版中性 Light 圆标（对齐 modal）
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：中性圆标 + 加粗大标题 + 胶囊主/次按钮
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：图标 `--color-text-2`；标题 `--color-text-1`；按钮主色 / secondary

## 5. 直接粘贴

```html
<a-result status="success" title="提交成功" subtitle="我们已收到你的申请，将尽快处理。">
  <template #icon>
    <icon-check-circle :size="48"></icon-check-circle>
  </template>
  <template #extra>
    <a-space :size="12">
      <a-button type="primary" shape="round" size="small">返回列表</a-button>
      <a-button type="secondary" shape="round" size="small">查看详情</a-button>
    </a-space>
  </template>
</a-result>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/result/success/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `result` | `components/result/success/` | （本条） |
| `result-error` | `components/result/error/` | |
| `result-info` | `components/result/info/` | |
| `result-warning` | `components/result/warning/` | |
| `result-404` | `components/result/404/` | |
| `result-content-search` | `components/result/content-search/` | |
| `result-maintenance` | `components/result/maintenance/` | |
| `result-offline` | `components/result/offline/` | |
