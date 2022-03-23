<template>
  <base-dialog v-if="isLoading" :open="isLoading">
    <base-spinner></base-spinner>
    <button @click="isLoading = false">cancel</button>
  </base-dialog>
  <div class="canteen-list">
    <p class="activeCanteen">Aktiv: {{ canteenName }}</p>
    <ul>
      <canteen-item
        v-for="canteen in canteenList"
        :key="canteen.id"
        :canteen="canteen"
        :selectedCanteenId="this.selectedCanteenId"
        @update-selected-canteen="updateSelectedCanteen"
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
      selectedCanteenId: "",
      canteenName: "",
      isLoading: false,
    };
  },
  methods: {
    updateSelectedCanteen(canteen) {
      this.fetchData(canteen.id);
      this.selectedCanteenId = canteen.id;
      this.canteenName = canteen.name;
      this.setSelectedCanteen(canteen);
    },
    setSelectedCanteen(canteen) {
      set("selectedCanteen", JSON.parse(JSON.stringify(canteen)));
    },
    async fetchData(canteenId) {
      var status = require('statuses')
      this.isLoading = true;
      let dateApiRequest = format(Date.now(), "yyyy-MM-dd");
      let dateIndexedDB = Date.now();
      let dishesPlan = [];

      for (let i = 0; i <= 7; i++) {
        let dishes = [];

        const response = await fetch(
          `https://openmensa.org/api/v2/canteens/${canteenId}/days/${dateApiRequest}/meals`
        );
        const responseData = await response.json().catch(error => {
           this.isLoading= false;
          console.log(error);
          console.log('error: ' + response.status + ' - '+ status(response.status))
        });

        if (!response.ok) {
          const error = new Error(
            "failed to fetch request!"
          );
          throw error;
        }
        console.log(response)
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
       this.isLoading = false;
    },
  },
  created() {
    get("selectedCanteen").then((data) => {
      if (data != null) {
        this.selectedCanteenId = data.id;
        this.canteenName = data.name;
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
</style>