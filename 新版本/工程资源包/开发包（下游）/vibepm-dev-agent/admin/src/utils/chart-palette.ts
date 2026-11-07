/**
 * 对齐 frame/admin/js/chart-palette.js：
 * 写入 --chart-1 … --chart-10，供 ProShadcnCharts / 指标卡共用。
 */

export type ChartPaletteId = 'theme' | 'a' | 'b' | 'c';

export interface PaletteColor {
  id?: string;
  name?: string;
  hex: string;
}

export interface ChartScheme {
  id: ChartPaletteId;
  title: string;
  badge?: string;
  why?: string;
  cols?: number;
  mode?: 'theme';
  softAlpha: number;
  noSoft?: boolean;
  colors?: PaletteColor[];
}

/** 橱窗展示用色块（主题单色会实时解析阶梯） */
export interface DisplayPaletteColor {
  id: string;
  name?: string;
  hex: string;
}

export interface ChartSchemeDisplay extends ChartScheme {
  cols: number;
  colors: DisplayPaletteColor[];
}

interface ResolvedColor extends DisplayPaletteColor {
  css: string;
}

export const CHART_PALETTE_KEY = 'arco-pro-chart-palette';
export const CHART_PALETTE_CHANGE_EVENT = 'arco-pro-chart-palette-change';
/** 与母版一致：主题色 / 明暗 / 配色切换均派发，触发 ProShadcnCharts.refreshAll */
export const THEME_CHANGE_EVENT = 'arco-pro-theme-change';

export const SCHEMES: ChartScheme[] = [
  {
    id: 'theme',
    title: '主题单色',
    badge: '默认',
    why: '跟随系统主题色：组合图表用主色深浅阶梯区分系列；同组指标卡统一为主题色。',
    cols: 10,
    mode: 'theme',
    softAlpha: 0.14,
  },
  {
    id: 'a',
    title: '方案 A · 多彩分类',
    badge: '推荐',
    why: '色相跨度大、辨识度高，适合环形图、饼图等多分类对比。',
    cols: 10,
    softAlpha: 0.14,
    colors: [
      { id: 'C1', name: '电器蓝', hex: '#5482FF' },
      { id: 'C2', name: '美妆绿', hex: '#41D59E' },
      { id: 'C3', name: '雾钢蓝', hex: '#5F77AB' },
      { id: 'C4', name: '食品黄', hex: '#FFBC00' },
      { id: 'C5', name: '箱包红', hex: '#E15547' },
      { id: 'C6', name: '晴空青', hex: '#64C1E8' },
      { id: 'C7', name: '礼品紫', hex: '#9555B6' },
      { id: 'C8', name: '文娱橙', hex: '#F08947' },
      { id: 'C9', name: '嫩粉', hex: '#F472B6' },
      { id: 'C10', name: '草绿', hex: '#84CC16' },
    ],
  },
  {
    id: 'b',
    title: '方案 B · 柔和品牌',
    badge: '品牌向',
    why: '以紫蓝为主轴，辅以品红、玫粉等差异色，适合仪表盘与指标卡成套使用。',
    cols: 10,
    softAlpha: 0.14,
    colors: [
      { id: 'C1', name: '主紫', hex: '#8D51F5' },
      { id: 'C2', name: '亮蓝', hex: '#4CB0FF' },
      { id: 'C3', name: '青', hex: '#3BC2C2' },
      { id: 'C4', name: '浅紫', hex: '#8B7CF1' },
      { id: 'C5', name: '天蓝', hex: '#5BA4E5' },
      { id: 'C6', name: '品红', hex: '#D946EF' },
      { id: 'C7', name: '雾靛', hex: '#818CF8' },
      { id: 'C8', name: '晴空', hex: '#0EA5E9' },
      { id: 'C9', name: '玫粉', hex: '#EC4899' },
      { id: 'C10', name: '雾灰蓝', hex: '#64748B' },
    ],
  },
  {
    id: 'c',
    title: '方案 C · 莫兰迪柔彩',
    badge: '低饱和',
    why: '偏低饱和、偏灰的柔和色板，适合信息密集或偏克制的页面。',
    cols: 10,
    softAlpha: 0.16,
    colors: [
      { id: 'C1', name: '雾蓝紫', hex: '#7B8CDE' },
      { id: 'C2', name: '烟灰蓝', hex: '#6BA3C7' },
      { id: 'C3', name: '豆青', hex: '#7EB8A8' },
      { id: 'C4', name: '灰丁香', hex: '#9A8FD4' },
      { id: 'C5', name: '雾青', hex: '#5A9BB8' },
      { id: 'C6', name: '藕荷', hex: '#A89BC8' },
      { id: 'C7', name: '雾靛', hex: '#8B95C9' },
      { id: 'C8', name: '灰湖绿', hex: '#6FA8B8' },
      { id: 'C9', name: '灰玫', hex: '#C49AAA' },
      { id: 'C10', name: '雾灰', hex: '#8A96A5' },
    ],
  },
];

function roots(): HTMLElement[] {
  const list: HTMLElement[] = [document.documentElement];
  if (document.body) list.push(document.body);
  return list;
}

function readCssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function parseRgbParts(rgb: string | null) {
  if (!rgb) return null;
  const parts = String(rgb)
    .split(',')
    .map((n) => parseInt(n.trim(), 10));
  if (parts.length < 3 || parts.some((n) => Number.isNaN(n))) return null;
  return parts.slice(0, 3) as [number, number, number];
}

function mixRgb(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

/** 优先 --primary-N（主题写入），回退 --arcoblue-N */
function readThemeStep(step: number) {
  return readCssVar(`--primary-${step}`) || readCssVar(`--arcoblue-${step}`);
}

function rgbToApproxHex(rgb: string | null): string {
  if (!rgb) return '#6C5CE7';
  const parts = rgb.split(',').map((n) => parseInt(n.trim(), 10));
  if (parts.length < 3 || parts.some((n) => Number.isNaN(n))) return '#6C5CE7';
  return `#${parts
    .slice(0, 3)
    .map((n) =>
      Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0')
    )
    .join('')}`;
}

function themeColorEntry(
  id: string,
  name: string,
  rgb: string | [number, number, number] | null
): ResolvedColor {
  const cssParts = rgb
    ? Array.isArray(rgb)
      ? rgb.join(', ')
      : String(rgb).trim()
    : '';
  return {
    id,
    name,
    hex: rgbToApproxHex(cssParts || null),
    css: cssParts ? `rgb(${cssParts})` : 'rgb(var(--primary-6))',
  };
}

/** 对齐母版 soft()，供橱窗/图例软色使用（不写入 CSS 变量） */
export function softChartColor(color: string, alpha: number) {
  const raw = String(color || '').trim();
  if (raw.startsWith('#')) {
    const h = raw.replace('#', '');
    if (h.length < 6) return `rgba(0,0,0,${alpha})`;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  const m = raw.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (m) return `rgba(${m[1]},${m[2]},${m[3]},${alpha})`;
  return `rgba(108,92,231,${alpha})`;
}

/** 母版 ArcoProChartPalette.soft 别名 */
export function softHex(hex: string, alpha: number) {
  return softChartColor(hex, alpha);
}

function buildThemeColors(): ResolvedColor[] {
  const light = parseRgbParts(readThemeStep(1)) || ([190, 218, 255] as [
    number,
    number,
    number
  ]);
  const sequence: { name: string; rgb: string | [number, number, number] | null }[] =
    [
      { name: '主题色', rgb: readThemeStep(6) },
      { name: '主题阶梯 2', rgb: readThemeStep(5) },
      { name: '主题阶梯 3', rgb: readThemeStep(4) },
      { name: '主题阶梯 4', rgb: readThemeStep(3) },
      { name: '主题阶梯 5', rgb: readThemeStep(2) },
      { name: '主题阶梯 6', rgb: readThemeStep(1) },
      { name: '主题阶梯 7', rgb: mixRgb(light, [255, 255, 255], 0.28) },
      { name: '主题阶梯 8', rgb: mixRgb(light, [255, 255, 255], 0.48) },
      { name: '主题阶梯 9', rgb: mixRgb(light, [255, 255, 255], 0.66) },
      { name: '主题阶梯 10', rgb: mixRgb(light, [255, 255, 255], 0.82) },
    ];
  return sequence.map((item, i) =>
    themeColorEntry(`C${i + 1}`, item.name, item.rgb)
  );
}

function cssToHex(color: string): string {
  const raw = String(color || '').trim();
  if (raw.startsWith('#') && raw.length >= 7) return raw.slice(0, 7);
  const m = raw.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (!m) return '#6C5CE7';
  return `#${[m[1], m[2], m[3]]
    .map((n) =>
      Math.max(0, Math.min(255, parseInt(n, 10)))
        .toString(16)
        .padStart(2, '0')
    )
    .join('')}`;
}

function resolveColors(scheme: ChartScheme): ResolvedColor[] {
  if (scheme.mode === 'theme') return buildThemeColors();
  return (scheme.colors || []).map((c) => ({
    id: c.id || '',
    name: c.name,
    hex: c.hex,
    css: c.hex,
  }));
}

export function getChartScheme(id: ChartPaletteId) {
  return SCHEMES.find((s) => s.id === id) || SCHEMES[0];
}

/** 对齐母版 schemeForDisplay：主题单色展开为实时色阶 */
export function schemeForDisplay(scheme: ChartScheme): ChartSchemeDisplay {
  const cols = scheme.cols ?? 10;
  if (scheme.mode === 'theme') {
    const colors = resolveColors(scheme).map(({ id, name, hex }) => ({
      id,
      name,
      hex,
    }));
    return { ...scheme, cols, colors };
  }
  return {
    ...scheme,
    cols,
    colors: (scheme.colors || []).map((c) => ({
      id: c.id || '',
      name: c.name,
      hex: c.hex,
    })),
  };
}

/** 方案预览色（主题单色实时读 CSS 阶梯） */
export function getSchemePreviewColors(id: ChartPaletteId): string[] {
  return resolveColors(getChartScheme(id)).map((c) => c.hex);
}

export interface ChartPaletteMenuItem {
  id: ChartPaletteId;
  title: string;
  badge?: string;
  colors: string[];
}

/** 顶栏下拉用：每项前 5 个色块（主题单色读当前 CSS 变量） */
export function getChartPaletteMenuItems(): ChartPaletteMenuItem[] {
  return SCHEMES.map((scheme) => {
    const source = resolveColors(scheme);
    return {
      id: scheme.id,
      title: scheme.title,
      badge: scheme.badge,
      colors: source.slice(0, 5).map((c) => cssToHex(c.hex)),
    };
  });
}

export function dispatchThemeChange(
  detail: Record<string, unknown> = { type: 'theme' }
) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail }));
}

export function applyChartPalette(id: ChartPaletteId = 'theme') {
  const scheme = getChartScheme(id);
  const colors = resolveColors(scheme);

  roots().forEach((root) => {
    root.setAttribute('data-chart-palette', scheme.id);
    for (let i = 0; i < 10; i += 1) {
      const color = colors[i] || colors[0];
      if (color) {
        root.style.setProperty(`--chart-${i + 1}`, color.css);
      } else {
        root.style.removeProperty(`--chart-${i + 1}`);
      }
    }
  });

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(CHART_PALETTE_CHANGE_EVENT, {
        detail: { id: scheme.id, scheme, colors },
      })
    );
    dispatchThemeChange({ type: 'chart-palette', paletteId: scheme.id });
  }
}

export function readStoredChartPalette(): ChartPaletteId {
  try {
    const stored = localStorage.getItem(CHART_PALETTE_KEY) as ChartPaletteId;
    if (SCHEMES.some((s) => s.id === stored)) return stored;
  } catch {
    /* ignore */
  }
  return 'theme';
}

export function persistChartPalette(id: ChartPaletteId) {
  try {
    localStorage.setItem(CHART_PALETTE_KEY, id);
  } catch {
    /* ignore */
  }
}

let themeListenerBound = false;

/** 对齐母版 chart-palette.init：主题色/明暗变化时重算「主题单色」阶梯 */
export function ensureChartPaletteThemeBridge() {
  if (typeof window === 'undefined' || themeListenerBound) return;
  themeListenerBound = true;
  window.addEventListener(THEME_CHANGE_EVENT, ((ev: Event) => {
    const detail = (ev as CustomEvent).detail || {};
    if (detail.type === 'chart-palette') return;
    const current = readStoredChartPalette();
    if (getChartScheme(current).mode === 'theme') {
      applyChartPalette('theme');
    }
  }) as EventListener);
}

export const CHART_SCHEME_LIST = SCHEMES.map((s) => ({
  id: s.id,
  title: s.title,
  badge: s.badge,
  why: s.why,
}));
