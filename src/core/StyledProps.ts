import css from './StyledProps.css'
import { Intent } from './Intent'
import { Spacing } from './Spacing'
import { KVO } from './Types'

const StyledPropKeys = [
  'intent',
  'font',
  'bold',
  'muted',
  'mono',
  'inline',
  'flex',
  'flexAlign',
  'flexDistribution',
  'border',
  'margin',
  'padding',
  'textAlign'
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

  /** Component flex layout. Use in commbination with flexAlign and flexDistribution */
  flex?: boolean

  /** Component children flex layout content alignment (Note: Not everything below is implemented) */
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

  /** Component border */
  border?: boolean

  /** Component margin. Usually used for containers */
  margin?: Spacing

  /** Component padding. Usually used for containers */
  padding?: Spacing

  /** Component children */
  children: React.ReactNode
}

/** Generate classes from styled props */
export function styledClasses(props: StyledProps, className?: string) {
  const classNames = []

  classNames.push(css.default, className)
  classNames.push(props.intent && css.intent, props.intent && css[props.intent])
  classNames.push(props.inline && css.inline)
  classNames.push(props.border && css.border)

  if (props.font || props.bold || props.mono || props.muted) {
    classNames.push(css.font, props.font && css[props.font])
    classNames.push(props.mono && css.mono)
    classNames.push(props.bold && css.bold)
    classNames.push(props.muted && css.muted)
  }

  if (props.flex) {
    classNames.push(css.flex)
    classNames.push(props.inline && css.inline)
    classNames.push(props.flexAlign && css[props.flexAlign])
    classNames.push(props.flexDistribution && css[props.flexDistribution])
  }

  if (props.padding) {
    classNames.push(css.padding, css['p-' + props.padding])
  }

  if (props.margin) {
    classNames.push(css.margin, css['m-' + props.margin])
  }

  return classNames.filter(e => !!e).join(' ')
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
