<template>
  <div class="container_all">
    <p>
      <i
        class="fas fa-angle-left"
        :class="{ lock: lockPreviousDayIcon }"
        @click="previousDay"
      ></i>
      {{ dateSelected }}
      <i
        class="fas solid fa-angle-right"
        :class="{ lock: lockNextDayIcon }"
        @click="nextDay"
      ></i>
    </p>
  </div>
  <dish-list :date-Selected="dateSelected"></dish-list>
</template>

<script>
// import addDays from "date-fns/addDays";
// import parse from "date-fns/parse";
import DishList from "./DishesList.vue";
import { get } from "idb-keyval";
export default {
  components: {
    DishList,
  },
  data() {
    return {
      dateSelected: Intl.DateTimeFormat().format(Date.now()),
      loadedDays: [],
      //wird relevant bei gecachten Daten von der openMensa API, da heutiger Tag in geladenen Daten nicht Index 0 sein muss! -> wenn keine neuen Daten geladen wurden
      indexCurrentDay: null,
      indexDateSelector: null,
      lockPreviousDayIcon: false,
      lockNextDayIcon: false,
    };
  },
  methods: {
    nextDay() {
      if (!this.lockNextDayIcon) {
        this.indexDateSelector++;

        this.dateSelected = this.loadedDays[this.indexDateSelector];
        console.log(
          "nächster Tag geklickt - dateSelected: " + this.dateSelected
        );
        console.log("IndexDateSelector Index: " + this.indexDateSelector);
      }
    },
    previousDay() {
      if (!this.lockPreviousDayIcon) {
        this.indexDateSelector--;

        this.dateSelected = this.loadedDays[this.indexDateSelector];
        console.log(
          "vorheriger Tag geklickt - dateSelected: " + this.dateSelected
        );

        console.log("IndexDateSelector Index: " + this.indexDateSelector);
      }
    },
    getLoadedDays() {
      get("dishes")
        .then((data) => {
          let arrayDays = [];
          for (let entry in data) {
            arrayDays.push(data[entry].date);
          }
          this.loadedDays = arrayDays;

          let index = this.loadedDays.indexOf(this.dateSelected);
          if (index === -1) {
            console.log("Tag konnte nicht geladen werden");
          } else {
            this.indexCurrentDay = index;
            this.indexDateSelector = this.indexCurrentDay;
            console.log(
              "Tag befindet sich im loaded Days Array im Index: " +
                this.indexCurrentDay
            );
            console.log("IndexDateSelector Index: " + this.indexDateSelector);
          }
          console.log("geladene Tage aus indexedDB: " + arrayDays);
        })
        .catch(console.warn);
    },
  },
  watch: {
    indexDateSelector() {
      if (this.indexDateSelector === this.indexCurrentDay) {
        this.lockPreviousDayIcon = true;
      } else if (this.lockPreviousDayIcon) {
        this.lockPreviousDayIcon = false;
      }

      if (this.indexDateSelector === this.loadedDays.length - 1) {
        this.lockNextDayIcon = true;
      } else if (this.lockNextDayIcon) {
        this.lockNextDayIcon = false;
      }
    },
  },
  mounted() {
    this.getLoadedDays();
    console.log("selected Day: " + this.dateSelected);
  },
};
</script>

<style scoped>
.fas.fa-angle-left {
  color: rgb(212, 212, 212);
}
.fas.fa-angle-left:hover {
  color: rgb(66, 66, 66);
}
.fas.fa-angle-right {
  color: rgb(212, 212, 212);
}
.fas.fa-angle-right:hover {
  color: rgb(66, 66, 66);
}

.fas.fa-angle-left.lock {
  cursor: not-allowed;
}

.fas.fa-angle-right.lock {
  cursor: not-allowed;
}
</style>