<template>
  <span :class="badgeColor">
    {{ tag }}
  </span>
</template>

<script>
export default {
  props: ["tag", "color"],
  computed: {
    badgeColor() {
      console.log("badge color", this.color);
      if (this.color == "light-rose") {
        return { "badge-light-rose": true };
      } else {
        //default color
        return { badge: true };
      }
    },
  },
};
</script>

<style scoped>
.badge {
  background-color: rgba(204, 204, 204, 0.15);
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
  margin-top: 1rem;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
}

.badge-light-rose {
  background-color: rgba(255, 0, 0, 0.1);
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
  margin-top: 1rem;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
}
</style>
