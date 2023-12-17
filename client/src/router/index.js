import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/AddEvent',
    name: 'AddEvent',
    component: () => import('../views/AddEvent.vue')
  },
  {
    path: '/event/:id',
    name: 'EditEvent',
    component: () => import('../views/EditEvent.vue'),
    props : true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
