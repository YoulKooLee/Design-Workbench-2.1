# 悬浮登录抽屉

> 状态：preview · slug：`drawer-float-login` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「悬浮登录抽屉」（`drawer-float-login`）。底部不贴边圆角面板，带拖拽条、居中标题与登录表单。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将母版 `components.css` 中 `.wa-drawer-float*` / `:has(.wa-drawer-float)` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把 `form` 状态**并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-drawer；`placement="bottom"`；`:height="'auto'"`；`:closable="false"`；`body-class="wa-drawer-float wa-drawer-float--bottom"`；标题含拖拽条；表单 `.wa-drawer-float-form`；页脚登录在上、取消在下
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：底部居中不贴边；宽约 360；四角 24px；顶中拖拽条；标题居中；浅底胶囊输入；纵向全宽胶囊按钮
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：标题 `--color-text-1`；说明 `--color-text-3`；取消为中性描边

## 5. 直接粘贴

```html
<a-button type="secondary" @click="visible = true">重新登录</a-button>
<a-drawer
  v-model:visible="visible"
  placement="bottom"
  :height="'auto'"
  :closable="false"
  body-class="wa-drawer-float wa-drawer-float--bottom"
  unmount-on-close
  @cancel="visible = false"
>
  <template #title>
    <div class="wa-drawer-float__head--center">
      <div class="wa-drawer-float__handle" aria-hidden="true"></div>
      <p class="wa-drawer-float__title">登录</p>
      <p class="wa-drawer-float__desc">请重新登录以继续使用应用。</p>
    </div>
  </template>
  <a-form class="wa-drawer-float-form" :model="form" layout="vertical">
    <a-form-item label="邮箱">
      <a-input v-model="form.email" placeholder="hello@example.com" allow-clear></a-input>
    </a-form-item>
    <a-form-item label="密码">
      <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear></a-input-password>
    </a-form-item>
  </a-form>
  <template #footer>
    <a-button type="primary" shape="round" @click="visible = false">登录</a-button>
    <a-button type="secondary" shape="round" @click="visible = false">取消</a-button>
  </template>
</a-drawer>
```

> 换文案：只改汉字，勿改 class / type。`form` 为 `{ email, password }`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 从底部弹出且四边留白；含拖拽条

## 7. 预览

`components/drawer/float-login/index.html`

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
| drawer-float-scroll | components/drawer/float-scroll/ |
| drawer-float-login | components/drawer/float-login/ | （本条）
| drawer-float-cookie | components/drawer/float-cookie/ |
