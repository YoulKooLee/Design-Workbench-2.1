# 裁剪头像内容对话框

> 状态：preview · slug：`modal-content-avatar-crop` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「裁剪头像内容对话框」（`modal-content-avatar-crop`）。带标题栏与页脚的内容容器，主体为圆形遮罩裁剪台与缩放条。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把同目录 `avatar-crop.js` 交互逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版路径再强制 `<script src>`。预览挂载壳不拷。多页共用助手允许交付内**一份**共享脚本。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-modal` + 裁剪舞台 + `a-slider`；须带 `modal-class="pro-content-modal wa-avatar-crop-modal"`；页脚取消 / 重新选择 / 确定；拖拽平移、滚轮或滑条缩放；确定后 canvas 导出圆形区域 PNG
- 入口常为 `avatar-trigger` 选图后打开本弹窗；本条**不含**头像框 UI
- 校验：仅图片；单文件 ≤ 2MB（可按业务调整）
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `avatar-crop.js` / `component.js`；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：468 宽；420 裁剪台 + 圆形虚线遮罩 + 缩放条；页脚三按钮，确定需图加载完成
- 动效：仅本控件轻交互（拖拽/缩放）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-button type="secondary" @click="pickFile">打开示例</a-button>
<input
  ref="cropFileInput"
  class="wa-avatar-crop-input"
  type="file"
  accept="image/png,image/jpeg,image/webp,image/gif"
  @change="onCropFileChange"
/>
<a-modal
  v-model:visible="cropVisible"
  title="裁剪头像"
  title-align="start"
  :width="468"
  :mask-closable="false"
  unmount-on-close
  modal-class="pro-content-modal wa-avatar-crop-modal"
  @cancel="onCropCancel"
>
  <div class="wa-avatar-crop">
    <div
      class="wa-avatar-crop__stage"
      :class="{ 'is-dragging': cropDragging }"
      @mousedown.prevent="onCropPointerDown"
      @mousemove="onCropPointerMove"
      @mouseup="onCropPointerUp"
      @mouseleave="onCropPointerUp"
      @wheel.prevent="onCropWheel"
    >
      <img
        v-if="cropSourceUrl"
        ref="cropImage"
        class="wa-avatar-crop__image"
        :src="cropSourceUrl"
        :style="cropImageStyle"
        alt="crop"
        draggable="false"
        @load="onCropImageLoad"
      />
      <div class="wa-avatar-crop__mask" aria-hidden="true"></div>
    </div>
    <div class="wa-avatar-crop__toolbar">
      <span class="wa-avatar-crop__toolbar-label">缩放</span>
      <a-slider v-model="cropZoom" :min="1" :max="3" :step="0.01" :show-tooltip="false" />
    </div>
  </div>
  <template #footer>
    <a-space>
      <a-button type="secondary" @click="onCropCancel">取消</a-button>
      <a-button type="secondary" @click="onCropReselect">重新选择</a-button>
      <a-button type="primary" :disabled="!cropReady" @click="onCropConfirm">确定</a-button>
    </a-space>
  </template>
</a-modal>
```

> 换文案：只改汉字，勿改 class / type。与可编辑头像组合时，用 `avatar-trigger` 选图后调用 `openWithFile(file)` 打开本弹窗。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 可拖拽/缩放；确定导出；重新选择可换图

## 7. 预览

`components/modal-content/avatar-crop/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `modal-content-list` | `components/modal-content/list/` |  |
| `modal-content-form` | `components/modal-content/form/` |  |
| `modal-content-import` | `components/modal-content/import/` |  |
| `modal-content-export` | `components/modal-content/export/` |  |
| `modal-content-detail` | `components/modal-content/detail/` |  |
| `modal-content-steps` | `components/modal-content/steps/` |  |
| `modal-content-preview` | `components/modal-content/preview/` |  |
| `modal-content-avatar-crop` | `components/modal-content/avatar-crop/` | （本条） |
