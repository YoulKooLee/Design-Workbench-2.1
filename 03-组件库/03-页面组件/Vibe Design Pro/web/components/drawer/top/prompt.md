# 顶部抽屉

> 状态：preview · slug：`drawer-top` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「顶部抽屉」（`drawer-top`）。从顶部滑下，适合通知或会话提示条。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将母版 `components.css` 中 `.wa-drawer-notify*` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把 `notices` 列表数据**并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-drawer；`placement="top"`；`:height` 控制高度；正文 `.wa-drawer-notify`
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：顶部全宽、高度约 280；通知卡片浅底；页脚胶囊按钮
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：标题 `--color-text-1`；说明 `--color-text-3`；卡片 `--color-fill-1`

## 5. 直接粘贴

```html
<a-button type="secondary" @click="visible = true">查看通知</a-button>
<a-drawer
  v-model:visible="visible"
  title="通知"
  placement="top"
  :height="280"
  unmount-on-close
  @cancel="visible = false"
>
  <ul class="wa-drawer-notify">
    <li class="wa-drawer-notify__item" v-for="(item, i) in notices" :key="i">
      <p class="wa-drawer-notify__title">{{ item.title }}</p>
      <p class="wa-drawer-notify__desc">{{ item.desc }}</p>
    </li>
  </ul>
  <template #footer>
    <a-button type="secondary" shape="round" @click="visible = false">关闭</a-button>
    <a-button type="primary" shape="round" @click="visible = false">全部已读</a-button>
  </template>
</a-drawer>
```

> 换文案：只改汉字，勿改 class / type。`notices` 为 `{ title, desc }[]`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 从顶部滑入

## 7. 预览

`components/drawer/top/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| drawer-default | components/drawer/default/ |
| drawer-left | components/drawer/left/ |
| drawer-top | components/drawer/top/ | （本条）
| drawer-bottom | components/drawer/bottom/ |
| drawer-form | components/drawer/form/ |
| drawer-scroll | components/drawer/scroll/ |
| drawer-float-form | components/drawer/float-form/ |
| drawer-float-scroll | components/drawer/float-scroll/ |
| drawer-float-login | components/drawer/float-login/ |
| drawer-float-cookie | components/drawer/float-cookie/ |
