/**
 * Codebuddy Design 组件库 · 统一出口（React 18 + Tailwind v4）
 * ------------------------------------------------------------------
 * 真源：C:\Users\游翔\Documents\AI work\产品设计工作台\03-组件库\03-页面组件\Codebuddy Design
 * 用法（用时复制）：
 *   1) 把本目录（`Codebuddy Design`，含 _kit 与全部分类）整体复制到 React 原型工程的
 *      `src/component-templates/axhub/`（目录名可自定，内部相对结构必须保持）
 *   2) 页面里直接 import：
 *      import { Button, Card, DataTable, OrderTable, type Column } from '../component-templates/axhub';
 *
 * 依赖：仅 react + tailwindcss（v4）+ 工程自带 lucide-react（图标可选用）；
 *      本目录**唯一例外**是 `工作流/WorkflowCanvas`，它需要 `@xyflow/react`（MIT）。
 *      为守住「零第三方依赖」契约，该画布**不在本统一出口导出**，需按路径单独引入：
 *        import { WorkflowCanvas } from '../component-templates/axhub/工作流/WorkflowCanvas';
 */
import './_kit/theme.css';

export * from './基础';
export * from './布局';
export * from './表单';
export * from './数据展示';
export * from './反馈';
export * from './业务组件';
export * from './页面模式';
export * from './订单';
export * from './付款';
export * from './触发器';
export * from './CMS';
export * from './工作流';
export * from './物联网';
export { cn, type ClassValue } from './_kit/cn';
export * from './_kit/format';
/**
 * 显式消歧：`页面模式/PageListSearchTable` 也导出了同名 `formatDateTime`（单参数版），
 * 与 `_kit/format` 的双参数版重名。此处显式 re-export 真源版本，统一以 `_kit/format` 为准
 * （后者支持 pattern 参数，是组件库的公共格式化入口）。
 */
export { formatDateTime, formatDate, formatTime } from './_kit/format';
