<script setup>
import { ref, nextTick } from 'vue'
import IconBtn from './IconBtn.vue'

const props = defineProps({
  task: Object
})

const text = defineModel('text')
const completed = defineModel('completed')

const emit = defineEmits(['deleteTask'])

const editable = ref(false)
const todoInput = ref(null)

const onClick = async () => {
  if (!props.task.completed) {
    editable.value = true
    await nextTick()
    todoInput.value.focus()
  }
}

const autosize = (e) => {
  e.target.style.height = 'auto'
  e.target.style.height = e.target.scrollHeight + 'px'
}

const onFocus = (e) => {
  editable.value = true
  autosize(e)
}
</script>

<template>
  <textarea
    v-if="editable && !task.completed"
    ref="todoInput"
    v-model="text"
    rows="1"
    type="text"
    class="w-full rounded-sm outline-none py-1 px-3 border-none bg-white overflow-hidden"
    placeholder="Нажмите для редактирования"
    @focus="onFocus"
    @blur="editable = false"
    @input="autosize"
    @keydown.prevent.enter="editable = false"
  ></textarea>

  <span
    v-else
    class="w-full rounded-sm outline-none py-1 px-3 border-none break-all"
    @click="onClick"
    :class="[!task.text && 'text-gray-400', task.completed && 'line-through']"
  >
    {{ task.text ? task.text : 'Нажмите для редактирования' }}
  </span>

  <icon-btn
    type="done"
    :color="task.completed ? '#fff' : 'rgb(141 141 141)'"
    classList="md-30"
    class="relative rounded-md"
    :class="task.completed && 'bg-green-400'"
  >
    <input
      type="checkbox"
      v-model="completed"
      :title="!task.completed ? 'Пометить выполненным' : 'Отменить выделение'"
      class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
    />
  </icon-btn>

  <icon-btn
    type="delete_forever"
    color="#f93333"
    classList="md-30"
    title="Удалить задачу"
    @click="emit('deleteTask', task.id)"
  />
</template>
