import { MouseEvent } from 'react'

function stopEvent(event: MouseEvent): void {
  event.stopPropagation()
  event.preventDefault()
  console.log('Doing nothign')
}

export default {
  stopEvent
}
