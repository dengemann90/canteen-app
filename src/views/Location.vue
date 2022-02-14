<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <p class="capital">Location</p>
        <div class="container_all">
        <h1>test</h1>
          <!-- Hier content AUSGABE AUS localsList.vue-->
          <locals-list></locals-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LocalsList from '../components/locations/LocalsList.vue';
export default {
  components:{
    LocalsList
  }

};
</script>

<style scoped>
/*  */
</style>