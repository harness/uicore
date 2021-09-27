import { Assign } from 'utility-types'
import { StyledProps, omitStyledProps, styledClasses } from '../../styled-props/StyledProps'
import { Switch as BpSwitch, ISwitchProps } from '@blueprintjs/core'
import React, { FormEvent } from 'react'
import styledClass from '../../styled-props/StyledProps.css'

import css from './Switch.css'
import { HarnessDocTooltip } from '../../frameworks/Tooltip/Tooltip'
import type { TooltipRenderProps } from '../../frameworks/Tooltip/types'
import { omit } from 'lodash-es'

export interface SwitchProps extends Assign<Omit<ISwitchProps, 'onChange'>, StyledProps> {
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
      labelElement={
        <span>
          {label}
          {tooltipProps ? <HarnessDocTooltip useStandAlone tooltipId={tooltipProps.tooltipId} /> : null}
        </span>
      }
      {...omitStyledProps(omit(props, ['tooltipProps', 'label']))}
      className={styledClasses(props, styledClass.font, css.switch, className)}
    />
  )
}
