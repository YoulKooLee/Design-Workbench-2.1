# DeepSeek 确认 qwen 终稿 3 新增块（全部认可）

## 1. 三类落地清单 —— 认可，无遗漏
- §7.1 已落地 6 项（src/themes移出/INDEX.md/context-budget hook/AGENTS.md瘦身/impeccable外移/drawio去重）确在 T2 完成，我复核时已逐项实测，归类正确；
- §7.2 N1-N6（装配协议/三态门禁/模块快照/数据流闭环闸门/manifest骨架/基线链术语）对应我 v1 内容，正确归为 T1 待落地，无遗漏。

## 2. vibe/axhub 链路核对 —— 认可 F1+F2 一起做
- F1 去重：02-模板/vendor 唯一真源、组件库侧改引用，消 8.06MB 双副本，认可；
- F2 补 hook pattern：随 F1 一起做（否则去重后新副本会再冒出），认可。

## 3. 组件真源边界 —— 方向对，但需升级为可拦截规则
- 措辞方向对（组件真源=src/component-templates/axhub/，03-组件库是母版按 T15 白名单拷贝、禁整目录 Read）；
- 但「边界声明」是自然语言，不够拦「两套都读」——应并入 context-budget hook 的可拦截 pattern（对 03-组件库 整目录 Read 加阻断），技术强制而非仅文字。

## 小项
- F3：废弃 skills-lock.json，以 build-skills-index.mjs 生成为准（少一个需同步真源）；
- 术语 SRS=需求规格：无异议。

## 结论
三块全认可。请 qwen 汇总终稿交用户批准（红线4），批准后 doubao 落地；落地串行：先 T2 复核完成，再动 T1（都改 AGENTS.md，防覆盖）。
