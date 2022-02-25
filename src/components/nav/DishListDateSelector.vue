<template>
  <div>
    <p>
      <i
        class="fas fa-angle-left"
        :class="{ lock: lockPreviousDayIcon }"
        @click="previousDay"
      ></i>
      {{ date }}
      <i
        class="fas solid fa-angle-right"
        :class="{ lock: lockNextDayIcon }"
        @click="nextDay"
      ></i>
    </p>
  </div>
</template>

<script>
import { get } from "idb-keyval";
//import format from "date-fns/format";
export default {
  emits: ["set-Date"],
  data() {
    return {
      dateSelected: Intl.DateTimeFormat().format(Date.now()),
      loadedDays: [],
      //becomes relevant for cached data from the openMensa API, since today's tag in loaded data does not have to be index 0! -> if new data wasn't loaded
      indexCurrentDay: null,
      indexDateSelector: null,
      lockPreviousDayIcon: false,
      lockNextDayIcon: false,
    };
  },
  computed: {
    date() {
      const today = Intl.DateTimeFormat().format(Date.now());
      if (this.dateSelected === today) {
        return "Heute";
      } else {
        const dateArray = this.dateSelected.split(".");
        const weekday = new Date(
          dateArray[2],
          dateArray[1]-1,//The month parameter in the Date() constructor is 0-based.
          dateArray[0]
        ).toLocaleDateString("de-DE", { weekday: "short" });

        return weekday + ", " + this.dateSelected;
      }
    },
  },
  methods: {
    nextDay() {
      if (!this.lockNextDayIcon) {
        this.indexDateSelector++;

        this.dateSelected = this.loadedDays[this.indexDateSelector];
        console.log("next day clicked - dateSelected: " + this.dateSelected);
        console.log("IndexDateSelector Index: " + this.indexDateSelector);
      }
    },
    previousDay() {
      if (!this.lockPreviousDayIcon) {
        this.indexDateSelector--;

        this.dateSelected = this.loadedDays[this.indexDateSelector];
        console.log(
          "previous day clicked - dateSelected: " + this.dateSelected
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
            console.log("Day could not be loaded!");
          } else {
            this.indexCurrentDay = index;
            this.indexDateSelector = this.indexCurrentDay;
            console.log("Day in loadedDays at Index: " + this.indexCurrentDay);
            console.log("IndexDateSelector Index: " + this.indexDateSelector);
          }
          console.log("loaded days from indexedDB: " + arrayDays);
        })
        .catch(console.warn);
    },
    provideDate() {
      this.$emit("set-Date", this.dateSelected);
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
    dateSelected() {
      this.provideDate();
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