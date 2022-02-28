<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <!-- <h1>EATERY</h1> -->
        <p class="capital">Location</p>
        <div>
          <input
            class="input-city"
            :class="{ 'disabled-input': disableInputCity }"
            id="city"
            name="city"
            type="text"
            placeholder="Stadt eingeben"
            autocomplete="off"
            v-model="selectedCity"
          />
        </div>

        <div>
          <i class="fas solid fa-crosshairs" v-on:click="getLocation()"></i>
        </div>

        <div class="input-radius-field">
          <input
            class="input-radius"
            :class="{ 'disabled-input': disableInputRadius }"
            id="radius"
            name="radius"
            type="number"
            placeholder="Radius (km)"
            autocomplete="off"
            v-model="dataRadius"
          />
          <i
            class="fas solid fa-compass fa-lg"
            :class="{ 'disabled-icon': disableInputRadius }"
            v-on:click="fetchLocation(this.dataRadius)"
          ></i>
        </div>

        <!-- <p>
          <button
            v-show="this.dataRadius != 0 && this.radius === true"
            v-on:click="setRadius0"
          >
            delete input
          </button>
        </p> -->
        <!-- <p v-show="this.dataRadius != 0 && this.radius === true">
          This {{ this.countLocalsRadius }} is my selection for you in the
          radius of <b> {{ this.dataRadius }} </b> km:
        </p> -->
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
      selectedCity: "",
      radius: false,
    };
  },
  components: {
    LocalsList,
    RadiusList,
  },
  computed: {
    disableInputCity() {
      if (this.dataRadius != "") {
        return true;
      }
      return false;
    },
    disableInputRadius() {
      if (this.selectedCity != "") {
        return true;
      }
      return false;
    },
  },
  methods: {
    async fetchLocation(distance) {
      let localsRadius = [];

      // getLocation();

      console.log(this.longitude);
      console.log(this.latitude);

      const responseLocal = await fetch(
        `https://openmensa.org/api/v2/canteens?near[lat]=${this.latitude}&near[lng]=${this.longititude}&near[dist]=${this.dataRadius}`
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

      // numbers of found locals
      const countLocalsRadius = localsRadius.length;
      return {
        countLocalsRadius,
      };
    },

    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            return {
              longitude,
              latitude,
            };
          },
          (error) => {
            console.log(error.message);
          }
        );
      } else {
        console.log("Your browser dows not support geolocation API");
      }
      return {
        longitude: this.longitude,
        latitude: this.latitude,
      };
    },

    setRadius0() {
      this.dataRadius = "";
      this.fetchLocation(this.dataRadius);
    },
  },
  // watch: {
  //   dataRadius(val) {
  //     // const dbName = "localsRadius";
  //     // await deleteDB(dbName);
  //     // indexedDB.deleteDB("localsRadius");
  //     this.fetchLocation(val);
  //   },
  // },
};
</script>

<style scoped>
.input-city {
  display: flex;
  margin-top: 2rem;
  margin-left: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  border-radius: 25px;
  border: solid 1.5px rgba(128, 128, 128, 0.2);
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 15px;
}

.input-radius-field {
  display: flex;
}
.input-radius {
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  border-radius: 25px;
  border: solid 1.5px rgba(128, 128, 128, 0.2);
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 15px;
  width: 125px;
}

.fas.solid.fa-compass {
  margin-top: 1.7rem;
  margin-left: -2.5rem;
  color: rgba(0, 0, 0, 0.2);
}
.fas.solid.fa-compass:active {
  color: rgba(0, 0, 0, 0.5);
}

input:focus {
  outline: none !important;
  border: solid 1.5px rgba(128, 128, 128, 0.5);
}

.disabled-input {
  background-color: rgba(0, 0, 0, 0.05);
  pointer-events: none;
}

.disabled-icon {
  pointer-events: none;
}

/* https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
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