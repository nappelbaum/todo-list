import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import NoteView from '../pages/NoteView.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/note',
    name: 'NoteView',
    component: NoteView
  },
  {
    path: '/note/:id',
    name: 'NoteEdit',
    component: NoteView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
