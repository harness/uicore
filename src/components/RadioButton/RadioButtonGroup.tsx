import React, { ReactElement } from 'react'
import { RadioGroup as BpRadioGroup, IRadioGroupProps, IOptionProps } from '@blueprintjs/core'
import { omitStyledProps, styledClasses, StyledProps } from '../../styled-props/StyledProps'

import styledClass from '../../styled-props/StyledProps.css'
import css from './RadioButton.css'

export type RadioButtonGroupProps = IRadioGroupProps & StyledProps & { options: IOptionProps[] }
export function RadioButtonGroup({
  options,
  className = '',
  inline = false,
  ...props
}: RadioButtonGroupProps): ReactElement {
  // map over all options to add `Radio` styling
  options = options.map(option => ({
    ...option,
    className: styledClasses(styledClass.font, css.radio, option.className || '')
  }))

  return (
    <BpRadioGroup
      {...(omitStyledProps(props) as IRadioGroupProps)}
      inline={inline}
      className={styledClasses(props, styledClass.font, css.radioGroup, inline ? css.inline : '', className)}
      options={options}
    />
  )
}
