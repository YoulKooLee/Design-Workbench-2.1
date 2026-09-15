# 10-collaborative-design 页面规格说明

## 1. 业务与功能

### 1.1 页面/元素定位与核心目标
- **类型**：场景式功能落地页 (Use-case Landing Page)
- **目标**：强力宣传 Sketch 在多人协作（Collaboration）场景下的能力。主要从三类角色的视角（设计师、决策者、开发者）来论述 Sketch 的完美适应性。

### 1.2 功能清单
- **英雄首屏 (Hero Section)**：
  - 采用全屏宽度的**青色/翠绿色斜切背景块**。左侧文字区域，右侧切角留白。
- **三大场景模块 (3 Persona Use-Cases)**：
  - **Collaborate with Designers (与设计师协作)**：展示 Mac App 原生界面的强大。布局：顶部左侧引言，中心是巨大浮现的 Mac 界面，底部右侧堆叠四项功能清单（Share Workspace / Components / frameworks / document）。左侧边缘有闪电形状的装饰性图形。
  - **Collaborate with Decision Makers (与决策者协作)**：展示 Web App 的权限与查看控制。布局：顶部居中引言，中心悬浮 Web 工作区设置界面。底部左侧堆叠三项清单（Invite anybody / View designs anywhere / Keep every version safe）。右侧有粉色的三角/几何形装饰图形，左侧有灰色的圆石形装饰。
  - **Collaborate with Developers (与开发者协作)**：展示 Web App 的 Handoff 标注模式。布局：顶部居中引言，中心悬浮 Web 标注界面。底部右侧堆叠两项核心卖点以及外跳链接（Free access / Grab and go）。右侧边缘有半月形/C形装饰图形。
- **更新日志卡片 (What's new)**：极其紧凑的 2 个大型卡片并列（Artboard Templates / Restricted Projects）。
- **呼吁行动区与脚注 (CTA & Footer)**：包含绿色的 “Start your Sketch journey” 块，紧随其后的 Roberta Galea 的人物证言，以及常规 Footer。

## 2. 视觉特征与细节提取

### 2.1 排版韵律 (Cascading & Floating)
这个页面最精妙之处，在于那三张**核心演示图全部是“悬空”跨越不同区块的**。文字说明（清单区块）并非一板一眼地排在图片正下方，而是错落有致地排布在图片底部边缘旁边，使得图片阴影犹如直接投射在文字之上一样，制造了极佳的前后景深（Depth of Field）。

### 2.2 几何碎片 (Geometric Marginalia)
沿用了网页外缘装饰物的风格。大量的单色大尺幅几何碎片（Lightning, Pink Triangle, Crescent）飘浮在视口左右边界之外，营造出了活泼跳跃的协作氛围，同时也为大片留白提供了平衡点。

## 3. 实现要求
- 第一屏的**大尺寸斜切色块**可使用 Tailwind 的 `clip-path` 或者 CSS 的多边形路径，抑或简单的旋转 div 底层背景实现。
- 三大协作区块，需要极为小心地处理好相对/绝对定位的互相叠加层叠结构（`z-index`），要让文字和巨图的边缘产生微妙的叠加互动。每个区块的左右排布重心交替（右、左、右）形成之字形动线。
