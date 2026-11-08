# 拖拽上传

> 状态：preview · slug：`upload-drag` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「拖拽上传」（`upload-drag`）。点击或把文件拖进虚线区域。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。多页共用助手（如 `upload-demo.js`）允许交付内**一份**共享脚本。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-upload，draggable；选文件后自动模拟上传（`:auto-upload="false"`，由 onChange 驱动）
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`（或家族共享助手）；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：虚线放置区（圆角跟 `--wa-input-radius`）；默认无列表；选文件后 `uploading`（环形进度）→ `done`；图标走 FA，勿用 SVG 占位图
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-upload
  class="wa-upload-io"
  draggable
  accept=".xlsx,.xls,.csv"
  :auto-upload="false"
  :limit="1"
  :file-list="fileList"
  @change="onChange"
>
  <template #upload-button>
    <div class="wa-upload-drag">
      <div class="wa-upload-drag-icon"><icon-upload /></div>
      <div class="wa-upload-drag-text">点击或拖拽文件到此处</div>
      <div class="wa-upload-drag-hint">仅支持 Excel / CSV 文件，单文件不超过 10MB</div>
    </div>
  </template>
</a-upload>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/upload/drag/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `upload-button` | `components/upload/button/` |  |
| `upload-drag` | `components/upload/drag/` | （本条） |
| `upload` | `components/upload/picture/` |  |
