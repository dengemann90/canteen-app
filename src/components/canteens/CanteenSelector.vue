<template>
        <div class="input-city-field">
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
          <!-- <i class="fas solid fa-location-arrow"></i> -->
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
            v-model="selectedRadius"
          />
          <i
            class="fas solid fa-compass fa-lg"
            :class="{ 'disabled-icon': disableInputRadius }"
          ></i>
        </div>
</template>

<script>
export default {
    emits:['transmit-selected-city'],
  data() {
    return {
      selectedCity: "",
      selectedRadius: "",
    };
  },
  computed: {
    disableInputCity() {
      if (this.selectedRadius != "") {
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
  watch:{
      selectedCity(){
          this.transmitSelectedCity();
      }
  },
  methods:{
    transmitSelectedCity(){
        this.$emit('transmit-selected-city', this.selectedCity)
    }   
  }
};
</script>

<style scoped>

.input-city-field{
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