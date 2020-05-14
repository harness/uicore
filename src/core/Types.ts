import { PopoverProps } from '../components/Popover/Popover'

export interface OptionalTooltip {
  /** Optional tooltip */
  tooltip?: JSX.Element | string

  /** Optional props for Popover component used to render tooltip - Usually used to pass dark theme */
  tooltipProps?: PopoverProps
}

// eslint-disable-next-line
export interface KVO<T = any> {
  [key: string]: T
}

export type Position = 'top' | 'right' | 'bottom' | 'left'

// eslint-disable-next-line
export type I18nResourceFunction = (...args: any) => string

export interface I18nResource {
  [key: string]: string | I18nResourceFunction
}
