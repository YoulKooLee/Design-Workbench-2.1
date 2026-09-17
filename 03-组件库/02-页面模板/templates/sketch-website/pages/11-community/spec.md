# 11-community 页面规格说明

## 1. 业务与功能

### 1.1 页面/元素定位与核心目标
- **类型**：社区枢纽页 (Community Hub Landing Page)
- **目标**：主要呈现 Sketch 的全球社区动向。包括即将举行的/过去的线上交流会（Events）、布道师团队（Advocates）、合作伙伴以及 Slack 社群。页面氛围强调人文、连接和活跃度。

### 1.2 功能清单
- **群像英雄首屏 (Avatars Hero Section)**：
  - 中央主标题：`Welcome to our Community Hub`。
  - 背景遍布星云一样散落的**真实用户头像**，头像带有不同程度的高斯模糊（景深模拟）和阴影，展示社区的人性化与规模感。
- **Sketch Events 区块**：
  - 总体介绍与背后的**巨大橙红渐变光晕**流。
  - **顶级推荐活动卡片 (Hero Event Card)**：极有设计感的左右双拼大卡片，左侧为主题横幅（带合作方徽章叠层），右侧为详情区（含讲师列表、黑底行动按钮）。
- **活动列表区 (Events Flow)**：
  - 上方带有胶囊样式的 `Upcoming events` 和 `Past events` 切换 Tabs。
  - 采用流式列表排布的往期活动，每项左侧为 16:9 的精装封面小图，右侧为信息、时间与 `Event details` 次级浅色按钮。
- **扩展生态推荐 (More on Sketch Community)**：
  - 页面左侧有硕大的两个灰色 3D 对话气泡（Speech Bubbles）溢出版面。
  - 核心是两张并排的宽体介绍卡：
    - `Sketch Advocates` (布道师) - 带有头像层叠矩阵元素。
    - `Community Partners` (合作伙伴) - 带有小 Logo 打散排布元素。
- **照片墙与 Slack 引流 (Collage & Slack CTA)**：
  - 利用不规则照片墙展示了全球各地的线下聚会、分享会上的实体照片，有些照片做了特殊的圆角裁切和层叠排布。
  - 下方中央 `Join our Sketch Friends community on Slack` 呼吁语和黑色 `Sign up` 按钮。
- **Footer 区**：标准页脚。

## 2. 视觉特征与细节提取

### 2.1 景深特效（Depth of Field with Blur）
头部的随机漂浮头像是亮点。通过对离中心较远的头像叠加 Tailwind 的 `blur-sm`、`blur-md` 和极度缩小，加上居中元素的清晰和大型化，用最简单的 CSS 做出了三维空间的前后景深感。需要在 React 组件中打散渲染这些头像。

### 2.2 不规则拼接堆叠照片墙 (Masonry/Collage Wall)
页面底部的照片墙不再是规整的 Grid，而是有横图、竖图，甚至有一两张图被裁剪出了圆形顶部的拱门状，并且互相有一定的遮挡叠印（Negative margin 或 absolute 定位）。

## 3. 实现要求
- 编写悬浮头像组件，允许传入 x, y, scale 和 blur 数值。
- 实现 Event Item 组件，保持时间日期的微小排版和标准间距。
- `More on Sketch` 左侧的立体对话气泡可以用纯 SVG 内联实现。
- 照片拼图墙使用 Flex/Grid 与绝对定位结合的混合方式模拟杂乱而又有活力的随意感。
