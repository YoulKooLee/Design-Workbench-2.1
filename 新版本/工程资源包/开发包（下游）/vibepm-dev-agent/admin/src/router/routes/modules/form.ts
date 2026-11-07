import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const FORM: AppRouteRecordRaw = {
  path: '/form',
  name: 'form',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.form',
    icon: 'icon-settings',
    requiresAuth: true,
    order: 4,
  },
  children: [
    {
      path: 'basic',
      name: 'BasicForm',
      component: () => import('@/views/form/basic/index.vue'),
      meta: {
        locale: 'menu.form.basic',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'group',
      name: 'GroupForm',
      component: () => import('@/views/form/group/index.vue'),
      meta: {
        locale: 'menu.form.group',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'step',
      name: 'StepForm',
      component: () => import('@/views/form/step/index.vue'),
      meta: {
        locale: 'menu.form.step',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default FORM;
