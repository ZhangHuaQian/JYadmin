import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },

  {
    path: '/workbench',
    name: 'Workbench',
    component: Layout,
    meta: { title: '工作台', icon: 'example' },
    children: [
      {
        path: 'personal',
        component: () => import('@/views/workbench/personal/index'),
        meta: { title: '个人文章', icon: 'example' }
      },
      {
        path: 'indexTwo',
        component: () => import('@/views/workbench/personal/indexTwo'),
        meta: { title: '个人文章审核', icon: 'example' }
      },
      //后面加上
      // {
      //   path: 'side',
      //   component: () => import('@/views/workbench/side/index'),
      //   meta: { title: '机构文章', icon: 'example' }
      // }
    ]
  },

  {
    path: '/siteManage',
    name: 'SiteManage',
    component: Layout,
    meta: { title: '站点管理', icon: 'example' },
    children: [
      {
        path: 'siteList',
        component: () => import('@/views/siteManage/siteList/index'),
        meta: { title: '站点列表', icon: 'example' }
      },
      {
        path: 'siteType',
        component: () => import('@/views/siteManage/siteType/index'),
        meta: { title: '站点类型', icon: 'example' }
      },
    ]
  },

  {
    path: '/section',
    name: 'Section',
    component: Layout,
    meta: { title: '栏目管理', icon: 'example' },
    children: [{
      path: 'index',
      component: () => import('@/views/section/index'),
      meta: { title: '栏目列表', icon: 'example' }
    }]
  },

  {
    path: '/contentManage',
    name: 'ContentManage',
    component: Layout,
    meta: { title: '内容管理', icon: 'example' },
    children: [
      {
        path: 'singlePage',
        component: () => import('@/views/contentManage/singlePage/index'),
        meta: { title: '单页管理', icon: 'example' }
      },
      {
        path: 'side',
        component: () => import('@/views/contentManage/InfoPage/index'),
        meta: { title: '信息页管理', icon: 'example' }
      }
    ]
  },


  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'organization',
        redirect: '/system/organization/list',
        component: () => import('@/views/system/organization/index'),
        meta: { title: '组织管理', icon: 'example' },
        children: [
          {
            path: 'type',
            component: () => import('@/views/system/organization/type/index'),
            meta: { title: '组织类型', icon: 'example' }
          },
          {
            path: 'list',
            component: () => import('@/views/system/organization/list/index'),
            meta: { title: '组织部门', icon: 'example' }
          },

        ]
      },
      {
        path: 'user',
        component: () => import('@/views/system/user/index'),
        meta: { title: '用户管理', icon: 'example' }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/index'),
        meta: { title: '角色管理', icon: 'example' }
      },
      {
        path: 'menu',
        component: () => import('@/views/system/menu/index'),
        meta: { title: '菜单管理', icon: 'example' }
      },
      // {
      //   path: 'dictionary',
      //   component: () => import('@/views/system/dictionary/index'),
      //   meta: { title: '数据字典', icon: 'example' }
      // },
      {
        path: 'log',
        component: () => import('@/views/system/log/index'),
        meta: { title: '操作日志', icon: 'example' }
      }
    ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
