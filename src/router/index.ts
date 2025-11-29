import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/category/:categoryId',
      name:  'Category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/product/:productId',
      name: 'Product',
      component: () => import('../views/ProductView.vue')
    }
  ],
})

export default router