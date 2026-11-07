import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: { siteKind: 'marketing', title: '官网' },
    },
    {
      path: '/app',
      name: 'workplace',
      component: () => import('@/views/app/workplace.vue'),
      meta: { siteKind: 'product', title: '工作台' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: { siteKind: 'login', title: '登录' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = (to.meta.title as string) || 'Vibe Web'
  document.title = `${title} · Vibe Design WEB`
})

export default router
