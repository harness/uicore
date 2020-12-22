import { Assign } from 'utility-types'
import { StyledProps, omitStyledProps, styledClasses } from '../../styled-props/StyledProps'
import { Switch as BpSwitch, ISwitchProps } from '@blueprintjs/core'
import React, { FormEvent } from 'react'
import styledClass from '../../styled-props/StyledProps.css'

import css from './Switch.css'

export interface SwitchProps extends Assign<Omit<ISwitchProps, 'onChange'>, StyledProps> {
  /** onChange event handler */
  onChange?: (event: FormEvent<HTMLInputElement>) => void

  /** className to be appended to default className */
  className?: string
}

export function Switch(props: SwitchProps) {
  const { className = '', onChange } = props

  return (
    <BpSwitch
      {...omitStyledProps(props)}
      onChange={onChange}
      className={styledClasses(props, styledClass.font, css.switch, className)}
    />
  )
}
