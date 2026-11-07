# 清单内容对话框

> 状态：preview · slug：`modal-content-list` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「清单内容对话框」（`modal-content-list`）。带标题栏与页脚的内容容器，主体为清单核对示例。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-modal`（非 `Modal.info` 等 simple 反馈）；须带 `modal-class="pro-content-modal"`
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：560 宽内容弹窗；清单面板 + 底部勾选；页脚取消/确定
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
  ok-text="确定"
  cancel-text="取消"
  @ok="visible = false"
  @cancel="visible = false"
  :ok-button-props="{ type: 'primary', shape: 'round' }"
  :cancel-button-props="{ type: 'secondary', shape: 'round' }"
>
  <div class="mc-body">
    <p class="mc-lead">将自定义内容放入此容器。下方为发布清单示例。</p>
    <div class="mc-panel">
      <div class="mc-panel__title">发布清单</div>
      <ul class="mc-list">
        <li><strong>主题令牌</strong><a-tag color="arcoblue" size="small">已同步</a-tag></li>
        <li><strong>预览页</strong><span>待确认</span></li>
        <li><strong>导出包</strong><span>准备中</span></li>
        <li><strong>样式文档</strong><span>已就绪</span></li>
        <li><strong>资源清单</strong><span>待核对</span></li>
      </ul>
    </div>
    <a-checkbox v-model="notify">导出后发送通知</a-checkbox>
  </div>
</a-modal>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/modal-content/list/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `modal-content-list` | `components/modal-content/list/` | （本条） |
| `modal-content-form` | `components/modal-content/form/` |  |
| `modal-content-import` | `components/modal-content/import/` |  |
| `modal-content-export` | `components/modal-content/export/` |  |
| `modal-content-detail` | `components/modal-content/detail/` |  |
| `modal-content-steps` | `components/modal-content/steps/` |  |
| `modal-content-preview` | `components/modal-content/preview/` |  |
| `modal-content-avatar-crop` | `components/modal-content/avatar-crop/` |  |
