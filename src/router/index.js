import { createRouter, createWebHistory } from 'vue-router';
import Location from '../views/Location.vue'
import Plan from '../views/Plan.vue';
import Favorites from '../views/Favorites.vue';
import Purchase from '../views/Purchase.vue';
import Profile from '../views/Profile.vue';
import GeneralSettings from '../components/profile/GeneralSettings.vue';
import Nutrition from '../components/profile/NutritionList.vue';
import AllergensAdditives from '../components/profile/AllergensAdditivesList.vue';

const routes = [
  { path: '/', redirect: '/plan' },
  { path: '/location', component: Location },
  { path: '/plan', component: Plan },
  { path: '/favorites', component: Favorites },
  { path: '/purchase', component: Purchase },
  { path: '/profile', component: Profile,
  children:[
    { path: 'general_settings', component: GeneralSettings },
    { path: 'nutrition', component: Nutrition },
    { path: 'allergens_additives', component: AllergensAdditives}
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
