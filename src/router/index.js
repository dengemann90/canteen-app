import { createRouter, createWebHistory } from 'vue-router';
import Location from '../views/Location.vue'
import Plan from '../views/Plan.vue';
import Favorites from '../views/Favorites.vue';
import Purchase from '../views/Purchase.vue';
import Profile from '../views/Profile.vue';

const routes = [
  {path: '/', redirect: '/plan'},
  {path: '/location', component:Location},
  {path: '/plan', component:Plan},
  {path: '/favorites', component:Favorites},
  {path: '/purchase', component:Purchase},
  {path: '/profile', component:Profile},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(){
    return {left:0, top:0};
}
})

export default router
