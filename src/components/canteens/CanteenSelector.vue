<template>
  <base-dialog
    v-if="dialogCanteensNotSupported"
    @close="dialogCanteensNotSupported = false"
    :open="true"
  >
    <p>
      Die Mensen in Berlin und Brandenburg werden leider nicht mehr von der OpenMensa API unterstützt!
    </p>

    <button class="button-ok" @click="dialogCanteensNotSupported = false">
      ok
    </button>

  </base-dialog>
  <base-error-dialog
    v-if="dialogIsVisible"
    @close="closeDialog"
    :open="dialogIsVisible"
    :type="this.dialogErrorType"
    :message="this.dialogErrorMessage"
  >
    <button class="button-ok" @click="closeDialog">ok</button>
  </base-error-dialog>
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

  <div v-if="geoLocationSupported" class="input-radius-field">
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
  <p class="p-red" v-show="errorMessage">{{ errorMessage }}</p>
</template>

<script>
import { get } from "idb-keyval";
export default {
  emits: ["transmit-canteen-list"],
  data() {
    return {
      selectedCity: "",
      selectedRadius: "",
      latitude: "",
      longitude: "",
      position: null,
      apiData: null,
      errorMessage: null,
      dialogIsVisible: false,
      dialogErrorType: "",
      dialogErrorMessage: "",
      canteenList: [],
      canteenListDB: [],
      dialogCanteensNotSupported: true
    };
  },
  computed: {
    geoLocationSupported() {
      if ("geolocation" in navigator) {
        return true;
      }
      return false;
    },
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
    position() {
      if (this.position.coords.accuracy <= 200) {
        this.fetchDataGeoLocation();
      } else {
        const dialogContent = {
          message: "GPS Daten sind ungenau! Versuche es später noch ein mal.",
          type: "gps",
        };
        this.openDialog(dialogContent);
      }
    },
    apiData() {
      this.prepareFetchedData();
    },
  },
  methods: {
    filterCity() {
      //https://stackoverflow.com/questions/15472764/regular-expression-to-allow-spaces-between-words
      const regex1 = new RegExp("^[A-Za-zäüöÄÜÖ_ *]+$");
      const regex2 = new RegExp("[\\[\\]\\(\\)]");

      const inputValid = regex1.test(this.selectedCity);
      const containsBrackets = regex2.test(this.selectedCity);
      if (inputValid && !containsBrackets) {
        let filteredCanteenList = this.canteenListDB.filter((canteen) =>
          canteen.city.toLowerCase().match(this.selectedCity.toLowerCase())
        );
        this.canteenList = filteredCanteenList;
        if (this.errorMessage != null) {
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
      return inputValid && rangeValid;
    },
    getGeoLocation() {
      let userOnline = window.navigator.onLine;

      if (!userOnline) {
        const dialogContent = {
          message: "Du bist offline! Gehe online, um diese Funktion zu nutzen.",
          type: "network",
        };
        this.openDialog(dialogContent);
        return;
      }

      if (this.inputRadiusValid()) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.position = position;
          },
          (error) => {
            console.log("error: ", error);

            let dialogContent;

            if (error.code == 1) {
              dialogContent = {
                message:
                  "Standort nicht freigegeben! Gebe den Standort frei, um diese Funktion zu nutzen.",
                type: "gps",
              };
            }

            if (error.code == 2) {
              dialogContent = {
                message:
                  "Unvollständige Daten erhalten! Versuche es später noch ein mal.",
                type: "server",
              };
            }

            if (error.code == 3) {
              dialogContent = {
                message:
                  "Zeitüberschreitung der Anfrage! Versuche es später noch ein mal oder prüfe deine Internetverbindung.",
                type: "server",
              };
            }
            this.openDialog(dialogContent);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        const message = "Gebe eine ganze Zahl zwischen 1 und 15 ein!";
        this.setErrorMessage(message);
      }
    },
    async fetchDataGeoLocation() {
      try {
        const responseFetch = await fetch(
          `https://openmensa.org/api/v2/canteens?near[lat]=${this.latitude}&near[lng]=${this.longitude}&near[dist]=${this.selectedRadius}`
        );
        this.apiData = await responseFetch.json();
      } catch (error) {
        console.log("error fetch: ", error);
        const dialogContent = {
          message:
            "Daten konnten nicht geladen werden. Versuche es später noch ein mal.",
          type: "server",
        };
        this.openDialog(dialogContent);
      }
    },

    prepareFetchedData() {
      let canteens = [];
      let apiData = this.apiData;

      for (const key in apiData) {
        const canteen = {
          id: apiData[key].id,
          name: apiData[key].name,
          city: apiData[key].city,
          address: apiData[key].address,
          coordinates: apiData[key].coordinates,
        };
        canteens.push(canteen);
      }
      if (canteens.length > 0) {
        this.canteenList = canteens;
      } else {
        this.canteenList = [];
        const message =
          "Keine Mensa im Umkreis von " + this.selectedRadius + " km gefunden!";
        this.setErrorMessage(message);
      }
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
    openDialog(dialogContent) {
      this.dialogErrorMessage = dialogContent.message;
      this.dialogErrorType = dialogContent.type;
      this.dialogIsVisible = true;
    },
    closeDialog() {
      this.selectedRadius = "";
      this.dialogErrorMessage = "";
      this.dialogErrorType = "";
      this.dialogIsVisible = false;
    },
  },
  created() {
    get("locationAllCanteens").then((data) => {
      if (data != null) {
        this.canteenListDB = data;
      }
    });
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

.p-red {
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
  background:transparent;
}

.fas.solid.fa-compass:active {
  color: rgba(0, 0, 0, 0.5);
}

input:focus {
  /* hide blinking cursor*/
  color: transparent;
  text-shadow: 0 0 0 #000000;
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

button {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  cursor: pointer;
}

.button-ok {
  border: 1px solid #a1a1a180;
  background-color: #a1a1a180;
  color: white;
}

.button-ok:hover,
.button-ok:active {
  background-color: #a1a1a1;
  border-color: #a1a1a1;
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