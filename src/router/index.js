import { createRouter, createWebHistory } from 'vue-router'
import Gallery from '@/components/gallery.vue';
import Favorites from '@/components/favorites.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Browse',
      component: Gallery,
      meta: { title: 'Browse - IMGBrowse' }
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites,
      meta: { title: 'Favorites - IMGBrowse' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router
