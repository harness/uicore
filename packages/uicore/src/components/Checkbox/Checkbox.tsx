/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Checkbox as BpCheckbox, ICheckboxProps } from '@blueprintjs/core'
import { StyledProps, omitStyledProps, styledClasses } from '@harnessio/design-system'
import React, { FormEvent, ReactElement } from 'react'
import { styledClass } from '@harnessio/design-system'

import css from './Checkbox.css'

export enum CheckboxVariant {
  BOXED = 'BOXED'
}

export interface CheckboxProps extends Omit<ICheckboxProps, 'onChange'>, StyledProps {
  /** onChange event handler */
  onChange?: (event: FormEvent<HTMLInputElement>) => void

  /** className to be appended to default className */
  className?: string

  variant?: CheckboxVariant
}

export function Checkbox(props: CheckboxProps): ReactElement {
  const { className = '', onChange } = props

  return (
    <BpCheckbox
      {...omitStyledProps(props)}
      onChange={onChange}
      className={styledClasses(
        props,
        styledClass.font,
        css.checkbox,
        className,
        props.variant === CheckboxVariant.BOXED ? css.boxed : undefined,
        props.checked ? css.checked : undefined
      )}
    />
  )
}
