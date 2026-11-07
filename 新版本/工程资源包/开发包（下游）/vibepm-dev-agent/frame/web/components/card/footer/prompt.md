# 底栏操作卡片

> 状态：preview · slug：`card-footer` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「底栏操作卡片」（`card-footer`）。`#actions` 底栏放主 / 次胶囊按钮，适合确认发布、Cookie 同意、接受条款等同构场景（换标题与按钮文案即可）。与 `card-actions` 同属底栏操作类，差异只在按钮权重。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/card/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-card；#actions 内 secondary + primary 胶囊按钮；外层 `.wa-acard.wa-acard--footer`
- 私有样式真源在 `components/card/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- Vue 模板内自定义标签勿写成自闭合（如 `</a-card-meta>`、`</a-avatar>`）

## 4. 视觉规格

- 布局 / 层级 / 强调：底栏右对齐；次按钮描边浅填，主按钮实心胶囊
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `components/surface-fx`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-card class="wa-acard wa-acard--footer" title="发布确认" style="width:320px">
  <p class="wa-acard-desc">发布后将对所有成员可见，请确认文案与素材无误。</p>
  <template #actions>
    <a-button type="secondary" size="small" shape="round">取消</a-button>
    <a-button type="primary" size="small" shape="round">确认发布</a-button>
  </template>
</a-card>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。Cookie 同意等：改 title / 正文 / 按钮文字即可，结构不变。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/card/footer/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `card-default` | `components/card/default/` | |
| `card-hoverable` | `components/card/hoverable/` | |
| `card-shadow` | `components/card/shadow/` | |
| `card-bordered` | `components/card/bordered/` | |
| `card-actions` | `components/card/actions/` | |
| `card-footer` | `components/card/footer/` |  （本条） |
| `card-extra` | `components/card/extra/` | |
| `card-tabs` | `components/card/tabs/` | |
| `card-cta` | `components/card/cta/` | |
| `card-dark` | `components/card/dark/` | |
| `card-form` | `components/card/form/` | |
| `card-cover` | `components/card/cover/` | |
