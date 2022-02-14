<template>
  <!-- AUSGABE App.vue (gespeicherte Liste "locals")-->
  <ul>
  <local-item
    v-for="canteen in localList"
    :key="canteen.id"
    :canteen="canteen"
  ></local-item>
  </ul>
</template>

<script>
import LocalItem from "./LocalItem.vue";

export default {
  components: {
    LocalItem,
  },
  data() {
    return {
      localList: [
        {
          id: 1,
          name: "Mensa UniCampus Magdeburg",
          city: "Magdeburg",
          address: "Pfälzer Str. 1, 39106 Magdeburg",
          coordinates: [52.139618827301895, 11.647599935531616],
        },
        {
          id: 2,
          name: "Magdeburg Herrenkurg",
          city: "Magdeburg",
          address: "Breitscheidstr. 2, 39114 Magdeburg",
          coordinates: [52.14006658530411, 11.67566657066345],
        },
      ],
    };
  },
};
</script>
