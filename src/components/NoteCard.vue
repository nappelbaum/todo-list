<script setup>
import { computed, ref } from 'vue'
import IconBtn from './IconBtn.vue'
import ModalWindow from '../components/ModalWindow.vue'
import store from '@/store'
import copy from '../functions/noMutCopy'

const props = defineProps({
  note: Object
})

const showDeleteModal = ref(false)

const tasks = computed(() => {
  let tasks3Items = []
  for (let i = 0; i < 3; i++) {
    if (!props.note.tasks[i]) break

    const tasksNoMut = copy(props.note.tasks[i])

    tasks3Items.push(tasksNoMut)

    const textLength = 70
    const textCut = tasks3Items[i].text?.slice(0, textLength)
    let textArr = textCut.split(' ')
    if (textCut.length === textLength) {
      textArr.pop()
      textArr.push('. . .')
    }
    tasks3Items[i].text = textArr.join(' ')
  }
  return tasks3Items
})

const deleteNote = () => {
  store.dispatch('deleteNote', props.note)
  showDeleteModal.value = false
}
</script>

<template>
  <router-link :to="'/note/' + note.noteId" class="inline-block mx-auto">
    <h3 class="text-xl font-semibold">{{ note.title }}</h3>
  </router-link>
  <ul class="flex flex-col gap-y-1 items-center text-base">
    <li v-for="task in tasks" :key="task.id">
      <p :class="task.completed && 'line-through'" class="text-center">- {{ task.text }}</p>
    </li>
    <div class="flex gap-x-3">
      <router-link :to="'/note/' + note.noteId" class="inline-block mx-auto">
        <icon-btn
          type="edit"
          color="rgb(23 209 64)"
          classList="md-42"
          title="Редактировать заметку"
        />
      </router-link>
      <icon-btn
        type="delete"
        color="#f93333"
        classList="md-44"
        title="Удалить заметку"
        @click="() => (showDeleteModal = true)"
      />
    </div>
  </ul>
  <hr class="w-full mt-4 mb-6 border-slate-400" />

  <modal-window
    :show="showDeleteModal"
    @close="() => (showDeleteModal = false)"
    @confirm="deleteNote"
  >
    <template v-slot:title>
      <h3 class="delete-title">Действительно хотите удалить заметку?</h3>
    </template>
    <template v-slot:body>
      <div class="modal-content">Данные будут потеряны!</div>
    </template>
  </modal-window>
</template>

<style lang="scss" scoped>
.delete-title {
  color: red;
}
</style>
