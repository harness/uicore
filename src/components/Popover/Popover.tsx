import React from 'react'
import { Popover as BPopover } from '@blueprintjs/core'

export interface PopoverProps extends React.ComponentProps<typeof BPopover> {
  /** If true, render BPopover in dark background and light font color */
  isDark?: boolean

  /** Popover target element */
  children?: React.ReactNode

  /** data-tooltip-id to be attached and used by docs team */
  dataTooltipId?: string
}

export function Popover(props: PopoverProps) {
  return <BPopover {...props} />
}
