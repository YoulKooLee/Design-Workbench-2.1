# 有效期校验

> 状态：preview · slug：`validate-period` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「有效期校验」（`validate-period`）。未选起止日期时提示，选满两端后消除。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：变更或清空时校验日期范围；placeholder 为长度 2 的数组
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：错误时红描边、浅红底，提示在控件下方
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-form-item label="有效期" required asterisk-position="end" :validate-status="error ? 'error' : undefined" :help="error || undefined">
          <a-range-picker v-model="value" :error="!!error" format="YYYY-MM-DD" :placeholder="['开始日期', '结束日期']" allow-clear @change="validate" @clear="validate"></a-range-picker>
        </a-form-item>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/validate/period/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `validate` | `components/validate/account/` |  |
| `validate-email` | `components/validate/email/` |  |
| `validate-channel` | `components/validate/channel/` |  |
| `validate-period` | `components/validate/period/` | （本条） |
| `validate-submit` | `components/validate/submit/` |  |
