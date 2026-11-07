# 可悬浮列表

> 状态：preview · slug：`list-hoverable` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「可悬浮列表」（`list-hoverable`）。条目悬停高亮，适合可点击的选择列表。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/list/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-list；`hoverable`；`#avatar` 用 FA 图标
- 私有样式真源在 `components/list/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- Vue 模板内自定义标签勿写成自闭合（如 `</a-list-item-meta>`、`</a-avatar>`）

## 4. 视觉规格

- 布局 / 层级 / 强调：悬停底色；图标元信息行；图标无底、保留 `border-3` 描边
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-list class="wa-list" :bordered="false" hoverable>
  <a-list-item v-for="(item, i) in listItems" :key="i">
    <a-list-item-meta :title="item.title" :description="item.desc">
      <template #avatar>
        <a-avatar class="wa-list-avatar" :size="36">
          <component :is="item.icon" :size="15"></component>
        </a-avatar>
      </template>
    </a-list-item-meta>
  </a-list-item>
</a-list>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。若使用 `listItems`，在页面 setup 中提供同构数据。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/list/hoverable/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `list-default` | `components/list/default/` | |
| `list-meta` | `components/list/meta/` | |
| `list-action` | `components/list/action/` | |
| `list-hoverable` | `components/list/hoverable/` | （本条） |
| `list-header` | `components/list/header/` | |
| `list-empty` | `components/list/empty/` | |
