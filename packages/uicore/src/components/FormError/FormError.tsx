/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { FormikErrors } from 'formik'
import cx from 'classnames'
import { Icon } from '@harnessio/icons'
import css from './FormError.css'

interface FormErrorProps {
  errorMessage: string | undefined | FormikErrors<any> | Array<FormikErrors<any>> | string[] | JSX.Element
  name: string
  className?: string
}

export const FormError = ({ errorMessage, className, name }: FormErrorProps): React.ReactElement | null => {
  if (!errorMessage) {
    return null
  }
  // Used to display form errors below the fields, with an icon
  return (
    <div data-name={name} className={cx(css.errorDiv, className)}>
      <Icon name="circle-cross" className={css.errorTextIcon} size={12} intent="danger" />
      <span className={css.error}>{errorMessage}</span>
    </div>
  )
}
