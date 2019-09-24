import css from './StyledProps.css'

import Intent from './Intent'
import Spacing from './Spacing'

export interface StyledProps {
  /** Component intent */
  intent?: Intent

  /** Make text bold */
  bold?: boolean

  /** Render component as inline block */
  inline?: boolean

  /** Mark component as being muted. Usually used for text */
  muted?: boolean

  /** Component font size */
  fontSize?: Spacing

  /** Component spacing */
  spacing?: Spacing
}

export function classFromProps(props: StyledProps, className?: string) {
  const classNames = []

  if (className) {
    classNames.push(className)
  }

  switch (props.intent) {
    case 'primary':
      classNames.push(css.primary)
      break
    case 'success':
      classNames.push(css.success)
      break
    case 'warning':
      classNames.push(css.warning)
      break
    case 'danger':
      classNames.push(css.danger)
      break
  }

  if (props.bold) {
    classNames.push(css.bold)
  }

  if (props.inline) {
    classNames.push(css.inline)
  }

  if (props.fontSize) {
    classNames.push(css.fontSize)

    switch (props.fontSize) {
      case 'xsmall':
        classNames.push(css.xsmall)
        break
      case 'small':
        classNames.push(css.small)
        break
      case 'medium':
        classNames.push(css.medium)
        break
      case 'large':
        classNames.push(css.large)
        break
      case 'xlarge':
        classNames.push(css.xlarge)
        break
      case 'xxlarge':
        classNames.push(css.xxlarge)
        break
      case 'xxxlarge':
        classNames.push(css.xxxlarge)
        break
      case 'huge':
        classNames.push(css.huge)
        break
    }
  }

  if (props.muted) {
    classNames.push(css.muted)
  }

  if (props.spacing) {
    classNames.push(css.spacing)

    switch (props.spacing) {
      case 'xsmall':
        classNames.push(css.xsmall)
        break
      case 'small':
        classNames.push(css.small)
        break
      case 'medium':
        classNames.push(css.medium)
        break
      case 'large':
        classNames.push(css.large)
        break
      case 'xlarge':
        classNames.push(css.xlarge)
        break
      case 'xxlarge':
        classNames.push(css.xxlarge)
        break
      case 'xxxlarge':
        classNames.push(css.xxxlarge)
        break
      case 'huge':
        classNames.push(css.huge)
        break
    }
  }

  return classNames.join(' ')
}
