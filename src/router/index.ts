import CanyonsView from '@/views/CanyonsView.vue'
import MapView from '@/views/MapView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import DisclaimerView from '@/views/DisclaimerView.vue'
import RecoverPasswordView from '@/views/RecoverPasswordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/canyons',
    },
    {
      path: '/canyons',
      name: 'canyons',
      component: CanyonsView,
    },
    {
      path: '/canyons/favourite',
      name: 'canyonsFavourites',
      component: CanyonsView,
    },
    {
      path: '/canyons/:id/:slug?',
      name: 'canyon',
      component: CanyonsView,
    },
    {
      path: '/canyons/favourite/:id/:slug?',
      name: 'canyonFavourite',
      component: CanyonsView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
    {
      path: '/updatePassword/:email/:token',
      name: 'recoverPassword',
      component: RecoverPasswordView,
    },
    /*     {
      path: '/news',
      name: 'news',
      component: NewsView,
    },
    {
      path: '/news/:id/:slug?',
      name: 'new',
      component: NewsView,
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView,
    },
    {
      path: '/events/:id/:slug?',
      name: 'event',
      component: EventsView,
    }, */
    {
      path: '/disclaimer',
      name: 'disclaimer',
      component: DisclaimerView,
    },
  ],
})

export default router
