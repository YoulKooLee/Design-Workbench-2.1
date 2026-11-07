# 06 · 设计系统转译 · shadcn / default / clean

> open-design `design-systems` 中与工作台最相关的三个设计系统包的中文转译归档（2026-10-23）。
> 原包位于 `D:\Github开源项目\open-design\design-systems\{shadcn,default,clean}`，schema `od-design-system-project/v1`。

## 三包对比

| 维度 | shadcn | default（Neutral Modern） | clean |
|---|---|---|---|
| 定位 | Modern & Minimal · 极简黑白 | Starter · 中性实用默认（B2B/后台首选） | Modern & Minimal · 简洁留白 |
| 背景 `--bg` | `#ffffff` | `#fafafa` | `#ffffff` |
| 前景 `--fg` | `#111827`（slate-900） | `#111111` | `#111111` |
| 强调 `--accent` | `#000000`（纯黑 CTA） | `#2f6feb`（钴蓝） | `#111111`（tokens 实际值）* |
| 次要文本 `--muted` | `#64748b` | `#6b6b6b` | `#707070` |
| 语义色 | success `#16a34a` / warn `#d97706` / danger `#dc2626` | success `#17a34a` / warn `#eab308` / danger `#dc2626` | success `#168a46` / warn `#b7791f` / danger `#c53030` |
| 字体 | Geist（正文/展示）· Fira Code（等宽） | Inter ×2 · JetBrains Mono | Inter · SF Mono |
| 字号阶梯 | 12/14/16/20/24/32/40/48 | 12/14/16/20/24/32/48/64 | 12/14/16/18/24/36/54/76 |
| 间距 | 4 网格（4→48） | 4 网格（4→80） | 4 网格（4→48） |
| 圆角 | sm 6 / md 8 / lg 12 / pill 9999 | sm 8 / md 12 / lg 16 / pill 9999 | sm 4 / md 8 / lg 12 / pill 9999 |
| 层级 | flat/ring/raised 双层发丝阴影 | flat/ring/raised 2px+8px | flat/ring/raised 16px+40px 大投影 |
| 焦点环 | `0 0 0 2px bg, 0 0 0 4px accent`（双层签名式） | `0 0 0 3px accent@70%` | `0 0 0 3px fg@18%` |
| 容器宽 | 1280px | 1200px（12 列栅格） | 1180px |

\* clean 差异提示：`DESIGN.md`/`USAGE.md` 声明 Primary `#3B82F6`（蓝），但可执行的 `tokens.css` 实际绑定 `--accent: #111111`（黑）。归档以 **tokens.css 为可执行真源**，DESIGN.md 的蓝色仅作设计意图参考——接入工作台时按实际成品形态（黑 accent）处理。

## 组件体系（三包共用 9 组）

按钮（btn / btn-primary / btn-secondary / btn-ghost）· 输入（field / label / placeholder / focus-visible）· 卡片（card）· 徽标（badge 系列 / status）· 链接 · 键盘提示 kbd · 图标槽 icon · 排版工具（eyebrow / lede / body-muted / body-sm）· 布局原语（container / stack-2..6 / row-between）

clean 额外：panel / panel-head / tile / card-row；缺 keyboard/icons 两组。

## 目录说明

- `01-转译版\{slug}\`：中文转译文档（DESIGN.zh 设计规范 · 令牌.zh 令牌规约 · 组件清单.zh）
- `02-可复用资产\{slug}\`：原样可复用文件（tokens.css / tailwind-v4.css / design-tokens.json / components.html / components.manifest.json）
  - **components.html** 即组件 fixture（自包含单文件，含完整选择器与状态），可直接作为工作台组件库「index.html 目录格式」的组件底稿
  - **tokens.css** 的 `:root` 块可整段粘贴进原型/页面模板首个 `<style>`

## 工作台接入建议（后续可执行）

1. `components.html` → 工作台 `03-组件库\03-页面组件\{shadcn,neutral-modern,clean}\`（Make「组件」页签 index.html 目录格式）
2. `tokens.css` → 组件统一引入 `:root` 令牌；页面模板通过 `var(--*)` 消费
3. 与现有 Codebuddy Design / Vibe Design Pro 并存为独立设计系统包；切换品牌即切换令牌层
4. 待用户拍板后执行；GitHub 推送同样等测试通过后
