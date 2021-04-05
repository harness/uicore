/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
import React, { CSSProperties, FormEvent, useCallback, useContext, useMemo, useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import {
  Button,
  Container,
  Heading,
  Layout,
  Radio,
  RadioGroup,
  SelectOption,
  SelectWithSubview,
  SelectWithSubviewContext,
  SelectWithSubviewProps,
  Text,
  TextInput
} from '../..'
import { omit } from 'lodash-es'
import { Form, Formik, FormikErrors } from 'formik'
import { DateRangePicker, DateRange, IDateRangePickerProps } from '@blueprintjs/datetime'
import moment from 'moment'

export default {
  title: 'Form / SelectWithSubview',

  component: SelectWithSubview,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>SelectWithSubview</Title>
            <Description>{`Select with Subview renders an alternate view when the user selects a specific option in the dropdown. The alternate view is rendered within the drop down menu.
The component is built on top of uicore's standard select component.

## Props (extends Select props)

- \`subview\`: JSX.Element - The component that should be rendered when clicking on a custom option
- \`changeViewButtonLabel\`: string - Label colored blue that when clicked will display the subview
- \`renderSubviewWithoutMenuStyling\` (optional): boolean - If true will remove blueprint styling that adds white background and border to the drop down menu
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
                  <code>{`import {SelectWithSubview} from '@wings-software/uicore'`}</code>
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
export const Basic: Story<SelectWithSubviewProps> = args => {
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
          const { setFieldValue, errors } = props
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
                // selectedValue={values.envType}
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
  const {
    items = ExampleItems,
    changeViewButtonLabel = '+ Add an environment',
    subview = <EnvironmentTypeSubForm onSubmit={values => console.log(values)} />
  } = args
  const argsCopy = omit(args, ['items', 'changeViewButtonLabel', 'subview'])

  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {() => (
        <Form>
          <SelectWithSubview
            items={items}
            changeViewButtonLabel={changeViewButtonLabel}
            subview={subview}
            {...argsCopy}
          />
        </Form>
      )}
    </Formik>
  )
}

export const CalendarWidgetExample: Story<SelectWithSubviewProps> = () => {
  const ExampleItems: SelectOption[] = [
    { value: new Date().getTime() - 30000, label: 'Past 30 minutes' },
    { value: new Date().getTime() - 60000, label: 'Past 1 hour' }
  ]

  interface DatePickerSubviewProps extends IDateRangePickerProps {
    onSelectRange: (range: SelectOption, dateRange: DateRange) => void
  }

  const mainStyle: CSSProperties = {
    border: '1px solid var(--grey-400)',
    borderTop: 'none',
    borderBottomRightRadius: '5px',
    borderBottomLeftRadius: '5px'
  }

  function DatePickerSubview(props: DatePickerSubviewProps) {
    const { toggleSubview } = useContext(SelectWithSubviewContext)
    const { onSelectRange, ...bpDatePickerProps } = props
    const [selectedDateRange, setDateRange] = useState<DateRange>()
    const onCancelCallback = useCallback(
      () => () => {
        toggleSubview()
      },
      [toggleSubview]
    )
    const onSelectRangeCallback = useCallback(
      () => () => {
        if (selectedDateRange && selectedDateRange[0] && selectedDateRange[1]) {
          const [startTime, endTime] = [selectedDateRange[0].getTime(), selectedDateRange[1].getTime()]
          const val = {
            label: `From ${moment(startTime).format('MMMM Do')} - ${moment(endTime).format('MMMM Do')}`,
            value: endTime - startTime
          }
          toggleSubview(val)
          if (onSelectRange) {
            onSelectRange(val, selectedDateRange)
          }
        }
      },
      [toggleSubview, onSelectRange, selectedDateRange]
    )
    const minDate = useMemo(() => moment().subtract(30, 'days').toDate(), [])
    const maxDate = useMemo(() => new Date(), [])
    return (
      <Layout.Vertical style={mainStyle}>
        <DateRangePicker
          minDate={minDate}
          maxDate={maxDate}
          singleMonthOnly={true}
          shortcuts={false}
          {...bpDatePickerProps}
          onChange={setDateRange}
        />
        <Container margin="medium" flex style={{ justifyContent: 'flex-end' }}>
          <Button onClick={onCancelCallback()} style={{ marginRight: '10px' }}>
            Cancel
          </Button>
          <Button onClick={onSelectRangeCallback()} intent="primary">
            Submit
          </Button>
        </Container>
      </Layout.Vertical>
    )
  }

  return (
    <Formik initialValues={{ selectedDate: { label: '', value: '' } }} onSubmit={() => {}}>
      {props => (
        <Form>
          <SelectWithSubview
            value={props.values.selectedDate}
            items={ExampleItems}
            renderSubviewWithoutMenuStyling={true}
            changeViewButtonLabel="Custom Date"
            subview={
              <DatePickerSubview onSelectRange={(range: SelectOption) => props.setFieldValue('selectedDate', range)} />
            }
          />
        </Form>
      )}
    </Formik>
  )
}
