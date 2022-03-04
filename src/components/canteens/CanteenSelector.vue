<template>
  <div class="input-city-field">
    <input
      class="input-city"
      :class="validationInputCity"
      id="city"
      name="city"
      type="text"
      placeholder="Stadt eingeben"
      autocomplete="off"
      v-model="selectedCity"
      @blur="removeErrorMessage"
    />
  </div>

  <div class="input-radius-field">
    <input
      class="input-radius"
      :class="validationInputRadius"
      id="radius"
      name="radius"
      type="number"
      placeholder="Radius (km)"
      autocomplete="off"
      v-model="selectedRadius"
      @focus="removeErrorMessage"
    />
    <i
      class="fas solid fa-compass fa-lg"
      :class="validationInputRadiusIcon"
      @click="getGeoLocation"
    ></i>
  </div>
  <p v-show="errorMessage">{{ errorMessage }}</p>
</template>

<script>
export default {
  emits: ["transmit-canteen-list"],
  data() {
    return {
      selectedCity: "",
      selectedRadius: "",
      latitude: "",
      longitude: "",
      errorMessage: null,
      canteenList: [],
      canteenListDB: [
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
        {
          id: 3,
          name: "Mensa Stendal",
          city: "Stendal",
          address: "Osterburger Str. 25, 39567 Stendal",
          coordinates: [52.615015758022146, 11.849302053451538],
        },
        {
          id: 4,
          name: "Mensa Wernigerode",
          city: "Wernigerode",
          address: "Friedrichstraße 57 – 59,  38855 Wernigerode",
          coordinates: [51.8257591770436, 10.760003328323364],
        },
        {
          id: 5,
          name: "DomCafete Halberstadt",
          city: "Halberstadt",
          address: "Am Domplatz 16,  38820 Halberstadt",
          coordinates: [51.89534754646133, 11.047461032867432],
        },
        {
          id: 6,
          name: "Hannover Hauptmensa",
          city: "Hannover",
          address: "Callinstraße 23, 30167 Hannover",
          coordinates: [52.38620852444954, 9.714059829711914],
        },
        {
          id: 7,
          name: "Hannover, Contine",
          city: "Hannover",
          address: "Königsworther Platz 1, 30167 Hannover",
          coordinates: [52.3791768, 9.723882099999999],
        },
        {
          id: 8,
          name: "Mensa PZH",
          city: "Garbsen",
          address: "An der Universität 2, 30823 Garbsen",
          coordinates: [52.42584657412015, 9.618701934814453],
        },
        {
          id: 9,
          name: "Mensa Caballus",
          city: "Hannover",
          address: "Bischofsholer Damm 15, 30173 Hannover",
          coordinates: [52.36893, 9.76545],
        },
        {
          id: 10,
          name: "Mensa TiHo-Tower",
          city: "Hannover-test",
          address: "Bünteweg 2, 30559 Hannover",
          coordinates: [52.35441215028723, 9.797573089599608],
        },
        {
          id: 950,
          name: "Diekirch, NOSL Restaurant (Nordstadlycée)",
          city: "Diekirch (Luxembourg)",
          address: "1-7, rue Sauerwiss, L-9278 Diekirch (Luxembourg)",
          coordinates: [49.8642358, 6.1612383],
        },
        {
          id: 266,
          name: "Mensa Regensburger Straße",
          city: "Nürnberg",
          address: "Regensburger Str. 160, 90478 Nürnberg, Germany",
          coordinates: [49.43843605, 11.1130078522348],
        },
        {
          id: 381,
          name: "Casino Cafeteria",
          city: "Frankfurt am Main",
          address:
            "Theodor-W.-Adorno-Platz 2a, 60323 Frankfurt am Main, Germany",
          coordinates: [50.1268884, 8.6669763],
        },
        {
          id: 738,
          name: "Mensa Gymnasium Münchenstein",
          city: "Münchenstein",
          address: "Gymnasium Münchenstein\nBaselstrasse 33\n4142 Münchenstein",
          coordinates: [47.527049, 7.616954],
        },
      ],
    };
  },
  computed: {
    validationInputCity() {
      if (this.selectedRadius != "") {
        return { "disabled-input": true };
      }
      if (this.errorMessage != null) {
        return { "error-input-city": true };
      }
      return null;
    },
    validationInputRadius() {
      if (this.selectedCity != "") {
        return { "disabled-input": true };
      }
      if (this.errorMessage != null) {
        console.log("error Message", this.errorMessage);
        return { "error-input-radius": true };
      }
      return null;
    },
    validationInputRadiusIcon() {
      if (this.selectedCity != "") {
        return { "disabled-input": true };
      }
      return null;
    },
  },
  watch: {
    selectedCity() {
      this.filterCity();
    },
    canteenList() {
      this.transmitCanteenList();
    },
  },
  methods: {

    filterCity() {
      //https://stackoverflow.com/questions/15472764/regular-expression-to-allow-spaces-between-words
      const regex1 = new RegExp("^[A-Za-zäüöÄÜÖ_ *]+$");
      const regex2 = new RegExp("[\\[\\]\\(\\)]");

      const inputValid = regex1.test(this.selectedCity);
      const containsBrackets = regex2.test(this.selectedCity);
      console.log("inputValid", inputValid);
      if (inputValid && !containsBrackets) {
        let filteredCanteenList = this.canteenListDB.filter((canteen) =>
          canteen.city.toLowerCase().match(this.selectedCity.toLowerCase())
        );
        this.canteenList = filteredCanteenList;
          if(this.errorMessage != null){
            this.errorMessage = null;
          }
      } else {
        if (this.canteenList.length > 0) {
          this.canteenList = [];
        }
        const message = "Sonderzeichen und Zahlen sind nicht erlaubt!";
        if (this.selectedCity != "") {
          this.setErrorMessage(message);
        } else {
          this.errorMessage = null;
        }
      }
    },
    inputRadiusValid() {
      //https://stackoverflow.com/questions/15223774/regex-for-whole-numbers-only-and-not-a-blank-string/15223814
      const regex = new RegExp(/^-?\d+$/);
      const inputValid = regex.test(this.selectedRadius);

      let rangeValid;

      if (
        this.selectedRadius != "" &&
        this.selectedRadius > 0 &&
        this.selectedRadius <= 15
      ) {
        rangeValid = true;
      } else {
        rangeValid = false;
      }
      console.log("input valid:", inputValid && rangeValid);
      return inputValid && rangeValid;
    },
    getGeoLocation() {
      if (this.inputRadiusValid()) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude;
            console.log("latitude : ", this.latitude);
            this.longitude = position.coords.longitude;
            console.log("longitude : ", this.longitude);
            console.log("accuracy : ", position.coords.accuracy);
            console.log("selected radius: ", this.selectedRadius);
          },
          (error) => {
            console.log("error: ", error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            age: 0,
          }
        );
        this.fetchDataGeoLocation();
      } else {
        const message = "Gebe eine ganze Zahl zwischen 1 und 15 ein!";
        this.setErrorMessage(message);
      }
    },
    async fetchDataGeoLocation() {
      // let localsList = [];
      let locals = [];

      const responseLocal = await fetch(
        `https://openmensa.org/api/v2/canteens?near[lat]=${this.latitude}&near[lng]=${this.longitude}&near[dist]=${this.selectedRadius}`
      );

      const responseDataLocal = await responseLocal.json();

      for (const key in responseDataLocal) {
        const local = {
          id: responseDataLocal[key].id,
          name: responseDataLocal[key].name,
          city: responseDataLocal[key].city,
          address: responseDataLocal[key].address,
          coordinates: responseDataLocal[key].coordinates,
        };
        locals.push(local);
      }

      console.log("output -fetch : ", locals);
    },

    transmitCanteenList() {
      this.$emit("transmit-canteen-list", this.canteenList);
    },
    setErrorMessage(message) {
      this.errorMessage = message;
    },
    removeErrorMessage() {
      this.errorMessage = null;
    },
  },
};
</script>

<style scoped>
.input-city-field {
  display: flex;
}

.input-city {
  display: flex;
  margin-top: 2rem;
  /* margin-left: 1rem; */
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
  /* margin-left: 1rem; */
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

.error-input-radius {
  border: solid 1.5px rgba(170, 0, 0, 0.5);
}
.error-input-city:focus {
  border: solid 1.5px rgba(170, 0, 0, 0.5);
}

p {
  text-align: left;
  padding-top: 0.5rem;
  padding-left: 1rem;
  color: rgb(170, 0, 0);
  font-size: 0.75rem;
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