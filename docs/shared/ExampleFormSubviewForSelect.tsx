import React, { FormEvent, useCallback, useContext, useState } from 'react'
import {
  Layout,
  Heading,
  TextInput,
  Button,
  Text,
  SelectWithSubviewContext,
  SelectWithSubview,
  MultiSelectWithSubview
} from '../static/index'
import { Formik, Form, FormikErrors } from 'formik'
import { RadioGroup, Radio } from '@blueprintjs/core'
import { SelectOption } from '../../src/components/Select/Select'
import '../../src/components/Radio/Radio.css'

interface EnvironmentTypeSubFormProps {
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

const ExampleItems: SelectOption[] = [
  { value: 'env_id1', label: 'Env1' },
  { value: 'env_id2', label: 'Env2' }
]

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
      if (onHide) {
        onHide()
      }
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
              onChange={(e: FormEvent<HTMLInputElement>) => setFieldValue('environment', e.currentTarget.value)}
            />
            {errors && errors.environment && (
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
              onChange={(e: FormEvent<HTMLInputElement>) => {
                setFieldValue('envType', e.currentTarget.value)
              }}>
              <Radio label="Live Monitoring (Production Types)" value={EnvTypes.PROD} />
              <Radio label="Pre-Production" value={EnvTypes.NON_PROD} />
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

export function ExampleFormSubviewForSelect() {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => (
        <Form>
          <SelectWithSubview
            items={ExampleItems}
            changeViewButtonLabel="Custom Date"
            subview={<EnvironmentTypeSubForm onSubmit={values => console.log(values)} />}
          />
        </Form>
      )}
    </Formik>
  )
}

export function ExampleFormSubviewForMultiSelect() {
  const [selectedItems, setSelectedItems] = useState([])
  return (
    <MultiSelectWithSubview
      items={ExampleItems}
      value={selectedItems}
      changeViewButtonLabel="+ Add an environment"
      subview={<EnvironmentTypeSubForm onSubmit={values => console.log(values)} />}
      multiSelectProps={{
        value: selectedItems,
        onChange: selectedOptions => {
          setSelectedItems(selectedOptions)
        }
      }}
    />
  )
}
