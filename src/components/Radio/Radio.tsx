import { Assign } from 'utility-types'
import { Radio as BpRadio, RadioGroup as BpRadioGroup, IRadioProps } from '@blueprintjs/core'
import { StyledProps, omitStyledProps, styledClasses } from '../../styled-props/StyledProps'
import React, { FormEvent } from 'react'
import styledClass from '../../styled-props/StyledProps.css'

import css from './Radio.css'

export interface RadioGroupProps extends Assign<Omit<IRadioProps, 'onChange'>, StyledProps> {
  /** onChange event handler */
  onChange?: (event: FormEvent<HTMLInputElement>) => void

  /** className to be appended to default className */
  className?: string

  /** Component children */
  children?: React.ReactNode
}

export interface RadioProps extends Assign<Omit<IRadioProps, 'onChange'>, StyledProps> {
  /** onChange event handler */
  onChange?: (event: FormEvent<HTMLInputElement>) => void

  /** className to be appended to default className */
  className?: string
}

function RadioGroup(props: RadioGroupProps) {
  const { children, className = '', onChange = () => {} } = props
  return (
    <BpRadioGroup
      {...omitStyledProps(props)}
      onChange={onChange}
      className={styledClasses(props, styledClass.font, css.radioGroup, className)}>
      {children}
    </BpRadioGroup>
  )
}

function Radio(props: RadioProps) {
  const { className = '', onChange = () => {} } = props

  return (
    <BpRadio
      {...omitStyledProps(props)}
      onChange={onChange}
      className={styledClasses(props, styledClass.font, css.radio, className)}
    />
  )
}

export { Radio, RadioGroup }
