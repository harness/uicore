import React from 'react'
import { FormGroup, HTMLInputProps, IFormGroupProps, IInputGroupProps, InputGroup, Intent } from '@blueprintjs/core'
import { get } from 'lodash-es'
import { FormikContext } from 'formik'
import { errorCheck, FormikContextProps, getFormFieldLabel } from './utils'
import { FormError } from '../FormError/FormError'
import { DurationInputHelpers } from '../DurationInput/DurationInput'

export interface DurationInputProps extends Omit<IFormGroupProps, 'label' | 'placeholder'> {
  onChange?(str: string): void
  name: string
  label?: React.ReactNode
  inputProps?: Omit<IInputGroupProps & HTMLInputProps, 'onChange' | 'value'>
}

export interface ConnectedDurationProps extends DurationInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikContext<any>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DurationInput(props: ConnectedDurationProps & FormikContextProps<any>): React.ReactElement {
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
    formik.setFieldValue(e.currentTarget.name, correctVal)
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
        value={get(formik.values, name)}
        onChange={handleChange}
        onBlur={formik.handleBlur}
      />
    </FormGroup>
  )
}
