<template>
   <ul>
       <dish-item
       v-for="dish in dishes"
       :key="dish.id"
       :id="dish.id"
       :name="dish.name"
       :price="dish.price"
       :label="dish.label"
       :description="dish.description"
       :isFavorite="dish.isFavorite"
       @change-favorite-status="changeFavoriteStatus"
       ></dish-item>
   </ul>
</template>

<script>
import DishItem from './DishItem.vue';
export default {
    components:{
        DishItem
    },
    data(){
        return{
            dishes:[
                {
                    id:1,
                    name:'vegeatrische Pizza',
                    price: '3,5€',
                    label: 'vegetarisch',
                    description: 'Vegetarische Pizza mit Tomaten, Brokuli und Mozzarella',
                    isFavorite:true
                },
                                {
                    id:2,
                    name:'Curry Tofu',
                    price: '2,5€',
                    label: 'vegetarisch',
                    description: 'gelbes Curry mit Tofu und frischem Gemüse',
                    isFavorite:true
                },
                                {
                    id:3,
                    name:'vegeatrische Pizza',
                    price: '3,5€',
                    label: 'vegetarisch',
                    description: 'Vegetarische Pizza mit Tomaten, Brokuli und Mozzarella',
                    isFavorite:false
                },
                                {
                    id:4,
                    name:'Curry Tofu',
                    price: '2,5€',
                    label: 'vegetarisch',
                    description: 'gelbes Curry mit Tofu und frischem Gemüse',
                    isFavorite:false
                }
            ]
        };
    },
    methods:{
        changeFavoriteStatus(id){
            const identifiedDish = this.dishes.find(dish => dish.id === id);
            identifiedDish.isFavorite = !identifiedDish.isFavorite;
        }
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 40rem;
  padding: 0;
}
</style>