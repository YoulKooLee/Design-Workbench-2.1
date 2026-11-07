import { defineStore } from 'pinia';
import {
  applyChartPalette,
  dispatchThemeChange,
  persistChartPalette,
  readStoredChartPalette,
  type ChartPaletteId,
} from '@/utils/chart-palette';
import {
  LAYOUT_MODE_KEY,
  MENU_COLLAPSE_KEY,
  THEME_COLOR_KEY,
  THEME_MODE_KEY,
  THEME_PRESET_LIST,
  applyDarkMode,
  applyShellVars,
  applyThemeColor,
  readStoredDark,
  readStoredLayoutMode,
  readStoredMenuCollapsed,
  readStoredThemeColor,
  type ThemeColorId,
} from '@/utils/frame-theme';

export type LayoutMode = 'top' | 'side';

interface ProSettingsState {
  layoutMode: LayoutMode;
  themeColorId: ThemeColorId;
  dark: boolean;
  menuCollapsed: boolean;
  menuWidth: number;
  chartPaletteId: ChartPaletteId;
  initialized: boolean;
}

const useProSettingsStore = defineStore('proSettings', {
  state: (): ProSettingsState => ({
    layoutMode: 'top',
    themeColorId: 'indigo',
    dark: false,
    menuCollapsed: false,
    menuWidth: 220,
    chartPaletteId: 'theme',
    initialized: false,
  }),

  getters: {
    themePresets: () => THEME_PRESET_LIST,
    themeColorHex(state): string {
      const preset = THEME_PRESET_LIST.find((p) => p.id === state.themeColorId);
      return preset?.hex || '#6C5CE7';
    },
  },

  actions: {
    init() {
      this.layoutMode = readStoredLayoutMode();
      this.themeColorId = readStoredThemeColor();
      this.dark = readStoredDark();
      this.menuCollapsed = readStoredMenuCollapsed();
      this.chartPaletteId = readStoredChartPalette();
      this.applyAll();
      this.initialized = true;
    },

    applyAll() {
      applyThemeColor(this.themeColorId);
      applyDarkMode(this.dark);
      applyShellVars(this.menuWidth, this.menuCollapsed);
      applyChartPalette(this.chartPaletteId);
    },

    setLayoutMode(mode: LayoutMode) {
      this.layoutMode = mode;
      try {
        localStorage.setItem(LAYOUT_MODE_KEY, mode);
      } catch {
        /* ignore */
      }
      // 对齐母版 boot.js：布局切换后刷新图表尺寸
      dispatchThemeChange({ type: 'layout', layoutMode: mode });
    },

    toggleLayoutMode() {
      this.setLayoutMode(this.layoutMode === 'top' ? 'side' : 'top');
    },

    setMenuCollapsed(collapsed: boolean) {
      this.menuCollapsed = collapsed;
      applyShellVars(this.menuWidth, collapsed);
      try {
        localStorage.setItem(MENU_COLLAPSE_KEY, collapsed ? '1' : '0');
      } catch {
        /* ignore */
      }
    },

    setThemeColor(id: ThemeColorId) {
      this.themeColorId = id;
      applyThemeColor(id);
      if (this.chartPaletteId === 'theme') {
        applyChartPalette('theme');
      }
      try {
        localStorage.setItem(THEME_COLOR_KEY, id);
      } catch {
        /* ignore */
      }
    },

    toggleDark() {
      this.dark = !this.dark;
      applyDarkMode(this.dark);
      try {
        localStorage.setItem(THEME_MODE_KEY, this.dark ? 'dark' : 'light');
      } catch {
        /* ignore */
      }
    },

    setChartPalette(id: ChartPaletteId) {
      this.chartPaletteId = id;
      applyChartPalette(id);
      persistChartPalette(id);
    },
  },
});

export default useProSettingsStore;
