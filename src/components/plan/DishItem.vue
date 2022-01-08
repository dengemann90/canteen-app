<template>
  <li>
    <div @click="descriptionVisible = !descriptionVisible">
      <h3>{{ dishItem.name }}</h3>
      <p>{{ dishItem.prices.students}} €</p>
      <div>
        <i
          @click.stop="updateFavorite"
          class="fas regular fa-heart"
          :class="{ active: isFavorite }"
        ></i>
      </div>
      <section v-if="descriptionVisible">
        <p>{{ dishItem.notes[0] }}</p>
        <p>{{ isVegetarienVegan }}</p>
        <p>{{ additionalInformation }}</p>
      </section>
    </div>
  </li>
</template>

<script>
export default {
  props: ["dishItem", "favorites"],
  emits: ["change-favorite-status"],
  computed: {
    isFavorite() {
      const posId = this.favorites.indexOf(this.dishItem.id);
      if (posId === -1) {
        console.log("dish with id " + this.dishItem.id + " is not a favorite");
        return false;
      } else {
        console.log("dish with id " + this.dishItem.id + " is a favorite");
        return true;
      }
    },
    isVegetarienVegan(){
      if(this.dishItem.notes[1] === 'vegetarisch' || this.dishItem.notes[1] === 'vegan'){
        return this.dishItem.notes[1];
      } else{
        return null;
      }
    },
    additionalInformation() {
      let notesLength = this.dishItem.notes.length;
      let information = "";
      let startingIndex = this.isVegetarienVegan? 2:1;

      for (const [i, v] of this.dishItem.notes.entries()) {
        if (i >= startingIndex && i < notesLength) {
          if (i === notesLength - 1) {
            information = information + v;
          } else {
            information = information + v + ", ";
          }
        }
      }
      return information;
    },
  },
  data() {
    return {
      descriptionVisible: false
    };
  },
  methods: {
    updateFavorite() {
      this.$emit("change-favorite-status", this.dishItem.id);
    },
  },
  mounted(){
    console.log("mounted dish objects: " + this.dishItem);
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

li h3 {
  margin: 0.5rem 0;
  font-size: 1.25rem;
}

li .team-members {
  margin: 0.5rem 0;
}

button {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #383838;
}

.fas.fa-heart:hover {
  color: red;
}
.fas.fa-heart {
  color: rgba(248, 191, 191, 0.596);
}

.fas.fa-heart.active {
  color: red;
}
</style>