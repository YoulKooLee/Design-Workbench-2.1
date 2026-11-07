# Dashboard 模板技能（中文翻译版）

> 原文：`design-templates/dashboard/SKILL.md`（原版见 `03-精选模板-原版\dashboard\`）
> 性质：prototype 模板注入——运营/管理后台原型
> 翻译：豆包，2026-10-23。类名/标记保留原文。

---

```yaml
name: dashboard
description: |
  单文件 HTML 管理/分析仪表盘。固定左侧栏、带用户/搜索的顶栏、KPI 卡主网格与一到两个图表。
  当 brief 要求「dashboard」「admin」「analytics」「control panel」屏幕时使用。
triggers:
  - "dashboard"
  - "admin panel"
  - "analytics"
  - "control panel"
  - "后台"
  - "管理后台"
od:
  mode: prototype
  platform: desktop
  scenario: operations
  preview:
    type: html
    entry: index.html
  design_system:
    requires: true
    sections: [color, typography, layout, components]
  craft:
    requires: [state-coverage, accessibility-baseline, laws-of-ux]
```

# Dashboard 技能

产出单屏管理/分析仪表盘。

## 工作流

1. **读激活的 DESIGN.md**（已注入上方）。颜色、字体、间距、组件样式全部来自它。**不发明新 token。**
2. **归类**仪表盘监测什么（销售、流量、用量、事件、运维等）。生成具体、可信的指标名与数值——**不用 "Metric A / Metric B" 占位。**
3. **布局**要求的区域：
   - **左侧栏**（220–260px）：顶部品牌标、6–8 个带图标的导航链接、激活态用设计系统强调色。
   - **顶栏**：左侧页面标题，右侧搜索输入 + 用户头像/状态。
   - **主区**：
     - 行 1：3–4 张 KPI 卡（标签 + 大数字 + 与上期环比）。
     - 行 2：一张主图（全宽或 2/3）——用看起来真实的数字画内联 SVG 折线/柱/面积图。
     - 行 3：一张副图或表格（最近事件、热门条目等）。
4. **写**一个自包含 HTML 文档：
   - `<!doctype html>` 到 `</html>`，CSS 在一个内联 `<style>` 块。
   - 整体布局用 CSS Grid；卡片内用 Flexbox。
   - 语义 HTML：`<aside>`、`<header>`、`<main>`、`<section>`。
   - 每个逻辑区带 `data-od-id="slug"` 供注释模式定位。
5. **图表**：只用内联 SVG，不用 JS 库。折线图 ≈10 行 `<polyline>` + 微妙面积填充；柱状图是 N 个 `<rect>`，设计系统强调色填充。坐标轴轻标注（弱化文字、更小刻度）。
6. **自检**：
   - 每个颜色来自 DESIGN.md token。
   - 强调色最多用两次（侧栏激活 + 一个图表高亮）。
   - 侧栏与顶栏吸顶；主区独立滚动。
   - 密度匹配设计系统情绪——宽松 DS 更多留白，密集 DS（交易、加密）收紧行距。

## 输出契约

在 `<artifact>` 标签之间输出：

```
<artifact identifier="dashboard-slug" type="text/html" title="Dashboard Title">
<!doctype html>
<html>...</html>
</artifact>
```

artifact 之前一句话，之后不再输出。
