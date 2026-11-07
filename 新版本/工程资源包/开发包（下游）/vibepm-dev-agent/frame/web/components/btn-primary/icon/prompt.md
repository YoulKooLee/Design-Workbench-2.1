# 带图标主按钮

> 状态：preview · slug：`btn-primary-icon` · 类型：component · 母版：web · surface：marketing · category：`basic`

## 1. 角色与目标

实现「带图标主按钮」（`btn-primary-icon`）。主 CTA，前置装饰图标。

成功标准：业务页出现与下方片段一致的可点（或禁用/加载）按钮。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；只需换文案时改标签内汉字。不要拷其它 slug，也不要拼装多态橱窗。
- **B**（无母版）：按 §5 形态还原；视觉跟宿主按钮。禁止强行 import Arco、禁止外网 CDN。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。多页共用助手（如 `upload-demo.js`）允许交付内**一份**共享脚本。

## 3. 约束

- WEB；禁止 Pro 壳 / CDN；真按钮控件
- **本提示词只含这一种形态**；其它态请复制对应兄弟 slug 的提示词
- 特效（shine 等）→ `animations/`
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`（或家族共享助手）；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 主色实心；约 44px（`size="large"`）

## 5. 直接粘贴

```html
<a-button size="large" type="primary" @click="onPrimary"><template #icon><icon-send /></template>查看定价</a-button>
```

> 换文案：只改汉字（如「免费试用」），勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 无 Pro 壳、无 CDN

## 7. 预览

`components/btn-primary/icon/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `btn-primary-default` | `components/btn-primary/default/` |  |
| `btn-primary-icon` | `components/btn-primary/icon/` | （本条） |
| `btn-primary-round` | `components/btn-primary/round/` |  |
| `btn-primary-round-icon` | `components/btn-primary/round-icon/` |  |
| `btn-primary-loading` | `components/btn-primary/loading/` |  |
| `btn-primary-disabled` | `components/btn-primary/disabled/` |  |



样式：Arco `type="primary"` + `size="large"`；超大 CTA 用 `wa-btn-cta`（`global.css`）
