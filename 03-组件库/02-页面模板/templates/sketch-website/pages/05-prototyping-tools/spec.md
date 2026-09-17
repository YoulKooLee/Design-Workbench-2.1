# 05-prototyping-tools 页面规格说明

## 1. 业务与功能

### 1.1 页面/元素定位与核心目标
- **类型**：产品功能落地页 (Feature Landing Page - Prototyping)
- **目标**：强力宣传 Sketch 内置的原型制作能力（Prototyping）。其核心卖点是让用户告别 InVision 和 Marvel 等专门的原型插件，实现在原生设计工具中一站式绘制节点与交互逻辑（原型连线、弹窗覆盖物、滚动区等），并可直接在设备或浏览器端预览。

### 1.2 功能清单
- **英雄首屏（Hero Section）**：标题“Build Prototypes. Share them anywhere.”搭配三个代表不同设备的悬浮界面截图（Mobile, Web Dialog, Desktop Web），点出多端原型共享的能力。加入橘黄色的交互节点和折线连接符号。
- **四大能力特写（4 Sections）**：
  - `Prototype at the speed of thought`：包含多路分支路线图（Flow map）与右侧三大特性说明，强化高速工作流。
  - `Prototype without the learning curve`：左侧文字，右侧展现面板，强调无代码基础的0学习成本。
  - `Prototype beyond basics`：左图右文，展示弹窗 (Overlays) 和复杂交互 UI 面板。
  - `Prototype without plugins`：左文右黑夜模式图，强调零外挂、无额外计费。
- **移动端真实测试引流块（iPhone App Promo）**：特别独立的灰色/白色分块区域，左侧两部iPhone真机模型，右侧引导下载 App Store 官方镜像客户端（"If it's made for mobile, test it there"）。
- **更新日志卡片流（What's new?）**：包含“Overlays in prototypes”功能卡片（绿色描边图标）和“New and improved iPhone app”卡片（橘色图标）。
- **CTA 区与用户证言**：绿底CTA块 "Create your Workspace for free" 及 Peter Nowell 的引流评价。

## 2. 视觉特征与细节提取

### 2.1 配色与图形符号
- **原型专属交互符号（Prototyping Nodes/Lines）**：贯穿全身的视觉母题是带有圆环断点的橘黄色交互连线（Orange curves: `#F5A623`, 辅助 `#FDAD00`），将各个特写区域的重点文字与截图中的按钮从视觉上连接起来，模拟平时做原型时的“连线操作”。
- **指示器 Icon**：这四个特写区块头部配备了精致的 3D 原理渲染小图标（彩色灯泡代表 Thought，弹簧代表 Curve，指北针代表 Beyond basics，乐高拼接块代表 Without plugins）。对于纯代码复刻，我们将通过 Emoji、SVG 或色彩几何形组合来实现类似高级感效果。
- **Hero 背景图**：背后是粉橘红交织的柔和渐变。

### 2.2 排版规制
- 一如既往的 `max-w-6xl` 或 `max-w-7xl` 大留白网格。
- 采用独特的带描边或不带边界的黄色圆形符号 `⊚` 作为首个区段的 List 序号。

## 3. 实现要求
- 高度关注黄色的“隐形折线或曲线连图”视觉差。由于实际连线绘制较复杂，这部分可通过 SVG 背景或 CSS 绝对定位的虚线边框+圆点（`border-orange-400` 与 `rounded-full`）巧妙还原其意境。
- 确保移动端 App 推广的模块呈现出左紧右松、灰底白字的质感对比。
