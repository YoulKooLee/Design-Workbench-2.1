# 带图标胶囊柔和按钮

> 状态：preview · slug：`btn-soft-round-icon` · 类型：component · 母版：web · surface：marketing · category：`basic`

## 1. 角色与目标

实现「带图标胶囊柔和按钮」（`btn-soft-round-icon`）。胶囊次 CTA，并前置装饰图标。

成功标准：业务页出现与下方片段一致的可点（或禁用/加载）按钮。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；只需换文案时改标签内汉字。不要拷其它 slug，也不要拼装多态橱窗。
- **B**（无母版）：按 §5 形态还原；视觉跟宿主按钮。禁止强行 import Arco、禁止外网 CDN。
- **样式落地**：柔和皮肤由 `.wa-btn-soft` 覆盖 outline 基类（浅底浅描边 → 悬停实心）；高度用 `size="large"`；`shape="round"` 时圆角由 size 阶梯半高规则保证。
- **脚本落地**：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。多页共用助手（如 `upload-demo.js`）允许交付内**一份**共享脚本。

## 3. 约束

- WEB；禁止 Pro 壳 / CDN；真按钮控件
- **本提示词只含这一种形态**；其它态请复制对应兄弟 slug 的提示词
- 特效（shine 等）→ `animations/`
- 若有私有业务脚本：真源在同目录 `component.js`（或家族共享助手）；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 独立柔和按钮皮肤；约 44px（`size="large"` + `wa-btn-soft`）+ 胶囊形；勿与中性 secondary 混淆

## 5. 直接粘贴

```html
<a-button size="large" class="wa-btn-soft" type="outline" shape="round" @click="onSecondary"><template #icon><icon-file /></template>了解更多</a-button>
```

> 换文案：只改汉字；须保留 `size="large"`、`wa-btn-soft`、`type="outline"` 与 `shape="round"`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 无 Pro 壳、无 CDN

## 7. 预览

`components/btn-soft/round-icon/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `btn-soft-default` | `components/btn-soft/default/` |  |
| `btn-soft-icon` | `components/btn-soft/icon/` |  |
| `btn-soft-round` | `components/btn-soft/round/` |  |
| `btn-soft-round-icon` | `components/btn-soft/round-icon/` | （本条） |
| `btn-soft-loading` | `components/btn-soft/loading/` |  |
| `btn-soft-disabled` | `components/btn-soft/disabled/` |  |


样式：`type="outline"` + `size="large"` + `.wa-btn-soft`（皮肤，`global.css`）；超大 CTA 再加 `wa-btn-cta`
