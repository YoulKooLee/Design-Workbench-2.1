# 设计系统 · Neutral Modern（default，中文转译）

> 原档：`open-design/design-systems/default/DESIGN.md`
> 定位：Starter —— 干净的、产品向默认值。brief 未指定情绪时使用；适合 B2B 工具、仪表盘与工具页。

## 视觉主题与氛围

平静、实用、安静自信。零装饰。内容优先、铬边其次（Content-first, chrome-second）。

## 色彩板与角色

| 令牌角色 | 值 | 说明 |
|---|---|---|
| Background | `#FAFAFA` | 页面背景 |
| Foreground | `#111111` | 前景/正文 |
| Accent | `#2F6FEB`（钴蓝） | 主 CTA、链接、每屏一个 hero 元素 |
| Muted | `#6B6B6B` | 次要文本、说明文字 |
| Border | `#E5E5E5` | 边框 |
| Surface | `#FFFFFF` | 卡片、弹窗 |
| Success / Warn / Danger | `#17A34A` / `#EAB308` / `#DC2626` | 状态色 |

**禁纯黑、禁纯白作背景。**

## 字体规则

- **展示/标题**：`'Inter', -apple-system, system-ui, sans-serif`，字重 600
- **正文**：同族，字重 400
- **等宽**：`ui-monospace, 'JetBrains Mono', monospace`
- **字号阶梯**：12 · 14 · 16 · 20 · 24 · 32 · 48 · 64 px
- **行高**：正文 1.5，标题 1.2
- **字距**：≥32px 的展示字号 -0.01em

## 组件样式

- **按钮**：8px 圆角、纵向 padding 10px、横向 16px。主=钴蓝填充+白字；次=1px 边+透明底
- **卡片**：白底、1px 边、12px 圆角、20px 内边距，默认无阴影
- **输入**：1px 边、8px 圆角、纵向 10px；聚焦时钴蓝边框
- **链接**：钴蓝、无下划线，hover 加下划线

## 布局原则

- 12 列栅格、最大宽 1200px、24px 槽距
- Hero：40–60vh；内容顶对齐，绝不垂直居中
- 区块：桌面上下 80px、平板 48px、手机 32px
- 留白是主要分隔手段；分隔线只用于无关的顶层区块之间

## 层级与抬升（仅两层）

- **Flat (0)**：默认
- **Raised (1)**：下拉、弹窗、悬浮按钮。2px y 偏移、8px blur、前景 8% 不透明度
- 无新拟物、无玻璃拟态

## Do's and Don'ts

- ✅ 让留白干活
- ✅ 每屏一个强调元素
- ✅ 标题默认句首大写（sentence-case）；仅品牌名用全大写（title case）
- ❌ 无渐变（Hero 上 accent→accent@80% 少量除外）
- ❌ 输入无投影
- ❌ 一屏不超过三种字号

## 响应式

- **桌面 ≥1024px**：12 列
- **平板 640–1023px**：8 列、16px 槽距
- **手机 <640px**：4 列、12px 槽距；Hero 降到 40vh

## Agent 提示

- 拿不准就做减法：更少的盒子、更少的铬边、更多的留白
- 强调色克制：每屏至多一个 hero 强调 + 一个 CTA 强调
- 色板外禁造 hex；确需时在产物中给警告注释并用最接近的现有令牌
