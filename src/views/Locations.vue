<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <!-- <h1>EATERY</h1> -->
        <p class="capital">Location</p>
        <canteen-selector
        @transmit-selected-city="updateSelectedCity"
        ></canteen-selector>
        <div class="container_all">
          <canteen-list
            :selectedCity ="this.selectedCity"
          ></canteen-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CanteenSelector from "../components/canteens/CanteenSelector.vue";
import CanteenList from "../components/canteens/CanteenList.vue";
export default {
  components: {
    CanteenSelector,
    CanteenList,
  },
  data() {
    return {
        selectedCity:""
    };
  },
  methods:{
    updateSelectedCity(city){
      this.selectedCity = city;
    }
  }
};
</script>

<style scoped>
/*  */
</style>