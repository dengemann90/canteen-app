<template>
  <ul>
    <h1>{{ canteenRadius.name }}</h1>
    <!-- <h2>{{ canteenRadius.city }}</h2>
    <h2>{{ canteenRadius.address }}</h2> -->
  </ul>
</template>

<script>
export default {
  props: ["canteenRadius"],
};
</script>

<style scoped>
ul {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
}

ul h2 {
  margin: 0.5rem 0;
  font-size: 1rem;
}
</style>