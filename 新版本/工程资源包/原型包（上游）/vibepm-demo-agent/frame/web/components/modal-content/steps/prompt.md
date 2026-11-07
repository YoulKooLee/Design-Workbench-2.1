# 步骤内容对话框

> 状态：preview · slug：`modal-content-steps` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「步骤内容对话框」（`modal-content-steps`）。带标题栏与页脚的内容容器，主体为分步向导。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-modal` + `a-steps`；须带 `modal-class="pro-content-modal"`；页脚切换上一步/下一步
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：640 宽；三步流程 + 当前步内容面板；页脚上一步/下一步/完成
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-button type="secondary" @click="visible = true">打开示例</a-button>
<a-modal
  v-model:visible="visible"
  title="导入向导"
  title-align="start"
  :width="640"
  unmount-on-close
  modal-class="pro-content-modal"
  @cancel="onCancel"
>
  <div class="mc-body">
    <a-steps :current="current">
      <a-step title="选择文件" description="上传表格"></a-step>
      <a-step title="核对字段" description="映射列名"></a-step>
      <a-step title="完成导入" description="查看结果"></a-step>
    </a-steps>
    <div class="mc-panel mc-step-panel" v-if="current === 1">
      <div class="mc-panel__title">第一步</div>
      <p class="mc-lead">请准备好待导入的 Excel / CSV 文件。</p>
    </div>
    <div class="mc-panel mc-step-panel" v-else-if="current === 2">
      <div class="mc-panel__title">第二步</div>
      <p class="mc-lead">确认字段映射是否与目标表结构一致。</p>
    </div>
    <div class="mc-panel mc-step-panel" v-else>
      <div class="mc-panel__title">第三步</div>
      <p class="mc-lead">导入完成，可在列表中查看最新数据。</p>
    </div>
  </div>
  <template #footer>
    <a-button type="secondary" shape="round" v-if="current > 1" @click="prev">上一步</a-button>
    <a-button v-if="current < 3" type="primary" @click="next">下一步</a-button>
    <a-button v-else type="primary" @click="finish">完成</a-button>
  </template>
</a-modal>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/modal-content/steps/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `modal-content-list` | `components/modal-content/list/` |  |
| `modal-content-form` | `components/modal-content/form/` |  |
| `modal-content-import` | `components/modal-content/import/` |  |
| `modal-content-export` | `components/modal-content/export/` |  |
| `modal-content-detail` | `components/modal-content/detail/` |  |
| `modal-content-steps` | `components/modal-content/steps/` | （本条） |
| `modal-content-preview` | `components/modal-content/preview/` |  |
| `modal-content-avatar-crop` | `components/modal-content/avatar-crop/` |  |
