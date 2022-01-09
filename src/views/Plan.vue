<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <p class="capital">Plan</p>
        <dish-list-date-selector @setDate="setDate"></dish-list-date-selector>
        <div class="container_all">
          <!-- Hier content -->
          <dishes-list :date-Selected="dateSelected"></dishes-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DishListDateSelector from "../components/nav/DishListDateSelector.vue";
import DishesList from "../components/plan/DishList.vue";
export default {
  components: {
    DishListDateSelector,
    DishesList,
  },
  data() {
    return {
      dateSelected: Intl.DateTimeFormat().format(Date.now()),
    };
  },
  methods: {
    setDate(date) {
      this.dateSelected = date;
    },
  },
};
</script>

<style scoped>
/*  */
</style>