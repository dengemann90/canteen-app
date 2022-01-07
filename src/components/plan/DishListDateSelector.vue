<template>
   <div class="container_all">
    <p><i class="fas fa-angle-left" @click="previousDay" ></i>  {{date}} <i class="fas solid fa-angle-right" @click="nextDay" ></i> </p>
    </div>
    <dish-list 
        :date = "date"
    ></dish-list>
</template>

<script>
import addDays from "date-fns/addDays";
import parse from "date-fns/parse";
import DishList from "./DishesList.vue"
export default {
    components: {
        DishList
    },
  data() {
    return {
      date: Intl.DateTimeFormat().format(Date.now()),
    };
  },
  methods: {
    nextDay() {
      let parsedDate = parse(this.date, "dd.MM.yyyy", Date.now());
      this.date = Intl.DateTimeFormat().format(addDays(parsedDate, 1));
    },
    previousDay() {
      let parsedDate = parse(this.date, "dd.MM.yyyy", Date.now());
      this.date = Intl.DateTimeFormat().format(addDays(parsedDate, -1));
    },
  }
};
</script>

<style scoped>
    .fas.fa-angle-left{
        color :rgb(212, 212, 212)
    }
        .fas.fa-angle-left:hover{
        color :rgb(66, 66, 66)
    }
    .fas.fa-angle-right{
        color :rgb(212, 212, 212)
    }
        .fas.fa-angle-right:hover{
        color :rgb(66, 66, 66)
    }
</style>