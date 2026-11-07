# 01 · Prototype 模板清单与分类

> 数据：`design-templates\` 实测（2026-10-23）。60 个 mode=prototype 模板，按场景分类。

## 一、模板构成（prototype 模板的统一结构）

```
design-templates/<slug>/
├── SKILL.md          ← frontmatter（name/description/triggers/od.*）+ 工作流 + 输出契约
└── example.html      ← 示例成品（7–13KB，单文件 HTML）
可选：
├── assets/template.html   ← 种子：tokens + class 系统 + chrome（web-prototype/mobile-app 等）
└── references/
    ├── layouts.md         ← 区块骨架库（8 个 / 6 个屏幕原型等）
    └── checklist.md       ← P0/P1/P2 自检
```

**SKILL.md frontmatter 关键字段**（注入声明）：

| 字段 | 含义 | 示例 |
|---|---|---|
| `od.mode` | 任务类型 | prototype |
| `od.platform` | 平台 | desktop / mobile / web / auto |
| `od.scenario` | 场景 | marketing / operations / design / finance / healthcare / hr / product / sales / personal / engineering / orbit |
| `od.fidelity` | 保真度 | wireframe（默认高保真） |
| `od.design_system.requires` | 是否强制绑定设计系统 | true（大多数）/ false（wireframe-annotated） |
| `od.craft.requires` | 需注入的 craft 规则 | `[state-coverage, accessibility-baseline, laws-of-ux]` |
| `od.inputs` / `od.parameters` | 模板表单（新建项目参数） | saas-landing：product_name / tagline / has_pricing / proof_count / hero_density |

## 二、60 个 prototype 模板分类表

### A. 通用原型（13）
| 模板 | 平台 | 场景 | 说明 |
|---|---|---|---|
| web-prototype | desktop | design | 通用桌面网页原型（已在上层归档全套） |
| mobile-app | mobile | design | 移动 App 屏幕，iPhone 15 Pro 外壳内渲染，6 种屏幕原型（Feed/Detail/Onboarding/Profile/Checkout/Focus） |
| mobile-onboarding | mobile | design | 移动引导页 |
| wireframe-annotated | desktop | design | 标注/红线线框 + 右侧 SPEC PANEL（fidelity: wireframe） |
| wireframe-greybox | desktop | design | 灰块线框 |
| wireframe-mobile-flow | auto | design | 移动流程线框 |
| wireframe-sketch | desktop | design | 手绘风线框 |
| tweaks | desktop | design | 现有制品微调 |
| critique | desktop | design | 设计评审 |
| live-artifact | - | live | 实时制品 |
| webgl-experience | web | design | WebGL 体验页 |
| worker-visualizer | web | design | 工作器可视化 |
| x-research | - | - | 研究页 |

### B. 落地页 / 营销（13）
saas-landing、pricing-page、waitlist-page、kami-landing、aster-atelier、blog-post、digital-eguide、email-marketing、magazine-poster、social-carousel、motion-frames、sprite-animation、open-design-landing

### C. 仪表盘 / 运营（9）
dashboard（管理后台 KPI+图表）、flowai-live-dashboard-template、github-dashboard、live-dashboard、kanban-board、meeting-notes、social-media-dashboard、last30days、worker-visualizer

### D. 文档 / 工程（3）
docs-page、eng-runbook、contact-widget

### E. 金融 / 商务（4）
finance-report、invoice、dcf-valuation、ib-pitch-book（deck）

### F. 行业 / 业务（8）
clinical-case-report、hr-onboarding、team-okrs、pm-spec、dating-web、gamified-app、email-marketing、magazine-poster

### G. Orbit 设计师系列（5）
orbit-general、orbit-github、orbit-gmail、orbit-linear、orbit-notion（按工具风格的设计模板）

### H. 其他（5）
last30days、social-carousel、sprite-animation、worker-visualizer、x-research（跨类）

> 完整 60 清单见前述扫描（mode=prototype 全部）。

## 三、精选模板要点（原版见 `03-精选模板-原版\`）

### dashboard（管理后台）—— 与工作台业务最相关
- 结构：左栏（220–260px 品牌+6–8 导航+图标）、顶栏（标题 + 搜索 + 用户头像）、主区（Row1: 3–4 KPI 卡=标签+大数字+环比；Row2: 主图=内联 SVG 折线/柱/面积；Row3: 副图或表格）。
- 规则：CSS Grid 整体 + Flexbox 卡片内；语义 HTML（aside/header/main/section）；**内联 SVG 图表，禁 JS 库**（折线 ≈10 行 polyline）；强调色最多两次（侧栏激活 + 一个图表高亮）；密度随 DS 情绪（宽松 DS 多留白、交易/加密类收紧行距）。
- craft：state-coverage、accessibility-baseline、laws-of-ux。
- 指标：**不得用 "Metric A/B" 占位**，按业务生成具体可置信的名称与数值。

### wireframe-annotated（标注线框）—— 与工作台 annotation 同构
- 形态：浏览器 chrome 框内的灰块落地页 + 右侧「ANNOTATIONS/SPEC」面板；编号钉 ①②③④⑤ 单强调色，其余全灰。
- 结构：Top nav① / Hero② / Logo strip③ / Feature grid④ / Footer⑤；每个编号钉在 SPEC PANEL 有一行工程/UX 备注（"① 吸顶导航 64px，滚动收缩"、"④ ≥960px 三列→移动单列"）。
- 铁律：**扁平灰块，绝不像素级或手绘**；每个钉必须对应唯一 spec 行；强调色只在钉+编号上。

### mobile-app（移动 App）
- 种子 assets/template.html：Dynamic Island、状态栏 SVG 图标、Home 指示条、侧键、tab bar 已画好——**不要在每个屏幕重新实现**。
- references/layouts.md：6 种屏幕原型（Feed/Detail/Onboarding/Profile/Checkout/Focus）。
- craft：state-coverage、animation-discipline。

### saas-landing（SaaS 落地页）
- 表单化模板：inputs（product_name/tagline 必填，has_pricing/proof_count 可选）+ parameters（hero_density 等）。
- craft：typography、color、anti-ai-slop、laws-of-ux。
- 节奏：hero → features → social proof → pricing → CTA。

### kanban-board / pricing-page
- kanban：看板三列泳道 + 卡片状态覆盖；pricing：hero-center → 对比表 → CTA（对照 web-prototype 的 8-comparison 布局）。

## 四、输出契约（模板通用）

- 新建原型：写盘根 `index.html`（入口）；编辑保留现有入口。
- 单文件自包含 HTML：`<!doctype html>`→`</html>`，CSS 在一个内联 `<style>`，图表用内联 SVG。
- 每个逻辑区带 `data-od-id="slug"`（注释模式定位）——工作台对应 Axhub 标注体系。
- 交付 = 写盘即交付（ship-on-write），写后一条简短总结，不输出完整源码到对话。
