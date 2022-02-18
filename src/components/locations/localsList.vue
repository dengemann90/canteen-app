<template>
  <!-- AUSGABE App.vue (gespeicherte Liste "locals")-->
  <ul>
  <local-item
    v-for="canteen in locals"
    :key="canteen.id"
    :canteen="canteen"
  ></local-item>
  <h1>team</h1>
  </ul>
</template>

<script>
import LocalItem from "./LocalItem.vue";
import { get } from "idb-keyval";
import locals from "../../App.vue";

export default {
  components: {
    LocalItem,
  },
  data() {
    return {
      locals: [],
      // localList: [
      //   {
      //     id: 1,
      //     name: "Mensa UniCampus Magdeburg",
      //     city: "Magdeburg",
      //     address: "Pfälzer Str. 1, 39106 Magdeburg",
      //     coordinates: [52.139618827301895, 11.647599935531616],
      //   },
      //   {
      //     id: 2,
      //     name: "Magdeburg Herrenkurg",
      //     city: "Magdeburg",
      //     address: "Breitscheidstr. 2, 39114 Magdeburg",
      //     coordinates: [52.14006658530411, 11.67566657066345],
      //   },
      // ],
    };
  },
  // async build () {
  //   await fetchLocation();
  // },
  methods: {
    getLocals() {
        get("locals")
        this.locals.push(locals)
        console.log('Locals pulled');
        console.log(locals);
    }
  },
  mounted() {
    this.getLocals();
  },
};
</script>