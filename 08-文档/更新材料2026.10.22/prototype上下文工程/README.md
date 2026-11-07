# Prototype 上下文工程 · 归档说明

> **来源**：open-design（nexu-io/open-design，Apache-2.0 / MIT）
> **归档时间**：2026-10-23 · **归档人**：豆包（产品线维护方）
> **用途**：open-design 中「prototype（产品设计原型）」任务类型的完整上下文工程挖掘，供产品设计工作台对标与借鉴

## open-design 任务类型全景（prototype 是其中之一）

open-design 是协作式 AI 设计 agent 工作台，任务类型共 13 类：**prototype（产品设计）**、video、image、ppt（deck）、hyperframes、motion-design、marketing、live-artifact、web-clone、webgl、audio、document、discovery。

**其中只有 prototype 属于产品设计（软件界面原型）**；其余 12 类为视频/图像/PPT/动效/音频/文档/网页克隆等创作向任务——已分流至 `D:\Github开源项目\漫剧线` 或剔除。

## 本目录结构

```
prototype上下文工程/
├── README.md                          ← 本文件（索引）
├── 00-总览/
│   ├── 01-上下文架构与注入分层.md       ← 架构图 + 基线注入 + 条件注入（中文）
│   └── 02-工作流与约束.md              ← 规划→生产工作流 + 约束体系（中文）
├── 01-注入上下文-原版/                 ← 原版英文，逐字归档
│   ├── od-next-strategy/              ← core-system-prompt.md / general-orchestration.md / prototype.md / open-design.json / task-profile-mapping.md / SKILL.md
│   ├── prototype-task-profile-resources/  ← 设备外壳 iphone/android/neutral.html + layout.css（运行时 staging 资源）
│   ├── web-prototype-template/        ← 模板注入示例：web-prototype 模板全套（SKILL.md + template.html + layouts.md + checklist.md）
│   └── craft-rules/                   ← 通用设计规则 13 份（typography/color/anti-ai-slop/state-coverage 等）
└── 02-注入上下文-翻译版/               ← 中文全文翻译
    ├── core-system-prompt.zh.md       ← OD Next 核心系统提示（常驻基线）
    ├── general-orchestration.zh.md    ← 通用编排（常驻基线）
    ├── prototype-task-profile.zh.md   ← prototype 任务档案（条件注入）
    └── web-prototype-skill.zh.md      ← web-prototype 模板技能（模板注入示例）
```

## 核心结论（三句话）

1. **prototype 是 open-design 里注入量最大的任务类型**：常驻基线（核心章程 + 编排）之上，叠加 27KB 任务档案 + 设备外壳/布局原语资源 + 设计系统包 + 模板 SKILL。
2. **注入分五层**：核心章程（角色/优先级）→ 设计系统（品牌令牌）→ Craft（通用规则）→ 技能/模板（能力指令）→ 每轮追加（执行标记），后层优先级更高。
3. **工作流是"规划轮→生产轮"两段制**：规划轮产出可读计划 + 生产就绪标记即停；生产轮一次写盘即交付（ship-on-write），**禁止任何生成后质量检查**——质量靠"写源码时一次达标"。

## 可借鉴到产品设计工作台的点

| open-design 机制 | 工作台对标建议 |
|---|---|
| 文案长度预算（chip≤4汉字 / tile名≤5汉字 / 标语≤12汉字） | 组件库原型文案规范（与你 UI 白话化要求同源） |
| 设备外壳即呈现、不是设计系统（iphone/android/neutral.html） | 组件库 device-frame 体系 |
| layout.css 布局原语（.od-stat/.od-tile/.od-rail/.od-screen） | 组件库通用布局类 |
| 反 AI 光泽清单（禁米色底/紫渐变/Inter 展示字体等） | 03-UI风格 设计工艺规则 |
| ship-on-write（写盘即交付、一次达标） | 原型交付质量门 |
| 常驻基线压到极小 + 全部条件化 | AGENTS.md 上下文装载规范（千问上下文工程） |
