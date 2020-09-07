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
    path: '/toys',
    name: 'Toys',
    component: () => import(/* webpackChunkName: "Toys" */ '../views/ToysComp.vue'),
    meta: {
      login: true //es posible escoger otra palabra para designar necesidad de autentificación
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
