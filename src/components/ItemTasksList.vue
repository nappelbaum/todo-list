<script setup>
import { inject } from 'vue'
import IconBtn from './IconBtn.vue'
import ItemTask from './ItemTask.vue'
import { v4 as uuidv4 } from 'uuid'
import debounce from 'lodash.debounce'

const note = inject('note')

const addTask = () => {
  note.value.tasks.push({ id: uuidv4().substring(19), text: '', completed: false })
}
const deleteTask = (id) => {
  const i = note.value.tasks.findIndex((task) => task.id === id)
  note.value.tasks.splice(i, 1)
}

const onChangeTextInput = debounce((task, e) => {
  note.value.tasks[note.value.tasks.indexOf(task)].text = e.target.value
}, 300)
</script>

<template>
  <ul class="w-full">
    <li
      v-for="task in note.tasks"
      :key="task.id"
      class="flex gap-x-2 items-center mb-2 py-2 px-3 bg-gray-200 rounded-md"
    >
      <ItemTask
        :task="task"
        v-model:completed="task.completed"
        @deleteTask="deleteTask"
        @onChangeTextInput="onChangeTextInput"
      />
    </li>
  </ul>
  <div class="flex w-full items-center py-1 px-3 bg-gray-200 rounded-md" @click="addTask">
    <icon-btn type="add" color="rgb(62 63 71)" classList="md-30" />
    <div class="ml-2 cursor-pointer">Добавить задачу</div>
  </div>
</template>
