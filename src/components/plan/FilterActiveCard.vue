<template>
  <div class="filter-active-box">
    <div class="filter-active-card">
      <p>
        gewählte Ernährungsform: <b>{{ selectedNutrition }}</b>
      </p>
      <p>Gerichte mit folgende Zutaten/Inhaltsstoffe werden nicht angezeigt:</p>
      <ul>
        <base-tag
          v-for="item in excluded"
          :key="item"
          :tag="item"
          :color="'light-rose'"
        ></base-tag>
      </ul>
    </div>
  </div>
</template>

<script>
import BaseTag from "../ui/BaseTag.vue";
export default {
  components: {
    BaseTag,
  },
  data() {
    return {
      selectedNutrition: "",
      excluded: [],
    };
  },
  created() {
    this.selectedNutrition = this.$store.getters.getSelectedNutrition;
    this.excluded = this.$store.getters.getExcludedAllergensAdditives;
  },
};
</script>

<style scoped>
.filter-active-box {
  margin-top: 1rem;
  margin-left: 2px;
  border-radius: 8px;
  border: solid 1px rgba(138, 169, 105, 0.3);
}

.filter-active-card {
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>

