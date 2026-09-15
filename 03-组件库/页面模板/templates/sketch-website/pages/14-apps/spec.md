# 14-apps 页面规格说明

## 1. 业务与功能

### 1.1 页面/元素定位与核心目标
- **类型**：产品系列/多端下载与引导页 (Product Ecosystem Landing Page)
- **目标**：向用户展示 Sketch 的“三驾马车”产品矩阵：macOS 原生设计端、Web 全平台协作端、iPhone 预览端。统一展示并分发下载或访问入口。

### 1.2 功能清单
- **英雄宣言首屏 (Hero Message)**：
  - 引人注目的标题：“每个英雄都需要一个助手。我们有两个。” 
  - 简短副标，点明 macOS 创作、浏览器分享、移动端随手携带的三合一理念。
- **全生态展示巨型拉片 (Giant Showcase Container)**：
  - 这是一个贯穿页面中部的巨大悬浮白色容器，内容分为上中下三层。
  - **Mac 端块 (Design on your Mac)**：定位 “For Editors”，带悬浮 Dock 图标群的 Mac 截图，提供 Mac 版下载与历史版本链接。
  - **Web 端块 (Explore in your browser)**：定位 “For Everyone”，展示 Web Workspace 截图，提供打开 Web App 的深色按钮。
  - **iPhone 端块 (Preview on iPhone)**：定位 “For Everyone”，展示多台交叠的 iPhone 设备截图，提供 App Store 下载入口。
- **背景修饰 (Dynamic Background)**：
  - 在巨大白色容器背后的底层，平铺着强烈的几何倾斜多色块背景（浅粉、红橙、蓝紫交织）。
- **Footer 区**：标准页脚。

## 2. 视觉特征与细节提取

### 2.1 悬浮 Dock 的立体还原 (Floating Dock UI)
在首个区块（Mac端）的演示图中，原稿特别设计了一组模拟 macOS 底部 Dock 栏的放大立体图标（相册、日历、Sketch 钻石、下载文件夹、废纸篓）。这不仅增加了设计感，也巧妙隐喻了其 Mac 原生血统。这部分在前端开发中可以使用 CSS 增强阴影深度。

### 2.2 嵌套知识卡片 (In-card Links)
在 Mac 和 Web 这两个区块内，都嵌套了一个带有单独小图标、并且带有细微外阴影的浅黄色/浅紫色背景卡片（`Everything you need to know about...`），这是一种非常有效的站内导流形式，既活泼又提高了文档点击率。

## 3. 实现要求
- 背景层的大比例几何拼图，可通过使用带有 `clip-path` 或者 CSS Transform `skew/rotate` 的多层 Absolute Div 来重现红蓝对抗的高明度背板。
- 整个核心的白色大卡片采用 `max-w-6xl`，`bg-white/90`、毛玻璃 `backdrop-blur-xl` 及柔滑的大阴影，让它像玻璃纸一样盖在极其鲜艳的背景上。
- 各个区块保持之字形视觉交替（图左/文右 -> 图右/文左 -> 图左/文右）。
- UI 使用统一的胶囊药丸状灰色标识框 (`bg-gray-100` / `FOR EDITORS`)。
