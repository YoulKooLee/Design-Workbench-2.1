/**
 * 对齐 frame/admin arco-theme.js：主题色预设 + 明暗。
 */
import { dispatchThemeChange } from '@/utils/chart-palette';

export type ThemeColorId =
  | 'indigo'
  | 'blue'
  | 'green'
  | 'purple'
  | 'orange';

export interface ThemePreset {
  id: ThemeColorId;
  label: string;
  hex: string;
  palette: Record<number, string>;
}

export const THEME_PRESETS: Record<ThemeColorId, ThemePreset> = {
  indigo: {
    id: 'indigo',
    label: '品牌紫',
    hex: '#6C5CE7',
    palette: {
      1: '242, 240, 255',
      2: '230, 226, 252',
      3: '205, 198, 248',
      4: '175, 164, 243',
      5: '140, 125, 237',
      6: '108, 92, 231',
      7: '90, 75, 209',
    },
  },
  blue: {
    id: 'blue',
    label: '科技蓝',
    hex: '#165DFF',
    palette: {
      1: '232, 243, 255',
      2: '190, 218, 255',
      3: '148, 191, 255',
      4: '106, 161, 255',
      5: '64, 128, 255',
      6: '22, 93, 255',
      7: '14, 66, 210',
    },
  },
  green: {
    id: 'green',
    label: '生机绿',
    hex: '#27AE60',
    palette: {
      1: '232, 248, 239',
      2: '200, 236, 214',
      3: '155, 218, 180',
      4: '105, 200, 145',
      5: '65, 188, 118',
      6: '39, 174, 96',
      7: '30, 142, 78',
    },
  },
  purple: {
    id: 'purple',
    label: '清新青',
    hex: '#13C7C2',
    palette: {
      1: '230, 250, 249',
      2: '190, 242, 240',
      3: '140, 232, 228',
      4: '90, 220, 215',
      5: '50, 210, 205',
      6: '19, 199, 194',
      7: '14, 158, 154',
    },
  },
  orange: {
    id: 'orange',
    label: '活力橙',
    hex: '#E74C3C',
    palette: {
      1: '253, 236, 234',
      2: '250, 210, 205',
      3: '245, 175, 165',
      4: '240, 135, 120',
      5: '236, 100, 85',
      6: '231, 76, 60',
      7: '192, 57, 43',
    },
  },
};

export const THEME_PRESET_LIST = Object.values(THEME_PRESETS);

export const THEME_MODE_KEY = 'arco-pro-theme-mode';
export const THEME_COLOR_KEY = 'arco-pro-theme-color';
export const LAYOUT_MODE_KEY = 'arco-pro-layout-mode';
export const MENU_COLLAPSE_KEY = 'arco-pro-menu-collapsed';

export const FRAME_THEME_HEX = THEME_PRESETS.indigo.hex;

function roots(): HTMLElement[] {
  const list: HTMLElement[] = [document.documentElement];
  if (document.body) list.push(document.body);
  return list;
}

function isDarkModeActive(): boolean {
  const body = document.body;
  if (!body) return false;
  return (
    body.getAttribute('arco-theme') === 'dark' ||
    body.classList.contains('theme-dark')
  );
}

function applyPalette(preset: ThemePreset) {
  const p = preset.palette;
  const dark = p[7].split(',').map((n) => parseInt(n.trim(), 10));
  const arcoblue8 = `${Math.max(0, dark[0] - 7)}, ${Math.max(
    0,
    dark[1] - 22
  )}, ${Math.max(0, dark[2] - 44)}`;
  const darkMode = isDarkModeActive();
  /* soft / mid 跟主色派生（对照 frame/admin；暗色略提高透明度） */
  const softAlpha = darkMode ? '0.22' : '0.15';
  const midAlpha = darkMode ? '0.4' : '0.35';

  roots().forEach((root) => {
    for (let i = 1; i <= 7; i += 1) {
      root.style.setProperty(`--arcoblue-${i}`, p[i]);
    }
    root.style.setProperty('--arcoblue-8', arcoblue8);
    for (let i = 1; i <= 10; i += 1) {
      root.style.removeProperty(`--primary-${i}`);
      root.style.removeProperty(`--link-${i}`);
    }
    root.style.setProperty('--pro-theme-color', `rgb(${p[6]})`);
    root.style.setProperty('--pro-theme-color-hex', preset.hex);
    root.style.setProperty(
      '--pro-theme-color-soft',
      `rgba(${p[6]}, ${softAlpha})`
    );
    root.style.setProperty(
      '--pro-theme-color-mid',
      `rgba(${p[6]}, ${midAlpha})`
    );
  });
}

export function applyThemeColor(
  id: ThemeColorId | string,
  options?: { emitEvent?: boolean }
) {
  const preset = THEME_PRESETS[id as ThemeColorId] || THEME_PRESETS.indigo;
  applyPalette(preset);
  if (options?.emitEvent !== false) {
    dispatchThemeChange({ type: 'color', colorId: preset.id });
  }
  return preset;
}

export function applyDarkMode(
  dark: boolean,
  options?: { emitEvent?: boolean }
) {
  const body = document.body;
  if (!body) return;
  if (dark) {
    body.setAttribute('arco-theme', 'dark');
    body.classList.add('theme-dark');
  } else {
    body.removeAttribute('arco-theme');
    body.classList.remove('theme-dark');
  }
  /* 切换明暗后重刷 soft/mid 透明度（对照 frame/admin arco-theme.js） */
  applyPalette(THEME_PRESETS[readStoredThemeColor()] || THEME_PRESETS.indigo);
  if (options?.emitEvent !== false) {
    dispatchThemeChange({ type: 'mode', dark });
  }
}

export function applyShellVars(menuWidth: number, collapsed: boolean) {
  const collapsedWidth = 58;
  document.documentElement.style.setProperty(
    '--shell-logo-width',
    `${menuWidth}px`
  );
  document.documentElement.style.setProperty(
    '--shell-menu-width',
    `${collapsed ? collapsedWidth : menuWidth}px`
  );
  document.documentElement.style.setProperty('--shell-navbar-height', '60px');
}

export function readStoredThemeColor(): ThemeColorId {
  try {
    const stored = localStorage.getItem(THEME_COLOR_KEY);
    if (stored && THEME_PRESETS[stored as ThemeColorId]) {
      return stored as ThemeColorId;
    }
  } catch {
    /* ignore */
  }
  return 'indigo';
}

export function readStoredDark(): boolean {
  try {
    return localStorage.getItem(THEME_MODE_KEY) === 'dark';
  } catch {
    return false;
  }
}

export function readStoredLayoutMode(): 'top' | 'side' {
  try {
    const stored = localStorage.getItem(LAYOUT_MODE_KEY);
    if (stored === 'top' || stored === 'side') return stored;
  } catch {
    /* ignore */
  }
  return 'top';
}

export function readStoredMenuCollapsed(): boolean {
  try {
    return localStorage.getItem(MENU_COLLAPSE_KEY) === '1';
  } catch {
    return false;
  }
}

/** 启动时同步 frame/admin 主题 token（不重复刷图表，由配色 init 统一派发） */
export function applyFrameTheme(colorId?: ThemeColorId) {
  const id = colorId || readStoredThemeColor();
  applyThemeColor(id, { emitEvent: false });
  applyDarkMode(readStoredDark(), { emitEvent: false });
}
