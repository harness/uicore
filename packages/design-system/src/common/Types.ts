/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */
import type { IPopoverProps } from '@blueprintjs/core'

export interface PopoverProps extends IPopoverProps {
  /** If true, render BPopover in dark background and light font color */
  isDark?: boolean

  /** Popover target element */
  children?: React.ReactNode

  /** data-tooltip-id to be attached and used by docs team */
  dataTooltipId?: string
}

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
