<script setup>
const model = defineModel()
defineProps({
  options: Object,
  selectedSort: String
})
</script>

<template>
  <select
    v-model="model"
    class="font-body px-2 py-2 mb-6 outline-none border rounded-md text-base font-normal bg-transparent shop__select"
  >
    <option value="">{{ !selectedSort ? 'Сортировка' : 'Исходная сортировка' }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>
