import React, { FormEvent } from 'react'
import { Assign } from 'utility-types'
import { Switch as BpSwitch, ISwitchProps } from '@blueprintjs/core'
import { omit } from 'lodash-es'
import { StyledProps, omitStyledProps, styledClasses } from '../../styled-props/StyledProps'
import styledClass from '../../styled-props/StyledProps.css'

import css from './Switch.css'
import { HarnessDocTooltip } from '../../frameworks/Tooltip/Tooltip'
import type { TooltipRenderProps } from '../../frameworks/Tooltip/types'

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
      labelElement={<HarnessDocTooltip labelText={label} {...tooltipProps} className={css.inlineTooltip} />}
      {...omitStyledProps(omit(props, ['tooltipProps', 'label']))}
      className={styledClasses(props, styledClass.font, css.switch, className)}
    />
  )
}
