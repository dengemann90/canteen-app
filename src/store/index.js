import {createStore} from 'vuex';
import { get, set } from "idb-keyval";

const store = createStore({
    state(){
        return{
            canteenId: 30,
            userType:'students',
            favorites:[]
        };
    },
    mutations:{
        setFavorites(state, payload){
            state.favorites = payload;
              set("favorites", JSON.parse(JSON.stringify(state.favorites)))
                .then(() => {
                  console.log("favorites updated in indexedDB: ");
                })
                .then(() => {
                  console.dir(state.favorites);
                })
                .catch(console.warn);
        }
    },
    actions:{
        loadFavorites(context){
            get("favorites")
            .then((data) => {
              if (!data) {
                console.log("no favorites in indexedDB");
                return;
              }
              context.commit('setFavorites',data)
              console.log("favorites loaded from indexedDB");
            })
            .catch(console.warn);
        },
        updateFavorites(context, item){
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
              context.commit('setFavorites',favorites);
        }
    },
    getters:{
        getCanteenId(state){
            return state.canteenId;
        },
        getUserType(state){
            return state.userType;
        },
        getFavorites(state){
            return state.favorites;
        }
    }
});

export default store;