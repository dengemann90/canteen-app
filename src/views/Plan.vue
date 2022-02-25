<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <p class="capital">Plan</p>
        <dish-list-date-selector @setDate="setDate"></dish-list-date-selector>
        <div class="filter-active-badge">
          <p class="filter-active-text">Filter aktiv </p>
          <i class="fas solid fa-info"></i>
        </div>
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

.filter-active-badge {
  margin-left: 2px;
  border-radius: 2px;
  max-width: 50px;
  border: solid 1px rgba(138, 169, 105, 0.3);
  background-color: rgba(138, 169, 105, 0.25);
  display: flex;
}

.filter-active-text {
  margin: auto;
  color: rgba(0, 0, 0, 0.5);
  font-size: 8px;
}

.fas.solid.fa-info{
 margin:auto;
 margin-left:-1px;
 font-size: 5px;
 color: rgba(0, 0, 0, 0.5);
}

</style>