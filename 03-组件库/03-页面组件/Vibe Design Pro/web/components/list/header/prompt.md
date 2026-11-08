# 带页眉列表

> 状态：preview · slug：`list-header` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「带页眉列表」（`list-header`）。列表头/尾说明区，适合团队成员与分组清单。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/list/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-list；`#header` / `#footer`；成员行用 `icon-user`
- 私有样式真源在 `components/list/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- Vue 模板内自定义标签勿写成自闭合（如 `</a-list-item-meta>`、`</a-avatar>`）

## 4. 视觉规格

- 布局 / 层级 / 强调：顶栏标题说明 + 成员行 + 底栏邀请；成员图标无底、保留 `border-3` 描边
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-list class="wa-list wa-list--panel" :bordered="true">
  <template #header>
    <div class="wa-list-panel__head">
      <div class="wa-list-panel__title">团队成员</div>
      <div class="wa-list-panel__desc">邀请同事一起协作。</div>
    </div>
  </template>
  <a-list-item v-for="(item, i) in teamItems" :key="i">
    <a-list-item-meta :title="item.title" :description="item.desc">
      <template #avatar>
        <a-avatar class="wa-list-avatar" :size="36">
          <component :is="item.icon" :size="15"></component>
        </a-avatar>
      </template>
    </a-list-item-meta>
  </a-list-item>
  <template #footer>
    <a-button type="secondary" size="small" long>
      <template #icon><icon-plus></icon-plus></template>
      邀请成员
    </a-button>
  </template>
</a-list>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。若使用 `listItems`，在页面 setup 中提供同构数据。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/list/header/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `list-default` | `components/list/default/` | |
| `list-meta` | `components/list/meta/` | |
| `list-action` | `components/list/action/` | |
| `list-hoverable` | `components/list/hoverable/` | |
| `list-header` | `components/list/header/` | （本条） |
| `list-empty` | `components/list/empty/` | |
