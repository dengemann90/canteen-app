<template>
  <div class="main">
    <div class="appframe">
      <div class="capital">
        Favoriten<img class="logo-img" src="../assets/LogoTransparent.png" />
      </div>
      <div class="container">
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