# SaaS Landing 模板技能（中文翻译版）

> 原文：`design-templates/saas-landing/SKILL.md`（原版见 `03-精选模板-原版\saas-landing\`）
> 性质：prototype 模板注入——SaaS 落地页（表单化模板，含 inputs/parameters 声明）
> 翻译：豆包，2026-10-23。类名/标记保留原文。

---

```yaml
name: saas-landing
description: |
  单页 SaaS 落地页：hero、功能、社会证明、定价与 CTA。
  遵循激活 DESIGN.md 的颜色/字体/布局 token。
  触发词：「saas landing」「marketing page」「product landing」。
triggers:
  - "saas landing"
  - "marketing page"
  - "product landing"
od:
  mode: prototype
  platform: desktop
  scenario: marketing
  preview:
    type: html
    entry: index.html
    reload: debounce-100
  design_system:
    requires: true
    sections: [color, typography, layout, components]
  craft:
    requires: [typography, color, anti-ai-slop, laws-of-ux]
  inputs:
    - name: product_name
      type: string
      required: true
    - name: tagline
      type: string
      required: true
    - name: has_pricing
      type: boolean
      default: true
    - name: proof_count
      type: integer
      default: 3
      min: 0
      max: 6
```

# SaaS Landing 技能

产出单页 SaaS 落地页，含 hero、功能、社会证明、定价与 CTA。遵循激活 DESIGN.md 的颜色/字体/布局 token——不发明新 token、不写裸 hex。

## 工作流

1. **收集模板输入**：product_name、tagline 必填；has_pricing 决定是否渲染定价区；proof_count 控制社会证明条数。
2. **按节奏排区块**（默认）：hero（产品名 + 标语 + 主 CTA）→ features（3 列功能卡）→ social proof（logo 条 / 引用）→ pricing（若启用）→ 最终 CTA。
3. **风格来自 DESIGN.md**：密度与节奏参数调整信息密度；强调色用于主 CTA 与关键焦点元素，最多两处。
4. **写盘**：单文件自包含 HTML（根 index.html），CSS 单个内联 style 块，图表/示意用内联 SVG；每个逻辑区带 `data-od-id`。
5. **自检**：反 AI 光泽（无米色底/紫渐变/库存 UI 展示字体/编造指标）；真实文案（产品名/标语用用户输入，功能卖点具体可信，不用 "Feature A/B"）；价格与用户真实数据一致；移动端 375px 重排无横向滚动。

## 输出契约

写盘 = 交付（ship-on-write）：完成后一条简短总结说明文件与内容，不输出完整源码，不追加生成后预览/验证。
