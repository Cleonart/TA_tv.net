import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import Login from '@/views/Login'
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
          path: '/:officer_id/new-instalation/',
          name: 'Pemasangan Baru',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Pos/NewInstalation.vue')
        },
        {
          path: 'master/:selector',
          name: "Daftar Pelanggan", 
          component: () => import('./views/Master/Masterdata.vue')
        },
        {
          path: '/bill/:customer_id',
          name: "Pembayaran",
          component: () => import('./views/Pos/PayBill.vue')
        },
        {
          path: 'master/pelanggan/:id',
          name: "Detail Pelanggan",
          component: () => import('./views/Customer/Detail.vue')
        },
        {
          path: 'master/:selector/:masteredit_mode',
          name: "Masteredit",
          component: () => import('./views/Master/Masteredit.vue')
        }
      ]
    },
    {
      path: '/login',
      name : "Login",
      component: Login
    }
  ]
})
