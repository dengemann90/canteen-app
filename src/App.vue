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
      "id":4655104,
      "name":"Doppelte Salatschale",
      "category":"Salate",
      "prices":{
         "students":3.15,
         "employees":6.3,
         "pupils":null,
         "others":6.95
      },
      "notes":[
         "grün (Ampel)",
         "vegan",
         "Süßungsmittel",
         "Sellerie"
      ]
   },
   {
      "id":4655114,
      "name":"Schwäbische Käsespätzle mit Zwiebel-Rahm-Schmelze",
      "category":"Essen",
      "prices":{
         "students":2.95,
         "employees":5.9,
         "pupils":null,
         "others":6.5
      },
      "notes":[
         "gelb (Ampel)",
         "vegetarisch",
         "bio",
         "Weizen",
         "Eier",
         "Milch und Milchprodukte (inkl. Laktose)"
      ]
   },
   {
      "id":4655115,
      "name":"Chili con Soja mit frischem Gemüse",
      "category":"Essen",
      "prices":{
         "students":1.9,
         "employees":3.8,
         "pupils":null,
         "others":4.2
      },
      "notes":[
         "grün (Ampel)",
         "vegan",
         "Klimaessen",
         "Sellerie",
         "Soja",
         "Antioxidationsmittel"
      ]
   },
   {
      "id":4655117,
      "name":"Zwei Schwarzwurzelmedaillons an Tomaten-Ingwer-Sauce",
      "category":"Essen",
      "prices":{
         "students":1.55,
         "employees":3.1,
         "pupils":null,
         "others":3.4
      },
      "notes":[
         "gelb (Ampel)",
         "vegetarisch",
         "Weizen",
         "Sellerie",
         "Milch und Milchprodukte (inkl. Laktose)",
         "Sesam",
         "Hefe",
         "Antioxidationsmittel"
      ]
   }
  ]},
  {
  date:tomorrow,
  dishes:[
   {
      "id":9200020,
      "name":"Duftreis-Rote-Bohnen-Bowl mit Sojasaucen-Dressing und geröstetem Sesam",
      "category":"Vorspeisen",
      "prices":{
         "students":3.45,
         "employees":3.8,
         "pupils":null,
         "others":4.15
      },
      "notes":[
         "grün (Ampel)",
         "vegan",
         "konserviert",
         "Antioxidationsmittel",
         "Soja",
         "Sesam"
      ]
   },
   {
      "id":9200027,
      "name":"Grünkerneintopf mit Rote Bete",
      "category":"Essen",
      "prices":{
         "students":1.9,
         "employees":3.8,
         "pupils":null,
         "others":4.2
      },
      "notes":[
         "grün (Ampel)",
         "vegan",
         "Klimaessen",
         "Dinkel"
      ]
   },
   {
      "id":9200028,
      "name":"Gebackener Kartoffelbratling mit Frischkäsefüllung an Kräuter-Sahne-Sauce",
      "category":"Essen",
      "prices":{
         "students":1.55,
         "employees":3.1,
         "pupils":null,
         "others":3.4
      },
      "notes":[
         "gelb (Ampel)",
         "vegetarisch",
         "Antioxidationsmittel",
         "Weizen",
         "Milch und Milchprodukte (inkl. Laktose)",
         "Schwefeldioxid und Sulfide"
      ]
   },
   {
      "id":9200029,
      "name":"3 Stück Gemüsebällchen an Kichererbsen-Kokos-Sauce",
      "category":"Essen",
      "prices":{
         "students":1.55,
         "employees":3.1,
         "pupils":null,
         "others":3.4
      },
      "notes":[
         "gelb (Ampel)",
         "vegan",
         "Weizen",
         "Hefe"
      ]
   }
  ]
  },
   {
  date:dayAfterTomorrow,
  dishes:[
   {
      "id":9286532,
      "name":"Scharfe indische Kichererbsensuppe",
      "category":"Suppen",
      "prices":{
         "students":0.6,
         "employees":1.2,
         "pupils":null,
         "others":1.3
      },
      "notes":[
         "gelb (Ampel)",
         "vegan",
         "Antioxidationsmittel",
         "Senf"
      ]
   },
   {
      "id":9286533,
      "name":"Berliner Boulette vom Schwein und Rind an Zwiebel-Kräuter-Sauce",
      "category":"Essen",
      "prices":{
         "students":2.15,
         "employees":4.3,
         "pupils":null,
         "others":4.75
      },
      "notes":[
         "gelb (Ampel)",
         "Schweinefleisch bzw. mit Gelatine vom Schwein",
         "mit zum Teil fein zerkleinertem Fleischanteil",
         "Weizen",
         "Milch und Milchprodukte (inkl. Laktose)",
         "Hefe",
         "Senf"
      ]
   },
   {
      "id":9286534,
      "name":"Farfalle mit frischem Grünkohl und Champignons",
      "category":"Essen",
      "prices":{
         "students":1.9,
         "employees":3.8,
         "pupils":null,
         "others":4.2
      },
      "notes":[
         "grün (Ampel)",
         "vegan",
         "Klimaessen",
         "Antioxidationsmittel",
         "Weizen",
         "Soja"
      ]
   },
   {
      "id":9286535,
      "name":"Zwei gekochte Eier in Senfsauce",
      "category":"Essen",
      "prices":{
         "students":1.55,
         "employees":3.1,
         "pupils":null,
         "others":3.4
      },
      "notes":[
         "rot (Ampel)",
         "vegetarisch",
         "bio",
         "Weizen",
         "Eier",
         "Milch und Milchprodukte (inkl. Laktose)",
         "Senf"
      ]
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
