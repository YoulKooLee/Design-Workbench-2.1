# Slack Edit Profile Page

## 📋 概述

### 1. 核心业务与场景定位

这是 Slack APP 原型中的 "Edit Profile" (编辑个人资料) 页面。它是一个纯粹的表单输入与资料设置页面，采用了经典的 iOS Grouped TableView 设计范式，包含头像区的特殊表头布局与后续多个细分资料区块（名字设定、职位角色、联系方式）。

### 2. 用户目标与关键任务

- **头图更换**：在包含 Camera (相机) 图标的头像卡片处触发头像修改。
- **资料核对与编辑**：浏览或编辑多项分类清晰的个人资料字段，例如 Full Name, Display Name, Role 等。
- **页面状态决策**：顶部 Header 通过全局的 "Cancel" (撤销操作) 和 "Save" (保存修改) 管理整个页面的表单生命周期状态。

## 🧩 内容规划

### 1. 信息架构与模块划分

页面采用全局深灰色打底（`#F2F2F7`），上面承载白色的区块，按模块划分为：

1. **全局通用浮层架构**：
   - 顶部合并 iOS 原生 Status Bar 和 App 的操作型 Header。
   - Header 内部包含明显的文字交互锚点："Cancel"、"Edit Profile"、"Save"。
2. **混合头像模块 (Top Section)**：
   - 前置独立呈现包含白底的混合 Flex 排版。左侧包含 Viking 原汁原味的 SVG 头像卡片（叠加了带灰度的半透明照相机 Icon）。
   - 头像卡片横向紧挨着纵深切分的两个输入字段区域：`Full name` (仅包含提示符作用) 与真实填入值 `Jensen`。
   - 此处通过一条未贯穿左边缘的内部线 (`h-[0.5px] bg-[#E5E5EA]`) 分离两款字段，忠实再现了 iOS 风格内连框的设计哲学。
3. **分区块下辖设定 (Grouped Sets)**：
   - 每组均包含上方/下方外置的灰色导引文本（Label 或 Footer tip），和居中的 `bg-white` 白底卡片（左右被切断屏幕边距边界，贯穿全宽，边界具备 1px 线框）。
   - **Display name 模块**："huang" 作为设置内容。下面伴随详尽的昵称注释。
   - **Role 模块**：含有置灰占位符 "What I do"。
   - **Contact 模块**：左标 "Phone"，右提示 "Phone number" (模拟 Flex gap 左右站位)。

### 2. 数据与内容来源

完全 Hardcoded 静态写死（Mock Data），无需引用任何外部变量或图床环境，头像与第一、第二页场景使用的手绘 SVG 同源复刻以保留跨页视觉关联。

## 📐 布局与结构

- 外层约束容器采用 `flex flex-col h-screen max-w-md mx-auto bg-[#F2F2F7] overflow-y-auto` 以容纳在小屏上可能过长的表单。
- Block 分区控制高度依赖于 Padding: 在每个 Section 上/下插入特定的如 `pt-[22px]` 与 `pb-[6px]` 的组合像素间距，使得白底单元之间形成自然过渡留白。
- 底部嵌入 Absolute/Sticky 定位的 iOS Home Bar，确保滚动过程不会被覆盖拦截。

## 🎨 视觉规范

### 1. 自定义细节 (Design Tokens)

此页面深度依赖苹果 iOS 人机接口规范 (HIG) 的默认设值：

- **背景/基座色**：`#F2F2F7` (Grouped Background)。
- **区块边线与中继线**：`#E5E5EA` (通过 `.ios-border` 工具类抽离封装)。
- **交互级文案色**：蓝色的 "Cancel" 和 "Save" 均使用标准的 iOS Blue (`#007AFF`)。
- **信息级文案色**：外置 Label 与空态占位符通常运用 `#8E8E93` 或稍浅的 `#C7C7CC`。普通展示文字为特黑 (`text-black`)。

### 2. 组件状态定义

当前仅为纯视觉展示：
- 静态输入框体目前作为不可聚焦的展示占位层 (`div` 包裹文本，非实际 `input` 或 `textarea`)，展示了多种填入状态（普通数据/灰色空数据）。
- "Send/Save" 按钮及相机浮窗在视觉上具有可点击感，当实际开发表单事件时应当转为相应的 `<button>` 对象。
