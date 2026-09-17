# 24-discover 页面规格说明

## 1. 业务与功能

### 1.1 页面/元素定位与核心目标
- **类型**：Sketch Web Workspace (内部工作台) - Discover (探索/推荐) 标签页。
- **目标**：这是用户登录进入 Sketch 网页版工作空间后的“仪表盘”或“学习推荐”页。提供工作流指引、新功能介绍、社区精选内容和第三方插件推荐。

### 1.2 功能清单
- **全局工作台侧边栏 (Workspace Sidebar)**：
  - 账户 / 工作空间切换器。
  - 主要导航区（Updates, People & Settings, Discover - 处于激活态, Help）。
  - 文件树区 (Workspace: All Documents, Shared, Libraries, Trash)。
  - 项目区 (Projects)。
  - 个人账号固定底栏。
- **主视窗内容区 (Main Scrollable Content)**：
  - **顶部导航条**：仅有一个返回外网的链接 `Go to Sketch.com ↗` 和一条极细的底边框。
  - **欢迎横幅 (Welcome Banner)**：巨大的黄色高饱和度圆角卡片，带有巨大的 3D 金色奖杯和漂浮物插画（用 CSS 绘制伪 3D 或几何体代替），以及一个大号关闭按钮。
  - **精选教程与洞察 (Tutorials & Insights)**：复杂的双栏不对称布局。
    - 左栏：特色大图教程 + 多个图文列表项。带有一组 Segment Control（Get Started / Dive Deeper）。
    - 右栏：4个视频卡片网格，卡片带有时间长度徽章 `▶ 1:51` 和炫彩弥散渐变背景。
  - **新功能通告 (What's New)**：
    - 一张黄底强色块卡片作为 Mac App 更新的 CTA。
    - 右侧平铺 3 张带有细边框的特性说明白底卡片（例如“添加交互蒙版”等）。
  - **社区故事 (Inspiration)**：大号圆角卡片，包含上方跨越边框的圆形头像设计，这需要结合绝对定位来实现人物头像“半挂”在背景图上的效果。
  - **推荐插件 (Plugins We Love)**：双栏布局的 List 视图，包含插件 Logo 圈和描述文字。
  - **底部帮助区 (Support & Footer)**：包含内部工单发起按钮和几个简单的社媒链接，以及极简的版权声明。

## 2. 视觉特征与细节提取

### 2.1 极度清晰的 Web App 布局范式
与前几张长形营销落地页不同，本页采用了标准的 SaaS 后台架构：左侧固定宽度 `~260px`（不随屏幕滚动），右侧 `flex-1` 填满剩余空间并局部 `overflow-y-auto`。这意味着全页的顶层容器应该是 `h-screen overflow-hidden`。

### 2.2 Dashboard 风格的激活态 (Active State)
侧边栏在选中的 `Discover` 时，不仅仅是文字变色，而是拥有了一个极其柔和的淡橙色背景 `<div className="bg-[#FFF0E6] text-[#E55A16]">`，并且左侧可能有或没有一根指示条。

### 2.3 弥散投影与毛玻璃（Mesh Gradients & Glassmorphism）
Insights 区域的四大视频封面，分别使用了四种极致流动的 Mesh Gradinet（紫色向洋红流动、绿色向黄色流动等），我们将直接在 Tailwind 中使用多重径向渐变 `radial-gradient` 覆写 `style` 来复刻这绝美的色彩晕染效果。

## 3. 实现要求
- 整体页面必须切换为 Dashboard 布局，不能再复用主营销站的 `Nav` 和 `Footer`。
- Icon 需要大量采用 SVG 手绘（例如：铃铛、齿轮、罗盘、问号、文件、垃圾桶等）。
- 所有卡片悬浮需带有微妙的阴影变化 `hover:shadow-md transition`。
