import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import stockDownload from '@/views/stockDownload.vue'
import stockData from '@/views/stockData.vue'
import stockFavorite from '@/views/stockFavorite.vue'
import stockIndex from '@/views/stockIndex.vue'
import stockMemo from '@/views/stockMemo.vue'
import stockStatistics from '@/views/stockStatistics.vue'
import stockProfit from '@/views/stockProfit.vue'
import login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'stockStatistics',
    component: stockStatistics
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/stockDownload',
    name: 'stockDownload',
    component: stockDownload
  },
  {
    path: '/stockData',
    name: 'stockData',
    component: stockData
  },
  {
    path: '/stockFavorite',
    name: 'stockFavorite',
    component: stockFavorite
  },
  {
    path: '/stockIndex',
    name: 'stockIndex',
    component: stockIndex
  },
  {
    path: '/stockMemo',
    name: 'stockMemo',
    component: stockMemo
  },
  {
    path: '/stockProfit',
    name: 'stockProfit',
    component: stockProfit
  },
  {
    path: '/stockStatistics',
    name: 'stockStatistics',
    component: stockStatistics
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
