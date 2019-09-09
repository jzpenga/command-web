import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout'

Vue.use(Router);

export const  constantRoutes =[
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: () => import('@/views/Home'),
                name: '首页',
                meta: { title: '首页', icon: 'pdf', affix: true }
            }
        ]
    },
    {
        path: '/userManager',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/userManager'),
                name: '用户管理',
                meta: { title: '用户管理', icon: 'pdf', affix: true }
            }
        ]
    },
    {
        path: '/organizational',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/organizational'),
                name: '组织架构',
                meta: { title: '组织架构', icon: 'pdf', affix: true }
            }
        ]
    },
    {
        path: '/roleManager',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/roleManager'),
                name: '角色管理',
                meta: { title: '角色管理', icon: 'pdf', affix: true }
            }
        ]
    },
  ];


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher // reset router
}

export default router
