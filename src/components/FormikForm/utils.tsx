import React, { ReactNode, useContext } from 'react'
import { FormikContext } from 'formik'

import { get } from 'lodash-es'
import { FormikTooltipContext } from './FormikTooltipContext'
import { HarnessDocTooltip } from '../../frameworks/Tooltip/Tooltip'
import { DataTooltipInterface } from '../../frameworks/Tooltip/types'

export interface FormikExtended<T> extends FormikContext<T> {
  disabled?: boolean
  inline?: boolean
  formName: string
}

export interface FormikContextProps<T> {
  formik?: FormikExtended<T>
  optionalLabel?: string
  isOptional?: boolean // default to false
  autoComplete?: string
  tooltipProps?: DataTooltipInterface // todo mark it as mandatory
}

export const IsOptionLabel = '(optional)'

const isObject = (obj: any): boolean => obj !== null && typeof obj === 'object'

export const errorCheck = (name: string, formik?: FormikContext<any>): boolean =>
  Boolean(
    (get(formik?.touched, name) || (formik?.submitCount && formik?.submitCount > 0)) &&
      get(formik?.errors, name) &&
      !isObject(get(formik?.errors, name))
  )

export const getFormFieldLabel = (
  label: ReactNode | string | undefined,
  fieldName: string,
  props: FormikContextProps<any>,
  css?: string
): ReactNode | string | undefined => {
  const optionalLabel = props.optionalLabel || IsOptionLabel
  const labelText = !props.isOptional ? label : `${label} ${optionalLabel}`
  if (!labelText) {
    return labelText
  }
  const tooltipContext = useContext(FormikTooltipContext)
  const dataTooltipId =
    props.tooltipProps?.dataTooltipId || (tooltipContext?.formName ? `${tooltipContext?.formName}_${fieldName}` : '')
  return <HarnessDocTooltip tooltipId={dataTooltipId} labelText={labelText} className={css || ''} />
}
