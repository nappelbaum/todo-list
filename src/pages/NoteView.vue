<script setup>
import { computed, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { useDebouncedRefHistory } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import store from '@/store'
import copy from '../functions/noMutCopy'
import { keyDown, keyUp } from '../functions/keyDownUp'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import ItemTitle from '../components/ItemTitle.vue'
import ItemTasks from '../components/ItemTasksList.vue'
import IconBtn from '../components/IconBtn.vue'
import ModalWindow from '../components/ModalWindow.vue'
import modalPromise from '../functions/modalPromise'

const note = ref({})
const showSaveModal = ref(false)
const showDeleteModal = ref(false)
const showLeaveModal = ref(false)
const confirm = ref(true)
const route = useRoute()
const router = useRouter()
const watchHistoryLength = ref(0)

const { history, undo, redo, canUndo, canRedo, clear } = useDebouncedRefHistory(note, {
  deep: true,
  debounce: 300
})

const allNotes = computed(() => store.getters['notes/allNotes'])
const error = computed(() => store.getters['notes/notesErr'])

/** check Note in store and update it */
const fetchNote = () => {
  const id = route.params.id
  if (id) {
    const currentNote = copy(allNotes.value).find((item) => item.noteId == id)
    if (currentNote) note.value = currentNote
    else router.replace({ name: 'HomePage' })
  } else note.value = { noteId: uuidv4().substring(19), title: '', tasks: [] }
  watchHistoryLength.value = 1
  setTimeout(() => clear(), 330)
}

/** save Note and rerouting to the note:id page*/
const saveNote = async () => {
  showSaveModal.value = true
  setTimeout(() => {
    watchHistoryLength.value = history.value.length
    store.dispatch('notes/updateNotes', note.value)
    !route.params.id && router.replace(`/note/${note.value.noteId}`)
  }, 300)
}

/** delete Note and rerouting to the main page*/
const deleteNote = () => {
  store.dispatch('notes/deleteNote', note.value)
  watchHistoryLength.value = history.value.length
  showDeleteModal.value = false
  router.replace({ name: 'HomePage' })
}

/** add task in Note */
const addTask = () => {
  note.value.tasks.unshift({ id: uuidv4().substring(19), text: '', completed: false })
}

/** delete task in Note */
const deleteTask = (id) => {
  note.value.tasks = note.value.tasks.filter((task) => task.id !== id)
}

/** set CTRL-Z CTRL-Y keys for undo/redo */
const KEY_DOWN = (event) => keyDown(event, undo, redo)

onMounted(() => {
  fetchNote()
  window.scrollTo({ top: 0 })

  /** set CTRL-Z CTRL-Y keys for undo/redo */
  document.addEventListener('keydown', KEY_DOWN)
  document.addEventListener('keyup', keyUp)
})

onUnmounted(() => {
  document.removeEventListener('keydown', KEY_DOWN)
  document.removeEventListener('keyup', keyUp)
})

/** rerouting to HomePage, when delete on mainPage in new tab */
watch(
  allNotes,
  (v) => {
    const id = route.params.id
    if (id && !v.some((note) => note.noteId == id)) router.replace({ name: 'HomePage' })
  },
  { deep: true }
)

/** update Note when rerouting */
watch(route, fetchNote, { deep: true })

/** get modal warning, when rerouting from the page */
onBeforeRouteLeave(async () => {
  if (watchHistoryLength.value !== history.value.length) {
    showLeaveModal.value = true
    const res = await modalPromise(confirm, showLeaveModal)
    showLeaveModal.value = false
    return res ? true : false
  }
})

provide('note', { note, addTask, deleteTask })
</script>

<template>
  <div class="container w-full">
    <div v-if="error" class="font-body" style="color: red">
      Ошибка при загрузке страницы ({{ error }})
    </div>
    <div v-else>
      <div class="flex flex-col items-center font-body">
        <h2 class="font-bold text-xl mb-2 leading-8">Название заметки:</h2>
        <div class="flex flex-col gap-y-2 items-center sm:items-start text-lg w-full">
          <item-title class="w-full" />
          <div class="flex gap-x-1">
            <icon-btn
              type="undo"
              color="rgb(53 53 53)"
              classList="md-36"
              title="Undo"
              :disabled="!canUndo"
              @click="undo"
            />
            <icon-btn
              type="redo"
              color="rgb(53 53 53)"
              classList="md-36"
              title="Redo"
              :disabled="!canRedo"
              @click="redo"
            />
          </div>
        </div>
      </div>
      <hr class="mt-4 mb-6 border-slate-400" />
      <div class="flex flex-col items-center font-body w-full">
        <item-tasks />
      </div>
      <hr class="mt-4 mb-6 border-slate-400" />
      <div class="flex gap-x-3">
        <icon-btn
          type="save"
          color="rgb(23 209 64)"
          classList="md-44"
          title="Сохранить заметку"
          @click="saveNote"
        />
        <icon-btn
          type="delete"
          color="#f93333"
          classList="md-44"
          title="Удалить заметку"
          @click="() => (showDeleteModal = true)"
        />
      </div>
    </div>
  </div>

  <modal-window :show="showSaveModal" @close="() => (showSaveModal = false)">
    <template v-slot:title>
      <h3 class="modal-title">Успешно</h3>
    </template>
    <template v-slot:body>
      <div class="modal-content">Заметка с задачами сохранена в списке заметок</div>
    </template>
    <template v-slot:footer>
      <div class="modal-footer">
        <button class="modal-footer__button" @click.self="showSaveModal = false">Ок</button>
      </div>
    </template>
  </modal-window>

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

  <modal-window
    :show="showLeaveModal"
    @close="() => (showLeaveModal = false)"
    @confirm="() => (confirm = !confirm)"
  >
    <template v-slot:title>
      <h3 class="delete-title">Действительно хотите покинуть страницу?</h3>
    </template>
    <template v-slot:body>
      <div class="modal-content">Не сохраненные данные будут потеряны!</div>
    </template>
  </modal-window>
</template>

<style lang="scss" scoped>
@media (min-width: 430px) {
  .container {
    width: 60vw;
  }
}

.delete-title {
  color: red;
}
</style>
../functions/modalPromise.js
