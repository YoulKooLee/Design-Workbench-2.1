# Slack Do Not Disturb Settings Sheet

## 📋 概述

### 1. 核心业务与场景定位

当前为 Slack 客户端内部配置模块，具体为「免打扰时间阀调节（Do Not Disturb Configuration Modal）」。这是一个脱离了主级通讯层、完全拥抱原生 iOS UI 设计规范的底层系统弹窗界页。

### 2. 用户目标与关键任务

- **直观静默配置**：通过极端扁平与标准化的列表陈列式 UI，在一级菜单完成从 30 分钟到第二天的系统级消音授权。
- **自定义下潜入口导航**：点击最后的 `Custom` 项下钻进入更复杂的自选时间轴控件。
- **配置防潮与取消回溯**：顶部明确标定 `Cancel` 以阻隔任何未确认破坏，通过灰度压暗未点击阶段的 `Save` 安全阀阻止无效上报逻辑。

## 🧩 内容规划

### 1. 信息架构与模块划分

页面严格遵守苹果 iOS 全局设定表单（Grouped Table View）框架标准：

1. **System Top Boundary (弹窗控制横栏)**：
   - 使用 iOS 标准高度的 `44px` 白底长条。
   - 三段式布局配置：左侧提供安全退出 `Cancel`，中间置入加粗属性的模态题标 `Do Not Disturb`，右侧配备因为尚未改动过任何选项而失去激活权的纯表意文字 `Save`。
2. **List Flow Control (`overflow-y-auto` 滑动体)**：
   - 彻底填装 `#F2F2F7` 以获得物理原生级的灰白反差层次感。
   - **Section 1**: 仅有一行动效属性行：高亮且采用破坏红的 `Turn Off`。以它唯一的行动作为打断当前已被激活的 "Paused" 状态点。
   - **Footer 1**: 原生附属在 Section 1 下的一句极小号说明文：`Notifications paused until 8:00 AM` 明确了静音状态生命周期。
   - **Section 2**: 容纳了五个阶梯跨距（30 Min 到跨周）的时间预设方案数组组团。
   - **Section 3**: 提供唯一的自由操作项 `Custom`。由于 iOS 体系内进入独立新层不必然需要向右辅助指标符 `Chevron`，故忠于截图原稿，不做无端猜测。

## 📐 布局与结构

- **次像素边缘描绘 (Sub-Pixel Border Mechanics)**：
   - 一反此前原型构建时针对普通边距使用的强硬 `1px`，在此采用 `h-[0.5px]` 对抗物理屏幕显示。这是针对 iOS Retina 标准渲染底层在处理 `1 physical point` 的逻辑等代换方案，使得 `Line Divider` 轻薄锋利。
- **内部偏移层嵌套隔断 (Inset Line Isolations)**：
   - Group 2 中所有的内容切割线依靠父级的 `relative` 定位向内部下伸。左侧统一强制内缩出 `left-[16px]` 空间。通过此技巧精确模仿原生 iOS 表单组件中那条永不抵达左侧基准缝隙的短分割线。

## 🎨 视觉规范

### 1. 自定义细节 (Design Tokens)

- **Slack Blue 与 Apple System Greys 控制**：
   - 顶部控制操作符左侧的撤回动作施以了纯正的高饱和度品牌链接蓝 `#0B82E5`。而在其他所有的间隔模块与底图中，毫无造作地大规模应用了原生级别的 `#F2F2F7` 与表单背景骨架灰 `#C8C7CC` 行走系统感。
- **警示色域管理 (Destructive Contexts)**：
   - 剥离了平时闲时沟通界面对于橘黄蓝色的滥用。在核心开关上 `Turn Off` 使用 `#E01E5A`。这是 Slack 继承至红色的变种，兼具破坏命令性与品牌包容感。
