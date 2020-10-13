import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/pos/transaction/new',
          name: 'newpos',
          component: () => import(/* webpackChunkName: "demo" */ './views/Pos/posNew.vue')
        },
        {
          path: '/master/:selector',
          name: 'master',
          component: () => import(/* webpackChunkName: "demo" */ './views/Master/Masterdata.vue')
        },
        {
          path: '/admin/:selector',
          name: 'master',
          component: () => import(/* webpackChunkName: "demo" */ './views/Master/Masterdata.vue')
        },
        {
          path: '/master/:selector/:masteredit_mode',
          name: 'master',
          component: () => import(/* webpackChunkName: "demo" */ './views/Master/Masteredit.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        }
      ]
    }
  ]
})
