# Web Prototype 模板技能（中文翻译版）

> 原文：`design-templates/web-prototype/SKILL.md`（模板注入示例）
> 性质：条件注入——新建原型项目「Start from template」选定本模板时，本 SKILL.md 替换默认 prototype 技能成为项目主技能
> 注入声明：`od.mode: prototype`、`od.platform: desktop`、`od.design_system.requires: true`、`od.preview.entry: index.html`
> 翻译：豆包，2026-10-23。类名/标记/命令保留原文。

---

```yaml
name: web-prototype
description: |
  通用桌面 Web 原型。复制种子 `assets/template.html` 并粘贴 `references/layouts.md`
  的区块布局，产出单文件自包含 HTML。任何落地页/营销页/文档页/SaaS 页在无更
  特定技能匹配时的默认选择。
triggers:
  - "prototype"
  - "mockup"
  - "landing"
  - "single page"
  - "marketing page"
  - "homepage"
od:
  mode: prototype
  platform: desktop
  scenario: design
  preview:
    type: html
    entry: index.html
  design_system:
    requires: true
    sections: [color, typography, layout, components]
```

# Web Prototype 技能

使用捆绑的种子与布局库产出一个单文件、自包含的 HTML 原型——**而不是从零写 CSS**。种子已编码良好的默认值（排版、间距、强调色预算）。你的工作是**组装**它。

## 资源地图

```
web-prototype/
├── SKILL.md                ← 你正在读的这份
├── assets/
│   └── template.html       ← 种子：tokens + class 系统 + chrome（先读它）
└── references/
    ├── layouts.md          ← 8 个可直接粘贴的区块骨架
    └── checklist.md        ← P0/P1/P2 自检
```

## 工作流

### 步骤 0 —— 预检（写任何东西之前做一次）

1. **从头到尾读 `assets/template.html`**——至少读到 `<style>` 块结束。`references/layouts.md` 顶部的 class 清单列出了必须在那里定义的每个 class；缺了就在 `<style>` 里补，而不要在每个区块上内联重新定义。
2. **读 `references/layouts.md`**，知道存在哪些区块骨架。不写未被覆盖的区块类型——选最接近的布局并适配。
3. **读激活的 DESIGN.md**（已注入你的系统提示）。把它的颜色映射到种子里的六个 `:root` 变量；不引入新 token。

### 步骤 1 —— 从种子准备 `index.html`

用 `assets/template.html` 作为规范项目文件（通常是 `index.html`）的种子。

替换六个 `:root` 变量为激活设计系统的 token。替换页面 `<title>` 与顶部导航品牌。

### 步骤 2 —— 规划区块清单

**先选布局、再写文案。** 默认节奏（来自 `layouts.md`）：

| 页面类型 | 默认节奏 |
|---|---|
| Landing | 1 hero → 3 features → 4 stats *或* 5 quote → custom split → 6 cta |
| Marketing / editorial | 1 hero-center → 7 log list → 6 cta |
| Pricing | 1 hero-center → 8 comparison table → 6 cta |
| Docs index | 1 hero-center → 7 log list（文档分节）→ 6 cta |

**写之前**用一句话向用户说明所选清单——现在纠偏成本低，不要在写了 200 行 HTML 之后才改。

### 步骤 3 —— 粘贴并填充

对每个选中的布局，把 `layouts.md` 里的 `<section>` 块复制进项目 HTML 的 `<main id="content">`。把方括号 `[REPLACE]` 字符串替换为来自用户 brief 的真实、具体文案。**不要填充物**——若某个槽是空的，说明这个区块选错了，换一个布局。把每个 `.ph-img` 块当作布局脚手架，区块需要图像时替换它，自检前先遵循下方"真实优先"规则。

### 步骤 4 —— 自检

从头到尾过一遍 `references/checklist.md`。每个 P0 项必须先通过再继续。P1 项应通过；P2 是加分项。

### 步骤 5 —— 写入项目文件

把完成的 HTML 写入规范项目文件（通常是 `index.html`）。然后发一条简短普通助手总结，说明文件名并描述内容。**不要在对话里输出完整 HTML 源码。**

## 硬规则（种子已保护大部分——不要对抗它）

- **单一强调色，每屏最多用两次。** Eyebrow + 主 CTA 是默认预算。
- **展示字体用衬线体**（种子中为 Iowan Old Style / Charter / Georgia）。正文用无衬线。等宽用于数字、说明与 eyebrow。
- **真实图像，绝不远程 hotlink。** `.ph-img` 是临时布局脚手架，不是默认最终处理。对具名真实指称物：搜索/获取正确的真实图像、复制进项目、相对引用；绝不生成、绘制或编造替代品。对插画/氛围类主体：优先合适的真实摄影，图像生成只作回退。获取不到合规资产时，保留一个有意的、带标注的 `.ph-img` 并在交付总结中披露限制。
- **保留真实图像几何。** 检查每张获取图像的内在宽高，用 `<img class="content-img">` 替换整个 `.ph-img` 脚手架，并设置匹配的 `width`/`height` 属性。绝不把 `.ph-img`、`.wide`、`.portrait` 或 `.square` 复制到真实图像上。内容图必须显示完整画面；`object-fit: cover` 只用于可刻意裁切的装饰填充。种子的 `.content-img` 规则把异常高或宽的图像约束到视口内、另一轴保持自动。
- **移动端重排已生效**——种子的 920px 媒体查询负责。别用固定宽度破坏它。
- **每个 `<section>` 上带 `data-od-id`**——注释模式要定位它。

## 输出契约

文件系统运行以项目文件为真相来源：

```
index.html
```

OpenDesign 从写盘的项目文件推导预览。**同一生成轮不要另外发 `source-code <artifact>` 块。**

写盘后发一条简短总结。之后不再输出任何内容。

---

## 随附文件（原版已归档，未全文翻译）

| 文件 | 说明 |
|---|---|
| `assets/template.html` | 种子：`:root` 六个 token 变量（强调色/中性色/字体/圆角/阴影）+ class 系统 + 920px 断点 + chrome（顶导航/hero/页脚骨架） |
| `references/layouts.md` | 8 个区块骨架：1 hero / 2 hero-center / 3 features / 4 stats / 5 quote / 6 cta / 7 log list / 8 comparison table；顶部 class 清单（必须全部在 `<style>` 定义） |
| `references/checklist.md` | P0/P1/P2 自检清单（P0：单一强调色、无 hotlink、section 带 data-od-id、真实文案等） |
