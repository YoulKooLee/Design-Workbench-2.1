# 表单抽屉

> 状态：preview · slug：`drawer-form` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「表单抽屉」（`drawer-form`）。右侧编辑资料面板：头像、胶囊输入与全宽保存。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将母版 `components.css` 中 `.wa-drawer-profile*` / `.wa-drawer-float-form` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把 `form` 状态**并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-drawer + a-form；`body-class="wa-drawer-profile"`；头像行 + 胶囊输入；页脚仅全宽「保存」
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：右侧 400px；头像 56 +「更换头像」；浅底胶囊输入；页脚单颗全宽胶囊主按钮
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：标题 `--color-text-1`；头像底 `--color-fill-2`；输入浅底

## 5. 直接粘贴

```html
<a-button type="secondary" @click="visible = true">编辑资料</a-button>
<a-drawer
  v-model:visible="visible"
  title="编辑资料"
  :width="400"
  body-class="wa-drawer-profile"
  unmount-on-close
  @cancel="visible = false"
>
  <div class="wa-drawer-profile__avatar">
    <a-avatar :size="56">JD</a-avatar>
    <a-button type="text" class="wa-drawer-profile__change">更换头像</a-button>
  </div>
  <a-form class="wa-drawer-float-form" :model="form" layout="vertical">
    <a-form-item label="姓名">
      <a-input v-model="form.name" placeholder="请输入姓名" allow-clear></a-input>
    </a-form-item>
    <a-form-item label="邮箱">
      <a-input v-model="form.email" placeholder="请输入邮箱" allow-clear></a-input>
    </a-form-item>
    <a-form-item label="手机号">
      <a-input v-model="form.phone" placeholder="请输入手机号" allow-clear></a-input>
    </a-form-item>
    <a-form-item label="密码">
      <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear></a-input-password>
    </a-form-item>
    <a-form-item label="确认密码">
      <a-input-password v-model="form.password2" placeholder="请再次输入密码" allow-clear></a-input-password>
    </a-form-item>
  </a-form>
  <template #footer>
    <a-button type="primary" shape="round" @click="visible = false">保存</a-button>
  </template>
</a-drawer>
```

> 换文案：只改汉字，勿改 class / type。`form` 为 `{ name, email, phone, password, password2 }`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 含头像行与全宽保存按钮

## 7. 预览

`components/drawer/form/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| drawer-default | components/drawer/default/ |
| drawer-left | components/drawer/left/ |
| drawer-top | components/drawer/top/ |
| drawer-bottom | components/drawer/bottom/ |
| drawer-form | components/drawer/form/ | （本条）
| drawer-scroll | components/drawer/scroll/ |
| drawer-float-form | components/drawer/float-form/ |
| drawer-float-scroll | components/drawer/float-scroll/ |
| drawer-float-login | components/drawer/float-login/ |
| drawer-float-cookie | components/drawer/float-cookie/ |
