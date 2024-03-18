<script setup>
import { inject } from 'vue'
import debounce from 'lodash.debounce'

const note = inject('note')

const onChangeTitleInput = debounce((e) => {
  note.value.title = e.target.value
}, 300)
</script>

<template>
  <input
    :value="note.title"
    type="text"
    class="rounded-sm border border-slate-500 outline-none py-1 px-3"
    @input="onChangeTitleInput"
  />
</template>
