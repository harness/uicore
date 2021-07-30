import React, { ReactElement } from 'react'
import { RadioGroup as BpRadioGroup, IRadioGroupProps } from '@blueprintjs/core'
import { RadioProps } from './Radio'
import { omitStyledProps, styledClasses, StyledProps } from '../../styled-props/StyledProps'

import styledClass from '../../styled-props/StyledProps.css'
import css from './Radio.css'

export type RadioGroupProps = IRadioGroupProps & StyledProps & { options: RadioProps[] }
export function RadioGroup({ options, className = '', ...props }: RadioGroupProps): ReactElement {
  // map over all options to add `Radio` styling
  options = options.map(option => ({
    ...option,
    className: styledClasses(styledClass.font, css.radio, option.className || '')
  }))

  return (
    <BpRadioGroup
      {...(omitStyledProps(props) as IRadioGroupProps)}
      className={styledClasses(props, styledClass.font, css.radioGroup, className)}
      options={options}
    />
  )
}
