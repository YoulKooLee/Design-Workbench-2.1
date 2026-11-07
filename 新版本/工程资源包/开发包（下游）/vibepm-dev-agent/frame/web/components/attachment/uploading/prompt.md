# 上传中与完成卡

> 状态：preview · slug：`attachment-uploading` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「上传中与完成卡」（`attachment-uploading`）。上传进度卡与已完成代码文件纵向叠放，宽度铺满容器。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/attachment/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：两张 `.wa-attach`：spin+取消 / 代码图标+移除
- 附件为展示态（非 a-upload）；选文件走 `upload` 家族
- 禁止外链 CDN 图；图预览用本地 SVG data URI 或交付内资源
- 私有样式真源在 `components/attachment/component.css`；§5 **只贴 HTML**
- Vue 模板内自定义标签勿写成自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：纵向叠放；上传中 shimmer + 完成态；宽度 100%
- 动效：上传中标题 shimmer；图块悬停显示关闭；其余仅 hover/focus
- 颜色：只用 `--wa-*` / Arco token

## 5. 直接粘贴

```html
<div class="wa-attach-stack">
  <div class="wa-attach wa-attach--uploading">
    <div class="wa-attach__media"><a-spin :size="16"></a-spin></div>
    <div class="wa-attach__body">
      <div class="wa-attach__title">销售看板.pdf</div>
      <div class="wa-attach__desc">上传中 · 64%</div>
    </div>
    <div class="wa-attach__actions">
      <a-button type="text" size="mini" aria-label="取消"><icon-close :size="12"></icon-close></a-button>
    </div>
  </div>
  <div class="wa-attach">
    <div class="wa-attach__media"><icon-code :size="16"></icon-code></div>
    <div class="wa-attach__body">
      <div class="wa-attach__title">消息渲染器.tsx</div>
      <div class="wa-attach__desc">TypeScript · 12 KB</div>
    </div>
    <div class="wa-attach__actions">
      <a-button type="text" size="mini" aria-label="移除"><icon-close :size="12"></icon-close></a-button>
    </div>
  </div>
</div>
```

> 换文案：只改汉字与文件名；勿改 class。有私有样式时并入宿主 CSS。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/attachment/uploading/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `attachment-gallery` | `components/attachment/gallery/` | |
| `attachment-uploading` | `components/attachment/uploading/` | （本条） |
| `attachment-states` | `components/attachment/states/` | |
| `attachment-sizes` | `components/attachment/sizes/` | |
| `attachment-group` | `components/attachment/group/` | |
