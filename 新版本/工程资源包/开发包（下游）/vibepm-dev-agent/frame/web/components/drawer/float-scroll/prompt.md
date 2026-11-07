# 悬浮目标抽屉

> 状态：preview · slug：`drawer-float-scroll` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「悬浮目标抽屉」（`drawer-float-scroll`）。右侧不贴边圆角面板，标题+说明+可滚动正文，纵向全宽提交/取消。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将母版 `components.css` 中 `.wa-drawer-float*` / `:has(.wa-drawer-float)` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把 `paras` 文案数组**并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-drawer；`placement="right"`；`:width="380"`；`:closable="false"`；`body-class="wa-drawer-float wa-drawer-float--right"`；正文 `.wa-drawer-float__paras`；页脚提交在上、取消在下
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：右侧滑出，距边约 16px；四角 24px；宽 380；标题+说明；正文多段；纵向全宽胶囊按钮
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：标题 `--color-text-1`；说明 `--color-text-3`；取消为中性描边

## 5. 直接粘贴

```html
<a-button type="secondary" @click="visible = true">调整目标</a-button>
<a-drawer
  v-model:visible="visible"
  placement="right"
  :width="380"
  :closable="false"
  body-class="wa-drawer-float wa-drawer-float--right"
  unmount-on-close
  @cancel="visible = false"
>
  <template #title>
    <div>
      <p class="wa-drawer-float__title">调整目标</p>
      <p class="wa-drawer-float__desc">设置你的每日活动目标。</p>
    </div>
  </template>
  <div class="wa-drawer-float__paras">
    <p v-for="(p, i) in paras" :key="i">{{ p }}</p>
  </div>
  <template #footer>
    <a-button type="primary" shape="round" @click="visible = false">提交</a-button>
    <a-button type="secondary" shape="round" @click="visible = false">取消</a-button>
  </template>
</a-drawer>
```

> 换文案：只改汉字，勿改 class / type。`paras` 为字符串数组。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 面板四边留白、不贴屏边；按钮纵向全宽

## 7. 预览

`components/drawer/float-scroll/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| drawer-default | components/drawer/default/ |
| drawer-left | components/drawer/left/ |
| drawer-top | components/drawer/top/ |
| drawer-bottom | components/drawer/bottom/ |
| drawer-form | components/drawer/form/ |
| drawer-scroll | components/drawer/scroll/ |
| drawer-float-form | components/drawer/float-form/ |
| drawer-float-scroll | components/drawer/float-scroll/ | （本条）
| drawer-float-login | components/drawer/float-login/ |
| drawer-float-cookie | components/drawer/float-cookie/ |
