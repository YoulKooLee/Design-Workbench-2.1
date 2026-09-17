# 21-assistant-detail 页面规格说明

## 1. 业务与功能

### 1.1 页面/元素定位与核心目标
- **类型**：扩展中心 / 插件助手详情页 (Extension Detail Page)
- **目标**：为目标助手（Assistant）或插件提供详细说明、元数据（版本、徽章、外部链接）展示，并提供核心行动号召（“添加至 Sketch”的下载安装按钮）。

### 1.2 功能清单
- **全局次级导航 / 面包屑 (Breadcrumb & Search Bar)**：
  - 左侧：提供返回上一级目录的 `< Extensions / Assistants` 面包屑路由。
  - 右侧：常驻搜索框 `Search for Assistants...`。
- **英雄与详情双栏布局 (Split Sidebar Detail Layout)**：
  - **左侧状态侧边栏 (Left Sidebar)**：
    - 包括大型应用图标缩略图展示窗（带浅灰底色底盘）。
    - 高亮的品牌橘色主操作按钮（Add to Sketch）。
    - 各种基础属性：版本号（v1.0.9）、发布日期。
    - 主题分类徽章标签（Tags），如紫底的 GUIDELINES 和蓝底的 WEB。
    - 相关链接列表（npm, homepage, repository, bugs）外接入口。
  - **右侧富文本详情区 (Right Content)**：
    - 包括超大主标题（应用名称）和开发者署名。
    - 使用了大号字体展示助手职责描述。
    - 分模块的正文：About（简介）、Rules（规则文档，带有强烈的橙色代码标识符）。
    - 底部免责声明信息框（Developer Disclaimer Box）。
- **推荐专区 (Featured Assistants)**：
  - 页面下部衔接相关推荐系统，横向排列两张 Assistant 卡片。

## 2. 视觉特征与细节提取

### 2.1 错落有致的代码段提示色 (Orange Code Formatting)
在 Right Content 的 Rules 列表中，没有使用传统的灰色等宽代码块，而是使用了一套非常极客的橘色代码高亮配色体制：
- `@sketch2react/sketch2react-core-assistant/occurrence-of-page` 这类长长的类名或者规则名被单独标记为特定的 Sketch Orange 主题色。
- “Start” 或 “Start here” 等字符也标上了橘色，结合常规无衬线黑体，展示了极佳的可读性，没有破坏页面的视觉干净感。

### 2.2 左侧 Icon 的画框底座 (Icon Canvas Holder)
左侧巨大图标并非只是光秃秃挂着，它放置在了一个 `bg-gray-50` 的正方形“画框”里，并在真正图标的外围打上一圈精细的 `1px #EEEEEE` 边框。这样的设计极大增强了应用的“包裹感”和作为软件资产的分量感。

### 2.3 顶部极简透视背景网格 (Top Mesh Abstract Background)
面包屑所在的头部大区域背后，依然复用了极微弱、透视感极强的几何光影/大斜线背景（透明黑度可能在 2% 左右）。

## 3. 实现要求
- 此页面的左右栏拆分不是普通的五五开，而是 `lg:w-[300px]` 固宽左栏搭配 `lg:flex-1` 灵活右栏。
- 页面推荐区域重用第 20 页 `AssistantCard` 的 DOM 结构逻辑。
- Footer 仍为统一通用版本。
