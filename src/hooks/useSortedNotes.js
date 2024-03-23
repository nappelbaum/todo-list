import { computed, ref } from 'vue'
import copy from '@/functions/noMutCopy'
import LocalStorage from '../dataServices/LocalStorage'

export default function useSortedNotes(notes) {
  const selectedSort = ref(LocalStorage.getSort())

  const sortOptions = [
    { value: 'title', name: 'По названию' },
    { value: 'tasks', name: 'По количеству задач' }
  ]

  const sortedNotes = computed(() => {
    if (selectedSort.value) {
      return copy(notes.value).sort((note1, note2) => {
        return selectedSort.value == 'tasks'
          ? note1.tasks.length - note2.tasks.length
          : note1.title.localeCompare(note2.title)
      })
    } else return copy(notes.value)
  })

  return {
    selectedSort,
    sortOptions,
    sortedNotes
  }
}
