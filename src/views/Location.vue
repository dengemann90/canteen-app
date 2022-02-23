<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <h1>EATERY</h1>
        <span><b>Choose radius:</b> </span>
        <input v-model="dataRadius" placeholder="" />
        <span> km </span>
        <!-- <button v-on:click="fetchLocation(this.dataRadius)">search</button> -->
        <p>
          <button
            v-show="this.dataRadius != 0 && this.radius === true"
            v-on:click="setRadius0"
          >
            delete input
          </button>
        </p>
        <p v-show="this.dataRadius != 0 && this.radius === true">
          This is my selection for you in the radius of
          <b> {{ this.dataRadius }} </b> km:
        </p>
        <div class="container_all">
          <locals-list v-if="this.radius === false"></locals-list>
          <radius-list
            v-else-if="this.radius === true || this.dataRadius > 0"
          ></radius-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { set } from "idb-keyval";
import LocalsList from "../components/locations/LocalsList.vue";
import RadiusList from "../components/locations/RadiusList.vue";
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
      dataRadius: "",
      radius: false,
    };
  },
  components: {
    LocalsList,
    RadiusList,
  },
  methods: {
    async fetchLocation(distance) {
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
      if (distance > 0) {
        this.radius = true;
      } else {
        this.radius = false;
      }
      console.log(this.radius);
      console.log(distance);
    },

    setRadius0() {
      this.dataRadius = "";
      this.fetchLocation(this.dataRadius);
    },
  },
  watch: {
    dataRadius(val) {
      // const dbName = "localsRadius";
      // await deleteDB(dbName);
      // indexedDB.deleteDB("localsRadius");
      this.fetchLocation(val);
    },
  },
};
</script>

<style scoped>
input {
  width: 4%;
}

button {
  margin-right: 1%;
}
</style>

//geolocation pull getGPSDate $ in fetch
// modus
// Chose your Mensa

// erneutes Ausführen des Buttons hat keine Auswirkung 
// Entweder mit Button, dann sind auch mehrstellige KM möglich, dann ohne watch...