import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layouts/Index.vue'
import Home from '../views/Index.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      { path: '/', name: 'Home', component: Home, meta: { title: 'Home' } },
      { path: '/login', name: 'Login', component: Login, meta: { title: 'Login' } },
      { path: '/register', name: 'Register', component: Register, meta: { title: 'Register' } }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default Title'
  next()
})

export default router
