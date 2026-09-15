# Slack Calling Outgoing Modal

## 📋 概述

### 1. 核心业务与场景定位

这是 Slack APP 原型中的 VoIP 发起呼叫屏（Outgoing Call Screen）。处于拨号呼叫接通过程中（"Calling..."状态）。这体现了应用级的全屏沉浸状态，彻底遮蔽了所有业务列表和导航，专注于当前的通信会话控制。

### 2. 用户目标与关键任务

- **观察呼叫进程**：查阅呼叫对象（"huang"）以及观察呼叫建立状态的菊花加载器。
- **通信设备切换控制**：在呼出过程中直接切换 Speaker (免提音响) 以及预先设定 Mute (静音模式)。
- **呼叫阻断**：按下代表终止含义的最显眼的红色 `Leave Call` 中断连接放弃呼出。

## 🧩 内容规划

### 1. 信息架构与模块划分

页面脱离了常规业务白底色的设定，采用了极具沉浸感的 `bg-black` 黑色深背景，保护视力同时拉升沉浸度。

1. **Top Header & Information 层**：
   - 最上方呈现 iOS 常规通信白底色翻转后的全黑反白 Status Bar。
   - 正对下来提供了小型的对象反馈（防止在超大长屏幕设备上中间大图焦点偏移）。
2. **中心画像主焦点 (Caller Avatar)**：
   - 使用了一张超大型正方形（`w-[240px] h-[240px]`）带大幅圆角的图像展现被叫者。由于处于处理阶段，该图像正中央悬浮了一只纯正的 iOS Daisy Wheel 菊花加载圈。
3. **底部动作条 (Call Action Controls)**：
   - 包含三大件：扬声器、挂断（终止）、静音设备设定。
   - 扬声器和静音保持圆环透白边框样式 `bg-white/5 border-white/25`，具备高层级磨砂玻璃态体验。而挂机键则是全场唯一的红色高亮 `bg-[#E02636]`。

### 2. 数据与内容来源

此页面中包含了一个极为复杂的受叫方角色头像 (`viking_avatar.png`)。由于规避了无端引入非代码图源的红线，**通过使用 `generate_image` 生图工具现场制作**获取了一枚完美的 Viking Warrior 纯灰黑色印花画像。完全满足了 1:1 的视觉映射标准。其余底盘元素（例如 `MicOff`、向下的 `Phone` 挂机体）完全由 `lucide-react` 本地支持。

## 📐 布局与结构

- **纯 CSS 菊花生成术 (CSS Loader Generator)**：截屏居中的呼号菊花圈是由一个映射了 12 个等角旋转原点 `transformOrigin: '50% 20px'` 的 CSS `Array.map` 循环实现。并直接通过内联 `@keyframes iosDropOpacity` 实现无需位图的精美渐隐式动画拨盘。
- **对角线降级利用**：将 `Phone` 拨打按钮（听筒样式）原地做了一次 `-135` 度的硬旋转（`transform rotate-[135deg]`），直接将通常偏向上侧的听筒图案转变为倒置结构（放下的话筒 = 挂断挂机手势），并利用 `fill="currentColor"` 化解了线框填充为实心按钮的视觉还原。

## 🎨 视觉规范

### 1. 自定义细节 (Design Tokens)

- **纯体全黑 (Absolute Pitch Black)**：`bg-black text-white` 控制主流程全黑极简基盘。这极大地对撞了原型的普通纯白界面。
- **危险信号红 (Destructive Red)**：`#E02636` 对准 iOS 常规断代大红。
- **毛玻璃底环 (Glassmorphism rings)**：底盘控制使用了 `border-white/25 bg-white/5` 建立微反光物理边际以防跟黑色外空背景死板合融。
