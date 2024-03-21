<script setup>
import { inject } from 'vue'

const { note } = inject('note')
</script>

<template>
  <input
    v-model="note.title"
    type="text"
    class="rounded-sm border border-slate-500 outline-none py-1 px-3"
  />
</template>
