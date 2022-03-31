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
      selectedNutrition: "",
      allergensAdditivesExcluded: [],
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
          this.dishes = this.filterDishes(result.dishes);
          console.log("filteredDishes:", this.dishes);
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
    filterDishes(unfilteredDishes) {
      let filteredDishes = [];
      console.log("method filter dishes Nutrition", this.selectedNutrition);

      if (this.selectedNutrition == "Omnivore") {
        for (let dish of unfilteredDishes) {
          if (!this.excludedIngredientFound(dish)) {
            filteredDishes.push(dish);
          }
        }
      }
      if (this.selectedNutrition == "Pescetarisch") {
        for (let dish of unfilteredDishes) {
          if (
            dish.notes[1] == "vegetarisch" ||
            dish.notes[1] == "vegan" ||
            dish.notes.includes("Fisch")
          ) {
            if (!this.excludedIngredientFound(dish)) {
              filteredDishes.push(dish);
            }
          }
        }
      }
      if (this.selectedNutrition == "Vegetarisch") {
        for (let dish of unfilteredDishes) {
          if (dish.notes[1] == "vegetarisch" || dish.notes[1] == "vegan") {
            if (!this.excludedIngredientFound(dish)) {
              filteredDishes.push(dish);
            }
          }
        }
      }
      if (this.selectedNutrition == "Vegan") {
        for (let dish of unfilteredDishes) {
          if (dish.notes[1] == "vegan") {
            if (!this.excludedIngredientFound(dish)) {
              filteredDishes.push(dish);
            }
          }
        }
      }

      return filteredDishes;
    },
    excludedIngredientFound(dish) {
      return dish.notes.some((value) =>
        this.allergensAdditivesExcluded.includes(value)
      );
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
    getEntries() {
      get("selectedNutrition")
        .then((data) => {
          if (data != null) {
            this.selectedNutrition = data;
          } else {
            this.selectedNutrition = "Omnivore";
          }
        })
        .then(() => {
          get("excludedAllergensAdditives")
            .then((data) => {
              if (data != null) {
                this.allergensAdditivesExcluded = data;
              }
            })
            .then(() => {
              get("favorites")
                .then((data) => {
                  if (data != null) {
                    this.favorites = data;
                  }
                })
                .then(() => {
                  this.getDishes();
                });
            });
        });
    },
  },
  watch: {
    dateSelected() {
      this.getDishes();
    },
  },
  created() {
    this.getEntries();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0rem auto;
  max-width: 40rem;
  min-width: 17.5rem;
  padding: 0;
}
</style>