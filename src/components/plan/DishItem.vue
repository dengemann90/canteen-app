<template>
    <li>
        <div @click="descriptionVisible = !descriptionVisible">
        <h3>{{name}}</h3>
        <p>{{price}}</p>
        <p>{{label}}</p>
        <div>
            <i @click.stop="updateFavorite" class="fas regular fa-heart" :class="{active: isFavorite}"></i>
        </div>
        <section v-if="descriptionVisible">
            <p>{{description}}</p>
        </section>
        </div>
    </li>
</template>

<script>
export default {
    props: ['id', 'name', 'price', 'label', 'description', 'isFavorite'],
    emits: ['change-favorite-status'],
    data(){
        return{
            descriptionVisible:false
        };
    },
    methods:{
        updateFavorite(){
            this.$emit('change-favorite-status', this.id)
        }
    }
    
}
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

.fas.fa-heart:hover{
    color:red;
}
.fas.fa-heart{
    color: rgba(248, 191, 191, 0.596);
}

.fas.fa-heart.active{
    color: red;
}
</style>