<template>
  <base-error-dialog
    v-if="errorDialogIsVisible"
    :open="errorDialogIsVisible"
    :type="this.dialogErrorType"
    :message="this.dialogErrorMessage"
  >
    <button class="button-load" @click="reload">laden</button>
    <button class="button-next" @click="closeDialog">weiter</button>
  </base-error-dialog>
  <base-error-dialog
    v-if="slowConnectionDialogIsVisible"
    :open="slowConnectionDialogIsVisible"
    :type="this.dialogErrorType"
    :message="this.dialogErrorMessage"
    @close="closeDialog"
  >
  </base-error-dialog>

  <the-splash-screen v-if="!readyToLaunch"></the-splash-screen>
  <main>
    <router-view v-if="readyToLaunch"></router-view>
  </main>
  <the-navigation v-if="readyToLaunch"></the-navigation>
</template>

<script>
import TheNavigation from "./components/nav/TheNavigation.vue";
import TheSplashScreen from "./components/ui/TheSplashScreen.vue";
import { set, get } from "idb-keyval";
import addDays from "date-fns/addDays";
import format from "date-fns/format";
import "./assets/styles_app.css";

export default {
  components: {
    TheNavigation,
    TheSplashScreen,
  },
  data() {
    return {
      apiDataCanteens: [],
      errorDialogIsVisible: false,
      slowConnectionDialogIsVisible: false,
      dialogErrorMessage: "",
      dialogErrorType: "",
      readyToLaunch: false,
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
      let timerStart = Date.now();
      let dishesPlan = [];
      let userOnline = await this.isOnline();

      console.log("userOnine new:", userOnline);
      const canteen = await get("selectedCanteen");
      const lastUpdate = await get("dishesUpdated");
      if (canteen != null && lastUpdate != today) {
        setTimeout(() => {
          if (!this.readyToLaunch && userOnline) {
            const dialog = {
              type: "slow",
              message: {
                text: "Dein Internet ist langsam! Daten werden im Hintergrund bei geöffneter App geladen und werden zu einem späteren Zeitpunkt angezeigt.",
                type: "network",
              },
            };
            this.openDialog(dialog);
          }
        }, 5000);

        setTimeout(() => {
          if (!this.readyToLaunch && userOnline) {
            this.closeDialog();
          }
        }, 9000);

        for (let i = 0; i <= 7; i++) {
          let dishes = [];

          if (!userOnline) {
            const dialog = {
              type: "offline",
              message: {
                text: "Du bist offline! Klicke weiter, um die App mit vorhandenen offline-Daten zu nutzen oder aktiviere dein Internet und lade die App neu.",
                type: "network",
              },
            };
            this.openDialog(dialog);
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
        let timerEnd = Date.now();
        let timeRetrieveData = timerEnd - timerStart;
        console.log("fetching time: ", timeRetrieveData);
        if (timeRetrieveData < 1000) {
          setTimeout(() => {
            this.readyToLaunch = true;
            console.log("timer1 verzögert");
          }, 1000 - timeRetrieveData);
        }
      } else {
        setTimeout(() => {
          console.log("timer2");
          this.readyToLaunch = true;
        }, 1000);
      }
    },
    getCanteens() {
      get("locationAllCanteens").then((data) => {
        if (data == null) {
          this.fetchLocationCanteens();
        }
      });
    },

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
    openDialog(dialog) {
      console.log("dialog - message:", dialog);
      this.dialogErrorMessage = dialog.message.text;
      this.dialogErrorType = dialog.message.type;

      if (dialog.type == "slow") {
        this.slowConnectionDialogIsVisible = true;
      }
      if (dialog.type == "offline") {
        this.errorDialogIsVisible = true;
      }
    },
    closeDialog() {
      this.dialogErrorMessage = "";
      this.dialogErrorType = "";
      if (this.errorDialogIsVisible) {
        this.errorDialogIsVisible = false;
      } else {
        this.slowConnectionDialogIsVisible = false;
      }
      this.readyToLaunch = true;
    },
    reload() {
      this.fetchData();
      this.errorDialogIsVisible = false;
    },
    async isOnline() {
      //https://dev.to/maxmonteil/is-your-app-online-here-s-how-to-reliably-know-in-just-10-lines-of-js-guide-3in7
      if (!window.navigator.onLine) return false;

      // avoid CORS errors with a request to your own origin
      const url = new URL(window.location.origin);

      // value to prevent cached responses
      url.searchParams.set("rand", Date.now());

      try {
        const response = await fetch(url.toString(), { method: "HEAD" });

        return response.ok;
      } catch {
        return false;
      }
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

.button-load:hover {
  background-color: #a1a1a1b0;
  border-color: #a1a1a1b0;
}

.button-next:hover {
  background-color: rgba(255, 0, 0, 0.5);
  border-color: rgba(255, 0, 0, 0.5);
}
</style>