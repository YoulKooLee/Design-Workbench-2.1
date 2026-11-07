# 05 · 模板转译 · 工作台页面模板

> open-design 精选 prototype 模板 → 产品设计工作台页面模板 的转译成果归档。
> 同步自 `D:\产品设计工作台\03-组件库\02-页面模板`（2026-10-23）。

## 转译形态

工作台页面模板真源 = `03-组件库\02-页面模板`：
- `templates\{slug}\index.tsx`：原型页 React TSX，与 `_project-template\src\prototypes\sample-page` 同构
  - 使用 `PrototypeLayout`（左设计稿 + 右侧结构化设计说明面板）
  - 左侧可说明区域打 `data-proto-id`，与右侧 `modules`（`id/bind`）自动连线
  - 零额外依赖（内联样式），`requiresDependencyInstall=false`
- `templates.json`：注册索引（id/title/slug/sourcePath/coverPath/description/author/extraDependencies/requiresDependencyInstall）
- `covers\{slug}.webp`：封面图

## 6 个转译模板

| slug | 中文名 | 蓝本（open-design） | 形态 |
|---|---|---|---|
| od-dashboard | 运营管理仪表盘 | Pulse 分析仪表盘 | 侧栏+顶栏+4 KPI+收入折线+新账户/最近事件 |
| od-saas-landing | SaaS 产品落地页 | Filebase 落地页 | 导航/首屏/三列功能/客户证明/三档定价/收尾 CTA |
| od-pricing-page | 产品定价页 | Filebase 定价页 | 页头+月/年切换+三档+对比表+FAQ |
| od-mobile-app | 移动端专注 App | Tomato 番茄钟 | 手机外壳+计时卡+统计+任务+底部导航 |
| od-kanban-board | 项目任务看板 | Growth Squad 看板 | 四列看板+筛选条+迭代进度侧栏 |
| od-wireframe-annotated | 标注线框图（落地页） | Acme Redline | 灰块线框+编号钉①-⑤+逐块设计说明 |

## 转译规则（本批执行口径）

1. UI 文案本地化为中文大众白话；TOTP/2FA 等技术术语改写成用户视角说法
2. 技术细节一律进右侧设计说明卡片，不暴露在可见页面上
3. 保留蓝本核心结构与视觉（CSS 变量配色、布局原语内联化）
4. 每模块 `id/bind` 与左侧 `data-proto-id` 一一配对（校验脚本通过）

## 文件说明

- `templates\{slug}-index.tsx`：转译后的原型页源码（与工作台 `templates\{slug}\index.tsx` 一致）
- `covers\{slug}.webp`：中文封面（800×450）
- 工作台注册：`03-组件库\02-页面模板\templates.json` 已追加 6 条（52 条），author = open-design（豆包转译），零依赖

## 待办 / 已知限制

- `previewUrl`/`authorUrl` 为空（open-design 无在线预览源），组件库「预览」暂不可用
- 端到端验证依赖工作台 Make 管理端（新建项目选页面模板实测），本批为静态验证
- GitHub 未推送，待工作台测试通过后再推
