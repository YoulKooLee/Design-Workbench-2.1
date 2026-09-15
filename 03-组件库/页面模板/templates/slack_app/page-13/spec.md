# Slack Apps List Empty State

## 📋 概述

### 1. 核心业务与场景定位

这是 Slack APP 原型中的应用整合状态页（Apps in [Channel/Space]）。用于罗列和管理挂载在特定频道的第三方应用/Bots。呈现为空状态（Empty State），用以教育用户当前频道并未添加集成任何第三方应用。

### 2. 用户目标与关键任务

- **应用搜寻**：利用页面上方的全局 Search Input 尝试过滤或许已有的应用名字。
- **配置与新增动作**：点击右上角暴露的操作群—`Edit` (多选删除) 及蓝色的加号 `+` (跳转添加新程序)。
- **导航返回**：点选左上角全尺寸的 iOS原生蓝色 `< Back` 来退出空状态层。

## 🧩 内容规划

### 1. 信息架构与模块划分

页面摒除了任何数据载荷，将内容压缩至：

1. **Top Nav 层**：
   - 使用 iOS 标准 Modal Navigation，`shadow-sm` 替换了原有的粗野灰线以体现出浅灰底色下微微隆起的高级感。
   - 三段式布局极为严谨，左侧为带箭头后退，中心主体标题，以及右侧具有业务扩展性的双字块 `Edit` 跟 `+` 图标结合。
2. **搜索外挂层 (Search Box)**：
   - 包含一枚白色大圆角 (`rounded-[10px]`) 输入拟态框，坐落于整体 `#FAFAFA` 灰度背景内。
   - `Search` 本省带着标准的纯灰 `#A1A1AA` Placeholder。
3. **主场景垫底层 (Under-Content/Base Layer)**：
   - 核心插画点定：一个深紫色背景套底（`bg-[#796B9E]`），容纳了一具拥有极简化几何线条的专属 Slack Bot 机器人头像。
   - 文字 `“There are no apps in this conversation yet.”` 作为辅助结束副标。

### 2. 数据与内容来源

文件数据纯静态显示。其重点和难点落在了机器人 SVG 的构图还原当中：包含了 `[Antenna Pole]`, `[Square Head]`, `[Double Eyes reflecting light]`, `[Curved Shoulder body]`，在原型代码中皆基于 SVG Geometry Shapes 被纯手工还原了出来从而彻底避免了素材碎片引入。

## 📐 布局与结构

- **Z 轴微阴影切割**：虽然看似与下拉内容同属背景色系 (`#FAFAFA`)，但 Header 使用了 `shadow-[0_1px_0_0_#E5E5EA]` 来确立头部栏目与搜索栏滚区域在层叠逻辑体系里高出 `1px`，当内容较多向上吞没时实现界缝锁死。
- **纵轴空间校准**：整体包装套用了 `flex-1` 让空场景占满剩余屏幕可用高度，但在此之上利用一个大跨度负外边距 (`-mt-24`) 进行提拉（Optically Center 拉拽模式），这是一个针对此图里较小的主视觉图标带来的空间不饱满进行的强力修正。

## 🎨 视觉规范

### 1. 自定义细节 (Design Tokens)

全面使用由 `rules/design-guide` 规定的准则：

- **系统蓝 (System Blue) 控制交互骨架**：`#007AFF` 把控 Navigation (回撤) 以及积极的 Add (`+`) 功能唤起信号。
- **自定义精微插画色系**：除了基础灰 `#DDE0E3`，给机器人部件调配了极其特征的 `#796B9E` (紫色表盘背景) 与 `#EE586D` (红色的装甲系扣)，形成了一组符合 Slack 搞怪趣味调性的撞色图腾。
