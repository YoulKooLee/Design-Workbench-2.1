# 维护结果页

> 状态：preview · slug：`result-maintenance` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「维护结果页」（`result-maintenance`）。计划维护说明 + 查看状态 / 刷新页面。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：家族 `component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-result `status="warning"`；`#icon` 用 `icon-tool`
- extra 双按钮
- 私有样式真源在家族 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：工具图标 + 维护说明 + 双操作
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-result status="warning" title="系统维护中" subtitle="我们正在进行计划内维护，很快就会恢复，感谢耐心等待。">
  <template #icon>
    <icon-tool :size="48"></icon-tool>
  </template>
  <template #extra>
    <a-space :size="12">
      <a-button type="primary" shape="round" size="small">查看状态</a-button>
      <a-button type="secondary" shape="round" size="small">
        <template #icon><icon-refresh></icon-refresh></template>
        刷新页面
      </a-button>
    </a-space>
  </template>
</a-result>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/result/maintenance/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `result` | `components/result/success/` | |
| `result-error` | `components/result/error/` | |
| `result-info` | `components/result/info/` | |
| `result-warning` | `components/result/warning/` | |
| `result-404` | `components/result/404/` | |
| `result-content-search` | `components/result/content-search/` | |
| `result-maintenance` | `components/result/maintenance/` | （本条） |
| `result-offline` | `components/result/offline/` | |
