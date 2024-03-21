<script setup>
import NavBar from './components/NavBar.vue'
import MyFooter from './components/MyFooter.vue'
import store from './store'
import { onMounted, onUnmounted } from 'vue'

const fetchNotes = () => {
  store.dispatch('notes/fetchNotes')
}

onMounted(() => {
  fetchNotes()
  window.addEventListener('storage', fetchNotes)
})

onUnmounted(() => {
  window.removeEventListener('storage', fetchNotes)
})
</script>

<template>
  <NavBar />
  <main class="mx-auto my-12 max-w-7xl px-3 sm:px-6 lg:px-12">
    <router-view></router-view>
  </main>
  <MyFooter class="mt-auto" />
</template>

<style>
a:hover {
  opacity: 0.7;
  transition: opacity 0.3s;
}

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

.material-symbols-outlined.md-30 {
  font-size: 30px;
}
.material-symbols-outlined.md-36 {
  font-size: 36px;
}
.material-symbols-outlined.md-44 {
  font-size: 44px;
}
.material-symbols-outlined.md-42 {
  font-size: 42px;
}
</style>
