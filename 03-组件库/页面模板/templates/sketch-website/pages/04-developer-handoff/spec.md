# 04-developer-handoff 页面规格说明

## 1. 业务与功能

### 1.1 页面/元素定位与核心目标
- **类型**：产品功能介绍页 (Feature Landing Page - Developer Handoff)
- **目标**：主要面向开发者与设计师之间的协作流程（Handoff）。突出 Sketch 拥有的 Web 端免插件开发者交付工具能力（对标 Zeplin、Abstract 等无缝交接体验），通过大量的界面标注线演示和瀑布流案例展示，强化“免费、浏览器可用”的核心卖点。

### 1.2 功能清单
- **全局导航（Header & Nav）**：标准复用组件。
- **英雄首屏（Hero Section）**：带有明显标注线与距离标记（279px, `Turn ->` 等特大字号排版），呈现极具表现力的开发者“检查(Inspect)”面板大图，下有插件竞品“阵亡名单”（Abstract, Zeplin, InVision, Marvel）。
- **特写功能区块（3个交替段落）**：包含“Free developer tools in your browser”、“Developer tools that keep you in sync”、“The developer tools you actually need”。使用带测量线或 3D 渲染的精致图标作为标题点缀，采用左图右文（或左文右图）的图文分栏。
- **互动 Demo 流（Handoff in action）**：一个由 6 个卡片组成的非对称网格或瀑布流，展示各式模板的 Handoff 实景。
- **动态入口卡片（What's new?）**：包含 “Copy CSS”与“Color tokens”的特征块。
- **底部导流与背书（Final CTA & Testimonial）**：绿底大圆角转换引导块，加持一行来自用户的引言评论。
- **全局 Footer**：标准的版权和导航链接。

## 2. 视觉特征与细节提取

### 2.1 配色方案
- **文本颜色**：大标题黑色 `#1D1C1B`，段落灰色 `#585754`。
- **测量标注颜色**：贯穿全页的特有交互视觉：**紫粉色 / 靛蓝色** （如 `#A855F7`, `#3B82F6`）。所有的 `Turn ->`、`Pixels ->`、`Info ->` 装饰标签均使用这些具有技术感和标注属性的色彩底色。
- **Hero 背景图**：使用了夸张的全屏渐变背景图（紫色、粉红色、橙色混合晕染），模拟一种 Web 端 Handoff 工具内常见的隔离蒙版视觉。

### 2.2 特殊装饰与插图
- 引出了类似技术图纸的辅助标注线（如 `279-------------------`）。
- 使用菱形（`◇`）作为正文特性的列表引导符。
- 手绘字体装饰（例如 Hero 标题侧边的 "Try the demo" 书写体箭头）。

## 3. 布局要求
- 使用 `max-w-6xl` 约束内容宽度，以使得内容具有极简设计软件的美学感，并大量留白（sections 之间使用 `py-32` 级别的边距）。
- **Demo Grid**：可以采用 CSS Grid 或者 Columns 布局，形成类似瀑布流紧密贴合的设计图展示区。
