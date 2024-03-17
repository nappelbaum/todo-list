let ctrlDown = false

export const keyDown = (event, undo, redo) => {
  if (event.code == 'ControlLeft') ctrlDown = true
  if (ctrlDown && event.code == 'KeyZ') {
    event.preventDefault()
    undo()
  }
  if (ctrlDown && event.code == 'KeyY') {
    event.preventDefault()
    redo()
  }
}

export const keyUp = (event) => {
  if (event.code == 'ControlLeft') ctrlDown = false
}
