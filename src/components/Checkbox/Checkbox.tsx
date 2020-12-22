import { Assign } from 'utility-types'
import { Checkbox as BpCheckbox, ICheckboxProps } from '@blueprintjs/core'
import { StyledProps, omitStyledProps, styledClasses } from '../../styled-props/StyledProps'
import React, { FormEvent } from 'react'
import styledClass from '../../styled-props/StyledProps.css'

import css from './Checkbox.css'

export interface CheckboxProps extends Assign<Omit<ICheckboxProps, 'onChange'>, StyledProps> {
  /** onChange event handler */
  onChange?: (event: FormEvent<HTMLInputElement>) => void

  /** className to be appended to default className */
  className?: string
}

export function Checkbox(props: CheckboxProps) {
  const { className = '', onChange } = props

  return (
    <BpCheckbox
      {...omitStyledProps(props)}
      onChange={onChange}
      className={styledClasses(props, styledClass.font, css.checkbox, className)}
    />
  )
}
