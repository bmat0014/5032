import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import AccessDenied from '@/views/AccessDenied.vue'
import FirebaseSignInView from '@/views/FirebaseSignInView.vue'
import FirebaseSignUpView from '@/views/FirebaseSignUpView.vue'
import { getAuth } from 'firebase/auth'
import AddBookView from '@/views/AddBookView.vue'

const routes = [
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/FireSignIn',
    name: 'FireSignIn',
    component: FirebaseSignInView
  },
  {
    path: '/FireSignUp',
    name: 'FireSignUp',
    component: FirebaseSignUpView
  },
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDenied
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getAuth().currentUser) {
      next()
    } else {
      alert('You must be logged in to access this page.')
      next('/')
    }
  } else {
    next()
  }
})
export default router
