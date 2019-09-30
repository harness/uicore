import css from './StyledProps.css'
import { Intent } from './Intent'
import { Spacing } from './Spacing'

/**
 * Styled Props: Define reusable styles across components.
 * Inspired by https://styled-system.com/theme-specification
 */
interface StyledProps {
  /** Component intent */
  intent?: Intent

  /** Make text bold */
  bold?: boolean

  /** Render component as inline block */
  inline?: boolean

  /** Mark component as being muted. Usually used for text */
  muted?: boolean

  /** Set font family to mono. Ussually used in for code or snippet */
  mono?: boolean

  /** Component font size */
  fontSize?: Spacing

  /** Component spacing. Usually used for layouts */
  spacing?: Spacing
}

export function classFromStyledProps(props: StyledProps, className?: string) {
  const classNames = []

  if (className) {
    classNames.push(className)
  }

  switch (props.intent) {
    case Intent.PRIMARY:
      classNames.push(css.primary)
      break
    case Intent.SUCCESS:
      classNames.push(css.success)
      break
    case Intent.WARNING:
      classNames.push(css.warning)
      break
    case Intent.DANGER:
      classNames.push(css.danger)
      break
  }

  if (props.bold) {
    classNames.push(css.bold)
  }

  if (props.mono) {
    classNames.push(css.mono)
  }

  if (props.inline) {
    classNames.push(css.inline)
  }

  if (props.fontSize) {
    classNames.push(css.fontSize)

    switch (props.fontSize) {
      case Spacing.XSMALL:
        classNames.push(css.xsmall)
        break
      case Spacing.SMALL:
        classNames.push(css.small)
        break
      case Spacing.MEDIUM:
        classNames.push(css.medium)
        break
      case Spacing.LARGE:
        classNames.push(css.large)
        break
      case Spacing.XLARGE:
        classNames.push(css.xlarge)
        break
      case Spacing.XXLARGE:
        classNames.push(css.xxlarge)
        break
      case Spacing.XXXLARGE:
        classNames.push(css.xxxlarge)
        break
      case Spacing.HUGE:
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
      case Spacing.XSMALL:
        classNames.push(css.xsmall)
        break
      case Spacing.SMALL:
        classNames.push(css.small)
        break
      case Spacing.MEDIUM:
        classNames.push(css.medium)
        break
      case Spacing.LARGE:
        classNames.push(css.large)
        break
      case Spacing.XLARGE:
        classNames.push(css.xlarge)
        break
      case Spacing.XXLARGE:
        classNames.push(css.xxlarge)
        break
      case Spacing.XXXLARGE:
        classNames.push(css.xxxlarge)
        break
      case Spacing.HUGE:
        classNames.push(css.huge)
        break
    }
  }

  return classNames.join(' ')
}

export { StyledProps }
