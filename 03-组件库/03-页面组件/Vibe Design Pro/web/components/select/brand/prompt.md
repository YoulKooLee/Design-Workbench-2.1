# 品牌选择

> 状态：preview · slug：`select-brand` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「品牌选择」（`select-brand`）。按字母筛选的品牌面板（对照 Admin Brand 选择器）。

成功标准：业务页出现与 §5 一致的真选择控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。多页共用助手（如 `upload-demo.js`）允许交付内**一份**共享脚本。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-trigger` + `.sel-picker` 触发器；面板字母筛选与网格点选；可清除
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`（或家族共享助手）；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局：控件本体；宽度由宿主表单决定（通栏触发器）
- 强调：描边 / 面板跟 Arco / `components.css`（品牌/分类面板见本目录 `component.css`）
- 动效：无；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-trigger
  trigger="click"
  position="bl"
  :popup-visible="open"
  :popup-translate="[0, 4]"
  unmount-on-close
  @popup-visible-change="onVisible"
>
  <div class="sel-picker" :class="{ 'is-open': open, 'has-value': !!value }">
    <span class="sel-picker-value" :class="{ 'is-placeholder': !value }">{{ value || '请选择品牌' }}</span>
    <span v-if="value" class="arco-icon-hover sel-picker-clear wa-icon-clear" role="button" aria-label="清除" @click="clear">
      <icon-close />
    </span>
    <icon-down class="sel-picker-arrow" :class="{ 'is-up': open }" />
  </div>
  <template #content>
    <div class="sel-brand-panel" @click.stop>
      <!-- 字母筛选 + 品牌网格，样式见 component.css -->
    </div>
  </template>
</a-trigger>
```

> 换文案：只改占位与品牌列表汉字；样式见本目录 `component.css`（`.sel-picker` / `.sel-brand-*`；落地并入宿主，勿强制独立 link）。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/select/brand/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------| `select-default` | `components/select/default/` |  |
| `select-multiple` | `components/select/multiple/` |  |
| `select-search` | `components/select/search/` |  |
| `select-create` | `components/select/create/` |  |
| `select-cascader` | `components/select/cascader/` |  |
| `select-tree-select` | `components/select/tree-select/` |  |
| `select-brand` | `components/select/brand/` | （本条） |
| `select-category` | `components/select/category/` |  |
| `select-disabled` | `components/select/disabled/` |  |
