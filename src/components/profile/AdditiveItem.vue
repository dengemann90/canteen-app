<template>
<li>
    <p>{{additive}}</p>
</li>
</template>

<script>
export default {
    props:['additive']
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 25px;
  padding: 0.25rem;
}
</style>