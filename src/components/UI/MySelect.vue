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
    class="font-body px-2 py-2 mb-6 outline-none border rounded-md text-base font-normal bg-transparent shop__select text-blue-800"
  >
    <option value="">{{ !selectedSort ? 'Сортировка' : 'Исходная сортировка' }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<style scoped>
@-moz-document url-prefix() {
  option {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
}
</style>
