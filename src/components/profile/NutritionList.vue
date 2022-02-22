<template>
  <ul>
    <nutrition-item
      v-for="nutrition in nutritionList"
      :key="nutrition.type"
      :nutrition="nutrition"
      :selectedNutrition="this.selectedNutrition"
      @set-selected-nutrition="setSelectedNutrition"
    ></nutrition-item>
  </ul>
</template>

<script>
import NutritionItem from "./NutritionItem.vue";
export default {
  components: {
    NutritionItem,
  },
  data() {
    return {
      selectedNutrition: "",
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
  methods: {
    setSelectedNutrition(nutrition) {
      this.$store.dispatch("updateSelectedNutrition", nutrition);
      this.getSelectedNutrition();
    },
    getSelectedNutrition(){
      this.selectedNutrition = this.$store.getters.getSelectedNutrition;
    }
  },
  created(){
    this.getSelectedNutrition();
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
</style>