# 表单内容对话框

> 状态：preview · slug：`modal-content-form` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「表单内容对话框」（`modal-content-form`）。带标题栏与页脚的内容容器，主体为参数设置表单。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-modal` + 表单控件；须带 `modal-class="pro-content-modal"`；页脚用 `#footer` 自定义提交/重置
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：560 宽内容弹窗；垂直表单（格式/范围/备注）+ 勾选；页脚提交/重置
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-button type="secondary" @click="visible = true">打开示例</a-button>
<a-modal
  v-model:visible="visible"
  title="内容容器"
  title-align="start"
  :width="560"
  unmount-on-close
  modal-class="pro-content-modal"
  @cancel="visible = false"
>
  <a-form :model="form" layout="vertical" class="mc-form">
    <a-form-item label="格式">
      <a-select v-model="form.format" placeholder="请选择格式" allow-clear>
        <a-option value="zip">ZIP 包</a-option>
        <a-option value="png">PNG 序列</a-option>
        <a-option value="pdf">PDF 文档</a-option>
      </a-select>
    </a-form-item>
    <a-form-item label="范围">
      <a-select v-model="form.scope" placeholder="请选择范围" allow-clear>
        <a-option value="current">当前主题</a-option>
        <a-option value="all">全部主题</a-option>
        <a-option value="selected">已选项</a-option>
      </a-select>
    </a-form-item>
    <a-form-item label="备注">
      <a-input v-model="form.note" placeholder="选填，补充说明" allow-clear></a-input>
    </a-form-item>
    <a-checkbox v-model="form.notify">导出后发送通知</a-checkbox>
  </a-form>
  <template #footer>
    <a-button type="primary" @click="submit">提交</a-button>
    <a-button type="secondary" @click="reset">重置</a-button>
  </template>
</a-modal>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/modal-content/form/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `modal-content-list` | `components/modal-content/list/` |  |
| `modal-content-form` | `components/modal-content/form/` | （本条） |
| `modal-content-import` | `components/modal-content/import/` |  |
| `modal-content-export` | `components/modal-content/export/` |  |
| `modal-content-detail` | `components/modal-content/detail/` |  |
| `modal-content-steps` | `components/modal-content/steps/` |  |
| `modal-content-preview` | `components/modal-content/preview/` |  |
| `modal-content-avatar-crop` | `components/modal-content/avatar-crop/` |  |
