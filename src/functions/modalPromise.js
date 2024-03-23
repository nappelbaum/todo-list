import { watch } from 'vue'

const modalPromise = (confirm, showModal) => {
  return new Promise((resolve) => {
    watch(confirm, () => {
      resolve(true)
    })
    watch(showModal, () => {
      resolve(false)
    })
  })
}

export default modalPromise
