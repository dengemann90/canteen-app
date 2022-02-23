<template>
  <base-dialog @close="hideDialog" :open="dialogIsVisible">
    <p>
      Achtung: Beim Ändern der Ernährungsform gehen die Einstellungen der
      Allergene/Zusatzstoffe verloren!
    </p>
    <button class="button-cancel" @click="cancel">abbrechen</button>
    <button class="button-confirm" @click="confirm">bestätigen</button>
  </base-dialog>
  <div @click.stop="showDialog">
    <li :class="{ active: highlightNutrition }">
      <div>
        <p>
          <b>{{ nutrition.type }}</b>
        </p>
        <p>{{ nutrition.description }}</p>
      </div>
      <div>
        <img
          :src="require(`../../assets/${nutrition.imageName}.png`)"
          alt="vegan"
          width="150"
          height="150 "
        />
      </div>
    </li>
  </div>
</template>

<script>
import BaseDialog from "../ui/BaseDialog.vue";
export default {
  components: {
    BaseDialog,
  },
  props: ["nutrition", "selectedNutrition"],
  emits: ["set-selected-nutrition"],
  data() {
    return {
      dialogIsVisible: false,
      changeNutrition: false,
    };
  },
  computed: {
    highlightNutrition() {
      if (this.selectedNutrition == this.nutrition.type) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    showDialog() {
      if (this.selectedNutrition != this.nutrition.type) {
       this.dialogIsVisible = true;
      }
    },
      cancel() {
        this.dialogIsVisible = false;
      },
      confirm() {
        this.dialogIsVisible = false;
        this.changeNutrition = true;
        this.uptdateSelection();
      },
    uptdateSelection() {
      this.$emit("set-selected-nutrition", this.nutrition.type);
      this.changeNutrition = false;
    },
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

.active {
  margin: 1rem 0;
  border-radius: 15px;
  padding: 1rem;
  border: solid 2px rgb(138, 169, 105);
  box-shadow: 2px 2px 8px rgba(138, 169, 105, 0.5);
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