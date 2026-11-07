# daisyUI 5 · 语义类名组件（原型栈）

> 接入日期：2026-11-05 ｜ 版本：daisyUI 5.7.50（MIT）｜ 状态：**试点，默认可用**
> 上游真源：`03-组件库/03-页面组件/04-daisyUI/`（68 组件清单、37 主题版预览、接入取舍分析都在那边）

## 这是什么

**没有逐个组件的 React 封装**（没有 `Button/index.tsx` 这种）。daisyUI 是纯 CSS 类名库：直接给元素写 `btn` / `card` / `mockup-browser`，样式就有了。

唯一的 `index.tsx` 是**分类目录页**，不是组件封装——它的存在只为让 Make 组件页签能扫到这个分类（扫描只认 `<分类>/index.tsx`）。

本目录只放这几样东西：

| 文件 | 作用 |
| --- | --- |
| `theme.css` | daisyUI 配置：启用哪些主题、主题色值、排除哪些基础模块（**接入/退出的总开关**） |
| `index.tsx` | **分类目录页**（React）。Make 组件页签只认 `<分类>/index.tsx`，没有它整个分类不会出现在页签里 |
| `index.html` | 上面那页的壳（只做一件事：挂载 `./index.tsx`） |
| `showcase.html` | 4 个区块的组件实拍演示（`s1`~`s4` 锚点），目录页的卡片链到这里 |
| `<组件id>/index.html` | **66 个组件实例页**（按钮/表单/导航/浮层/展示/道具/基础分组）：实例 + 类名 + 场景 + 对应 Codebuddy 组件；由 `03-组件库/03-页面组件/04-daisyUI/_meta/gen-component-pages.mjs` 从 catalog 生成 |
| `pages.json` | 目录页的分组索引（生成器自动产出） |
| `theme.ts` | 主题常量 + `setDaisyTheme()` 小工具，供页面按需 import |

CSS 的引入不在本目录，而在 Tailwind 唯一入口 `../_kit/theme.css` 顶部这一行：

```css
@import "../daisyui/theme.css";
```

## 启用 / 停用

| 想干什么 | 怎么做 |
| --- | --- |
| 默认就在用 | 什么都不用做（模板已接好） |
| 整个工程停用 | 删掉 `_kit/theme.css` 里那行 `@import "../daisyui/theme.css";` |
| 只加主题 | 在 `theme.css` 里复制一段 `@plugin "daisyui/theme" { name: "..."; ... }` |
| 换默认主题 | 把 `default: true` 挪到目标主题上 |

**注意**：`daisyui` 已在模板 `package.json` 的 devDependencies 里。删掉依赖前先执行上面的「停用」，否则编译会报 `Cannot find module daisyui`。

## 怎么用（页面里）

```tsx
// 1) 直接写类名，不需要 import 组件
<button className="btn btn-primary btn-sm">提交审批</button>
<div className="card bg-base-100 border border-base-300">
  <div className="card-body">…</div>
</div>

// 2) 需要主题切换时
import { setDaisyTheme } from '../component-templates/daisyui/theme';
setDaisyTheme('axhub-dark');   // 等价于 document.documentElement.dataset.theme = 'axhub-dark'
```

切换主题 = 给 `<html>` 或任意容器加 `data-theme="axhub-dark"`，**页面 HTML 一个字母都不用改**；同页可以局部嵌套（`<div data-theme="axhub-dark">`）。

## 与现有组件库的关系（重要）

| 做什么 | 用什么 |
| --- | --- |
| 业务页：列表、表单、审批、订单、CMS、工作流 | **Codebuddy Design**（现有组件，能力更全） |
| 展示道具：浏览器/窗口/手机/代码外框、拖动对比 | **daisyUI**（现有库没有） |
| 提案页、官网、活动页、大屏首屏 | daisyUI 的 `hero` / `stat` / `diff` / 主题 |
| 深色模式 | daisyUI 的 `axhub-dark` 主题（现有库没有双主题） |

**别拿 daisyUI 的 `table` 重造现有 DataTable**：daisyUI 的表格只有外观，排序/筛选/多选/分页都没有。

## 已对齐的色值（接进来不改现有观感）

`theme.css` 里的 `axhub` 主题与 `_kit/theme.css` 的 Arco token 逐个对齐：

| 语义 | Arco token | daisyUI 变量 | 值 |
| --- | --- | --- | --- |
| 主色 | `--color-primary` | `--color-primary` | `#165dff` |
| 成功 | `--color-success` | `--color-success` | `#00b42a` |
| 警告 | `--color-warning` | `--color-warning` | `#ff7d00` |
| 危险 | `--color-danger` | `--color-error` | `#f53f3f` |
| 页面底 | `--color-neutral-1` | `--color-base-200` | `#f7f8fa` |
| 文字 | `--color-neutral-10` | `--color-base-content` | `#1d2129` |

实测：同一页里「工具类写成的主按钮」和「`btn btn-primary`」颜色完全一致，截图比对无差异。

## 体积实测（tailwind CLI 同构编译）

| 场景 | 增量 |
| --- | --- |
| 一条使用 `btn / badge / card / input / mockup-browser` 的页面 | **+25 KB raw / +4 KB gzip** |
| 展示页这种一次用到 30+ 组件的页面 | +77 KB raw / +13 KB gzip |
| 68 个组件全用满 | +372 KB raw / +45 KB gzip |

daisyUI 5 **按内容扫描产出组件**：没用到的组件不会进产物（`chat` / `carousel` / `timeline` 这类在轻量页里完全不存在）。所以成本随用量走，不会一接就背 300KB。

## 已知限制

| 项 | 说明 |
| --- | --- |
| 浏览器要求 | 用了 `@scope` / `corner-shape`，需 Chrome 118+ |
| `:root` 底色 | 已用 `exclude: rootcolor` 排除，页面底色仍由原型自己的 `body` 类决定 |
| minify 告警 | 打包时 lightningcss 会对 `@scope` 报 `Invalid empty selector`，产物正常、不影响渲染 |
| 主题数量 | 37 套全开（2026-11-06 起 themes: all，与 04-daisyUI 试点对齐）；axhub 默认，体积增量约 +20KB raw / +4KB gzip |
| 组件深度 | 只到外观层，业务逻辑自备 |
