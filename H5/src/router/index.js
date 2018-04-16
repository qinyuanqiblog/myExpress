import Vue from 'vue'
import Router from 'vue-router'
import idx from '@/pages/index'
import register from '@/pages/register'
import login from '@/pages/login'
import demoRouter from './demoRouter'

Vue.use(Router)
let router = [{
  path: '/',
  component: idx
}, {
  path: '/login',
  component: login
}, {
  path: '/register',
  component: register
}, {
  path: '*',
  redirect: '/'
}]
export default new Router({
  routes: router.concat(demoRouter)
})
