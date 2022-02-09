<template>
<div >
  <li>
    <div @click="dishesVisible = !dishesVisible">
      <h3>{{ category.category }}</h3>
    </div>
    <div v-if="dishesVisible">
      <dish-item
        v-for="dish in category.dishes"
        :key="dish.id"
        :dish-item="dish"
        :favorites="favorites"
        @change-favorite-status="changeFavoriteStatus"
      ></dish-item>
    </div>

  </li>
  </div>
</template>

<script>
import DishItem from "./DishItem.vue";
export default {
  components: {
    DishItem,
  },
  props: ["category", "favorites"],
  data() {
    return {
      dishesVisible: false,
    };
  },
  methods:{
      changeFavoriteStatus(item){
           this.$emit("change-favorite-status", item);
      }
  }
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem; 
}

li h3 {
  margin: 0.5rem 0;
  font-size: 1.25rem;

}
</style>