import ArticlesView from '@/views/ArticlesView.vue'
import CanyonsView from '@/views/CanyonsView.vue'
import MapView from '@/views/MapView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/canyons', // Redirige automáticamente a /canyons
    },
    {
      path: '/canyons',
      name: 'canyons',
      component: CanyonsView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesView,
    },
  ],
})

export default router
