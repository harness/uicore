import React from 'react'
import { Popover as BPopover } from '@blueprintjs/core'
import { Popover2, Popover2Props } from '@blueprintjs/popover2'

export interface PopoverProps extends React.ComponentProps<typeof BPopover> {
  /** If true, render BPopover in dark background and light font color */
  isDark?: boolean

  /** Popover target element */
  children?: React.ReactNode

  /** data-tooltip-id to be attached and used by docs team */
  dataTooltipId?: string

  /** Use Popover2. Popover is deprecated and has issue with micro-frontend, @see https://bit.ly/30Dbgvq */
  usePopover2?: boolean
}

export function Popover(props: PopoverProps | Popover2Props) {
  if ((props as PopoverProps).usePopover2) {
    return <Popover2 {...(props as Popover2Props)} />
  } else {
    return <BPopover {...(props as PopoverProps)} />
  }
}
