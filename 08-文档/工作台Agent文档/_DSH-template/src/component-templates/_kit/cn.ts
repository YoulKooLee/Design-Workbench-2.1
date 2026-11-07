/**
 * 类名拼接工具（零依赖实现，避免引入 clsx / tailwind-merge）。
 * 组件库内统一用它拼接 Tailwind 类，复制到任何 React 工程都不缺依赖。
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter((v) => typeof v === 'string' && v.length > 0).join(' ');
}
