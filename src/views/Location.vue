<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <h1>EATERY</h1>
        <span><b>Choose radius:</b> </span>
        <input v-model="dataRadius" placeholder="" />
        <span> km</span>
        <button v-on:click="fetchLocation"></button>
        <!-- <radius></radius> -->
        <div class="container_all">
          <!-- Hier content AUSGABE AUS localsList.vue-->
          <locals-list></locals-list>
          <radius-list></radius-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { set } from "idb-keyval";
import LocalsList from "../components/locations/LocalsList.vue";
import { set } from "idb-keyval";
export default {
  // props: dataRadius,
  // data() {
  //   return {
  //     dataRadius: this.dataRadius,
  //   };
  // },
  data() {
    return {
      geolocAggree: false,
      dataRadius: "5",
    };
  },
  components: {
    LocalsList,
    // Radius,
  },
  methods: {
    async fetchLocation() {
      let localsRadius = [];

      const responseLocal = await fetch(
        `https://openmensa.org/api/v2/canteens?near[lat]=52.393535&near[lng]=13.127814&near[dist]=${this.dataRadius}`
      );

      const responseDataLocal = await responseLocal.json();

      for (const key in responseDataLocal) {
        const localRadius = {
          id: responseDataLocal[key].id,
          name: responseDataLocal[key].name,
          city: responseDataLocal[key].city,
          address: responseDataLocal[key].address,
          coordinates: responseDataLocal[key].coordinates,
        };
        localsRadius.push(localRadius);
        console.log("localsRadius Json!");
      }
      console.log(responseDataLocal);
      set("localsRadius", JSON.parse(JSON.stringify(localsRadius)));
    },
  },
};
</script>

<style scoped>
input {
  width: 4%;
}
</style>

//geolocation pull getGPSDate $ in fetch
// modus
// Chose your Mensa