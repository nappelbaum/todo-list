<script setup>
import { computed, ref } from 'vue'
import IconBtn from '../components/IconBtn.vue'
import NoteCard from '@/components/NoteCard.vue'
import MySelect from '../components/UI/MySelect.vue'
import store from '@/store'

const notes = computed(() => store.getters.allNotes)
const error = computed(() => store.getters.notesErr)

const selectedSort = ref('')
const sortOptions = [
  { value: 'title', name: 'По названию' },
  { value: 'tasks', name: 'По количеству задач' }
]
</script>

<template>
  <div v-if="error" class="font-body" style="color: red">
    Ошибка при загрузке страницы ({{ error }})
  </div>
  <div class="home font-body">
    <div v-if="!notes.length" class="mx-auto text-center">
      <h2 class="font-bold text-xl mb-2 leading-8">
        Пока нет доступных заметок.<br />Для добавления нажмите кнопку ниже.
      </h2>
      <router-link to="/note" class="inline-block mx-auto">
        <icon-btn type="add" color="rgb(26 27 59)" classList="md-44" title="Добавить заметку" />
      </router-link>
    </div>
    <div v-else class="flex flex-col items-center font-body">
      <div class="flex flex-col items-center font-body">
        <h2 class="font-bold text-xl mb-4 leading-8">Список заметок:</h2>
        <my-select v-model="selectedSort" :options="sortOptions" :selectedSort="selectedSort" />
        <transition-group
          tag="ul"
          name="notes"
          class="flex flex-col gap-y-2 items-center text-lg w-full"
        >
          <li v-for="note in notes" :key="note.noteId" class="flex flex-col gap-y-2 items-center">
            <note-card :note="note" />
          </li>
        </transition-group>
      </div>
      <router-link to="/note" class="inline-block mx-auto">
        <icon-btn type="add" color="rgb(26 27 59)" classList="md-44" title="Добавить заметку" />
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notes-enter-active,
.notes-move {
  transition: 0.4s ease all;
}

.notes-enter-from,
.notes-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.notes-leave-active {
  transition: 0.4s ease all;
  position: absolute;
}
</style>
