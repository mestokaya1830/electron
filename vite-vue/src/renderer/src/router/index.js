import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Index.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import store from '../store/Index.js'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { title: 'Home', auth: true } },
  { path: '/login', name: 'Login', component: Login, meta: { title: 'Login' } },
  { path: '/register', name: 'Register', component: Register, meta: { title: 'Register' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.meta.auth && !store.state.auth) {
    next('/login')
  } else {
    next()
  }
})

export default router
