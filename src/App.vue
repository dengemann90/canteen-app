<template>
  <main>
    <router-view></router-view>
  </main>
  <the-navigation></the-navigation>
</template>

<script>
import TheNavigation from "./components/nav/TheNavigation.vue";
import { set, get } from "idb-keyval";

let fakeDishesLoaded = null;
set("dbCreated", true);
get("dishes").then((data) => {
  fakeDishesLoaded = data;
});

if (!fakeDishesLoaded) {
  //Fake data Dishes
  set("dishes", [
    {
      id: 1,
      name: "vegetarische Pizza",
      price: "3,5€",
      label: "vegetarisch",
      description: "Vegetarische Pizza mit Tomaten, Brokuli und Mozzarella",
    },
    {
      id: 2,
      name: "Curry Tofu",
      price: "2,5€",
      label: "vegetarisch",
      description: "gelbes Curry mit Tofu und frischem Gemüse",
    },
    {
      id: 3,
      name: "vegetarische Pizza",
      price: "3,5€",
      label: "vegetarisch",
      description: "Vegetarische Pizza mit Tomaten, Brokuli und Mozzarella",
    },
    {
      id: 4,
      name: "Curry Tofu",
      price: "2,5€",
      label: "vegetarisch",
      description: "gelbes Curry mit Tofu und frischem Gemüse",
    },
  ]);
}

export default {
  components: {
    TheNavigation,
  },
  data() {
    return {};
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
