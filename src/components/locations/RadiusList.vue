<template>
  <ul>
    <radius-item
      v-for="canteenRadius in localsRadius"
      :key="canteenRadius.id"
      :canteenRadius="canteenRadius"
    ></radius-item>
  </ul>
</template>

<script>
import RadiusItem from "./RadiusItem.vue";
import { get } from "idb-keyval";

export default {
  components: {
    RadiusItem,
  },
  data() {
    return {
      localsRadius: [],
    };
  },
  methods: {
    getLocalsRadius() {
      get("localsRadius").then((data) => {
        this.localsRadius = data;
      });
      console.log("LocalsRadius pulled");
    },
  },
  mounted() {
    this.getLocalsRadius();
  },
};
</script>