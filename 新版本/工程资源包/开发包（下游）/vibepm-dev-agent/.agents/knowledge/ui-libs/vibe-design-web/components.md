# Vibe Design WEB · 组件与区块复用

适用于 `PROJECT_PATH=web/`。气质与信息架构对齐 `frame/web`；实现为 **Vue SFC 对照重写**，禁止粘贴母版 HTML / `window.*`，禁止改 `frame/web`。

规范优先级：`style.md` > `layouts.md` > 本文 > `frontend-design.md` > `pages.md`。图表 → `charts.md`；表格列宽 → `table.md`；跨端 → `cross-end.md`。Arco 控件 API 可按需读 `ui-libs/arco-design-vue/components.md`（勿把 Admin `pro-*` 当 WEB 真源）。

## 协同关系

- 本文负责：区块/组件信息架构、结构同构、版面对齐、响应式、可读性与转化路径、**官网 prompt 落地**。
- `style.md` 负责：`--wa-*` tokens、`common|layouts|pages` 分层、换肤边界。
- `layouts.md` 负责：三壳选型与槽位；壳只放导航，业务区块放 `views/`。
- `recipes.md` 负责：整页骨架优先于从零拆装。

## 官网 prompt 阅读顺序（与 prototype-demo / design-library 对齐）

用户从官网（[www.vibepm.net](https://www.vibepm.net) 设计库）**复制 `prompt.md`**、Gallery「更多」引导粘贴、或点名 slug 时，按下列顺序执行。契约与静态原型包一致；**落地差在 Vue 对照重写，不是粘贴 HTML**。

### `prompt.md` 章节地图

| 节 | 含义 | dev 动作 |
| --- | --- | --- |
| §1 角色与目标 | 中文名 / 场景 / 成功标准 | 写入页注释或组件职责，不改实现路径 |
| §2 实现路径 | A 有母版 / B 无母版；样式落地；脚本落地 | **只走一条**：有 slug 走 A；样式并入工程 CSS；脚本用 Composition API |
| §3 约束 | surface、禁 CDN、Modal 皮肤 class 等 | 全遵守；营销勿套 Pro 运行时 |
| §4 视觉规格 | 布局 / 动效要点 | 服从 `--wa-*` 与 `style.md`；细节可参考 `frontend-design.md` |
| §5 可变槽位 / 直接粘贴 | 组件多为可粘贴 HTML；区块多为填槽表 | **结构同构参考**，改写成 Vue 模板后填槽；禁止原样贴进 `.vue` |
| §6 验收 | 清单 | 并入本文「落地自检」 |
| §7（若有） | 无母版时的还原说明 | **仅未命中 slug** 时使用；命中后禁止无故按 §7 从零重写 |
| §8（若有） | 兄弟形态 / 动效 | 按需；动效落工程内 `animations` 或页级样式，禁 CDN |

### 执行步骤

1. 读 **slug**（提示词头或用户点名）→ 在 `frame/web/blocks|components|layouts/{slug}/`（及工程已迁副本）查找。
2. **命中（路径 A）**：打开母版 `index.html` + 私有 css/js + `prompt.md`；按下方「迁入决策」对照重写；按 §5 换业务文案与槽位；特效：第三方→工程 `public/vendor`（或 README-DEV 约定），本站共用→共享样式/模块，仅本页→`src/styles/pages` / 组件内。
3. **禁止**命中后无故按 §7 从零重写；**禁止**整段粘贴 §5 HTML / 镜像母版 `component.css` 路径。
4. **未命中（路径 B）**：再按 §7（或 §5 信息架构）实现；视觉跟宿主 `--wa-*`；未探测到 Arco 时禁止强行 import。
5. 跑「落地自检」通过后再宣称完成。

与 **demo（prototype-demo）** 的差异一句话：demo 把 DOM/CSS/JS **并入**静态页；dev 把同一结构 **重写为 SFC**，样式进 `src/styles/pages|layouts`，交互进 setup。

## 优先复用源

| 用户 / 规格说法 | 先查 | 工程落地 |
| --- | --- | --- |
| 点名布局壳 | `frame/web/layouts/<slug>/` | 已有壳组件或按 `layouts.md` 增量迁 |
| 点名区块 / Hero / FAQ 等 | `frame/web/blocks/<slug>/` | 抽成 `views` 内区块或 `src/components/web/`；样式进 `src/styles/pages/*` 或组件 scoped |
| 点名控件 / 图表 | `frame/web/components/<slug>/` | Vue 组件 + 页级/组件样式；图表遵 `charts.md` |
| 粘贴官网 `prompt.md` | 上文「阅读顺序」 | 同命中 / 未命中分支 |
| 仅口述、无 slug | 本文「通用原则」+ 最接近壳；再补业务文案 | 勿凭空另起一套视觉系统 |

命中 slug 后：**禁止**无故从零重写；须对照母版 `index.html` + `*.css` + `prompt.md`（若有）再改业务文案与数据。

## 迁入决策（对照重写）

| 母版内容 | 默认落地 | 禁止 |
| --- | --- | --- |
| 区块 / 组件 DOM / prompt §5 | 改写成 Vue 模板，保留关键 class（`wa-*`）与层级；§5 只作同构与填槽 | 整段粘贴 HTML；把橱窗 / `wa-comp-meta` / embed 壳带进业务页 |
| `block.css` / `component.css` / `page.css` | **并入** `src/styles/pages/<页>.css` 或组件旁样式；token 用 `--wa-*` | 在工程里镜像 `frame/web/.../xxx.css` 再硬链母版相对路径 |
| `block.js` / `component.js`（真交互） | Composition API / 组件方法重写 | 拷贝 `WebArco.mount` 预览壳；`<script src>` 指到 `frame/` |
| layout | 只用工程壳组件 | 在 `views` 内再造一套顶栏/侧栏 |
| 多页同皮 / 同助手 | 允许一份共享 CSS 或 `src/components/web` 助手 | 路径跟工程约定，不跟母版目录镜像 |

## 通用原则

- 组件服务于信息传达与转化；允许适度装饰，禁止无业务语义堆砌。
- 使用 WEB 页面语义，不用 APP / 设备框 / ProShell 表达。
- 同页圆角、描边、阴影、字体、按钮状态统一；颜色间距优先 `--wa-*`（`src/styles/common/global.css`）。
- 交互至少覆盖 default / hover / active / disabled；表单另含 focus / error。
- 图标走工程 `plugins/fa-icons`（Classic Pro），勿引入 Sharp；禁止 CDN 字体与外链样式。

## 信息层级

- `H1`：首屏主标题，通常每页一次（约 40–56px）。
- `H2`：一级业务区块（约 28–36px）。
- `H3`：卡片 / 能力点（约 20–24px）。
- 正文主档 `14px` 或 `16px`，辅助 `12px`；正文档位不超过两档。

## 常用模块约束

### Section / 容器

- 业务区块用语义 `section` + 统一内容宽度（桌面主栏约 1080–1280px，常见 1200px）。
- 区块上下留白大于组件内边距；深浅底切换时校验字色与按钮对比。

### Header / Nav

- 优先承载品牌、主导航、核心 CTA；项数克制。
- 吸顶变化克制；移动端折叠须可开可关且不长期挡主内容。

### Hero

- 短时说清「是谁、提供什么、为何可信、下一步」；主次 CTA 清晰，按钮建议 1–2 个。
- 配图优先产品 / 场景；信任元素靠近主信息。

### Button / CTA

- 主钮实底主题色，次钮描边或弱底；用 `button` / `RouterLink` / `a`，不用纯 `div`。
- 同页核心转化文案保持一致；`disabled` 须真正不可点。

### Card / Stats / Logo / Testimonial

- 同组卡片内边距、圆角、边框/阴影策略统一；层次为标题 + 描述 + 辅助/操作。
- 信任模块以结果与身份为主，装饰不压过核心信息。
- 图表取色与挂载遵循 `charts.md`；样板对照 `frame/web/components/chart-*`。
- 表格列宽遵循 `table.md`；外壳 `wa-atable*`。

### Form

- 字段克制；focus 主题色；错误须边框 + 文案；成功/隐私说明可见。
- 禁止裸原生未皮肤化控件顶替已定 Style；反馈用工程内 Message/Modal，禁用 `alert()`。
- Modal / Message：若 prompt §3 写明皮肤 class，保留该 class；勿因此引入 Admin ProShell 运行时。

### FAQ / Footer / Icon

- FAQ 标题可点、展开明确；默认展开服务转化。
- 页脚收口信任与链接，对比度可读。
- 同页图标线性/面性不混用；尺寸分档。

## 响应式与明暗

- 约 375 / 768 抽查：无整页横滚；多列自然单列；导航可点且不挡主 CTA。
- 有明暗时：亮↔暗可切、无闪白/闪黑；暗色对比可读；页级色优先 `--wa-*`。

## 落地自检

按 slug 组装或粘贴 `prompt.md` 后，对**每一个**命中的区块 / 组件勾选；不通过则补齐，勿只交裸结构。

**结构**

- [ ] 与母版预览 / 提示词 §5 **同构**（可换文案与槽位；未乱改标签层级、关键 `wa-*` class、Arco 组件类型）
- [ ] 未带入对照橱窗、`wa-comp-meta`、embed 预览壳

**样式**

- [ ] 母版私有 CSS 已并入工程样式（或约定共享文件）；观感与母版一致
- [ ] 未硬链 `frame/web` 下 css；颜色间距用 `--wa-*`；无 CDN 字体/外链样式
- [ ] §5 必要 inline 布局已保留或等价写入工程 CSS
- [ ] 页级样式在 `pages/` 或组件内，未误挂进 `main.ts` 的全量入口（壳 CSS 随 layout 加载）

**交互**

- [ ] 母版业务交互已用 Vue 重写且可点可反馈（非死按钮）
- [ ] 提示词写了「脚本落地」的条目：该交互可点
- [ ] 未残留 `window.*` / 预览挂载壳 / 镜像 `component.js` 的 script src

**对照**

- [ ] 能与 `frame/web` 对应预览并排比对：结构、样式、关键交互无肉眼偏差（文案除外）

**窄屏与明暗**

- [ ] 约 375 / 768：无整页横滚；多列自然单列；导航可点且不挡主 CTA
- [ ] 有主题切换时：亮↔暗可切；暗色对比可读；页级色优先 `--wa-*`

## 禁止

- 引入 ProShell / Admin CRUD 样板顶替营销或产品站模块（`pro-*` 仅当母版 §3 显式要求的控件皮肤 class 且工程已有等价实现）
- 静默改 `frame/web`；CDN；假数据堆砌干扰主转化
- 命中 slug 后只抄结构、丢掉私有样式与交互
- 同页多套按钮/卡片/表单皮；无意义占位图与喧宾夺主装饰
