<template>
  <base-dialog v-if="dialogIsVisible" :open="dialogIsVisible">
    <p>
      <i class="fas solid fa-hand-point-up"></i> Beim Ändern der Ernährungsform
      gehen die Einstellungen der Allergene/Zusatzstoffe verloren!
    </p>
    <button class="button-cancel" @click="cancel">abbrechen</button>
    <button class="button-confirm" @click="confirm">bestätigen</button>
  </base-dialog>
  <ul>
    <nutrition-item
      v-for="nutrition in nutritionList"
      :key="nutrition.type"
      :nutrition="nutrition"
      :selectedNutrition="this.selectedNutrition"
      @request-confirmation="showDialog"
    ></nutrition-item>
  </ul>
</template>

<script>
import { get } from "idb-keyval";
import NutritionItem from "./NutritionItem.vue";
export default {
  components: {
    NutritionItem,
  },
  data() {
    return {
      dialogIsVisible: false,
      changeNutrition: false,
      selectedNutrition: "",
      newSelectedNutrition: "",
      nutritionList: [
        {
          type: "Omnivore",
          description: "Du isst sowohl pflanzliche als auch tierische Produkte",
          imageName: "Omnivore",
          alt: "Omnivore"
        },
        {
          type: "Pescetarisch",
          description:
            "Du isst eigentlich veggie, machst bei Fisch aber eine Ausnahme",
          imageName: "Pescetarisch",
          alt: "Pescetarisch"
        },
        {
          type: "Vegetarisch",
          description: "Du verzichtest auf Fleisch und Fisch",
          imageName: "Vegetarisch",
          alt: "Vegetarisch"
        },
        {
          type: "Vegan",
          description: "Du verzichtest auf alle tierischen Produkte",
          imageName: "Vegan",
          alt: "Vegan"
        },
      ],
    };
  },
  methods: {
    showDialog(transmittedNutrition) {
      this.newSelectedNutrition = transmittedNutrition;
      this.dialogIsVisible = true;
    },
    cancel() {
      this.dialogIsVisible = false;
      this.newSelectedNutrition = "";
    },
    confirm() {
      this.dialogIsVisible = false;
      this.changeNutrition = true;
      this.setSelectedNutrition();
    },
    setSelectedNutrition() {
      this.$store.dispatch(
        "updateSelectedNutrition",
        this.newSelectedNutrition
      );
      this.getSelectedNutrition();
      this.newSelectedNutrition = "";
    },
    getSelectedNutrition() {
      this.selectedNutrition = this.$store.getters.getSelectedNutrition;
    },
  },
  created() {
    get("selectedNutrition").then((data) => {
      if (data != null) {
        this.selectedNutrition = data;
      } else {
        this.selectedNutrition = "Omnivore";
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

.button-cancel:hover{
  background-color: #a1a1a1;
  border-color: #a1a1a1;
}

.button-confirm:hover{
  background-color: rgba(255, 0, 0, 0.75);
  border-color: rgba(255, 0, 0, 0.75);
}
</style>