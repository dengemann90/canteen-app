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

    <!-- <i class="fas solid fa-location-arrow"></i> -->
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
</template>

<script>
export default {
  props: ["errorMessage"],
  emits: [
    "transmit-selected-city",
    "transmit-error-message",
    "remove-error-message",
  ],
  data() {
    return {
      selectedCity: "",
      selectedRadius: "",
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
      this.transmitSelectedCity();
    },
  },
  methods: {
    transmitSelectedCity() {
      this.$emit("transmit-selected-city", this.selectedCity);
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
            console.log("position: ", position);
          },
          (error) => {
            console.log("error: ", error);
          },
          {
            timeout: 10000,
          }
        );
      } else {
        this.transmitErrorMessage();
      }
    },
    transmitErrorMessage() {
      const message = "Gebe eine ganze Zahl zwischen 1 und 15 ein!";
      this.$emit("transmit-error-message", message);
    },
    removeErrorMessage() {
      this.$emit("remove-error-message");
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
/* 
.fas.solid.fa-location-arrow {
  margin-top: 2.5rem;
  transform:rotate(45deg); 
  margin-left: -1.8rem;
  color: rgba(0, 0, 0, 0.2);
} */

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