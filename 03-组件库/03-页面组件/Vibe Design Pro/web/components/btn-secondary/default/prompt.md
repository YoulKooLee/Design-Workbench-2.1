# 中性按钮

> 状态：preview · slug：`btn-secondary-default` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「中性按钮」（`btn-secondary-default`）。产品侧中性次操作（重置、取消），`type="secondary"`；白底中性描边，非主色 outline，也非营销 `wa-btn-soft`。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。
- **样式落地**：中性按钮皮肤在 `assets/common/css/global.css`（`.arco-btn-secondary`）；宿主已挂 global 即可。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-button type=secondary
- 勿用 outline / wa-btn-soft 冒充中性次操作

## 4. 视觉规格

- 产品侧默认中号（`size="medium"` / `--wa-ctrl-h-medium`）
- 白底 + `--color-border-2` 描边；悬停浅填 + 软环（对齐分享渠道）
- 默认高度跟 `--wa-input-h`（40px）

## 5. 直接粘贴

```html
<a-button size="medium" type="secondary">恢复默认</a-button>
```

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/btn-secondary/default/index.html`

## 8. 同族

| slug | 路径 | 说明 |
| --- | --- | --- |
| `btn-secondary-default` | `components/btn-secondary/default/` | 默认 |
| `btn-secondary-icon` | `components/btn-secondary/icon/` | 带图标 |
| `btn-secondary-round` | `components/btn-secondary/round/` | 胶囊 |
| `btn-secondary-round-icon` | `components/btn-secondary/round-icon/` | 带图标胶囊 |
| `btn-secondary-loading` | `components/btn-secondary/loading/` | 加载中 |
| `btn-secondary-disabled` | `components/btn-secondary/disabled/` | 禁用 |
