# 导入内容对话框

> 状态：preview · slug：`modal-content-import` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「导入内容对话框」（`modal-content-import`）。带标题栏与页脚的内容容器，主体为拖拽上传导入。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。多页共用助手（如 `upload-demo.js`）允许交付内**一份**共享脚本。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-modal` + `a-upload` draggable；须带 `modal-class="pro-content-modal"`；点「开始导入」：有文件 → 弹窗内切到 `a-result status="success"`（非 Alert / 非全局 Message）；无文件 → `a-alert` warning；成功后隐藏页脚按钮，仅保留标题栏关闭
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`（或家族共享助手）；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：560 宽；上传态为提示条 + 拖拽区；成功态为 Result（图标 + 标题 + 副文案）；上传态页脚取消/开始导入，成功态无页脚按钮
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-button type="secondary" @click="open">打开示例</a-button>
<a-modal
  v-model:visible="visible"
  title="导入数据"
  title-align="start"
  :width="560"
  unmount-on-close
  modal-class="pro-content-modal"
  :footer="importStatus === 'success' ? false : true"
  @cancel="close"
>
  <div class="mc-body">
    <a-result
      v-if="importStatus === 'success'"
      class="mc-result"
      status="success"
      title="导入成功"
      subtitle="数据已写入列表，可关闭此窗口继续操作。"
    ></a-result>
    <template v-else>
      <a-alert v-if="importStatus === 'warn'" class="mc-alert" type="warning" show-icon>
        请先选择要导入的文件。
      </a-alert>
      <div v-else class="mc-tip">
        <icon-info-circle class="mc-tip-icon"></icon-info-circle>
        <span class="mc-tip-text">支持 .xlsx / .xls / .csv，单文件不超过 10MB。</span>
      </div>
      <a-upload
        class="wa-upload-io"
        data-wa-upload="modal-import"
        draggable
        accept=".xlsx,.xls,.csv"
        :auto-upload="false"
        :limit="1"
        :file-list="fileList"
        @change="onChange"
      >
        <template #upload-button>
          <div class="wa-upload-drag">
            <div class="wa-upload-drag-icon"><icon-upload></icon-upload></div>
            <div class="wa-upload-drag-text">点击或拖拽文件到此处</div>
            <div class="wa-upload-drag-hint">仅支持 Excel / CSV</div>
          </div>
        </template>
      </a-upload>
    </template>
  </div>
  <template #footer>
    <template v-if="importStatus !== 'success'">
      <a-button type="secondary" @click="close">取消</a-button>
      <a-button type="primary" @click="submit">开始导入</a-button>
    </template>
  </template>
</a-modal>
```

> 换文案：只改汉字，勿改 class / type。上传拖拽样式见 `upload/drag/component.css`（落地并入宿主，勿强制独立 link）；列表灰底整行修法已在 `components.css`。
> 逻辑：`importStatus` 为 `''` | `'success'` | `'warn'`；`submit` 有文件则 success，否则 warn；`open`/`close` 时清空状态。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 点「开始导入」且已选文件后，弹窗主体为 `a-result` 成功态，页脚无按钮（仅标题栏关闭）

## 7. 预览

`components/modal-content/import/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `modal-content-list` | `components/modal-content/list/` |  |
| `modal-content-form` | `components/modal-content/form/` |  |
| `modal-content-import` | `components/modal-content/import/` | （本条） |
| `modal-content-export` | `components/modal-content/export/` |  |
| `modal-content-detail` | `components/modal-content/detail/` |  |
| `modal-content-steps` | `components/modal-content/steps/` |  |
| `modal-content-preview` | `components/modal-content/preview/` |  |
| `modal-content-avatar-crop` | `components/modal-content/avatar-crop/` |  |
