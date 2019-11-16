import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewItem from '@/components/NewItem'
import ViewItem from '@/components/ViewItem'
import EditItem from '@/components/EditItem'
import Login from '@/components/Login'
import Register from '@/components/Register'
import NotFound from '@/views/NotFound'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [{
    path: '*',
    name: 'notFound',
    component: NotFound,
  },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/new',
    name: 'new-item',
    component: NewItem,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit/:item_id',
    name: 'edit-item',
    component: EditItem,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/view/:item_id',
    name: 'view-item',
    component: ViewItem,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/groceries',
    name: 'groceries',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Groceries.vue')
  }
]

const router = new VueRouter({
  routes
})

// Nav Guards
router.beforeEach((to, from, next) => {
  // Check for requiredAuth guard (if route requires auth)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NOT logged in
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if logged in
    if (firebase.auth().currentUser) {
      // Go to dashboard
      next({
        path: '/dashboard',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next()
    }
  } else {
    // Proceed to route
    next()
  }
})

export default router