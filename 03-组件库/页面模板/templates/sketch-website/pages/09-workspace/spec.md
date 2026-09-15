# 09-workspace 页面规格说明

## 1. 业务与功能

### 1.1 页面/元素定位与核心目标
- **类型**：产品模块深度落地页 (Workspace Feature Deep Dive)
- **目标**：详细展示 Sketch “Workspace (工作区)”这一云端服务的全部能力（聚合、协同、原型分享、交付），其口号是“One Workspace. Unlimited possibilities.”

### 1.2 功能清单
- **英雄首屏 (Hero Section)**：
  - 含有品牌感的金黄色曲边背景底图（Curved Background）。
  - 超大号字体标题引发无缝过渡。
  - 中心放置一张大尺寸黑底视频缩略图（带居中播放按钮），标题为闪亮的渐变文本 “Sketch Workspace”。
- **步骤引导导航 (Step Navigation)**：紧接英雄区的下方，有四粒排序的灰黄色胶囊徽章（1 Bring it all together / 2 Collaboration / 3 Feedback / 4 Developer Handoff），用作锚点或视觉索引。
- **四大核心体验展示流 (Feature Zigzag Stream)**：
  - 采用典型的“Z字型 / 交替排布”图文阵列。
  - **左文右图 / 右文左图交织**：图表通常处于边缘溢出（Bleed）状态。
  - **动态组件徽章**：所有的插图上方都会悬浮一个带着黑色播放三角标志的组件 `▷ See it in action`，暗示它是动态演示系统。
  - **交互功能列表块 (Feature List)**：每段主说明文本下方，会有一排 "Quick facts" 手风琴按钮，以及纵列排布的推荐教程链接（左边小方图，右侧文字+长箭头）。
  - **沉浸式试用横幅 (Try it yourself Promo)**：部分特性下方带有深色底色的横条幅，引导用户访问 Demo。
- **证言区与 Footer**：标准的三头像合并背书 + 居中大段引言，最后是绿色的引导注册底块。

## 2. 视觉特征与细节提取

### 2.1 配色方案
- **四段生命周期的专属底色 (Curved Swashes)**：
  这是目前看来这批落地页最喜欢的高级手法之一：
  1. 聚合 (Bring together)：**明黄色**巨型笔刷/曲线色块背景 (`bg-yellow-200 / 300`)。
  2. 协同 (Collaborate)：**青绿色**曲线渐变色块 (`bg-teal-300 / 400`)。
  3. 原型 (Prototyping)：**粉红色**曲线底图 (`bg-pink-300 / 400`)。
  4. 交付 (Handoff)：**浅紫色**曲线底图 (`bg-purple-300 / 400`)。
每一段彩色背景都恰如其分地隐藏在截图层的下面，像挥毫拨动的颜料一样为纯白页面带来韵律。

### 2.2 细节组件
- 教程列表的小缩略图：由于原图尺寸过小甚至很难看清，我们可以使用统一的带有阴影和小 Emoji 的圆角方块来极高仿真再现。
- "Try it yourself" 卡片：纯黑背景，带白色次级徽章卡片，视觉反差极大，起到极好的 CTA 引流效果。

## 3. 实现要求
- 利用 Tailwind 的 `absolute` 背景色块进行多重底层渲染，实现那四道惊艳的色彩曲线背景。
- 精准实现左右交替出血的图文排布 `flex-row` 和 `flex-row-reverse`。
- 构建可复用的 `<TutorialLink>` 和 `<TryItPromo>` 子组件。
