<template>
<dish-list-date-selector></dish-list-date-selector>
  <ul>
    <dish-item
      v-for="dish in dishes"
      :key="dish.id"
      :id="dish.id"
      :name="dish.name"
      :price="dish.price"
      :label="dish.label"
      :description="dish.description"
      :favorites="favorites"
      @change-favorite-status="changeFavoriteStatus"
    ></dish-item>
  </ul>
</template>

<script>
import DishItem from "./DishItem.vue";
import DishListDateSelector from "./DishListDateSelector.vue";
import { get, set } from "idb-keyval";

export default {
  components: {
    DishItem,
    DishListDateSelector
  },
  data() {
    return {
      dishes: [],
      favorites: [],
    };
  },
  methods: {
    changeFavoriteStatus(id) {
      const posId = this.favorites.indexOf(id);
      if (posId === -1) {
        console.log("old internal favorites: " + this.favorites)
        this.favorites.push(id);
        console.log("dish with id " + id + " added to favorites");
        console.log("updated internal favorites: " + this.favorites)
      } else {
        console.log("old internal favorites: " + this.favorites)
        this.favorites.splice(posId, 1);
        console.log("dish with id " + id + " deleted from favorites");
        console.log("updated internal favorites: " + this.favorites)
      }
      let updateFavoritesDB = Array.from(this.favorites);
      console.log('neues Array favorites DB: ' + updateFavoritesDB);

      set("favorites", updateFavoritesDB)
        .then(() => {
          console.log("favorites updated in indexedDB");
        }).then(() => {
          this.getFavorites();
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
    getDishes() {
      get("dishes")
        .then((data) => {
          this.dishes = data;
          console.log("dishes loaded from indexedDB");
        })
        .catch(console.warn);
    }
  },
  mounted() {
    this.getFavorites();
    this.getDishes();
  }
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