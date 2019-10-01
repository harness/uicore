import css from './StyledProps.css'
import { Intent } from './Intent'
import { Spacing } from './Spacing'

const StyledPropKeys = [
  'intent',

  'inline',

  'fontSize',
  'bold',
  'muted',
  'mono',

  'spacing',

  'flex',
  'flexAlign',
  'flexDistribution'
]

/**
 * Styled Props: Define reusable styles across components.
 * Inspired by https://styled-system.com/theme-specification
 */
export interface StyledProps {
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
  font?: Spacing

  /** Component spacing. Usually used for layouts */
  spacing?: Spacing

  /** Component flex layout. Use in commbination with flexAlign and flexDistribution */
  flex?: boolean

  /** Component children flex layout content alignment */
  flexAlign?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'center-left'
    | 'center-center'
    | 'center-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'

  /** Component children flex layout content distribution */
  flexDistribution?: 'space-between'
}

/** Generate classes from styled props */
export function classFromStyledProps(props: StyledProps, className?: string) {
  const classNames = []

  classNames.push(className)
  classNames.push(props.intent && css.intent, props.intent && css[props.intent])
  classNames.push(props.inline && css.inline)

  if (props.font || props.bold || props.mono || props.muted) {
    classNames.push(css.font)
    classNames.push(props.mono && css.mono)
    classNames.push(props.bold && css.bold)
    classNames.push(props.muted && css.muted)
  }

  if (props.spacing) {
    classNames.push(css.spacing, css[props.spacing])
  }

  if (props.flex) {
    classNames.push(css.flex)
    classNames.push(props.inline && css.inline)
    classNames.push(props.flexAlign && css[props.flexAlign])
    classNames.push(props.flexDistribution && css[props.flexDistribution])
  }

  return classNames.filter(e => !!e).join(' ')
}

export interface KVO<T = any> {
  [key: string]: T
}

/** Return all props that are not styled props */
export function omitStyledProps(props: KVO): KVO {
  return Object.keys(props)
    .filter(key => !StyledPropKeys.includes(key))
    .reduce((obj: KVO, key) => {
      obj[key] = props[key]
      return obj
    }, {})
}
