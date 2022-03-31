<template>
  <div v-if="open" class="backdrop" @click="$emit('close')"></div>
  <transition name="modal">
    <dialog open v-if="open">
      <p>
        <i :class="iconDialog"></i>
        {{ message }}
      </p>
      <slot> </slot>
    </dialog>
  </transition>
</template>

<script>
export default {
  props: ["open", "type", "message"],
  emits: ["close"],
  computed: {
    iconDialog() {
      if (this.type == "gps") {
        return "fas solid fa-compass error";
      }
      if (this.type == "network") {
        return "fas solid fa-signal error";
      }
      if (this.type == "server") {
        return "fas solid fa-server error";
      }
      return null;
    },
  },
};
</script>

<style scoped>
.fas.solid.fa-compass.error,
.fas.solid.fa-signal.error,
.fas.solid.fa-server.error {
  margin-left: 0.25rem;
  color: rgba(255, 0, 0, 0.2);
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
}

dialog {
  position: fixed;
  top: 30vh;
  width: 20rem;
  left: calc(50% - 11rem);
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
  background-color: white;
  z-index: 100;
  border: none;
}

.modal-enter-active {
  animation: modal 0.3s ease-out;
}

.modal-leave-active {
  animation: modal 0.3s ease-in reverse;
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>