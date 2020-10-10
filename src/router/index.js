import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import List from '../views/List.vue'
import Login from '../views/Login.vue'
import Detailed from '../views/Detailed.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'List',
    component: List
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/detailed/:id',
    name: 'Detailed',
    component: Detailed
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router
