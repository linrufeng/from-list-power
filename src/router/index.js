import Vue from 'vue'
import VueRouter from 'vue-router'
import EditSort from '../views/EditSort.vue'
import Home from '../views/Home.vue'
import HistoryPage from '../views/HistoryPage.vue'
import FromUse from '../views/FromUse.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/edit',
    name: 'EditSort',
    component: EditSort
  },
  {
    path: '/history',
    name: 'HistoryPage',
    component: HistoryPage
  },
  {
    path: '/fromuse',
    name: 'FromUse',
    component: FromUse
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
