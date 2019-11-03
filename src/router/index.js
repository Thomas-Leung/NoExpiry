import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewItem from '@/components/NewItem'
import ViewItem from '@/components/ViewItem'
import EditItem from '@/components/EditItem'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/new',
    name: 'new-item',
    component: NewItem
  },
  {
    path: '/edit/:item_id',
    name: 'edit-item',
    component: EditItem
  },
  {
    path: '/:item_id',
    name: 'view-item',
    component: ViewItem
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
