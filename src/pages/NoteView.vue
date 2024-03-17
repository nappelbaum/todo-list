<script setup>
import { computed, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import store from '@/store'
import copy from '../functions/noMutCopy'
import { keyDown, keyUp } from '../functions/keyDownUp'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import ItemTitle from '../components/ItemTitle.vue'
import ItemTasks from '../components/ItemTasksList.vue'
import IconBtn from '../components/IconBtn.vue'
import ModalWindow from '../components/ModalWindow.vue'

const note = ref({ noteId: uuidv4().substring(19), title: '', tasks: [] })
const noteHistory = ref([])
const historyIndex = ref(0)
const watching = ref(true)
const historyLengthOnSave = ref(1)
const showSaveModal = ref(false)
const showDeleteModal = ref(false)
const showLeaveModal = ref(false)
const confirm = ref(true)
const route = useRoute()
const router = useRouter()

const allNotes = computed(() => store.getters.allNotes)
const error = computed(() => store.getters.notesErr)

/** check Note in store and update it */
const fetchNote = () => {
  const id = route.params.id
  if (id) {
    const allNotesNM = copy(allNotes.value)
    const currentNote = allNotesNM.find((item) => item.noteId == id)
    if (currentNote) note.value = currentNote
    else router.replace({ name: 'HomePage' })
  } else note.value = { noteId: uuidv4().substring(19), title: '', tasks: [] }
  noteHistory.value.length = 0
  historyIndex.value = 0
  watching.value = true
  historyLengthOnSave.value = 1
}

/** save Note and rerouting to the note:id page*/
const saveNote = () => {
  showSaveModal.value = true
  historyLengthOnSave.value = noteHistory.value.length
  setTimeout(() => {
    store.dispatch('updateNotes', note.value)
    !route.params.id && router.replace(`/note/${note.value.noteId}`)
  }, 300)
}

/** delete Note and rerouting to the main page*/
const deleteNote = () => {
  store.dispatch('deleteNote', note.value)
  showDeleteModal.value = false
  router.replace({ name: 'HomePage' })
}

/** undo and get noteHistory */
const undo = () => {
  watching.value = false
  if (historyIndex.value > 0) {
    historyIndex.value--
    note.value = copy(noteHistory.value[historyIndex.value])
  }
}

/** redo and get noteHistory */
const redo = () => {
  watching.value = false
  if (historyIndex.value < noteHistory.value.length - 1) {
    historyIndex.value++
    note.value = copy(noteHistory.value[historyIndex.value])
  }
}

/** set CTRL-Z keys */
const KEY_DOWN = (event) => keyDown(event, undo, redo)

onMounted(() => {
  window.scrollTo({ top: 0 })
  fetchNote()

  /** set CTRL-Z keys */
  document.addEventListener('keydown', KEY_DOWN)
  document.addEventListener('keyup', keyUp)
})

onUnmounted(() => {
  document.removeEventListener('keydown', KEY_DOWN)
  document.removeEventListener('keyup', keyUp)
})

/** update noteHistory */
watch(
  note,
  (v) => {
    if (watching.value) {
      if (historyIndex.value !== noteHistory.value.length - 1)
        noteHistory.value.splice(historyIndex.value + 1)
      if (noteHistory.value.length > 150) noteHistory.value.shift()
      noteHistory.value.push(copy(v))
      historyIndex.value = noteHistory.value.length - 1
    } else {
      watching.value = true
    }
  },
  { deep: true }
)

/** update Note when delete on mainPage in new tab */
watch(
  allNotes,
  (v) => {
    const currentIndex = v.findIndex((note) => note.noteId == route.params.id)
    if (currentIndex == -1) fetchNote()
  },
  { deep: true }
)

/** update Note when delete on mainPage in new tab */
watch(route, fetchNote, { deep: true })

/** promise for modal window */
const modalPromise = (showModal) => {
  return new Promise((resolve) => {
    watch(confirm, () => {
      resolve('resolve')
    })
    watch(showModal, () => {
      resolve('')
    })
  })
}

/** safe rerouting from the page */
onBeforeRouteLeave(async () => {
  if (historyLengthOnSave.value < noteHistory.value.length) {
    showLeaveModal.value = true
    const res = await modalPromise(showLeaveModal)
    showLeaveModal.value = false
    if (res === 'resolve') return true
    else return false
  }
})

provide('note', note)
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
              :disabled="!(historyIndex > 0)"
              @click="undo"
            />
            <icon-btn
              type="redo"
              color="rgb(53 53 53)"
              classList="md-36"
              title="Redo"
              :disabled="!(historyIndex < noteHistory.length - 1)"
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
