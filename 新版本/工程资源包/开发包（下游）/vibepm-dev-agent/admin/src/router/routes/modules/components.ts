import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const COMPONENTS: AppRouteRecordRaw = {
  path: '/components',
  name: 'components',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.components',
    icon: 'icon-apps',
    requiresAuth: true,
    order: 1,
  },
  children: [
    {
      path: 'form',
      name: 'ComponentForm',
      component: () => import('@/views/components/form/index.vue'),
      meta: {
        locale: 'menu.components.form',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'basic',
      name: 'ComponentBasic',
      component: () => import('@/views/components/basic/index.vue'),
      meta: {
        locale: 'menu.components.basic',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'form-extended',
      name: 'ComponentFormExtended',
      component: () => import('@/views/components/form-extended/index.vue'),
      meta: {
        locale: 'menu.components.formExtended',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'extended',
      name: 'ComponentExtended',
      component: () => import('@/views/components/extended/index.vue'),
      meta: {
        locale: 'menu.components.extended',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'table-extended',
      name: 'ComponentTableExtended',
      component: () => import('@/views/components/table-extended/index.vue'),
      meta: {
        locale: 'menu.components.tableExtended',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'list',
      name: 'ComponentList',
      component: () => import('@/views/components/list/index.vue'),
      meta: {
        locale: 'menu.components.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'rich-text',
      name: 'ComponentRichText',
      component: () => import('@/views/components/rich-text/index.vue'),
      meta: {
        locale: 'menu.components.richText',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default COMPONENTS;
