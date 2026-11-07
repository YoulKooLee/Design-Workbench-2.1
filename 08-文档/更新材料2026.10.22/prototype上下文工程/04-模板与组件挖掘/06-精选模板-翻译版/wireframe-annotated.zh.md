# Wireframe Annotated 模板技能（中文翻译版）

> 原文：`design-templates/wireframe-annotated/SKILL.md`（原版见 `03-精选模板-原版\wireframe-annotated\`）
> 性质：prototype 模板注入——标注/红线线框（fidelity: wireframe），与工作台 annotation 标注体系同构
> 翻译：豆包，2026-10-23。类名/标记保留原文。

---

```yaml
name: wireframe-annotated
description: |
  带标注/红线的低保真线框——桌面落地页/营销页画成浏览器 chrome 框内的扁平灰块，
  叠加编号标注钉（①②③④⑤）单一强调色，右侧配 SPEC PANEL 把每个编号钉列成一行
  工程/UX 备注。这是「线框 + 红线规格」风格——干净、扁平、低保真，不是手绘。
  当 brief 要求「annotated wireframe」「redline」「wireframe with spec」「lo-fi landing」
  「low fidelity」「线框图」「标注线框」「redline」时使用。
triggers:
  - "annotated wireframe"
  - "redline"
  - "wireframe spec"
  - "lo-fi landing"
  - "wireframe"
  - "low fidelity"
  - "标注线框图"
  - "redline 标注"
od:
  mode: prototype
  platform: desktop
  scenario: design
  fidelity: wireframe
  preview:
    type: html
    entry: index.html
  design_system:
    requires: false
    sections: [color, typography, layout, components]
  example_prompt: "为桌面落地页画一张标注红线线框——灰块导航、hero、logo 条、三列功能网格与页脚，编号钉 ①–⑤，右侧规格面板每个钉一条工程备注。"
```

# Wireframe Annotated 技能

产出单张扁平、低保真的落地页线框 + 红线规格。核心是「**结构 + 交接备注，不是像素**」——灰块承载布局，编号钉标出区域，右侧规格面板把每个钉变成一行工程/UX 备注。保持干净扁平；绝不手绘或潦草。

## 工作流

1. **跳过成品 UI。** 本技能明确要低保真灰块观感。排版 token 宽松遵循（标签用一款干净无衬线如 Inter/system-ui，规格备注与钉编号用一款等宽如 IBM Plex Mono）。用中等灰填充 + 明确的深色边框，页面要像缩略图一样可读——避免近白底白字（会渲染成空白）。

2. **搭两栏骨架。** 左 = 线框画布：浏览器 chrome 框内的灰块页面。右 = 窄「ANNOTATIONS / SPEC」面板。选一个强调色（珊瑚或蓝），**只**用于编号钉与对应的规格编号——其余全部保持灰阶。

3. **从上到下布局画布**，每个块是带编号钉（绝对定位其上）的灰块：
   - **顶部导航**——logo 灰块 + 导航 lorem 条 + 一个主按钮块。钉 ①。
   - **Hero**——大标题 lorem 条 + 副标题 + 左侧两个 CTA 按钮块；右侧大图占位（对角 X 的矩形）。钉 ②。
   - **Logo 条**——一排 5 个小灰块合作伙伴 logo。钉 ③。
   - **功能网格**——3 张卡，每张 = 图标方块 + 标题条 + 2 文本条。钉 ④。
   - **页脚**——多列 lorem 链接条。钉 ⑤。

4. **每个钉在规格面板有镜像行。** 每行规格 = 强调色圆圈编号 + 简短 mono/sans 备注，如「① 吸顶导航 64px，滚动收缩」「② Hero H1 48/56，CTA 主+幽灵对」「③ 5 个合作伙伴 logo，灰阶」「④ ≥960px 三列 → 移动单列」「⑤ 4 列页脚 + 法律行」。面板与每行标 `data-od-id`。

5. **自检**：
   - 画布上每个编号钉恰好对应一行规格。
   - 强调色只出现在钉 + 规格编号上；其余灰阶。
   - 缩略图尺寸下页面清晰可读；块融进背景就加深填充/边框。
   - 绝不能看起来像素级完美或手绘——只有扁平灰块。

## 输出契约

在 `<artifact>` 标签之间输出：

```
<artifact identifier="wireframe-slug" type="text/html" title="Annotated Wireframe — Title">
<!doctype html>
<html>...</html>
</artifact>
```

artifact 之前一句话，之后不再输出。
