/**
 * Axhub 组件库 · 统一出口（React 18 + Tailwind v4）
 * ------------------------------------------------------------------
 * 真源：C:\Users\游翔\Documents\AI work\产品设计工作台\03-组件库\03-页面组件\Codebuddy Design
 * 用法（用时复制）：
 *   1) 把本目录（`Codebuddy Design`，含 _kit 与 6 个分类）整体复制到 React 原型工程的
 *      `src/component-templates/axhub/`（目录名可自定，内部相对结构必须保持）
 *   2) 页面里直接 import：
 *      import { Button, Card, DataTable, type Column } from '../component-templates/axhub';
 *
 * 依赖：仅 react + tailwindcss（v4）+ 工程自带 lucide-react（图标可选用）；
 *      本目录零第三方运行时依赖（不引 arco / antd / clsx）。
 */
import './_kit/theme.css';

export * from './base';
export * from './layout';
export * from './form';
export * from './data';
export * from './feedback';
export * from './business';
export { cn, type ClassValue } from './_kit/cn';
