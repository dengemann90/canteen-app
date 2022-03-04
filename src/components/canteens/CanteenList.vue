<template>
  <div class="canteen-list">
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
  props:['canteenList'],
  // props: ["selectedCity"],
  // emits: ["transmit-error-message"],
  data() {
    return {
      selectedCanteenId: "",
    };
  },
  methods: {
    updateSelectedCanteen(canteenId) {
      this.selectedCanteenId = canteenId;
    }
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

.canteen-list {
  padding-top: 2rem;
}
</style>