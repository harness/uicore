/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { Checkbox as BpCheckbox, ICheckboxProps } from '@blueprintjs/core'
import { StyledProps, omitStyledProps, styledClasses } from '../../styled-props/StyledProps'
import React, { FormEvent, ReactElement } from 'react'
import styledClass from '../../styled-props/StyledProps.css'

import css from './Checkbox.css'

export interface CheckboxProps extends Omit<ICheckboxProps, 'onChange'>, StyledProps {
  /** onChange event handler */
  onChange?: (event: FormEvent<HTMLInputElement>) => void

  /** className to be appended to default className */
  className?: string
}

export function Checkbox(props: CheckboxProps): ReactElement {
  const { className = '', onChange } = props

  return (
    <BpCheckbox
      {...omitStyledProps(props)}
      onChange={onChange}
      className={styledClasses(props, styledClass.font, css.checkbox, className)}
    />
  )
}
