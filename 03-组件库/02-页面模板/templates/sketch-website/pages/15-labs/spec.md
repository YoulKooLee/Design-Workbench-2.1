# 15-labs 页面规格说明

## 1. 业务与功能

### 1.1 页面/元素定位与核心目标
- **类型**：招募/实验性计划展示页 (Early Access / Beta Program Landing Page)
- **目标**：向用户介绍 Sketch Labs 计划，招募愿意参与用户研究、访谈或测试的新产品用户。

### 1.2 功能清单
- **英雄宣言首屏 (Hero Section)**：
  - 左侧：标题 `Sketch Labs`（其中 Labs 词眼进行橙色强调高亮），配合产品愿景的简短介绍。黑色的加入按钮（`Join Sketch Labs`）。
  - 右侧：代表“实验室”的标志性配图——一个具有强烈 3D 质感的化学烧瓶和漂浮气泡的组合，背景是一块渐变暖黄色的切角卡片。
- **信息流式阅读长段落 (Linear Reader Content)**：
  - 采用了去中心化的大片留白，内容被限制在中央的窄栏（宽度仅为 `max-w-3xl` 左右）内，优化阅读体验。
  - `What is Sketch Labs?` / `What happens if I sign up?` 两大段落，以纯文本形式深入阐述。
- **互动折叠面板区 (Accordion Areas)**：
  - `How do Labs sessions work?` 下方附带了 6 个可折叠的卡片列表，列出了参与方式（访谈、调研、日记等），带有的加号（`+`）提示可以展开。
  - `A few more things...` 下方附带了 FAQ 折叠面板，解答数据和参与隐私问题。
- **回报清单 (Rewards List)**：
  - `What do I get in return?` 标题下，使用空心橙色圆圈作为自定义 List marker 进行图文排版。

## 2. 视觉特征与细节提取

### 2.1 CSS 3D 图形构建 (Pseudo-3D Graphic)
右侧的烧瓶图。考虑到这是一种矢量感极强的立体构图，在没有直接现成切图的情况下，我将通过使用含有内阴影的各种 CSS 形状（多边形剪切 `clip-path` 和圆形渐变 `radial-gradient`）去重现烧瓶和气泡漂浮的精简概念，背景色块使用典型的柔和日出渐变加上圆角。

### 2.2 极简的交互面板 (Minimalist Accordion)
此页的手风琴组件（Accordion）移除了常见的卡片框、背景色或者突出的分隔线，只保留了最极简的“文字文本 - 巨大右侧边距 - 加号图标”，甚至连下划线也非常克制：`border-b border-gray-200` 并且每个条目具有相当大的内边距（`py-6`）。这是高级极简设计的经典特征。

## 3. 实现要求
- Layout：纯白的页面，通过纵向节奏控制阅读心流。
- 采用一个通用的 `<AccordionItem>` 组件用于多次出现的 Q&A 列表。
- Bullet List 使用纯手工打造的 List item （添加伪类或额外元素），而非粗糙的原生 `ul > li` 以达到使用空心橘色圆圈为端点的要求。
