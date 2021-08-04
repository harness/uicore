import React, { ReactElement } from 'react'
import { Radio as BpRadio, IRadioProps } from '@blueprintjs/core'
import { StyledProps, omitStyledProps, styledClasses } from '../../styled-props/StyledProps'
import styledClass from '../../styled-props/StyledProps.css'

import css from './Radio.css'

export type RadioProps = IRadioProps & StyledProps
export function Radio({ className = '', ...props }: RadioProps): ReactElement {
  return (
    <BpRadio
      {...(omitStyledProps(props) as IRadioProps)}
      className={styledClasses(props, styledClass.font, css.radio, className)}
    />
  )
}
