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
      this.$store.dispatch("updateFavorites", item);
      this.getFavorites();
    },
    getFavorites() {
      this.favorites = this.$store.getters.getFavorites;
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
  margin: 0rem auto;
  max-width: 40rem;
  padding: 0;
}
</style>