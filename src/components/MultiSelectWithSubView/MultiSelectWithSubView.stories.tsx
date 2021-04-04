/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
import React, { FormEvent, useCallback, useContext, useState } from 'react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import type { Meta, Story } from '@storybook/react'
import {
  Layout,
  Heading,
  TextInput,
  Button,
  Text,
  SelectWithSubviewContext,
  MultiSelectWithSubview,
  MultiSelectWithSubviewProps
} from '../..'
import { Formik, Form, FormikErrors } from 'formik'
import { RadioGroup, Radio } from '@blueprintjs/core'
import { SelectOption } from '../Select/Select'
import '../Radio/Radio.css'
import { omit } from 'lodash-es'

export default {
  title: 'Form / MultiSelectWithSubview',

  component: MultiSelectWithSubview,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>MultiSelectWithSubview</Title>
            <Description>{`MultiSelect with Subview renders an alternate view when the user selects a specific option in the dropdown. The alternate view is rendered within the drop down menu.
The component is built on top of uicore's standard multiselect component.

## Props

- \`subview\`: JSX.Element - The component that should be rendered when clicking on a custom option
- \`changeViewButtonLabel\`: string - Label colored blue that when clicked will display the subview
- \`value\`: MultiSelectOption[] - Values for the multiselect component
- \`multiSelectProps\`: MultiSelectProps (optional) - Props for the multiselect component
- \`renderSubviewWithoutMenuStyling\`: boolean (optional) - If true will remove blueprint styling that adds white background and border to the drop down menu
`}</Description>
            <Subtitle>
              <>
                <h2>Subview Component</h2>
                <Text>
                  After user has completed their interaction, the subview component needs to invoke a function to
                  re-render the original drop down menu. To do that first import
                </Text>
                <pre>
                  <code>{`import { SelectWithSubviewContext } from '@wings-software/uikit'`}</code>
                </pre>
                <Text>and use the context api</Text>
                <pre>
                  <code>{`const { toggleSubview } = useContext(SelectWithSubviewContext)`}</code>
                </pre>
                <Text>
                  and invoke the toggleSubview() function on button click or after the user signals interaction
                  completion.
                </Text>
                <h2>Import</h2>
                <pre>
                  <code>{`import {MultiSelectWithSubview} from '@wings-software/uicore'`}</code>
                </pre>
              </>
            </Subtitle>

            <Primary />
            <ArgsTable story={PRIMARY_STORY} />

            <Stories />
          </>
        )
      }
    }
  },
  decorators: [Story => <Story />]
} as Meta
export const Basic: Story<MultiSelectWithSubviewProps> = args => {
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

  function EnvironmentTypeSubForm(props: EnvironmentTypeSubFormProps) {
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
  const [selectedItems, setSelectedItems] = useState([])
  const {
    items = ExampleItems,
    value = selectedItems,
    changeViewButtonLabel = '+ Add an environment',
    subview = <EnvironmentTypeSubForm onSubmit={values => console.log(values)} />,
    multiSelectProps = {
      // value: selectedItems,
      onChange: selectedOptions => {
        setSelectedItems(selectedOptions as any)
      }
    }
  } = args
  const argsCopy = omit(args, ['items', 'value', 'changeViewButtonLabel', 'subview', 'multiSelectProps'])
  return (
    <MultiSelectWithSubview
      items={items}
      value={value}
      changeViewButtonLabel={changeViewButtonLabel}
      subview={subview}
      multiSelectProps={multiSelectProps}
      {...argsCopy}
    />
  )
}
