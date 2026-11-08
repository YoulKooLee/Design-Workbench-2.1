---
name: explore-options
description: Use when a Make client批注 or user request asks for 多方案探索, 多方案生成, 多方案对比, 方案对比, 设计决策, 比稿, 先出方案, or choosing among 2-3 UI/code modification directions before executing one.

exclude: "排除场景：目标/范围/验收标准尚未确定→用brainstorming；用户只是想看2-3个方案但不需要比稿决策→用brainstorming"
---

# 多方案探索

用于处理批注或需求里的多方案探索、生成和对比。目标是延续 Make client 的需求对齐和设计决策口径：先围绕当前问题发散出真实不同的设计方向，再通过方案对比收敛为一个可执行的设计决策。

## 流程

1. 先锁定共同约束：产品需求、当前页面目标、用户明确要求、不可改内容、设计基底和验收重点。
2. 先发散：没有指定数量时默认给 3 个方案；用户指定数量时严格按用户要求。
3. 方案差异必须来自页面骨架、信息组织、交互路径、内容密度、视觉反馈、动效状态或内容表达，不只换色换皮。
4. 方案梯度建议覆盖：稳健继承现有模式、平衡优化当前体验、突破探索新表达。不要让多个方案只是同一想法的轻微改写。
5. 所有方案都要遵守已确认的需求和设计决策，不能把锁定项当差异点。
6. 再收敛：比较方案适合的用户任务、实现成本、设计一致性、风险和可验证性，形成一个设计决策。
7. 执行最适合当前页面的一种；只有会改变需求范围、设计基底、核心流程或用户明确要求选择时，才停下来确认。

## 输出

- 多方案探索：每个方案一句话说明，体现真实差异。
- 差异说明：覆盖骨架、信息/交互、视觉/反馈、动效/状态和主要风险。
- 设计决策：写明采用哪个方案、为什么淘汰其他方案，以及取舍理由。
- 执行结果：列出改了什么和如何验收。

## 方案切换落地

如果用户要求“看看不同方向”“能切换比较”，或当前实现适合在页面内切换方案，就把方案做成 tweak：

- `@axhub/commentary-react` 只有把方案做成页面内可切换的 React tweak 时才需要；普通方案探索不依赖它。
- React 原型优先使用 `@axhub/commentary-react` 的 `createCommentaryReactTweakStore` 和 `useRegisterCommentaryTweak`。
- 复用项目现有 `schema / values / adapter / update` 模式，不另造平行配置。
- 方案字段优先用 `card`，不要用普通下拉。
- 每个 `options[]` 项至少包含 `label`、`description`、`value`。
- `label` 写方案标题，`description` 写核心差异，`value` 写稳定标识。
- 用户要求页面内切换时，必须落成 React tweak；否则只需要完成多方案探索、方案对比、设计决策和最终方案实现。

方案切换落地（React tweak 集成）：详见 `references/tweak-integration.md`（含字段类型表、最佳实践、React 最小形态代码）。
仅在用户要求页面内切换方案时读取，普通方案探索不需要。

