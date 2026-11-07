# 提交校验

> 状态：preview · slug：`validate-submit` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「提交校验」（`validate-submit`）。点击校验后未填字段标红，清空后恢复。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。多页共用助手（如 `upload-demo.js`）允许交付内**一份**共享脚本。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：失焦校验单字段；校验检查全部；清空恢复空白
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`（或家族共享助手）；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：错误时红描边、浅红底，提示在控件下方
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-form class="wa-form" :model="form" layout="vertical">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="12">
              <a-form-item label="账号名称" required asterisk-position="end" :validate-status="errors.account ? 'error' : undefined" :help="errors.account || undefined">
                <a-input v-model="form.account" :error="!!errors.account" placeholder="请输入账号名称" allow-clear @blur="validateField('account')" @clear="validateField('account')"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="12">
              <a-form-item label="邮箱地址" required asterisk-position="end" :validate-status="errors.email ? 'error' : undefined" :help="errors.email || undefined">
                <a-input v-model="form.email" :error="!!errors.email" placeholder="name@example.com" allow-clear @blur="validateField('email')" @clear="validateField('email')"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="12">
              <a-form-item label="投放渠道" required asterisk-position="end" :validate-status="errors.channel ? 'error' : undefined" :help="errors.channel || undefined">
                <a-select v-model="form.channel" :options="options" :error="!!errors.channel" placeholder="请选择投放渠道" allow-clear @change="validateField('channel')" @clear="validateField('channel')"></a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="12">
              <a-form-item label="有效期" required asterisk-position="end" :validate-status="errors.period ? 'error' : undefined" :help="errors.period || undefined">
                <a-range-picker v-model="form.period" :error="!!errors.period" format="YYYY-MM-DD" :placeholder="['开始日期', '结束日期']" allow-clear @change="validateField('period')" @clear="validateField('period')"></a-range-picker>
              </a-form-item>
            </a-col>
          </a-row>
          <a-space>
            <a-button type="primary" status="danger" @click="validateAll">校验</a-button>
            <a-button type="secondary" @click="clearValidate">清空校验</a-button>
          </a-space>
        </a-form>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/validate/submit/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `validate` | `components/validate/account/` |  |
| `validate-email` | `components/validate/email/` |  |
| `validate-channel` | `components/validate/channel/` |  |
| `validate-period` | `components/validate/period/` |  |
| `validate-submit` | `components/validate/submit/` | （本条） |
