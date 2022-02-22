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
      allergensVisible: false,
      additivesVisible: false,
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
    determineRestrictionsNutrition() {
      let nutrition = this.$store.getters.getSelectedNutrition;
      if (nutrition == "Omnivore") {
        return;
      }
      if (nutrition == "Pescetarisch") {
        this.ingredientsExcluded = ["Krebstiere", "Weichtiere"];
        this.ingredientsDisabled = ["Fisch"];
      }
      if (nutrition == "Vegetarisch") {
        this.ingredientsExcluded = ["Krebstiere", "Weichtiere", "Fisch"];
      }
      if (nutrition == "Vegan") {
        this.ingredientsExcluded = ["Krebstiere", "Weichtiere", "Fisch", "Eier", "Milch und Milchprodukte (inkl. Laktose)"];
      }
    },
  },
  created() {
    this.determineRestrictionsNutrition();
    console.log(this.ingredientsExcluded);
    console.log(this.ingredientsDisabled);
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