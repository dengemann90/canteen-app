<template>
  <li>
    <div @click="descriptionVisible = !descriptionVisible">
      <h1>
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
      </h1>
      <p>
        {{ price == null ? "-" : price }}
        €
      </p>
      <div>
        <i
          @click.stop="updateFavorite"
          class="fas regular fa-heart"
          :class="{ active: isFavorite }"
        ></i>
      </div>
      <transition name="fade-in">
        <section v-if="descriptionVisible">
          <base-tag
            v-for="tag in additionalInformation"
            :key="tag"
            :tag="tag"
          ></base-tag>
        </section>
      </transition>
    </div>
  </li>
</template>

<script>
import BaseTag from "../ui/BaseTag.vue";
export default {
  components: {
    BaseTag,
  },
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
    price() {
      const userType = this.$store.getters.getUserType;
      const priceList = this.dishItem.prices;

      for (let key in priceList) {
        if (key == userType) {
          return priceList[key];
        }
      }
      return null;
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
      let information = [];
      let startingIndex = 1;

      for (const [i, v] of this.dishItem.notes.entries()) {
        if (i >= startingIndex && i < notesLength) {
          information.push(v);
        }
      }
      return information;
    },
  },
  data() {
    return {
      descriptionVisible: false,
      animateHeart: false,
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

li h1 {
  margin: 0.5rem 0;
}

.fas.fa-heart {
  color: rgba(248, 191, 191, 0.596);
}

.fas.fa-heart.active {
  animation: heartPuls 0.3s ease-in;
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

/* fade in - tags */

.fade-in-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-in-enter-active {
  transition: all 0.3s ease-in-out;
}
.fade-in-enter-to {
  opacity: 1;
  transform: translateY(0);
}

@keyframes heartPuls {
  0% {
    opacity: 1;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.4);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>