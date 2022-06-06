/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { ReactNode, useContext } from 'react'
import { FormikContextType } from 'formik'

import { get } from 'lodash-es'
import { FormikTooltipContext } from './FormikTooltipContext'
import { HarnessDocTooltip } from '../../frameworks/Tooltip/Tooltip'
import { DataTooltipInterface } from '../../frameworks/Tooltip/types'

export interface FormikExtended<T> extends FormikContextType<T> {
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

export const errorCheck = (name: string, formik?: FormikContextType<any>): boolean =>
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
