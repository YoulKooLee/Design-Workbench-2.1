import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const PROFILE: AppRouteRecordRaw = {
  path: '/profile',
  name: 'profile',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.profile',
    icon: 'icon-file',
    requiresAuth: true,
    order: 5,
  },
  children: [
    {
      path: 'basic',
      name: 'ProfileBasic',
      component: () => import('@/views/profile/basic/index.vue'),
      meta: {
        locale: 'menu.profile.basic',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'advanced',
      name: 'ProfileAdvanced',
      component: () => import('@/views/profile/advanced/index.vue'),
      meta: {
        locale: 'menu.profile.advanced',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default PROFILE;
