<script setup>
defineProps({
  type: String,
  color: String,
  classList: String
})
</script>

<template>
  <button class="flex items-center justify-center">
    <span class="material-symbols-outlined" :style="{ color: color }" :class="classList">
      {{ type }}
    </span>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  cursor: pointer;
}
button:focus {
  outline: none;
  color: #e09b9b;
}
button:hover {
  cursor: pointer;
  opacity: 0.9;
  text-shadow: 0 0 7px rgba(102, 102, 102, 0.5);
}
button:disabled {
  opacity: 0.5;
}
</style>
