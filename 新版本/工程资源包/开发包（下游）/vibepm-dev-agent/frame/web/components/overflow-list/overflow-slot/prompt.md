# 自定义折叠项

> 状态：preview · slug：`overflow-list-overflow-slot` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「自定义折叠项」（`overflow-list-overflow-slot`）。用 `#overflow` 槽自定义 `+N`，并用气泡展示被折叠标签。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把「按折叠数量截取尾部标签」的逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-overflow-list + `#overflow` + a-popover；须给列表明确宽度
- 槽位只提供 `number`（折叠个数），被折叠项需业务侧自行按数据源截取（尾部折叠用 `slice(-number)`）
- 若有私有业务脚本：真源在同目录 `component.js`；§2 须有「脚本落地」；勿在 §5 写独立 script src
- 禁止外链 CDN 图片；示例可用本地质感图或 data URI

## 4. 视觉规格

- 布局：固定示例宽 `240px`（演示用）；业务页改为宿主容器宽
- 折叠入口：Tag 形态 `+N`，悬停/点击弹出气泡列出被折叠项
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-overflow-list style="width:240px">
  <a-tag v-for="t in tags" :key="t">{{ t }}</a-tag>
  <template #overflow="{ number }">
    <a-popover position="top">
      <a-tag>+{{ number }}</a-tag>
      <template #content>
        <div style="display:flex;flex-wrap:wrap;gap:8px;max-width:220px">
          <a-tag v-for="t in overflowEnd(number)" :key="t">{{ t }}</a-tag>
        </div>
      </template>
    </a-popover>
  </template>
</a-overflow-list>
```

> 需在页面 setup 提供 `tags` 与 `overflowEnd(number)`（尾部折叠：`tags.slice(-number)`）。换文案只改标签汉字；落地时把 `240px` 换成宿主容器宽。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 悬停/点击 `+N` 可看到被折叠标签

## 7. 预览

`components/overflow-list/overflow-slot/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `overflow-list-default` | `components/overflow-list/default/` | |
| `overflow-list-from-start` | `components/overflow-list/from-start/` | |
| `overflow-list-overflow-slot` | `components/overflow-list/overflow-slot/` | （本条） |
