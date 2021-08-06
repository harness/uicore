import React, { ReactElement } from 'react'
import { Radio as BpRadio, IRadioProps } from '@blueprintjs/core'
import { StyledProps, omitStyledProps, styledClasses } from '../../styled-props/StyledProps'
import styledClass from '../../styled-props/StyledProps.css'

import css from './RadioButton.css'

export type RadioButtonProps = IRadioProps & StyledProps
export function RadioButton({ className = '', ...props }: RadioButtonProps): ReactElement {
  return (
    <BpRadio
      {...(omitStyledProps(props) as IRadioProps)}
      className={styledClasses(props, styledClass.font, css.radio, className)}
    />
  )
}
