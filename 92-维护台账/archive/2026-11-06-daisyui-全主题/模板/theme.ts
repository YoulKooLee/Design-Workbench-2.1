/**
 * daisyUI 5 · 原型栈组件库（CSS 类名，非 React 组件）
 * ---------------------------------------------------------------
 * 与其它分类不同：本目录没有 <Component>/index.tsx，组件不是 import 进来的，
 * 而是直接写类名（btn / card / modal / mockup-browser …）。
 *
 * CSS 由 ../_kit/theme.css 顶部的一行 @import 全局引入；
 * 本文件只提供主题常量与切换工具，方便页面里 `import { setDaisyTheme }`。
 */

export const DAISYUI_THEMES = ['axhub', 'axhub-dark', 'light', 'dark'] as const;

export type DaisyUITheme = (typeof DAISYUI_THEMES)[number];

/** 默认主题：与 Codebuddy Design 的 Arco 色板完全一致 */
export const DAISYUI_DEFAULT_THEME: DaisyUITheme = 'axhub';

const STORAGE_KEY = 'axhub-daisy-theme';

/**
 * 切换 daisyUI 主题：只改 <html data-theme>，不动页面结构。
 * 传 'axhub' 之外的值请确认已在 daisyui/theme.css 里启用。
 */
export function setDaisyTheme(theme: DaisyUITheme, target: HTMLElement = document.documentElement): void {
  target.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // 隐私模式下 localStorage 可能不可写，忽略即可
  }
}

/** 读取上次选的主题（没有则返回默认主题） */
export function getDaisyTheme(): DaisyUITheme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (DAISYUI_THEMES as readonly string[]).includes(saved)) return saved as DaisyUITheme;
  } catch {
    // 忽略
  }
  return DAISYUI_DEFAULT_THEME;
}

/**
 * 判断某段 className 里是否用了 daisyUI 类名（仅用于 lint / 自检脚本，运行时用不到）。
 * 覆盖常用根类名，新增组件时在此追加即可。
 */
const DAISY_ROOT_CLASSES = [
  'btn', 'badge', 'card', 'alert', 'modal', 'dropdown', 'menu', 'navbar', 'tabs', 'tab', 'steps', 'step',
  'table', 'stats', 'stat', 'avatar', 'status', 'progress', 'radial-progress', 'loading', 'skeleton',
  'timeline', 'list', 'collapse', 'carousel', 'chat', 'diff', 'stack', 'mask', 'indicator', 'countdown',
  'input', 'textarea', 'select', 'checkbox', 'radio', 'toggle', 'range', 'rating', 'file-input', 'otp',
  'fieldset', 'label', 'validator', 'join', 'divider', 'link', 'kbd', 'swap', 'tooltip', 'toast', 'fab',
  'drawer', 'dock', 'footer', 'hero', 'megamenu', 'filter', 'aura', 'hover-3d', 'hover-gallery', 'text-rotate',
  'mockup-browser', 'mockup-window', 'mockup-phone', 'mockup-code', 'theme-controller',
];

export function usesDaisyUI(className: string): boolean {
  const tokens = className.split(/\s+/).filter(Boolean);
  return tokens.some((t) => DAISY_ROOT_CLASSES.includes(t));
}
