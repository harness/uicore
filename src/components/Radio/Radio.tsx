/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { Radio as BpRadio, RadioGroup as BpRadioGroup, IRadioProps } from '@blueprintjs/core'
import { StyledProps, omitStyledProps, styledClasses } from '@harness/design-system'
import React, { FormEvent } from 'react'
import { styledClass } from '@harness/design-system'

import css from './Radio.css'

export interface RadioGroupProps extends Omit<IRadioProps, 'onChange'>, StyledProps {
  /** onChange event handler */
  onChange?: (event: FormEvent<HTMLInputElement>) => void

  /** className to be appended to default className */
  className?: string

  /** Component children */
  children?: React.ReactNode
}

export interface RadioProps extends Omit<IRadioProps, 'onChange'>, StyledProps {
  /** onChange event handler */
  onChange?: (event: FormEvent<HTMLInputElement>) => void

  /** className to be appended to default className */
  className?: string
}

function RadioGroup(props: RadioGroupProps): React.ReactElement {
  const { children, className = '', onChange = () => void 0 } = props
  return (
    <BpRadioGroup
      {...omitStyledProps(props)}
      onChange={onChange}
      className={styledClasses(props, styledClass.font, css.radioGroup, className)}>
      {children}
    </BpRadioGroup>
  )
}

function Radio(props: RadioProps): React.ReactElement {
  const { className = '', onChange = () => void 0 } = props

  return (
    <BpRadio
      {...omitStyledProps(props)}
      onChange={onChange}
      className={styledClasses(props, styledClass.font, css.radio, className)}
    />
  )
}

export { Radio, RadioGroup }
