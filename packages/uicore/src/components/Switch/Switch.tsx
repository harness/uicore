/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { FormEvent } from 'react'
import { Switch as BpSwitch, ISwitchProps } from '@blueprintjs/core'
import { omit } from 'lodash-es'
import { StyledProps, omitStyledProps, styledClasses } from '@harnessio/design-system'
import { styledClass } from '@harnessio/design-system'

import css from './Switch.css'
import { HarnessDocTooltip } from '../../frameworks/Tooltip/Tooltip'
import type { TooltipRenderProps } from '../../frameworks/Tooltip/types'

export interface SwitchProps extends Omit<ISwitchProps, 'onChange'>, StyledProps {
  /** onChange event handler */
  onChange?: (event: FormEvent<HTMLInputElement>) => void

  /** className to be appended to default className */
  className?: string

  /** props for adding documentation tooltip */
  tooltipProps?: TooltipRenderProps
}

export function Switch(props: SwitchProps): React.ReactElement {
  const { className = '', tooltipProps, label } = props

  return (
    <BpSwitch
      labelElement={<HarnessDocTooltip labelText={label} {...tooltipProps} className={css.inlineTooltip} />}
      {...omitStyledProps(omit(props, ['tooltipProps', 'label']))}
      className={styledClasses(props, styledClass.font, css.switch, className)}
    />
  )
}
