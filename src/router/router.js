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
                meta: { title: '首页', icon: 'mc_home', affix: true }
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
                meta: { title: '用户管理', icon: 'user', affix: true }
            },{
                path: 'addUser',
                name: 'addUser',
                component: () => import('@/views/userManager/add'),
                meta: {title: '添加用户', icon: 'sms-ad'},
                hidden: true
            },
            {
                path: 'editUser',
                name: 'editUser',
                component: () => import('@/views/userManager/update'),
                meta: {title: '编辑用户', icon: 'sms-ad'},
                hidden: true
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
                meta: { title: '组织架构', icon: 'tree', affix: true }
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
                meta: { title: '角色管理', icon: 'role', affix: true }
            },{
                path: 'addUserRole',
                name: 'addUserRole',
                component: () => import('@/views/roleManager/add'),
                meta: {title: '添加角色', icon: 'sms-ad'},
                hidden: true
            },
            {
                path: 'editUserRole',
                name: 'editUserRole',
                component: () => import('@/views/roleManager/update'),
                meta: {title: '编辑角色', icon: 'sms-ad'},
                hidden: true
            }
        ]
    },
    {
        path: '/targetManager',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/targetManager'),
                name: '指标管理',
                meta: { title: '指标管理', icon: 'role', affix: true }
            }
        ]
    },
    {
        path: '/subjectManager',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/subjectManager'),
                name: '专题管理',
                meta: { title: '专题管理', icon: 'role', affix: true }
            }
        ]
    },
    {
        path: '/areaManager',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/areaManager'),
                name: '区域管理',
                meta: { title: '区域管理', icon: 'role', affix: true }
            }
        ]
    },
    {
        path: '/advertise',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/advertise'),
                name: '轮播图管理',
                meta: { title: '轮播图管理', icon: 'role', affix: true }
            },{
                path: 'addAdvertise',
                name: 'addHomeAdvertise',
                component: () => import('@/views/advertise/add'),
                meta: {title: '添加广告', icon: 'sms-ad'},
                hidden:true
            },
            {
                path: 'updateAdvertise',
                name: 'updateHomeAdvertise',
                component: () => import('@/views/advertise/update'),
                meta: {title: '编辑广告', icon: 'sms-ad'},
                hidden:true
            }
        ]
    },
    {
        path: '/ue',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/ue'),
                name: '数据可视化设计',
                meta: { title: '数据可视化设计', icon: 'role', affix: true }
            }
        ]
    },
    {
        path: '/parameters',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/parameterManager'),
                name: '参数管理',
                meta: { title: '参数管理', icon: 'role', affix: true }
            }
        ]
    },
    {
        path: '/data',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/data'),
                name: '数据请求管理',
                meta: { title: '数据请求管理', icon: 'role', affix: true }
            }
        ]
    },
    {
        path: '/dataGroup',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/dataGroup'),
                name: '数据请求组管理',
                meta: { title: '数据请求组管理', icon: 'role', affix: true }
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
