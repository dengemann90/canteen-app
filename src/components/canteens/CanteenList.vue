<template>
  <base-dialog v-if="isLoading" :open="isLoading">
    <base-spinner></base-spinner>
    <p>Daten werden geladen...</p>
  </base-dialog>
  <base-dialog v-if="fetchFailed" :open="fetchFailed">
    <p>
      <i class="fas solid fa-server error"></i>Die Daten konnten vom Server
      nicht geladen werden.
    </p>
    <p>{{ errorCode }}</p>
    <button class="button-ok" @click="confirmFailedFetch">ok</button>
  </base-dialog>

  <div class="canteen-list">
    <p class="activeCanteen">Aktiv: {{ selectedCanteen.name }}</p>
    <ul>
      <canteen-item
        v-for="canteen in canteenList"
        :key="canteen.id"
        :canteen="canteen"
        :selectedCanteenId="this.selectedCanteen.id"
        @update-selected-canteen="fetchDataDishes"
      ></canteen-item>
    </ul>
  </div>
</template>

<script>
import CanteenItem from "./CanteenItem.vue";
import { set, get } from "idb-keyval";
import addDays from "date-fns/addDays";
import format from "date-fns/format";

export default {
  components: {
    CanteenItem,
  },
  props: ["canteenList"],
  data() {
    return {
      selectedCanteen: "",
      isLoading: false,
      fetchFailed: false,
      errorCode: "",
    };
  },
  methods: {
    async fetchDataDishes(canteen) {
      var status = require("statuses");
      this.isLoading = true;
      let dateApiRequest = format(Date.now(), "yyyy-MM-dd");
      let dateIndexedDB = Date.now();
      let dishesPlan = [];

      for (let i = 0; i <= 7; i++) {
        let dishes = [];
        console.log("canteen id fetch ", canteen.id);
        const response = await fetch(
          `https://openmensa.org/api/v2/canteens/${canteen.id}/days/${dateApiRequest}/meals`
        ).catch(() => {
          // this.isLoading = false;
          // this.fetchFailed = true;
        });

        const responseData = await response.json().catch(() => {
          // this.isLoading = false;
          // this.fetchFailed = true;
          this.errorCode = response.status + " - " + status(response.status);
          console.log(
            "error: " + response.status + " - " + status(response.status)
          );
        });

        // if (!response.ok) {
        //   this.fetchFailed = true;
        //   this.errorCode = response.status + " - " + status(response.status);
        //   const error = new Error("failed to fetch request! " + response.status + " - " + status(response.status));
        //   throw error;
        // }

        if (response.ok) {
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
      if (dishesPlan.length > 0) {
        console.log("Gerichte geladen: ", dishesPlan);
        set("dishes", JSON.parse(JSON.stringify(dishesPlan)));
        this.setSelectedCanteen(canteen);
        this.selectedCanteen = canteen;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.fetchFailed = true;
      }
    },
    setSelectedCanteen(canteen) {
      set("selectedCanteen", JSON.parse(JSON.stringify(canteen)));
    },
    confirmFailedFetch() {
      this.fetchFailed = false;
      this.errorCode = "";
    },
  },
  created() {
    get("selectedCanteen").then((data) => {
      if (data != null) {
        this.selectedCanteen = data;
      } else {
        console.log("kein ausgewählte Kantine in der indexedDB");
      }
    });
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

.activeCanteen {
  text-align: left;
  padding-left: 1rem;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.85);
}
.canteen-list {
  padding-top: 2rem;
}

.fas.solid.fa-server.error {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  color: rgba(255, 0, 0, 0.2);
}

button {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  cursor: pointer;
}

.button-ok {
  border: 1px solid #a1a1a180;
  background-color: #a1a1a180;
  color: white;
}

.button-ok:hover,
.button-ok:active {
  background-color: #a1a1a1;
  border-color: #a1a1a1;
}
</style>