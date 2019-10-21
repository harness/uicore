import css from './StyledProps.css'
import { Intent } from '../core/Intent'
import { Spacing } from '../core/Spacing'
import { Color } from '../core/Color'
import { KVO } from '../core/Types'
import { FlexProps } from './flex/FlexProps'
import { BorderProps } from './border/BorderProps'

/**
 * Styled Props: Define reusable styles across components.
 * Inspired by https://styled-system.com/theme-specification
 */
export interface StyledProps {
  /** Component children */
  children: React.ReactNode

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

  /** Text align */
  textAlign?: 'center' | 'right'

  /** Text color */
  color?: Color

  /** Background color */
  background?: Color

  /**
   * Component border. Support boolean (default 1px grey solid) or BorderProps
   *  border={true}
   *  border={{ top: true, color: 'red500' }}
   */
  border?: boolean | BorderProps

  /** Component flex layout */
  flex?: boolean | FlexProps
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
  'textAlign',
  'color',
  'background',
  'border',
  'flex'
]

// Returns if a value is an object
// eslint-disable-next-line
function isObject(value: any) {
  return value && typeof value === 'object' && value.constructor === Object
}

/** Generate classes from styled props */
export function styledClasses(props: StyledProps, ...classes: string[]) {
  const classNames = new Set(classes)

  classNames.add(css.main)

  Object.keys(props).forEach(name => {
    if (!PropsList.includes(name)) {
      return
    }

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
      // Prop is passed as array, like `border`
      // border={['top', 'bottom']}
      value.forEach(val => classNames.add(css[`${name}-${val}`]))
    } else if (isObject(value)) {
      // Prop is passed as object, like `flex`
      // flex={{ inline: true, align: 'center-center', distribution: 'space-between' }}
      // Note: Complex types are not supported for 2nd level value (val below)
      //    flex={{ inline: true, align: 'center-center '}}
      // Not:
      //    flex={{ inline: true, align: { another object level } }}
      Object.entries(value).forEach(([prop, val]) => {
        classNames.add(css[`${name}-${prop}`]) // 'flex-align'
        classNames.add(css[`${name}-${prop}-${val}`]) // 'flex-align-center-center'
      })
    } else {
      classNames.add(css[`${name}-${value}`])
    }
  })

  return Array.from(classNames)
    .filter(e => !!e)
    .join(' ')
}

/** Return all props that are not styled props */
export function omitStyledProps(props: KVO): KVO {
  return Object.keys(props)
    .filter(key => !PropsList.includes(key))
    .reduce((obj: KVO, key) => {
      obj[key] = props[key]
      return obj
    }, {})
}
