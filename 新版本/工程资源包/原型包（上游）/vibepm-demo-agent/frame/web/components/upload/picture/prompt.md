# 图片上传

> 状态：preview · slug：`upload` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「图片上传」（`upload`）。以图片卡片上传，最多三张。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。多页共用助手（如 `upload-demo.js`）允许交付内**一份**共享脚本。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-upload，list-type=picture-card；选图后自动模拟上传（`:auto-upload="false"`，由 onChange 驱动）；须自定义 `#upload-item`（Arco 默认 uploading 不渲染图片）
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`（或家族共享助手）；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：卡片加号；选图后 `uploading`（居中进度）→ `done`（真实预览 + hover 查看/删除，查看用 `a-image-preview` 弹层）；失败为重新上传/删除；勿用假缩略图占位
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-upload
  list-type="picture-card"
  accept="image/*"
  :limit="3"
  :auto-upload="false"
  :file-list="fileList"
  @change="onChange"
>
  <template #upload-item="{ fileItem }">
    <div class="wa-upload-pic-item" :class="'is-' + fileItem.status">
      <img v-if="fileItem.url" :src="fileItem.url" :alt="fileItem.name" />
      <div v-if="fileItem.status === 'uploading'" class="wa-upload-pic-item__progress">
        <a-progress
          type="circle"
          size="mini"
          :width="18"
          :percent="fileItem.percent || 0"
          :show-text="false"
        />
      </div>
      <div v-else-if="fileItem.status === 'error'" class="wa-upload-pic-item__error">
        <span class="wa-upload-pic-item__action" title="重新上传" @click.stop="retryFile(fileItem)"
          ><icon-refresh
        /></span>
        <span class="wa-upload-pic-item__action" title="删除" @click.stop="removeFile(fileItem)"
          ><icon-delete
        /></span>
      </div>
      <div v-else-if="fileItem.status === 'done' || fileItem.status === 'init'" class="wa-upload-pic-item__mask">
        <span class="wa-upload-pic-item__action" title="查看" @click.stop="previewFile(fileItem)"
          ><icon-eye
        /></span>
        <span class="wa-upload-pic-item__action" title="删除" @click.stop="removeFile(fileItem)"
          ><icon-delete
        /></span>
      </div>
    </div>
  </template>
</a-upload>
<a-image-preview v-model:visible="previewVisible" :src="previewSrc" />
```

> 换文案：只改汉字，勿改 class / type。须一并引入 `picture/component.css`（或等价 `.wa-upload-pic-item*` 样式）。预览需暴露 `previewVisible` / `previewSrc`，点击查看时赋值并打开。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 上传中居中进度；失败可见重新上传；成功 hover 可见查看
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/upload/picture/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `upload-button` | `components/upload/button/` |  |
| `upload-drag` | `components/upload/drag/` |  |
| `upload` | `components/upload/picture/` | （本条） |
