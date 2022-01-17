/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { IPopoverProps } from '@blueprintjs/core'
import { Popover as BPopover } from '@blueprintjs/core'

export interface PopoverProps extends IPopoverProps {
  /** If true, render BPopover in dark background and light font color */
  isDark?: boolean

  /** Popover target element */
  children?: React.ReactNode

  /** data-tooltip-id to be attached and used by docs team */
  dataTooltipId?: string
}

export function Popover(props: PopoverProps): React.ReactElement {
  return <BPopover {...props} />
}
