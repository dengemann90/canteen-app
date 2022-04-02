<template>
  <p v-if="dataFetched && favorites.length === 0">Bisher keine Favoriten gespeichert!</p>
  <ul v-else>
    <dish-item
      v-for="dish in favorites"
      :key="dish.id"
      :dish-item="dish"
      :favorites="favorites"
      @change-favorite-status="changeFavoriteStatus"
    ></dish-item>
  </ul>
</template>

<script>
import { get } from "idb-keyval";
import DishItem from "../plan/DishItem.vue";
export default {
  components: {
    DishItem,
  },
  data() {
    return {
      favorites: [],
      dataFetched: false
    };
  },
  methods: {
    changeFavoriteStatus(item) {
      this.$store.dispatch("updateFavorites", item);
      this.getFavorites();
    },
    getFavorites() {
      this.favorites = this.$store.getters.getFavorites;
    },
  },
  created() {
    get("favorites").then((data) => {
      if (data != null) {
        this.dataFetched = true;
        this.favorites = data;
      } else{
        this.dataFetched = true;
      }
    });
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 40rem;
  padding: 0;
}
</style>