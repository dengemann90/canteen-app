<template>
  <div class="canteen-list">
    <p>Ausgewählte: {{ canteenName }}</p>
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
    },
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