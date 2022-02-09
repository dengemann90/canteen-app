<template>
        <span class="badge">
        {{tag}}
    </span>
</template>

<script>
export default {
    props:['tag']
}
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
}
</style>
