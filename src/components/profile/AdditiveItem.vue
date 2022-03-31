<template>
  <li class="li-additives" :class="mode" @click.stop="update">
    <p>{{ additive }}</p>
  </li>
</template>

<script>
export default {
  props: ["additive", "ingredientsExcluded"],
  computed: {
    mode() {
      if (this.ingredientsExcluded.includes(this.additive)) {
        return { avoid: true };
      } else return null;
    },
  },
  methods: {
    update() {
      this.$emit("update-additives", this.additive);
    },
  },
};
</script>

<style scoped>
.li-additives {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 25px;
  padding: 0.25rem;
}
.avoid {
  background: rgba(224, 124, 124, 0.5);
}
</style>