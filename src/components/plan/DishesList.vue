<template>
   <ul>
       <dish-item
       v-for="dish in dishes"
       :key="dish.id"
       :name="dish.name"
       :price="dish.price"
       :label="dish.label"
       :description="dish.description"
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
                    description: 'Vegetarische Pizza mit Tomaten, Brokuli und Mozzarella'
                },
                                {
                    id:2,
                    name:'Curry Tofu',
                    price: '2,5€',
                    label: 'vegetarisch',
                    description: 'gelbes Curry mit Tofu und frischem Gemüse'
                },
                                {
                    id:3,
                    name:'vegeatrische Pizza',
                    price: '3,5€',
                    label: 'vegetarisch',
                    description: 'Vegetarische Pizza mit Tomaten, Brokuli und Mozzarella'
                },
                                {
                    id:4,
                    name:'Curry Tofu',
                    price: '2,5€',
                    label: 'vegetarisch',
                    description: 'gelbes Curry mit Tofu und frischem Gemüse'
                }
            ]
        };
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