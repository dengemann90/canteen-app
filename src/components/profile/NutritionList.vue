<template>
<ul>
  <nutrition-item 
    v-for="nutrition in nutritionList"
    :key="nutrition.type"
    :nutrition="nutrition"
    :selectedNutrition = this.selectedNutrition
    @set-selected-nutrition = "setSelectedNutrition"
  ></nutrition-item>
  </ul>
</template>

<script>
import NutritionItem from './NutritionItem.vue';
export default {
  components: {
    NutritionItem
  },
  data() {
    return {
      selectedNutrition:"Omnivore", 
      nutritionSelected: "Omnivore",
      nutritionList: [
        {
          type: "Omnivore",
          description: "Du isst sowohl pflanzliche als auch tierische Produkte",
          imageName: "Omnivore",
        },
        {
          type: "Pescetarisch",
          description:
            "Du isst eigentlich veggie, machst bei Fisch aber eine Ausnahme",
          imageName: "Pescetarisch",
        },
        {
          type: "Vegetarisch",
          description: "Du verzichtest auf Fleisch und Fisch",
          imageName: "Vegetarisch",
        },
        {
          type: "Vegan",
          description: "Du verzichtest auf alle tierischen Produkte",
          imageName: "Vegan",
        },
      ],
    };
  },
  methods:{
    setSelectedNutrition(nutrition){
      this.selectedNutrition = nutrition;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0rem auto;
  max-width: 40rem;
  padding: 0;
}

li {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 15px;
  padding: 1rem;
}

.active {
  margin: 1rem 0;
  border-radius: 15px;
  padding: 1rem;
  border: solid 2px rgb(138, 169, 105);
  box-shadow: 2px 2px 8px rgba(138, 169, 105, 0.5);
}
</style>