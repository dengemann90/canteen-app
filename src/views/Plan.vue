<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <p class="capital">Plan</p>
        <div class="container_all">
          <!-- Hier content -->
          <!-- <dishes-list></dishes-list> -->
          <dish-list-date-selector></dish-list-date-selector>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import DishesList from '../components/plan/DishesList.vue';
import DishListDateSelector from '../components/plan/DishListDateSelector.vue';
export default {
  components:{
    // DishesList,
  DishListDateSelector
  
  }
};
</script>

<style scoped>
/*  */
</style>