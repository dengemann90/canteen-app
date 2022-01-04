<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <p class="capital">Plan</p>
        <div class="container_all">
          <!-- Hier content -->
          <dishes-list></dishes-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DishesList from '../components/plan/DishesList.vue';
export default {
  components:{DishesList}
};
</script>

<style scoped>
/*  */
</style>