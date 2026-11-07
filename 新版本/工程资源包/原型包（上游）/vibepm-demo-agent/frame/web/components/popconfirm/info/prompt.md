# 信息气泡确认

> 状态：preview · slug：`popconfirm-info` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「信息气泡确认」（`popconfirm-info`）。信息型确认，适合非删除的一般操作。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将母版 `components.css` 中 Popconfirm / `.wa-popconfirm-*` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把逻辑**并入**宿主页 `js/<page>.js`（或交付内共享模块）；**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-popconfirm；type=info；标题+描述
- 若有私有业务脚本：真源在同目录 `component.js`；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：标题加粗 + 描述弱化；无描边圆角气泡；胶囊页脚
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-popconfirm
  type="info"
  :ok-button-props="{ type: 'primary', shape: 'round', size: 'mini' }"
  :cancel-button-props="{ type: 'secondary', shape: 'round', size: 'mini' }"
  @ok="onOk"
>
  <a-button type="secondary">同步配置</a-button>
  <template #content>
    <div class="wa-popconfirm-title">确认同步？</div>
    <p class="wa-popconfirm-desc">将拉取最新配置并覆盖本地缓存。</p>
  </template>
</a-popconfirm>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/popconfirm/info/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `popconfirm-default` | `components/popconfirm/default/` | |
| `popconfirm-bottom` | `components/popconfirm/bottom/` | |
| `popconfirm-left` | `components/popconfirm/left/` | |
| `popconfirm-right` | `components/popconfirm/right/` | |
| `popconfirm-info` | `components/popconfirm/info/` | |

