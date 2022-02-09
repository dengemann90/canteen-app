import {createStore} from 'vuex';

const store = createStore({
    state(){
        return{
            canteenId: 30,
            userType:'students'
        };
    },
    mutations:{

    },
    actions:{

    },
    getters:{
        getCanteenId(state){
            return state.canteenId;
        },
        getUserType(state){
            return state.userType;
        }
    }
});

export default store;