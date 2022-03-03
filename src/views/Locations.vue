<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <!-- <h1>EATERY</h1> -->
        <div class="capital">Location</div>
        <canteen-selector
        @transmit-selected-city="updateSelectedCity"
        ></canteen-selector>
        <!-- <p>Gebe eine ganze Zahl zwischen 1 und 15 ein!</p> -->
        <!-- <p>Sonderzeichen sind nicht erlaubt.</p> -->
        <p>{{errorMessage}}</p>
        <div class="container_all">
          <canteen-list
            :selectedCity ="this.selectedCity"
            @transmit-error-message ="updateErrorMessage"
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
        selectedCity:"",
        errorMessage: ""
    };
  },
  methods:{
    updateSelectedCity(city){
      this.selectedCity = city;
    },
    updateErrorMessage(message){
      this.errorMessage = message;
    }
  }
};
</script>

<style scoped>
p{
  text-align: left;
  padding-top: 0.5rem;
  padding-left: 1rem;
  color:rgb(170, 0, 0);
  font-size:0.75rem;
}
</style>