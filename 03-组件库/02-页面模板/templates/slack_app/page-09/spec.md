# Slack File Filter Menu

## 📋 概述

### 1. 核心业务与场景定位

这是 Slack APP 原型中的文件列表过滤视图（File Filter Menu）。基于上一页 (Page 08) 用户点击了顶部的 `All Files` 下拉控制栏。交互行为上触发了原地的内联下拉列表面板（而非底部抽屉），展示支持筛选的不同文件类型体系。随着面板向下拓展，背景的常规主视图区域被全局黯淡层 `Overlay` 覆盖并挂起事件响应。

### 2. 用户目标与关键任务

- **多维过滤**：针对群内庞大的资料通过预设的文件分型（如 Posts, Snippets, Emails, PDF 等）进行精确过滤流式定位。
- **取消返回**：点按左上角原生的灰度 `X` 或触滑黑色背景层退出。

## 🧩 内容规划

### 1. 信息架构与模块划分

整体采用叠层遮罩模型（Overlay Stacking Model）：

1. **Header 行**：
   - 保留上一页的状态，但由于属于拉下状态，`Header` 实际不再具有可点击呼出 `Menu` 的行为。底部白线分界与下方块融合。
2. **下拉选项块 (Dropdown Menu Array)**：
   - 处于紧邻主 Navigation Bar 正下方的浅灰背景中（`#F9F9F9`）。
   - 提供含有 `1x SVG Icon + 文字` 的均等行高清单。支持：
     - 全部 `All Files`
     - 富文本及片段 `Posts` & `Snippets` (特摄的 `[T]` 版框 SVG).
     - 常规文件流 `Emails`, `Images`, `PDF`.
     - 整合第三方 `Google Docs` (特摄的中空三角标 SVG).
3. **主场景垫底层 (Under-Content/Base Layer)**：
   - 这部分是对前序页面处于空数据状况（Empty State）状态的一种快照垫底。
   - 包括上一屏幕原貌中的 Tabs (`Everyone` vs `Just You`) 以及原本呈白色的背景文字："Files live in channels, but...".
   - **关键覆盖层**：添加 Absolute 定位的黑色渐变层 `opacity-[0.55]` 对原本白亮亮空状态加以遮蔽压暗效果，强行聚焦前台的下拉选择栏口。

## 📐 布局与结构

- **DOM 堆栈层级 Z-Index**：控制视图流向的关键。
  - Header 定格在最上：`z-30`。
  - 下拉面板次顶：`z-20` (不使用绝对定位盖章而是挤推了下面 DOM 的外边距流模型以顺应截图视觉)。
  - 遮罩层在底层：作为背景面板容器的独立覆盖件 `z-10`，其与 Background Empty-state 原文在同一 `relative` parent context 框架内重叠组装。

## 🎨 视觉规范

### 1. 自定义细节 (Design Tokens)

全面使用由 `rules/design-guide` 规定的准则：

- **遮罩黑**：使用 `#000000` 并伴随 `0.55` 左右混光透出下方由于原本有 `#1878F3` (蓝色) 或 `#F4F4F4` (浅灰) Tabs 而折射出的幽幽底带深色视觉差。
- **自定义精微 Icon**：不借助庞杂外部依赖，纯使用手写 SVG 重造了 Google Drive 轮廓形态（中空三角套三角）和 Slack 经典 Snippets 特有的边界线包围文本框图例 `[T]`。
