# 原型设计说明 · 接入规范（指针文件）

> 真源：`src/common/design-notes/规范.md`（v3.0，三份合一：Part A 模块接入 / Part B 打标 / Part C 卡片编写）。
> 本文件只保留红线速查与验收门槛，不重复正文；两处口径如有冲突，以规范.md 为准。
> 历史口径（2026-11-07 修正）：旧版本文件曾规定"必须 PrototypeLayout + description 整段 Markdown"，该写法已被 v3.0 取代，仅作旧原型兼容。

## 硬性要求

1. 所有原型页面的「设计说明」**必须**通过 `src/common/DesignNotesPanel`（或经 `PrototypeLayout` 内嵌）渲染，**禁止**在原型页面里手写内联 `<aside>` / `<div className="...-panel">` 之类的自绘说明区。
2. 新原型接入按规范.md Part B 三步执行：打标（左侧区域 `data-proto-id`，可选 `data-proto-label`）→ 卡片（传 `modules`，单卡双页签：页面说明 + 可选接口说明）→ 落盘（注入 `onSave` 适配器；不传则降级 localStorage 草稿）。
3. 旧格式兼容：`PrototypeLayout` 仍可传 `description`（纯 Markdown 按 `## ` 自动拆卡），只用于维护旧页面，新页面禁止。
4. 卡片内容守 Part C §8.1 内容来源红线：每条出自该页 PRD / SRS 或其蒸馏产物，逐项讲开发内容、边界与要求、交互细节、注意事项；**禁写会话过程与经验教训/踩坑叙事**。
5. 成稿后用 `humanizer-zh` 技能去 AI 味，只调措辞、不增删事实。

## 验收（自检）

- [ ] 用的是 DesignNotesPanel / PrototypeLayout，没有内联自绘说明区
- [ ] 每卡对应左侧一个真实区块，打标元素与卡片连线一一对应、悬停联动正常
- [ ] 卡片状态标记（设计中 / 已评审 / 待开发 / 开发中 / 已完成）与真实进度一致
- [ ] 通过 `onSave` 落盘（或明确接受草稿降级），刷新后数据不丢
- [ ] `npm run typecheck` 通过
