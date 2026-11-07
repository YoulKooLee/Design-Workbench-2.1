# 上传进度

> 状态：preview · slug：`progress-upload` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「上传进度」（`progress-upload`）。标签 + 百分比 + 进度条 + 开始上传按钮，适合文件上传反馈。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把「开始上传」推进 `percent` 的逻辑**并入**宿主页 `js/<page>.js`（预览挂载壳不拷）。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-progress + a-button；`:show-text="false"`；点击按钮驱动进度
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：上标签行、中进度条、下小尺寸主按钮居中
- 动效：进度条 `:animation="true"`；按钮点击推进进度
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-progress-upload">
  <div class="wa-progress-label__meta">
    <span>文件上传</span>
    <span class="wa-progress-label__value">{{ formatPct(uploadPercent) }}</span>
  </div>
  <a-progress
    class="wa-progress-demo"
    :percent="uploadPercent"
    :show-text="false"
    :animation="true"
    :stroke-width="10"
  ></a-progress>
  <a-button class="wa-progress-upload__action" type="primary" size="small" @click="startUpload">开始上传</a-button>
</div>
```

> 换文案：只改汉字。宿主提供 `uploadPercent`、`formatPct`、`startUpload`。`.wa-progress-upload` / `__action` / `.wa-progress-label__*` / `.wa-progress-demo` 并入宿主 CSS；勿单独 link。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/progress/upload/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `progress-default` | `components/progress/default/` | |
| `progress-label` | `components/progress/label/` | |
| `progress-animation` | `components/progress/animation/` | |
| `progress-success` | `components/progress/success/` | |
| `progress-warning` | `components/progress/warning/` | |
| `progress-danger` | `components/progress/danger/` | |
| `progress-color` | `components/progress/color/` | |
| `progress-steps` | `components/progress/steps/` | |
| `progress-circle` | `components/progress/circle/` | |
| `progress-mini` | `components/progress/mini/` | |
| `progress-striped` | `components/progress/striped/` | |
| `progress-upload` | `components/progress/upload/` | （本条） |
| `progress-usage` | `components/progress/usage/` | |
| `progress-metrics` | `components/progress/metrics/` | |
| `progress-setup` | `components/progress/setup/` | |
| `progress-status` | `components/progress/status/` | |
