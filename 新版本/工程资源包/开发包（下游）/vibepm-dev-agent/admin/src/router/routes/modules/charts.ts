import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const CHARTS: AppRouteRecordRaw = {
  path: '/charts',
  name: 'charts',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.charts',
    icon: 'icon-chart-area',
    requiresAuth: true,
    order: 2,
  },
  children: [
    {
      path: 'palette',
      name: 'ChartPalette',
      component: () => import('@/views/charts/palette/index.vue'),
      meta: {
        locale: 'menu.charts.palette',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'metric-card',
      name: 'ChartMetricCard',
      component: () => import('@/views/charts/metric-card/index.vue'),
      meta: {
        locale: 'menu.charts.metricCard',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'basic',
      name: 'ChartBasic',
      component: () => import('@/views/charts/basic/index.vue'),
      meta: {
        locale: 'menu.charts.basic',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'extended',
      name: 'ChartExtended',
      component: () => import('@/views/charts/extended/index.vue'),
      meta: {
        locale: 'menu.charts.extended',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default CHARTS;
