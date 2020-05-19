import React, { FormEvent, useCallback, useContext, useState } from 'react'
import { Heading } from '../Heading/Heading'
import { Checkbox } from '../Checkbox/Checkbox'
import { TextInput } from '../TextInput/TextInput'
import { Button } from '../Button/Button'
import { Layout } from '../../layouts/Layout'
import { Text } from '../Text/Text'
import { Formik, Form } from 'formik'
import { SelectWithSubFormContext } from './SelectWithSubForm'

export interface EnvironmentTypeSubFormProps {
  onSubmit: (data: EnvironmentTypeFormData) => void
  onHide?: () => void
}
type EnvironmentTypeFormData = {
  environment: string
  liveMonitoring: boolean
  preProd: boolean
}

const initialValues: EnvironmentTypeFormData = {
  environment: '',
  liveMonitoring: false,
  preProd: false
}
export function EnvironmentTypeSubForm(props: EnvironmentTypeSubFormProps) {
  const { toggleSubForm } = useContext(SelectWithSubFormContext)
  const [error, setError] = useState('')
  const { onSubmit, onHide } = props
  const onSubmitCallBack = useCallback(
    () => (values: EnvironmentTypeFormData) => {
      const errorMsg = toggleSubForm({ label: values.environment, value: JSON.stringify(values) })
      if (errorMsg) {
        setError(errorMsg)
      } else {
        onSubmit(values)
      }
    },
    [toggleSubForm, onSubmit]
  )
  const onHideCallBack = useCallback(
    () => () => {
      toggleSubForm()
      onHide?.()
    },
    [toggleSubForm, onHide]
  )
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitCallBack()}>
      {props => {
        const { setFieldValue } = props
        return (
          <Form style={{ padding: '10px' }}>
            <TextInput
              placeholder="Enter Environment Name"
              name="environment"
              style={{ marginBottom: '10px' }}
              onChange={(e: FormEvent<HTMLInputElement>) => setFieldValue('environment', e.currentTarget?.value)}
            />
            <Heading level={3} margin={{ bottom: 'small' }} style={{ color: 'var(--black)' }}>
              Select Environment Type
            </Heading>
            <Checkbox
              name="liveMonitoring"
              onChange={(e: FormEvent<HTMLInputElement>) => setFieldValue('liveMonitoring', e.currentTarget?.value)}>
              Live Monitoring (Production Types)
            </Checkbox>
            <Checkbox
              name="preProd"
              onChange={(e: FormEvent<HTMLInputElement>) => setFieldValue('preProd', e.currentTarget?.value)}>
              Pre-Production
            </Checkbox>
            <Layout.Horizontal spacing="medium" style={{ justifyContent: 'flex-end' }}>
              <Button onClick={onHideCallBack()}>Cancel</Button>
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
