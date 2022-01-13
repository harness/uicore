import React from 'react'
import { FormikErrors } from 'formik'
import { Layout, Text, Color, Icon } from '../../'
import css from './FormError.css'

export const FormError = ({ errorMessage }: { errorMessage: string | undefined | FormikErrors<any> }) => {
  if (!errorMessage) {
    return null
  }

  // Used to display form errors below the fields, with an icon
  return (
    <Layout.Horizontal margin={{ top: 'small' }}>
      <Icon className={css.errorTextIcon} name="circle-cross" margin={{ right: 'xsmall' }} size={12} intent="danger" />
      <Text className={css.error} color={Color.RED_600}>
        {errorMessage}
      </Text>
    </Layout.Horizontal>
  )
}
