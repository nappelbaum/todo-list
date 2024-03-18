<script setup>
import { inject } from 'vue'
import IconBtn from './IconBtn.vue'
import ItemTask from './ItemTask.vue'
import { v4 as uuidv4 } from 'uuid'
import debounce from 'lodash.debounce'

const note = inject('note')

const addTask = debounce(() => {
  note.value.tasks.unshift({ id: uuidv4().substring(19), text: '', completed: false })
}, 300)

const deleteTask = debounce((id) => {
  const i = note.value.tasks.findIndex((task) => task.id === id)
  note.value.tasks.splice(i, 1)
}, 300)

const onChangeTextInput = debounce((index, value) => {
  note.value.tasks[index].text = value
}, 300)
</script>

<template>
  <div class="flex w-full items-center mb-2 py-1 px-3 bg-gray-200 rounded-md" @click="addTask">
    <icon-btn type="add" color="rgb(62 63 71)" classList="md-30" />
    <div class="ml-2 cursor-pointer">Добавить задачу</div>
  </div>
  <transition-group tag="ul" name="tasks" class="w-full">
    <li
      v-for="(task, index) in note.tasks"
      :key="task.id"
      class="flex gap-x-2 items-center mb-2 py-2 px-3 bg-gray-200 rounded-md"
    >
      <ItemTask
        :task="task"
        :index="index"
        v-model:completed="task.completed"
        @deleteTask="deleteTask"
        @onChangeTextInput="onChangeTextInput"
      />
    </li>
  </transition-group>
</template>

<style lang="scss" scoped>
.tasks-enter-active,
.tasks-move {
  transition: 0.4s ease all;
}

.tasks-enter-from,
.tasks-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.tasks-leave-active {
  transition: 0.4s ease all;
  position: absolute;
}
</style>
