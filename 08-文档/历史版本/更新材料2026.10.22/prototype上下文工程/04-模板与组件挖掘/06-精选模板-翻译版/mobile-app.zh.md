# Mobile App 模板技能（中文翻译版）

> 原文：`design-templates/mobile-app/SKILL.md`（原版见 `03-精选模板-原版\mobile-app\`）
> 性质：prototype 模板注入——移动 App 屏幕（iPhone 15 Pro 外壳内渲染）
> 翻译：豆包，2026-10-23。类名/标记保留原文。

---

```yaml
name: mobile-app
description: |
  移动 App 屏幕，页面内渲染在像素精确的 iPhone 15 Pro 外壳中。复制种子
  `assets/template.html` 并粘贴 `references/layouts.md` 中的一个屏幕原型。
  当 brief 要求「mobile app」「iOS app」「Android app」「phone screen」「app UI」时使用。
triggers:
  - "mobile app"
  - "ios app"
  - "android app"
  - "phone screen"
  - "app ui"
  - "app mockup"
  - "移动端"
  - "手机 app"
od:
  mode: prototype
  platform: mobile
  scenario: design
  preview:
    type: html
    entry: index.html
  design_system:
    requires: true
    sections: [color, typography, layout, components]
  craft:
    requires: [state-coverage, animation-discipline]
```

# Mobile App 技能

产出单张移动 App 屏幕 mockup，装在真实感的 iPhone 15 Pro 设备外壳内。

## 资源地图

```
mobile-app/
├── SKILL.md                ← 你正在读的这份
├── assets/
│   └── template.html       ← 种子：设备外壳 + 屏幕原语（先读）
└── references/
    ├── layouts.md          ← 6 种屏幕原型（Feed / Detail / Onboarding / Profile / Checkout / Focus）
    └── checklist.md        ← P0/P1/P2 自检（anti-fake-device）
```

## 工作流

### 步骤 0 —— 预检

1. **从头到尾读 `assets/template.html`**（到 `<style>` 块结束）。Dynamic Island、状态栏 SVG 图标、Home 指示条、侧键与 tab bar 都已用 HTML/SVG 画好——**不要在每个屏幕上重新实现它们。**
2. **读 `references/layouts.md`**，知道 6 种原型存在。
3. **读激活的 DESIGN.md**——把它的 token 映射到种子里的六个 `:root` 变量。

### 步骤 1 —— 复制种子

（原版步骤 1–5 与 web-prototype 同构：复制种子 → 选 1 种屏幕原型 → 从 layouts.md 粘贴并填充真实文案 → 按 checklist 自检 → 写盘 index.html，之后一条简短总结，不输出完整源码。）
