# 点状步骤条

> 状态：preview · slug：`steps-dot` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「点状步骤条」（`steps-dot`）。点状节点，适合轻量进度提示。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-steps type="dot"
- **HTML 页内模板**：`<a-step>` 须写闭合标签 `</a-step>`，禁止 `<a-step … />`（浏览器会嵌套错乱）
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：圆点节点；标签在下；可带短描述
- 节点态：`wait` / `process` / `finish`
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）；点状连线高度见全局 `components.css`

## 5. 直接粘贴

```html
<a-steps :current="current" type="dot" label-placement="vertical">
  <a-step title="提交申请" description="填写基础信息"></a-step>
  <a-step title="部门审批" description="等待负责人确认"></a-step>
  <a-step title="申请成功" description="结果同步到工作台"></a-step>
</a-steps>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/steps/dot/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `steps-default` | `components/steps/default/` | |
| `steps-dot` | `components/steps/dot/` | （本条） |
| `steps-vertical` | `components/steps/vertical/` | |
| `steps-arrow` | `components/steps/arrow/` | |
