export type FontSize = 'small' | 'normal' | 'medium' | 'large'

export type FontWeight = 'light' | 'bold' | 'semi-bold'

export type TextAlignment = 'left' | 'center' | 'right'

export interface FontProps {
  size?: FontSize
  mono?: boolean
  italic?: boolean
  weight?: FontWeight
  align?: TextAlignment
}
