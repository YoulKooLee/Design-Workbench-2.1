# 导出内容对话框

> 状态：preview · slug：`modal-content-export` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「导出内容对话框」（`modal-content-export`）。带标题栏与页脚的内容容器，主体为导出范围与格式选择。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-modal` + 纵向 `a-radio-group`（范围/格式）；须带 `modal-class="pro-content-modal"`；点「开始导出」→ 弹窗内切到 `a-result status="success"`（非 Alert / 非全局 Message）；成功后隐藏页脚按钮，仅保留标题栏关闭
- 与 `modal-content-form` 区分：本条是导入导出场景的范围+格式单选，不是通用参数表单
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：560 宽；范围/格式纵向单选 + 预计条数提示；成功态为 Result；配置态页脚取消/开始导出
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-button type="secondary" @click="open">打开示例</a-button>
<a-modal
  v-model:visible="visible"
  title="导出数据"
  title-align="start"
  :width="560"
  unmount-on-close
  modal-class="pro-content-modal"
  :footer="exportStatus === 'success' ? false : true"
  @cancel="close"
>
  <div class="mc-body">
    <a-result
      v-if="exportStatus === 'success'"
      class="mc-result"
      status="success"
      title="导出任务已创建"
      subtitle="文件准备完成后可在下载中心查看，可关闭此窗口继续操作。"
    ></a-result>
    <a-form v-else :model="form" layout="vertical" class="mc-form mc-export-form">
      <a-form-item label="导出范围">
        <a-radio-group v-model="form.scope" direction="vertical">
          <a-radio value="selected">仅勾选数据</a-radio>
          <a-radio value="page">当前页</a-radio>
          <a-radio value="all">全部筛选结果</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="导出格式">
        <a-radio-group v-model="form.format" direction="vertical">
          <a-radio value="xlsx">Excel（.xlsx）</a-radio>
          <a-radio value="csv">CSV（.csv）</a-radio>
        </a-radio-group>
      </a-form-item>
      <p class="mc-export-hint">预计导出 {{ exportCount }} 条</p>
    </a-form>
  </div>
  <template #footer>
    <template v-if="exportStatus !== 'success'">
      <a-button type="secondary" @click="close">取消</a-button>
      <a-button type="primary" @click="submit">开始导出</a-button>
    </template>
  </template>
</a-modal>
```

> 换文案：只改汉字，勿改 class / type。逻辑：`exportStatus` 为 `''` | `'success'`；`submit` 置 success；`open`/`close` 时清空状态并重置表单。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 点「开始导出」后主体为 `a-result` 成功态，页脚无按钮

## 7. 预览

`components/modal-content/export/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `modal-content-list` | `components/modal-content/list/` |  |
| `modal-content-form` | `components/modal-content/form/` |  |
| `modal-content-import` | `components/modal-content/import/` |  |
| `modal-content-export` | `components/modal-content/export/` | （本条） |
| `modal-content-detail` | `components/modal-content/detail/` |  |
| `modal-content-steps` | `components/modal-content/steps/` |  |
| `modal-content-preview` | `components/modal-content/preview/` |  |
| `modal-content-avatar-crop` | `components/modal-content/avatar-crop/` |  |
