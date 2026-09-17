# 03-best-platform 页面规格说明

## 1. 业务与功能

### 1.1 页面/元素定位与核心目标
- **类型**：产品介绍与核心功能落地页 (Product Detail Platform Page)
- **目标**：全面介绍 Sketch 作为一个针对数字产品设计的优秀平台。通过极富表现力的 UI 截图、生动的大渐变背景和组件化插件生态的宣传，将“最佳平台”这一核心理念传递给用户。

### 1.2 功能清单
- **导航（Header & Nav）**：全站通用一致。
- **英雄首屏（Hero Section）**：大字加粗标题 “Make something great”，带有巨大黑色鼠标指针插图的粉橙色/渐变背景，强调创意爆发力。
- **Flexible design 段落**：浅绿色/微黄色的过渡大背景。展示左侧居中巨大的应用界面截图，右下方通过 4 个点段列举自由向量编辑与字体支持等功能。
- **Consistent design 段落**：浓郁的紫/红色大渐变背景。展示巨大的暗黑模式设计系统界面，左下包含 `Artboard Templates`、`Symbols` 等 4 个组件功能的详细解答。
- **Native to macOS 段落**：深沉黑灰色背景，突出其原生应用特性。左侧是原生的打勾列表（Dark mode, Touch bar, Silicon 支持），右侧为暗黑系统界面截屏。
- **Design that grows with you 段落**：展示随着时间演变带来的版本控制及组件库能力。
- **Make Sketch your own（插件生态）**：左上方简要引语，下方呈现 6 张插件集成生态卡片（2列×3行）。
- **What's new?**：两个巨大的白色卡片瓷砖，作为最新动态板块引流。
- **Final CTA & Review**：包含标志性的绿底大区块及一段创始人/设计总监的图文评价。
- **全局 Footer**：同样复用标准版权区块。

## 2. 内容规划

### 2.1 数据与文案流
基于 `03_The-best-platform-for-digital-product-design` 素材图：
1. **Hero**: "Do your best work with a powerful macOS app..."
2. **Flexible design**: "Pushing your boundaries means bending without breaking..."
3. **Consistent design**: "Projects move fast. Deadlines exist..."
4. **Native to macOS**: "Sketch feels right at home on the Mac..."
5. **Plugins**: 列表展示 Cluse, Pexels, Chart, Overflow, Plant, Crowdin 以表现生态厚度。

## 3. 布局与结构

- 交响乐式的跨区组合：本页面设计大量运用“全宽且高度超常规”的大面积渐变色调。
- 每个介绍模块的主图截取（Mac App mockup）均极其巨大，几乎横跨屏幕主视区的宽度。
- 内容与图片的节奏感：例如上一个模块是在右下角叙述（Flexible design），下一个模块（Consistent design）就移动到了左下角叙述。这种对角线或锯齿型的布局可以缓解视觉疲劳。

## 4. 视觉规范

### 4.1 色彩定义
- Hero Area: `#FFEFE2` - `#FBCFA7` - `#FCC28B` (粉杏橘渐变)
- Section "Consistent design": `#B847D9` 及周边的超大洋红色/紫色平滑渐变背景
- Section "Native to macOS": `#232221` 或 `#1D1C1B` (深色纯黑灰)
- Plugin Cards: 纯白背景，带淡淡的 `shadow-sm` 及 1 像素灰色边框。

### 4.2 特殊组件
- **Checklist**: 对号使用原生的绿色 `v` 形，紧贴左侧显示。
- **插件卡片**：包含插件图标 (Icon)，大标题，详细说明，以及底部细小的 `Plugin by [Creator]` 芯片标签。
