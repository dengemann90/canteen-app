<template>
  <main>
    <router-view></router-view>
  </main>
  <the-navigation></the-navigation>
</template>

<script>
import TheNavigation from "./components/nav/TheNavigation.vue";
//import { set, get } from "idb-keyval";
import { set } from "idb-keyval";
import addDays from "date-fns/addDays";
import format from "date-fns/format";

export default {
  components: {
    TheNavigation,
  },
  data() {
    return {};
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
        console.log("fetch openmensa api successful!");

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

    // json locals
    async fetchLocation() {
      // let localsList = [];
      let locals = [];

      const responseLocal = await fetch(
        `https://openmensa.org/api/v2/canteens?near[lat]=52.393535&near[lng]=13.127814&near[dist]=15`
      );

      const responseDataLocal = await responseLocal.json();

      for (const key in responseDataLocal) {
        const local = {
          id: responseDataLocal[key].id,
          name: responseDataLocal[key].name,
          city: responseDataLocal[key].city,
          address: responseDataLocal[key].address,
          coordinates: responseDataLocal[key].coordinates,
        };
        locals.push(local);
        console.log("locals Json!");
        //console.log(locals)
      }
      console.log(responseDataLocal);
      set("locals", JSON.parse(JSON.stringify(locals)));
      //console.log(locals)
    },
    //52.51947859531712, 13.388128402966837 (mitte)
  },
  created() {
    this.fetchData();
    this.fetchLocation();
    this.$store.dispatch("loadFavorites");
    this.$store.dispatch("loadSelectedNutrition");
    this.$store.dispatch("loadExcludedAllergensAdditives"); 

  },
};
</script>

<style>
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
  font-size: 25px;
  background-color: #f0fff0;
}

p.capital {
  margin-top: 4%;
}

.appframe {
  background-color: rgba(255, 255, 255, 0.7);
  /*background: #5792295b;*/
  /*border: 1px solid #7B7B7B;*/
  box-sizing: border-box;
  box-shadow: 0px 30px 30px rgba(0, 0, 0, 0.4);
  border-radius: 5%;
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
</style>
