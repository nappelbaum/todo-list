export default class LocalStorage {
  static setNotes(notes) {
    if (notes.length) localStorage.setItem('notes', JSON.stringify(notes))
    else LocalStorage.deleteNotes()
  }

  static deleteNotes() {
    localStorage.removeItem('notes')
  }

  static getNotes() {
    try {
      if (localStorage.getItem('notes')) {
        return JSON.parse(localStorage.getItem('notes'))
      } else {
        return []
      }
    } catch (err) {
      return err.message
    }
  }
}
