import LocalStorage from '../../dataServices/LocalStorage'

export default {
  actions: {
    fetchNotes({ commit }) {
      const getData = LocalStorage.getNotes()
      commit('FETCH_NOTES', getData)
    },
    updateNotes({ commit }, note) {
      commit('UPDATE_NOTES', note)
    },
    deleteNote({ commit }, note) {
      commit('DELETE_NOTE', note)
    }
  },
  mutations: {
    FETCH_NOTES(state, getData) {
      Array.isArray(getData) ? (state.notes = getData) : (state.notesErr = getData)
    },
    UPDATE_NOTES(state, note) {
      const noteNoMut = JSON.parse(JSON.stringify(note))
      const currentIndex = state.notes.findIndex((item) => item.noteId === noteNoMut.noteId)
      if (currentIndex < 0) {
        state.notes.unshift(noteNoMut)
      } else state.notes[currentIndex] = noteNoMut
      LocalStorage.setNotes(state.notes)
    },
    DELETE_NOTE(state, note) {
      const currentIndex = state.notes.findIndex((item) => item.noteId === note.noteId)
      if (currentIndex < 0) return
      else state.notes.splice(currentIndex, 1)
      LocalStorage.setNotes(state.notes)
    }
  },
  state: {
    notes: [],
    notesErr: ''
  },
  getters: {
    allNotes(state) {
      return state.notes
    },
    notesErr(state) {
      return state.notesErr
    }
  },
  namespaced: true
}
