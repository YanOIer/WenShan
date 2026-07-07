/**
 * Vue Router 路由配置
 *
 * 按大屏模块拆分路由，支持懒加载。
 */

import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/modules/dashboard/views/DashboardView.vue'),
    meta: { title: '数据概览' },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 路由守卫：设置页面标题
router.beforeEach((to) => {
  const title = (to.meta?.title as string) || 'WenShan'
  document.title = `${title} - WenShan (文山)`
})

export default router