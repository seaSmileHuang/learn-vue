import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EchartsRouter from './modules/echart'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    component: () => import('@/views/Layout.vue'),
    redirect: '/dashbroad',
    children: [
      {
        path: 'dashbroad',
        name: 'dashbroad',
        component: () => import('@/views/DashBroad.vue')
      }
    ]
  },
  EchartsRouter,
  {
    key: 'about',
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
    children: [
      {
        path: 'test/:name',
        name: 'test',
        component: () => import('../views/Test.vue'),
        props: true,
        beforeEnter (to, from, next) {
          console.log('beforeEnter132')
          next()
        }
      },
      {
        path: 'test1',
        name: 'test1',
        component: () => import('../views/TestTes.vue')
      }
    ]
  },
  {
    path: '/content',
    name: 'content',
    component: () => import('../views/Content.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('../views/Forbidden.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }

]

const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? '/content/app-vue/app1' : '/',
  mode: 'history',
  routes,
  scrollBehavior (to, from) {
    return { x: 0, y: 0 }
  }
})
export default router
