<template>
  <div v-if="dateSelected !=''" class="date-selector">
    <i
      class="icon-left fas fa-angle-left"
      :class="{ lock: lockPreviousDayIcon }"
      @click="previousDay"
    ></i>
    <p class="date-text">
      {{ date }}
    </p>
    <i
      class="icon-right fas solid fa-angle-right"
      :class="{ lock: lockNextDayIcon }"
      @click="nextDay"
    ></i>
  </div>
</template>

<script>
import { get } from "idb-keyval";
export default {
  emits: ["set-Date"],
  data() {
    return {
      dateSelected: '',
      loadedDays: [],
      indexDateSelector: 0,
      lockPreviousDayIcon: true,
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
          dateArray[1] - 1, //The month parameter in the Date() constructor is 0-based.
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

          let dateArrayToday = Intl.DateTimeFormat().format(Date.now()).split('.');
          let todayConverted = new Date(
              dateArrayToday[2],
              dateArrayToday[1] - 1, //The month parameter in the Date() constructor is 0-based.
              dateArrayToday[0]
          );
          console.log('todayConverted',todayConverted);
          for (let i in data) {
            let dateArray = data[i].date.split('.');
            let dateConverted = new Date(
              dateArray[2],
              dateArray[1] - 1, //The month parameter in the Date() constructor is 0-based.
              dateArray[0]
            );

            if(dateConverted >= todayConverted){
              arrayDays.push(data[i].date);
             }
          }
          this.loadedDays = arrayDays;
          this.dateSelected = arrayDays[0]
          console.log('loaded days >= today',  this.loadedDays);
          console.log('dateSelected', this.dateSelected);
        })
        .catch(console.warn);
    },
    provideDate() {
      this.$emit("set-Date", this.dateSelected);
    },
  },
  watch: {
    indexDateSelector() {
      if (this.indexDateSelector === 0) {
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

.date-selector {
  display: flex;
  padding-top: 0.5rem;
  padding-bottom: 1.5rem;
}
.date-text {
  min-width: 120px;
  border-radius: 8px;
  border: solid 1.5px rgba(128, 128, 128, 0.2);
}
.icon-left {
  margin: auto;
  margin-right: 1rem;
}

.icon-right {
  margin: auto;
  margin-left: 1rem;
}
</style>