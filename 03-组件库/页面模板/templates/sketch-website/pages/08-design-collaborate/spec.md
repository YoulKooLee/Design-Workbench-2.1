# 08-design-handoff 页面规格说明

## 1. 业务与功能

### 1.1 页面/元素定位与核心目标
- **类型**：全生命周期产品落地页 (Comprehensive Product Outline)
- **目标**：这是对 Sketch 从设计、协作、原型到交付整个产品流程的完整介绍页。它展示了 Sketch 是一个真正的“All-in-one”工具（而不是仅限于画图的设计工具）。

### 1.2 功能清单
- **英雄首屏 (Hero Section)**：
  - 引人注目的标题：“Everything you need to handoff”（部分长页这里用轮播形式展现）。
  - 中心放置极具视觉冲击力的巨型界面实机演示模拟（带悬浮阴影），两侧配置醒目的翻页按钮（左右箭头），暗示强大的功能全集可以随意切换浏览。
- **信任墙 (Trusted Companies)**：灰度企业 Logo 带。
- **交错布局的全家桶介绍 (Alternating Features)**：
  - `The all-in-one designer's toolkit`（左侧 Mac 原生应用界面截图“溢出”出边缘 + 右侧文字说明与 Mac Dock 图标彩蛋）。
  - 双栏特性短打：左“Prototyping”（原型折线配图），右“Real-time collaboration”（多人协作光标头像图）。
  - `Scale up your design process`（左侧关于 Workspaces 的描述 + 右侧网页版 Handoff 界面大图向右“溢出”外缘）。
  - 双栏特性短打：左“Design systems”（系统符号小徽章），右“Developer handoff”（标注与测量视觉图）。
- **版本新功能马赛克拼图 (What's new?)**：
  - 采用高度不一的多彩卡片拼接排版（Masonry / Bounded Grid 灵感），每个小功能特性用不同底色的小卡片承载。
  - 左侧装饰有一颗巨大的黑星 ⭐，突破常规网格。
- **生态扩展引流 (Extensions)**：一波呈现波浪状或散落排列的第三方集成扩展 Logo 图标，强调其生态的开放性。
- **博客推送区 (Our blog)**：左侧介绍文字，右侧并挂 3 篇横向小文章新闻条目。
- **Footer 区**：绿色 Workspace 引导与标准页脚。

## 2. 视觉特征与细节提取

### 2.1 布局与出血设计 (Bleed Layout)
- 这是本页最显著的视觉特色。在 “The all-in-one designer's toolkit” 模块中，左侧巨大的主视觉图是直接贴着浏览器**最左侧边缘**（无 Padding）进行渲染的（`absolute left-0` 或平移实现）。而在下方 “Scale up your design process” 模块，主图又是紧贴**最右侧边缘**。它打破了局域网格的方正感。

### 2.2 配搭图案与排版节奏
- 高度关注“**插图组件化**”：大量的小功能特性不再采用长篇大论，而是浓缩为一个个 200x150 左右的小彩图，比如四个代表组件化的几何徽标，比如模拟协作鼠标乱飞的插画。
- **多彩马赛克拼图网格**：更新日志区块的 7 个卡片拼成了精美的彩色高低网格（粉色、青色、蓝紫色等柔和底色组合）。

## 3. 实现要求
- 采用 Tailwind CSS 的 `grid-cols-2` 配合复杂的相对定位来实现大块交替溢出布局。
- 马赛克“What's new”区块可以使用 CSS Grid 的 `row-span` 或精确的高度配比来实现紧凑的砖墙式展示。
- 全量高保真还原细节。
