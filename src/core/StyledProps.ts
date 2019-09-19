import Intent from './Intent'
import styles from './StyledProps.css'

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
  fontSize?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge'
}

export function classFromProps(props: StyledProps, className?: string) {
  const classNames = []

  if (className) {
    classNames.push(className)
  }

  switch (props.intent) {
    case 'primary':
      classNames.push(styles.primary)
      break
    case 'success':
      classNames.push(styles.success)
      break
    case 'warning':
      classNames.push(styles.warning)
      break
    case 'danger':
      classNames.push(styles.danger)
      break
  }

  if (props.bold) {
    classNames.push(styles.bold)
  }

  if (props.inline) {
    classNames.push(styles.inline)
  }

  if (props.fontSize) {
    classNames.push(styles.fontSize)

    switch (props.fontSize) {
      case 'small':
        classNames.push(styles.small)
        break
      case 'medium':
        classNames.push(styles.medium)
        break
      case 'large':
        classNames.push(styles.large)
        break
      case 'xlarge':
        classNames.push(styles.xlarge)
        break
      case 'xxlarge':
        classNames.push(styles.xxlarge)
        break
      case 'xxxlarge':
        classNames.push(styles.xxxlarge)
        break
    }
  }

  if (props.muted) {
    classNames.push(styles.muted)
  }

  return classNames.join(' ')
}
