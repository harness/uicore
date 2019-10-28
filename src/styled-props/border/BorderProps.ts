import { Color } from 'core/Color'

export interface BorderProps {
  top?: boolean
  right?: boolean
  bottom?: boolean
  left?: boolean
  color?: Color

  /* TODO: Support border-width, border-style, border-radius, etc... */
  style?: string
  width?: number
  radius?: number
}
