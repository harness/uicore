import React, { FormEvent, useCallback, useContext, useState } from 'react'
import { Heading } from '../../Heading/Heading'
import { TextInput } from '../../TextInput/TextInput'
import { Button } from '../../Button/Button'
import { Layout } from '../../../layouts/Layout'
import { Text } from '../../Text/Text'
import { Formik, Form, FormikErrors } from 'formik'
import { SelectWithSubviewContext } from '../SelectWithSubview'
import { RadioGroup, Radio } from '@blueprintjs/core'
import radioCss from '../../Radio/Radio.css'

export interface EnvironmentTypeSubFormProps {
  onSubmit: (data: EnvironmentTypeFormData) => void
  onHide?: () => void
}
type EnvironmentTypeFormData = {
  environment: string
  envType: string
}

const EnvTypes = {
  PROD: 'liveMonitoring',
  NON_PROD: 'preProd'
}

const initialValues: EnvironmentTypeFormData = {
  environment: '',
  envType: EnvTypes.PROD
}

function validateForm(values: EnvironmentTypeFormData): FormikErrors<EnvironmentTypeFormData> {
  const errors: { environment?: string } = {}
  if (!values.environment) {
    errors.environment = 'Environment is required.'
  }

  return errors
}

export function EnvironmentTypeSubForm(props: EnvironmentTypeSubFormProps) {
  const { toggleSubview } = useContext(SelectWithSubviewContext)
  const [error, setError] = useState('')
  const { onSubmit, onHide } = props
  const onSubmitCallBack = useCallback(
    () => (values: EnvironmentTypeFormData) => {
      const errorMsg = toggleSubview({ label: values.environment, value: JSON.stringify(values) })
      if (errorMsg) {
        setError(errorMsg)
      } else {
        onSubmit(values)
      }
    },
    [toggleSubview, onSubmit]
  )
  const onHideCallBack = useCallback(
    () => () => {
      toggleSubview()
      onHide?.()
    },
    [toggleSubview, onHide]
  )
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitCallBack()}
      validate={validateForm}
      validateOnChange={false}
      validateOnBlur={false}>
      {props => {
        const { setFieldValue, errors, values } = props
        return (
          <Form style={{ padding: '10px' }}>
            <TextInput
              placeholder="Enter Environment Name"
              name="environment"
              style={{ marginBottom: '10px' }}
              onChange={(e: FormEvent<HTMLInputElement>) => setFieldValue('environment', e.currentTarget?.value)}
            />
            {errors?.environment && (
              <Text margin={{ bottom: 'small' }} intent="danger">
                {errors.environment}
              </Text>
            )}
            <Heading level={3} margin={{ bottom: 'small' }} style={{ color: 'var(--black)' }}>
              Select Environment Type
            </Heading>
            <RadioGroup
              name="envType"
              selectedValue={values.envType}
              className={radioCss.radioGroup}
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setFieldValue('envType', e.currentTarget?.value)
              }}>
              <Radio label="Live Monitoring (Production Types)" value={EnvTypes.PROD} className={radioCss.radio} />
              <Radio label="Pre-Production" value={EnvTypes.NON_PROD} className={radioCss.radio} />
            </RadioGroup>
            <Layout.Horizontal spacing="medium" style={{ justifyContent: 'flex-end' }}>
              <Button data-name="Cancel" onClick={onHideCallBack()}>
                Cancel
              </Button>
              <Button type="submit" intent="primary">
                Submit
              </Button>
            </Layout.Horizontal>
            {error && <Text intent="danger">{error}</Text>}
          </Form>
        )
      }}
    </Formik>
  )
}
