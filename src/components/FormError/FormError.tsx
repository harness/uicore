/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { FormikErrors } from 'formik'
import cx from 'classnames'
import { Icon } from '../../icons/Icon'
import css from './FormError.css'

export const FormError = ({
  errorMessage,
  className
}: {
  errorMessage: string | undefined | FormikErrors<any>
  className?: string
}) => {
  if (!errorMessage) {
    return null
  }
  // Used to display form errors below the fields, with an icon
  return (
    <div className={cx(css.errorDiv, className)}>
      <Icon name="circle-cross" className={css.errorTextIcon} size={12} intent="danger" />
      <span className={css.error}>{errorMessage}</span>
    </div>
  )
}
