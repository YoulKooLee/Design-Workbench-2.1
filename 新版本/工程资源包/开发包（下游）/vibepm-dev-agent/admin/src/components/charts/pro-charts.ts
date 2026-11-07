/**
 * 加载 frame/admin Unovis + ProShadcnCharts（UMD）。
 */

export type ProChartType =
  | 'area'
  | 'line'
  | 'bar'
  | 'stackedBar'
  | 'horizontalBar'
  | 'combo'
  | 'donut'
  | 'radar'
  | 'radial'
  | 'gauge'
  | 'liquidFill'
  | 'candlestick'
  | 'scatter'
  | 'percentTrack'
  | 'rose';

export interface ProShadcnChartsApi {
  mountAreaChart: (el: HTMLElement, options?: Record<string, unknown>) => unknown;
  mountLineChart: (el: HTMLElement, options?: Record<string, unknown>) => unknown;
  mountBarChart: (el: HTMLElement, options?: Record<string, unknown>) => unknown;
  mountStackedBarChart: (
    el: HTMLElement,
    options?: Record<string, unknown>
  ) => unknown;
  mountHorizontalBarChart: (
    el: HTMLElement,
    options?: Record<string, unknown>
  ) => unknown;
  mountComboChart: (el: HTMLElement, options?: Record<string, unknown>) => unknown;
  mountDonutChart: (el: HTMLElement, options?: Record<string, unknown>) => unknown;
  mountRadarChart: (el: HTMLElement, options?: Record<string, unknown>) => unknown;
  mountRadialBarChart: (
    el: HTMLElement,
    options?: Record<string, unknown>
  ) => unknown;
  mountGaugeChart: (el: HTMLElement, options?: Record<string, unknown>) => unknown;
  mountLiquidFillChart: (
    el: HTMLElement,
    options?: Record<string, unknown>
  ) => unknown;
  mountCandlestickChart: (
    el: HTMLElement,
    options?: Record<string, unknown>
  ) => unknown;
  mountScatterChart: (
    el: HTMLElement,
    options?: Record<string, unknown>
  ) => unknown;
  mountPercentTrackBarChart: (
    el: HTMLElement,
    options?: Record<string, unknown>
  ) => unknown;
  mountRoseChart: (el: HTMLElement, options?: Record<string, unknown>) => unknown;
  destroy: (el?: HTMLElement | null) => void;
  release: (instance: unknown) => void;
  refreshAll: () => void;
  CHART_COLORS: string[];
}

declare global {
  interface Window {
    Unovis?: unknown;
    ProShadcnCharts?: ProShadcnChartsApi;
    ProShadcnChartData?: Record<string, unknown>;
  }
}

const MOUNT_MAP: Record<
  ProChartType,
  keyof ProShadcnChartsApi
> = {
  area: 'mountAreaChart',
  line: 'mountLineChart',
  bar: 'mountBarChart',
  stackedBar: 'mountStackedBarChart',
  horizontalBar: 'mountHorizontalBarChart',
  combo: 'mountComboChart',
  donut: 'mountDonutChart',
  radar: 'mountRadarChart',
  radial: 'mountRadialBarChart',
  gauge: 'mountGaugeChart',
  liquidFill: 'mountLiquidFillChart',
  candlestick: 'mountCandlestickChart',
  scatter: 'mountScatterChart',
  percentTrack: 'mountPercentTrackBarChart',
  rose: 'mountRoseChart',
};

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existed = document.querySelector(`script[data-pro-chart="${src}"]`);
    if (existed) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.dataset.proChart = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

let loading: Promise<ProShadcnChartsApi> | null = null;

export async function ensureProCharts(): Promise<ProShadcnChartsApi> {
  if (window.ProShadcnCharts?.mountAreaChart) {
    return window.ProShadcnCharts;
  }
  if (!loading) {
    loading = (async () => {
      if (!window.Unovis) {
        await loadScript('/vendor/unovis/unovis.min.js');
      }
      if (!window.ProShadcnCharts?.mountAreaChart) {
        await loadScript('/vendor/charts/shadcn-charts.js');
      }
      if (!window.ProShadcnCharts?.mountAreaChart) {
        throw new Error('ProShadcnCharts failed to initialize');
      }
      return window.ProShadcnCharts;
    })().catch((err) => {
      loading = null;
      throw err;
    });
  }
  return loading;
}

export function mountProChart(
  type: ProChartType,
  el: HTMLElement,
  options?: Record<string, unknown>
) {
  return ensureProCharts().then((api) => {
    const method = MOUNT_MAP[type];
    const fn = api[method] as (
      node: HTMLElement,
      opts?: Record<string, unknown>
    ) => unknown;
    return fn(el, options);
  });
}

export function destroyProChart(el?: HTMLElement | null) {
  if (window.ProShadcnCharts?.destroy) {
    window.ProShadcnCharts.destroy(el);
  }
}

export function refreshAllProCharts() {
  window.ProShadcnCharts?.refreshAll?.();
}

export { CHART_PALETTE_CHANGE_EVENT, THEME_CHANGE_EVENT } from '@/utils/chart-palette';
