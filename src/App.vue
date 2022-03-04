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

export default {
  components: {
    TheNavigation,
  },
  data() {
    return {
      apiDataCanteens: [],
    };
  },
  watch:{
    apiDataCanteens(){
      this.prepareFetchedData();
    }
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
        console.log('fetch aller Kantinen openmensa api erfolgreich');
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
    }
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,500;1,700&family=Space+Mono:wght@700&display=swap");
/* Global */
.main {
  /*background-image: url(/Project%202/images/main_background_II.jpg);*/
  /*background-color: #ebeded;*/
  /*background-color: #e1a100;*/
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  /*background-image: url('./images/nutrition.jpg');*/
}

.capital {
  min-height: 20px;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.75rem;
  background-color: #f0fff0;
  font-family: "Space Mono", monospace;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
}

.appframe {
  background-color: rgba(255, 255, 255, 0.7);
  /*background: #5792295b;*/
  /*border: 1px solid #7B7B7B;*/
  box-sizing: border-box;
  box-shadow: 0px 30px 30px rgba(0, 0, 0, 0.4);
  border-radius: 1%;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: top 25px;
  min-height: 100vh;
}

.container_all {
  min-height: 500px;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* background-color: red; */
}
h1 {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.7);
}

h2 {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  color: rgba(0, 0, 0, 0.7);
}

h3 {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  font-style: italic;
  color: rgba(0, 0, 0, 0.7);
}

p.capital {
  margin-top: 4%;
}

p {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
}

b {
  color: rgba(0, 0, 0, 0.7);
}
</style>
