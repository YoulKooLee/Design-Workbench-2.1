# Slack Account Options Drawer Navigation

## 📋 概述

### 1. 核心业务与场景定位

这是 Slack APP 原型中的用户全局设定侧拉导航抽屉（Settings Drawer）。这是整个 APP 架构中对应 `page-17` 的镜像功能视图：如果 `page-17` 展示的左侧拉出的宏观 Teams/Workspaces 切换器，那当前的 `page-18` 则是由屏幕右侧向左推出（压盖在全白底层的 Activity 界面之上）的微观“个人账户与权限”菜单板。

### 2. 用户目标与关键任务

- **身份核定**：快速确定自己当前身份配置参数（包含真实姓名，以及通过 `page-15` 构建的独立 Viking 虚拟人物头像）。
- **打扰阻断（Snooze）**：这是 Slack 的关键创新点，用户需要快速一键开合状态（`Do Not Disturb`）与休闲签名配置（`Vacationing`）。
- **通用功能导航**：快速下潜进入例如 Directory，Your Files，Starred Items 的二级分类抽屉。

## 🧩 内容规划

### 1. 信息架构与模块划分

通过逆向解构原生的 iOS Settings 范式表单，拆解为四大核心组块：

1. **Underlying Dim Area (被遮盖主视图 `z-0` 到 `z-10`)**：
   - 截断呈现主 App 活跃动态：这里包括了手搓内联生成的 Slack 彩色原色 Hash Logo `#Sl`（拼合 4 条微胖独立圆角矩形堆叠实现）。同时用一整列的红绿色状态线与不同成员的粉色 Avatar 进行填充补切。
2. **Account Card (全局顶部信息看板)**：
   - 使用粗硬大字重 `font-[800]` 承接 “huang” 标识。配合调用原 `page-14` 生成的 `viking_avatar` 定位焦点。
3. **Menu Cells (系统配置分类栏)`z-20`**：
   - 三段式布局结构（Section 1: 状态控制；Section 2: 全局导航；Section 3: App机制属性）。
   - 全部运用苹果经典的 Inset Line 交互线分隔机制（在每个独立群组闭合的最后一栏触发 Full-Width 满分切线边界，而普通子单元之间通过右侧内收偏移实现视觉聚类）。

### 2. 数据与内容来源

大部分功能直接采纳了 `lucide-react` 图库中相似的通用隐喻符号（如 `AtSign`, `Star`, `SlidersHorizontal`），但在对于 Slack 极具辨识度的特殊功能——“小睡/干扰拦截 (Snooze Bell)” 上，并未采用现成库里的简单划线斜杠铃铛 (`BellOff`)，而是通过手工汇编纯正 SVG 路径 `d="M10 ..."` 将两个大小不一的 `Z` 字深度整合描绘进标准的 Bell 外轮廓中来刻写完美逼真感。

## 📐 布局与结构

- **右推反向长投影 (Right Drawer Shadowing)**：
   - 为该侧边栏写入对应的 `.drawer-left-shadow` (映射出 `box-shadow: -15px 0 45px rgba(0, 0, 0, 0.25)` 的负向阴影坐标)。确保暗层扩散完全反方向映射到左侧那 18% 的留白主框面域上。
- **动态裁切占位符 (Dynamic Avatars)**：
   - 为了极高的渲染质感，被压暗底部的那些 Slack "模拟对话头像"，全都是用 `<div className="overflow-hidden">` 与偏移量负边界圆重合手搓的：只用两个 `div` 的上下遮蔽位移就塑造出“带脸部与黑眼睛”的小外星人。

## 🎨 视觉规范

### 1. 自定义细节 (Design Tokens)

- **主副体黑度区分 (Contrasting Greys)**：标题、核心字运用原生大黑 `#000` / `font-[17px]`。而补充参数与装饰符全部挂载了精确至像素的 `#8E8E93` 或 `#A1A1A5`（后者是稍微低沉一点以应付底层的遮罩）。
- **特异化原生控制色**：使用了 `#0E8A63` (底层 Slack Edit 绿印), 与 `#E02636` (断联红色)，以及状态控制面板底色的 `#E5E5EA` 切线灰。
