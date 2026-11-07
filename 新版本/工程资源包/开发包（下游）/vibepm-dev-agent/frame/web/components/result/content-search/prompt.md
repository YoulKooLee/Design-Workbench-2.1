# 内容搜索结果页

> 状态：preview · slug：`result-content-search` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「内容搜索结果页」（`result-content-search`）。内容不存在 + 搜索框与支持入口，引导用户找回内容。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：家族 `component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-result `status="404"`；`#icon` 用 `icon-file`（禁 Arco 默认 404 插画）；extra 内 `a-input-search` + 支持链接
- 私有样式真源在家族 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：线型文件图标 + 内容不存在文案 + 圆角搜索 + 支持提示
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：图标 `--color-text-2`；标题 `--color-text-1`

## 5. 直接粘贴

```html
<a-result status="404" title="内容不存在" subtitle="你访问的内容不存在，试试搜索你需要的内容。">
  <template #icon>
    <icon-file :size="48"></icon-file>
  </template>
  <template #extra>
    <div class="wa-result-search">
      <a-input-search placeholder="搜索…" allow-clear size="large" />
      <p class="wa-result-hint">需要帮助？<a href="javascript:void(0)">联系支持</a></p>
    </div>
  </template>
</a-result>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/result/content-search/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `result` | `components/result/success/` | |
| `result-error` | `components/result/error/` | |
| `result-info` | `components/result/info/` | |
| `result-warning` | `components/result/warning/` | |
| `result-404` | `components/result/404/` | |
| `result-content-search` | `components/result/content-search/` | （本条） |
| `result-maintenance` | `components/result/maintenance/` | |
| `result-offline` | `components/result/offline/` | |
