/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { FormGroup, HTMLInputProps, IFormGroupProps, IInputGroupProps, InputGroup, Intent } from '@blueprintjs/core'
import { get } from 'lodash-es'
import { errorCheck, FormikContextProps, getFormFieldLabel } from './utils'
import { FormError } from '../FormError/FormError'
import { DurationInputHelpers } from '../DurationInput/DurationInput'

export interface DurationInputProps extends Omit<IFormGroupProps, 'label' | 'placeholder'> {
  onChange?(str: string): void
  name: string
  label?: React.ReactNode
  inputProps?: Omit<IInputGroupProps & HTMLInputProps, 'onChange' | 'value'>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DurationInput(props: DurationInputProps & FormikContextProps<any>): React.ReactElement {
  const { formik, onChange, name, label, inputProps, ...restProps } = props

  const hasError = errorCheck(name, formik)

  const {
    intent = hasError ? Intent.DANGER : Intent.NONE,
    helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} /> : null,
    disabled,
    ...rest
  } = restProps

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const correctVal = e.currentTarget.value.replace(DurationInputHelpers.TEXT_LIMIT_REGEX, '')
    formik?.setFieldValue(e.currentTarget.name, correctVal)
    onChange?.(correctVal)
  }

  return (
    <FormGroup
      {...rest}
      label={getFormFieldLabel(label, name, props)}
      labelFor={name}
      helperText={helperText}
      intent={intent}
      disabled={disabled}>
      <InputGroup
        fill
        placeholder="Enter w/d/h/m/s/ms"
        {...inputProps}
        disabled={disabled}
        name={name}
        intent={intent}
        value={get(formik?.values, name)}
        onChange={handleChange}
        onBlur={formik?.handleBlur}
      />
    </FormGroup>
  )
}
