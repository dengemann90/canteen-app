<template>
  <base-error-dialog
    v-if="dialogIsVisible"
    :open="dialogIsVisible"
    :type="this.dialogErrorType"
    :message="this.dialogErrorMessage"
  >
    <button class="button-load" @click="reload">laden</button>
    <button class="button-next" @click="closeDialog">weiter</button>
  </base-error-dialog>
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
      dialogIsVisible: true,
      dialogErrorMessage: "Du bist offline! Klicke weiter, um die App mit vorhandenen offline-Daten zu nutzen oder aktiviere dein Internet und lade die App neu.",
      dialogErrorType: "network",
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
          let online = window.navigator.onLine;
          let dishes = [];

          if (!online) {
            this.isLoading = false;
            const dialogContent = {
              message:
                "Du bist offline. Klicke weiter, um die App offline zu nutzen oder aktiviere dein Internet und lade die App neu.",
              type: "network",
            };
            this.openDialog(dialogContent);
            return;
          }

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
    openDialog(dialogContent) {
      this.dialogErrorMessage = dialogContent.message;
      this.dialogErrorType = dialogContent.type;
      this.dialogIsVisible = true;
    },
    closeDialog() {
      this.dialogErrorMessage = "";
      this.dialogErrorType = "";
      this.dialogIsVisible = false;
    },
    reload(){
      this.fetchData();
      this.dialogIsVisible = false;
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

<style scoped>

.button-load {
  border: 1px solid #a1a1a180;
  background-color: #a1a1a180;
  color: white;
}

.button-next {
  border: 1px solid rgba(255, 0, 0, 0.25);
  background-color: rgba(255, 0, 0, 0.25);
  color: white;
}

button {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  padding: 0.5rem 2rem;
  border-radius: 30px;
  cursor: pointer;
  margin-left: 2.5rem;
  margin-right: 0.5rem;
}

.button-load:hover{
  background-color: #a1a1a1b0;
  border-color: #a1a1a1b0;
}

.button-next:hover {
  background-color: rgba(255, 0, 0, 0.5);
  border-color: rgba(255, 0, 0, 0.5);
}
</style>