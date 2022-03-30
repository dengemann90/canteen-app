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
      var status = require("statuses");
      let dateApiRequest = format(Date.now(), "yyyy-MM-dd");
      let dateIndexedDB = Date.now();
      let today = format(Date.now(), "dd-MM-yyyy");
      let dishesPlan = [];

      const canteen = await get("selectedCanteen");
      const lastUpdate = await get("dishesUpdated");
      if (canteen != null && lastUpdate != today) {
        for (let i = 0; i <= 7; i++) {
          let dishes = [];

          const response = await fetch(
            `https://openmensa.org/api/v2/canteens/${canteen.id}/days/${dateApiRequest}/meals`
          ).catch(() => {
            console.log(
              `error ${response.status} - ${status(
                response.status
              )} : Data for the canteen with the Id ${
                canteen.id
              } for the day ${dateApiRequest} could not be loaded from open mensa api!`
            );
          });
          const responseData = await response.json().catch(() => {
            console.log(
              `error ${response.status} - ${status(
                response.status
              )} : Data for the canteen with the Id ${
                canteen.id
              } for the day ${dateApiRequest} could not be loaded from open mensa api!`
            );
          });

          if (response.ok) {
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
          } else {
            dateApiRequest = format(addDays(Date.now(), i + 1), "yyyy-MM-dd");
            dateIndexedDB = addDays(dateIndexedDB, 1);
          }
        }

        console.log(dishesPlan);
        set("dishes", JSON.parse(JSON.stringify(dishesPlan))).then(() => {
          set("dishesUpdated", JSON.parse(JSON.stringify(today)));
        });
      }
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