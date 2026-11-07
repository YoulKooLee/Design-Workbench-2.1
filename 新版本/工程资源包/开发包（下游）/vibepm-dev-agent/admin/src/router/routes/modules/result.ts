import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const RESULT: AppRouteRecordRaw = {
  path: '/result',
  name: 'result',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.result',
    icon: 'icon-check-circle',
    requiresAuth: true,
    order: 6,
  },
  children: [
    {
      path: 'success',
      name: 'ResultSuccess',
      component: () => import('@/views/result/success/index.vue'),
      meta: {
        locale: 'menu.result.success',
        requiresAuth: true,
        roles: ['*'],
        hideInBreadcrumb: true,
      },
    },
    {
      path: 'waiting',
      name: 'ResultWaiting',
      component: () => import('@/views/result/waiting/index.vue'),
      meta: {
        locale: 'menu.result.waiting',
        requiresAuth: true,
        roles: ['*'],
        hideInBreadcrumb: true,
      },
    },
    {
      path: 'warning',
      name: 'ResultWarning',
      component: () => import('@/views/result/warning/index.vue'),
      meta: {
        locale: 'menu.result.warning',
        requiresAuth: true,
        roles: ['*'],
        hideInBreadcrumb: true,
      },
    },
    {
      path: 'error',
      name: 'ResultError',
      component: () => import('@/views/result/error/index.vue'),
      meta: {
        locale: 'menu.result.error',
        requiresAuth: true,
        roles: ['*'],
        hideInBreadcrumb: true,
      },
    },
  ],
};

export default RESULT;
