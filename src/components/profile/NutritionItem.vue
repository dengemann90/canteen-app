<template>
<div @click.stop="uptdateSelection">
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
export default {
    props:['nutrition', 'selectedNutrition'],
    emits:['set-selected-nutrition'],
  data() {
    return {
    };
  },
  computed:{
      highlightNutrition(){
          if(this.selectedNutrition == this.nutrition.type){
              return true
          } else {
              return false
          }
      }
  },
  methods:{
      uptdateSelection(){
          this.$emit("set-selected-nutrition", this.nutrition.type);
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