# 20-extensions 页面规格说明

## 1. 业务与功能

### 1.1 页面/元素定位与核心目标
- **类型**：扩展中心 / 插件生态页 (Extensions Hub)
- **目标**：展示 Sketch 繁荣的第三方开发者生态系统，包括 Assistants（助手）、Plugins（插件）和 Integrations（集成），并提供导航入口与“构建扩展”的开发者号召（CTA）。

### 1.2 功能清单
- **英雄首屏 (Hero Section)**：
  - “Make Sketch your own” 宣告语。
  - 背景是具有极简线框感的灰色 / 白色巨型几何遮罩，塑造平台框架感。
- **次级导航 (Sub-Nav / Filter Bar)**：
  - 横向铺开的二级分类菜单（Assistants, Plugins, Integrations, Create your own），并配有鲜艳的橙色微型图标。
  - 最右侧配有搜索图标功能入口（Search Extension）。
- **扩展卡片流 (Extension Card Grids)**：
  - 分为三大区块，每个区块有独立的副标题（带有橘色 `See all >` 链接）。
  - **Sketch Assistants (3栏)**：轻量级卡片，右上角带有主题色小标签（如蓝紫色的 `GUIDELINES`）。
  - **Sketch Plugins (3栏)**：包含大型头部封面图的卡片，高度一致，下方是标题、开发者标识和简介。
  - **Sketch Integrations (3栏)**：展示与其它平台级工具（如 ProtoPie, Maze, Zeplin）直连互通的商业集成卡片。
- **开发者招募底座 (Developer CTA)**：
  - 左侧是文本和橙色按钮 `Read the documentation`。
  - 右侧是一个 3D 感的图标插画——一个明黄色的背景板中心镶嵌着一个橘红色的“双孔插头”符号，隐喻 API / 插件连接。

## 2. 视觉特征与细节提取

### 2.1 高级感的大封面扩展卡片 (Rich Plugin Cards)
与之前的简单文字福利卡片不同，插件和集成卡片（如 Stark, Plant, Maze 等）采用了一种上下分区的经典 App Store 卡片设计：
- 上半区是比例大致为 `16:10` 的展示窗，有着不同的背景纯色或淡灰衬底。
- 下半区纯白底，具有固定的内边距 `p-6` 或 `p-8`。
- `by Author` 的署名文本极其微小且使用了浅灰色 `#999`，以此将视觉重心让渡给插件图标和名称。
- 整个外框有着极淡的 `1px #f0f0f0` 描边和微小的圆角，产生“商品架”的展示效果。

### 2.2 Assistants 卡片的紫蓝色 Tag
区别于传统的卡片，Assistants 区块内的卡片在右上角提供了一个微型元数据标签。使用了极其清新的颜色搭配：淡蓝紫背景加上深紫罗兰色的字（`bg-[#F4F3FF] text-[#6E56CF]`），这种细节极大地提升了页面的科技感和精致度。

## 3. 实现要求
- 所有的卡片网格系统必须使用 `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` 来适应多终端。
- 由于原图中插件、集成的图片量极大（12张），使用高度封装的 `<PluginCard>` 组件结合预置的假数据数组以循环渲染（`.map`）。
- 底部 CTA 区块的橘色插头插画，利用纯 CSS 的形状绘制（圆形背景，中心两个并排的深色小圆点）即可在前端无损实现。
