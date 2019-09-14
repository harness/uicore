import { MouseEvent, KeyboardEvent } from 'react'
import copy from 'clipboard-copy'

function stopEvent(event: MouseEvent | KeyboardEvent): void {
  event.stopPropagation()
  event.preventDefault()
}

export default {
  stopEvent,
  copy
}
