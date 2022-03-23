<template>
  <div class="main">
    <div class="appframe" @click="closeFilterActiveCard">
      <div class="capital">
        Speiseplan
        <img class="logo-img" src="../assets/LogoTransparent.png" />
      </div>
      <div class="container">
        <div class="content">
          <dish-list-date-selector @setDate="setDate"></dish-list-date-selector>
        <p class="activeCanteen">{{canteenName}}</p>
          <div
            v-if="filterActive"
            class="filter-active-badge"
            :class="{ active: showFilterCard }"
            @click.stop="showFilterCard = !showFilterCard"
          >
            <p class="filter-active-text">Filter aktiv</p>
            <i class="fas solid fa-info"></i>
          </div>
          <transition name="fade-in">
            <filter-active-card v-if="showFilterCard"></filter-active-card>
          </transition>
          <div class="container_all">
            <!-- Hier content -->
            <dishes-list :date-Selected="dateSelected"></dishes-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "idb-keyval";
import DishListDateSelector from "../components/nav/DishListDateSelector.vue";
import DishesList from "../components/plan/DishList.vue";
import FilterActiveCard from "../components/plan/FilterActiveCard.vue";
export default {
  components: {
    DishListDateSelector,
    DishesList,
    FilterActiveCard,
  },
  data() {
    return {
      dateSelected: Intl.DateTimeFormat().format(Date.now()),
      showFilterCard: false,
      canteenName:''
    };
  },
  computed: {
    filterActive() {
      if (this.$store.getters.getExcludedAllergensAdditives.length > 0) {
        return true;
      }
      return false;
    },   
  },
  methods: {
    setDate(date) {
      this.dateSelected = date;
    },
    closeFilterActiveCard() {
      if (this.showFilterCard) {
        this.showFilterCard = false;
      }
    },
    getCanteenName(){
      get("selectedCanteen").then(data => {
        this.canteenName = data.name;
      }).catch(console.warn)
    }
  },
  created(){
    this.getCanteenName();
  }
};
</script>

<style scoped>

.activeCanteen {
  text-align: left;
  margin-left: 2px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.85);
}

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
  color: rgba(0, 0, 0, 0.7);
  font-size: 8px;
}

.fas.solid.fa-info {
  margin: auto;
  margin-left: -1px;
  font-size: 5px;
  color: rgba(0, 0, 0, 0.5);
}

.filter-active-badge.active {
  border: solid 1px rgba(138, 169, 105);
}

.filter-active-badge:hover {
  border: solid 1px rgba(138, 169, 105, 0.8);
  background-color: rgba(138, 169, 105, 0.75);
}

/* fade in - fade out filterActiveCard */

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-in-enter-to,
.fade-in-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>