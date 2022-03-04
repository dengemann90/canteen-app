<template>
  <div @click="updateCanteen">
    <li :class="{active : highlightCanteen}">
      <h1>
        {{ canteen.name }}
      </h1>
      <p>
        {{ canteen.address }}
      </p>
    </li>
  </div>
</template>

<script>
export default {
  props: ["canteen", "selectedCanteenId"],
  emits:["update-selected-canteen"],
  data() {
    return {

    };
  },
  computed:{
      highlightCanteen(){
          if(this.canteen.id == this.selectedCanteenId){
              return true;
          }
            return false;
      }
  },
  methods:{
      updateCanteen(){
          if(this.canteen.id != this.selectedCanteenId){
              this.$emit("update-selected-canteen", this.canteen)
          }
      }
  }
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
}

.active {
  border: solid 2px rgb(138, 169, 105);
  box-shadow: 2px 2px 8px rgba(138, 169, 105, 0.5);
}

h1 {
  text-align: left;
  font-size: 1rem;
}

p {
  text-align: left;
  font-size: 0.75rem;
}
</style>