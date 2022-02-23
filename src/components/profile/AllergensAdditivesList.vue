<template>
  <ul>
    <div @click="allergensVisible = !allergensVisible">
      <li>
        <p>Allergene</p>
        <div v-if="allergensVisible">
          <allergen-item
            v-for="allergen in allergens"
            :key="allergen"
            :allergen="allergen"
            :ingredientsExcluded="this.ingredientsExcluded"
            :ingredientsDisabled="this.ingredientsDisabled"
            @update-allergens="updateAllergensAdditives"
          ></allergen-item>
        </div>
      </li>
    </div>
    <div @click="additivesVisible = !additivesVisible">
      <li>
        <p>Zusatzstoffe</p>
        <div v-if="additivesVisible">
          <additive-item
            v-for="additive in additives"
            :key="additive"
            :additive="additive"
            :ingredientsExcluded="this.ingredientsExcluded"
             @update-additives="updateAllergensAdditives"
          ></additive-item>
        </div>
      </li>
    </div>
  </ul>
</template>

<script>
import AdditiveItem from "./AdditiveItem.vue";
import AllergenItem from "./AllergenItem.vue";
export default {
  components: {
    AdditiveItem,
    AllergenItem,
  },
  data() {
    return {
      allergensVisible: true,
      additivesVisible: true,
      ingredientsExcluded: [],
      ingredientsDisabled: [],
      allergens: [
        "Glutenhaltiges Getreide",
        "Weizen",
        "Roggen",
        "Gerste",
        "Hafer",
        "Dinkel",
        "Kamut",
        "Krebstiere",
        "Eier",
        "Fisch",
        "Erdnüsse",
        "Schalenfrüchte",
        "Mandeln",
        "Haselnuss",
        "Walnuss",
        "Kaschunuss",
        "Pacannuss",
        "Paranuss",
        "Pistazie",
        "Macadamia",
        "Sellerie",
        "Soja",
        "Senf",
        "Milch und Milchprodukte (inkl. Laktose)",
        "Sesam",
        "Schwefeldioxid und Sulfide",
        "Lupine",
        "Weichtiere",
        "Nitritpökelsalz",
        "Hefe",
      ],
      additives: [
        "Schweinefleisch bzw. mit Gelatine vom Schwein",
        "Alkohol",
        "Geschmacksverstärker",
        "gewachst",
        "konserviert",
        "Antioxidationsmittel",
        "Farbstoff",
        "Phosphat",
        "geschwärzt",
        "enthält eine Phenylalaninquelle",
        "Süßungsmittel",
        "mit zum Teil fein zerkleinertem Fleischanteil",
        "koffeinhaltig",
        "chininhaltig",
        "geschwefelt",
        "kann abführend wirken",
      ],
    };
  },
  methods: {
    updateAllergensAdditives(ingredient){
      this.$store.dispatch('updateExcludedAllergensAdditives', ingredient);
      this.getExcludedAllergensAdditives();
    },
    getExcludedAllergensAdditives(){
      this.ingredientsExcluded = this.$store.getters.getExcludedAllergensAdditives;
    }
  },
  created() {
    //this.determineRestrictionsNutrition();
    this.getExcludedAllergensAdditives();
  },
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

p {
  font-weight: bold;
}
</style>