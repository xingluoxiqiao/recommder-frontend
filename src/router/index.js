import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import RealtimeRecommend from '../pages/RealtimeRecommend.vue'
import OfflineRecommend from '../pages/OfflineRecommend.vue'
import PopularMovies from '../pages/PopularMovies.vue'
import MovieDetail from '../pages/MovieDetail.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail
  },
  {
    path: '/realtime',
    name: 'RealtimeRecommend',
    component: RealtimeRecommend
  },
  {
    path: '/offline',
    name: 'OfflineRecommend',
    component: OfflineRecommend
  },
  {
    path: '/popular',
    name: 'PopularMovies',
    component: PopularMovies
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // TODO: 实现登录验证
  next()
})

export default router 