# 产品线 · open-design 资产（软件开发向）

> 来源：`D:\Github开源项目\open-design`（nexu-io/open-design，Apache-2.0 协议）
> 维护方：豆包（工作台共享目录唯一维护方）
> 分流时间：2026-10-22

## 分流原则

open-design 是协作式 AI 设计 agent 工作台（软件原型 + 视频 + PPT + 图像全包）。
本目录只收**软件开发向**资产（可整合进产品设计工作台 03-组件库 / 技能库）；视频/图像创作向资产在 `..\漫剧线`；PPT/社交/海报等无对应平台的剔除。

## 目录结构

```
产品线/
├── skills/                    # 功能性技能（保留 SKILL.md 原样 + 许可）
│   ├── 设计规范/               # apple-hig(苹果全平台HIG) wpds ui-ux-pro-max swiftui-design web-design-guidelines
│   ├── 前端实现/               # frontend-dev shadcn-ui web-clone image-to-code-skill web-artifacts-builder frontend-skill imagegen-frontend-*
│   ├── 审查评审/               # design-review reference-design-contract pr-feedback-quality-gate plan-design-review design-consultation redesign-skill
│   ├── 文案品牌/               # copywriting brand-guidelines marketing-psychology creative-director design-brief brainstorming
│   └── Web动效/                # ui-animation d3-visualization threejs emilkowalski-motion motion-design gsap-*(8) impeccable-design-polish emil-design-eng
├── design-templates/          # 渲染模板（SKILL.md + example.html + references）
│   ├── 页面模板/               # web-prototype* saas-landing dashboard pricing-page mobile-app wireframe 系列等 35 个
│   ├── 线框原型/               # wireframe-annotated wireframe-greybox wireframe-mobile-flow wireframe-sketch
│   └── 文档报告/               # pm-spec finance-report dcf-valuation eng-runbook clinical-case-report 等 9 个
└── docs/                      # 设计系统规范知识
    ├── design-systems.md
    ├── design-system-tracking-spec.md
    └── skills-protocol.md
└── prototype上下文工程/       # prototype 上下文工程挖掘与转译归档
    ├── 00-总览/ 01-注入上下文-原版/ 02-注入上下文-翻译版/ 03-转译接入方案/
    ├── 04-模板与组件挖掘/      # 60 模板清单 + 152 设计系统包清单 + 精选原版/翻译版
    ├── 05-模板转译-工作台页面模板/   # 6 个 TSX 转译成果（od-dashboard 等）
    └── 06-设计系统转译/        # shadcn/default/clean 三包中文转译 + 可复用资产
```

## 后续整合计划（待用户确认后执行）

| 批次 | 资产 | 落点（产品设计工作台） | 改造 | 状态 |
|---|---|---|---|---|
| P2 | skills/设计规范 5 组 | 03-知识库 / 03-UI风格 | 低：转知识文档 | 待执行 |
| P3 | skills 前端实现/审查/文案/Web动效 | `_project-template\.agents\skills` | 中：剥离 od.* 元数据、description 中文化、与现有 50 技能查重 | 待执行 |
| P4 | design-templates 页面/线框/文档 | 03-组件库\02-页面模板 | 高：单文件 HTML → React TSX（PrototypeLayout）转译 + 封面 + templates.json 登记 | 6 个已转译入库（od-dashboard/saas-landing/pricing-page/mobile-app/kanban-board/wireframe-annotated），转译成果归档于 prototype上下文工程\05 |
| P5 | design-systems shadcn/default/clean | 03-组件库\03-页面组件 | 中：components.html → 组件 index.html 目录格式 + tokens.css 令牌层 | 转译与归档完成（06-设计系统转译），入库待拍板 |

## 许可说明

- 全库 Apache-2.0，可整合可改造；`web-clone` 源自 MIT 项目（Jane-xiaoer/claude-skill-web-clone），各技能自带 LICENSE 请保留。
- 整合进工作台时保留来源标注（上游 open-design）。
