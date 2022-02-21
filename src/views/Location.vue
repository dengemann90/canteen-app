<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <h1>EATERY</h1>
        <span><b>Choose radius:</b> </span>
        <input v-model="dataRadius" placeholder="" />
        <span> km</span>
        <!-- <radius></radius> -->
        <div class="container_all">
          <!-- Hier content AUSGABE AUS localsList.vue-->
          <locals-list></locals-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LocalsList from "../components/locations/LocalsList.vue";
// import Radius from "../components/locations/Radius.vue";
export default {
  // props: dataRadius,
  data() {
    return {
      dataRadius: this.dataRadius,
    };
  },
  components: {
    LocalsList,
    // radius,
  },
  watch: {},
};
</script>

<style scoped>
input {
  width: 4%;
}
</style>

//geolocation pull
// Chose your Mensa