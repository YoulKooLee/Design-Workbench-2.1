# 23-developer 页面规格说明

## 1. 业务与功能

### 1.1 页面/元素定位与核心目标
- **类型**：开发者中心网关首页 (Developer Hub / API Landing Page)
- **目标**：为第三方开发者提供构建 Sketch 插件和集成的入口，包含 API 参考、快速入门教程和社区资源链接。

### 1.2 功能清单
- **独立开发者导航栏 (Developer Nav Bar)**：不同于主站的全黑背景导航栏，带有特殊的黄色 Sketch 钻石 Logo 和全大写的专业术语链接（如 CLI, FILE FORMAT）。
- **梦幻孟菲斯风格首屏 (Memphis Hero Section)**：
  - 深邃的蓝紫色渐变星空背景。
  - 大量散落漂浮的彩色几何图块（橙色三角形、粉色圆环、蓝色胶囊等）。
  - 核心引语 `Build something beautiful`。
  - 两块具有高饱和度渐变的巨大快速入口卡片：**Plugins**（亮橘红）和 **Assistants**（粉紫色）。
  - 下方三个功能直达链接区。
- **快速入门操作指南 (Getting Started)**：
  - 分步骤罗列的运行脚本、发布插件和导出资源的教程。
  - 嵌有经典的 **Mac 原生菜单下拉 UI** 演示图。
  - 包含多个极简风格的代码块（使用浅白底色与高对比度关键字配色）。
- **黑色过渡宣告 (Submit an Idea)**：纯黑底色宣告模块，呼吁非开发者提交创意。
- **帮助与资源库 (Help Center Grids)**：底部纯白区，包含三个帮助链接卡片。
- **极简独立页脚 (Minimal Developer Footer)**：只有版权信息、Cookie 提示横幅和四个基本链接组成的超简易 Footer，没有传统页脚的复杂网格菜单。

## 2. 视觉特征与细节提取

### 2.1 CSS 原生重绘 Mac 下拉菜单 (Native-like Mac Menu UI)
教程区有一个 macOS `Plugins > Run Script...` 的截图。为了贯彻本次极限前端复刻的核心，我将不使用任何切图，完全依靠纯 Node DOM、`backdrop-blur` 以及精心调配的阴影和蓝色高亮背景 `bg-[#0063E1]` 来用代码“画出”这个悬浮下拉菜单！

### 2.2 散落飘浮的几何图形 (Floating Geometrics Backdrop)
在首屏紫蓝色的极光背景之上，漂浮着大约十几个不同角度、不同颜色的几何碎片。这也是必须要用多组绝对定位的 `div` 和 SVG 来完成的视觉奇观，这不仅提高了代码复用率，还能在任意超宽屏幕上保持高清而不失真。

### 2.3 鲜艳的弥散高饱和渐变卡片
`Plugins` 卡片采用了极其明丽的橘红色对角渐变（从橘黄到大红），而 `Assistants` 则是紫外光色系。这种色彩与主站的克制极简形成对比，暗示着开发者平台无限可能的创造力。

## 3. 实现要求
- 绝对独立的 `DeveloperNav` 和 `DeveloperFooter` 组件提取，不要与之前的页面混用。
- 代码块 `pre`/`code` 的渲染需手工加上不同的 `span` 颜色类，伪装成类似于 Prism.js 处理过的静态代码高亮。
- 所有悬浮组件特效需依赖 Tailwind 的绝对定位、`rotate`、`skew` 以及 `gradient` 功能完整落地。
