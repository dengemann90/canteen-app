<template>
  <li>
    <div @click="descriptionVisible = !descriptionVisible">
      <h2>
        {{ dishItem.id }}
        <i class="fas solid fa-circle fa-xs" :class="nutriIconColor"></i>
        <i
          v-if="isVegetarienVegan == 'vegetarisch'"
          class="fas solid fa-leaf fa-xs"
        ></i>
        <i
          v-else-if="isVegetarienVegan == 'vegan'"
          class="fas solid fa-seedling"
        ></i>
      </h2>
      <p>
        {{ dishItem.prices.students == null ? "-" : dishItem.prices.students }}
        €
      </p>
      <div>
        <i
          @click.stop="updateFavorite"
          class="fas regular fa-heart"
          :class="{ active: isFavorite }"
        ></i>
      </div>
      <section v-if="descriptionVisible">
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
    nutriIconColor() {
      const nutriDescription = this.dishItem.notes[0];
      if (nutriDescription == "grün (Ampel)") {
        return "green";
      } else if (nutriDescription == "gelb (Ampel)") {
        return "orange";
      } else return "red";
    },
    isFavorite() {
      const indexFavorites = this.favorites.findIndex(
        (fav) => fav.id === this.dishItem.id
      );
      if (indexFavorites === -1) {
        console.log("dish with id " + this.dishItem.id + " is not a favorite");
        return false;
      } else {
        console.log("dish with id " + this.dishItem.id + " is a favorite");
        return true;
      }
    },
    isVegetarienVegan() {
      if (
        this.dishItem.notes[1] === "vegetarisch" ||
        this.dishItem.notes[1] === "vegan"
      ) {
        return this.dishItem.notes[1];
      } else {
        return null;
      }
    },
    additionalInformation() {
      let notesLength = this.dishItem.notes.length;
      let information = "";
      let startingIndex = this.isVegetarienVegan ? 2 : 1;

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
      descriptionVisible: false,
      vegetarian: "f",
    };
  },
  methods: {
    updateFavorite() {
      this.$emit("change-favorite-status", this.dishItem);
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
}

li h2 {
  margin: 0.5rem 0;
  font-size: 1rem;
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

.fas.solid.fa-leaf {
  color: rgba(166, 206, 57, 0.75);
}

.fas.solid.fa-seedling {
  color: rgba(43, 116, 52, 0.75);
}

.fas.solid.fa-circle.green {
  color: rgba(14, 134, 72, 0.6);
}

.fas.solid.fa-circle.orange {
  color: rgba(236, 110, 21, 0.6);
}

.fas.solid.fa-circle.red {
  color: rgba(232, 47, 31, 0.6);
}
</style>