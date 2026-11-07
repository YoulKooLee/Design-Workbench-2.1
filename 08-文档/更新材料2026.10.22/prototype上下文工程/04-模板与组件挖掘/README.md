# 04 · Prototype 模板与组件挖掘

> 来源：`D:\Github开源项目\open-design`
> 归档时间：2026-10-23 · 归档人：豆包（产品线维护方）
> 范围：prototype 任务的**模板**（design-templates，60 个 mode=prototype）与**组件**（design-systems 152 个设计系统包 + assets/frames 6 个设备外壳 + skills 组件类技能）

## 核心结论

1. **模板**：design-templates 共约 130 个模板，其中 **60 个 mode=prototype**（其余为 deck 约 40 / video / image / audio / template）。prototype 模板 = SKILL.md（frontmatter 声明 + 工作流）+ example.html（示例成品）；复杂模板带种子 `assets/template.html` + `references/layouts.md` + `checklist.md`。
2. **组件 = 设计系统包（design-systems）**：152 个品牌/主题包，统一 schema `od-design-system-project/v1`。每包 = DESIGN.md（视觉意图）+ tokens.css（`:root` CSS 变量，粘贴即用）+ design-tokens.json + tailwind-v4.css + **components.html（可执行组件 fixture）** + components.manifest.json（组件清单）+ USAGE.md（读序）+ preview/ + source/ + system/kit。
3. **注入机制**：模板声明 `od.design_system.requires: true` 强制绑定设计系统（sections: color/typography/layout/components）；`craft.requires` 声明注入 craft 规则；agent 先读 USAGE → DESIGN → 粘贴 tokens.css → 按 components.manifest 复用组件，**禁裸 hex、禁新造组件**。
4. **工作台映射**：这套体系与 `03-组件库\03-页面组件`（组件 + 主题 + 页面模板）高度同构——tokens.css→主题变量、components.html→组件 fixture、DESIGN.md→设计规范、USAGE.md→使用说明；设备外壳 frames 对应 device-frame 资产。

## 目录结构

```
04-模板与组件挖掘/
├── README.md                            ← 本文件
├── 01-prototype模板清单.md               ← 60 个模板分类表 + 模板构成解析 + 精选模板要点
├── 02-组件体系-design-systems.md         ← 152 包统一 schema + 包内文件解析 + 注入机制 + 工作台映射
├── 03-精选模板-原版/                     ← 6 个代表性模板（SKILL.md + example.html）
│   ├── dashboard / wireframe-annotated / mobile-app / saas-landing / kanban-board / pricing-page
├── 04-精选设计系统-原版/shadcn/          ← shadcn 全套（manifest/DESIGN/tokens/tailwind/components.html/…/system kit）
├── 05-设备外壳-原版/                     ← assets/frames 6 个：iphone-15-pro/android-pixel/browser-chrome/ipad-pro/macbook
└── 06-精选模板-翻译版/                   ← 4 份 SKILL.md 中文全文翻译
```

## 可借鉴到工作台的点

| open-design 资产 | 工作台对标 |
|---|---|
| 60 个 prototype 模板（SKILL + example + seed + layouts + checklist） | 02-模板 页面模板 / 03-组件库 页面模板：模板 = 技能声明 + 种子 + 布局骨架 + 自检清单 |
| design-systems 152 包（DESIGN + tokens + components + USAGE） | 03-组件库\03-页面组件 主题包结构：设计规范 + 令牌变量 + 组件 fixture + 使用说明 |
| craft.requires 按模板声明注入 | 组件模板 frontmatter 声明依赖规则 |
| components.html 可执行组件 fixture | 组件库组件（index.html + index.tsx 双形态） |
| assets/frames 设备外壳（iPhone 15 Pro 等 6 个） | device-frame 资产（03-组件库 可选） |
| inputs/parameters 模板表单（如 saas-landing 的 product_name/tagline） | 新建项目向导参数化模板 |
| wireframe-annotated（红线条注线框 + SPEC PANEL） | 工作台 annotation 标注体系（线框→标注→规格面板） |
