<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <div class="capital">
          Favorites<img src="../assets/LogoTransparent.png" />
        </div>
        <div class="container_all">
          <!-- Hier content -->
          <favorite-dish-list></favorite-dish-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FavoriteDishList from "../components/favorites/FavoriteDishList.vue";
export default {
  components: {
    FavoriteDishList,
  },
};
</script>

<style scoped>
/*  */
</style>