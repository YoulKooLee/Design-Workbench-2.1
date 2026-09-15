# 01-switch-to-sketch 页面规格说明

## 1. 业务与功能

### 1.1 页面/元素定位与核心目标
- **类型**：产品营销落地页 (Landing Page)
- **目标**：说服用户从其他设计软件（如 Figma 或 Adobe XD）迁移到 Sketch，强调其全能性（Mac 客户端与 Web 客户端）、生态、协作能力以及简单的订阅模式。

### 1.2 功能清单
- **全局导航（Header）**：Logo，下拉菜单（Product, Learn 等），基础导航连接，Support 菜单，登录与注册 CTA。
- **英雄首屏（Hero Section）**：高亮标语 "Why switch to Sketch?" 搭配背景动感抽象图形（由菱形、扇形组成），上方小跑马灯或横幅通知。
- **核心卖点呈现**：通过白底的多栏图文卡片组件，展示 Sketch 是跨平台的（Mac & Web）。
- **工作流与协作展示**："The future is bright" 深色区，展示新特性面板；"Getting started has never been easier" 新手引导。
- **导师与教程**：带视频播放按钮的横向大卡片。
- **透明定价（Pricing）**：3张紫色插画卡片（免费编辑者、统一价格、教育免费）。
- **用户评价（Testimonials）**：Twitter / X 的用户推文格式展现社交证明。
- **底部导流与常见问题（FAQ）**：折叠面板与大底色模块（绿白渐变）的 "Kickstart your Sketch journey" CTA。
- **全局页脚（Footer）**：深链接区块及订阅 Newsletter。

### 1.3 交互要点
- 各个卡片和 CTA 按钮 (Button) 需带有 Hover 动画（如背景变深，或内容轻微上移、产生阴影）。
- Navigation 悬停需展开下拉（此实现可以用简化的直接悬停显色）。
- FAQ 模块为 Accordion 折叠面板（默认展开或支持点击展开）。

## 2. 内容规划

### 2.1 信息架构与模块划分
1.  **Top Banner**：黄底，提示最新版本信息
2.  **Navigation**：白底导航
3.  **Hero Title**：超大标题 "Why switch to Sketch?"
4.  **Twin Platforms**："Sketch is a Mac app. And a web app."
5.  **Features Grid 1**：实时协作、浏览器工具、iPhone应用、文件安全等。
6.  **"We do things our way"**：创始人理念横幅。
7.  **Dark Mode "The future is bright"**：深色背景，What's New 列表与大图。
8.  **Learning & Community**：文章缩略图及 "Learn with Joseph"。
9.  **Transparent Pricing**：三栏式定价特色。
10. **Testimonials**：评价瀑布流。
11. **FAQ & Final CTA**：灰色背景 FAQ + 绿色底色的订阅行动呼唤。
12. **Footer**：包含邮件订阅框。

## 3. 布局与结构

- **整体布局模式**：全宽背景（Full-bleed Backgrounds）+ 内容限宽居中（Max-width Container: 常规 1200px）
- **间距**：不同模块间需要巨大的留白 (padding-y: 96px 或 120px) 保证呼吸感。
- **网格**：
  - 功能卡片常使用 2 columns 或 3 columns Grid 布局 (`grid-cols-2` 或 `grid-cols-3`)。
  - Testimonial 板块使用瀑布流或网格 (`grid-cols-3`)。

## 4. 视觉规范

### 4.1 色彩系统
- **主品牌色**：Sketch 经典橘黄色 `#FDAD00` （用于部分点缀）
- **文字主体**：强烈的深黑色 `#1D1C1B` (Title)；浅灰次要文字 `#585754` (Paragraph)
- **品牌底色板块**：
  - 核心操作/警告色 (深色模块): `#1A1A1A` 或 `#000000`
  - 重点 CTA 底色: 薄荷绿 `#9EEA6B` （如 Kickstarter 部分）
  - 定价卡片/特征卡片底色: 浅紫淡色或白底 `#FFFFFF`
  - Top Banner 背景色: `#FFF3D4`

### 4.2 字体规范
- **Font Family**：系统字体栈即可 (Inter, San Francisco, Helvetica Neue) - 选用无衬线字体。
- **字重**：Titles 使用 `font-extrabold` (800) 或 `black` (900)，Paragraphs 使用 `font-normal` (400)。
- **微排版**：带下划线的橙色手写体（可以使用特殊的 cursive 字体表现或者 SVG 替换）。

### 4.3 卡片与投影
- 阴影：卡片尽量保持纯净边缘（微小 Border `border-gray-200` 或 Subtle shadow `shadow-sm`）。
- 圆角：图片和卡片外框多用大圆角（如 `rounded-2xl`，约 16px）。

---
