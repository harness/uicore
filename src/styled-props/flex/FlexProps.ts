/*
 * Note: Currently only a couple of very basic props are implemented
 */
export interface FlexProps {
  inline?: boolean

  /** Component children flex layout content alignment */
  align?: 'center-center'
  alignItems?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'start'
    | 'end'
    | 'self-start'
    | 'self-end'

  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'start'
    | 'end'
    | 'left'
    | 'right'

  /** Component children flex layout content distribution */
  distribution?: 'space-between'
  flexShrink?: 'inherit' | 'initial' | 'unset' | number
}
