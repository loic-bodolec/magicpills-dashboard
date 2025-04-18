import { createRouter, createWebHistory } from 'vue-router';
import baseUrl from '../config/baseUrl';
import LandingPageView from '../views/LandingPageView.vue';
import MainLayout from '../layouts/MainLayout.vue';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPageView,
  },
  {
    path: '/app',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/DashboardView.vue'),
      },
      // Ajoutez d'autres routes ici
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundPageView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(baseUrl), // Utilise la base dynamique
  routes,
});

export default router;
