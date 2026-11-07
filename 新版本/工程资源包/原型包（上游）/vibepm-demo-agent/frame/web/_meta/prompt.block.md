# {{中文名}}

> 状态：`skeleton` | `preview` | `stable`  
> slug：`{{slug}}` · 类型：block · 母版：`web` · surface：`marketing` · category：`{{nav|hero|content|pricing|form|social|action|chrome}}`

<!--
复制为 blocks/{slug}/prompt.md。整文件可一键复制给 Agent。
复用单元是整段区段：有母版则复用预览并按 §5 填槽；§7 与预览同构。
无 animations / 关联组件则删 §8。
-->

## 1. 角色与目标

实现「{{中文名}}」（`{{slug}}`），用于 {{一句话场景}}。

成功标准：{{用户一眼能理解什么、下一步点哪里}}。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `blocks/{{slug}}/` → **有则复用预览区段并按 §5 填槽**，勿无故按 §7 重写；动效用交付内 `animations/{{folder}}/`（若有）。
- **B**（无母版 / 其它栈）：只还原区段信息架构与主次 CTA。视觉跟宿主库。禁止未探测到 Arco 时强行 import、禁止外网 CDN。
- **样式落地**：若有同目录 `block.css`，默认将规则并入宿主页 CSS（如 `css/<page>.css`）；**禁止**交付里强制镜像 `blocks/.../block.css` 仅供 link。**例外**：多页明确复用同一区块皮肤时，允许交付内保留一份共享 CSS（如 `css/block-<slug>.css`）。
- **脚本落地**（**仅本条有业务脚本时写**；无则整条删除）：把逻辑**并入**宿主页 `js/<page>.js`；**禁止**镜像母版 `block.js`。预览挂载壳不拷。多页共用允许交付内**一份**共享脚本。

## 3. 约束

- WEB；`surface=marketing` 时勿套 App 侧栏壳 / Pro 运行时；密度跟 `--wa-*` / 宿主主题。禁止外网 CDN；禁止拷 Admin `shell.js` / `routes` / `pro-*`
- **区内控件**：有 `components/` 对应 slug 则**整段粘贴**该成员 §5（含皮肤 class），禁止手写裸 Arco。内容弹窗须 `modal-class="pro-content-modal"`；确认弹窗须 `modalClass: 'pro-confirm-modal'`
- 响应式：{{本条规则}}
- 交互：{{本条规则}}
- 若有私有业务脚本：§2 须有「脚本落地」；勿写死母版路径的 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：{{要点，2～4 条}}
- 动效：{{无 | 仅轻量 CSS}}（重背景见 §8，无则删）
- 颜色：只用 `--wa-*`（若适用）

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| `{{…}}` | … | … |

## 6. 验收

- [ ] 与 §7 / 预览同一区段信息架构与主次 CTA
- [ ] 符合 §3；无 CDN；营销区块未误套 Pro 运行时
- [ ] 区内 `a-modal` / `Modal.*` 已挂组件库皮肤 class（见 §3）；非裸 Arco 默认皮
- [ ] **A 且已有 slug**：已复用 `blocks/{{slug}}/` 填槽，未无故全量重写

## 7. 参考结构（骨架）

与预览区段同构：

```html
<section data-slug="{{slug}}" class="wa-section" id="{{可选锚点}}">
  <div class="wa-section__inner">
    <header>
      <h2>{{headline}}</h2>
      <p>{{lead}}</p>
    </header>
    <!-- … -->
  </div>
</section>
```

## 8. 关联资源（可选）

无则整节删除。

| 类型 | 路径 | 说明 |
|------|------|------|
| component | `components/{{slug}}/` | 区内用到的控件 |
| animations | `animations/{{folder}}/` | 重背景 / 共享动效 |
