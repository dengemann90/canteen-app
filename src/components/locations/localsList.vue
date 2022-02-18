<template>
  <!-- AUSGABE App.vue (gespeicherte Liste "locals")-->
  <ul>
    <local-item
      v-for="canteen in locals"
      :key="canteen.id"
      :canteen="canteen"
    ></local-item>
  </ul>
</template>

<script>
import LocalItem from "./LocalItem.vue";
import { get } from "idb-keyval";

export default {
  components: {
    LocalItem,
  },
  data() {
    return {
      locals: [],
    };
  },
  methods: {
    getLocals() {
      get("locals").then((data) => {
        this.locals = data;
      });
      console.log("Locals pulled");
    },
  },
  mounted() {
    this.getLocals();
  },
};
</script>