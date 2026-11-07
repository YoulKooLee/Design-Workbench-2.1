# 底部抽屉

> 状态：preview · slug：`drawer-bottom` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「底部抽屉」（`drawer-bottom`）。从底部滑上，适合快捷操作或补充说明。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将母版 `components.css` 中 `.wa-drawer-actions` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-drawer；`placement="bottom"`；`:height` 控制高度；正文 `.wa-drawer-actions` 快捷按钮
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：底部全宽、高度约 260；2 列 outline 操作按钮；页脚取消胶囊按钮
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：说明 `--color-text-3`；按钮 outline 主色

## 5. 直接粘贴

```html
<a-button type="secondary" @click="visible = true">快捷操作</a-button>
<a-drawer
  v-model:visible="visible"
  title="快捷操作"
  placement="bottom"
  :height="260"
  unmount-on-close
  @cancel="visible = false"
>
  <p class="wa-drawer-lead">选择一项操作继续。</p>
  <div class="wa-drawer-actions">
    <a-button type="secondary" long @click="visible = false">拍照</a-button>
    <a-button type="secondary" long @click="visible = false">选择文件</a-button>
    <a-button type="secondary" long @click="visible = false">定位</a-button>
    <a-button type="secondary" long @click="visible = false">编辑</a-button>
  </div>
  <template #footer>
    <a-button type="secondary" shape="round" @click="visible = false">取消</a-button>
  </template>
</a-drawer>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 从底部滑入

## 7. 预览

`components/drawer/bottom/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| drawer-default | components/drawer/default/ |
| drawer-left | components/drawer/left/ |
| drawer-top | components/drawer/top/ |
| drawer-bottom | components/drawer/bottom/ | （本条）
| drawer-form | components/drawer/form/ |
| drawer-scroll | components/drawer/scroll/ |
| drawer-float-form | components/drawer/float-form/ |
| drawer-float-scroll | components/drawer/float-scroll/ |
| drawer-float-login | components/drawer/float-login/ |
| drawer-float-cookie | components/drawer/float-cookie/ |
