import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const LIST: AppRouteRecordRaw = {
  path: '/list',
  name: 'list',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.list',
    requiresAuth: true,
    icon: 'icon-list',
    order: 3,
  },
  children: [
    {
      path: 'search-table',
      name: 'SearchTable',
      component: () => import('@/views/list/search-table/index.vue'),
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'tree-table',
      name: 'TreeTable',
      component: () => import('@/views/list/tree-table/index.vue'),
      meta: {
        locale: 'menu.list.treeTable',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'tag-filter',
      name: 'TagFilter',
      component: () => import('@/views/list/tag-filter/index.vue'),
      meta: {
        locale: 'menu.list.tagFilter',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default LIST;
