import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/error',
    name: 'Error',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Error.vue')
  },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import(/* webpackChunkName: "about" */ '../views/Gooods.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/goods/details',
    name: 'Details',
    component: () => import(/* webpackChunkName: "about" */ '../views/Details.vue')
  },
  {
    path: '/shoppingCart',
    name: 'ShoppingCart',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShoppingCart.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/collect',
    name: 'Collect',
    component: () => import('../views/Collect.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  },
  {
    path: '/confirmOrder',
    name: 'ConfirmOrder',
    component: () => import('../views/ConfirmOrder.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
