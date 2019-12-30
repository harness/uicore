import { MouseEvent, KeyboardEvent } from 'react'
import copy from 'clipboard-copy'
import { Intent } from './Intent'
import { Color } from './Color'

function stopEvent(event: MouseEvent | KeyboardEvent): void {
  event.stopPropagation()
  event.preventDefault()
}

const randomId = () =>
  Math.random()
    .toString(36)
    .substring(2)

function getIntentColors(intent: Intent) {
  const color: Color = 'grey500'
  let backgroundColor: Color = 'white'

  switch (intent) {
    case Intent.PRIMARY:
      backgroundColor = 'blue500'
      break
    case Intent.SUCCESS:
      backgroundColor = 'green500'
      break
    case Intent.WARNING:
      backgroundColor = 'yellow500'
      break
    case Intent.DANGER:
      backgroundColor = 'red500'
      break
  }

  return { color, backgroundColor }
}

const Utils = { stopEvent, copy, randomId, getIntentColors }

export { Utils }
