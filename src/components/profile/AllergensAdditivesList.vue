<template>
  <base-dialog
    v-if="dialogIsVisible"
    @close="dialogIsVisible = false"
    :open="dialogIsVisible"
  >
    <p>
      <i class="fas solid fa-hand-point-up"></i>Zutat kann nicht ausgewählt
      werden. Bitte ändere hierfür die Ernährungsform.
    </p>
    <p class="p-light">
      <i class="fas solid fa-info"></i> Dabei gehen alle Einstellungen der
      Allergene/Zusatzstoffe verloren!
    </p>
    <button class="button-cancel" @click="dialogIsVisible = false">
      abbrechen
    </button>
    <button class="button-confirm" @click="openNutritionSetting">ändern</button>
  </base-dialog>
  <ul>
    <div @click="allergensVisible = !allergensVisible">
      <li>
        <h2>Allergene</h2>
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
        <h2>Zusatzstoffe</h2>
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
import { get } from "idb-keyval";
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
      selectedNutrition: "",
      allergens: [
        "Dinkel",
        "Eier",
        "Erdnüsse",
        "Fisch",
        "Gerste",
        "Glutenhaltiges Getreide",
        "Hafer",
        "Haselnuss",
        "Hefe",
        "Kamut",
        "Kaschunuss",
        "Krebstiere",
        "Lupine",
        "Macadamia",
        "Mandeln",
        "Knoblauch",
        "Milch und Milchprodukte (inkl. Laktose)",
        "Nitritpökelsalz",
        "Pacannuss",
        "Paranuss",
        "Pistazie",
        "Roggen",
        "Schalenfrüchte",
        "Schwefeldioxid und Sulfide",
        "Sellerie",
        "Senf",
        "Sesam",
        "Soja",
        "Walnuss",
        "Weichtiere",
        "Weizen",
      ],
      additives: [
        "Alkohol",
        "Antioxidationsmittel",
        "chininhaltig",
        "enthält eine Phenylalaninquelle",
        "Farbstoff",
        "Geschmacksverstärker",
        "geschwärzt",
        "geschwefelt",
        "gewachst",
        "kann abführend wirken",
        "koffeinhaltig",
        "konserviert",
        "mit zum Teil fein zerkleinertem Fleischanteil",
        "Phosphat",
        "Schweinefleisch bzw. mit Gelatine vom Schwein",
        "Süßungsmittel",
      ],
    };
  },
  methods: {
    updateAllergensAdditives(ingredient) {
      this.$store.dispatch("updateExcludedAllergensAdditives", ingredient);
      this.getExcludedAllergensAdditives();
    },
    getExcludedAllergensAdditives() {
      this.ingredientsExcluded =
        this.$store.getters.getExcludedAllergensAdditives;
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
    openNutritionSetting() {
      this.dialogIsVisible = false;
      this.$router.push("/profile/nutrition");
    },
  },
  created() {
    // load selectedNutrition from indexedDB
    get("selectedNutrition").then((data) => {
      if (data != null) {
        this.selectedNutrition = data;
        if (this.selectedNutrition == "Pescetarisch") {
          this.ingredientsDisabled = ["Fisch"];
        }
      } else {
        this.selectedNutrition = "Omnivore";
      }
    });

    // load excludedAllergensAdditives from indexedDB
    get("excludedAllergensAdditives").then((data) => {
      if (data != null) {
        this.ingredientsExcluded = data;
      }
    });
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

.p-light {
  color: rgba(0, 0, 0, 0.5);
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
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  padding: 0.5rem 2rem;
  border-radius: 30px;
  cursor: pointer;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.fas.solid.fa-hand-point-up {
  color: rgba(255, 0, 0, 0.75);
  margin-right: 0.5rem;
}

.fas.solid.fa-info {
  color: #a1a1a180;
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