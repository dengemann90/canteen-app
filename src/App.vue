<template>
  <main>
    <router-view></router-view>
  </main>
  <the-navigation></the-navigation>
</template>

<script>
import TheNavigation from "./components/nav/TheNavigation.vue";
import { set, get } from "idb-keyval";
import addDays from "date-fns/addDays";
import format from "date-fns/format";
import "./assets/styles_app.css";

export default {
  components: {
    TheNavigation,
  },
  data() {
    return {
      apiDataCanteens: [],
    };
  },
  watch: {
    apiDataCanteens() {
      this.prepareFetchedData();
    },
  },
  methods: {
    async fetchData() {
      let dateApiRequest = format(Date.now(), "yyyy-MM-dd");
      let dateIndexedDB = Date.now();
      let dishesPlan = [];

      for (let i = 0; i <= 7; i++) {
        let dishes = [];

        const response = await fetch(
          `https://openmensa.org/api/v2/canteens/${this.$store.getters.getCanteenId}/days/${dateApiRequest}/meals`
        );
        const responseData = await response.json();

        if (!response.ok) {
          const error = new Error(
            responseData.message || "failed to fetch request!"
          );
          throw error;
        }
        console.log("fetch Gerichte openmensa api successful!");

        for (const key in responseData) {
          const dish = {
            id: responseData[key].name,
            category: responseData[key].category,
            prices: responseData[key].prices,
            notes: responseData[key].notes,
          };
          dishes.push(dish);
        }

        let dishesPerDay = {
          date: format(dateIndexedDB, "d.M.yyyy"),
          dishes: dishes,
        };

        if (dishesPerDay.dishes.length > 0) {
          dishesPlan.push(dishesPerDay);
        }

        dateApiRequest = format(addDays(Date.now(), i + 1), "yyyy-MM-dd");
        dateIndexedDB = addDays(dateIndexedDB, 1);
      }
      console.log(dishesPlan);
      set("dishes", JSON.parse(JSON.stringify(dishesPlan)));
    },
    getCanteens() {
      get("locationAllCanteens").then((data) => {
        if (data == null) {
          this.fetchLocationCanteens();
        }
      });
    },
    // json locals
    async fetchLocationCanteens() {
      try {
        const responseFetch = await fetch(
          "https://openmensa.org/api/v2/canteens"
        );
        this.apiDataCanteens = await responseFetch.json();
        console.log("fetch aller Kantinen openmensa api erfolgreich");
      } catch (error) {
        console.log("error fetch: ", error);
      }
    },
    prepareFetchedData() {
      let canteens = [];
      let apiData = this.apiDataCanteens;

      for (const key in apiData) {
        const canteen = {
          id: apiData[key].id,
          name: apiData[key].name,
          city: apiData[key].city,
          address: apiData[key].address,
          coordinates: apiData[key].coordinates,
        };
        canteens.push(canteen);
      }
      set("locationAllCanteens", JSON.parse(JSON.stringify(canteens)));
    },
  },
  created() {
    this.fetchData();
    this.getCanteens();
    this.$store.dispatch("loadUserType");
    this.$store.dispatch("loadFavorites");
    this.$store.dispatch("loadSelectedNutrition");
    this.$store.dispatch("loadExcludedAllergensAdditives");
  },
};
</script>