import css from './StyledProps.css'
import { Intent } from '../core/Intent'
import { Spacing } from '../core/Spacing'
import { Color } from '../core/Color'
import { KVO, Position } from '../core/Types'

/**
 * Styled Props: Define reusable styles across components.
 * Inspired by https://styled-system.com/theme-specification
 */
export interface StyledProps {
  /** Component intent */
  intent?: Intent

  /** Component margin. Usually used for containers */
  margin?: Spacing

  /** Component padding. Usually used for containers */
  padding?: Spacing

  /** Component font size */
  font?: Spacing

  /** Make text bold */
  bold?: boolean

  /** Make text italic */
  italic?: boolean

  /** Render component as inline block */
  inline?: boolean

  /** Set font family to mono. Ussually used in for code or snippet */
  mono?: boolean

  /** Text color */
  color?: Color

  /** Background color */
  background?: Color

  /** Text align */
  textAlign?: 'center' | 'right'

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

  /**
   * Component border. Support three variations
   *  border={true}            => all borders
   *  border="top"             => top border
   *  border={['top', 'left']} => top and left borders
   */
  border?: boolean | Position | Position[]

  /** Border color */
  borderColor?: Color

  /** Component children */
  children: React.ReactNode
}

/** Generate classes from styled props */
export function styledClasses(props: StyledProps, ...classes: string[]) {
  const classNames = new Set(classes)

  classNames.add(css.main)

  Object.keys(props).forEach(name => {
    // Add the main css class of the prop
    // props.flex => css.flex
    classNames.add(css[name])

    // When bold/mono is specified and font is not, add font
    if ((props.bold || props.mono) && !props.font) {
      classNames.add(css.font)
    }

    // Add the actual value class of the props
    // props.border="top" => css.['border-top']
    const value = (props as KVO)[name]

    if (Array.isArray(value)) {
      value.forEach(val => classNames.add(css[`${name}-${val}`]))
    } else {
      classNames.add(css[`${name}-${value}`])
    }
  })

  return Array.from(classNames)
    .filter(e => !!e)
    .join(' ')
}

/*
  List of styled props to loop through as you won't be
  able to do that with TypeScript type/inteface fields.
*/
const PropsList = [
  'intent',
  'margin',
  'padding',
  'font',
  'bold',
  'italic',
  'inline',
  'mono',
  'color',
  'background',
  'textAlign',
  'border',
  'borderColor',
  'flex',
  'flexAlign',
  'flexDistribution'
]

/** Return all props that are not styled props */
export function omitStyledProps(props: KVO): KVO {
  return Object.keys(props)
    .filter(key => !PropsList.includes(key))
    .reduce((obj: KVO, key) => {
      obj[key] = props[key]
      return obj
    }, {})
}
