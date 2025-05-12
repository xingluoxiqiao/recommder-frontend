import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import UserGuide from '@/pages/UserGuide.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/PopularMovies.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/realtime',
    name: 'RealtimeRecommend',
    component: () => import('../pages/RealtimeRecommend.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/offline',
    name: 'OfflineRecommend',
    component: () => import('../pages/OfflineRecommend.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: () => import('../pages/MovieDetail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
    meta: { guest: true }  // 只有未登录用户可以访问
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/guide',
    name: 'UserGuide',
    component: UserGuide,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  console.log('路由守卫 - 开始检查')
  console.log('当前路由：', from.path)
  console.log('目标路由：', to.path)
  
  const isLoggedIn = store.getters['user/isLoggedIn']
  console.log('登录状态：', isLoggedIn)
  console.log('当前用户：', store.getters['user/currentUser'])
  
  const currentUser = store.getters['user/currentUser']
  
  // 需要登录的页面
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      console.log('需要登录，重定向到登录页')
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      console.log('已登录，允许访问')
      next()
    }
  }
  // 只有未登录用户可以访问的页面（如登录页）
  else if (to.matched.some(record => record.meta.guest)) {
    if (isLoggedIn) {
      console.log('已登录，重定向到首页')
      next('/')
    } else {
      console.log('未登录，允许访问登录页')
      next()
    }
  }
  // 用户引导页面
  else if (to.path === '/guide' && currentUser?.favoriteGenres?.length > 0) {
    console.log('用户已经有收藏类型，重定向到首页')
    next('/')
  }
  // 其他页面
  else {
    console.log('其他页面，允许访问')
  next()
  }
})

export default router 