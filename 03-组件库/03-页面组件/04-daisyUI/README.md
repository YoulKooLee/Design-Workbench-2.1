# 04-daisyUI — 组件库试点（WorkBuddy，2026-11-05）

> 来源：`https://mp.weixin.qq.com/s/V0zH4UDEzHFwJArbffiUqQ`（daisyUI：自带 35 套主题的组件库）
> 定位：**试点**（`status = pilot`），不是 ready 库，不参与 `smoke-test` 的 ready 校验，也不进任何工程的运行时依赖。

## 一句话结论

**能补位，不能替代。** daisyUI 是「语义类名 + 主题变量」的纯 CSS 库，最值钱的是**换肤**和**展示道具**两块；Codebuddy Design 是「React 源码组件」，最值钱的是**业务深度**（DataTable 的排序/选择、审批流、订单、CMS）。两者是上游/下游关系，不是二选一。

| 结论项 | 判断 | 依据 |
| --- | --- | --- |
| 换肤能力 | ✅ 明显强于现有 | 37 套主题，改 `data-theme` 即换；同一页可嵌套多主题 |
| 组件能力深度 | ⚠️ 浅 | 表格无排序/多选/虚拟滚动；分页要自己算；无权限、无业务组件 |
| 接入成本 | ✅ 低 | 一份 CSS + 类名，无 JS 运行时；React/Vue/HTML 都能用 |
| 做低保真原型 | ✅ 好用 | `wireframe` 主题 + 68 组件，30 分钟能出一套线框 |
| 替代 Codebuddy Design | ❌ 不行 | 缺业务组件层，业务页要重写一遍 |

## 目录结构

```text
03-组件库/03-页面组件/04-daisyUI/
├── preview.html              ← 【先看这个】自包含单文件，双击即开，无需服务/无需依赖
├── index.json                ← 库登记（对齐 Codebuddy Design 的 index.json 结构）
├── package.json              ← 只用于构建，npm 依赖不进工程
├── src/
│   ├── input.css             ← 全量构建入口：35 内置主题 + axhub / axhub-dark
│   └── input-lite.css        ← 精简构建入口：2 内置 + 2 自定义（体积对比用）
├── demo/
│   └── index.html            ← 演示页源文件（7 个区块，45+ 组件实测）
├── dist/
│   ├── daisyui.css           ← 全量产物（37 主题）
│   └── daisyui-lite.css      ← 精简产物（4 主题）
├── _meta/
│   ├── components.catalog.json ← 68 组件 → 类名 / 结构 / 场景 / 与 Codebuddy Design 的对应关系
│   ├── themes.json           ← 37 主题清单（明/暗 + 适用场景）
│   ├── manifest.json         ← 库元数据
│   ├── build-preview.mjs     ← demo + dist → preview.html（内联 CSS）
│   └── preview-shot.png      ← 本次验收截图（1440 宽整页）
└── agent-skill/
    └── llms.txt              ← 官方给 AI Agent 的技能文件（68 组件类名真源，79KB）
```

## 跑起来（3 步）

```bash
cd 03-组件库/03-页面组件/04-daisyUI
npm install                      # 只装构建工具：tailwindcss + @tailwindcss/cli + daisyui
npm run build                    # src/input.css → dist/daisyui.css（全量 37 主题）
node _meta/build-preview.mjs     # dist + demo → preview.html（内联，可分发）
```

日常只看效果：**双击 `preview.html`**，右上角下拉切 37 套主题，弹窗 / 下拉 / 拖动对比都能点。

## 在工程里怎么用

| 场景 | 做法 |
| --- | --- |
| 静态 HTML 原型（01-项目 里的 html 页） | 把 `dist/daisyui-lite.css` 拷进工程，`<link>` 引入，按类名写页面 |
| React 原型工程 | 同样引 CSS；组件仍用 Codebuddy Design 的 tsx，只在需要 daisyUI 特效（mockup / diff / aura）时加类名 |
| 让 AI 按同一套类名写页面 | 把 `agent-skill/llms.txt` 作为技能喂给 Agent，产出会自然收敛到同一套类名 |
| 只想要主题系统 | 抄 `src/input.css` 里的 `@plugin "daisyui/theme"` 两段（axhub / axhub-dark） |

## ✅ 已接入原型开发栈（2026-11-05）

不是"能不能接"，已经接进去了，走的是 **Tailwind 插件**方式（不是拷预编译 CSS），原因是只有这样 daisyUI 才能**按页面用量产出组件**，而不是一接就背 372 KB。

改动了 3 处（均已备份到 `04-维护台账/archive/2026-11-05-daisyui-接入/`）：

| # | 文件 | 改动 |
| --- | --- | --- |
| 1 | `02-模板/_project-template/package.json` | devDependencies 增加 `"daisyui": "^5.7.50"` |
| 2 | `02-模板/_project-template/src/component-templates/_kit/theme.css` | 顶部加一行 `@import "../daisyui/theme.css";` |
| 3 | `src/component-templates/daisyui/`（新建） | `theme.css`（配置+主题）/ `index.html`（展示页）/ `index.ts`（主题常量+切换工具）/ `README.md` |

外加 `AGENTS.md` 的按需读取地图加了一行指引。

**停用只要删掉第 2 处那一行 `@import`**，其余文件留着不占体积（未被引用就不编译）。

实测（与模板同构的 tailwind 编译）：

| 场景 | 增量 | 说明 |
| --- | --- | --- |
| 用 `btn/badge/card/input/mockup-browser` 的页面 | **+25 KB raw / +4 KB gzip** | 未用组件不产出 |
| 展示页（一次 30+ 组件） | +77 KB raw / +13 KB gzip | |
| 68 组件全用满 | +372 KB raw / +45 KB gzip | 极端上限 |

色彩零漂移：`axhub` 主题与 Arco token 逐值对齐，同页「工具类按钮」与「`btn btn-primary`」颜色实测一致（截图见 `_meta/stack-page.png`）。
另外用 `exclude: rootcolor` 排除了 daisyUI 对 `:root` 的 `background-color` 接管，页面底色仍归原型自己管。

## 实测数据

| 指标 | 全量（37 主题） | 精简（4 主题） |
| --- | --- | --- |
| 原始体积 | 212 KB | 174 KB |
| **gzip 体积** | **32 KB** | **25 KB** |
| 组件数 | 68（本页实测 45+） | 68 |
| JS 运行时 | 0 | 0 |
| 第三方依赖 | 0（构建期只有 tailwind + daisyui） | 同 |

> 体积结论：压缩后 32 KB 换来整套组件+37 主题，可接受；只留 4 主题能再省 7 KB。真正贵的是 Tailwind 4 这条前提（工程必须已经在 Tailwind 4 上）。

## 与 Codebuddy Design 的关系

| 维度 | daisyUI（本试点） | Codebuddy Design |
| --- | --- | --- |
| 形态 | 纯 CSS 类名 | React tsx 源码 |
| 消费方式 | 引 CSS + 写类名 | 整目录复制 + import |
| 组件数 | 68（通用 UI） | 143（通用 45 + 业务 98） |
| 主题 | 37 套，`data-theme` 切换 | 1 套 Arco 色板（`_kit/theme.css`） |
| 业务深度 | 无 | 订单/付款/CMS/工作流/物联网/园区/办公 |
| 依赖 | 0 | 0（例外：WorkflowCanvas 需 @xyflow/react） |

覆盖度（68 组件逐条比对，明细见 `_meta/components.catalog.json`）：

| 判断 | 数量 | 含义 |
| --- | --- | --- |
| 覆盖 | 38 | Codebuddy Design 有等价组件（按钮/表单/卡片/表格…） |
| 补充 | 7 | 有但更弱（表格无排序分页、上传无拖拽…） |
| 独有 | 23 | 现有库没有（mockup 四件套、diff、hover-3d、aura、chat、swap、dock、fab…） |

## 已知限制与风险

| 风险 | 说明 | 应对 |
| --- | --- | --- |
| 组件能力浅 | `table` 只是表格皮，排序/筛选/多选/分页全靠自己 | 业务列表仍走 Codebuddy Design 的 DataTable |
| 浏览器要求 | daisyUI 5 用了 `@scope` / `corner-shape`，需较新 Chrome（118+） | 本机 Chrome 正常；要兼容老浏览器就别用 |
| 必须 Tailwind 4 | v5 不支持 Tailwind 3 / `tailwind.config.js` | 老工程先升 Tailwind，别混用 |
| 构建告警 | `--minify` 时 lightningcss 对 `@scope` 报 "Invalid empty selector"，产物可用 | 已确认不影响渲染；正式接入可去掉 `--minify` 用普通压缩 |
| 首屏闪烁 | `data-theme` 靠 JS 或服务端写死，晚设会闪一下 | 在 `<html>` 上直接写死主题，或头部内联脚本先设 |
| 视觉同质化 | 37 套主题都是 daisyUI 的"味道"，不是 Arco 的味道 | 已用 `axhub` 主题贴近现有色板；要 1:1 对齐仍需逐组件微调 |

## 维护

- 改演示页 → `demo/index.html` → `npm run build` → `node _meta/build-preview.mjs`（三步，别只改 preview.html，它会被覆盖）
- 组件/主题清单真源：`_meta/components.catalog.json`、`_meta/themes.json`
- 库状态：`./index.json` + `../component-registry.json` 的 `pilotLibs`
- 验收截图：`_meta/preview-shot.png`（整页）

## 下一步建议（待拍板）

1. **只借主题**：把 `axhub` / `axhub-dark` 两段主题变量搬进 Codebuddy Design 的 `_kit/theme.css`，先让现有库支持双主题 —— 改动最小、收益最直接。
2. **只借道具**：把 `mockup-*` / `diff` / `aura` 几段 CSS（约 6 KB）抄进现有库，用于提案页 —— 不动组件体系。
3. **整库试点**：挑一个纯展示型项目（大屏/官网/活动页）用 daisyUI 从零做一版，和现有栈做真实工期对比。

> 三条互斥程度低，建议先做 1，再看 3。
