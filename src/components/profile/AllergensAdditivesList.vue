<template>
  <base-dialog v-if="dialogIsVisible" @close="dialogIsVisible =false" :open="dialogIsVisible">
    <p>
    <i class="fas solid fa-hand-point-up"></i>Zutat kann nicht ausgewählt werden. Bitte ändere hierfür die Ernährungsform.
    </p>
    <p class="p-light">
      <i class="fas solid fa-info"></i> Dabei gehen alle Einstellungen der Allergene/Zusatzstoffe verloren!
    </p>
    <button class="button-cancel" @click="dialogIsVisible =false">abbrechen</button>
    <button class="button-confirm" @click="openNutritionSetting">ändern</button>

  </base-dialog>
  <ul>
    <div @click="allergensVisible = !allergensVisible">
      <li>
        <p><b>Allergene</b></p>
        <div v-if="allergensVisible">
          <allergen-item
            v-for="allergen in allergens"
            :key="allergen"
            :allergen="allergen"
            :ingredientsExcluded="this.ingredientsExcluded"
            :ingredientsDisabled="this.ingredientsDisabled"
            :selectedNutrition="this.selectedNutrition"
            @update-allergens="updateAllergensAdditives"
            @update-rejected="showDialog"
          ></allergen-item>
        </div>
      </li>
    </div>
    <div @click="additivesVisible = !additivesVisible">
      <li>
        <p><b>Zusatzstoffe</b></p>
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
      dialogIsVisible: false,
      allergensVisible: true,
      additivesVisible: true,
      ingredientsExcluded: [],
      ingredientsDisabled: [],
      selectedNutrition: '',
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
    },
    identifyRestrictionsNutrition(){
        if(this.selectedNutrition == 'Pescetarisch'){
          this.ingredientsDisabled = ['Fisch']
         } 
    },
    showDialog(){
      this.dialogIsVisible =true;
    },
    openNutritionSetting(){
      this.dialogIsVisible =false;
      this.$router.push('/profile/nutrition');
    }

  },
  created() {
    this.selectedNutrition = this.$store.getters.getSelectedNutrition;
    this.identifyRestrictionsNutrition();
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

.p-light{
  color:rgba(0, 0, 0, 0.50)
}

.button-cancel {
  border: 1px solid #a1a1a180;
  background-color: #a1a1a180;
  color: white;
}

.button-confirm {
  border: 1px solid rgba(255, 0, 0, 0.5);
  background-color: rgba(255, 0, 0, 0.5);
  color: white;
}

button {
  font: inherit;
  padding: 0.5rem 2rem;
  border-radius: 30px;
  cursor: pointer;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.fas.solid.fa-hand-point-up{
  color:rgba(255, 0, 0, 0.75);
  margin-right: 0.5rem;
}

.fas.solid.fa-info{
  color:#a1a1a180;
  margin-right: 0.1rem;
}

.button-cancel:hover,
.button-cancel:active {
  background-color: #a1a1a1;
  border-color: #a1a1a1;
}

.button-confirm:hover,
.button-confirm:active {
  background-color: rgba(255, 0, 0, 0.75);
  border-color: rgba(255, 0, 0, 0.75);
}
</style>