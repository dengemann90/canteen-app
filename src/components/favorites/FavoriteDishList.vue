<template>
<p v-if="favorites.length === 0">Bisher keine Favoriten gespeichert!</p>
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
import DishItem from "../plan/DishItem.vue";
import { get } from "idb-keyval";
import { set } from "idb-keyval";
export default {
  components: {
    DishItem,
  },
  data() {
    return {
      favorites: []
    };
  },
  methods: {
    changeFavoriteStatus(item) {
      const indexFavorites = this.favorites.findIndex(
        (dish) => dish.id === item.id
      );
      if (indexFavorites === -1) {
        this.favorites.unshift(item);
        console.log("dish with id " + item.id + " added to favorites");
      } else {
        this.favorites.splice(indexFavorites, 1);
        console.log("dish with id " + item.id + " deleted from favorites");
      }
      set("favorites", JSON.parse(JSON.stringify(this.favorites)))
        .then(() => {
          console.log("favorites updated in indexedDB: ");
        })
        .then(() => {
          this.getFavorites();
          console.dir(this.favorites);
        })
        .catch(console.warn);
    },
    getFavorites() {
      get("favorites")
        .then((data) => {
          if (!data) {
            console.log("no favorites in indexedDB");
            return;
          }
          this.favorites = data;
          console.log("favorites loaded from indexedDB");
        })
        .catch(console.warn);
    },
  },
  mounted() {
    this.getFavorites();
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