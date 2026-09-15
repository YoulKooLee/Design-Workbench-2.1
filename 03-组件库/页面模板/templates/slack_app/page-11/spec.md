# Slack Activity Empty State

## 📋 概述

### 1. 核心业务与场景定位

这是 Slack APP 原型中的 "Activity" 面板的空数据状态页（Empty State）。当新建立工作区或某位成员刚刚加入尚无其他人涉及互动（Mention/Reactions）时，提供一个充满品牌趣味性的友好过渡展示界面。

### 2. 用户目标与关键任务

- **心智填充**：让暂无实质进展的用户理解此页面的未来价值（接收别人的 `@` 提及和表情符号互动）。
- **取消返回**：左上角标准的 `X` 号，用于收起目前 Modal 或推入新的应用流。

## 🧩 内容规划

### 1. 信息架构与模块划分

页面摒除了任何冗余结构，由简单的三大层组成：

1. **Top Nav 层**：
   - 使用 iOS 标准 Modal Navigation，包含底色全白的 App Header。标题 `Activity` 以纯黑色居中，左侧置放了退出控件。
2. **抽象插画图层 (Custom Illustration Viewport)**：
   - 核心亮点区。位于空屏幕的正中间，以典型的 Slack 品牌语言绘制了一个飘逸的插画群。
   - **Central `@` Icon**：深洋红色 (`#D1105A` - Slack Red 家族) 占据最高权重（Z-Index 提拔）。它代表了 Activity 中的首要触发器 "被提及"。
   - **Avatar & Emote Satellites**：围绕 `@` 中心散列着三种拟人化表征——绿底的卷发人像（代表其他同仁）、带眼镜的橙底小人像，以及一个绝对纯粹的 Slack 经典笑脸表情 🙂（`#FFD13B`），寓意着 Reactions（回复反馈）。
   - **Sparkles**：十字形的浅灰点缀星芒漂浮四方。
3. **正文宣导层**：
   - 文字 `“One day, this will be filled with mentions and reactions just for you.”`。使用 `#A1A1AA` 进行大面积减负降噪排版，确保画面视觉焦点一直维持在上方彩插当中。

### 2. 数据与内容来源

完全硬编码（Hard-coded）的纯视觉布局设计页面，无任何动态表单连接。对于核心的复合插画，通过内建的 React-SVG (利用 `path`, `ellipse`, `line`) 进行完全无外部依赖的就地手工复刻，确保在原型环境极其平滑且不拉取多余静态资源。

## 📐 布局与结构

- **群组绝对层叠 (Absolute Anchoring)**：插画群内使用了包裹层 `relative mx-auto w-[180px] h-[130px]` 开辟一个小天地，然后其下所有的部件包含 `Sparkle` 皆通过 `absolute top-[px] left-[px]` 获取极其死板但无缝契合 Screenshot 的物理还原排布规律。
- **居中修正 (Optical Alignment)**：在总层利用 `-mt-10` 向上吊起了一点身位，对消了由底部长文本段落和上方较空余天花板给肉眼带来的 "元素沉底" 的假象错觉。

## 🎨 视觉规范

### 1. 自定义细节 (Design Tokens)

全面使用由 `rules/design-guide` 规定的准则：

- **品牌强色点睛**：由 `#D1105A` Slack Mention Red 主导视觉吸引；`#FFD13B` Emoji Yellow 提供情绪张力。
- **插画灰层基底**：散乱的十字标通过 `text-[#D1D1D6]` 加附不等额透明度（`opacity-0.4` - `0.6`）建立起层次感。
- **纯粹白境**：无其余底色干扰，整块组件深扎白底 `bg-white` 呈现清透原声体验。
