# 页面加载

> 状态：preview · slug：`spin-page` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「页面加载」（`spin-page`）。按钮触发页顶细进度条，模拟路由/整页请求进度。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：按钮触发顶部进度条；进度推进后自动完成并隐藏
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：outline 触发钮；视口顶部 2px 主题色进度条
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-spin-trigger-demo">
  <a-button type="secondary" @click="startPageLoading">页面加载</a-button>
</div>
<div :class="pageBarClass" :style="pageBarStyle" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
<!-- data: pagePhase + pagePct；computed: pageBarClass / pageBarStyle(scaleX)；methods: startPageLoading；样式见同目录 component.css -->
```

> 换文案：只改按钮汉字；进度逻辑并入宿主页 JS。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/spin/page/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `spin-default` | `components/spin/default/` | |
| `spin-dot` | `components/spin/dot/` | |
| `spin-badge` | `components/spin/badge/` | |
| `spin-input` | `components/spin/input/` | |
| `spin-steps` | `components/spin/steps/` | |
| `spin-item` | `components/spin/item/` | |
| `spin-processing` | `components/spin/processing/` | |
| `spin-area` | `components/spin/area/` | |
| `spin-fullscreen` | `components/spin/fullscreen/` | |
| `spin-page` | `components/spin/page/` | （本条） |

