import { createStore } from 'vuex';
import { get, set } from "idb-keyval";

const store = createStore({
  state() {
    return {
      canteenId: null,
      userType: '',
      favorites: [],
      selectedNutrition: '',
      excludedAllergensAdditives: []
    };
  },
  mutations: {
    setUserTypeDB(state, payload) {
      set("userType", JSON.parse(JSON.stringify(payload)))
        .then(() => {
          state.userType = payload;
          console.log("UserType updated in indexedDB: ");
        })
        .then(() => {
          console.log('userType: ', state.userType);
        })
        .catch(console.warn);
    },
    setUserTypeState(state, payload) {
      state.userType = payload;
    },

    setFavoritesDB(state, payload) {
      set("favorites", JSON.parse(JSON.stringify(payload)))
        .then(() => {
          state.favorites = payload;
          console.log("favorites updated in indexedDB: ");
        })
        .then(() => {
          console.dir(state.favorites);
        })
        .catch(console.warn);
    },
    setFavoritesState(state, payload) {
      state.favorites = payload;
    },
    setSelectedNutritionDB(state, payload) {
      state.selectedNutrition = payload;
      set("selectedNutrition", JSON.parse(JSON.stringify(state.selectedNutrition)))
        .then(() => {
          state.selectedNutrition = payload;
          console.log("selected nutrition updated in indexedDB: ");
        })
        .then(() => {
          console.dir(state.selectedNutrition);
        })
        .catch(console.warn);
    },
    setSelectedNutritionState(state, payload) {
      state.selectedNutrition = payload;
    },
    setExcludedAllergensAdditivesDB(state, payload) {
      set("excludedAllergensAdditives", JSON.parse(JSON.stringify(payload)))
        .then(() => {
          state.excludedAllergensAdditives = payload;
          console.log("excluded allergens & additives updated in indexedDB: ");
        })
        .then(() => {
          console.dir(state.excludedAllergensAdditives);
        })
        .catch(console.warn);
    },
    setExcludedAllergensAdditivesState(state, payload) {
      state.excludedAllergensAdditives = payload;
    }
  },
  actions: {
    loadUserType(context) {
      get("userType").then((data) => {
        if (data == null) {
          //students as default value
          context.commit('setUserTypeDB', 'students');
          console.log("No user Type entry in indexedDB")
        } else {
          context.commit('setUserTypeState', data);
          console.log("User type loaded from indexedDB into vuex store");
        }
      })
    },
    updateUserType(context, payload) {
      context.commit('setUserTypeDB', payload)
    },
    loadFavorites(context) {
      get("favorites")
        .then((data) => {
          if (!data) {
            console.log("no favorites in indexedDB");
            return;
          }
          context.commit('setFavoritesState', data)
          console.log("favorites loaded from indexedDB into vuex store");
        })
        .catch(console.warn);
    },
    updateFavorites(context, item) {
      let favorites = context.state.favorites;
      console.log(favorites)
      const indexFavorites = favorites.findIndex(
        (dish) => dish.id === item.id
      );
      if (indexFavorites === -1) {
        favorites.unshift(item);
        console.log("dish with id " + item.id + " added to favorites");
      } else {
        favorites.splice(indexFavorites, 1);
        console.log("dish with id " + item.id + " deleted from favorites");
      }
      context.commit('setFavoritesDB', favorites);
    },
    loadSelectedNutrition(context) {
      get("selectedNutrition")
        .then((data) => {
          if (!data) {
            // store default value in indexedDB -> Omnivore
            console.log("no selectedNutrion in indexedDB - store default value in vuex store");
            context.commit('setSelectedNutritionDB', 'Omnivore');
            context.commit('setSelectedNutritionState', 'Omnivore');
            return;
          }
          context.commit('setSelectedNutritionState', data)
          console.log("selected nutrition loaded from indexedDB into vuex store");
        })
        .catch(console.warn);
    },
    updateSelectedNutrition(context, payload) {
      context.commit('setSelectedNutritionDB', payload);
      let ingredientsExcluded = [];
      if (payload == "Omnivore") {
        context.commit('setExcludedAllergensAdditivesDB', ingredientsExcluded);
        return;
      }
      if (payload == "Pescetarisch") {
        ingredientsExcluded = ["Krebstiere", "Weichtiere"];
      }
      if (payload == "Vegetarisch") {
        ingredientsExcluded = ["Krebstiere", "Weichtiere", "Fisch"];
      }
      if (payload == "Vegan") {
        ingredientsExcluded = ["Krebstiere", "Weichtiere", "Fisch", "Eier", "Milch und Milchprodukte (inkl. Laktose)"];
      }
      context.commit('setExcludedAllergensAdditivesDB', ingredientsExcluded);
    },
    loadExcludedAllergensAdditives(context) {
      get("excludedAllergensAdditives")
        .then((data) => {
          if (!data) {
            // store empty value in indexedDB -> default Nutrition  = Omnivore
            console.log("no data for excluded allergens & additives in indexedDb- store empty Array in indexedDB");
            context.commit('setExcludedAllergensAdditivesDB', []);
            return;
          }
          context.commit('setExcludedAllergensAdditivesState', data)
          console.log("excluded allergens & additives loaded from indexedDB into vuex store");
        })
        .catch(console.warn);
    },
    updateExcludedAllergensAdditives(context, ingredient) {
      let ingredientsExcluded = context.state.excludedAllergensAdditives;
      let indexOfIngredient = ingredientsExcluded.findIndex(ing => ing == ingredient);
      if (indexOfIngredient == -1) {
        ingredientsExcluded.push(ingredient);
      } else {
        ingredientsExcluded.splice(indexOfIngredient, 1);
      }
      context.commit('setExcludedAllergensAdditivesDB', ingredientsExcluded);
    }
  },
  getters: {
    getCanteenId(state) {
      return state.canteenId;
    },
    getUserType(state) {
      return state.userType;
    },
    getFavorites(state) {
      return state.favorites;
    },
    getSelectedNutrition(state) {
      return state.selectedNutrition;
    },
    getExcludedAllergensAdditives(state) {
      return state.excludedAllergensAdditives;
    }
  }
});

export default store;