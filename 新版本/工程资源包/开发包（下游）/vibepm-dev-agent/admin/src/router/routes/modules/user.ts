import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USER: AppRouteRecordRaw = {
  path: '/user',
  name: 'user',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.user',
    icon: 'icon-user',
    requiresAuth: true,
    order: 8,
  },
  children: [
    {
      path: 'home',
      name: 'UserHome',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        locale: 'menu.user.home',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'setting',
      name: 'Setting',
      component: () => import('@/views/user/setting/index.vue'),
      meta: {
        locale: 'menu.user.setting',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'message',
      name: 'UserMessage',
      component: () => import('@/views/user/message/index.vue'),
      meta: {
        locale: 'menu.user.message',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default USER;
