<template>
  <div class="canteen-list">
    <p>Ausgewählt: {{ canteenName }}</p>
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
export default {
  components: {
    CanteenItem,
  },
  props: ["canteenList"],
  data() {
    return {
      selectedCanteenId: "",
      canteenName: "",
    };
  },
  methods: {
    updateSelectedCanteen(canteen) {
      this.selectedCanteenId = canteen.id;
      this.canteenName = canteen.name;
      this.setSelectedCanteen(canteen);
    },
    setSelectedCanteen(canteen) {
      set("selectedCanteen", JSON.parse(JSON.stringify(canteen)));
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

p {
  text-align: left;
  padding-left: 1rem;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
}
.canteen-list {
  padding-top: 2rem;
}
</style>