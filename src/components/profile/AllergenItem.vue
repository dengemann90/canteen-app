<template>
  <li class="li-allergen" :class="mode">
    <p>{{ allergen }}</p>
  </li>
</template>

<script>
export default {
  props: ['allergen', 'ingredientsExcluded', 'ingredientsDisabled'],
  data() {
    return {};
  },
  computed: {
    mode() {
        
        if(this.ingredientsExcluded.includes(this.allergen)){
            console.log('Zutat ' + this.allergen + ' ausschließen');
            return {avoid: true}
        }
        if(this.ingredientsDisabled.includes(this.allergen)){
            return {disabled:true}
        }
        else return null
    },
  },
};
</script>

<style scoped>
.li-allergen {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 25px;
  padding: 0.25rem;
}

.disabled {
  background: rgba(195, 195, 195, 0.25);
  color: rgba(0, 0, 0, 0.50);
}

.avoid {
    background: rgba(224, 124, 124, 0.50);
}
</style>