<template>
  <ul>
    <dish-category
      v-for="category in dishListCategories"
      :key="category.category"
      :category="category"
      :favorites="favorites"
      @change-favorite-status="changeFavoriteStatus"
    ></dish-category>
  </ul>
</template>

<script>
import DishCategory from "./DishCategory.vue";
import { get } from "idb-keyval";
import { set } from "idb-keyval";
export default {
  components: {
    DishCategory,
  },
  props: ["dateSelected"],
  data() {
    return {
      dishes: [],
      favorites: [],
      categories: [],
      dishListCategories: [],
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
    getDishes() {
      get("dishes")
        .then((data) => {
          let result = data.find(
            (request) => request.date === this.dateSelected
          );
          this.dishes = result.dishes;
          console.log("props date " + this.dateSelected);
          console.log("dishes loaded from indexedDB");
          console.log(result.dishes);
          this.getCategories();
          console.log("catgeories:");
          console.dir(this.categories);
          this.getDishListCategories();
        })
        .catch(console.warn);
    },
    getCategories() {
      this.categories = [];
      for (let dish of this.dishes) {
        const categoryIncluded = this.categories.some(
          (c) => c == dish.category
        );
        if (!categoryIncluded) {
          this.categories.push(dish.category);
        }
      }
    },
    getDishListCategories() {
      this.dishListCategories = [];
      for (let category of this.categories) {
        let dishes = [];
        for (let dish of this.dishes) {
          if (dish.category == category) {
            dishes.push(dish);
          }
        }
        this.dishListCategories.push({
          category: category,
          dishes: dishes,
        });
        dishes = [];
      }
      console.log("dishListCategories:");
      console.dir(this.dishListCategories);
    },
  },
  watch: {
    dateSelected() {
      this.getDishes();
    },
  },
  mounted() {
    this.getFavorites();
    this.getDishes();
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