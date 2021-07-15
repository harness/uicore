import React from 'react'
import { FormikErrors } from 'formik'
import { Icon } from '../../icons/Icon'
import css from './FormError.css'

export const FormError = ({ errorMessage }: { errorMessage: string | undefined | FormikErrors<any> }) => {
  if (!errorMessage) {
    return null
  }
  // Used to display form errors below the fields, with an icon
  return (
    <div className={css.errorDiv}>
      <Icon name="circle-cross" className={css.errorTextIcon} size={12} intent="danger" />
      <span className={css.error}>{errorMessage}</span>
    </div>
  )
}
