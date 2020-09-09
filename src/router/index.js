import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'

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
    component: () => import(/* webpackChunkName: "Toys" */ '../views/ToysComp.vue'), //toys component no necesita ser importado arriba
    meta: {
      login: true //es posible escoger otra palabra para designar necesidad de autentificación
    }
  },
  { path: '/*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser
  let authRequired = to.matched.some(route => route.meta.login)
  if (!user && authRequired) {
    next('/')
  }else{
    next()
  }
})

export default router
