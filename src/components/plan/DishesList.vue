<template>
  <ul>
    <dish-item
      v-for="dish in dishes"
      :key="dish.id"
      :id="dish.id"
      :name="dish.name"
      :price="dish.price"
      :label="dish.label"
      :description="dish.description"
      :isFavorite="dish.isFavorite"
      @change-favorite-status="changeFavoriteStatus"
    ></dish-item>
  </ul>
</template>

<script>
import DishItem from "./DishItem.vue";
import { get, set } from "idb-keyval";

export default {
  components: {
    DishItem,
  },
  data() {
    return {
      dishes: [],
      favorites: [],
    };
  },
  methods: {
    changeFavoriteStatus(id) {
      const identifiedDish = this.dishes.find((dish) => dish.id === id);
      identifiedDish.isFavorite = !identifiedDish.isFavorite;

      const posId = this.favorites.indexOf(id);
      if (posId === -1) {
        this.favorites.push(id);
        console.log("dish with id " + id + " added to favorites");
      } else {
        this.favorites.pop(id);
        console.log("dish with id " + id + " deleted from favorites");
      }
      const favorites = Array.from(this.favorites);

      set("favorites", favorites)
        .then(() => {
          console.log("favorites updated in indexedDB");
        })
        .catch(console.warn);
    },
    matchDishes() {
      let dishesDB = [];
      let favoritesDB = [];
      get("dishes")
        .then((data) => {
          dishesDB = data;
          console.log("dishes loaded from indexedDB");
        })
        .then(() => {
          get("favorites")
            .then((data) => {
              if (!data) {
                this.dishes = dishesDB;
                console.log("no favorites in indexedDB");
                return;
              }
              favoritesDB = data;
              this.favorites = data;
              console.log("favorites loaded from indexedDB");
            })
            .then(() => {
              dishesDB.forEach((dish) => {
                const posId = favoritesDB.indexOf(dish.id);
                if (posId === -1) {
                  dish.isFavorite = false;
                } else {
                  dish.isFavorite = true;
                }
              });
              this.dishes = dishesDB;
            });
        })
        .catch(console.warn);
    },
  },
  mounted() {
    this.matchDishes();
  },
  beforeUnmount() {
    this.matchDishes();
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