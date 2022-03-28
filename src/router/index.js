import { createRouter, createWebHistory } from 'vue-router';
import Locations from '../views/Locations.vue';
import Plan from '../views/Plan.vue';
import Favorites from '../views/Favorites.vue';
import Profile from '../views/Profile.vue';
import GeneralSettings from '../components/profile/GeneralSettings.vue';
import Nutrition from '../components/profile/NutritionList.vue';
import AllergensAdditives from '../components/profile/AllergensAdditivesList.vue';
import Start from '../views/Start.vue';

const routes = [
  { path: '/', redirect: '/start' },
  { path: '/locations', component: Locations },
  { path: '/plan', component: Plan },
  { path: '/favorites', component: Favorites },
  { path: '/start', component: Start },
  {
    path: '/profile', component: Profile,
    children: [
      { path: 'general_settings', component: GeneralSettings },
      { path: 'nutrition', component: Nutrition },
      { path: 'allergens_additives', component: AllergensAdditives }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  }
})

export default router
