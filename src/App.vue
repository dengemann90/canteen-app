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

let dateNow = Intl.DateTimeFormat().format(Date.now());
let tomorrow = Intl.DateTimeFormat().format(addDays(Date.now(),1));
let dayAfterTomorrow = Intl.DateTimeFormat().format(addDays(Date.now(),2));
let fakeDishesLoaded = null;
set("dbCreated", true);
get("dishes").then((data) => {
  fakeDishesLoaded = data;
});

if (!fakeDishesLoaded) {
  //Fake data Dishes
  set("dishes", [{
    date: dateNow,
    dishes:[
    {
      id: 1,
      name: "vegetarische Pizza",
      price: "3,5€",
      label: "vegetarisch",
      description: "Vegetarische Pizza mit Tomaten, Brokkoli und Mozzarella",
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
      description: "Vegetarische Pizza mit Tomaten, Brokkoli und Mozzarella",
    },
    {
      id: 4,
      name: "Curry Tofu",
      price: "2,5€",
      label: "vegetarisch",
      description: "gelbes Curry mit Tofu und frischem Gemüse",
    }
  ]},
  {
  date:tomorrow,
  dishes:[
    {
      id: 5,
      name: "vegetarische Suppe",
      price: "1,5€",
      label: "vegetarisch",
      description: "Suppe mit Champignongs",
    },
    {
      id: 6,
      name: "Burger",
      price: "4,5€",
      label: "fleisch",
      description: "Rindfleisch mit Gemüse ",
    },
    {
      id: 7,
      name: "Nudeln",
      price: "2,5€",
      label: "vegetarisch",
      description: "Nudeln mit Tomatensoße",
    },
    {
      id: 8,
      name: "Salat",
      price: "2,5€",
      label: "vegetarisch",
      description: "Salat mit Süßkartoffeln und frischem Gemüse",
    },
  ]
  },
   {
  date:dayAfterTomorrow,
  dishes:[
    {
      id: 9,
      name: "Schwäbische Käsespätzle",
      price: "2,95€",
      label: "vegetarisch",
      description: "Schwäbische Käsespätzle mit Zwiebel-Rahm-Schmelze",
    },
    {
      id: 10,
      name: "Chili con Soja",
      price: "1,90€",
      label: "vegan",
      description: "Chili con Soja mit frischem Gemüse ",
    },
    {
      id: 11,
      name: "Zwei Schwarzwurzelmedaillons",
      price: "1,55€",
      label: "vegetarisch",
      description: "Zwei Schwarzwurzelmedaillons an Tomaten-Ingwer-Sauce",
    },
    {
      id: 12,
      name: "Eine gebackene Hähnchenbrust",
      price: "1,55€",
      label: "Fleisch",
      description: "Eine gebackene Hähnchenbrust im Knuspermantel an Estragon-Senf-Sauce",
    },
  ]
  }
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
