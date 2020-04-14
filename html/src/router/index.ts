import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/account_list',
    name: 'AccountList',
    component: () => import(/* webpackChunkName: "account_list" */ '../views/AccountList.vue')
  },
  {
    path: '/nickname_list',
    name: 'NicknameList',
    component: () => import(/* webpackChunkName: "nickname_list" */ '../views/NicknameList.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import(/* webpackChunkName: "setting" */ '../views/Setting.vue')
  },
  {
    path: '/subscribe',
    name: 'Subscribe',
    component: () => import(/* webpackChunkName: "subscribe" */ '../views/Subscribe.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
