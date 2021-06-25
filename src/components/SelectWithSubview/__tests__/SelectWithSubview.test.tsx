import React, { useContext, useState, useCallback, FormEvent } from 'react'
import { render, wait, fireEvent, waitForDomChange } from '@testing-library/react'
import { SelectWithSubview, SelectWithSubviewContext } from '../SelectWithSubview'
import { SelectOption } from 'components/Select/Select'
import { Heading } from 'components/Heading/Heading'
import { Layout } from 'layouts/Layout'
import { TextInput } from 'components/TextInput/TextInput'
import { Button } from 'components/Button/Button'
import { Text } from 'components/Text/Text'
import { Formik, Form } from 'formik'

const items: SelectOption[] = [
  { label: 'secondaryOption_1', value: '1234_secondaryOption' },
  { label: 'secondaryOption_2', value: '5678_secondaryOption' }
]
const onSubmitFunc = jest.fn()
const SECONDARY_OPTION_LABEL = 'Open Sub Panel'
type EnvFormData = {
  environment: string
}

const EnvForm = (props: { onSubmit: (values: EnvFormData) => void; onHide?: () => void }) => {
  const { toggleSubview } = useContext(SelectWithSubviewContext)
  const [error, setError] = useState('')
  const { onSubmit, onHide } = props
  const onSubmitCallBack = useCallback(
    () => (values: EnvFormData) => {
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
      initialValues={{ environment: '' }}
      onSubmit={onSubmitCallBack()}
      validateOnChange={false}
      validateOnBlur={false}>
      {props => {
        const { setFieldValue } = props
        return (
          <Form style={{ padding: '10px' }}>
            <TextInput
              placeholder="Enter Environment Name"
              name="environment"
              style={{ marginBottom: '10px' }}
              onChange={(e: FormEvent<HTMLInputElement>) => setFieldValue('environment', e.currentTarget.value)}
            />
            <Heading level={3} margin={{ bottom: 'small' }} style={{ color: 'var(--black)' }}>
              Select Environment Type
            </Heading>
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

describe.skip('Tests for Select with secondary view', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  test('Ensure you can toggle betwen secondary view and dropdown', async () => {
    const { container, getByText } = render(
      <SelectWithSubview
        items={items}
        changeViewButtonLabel={SECONDARY_OPTION_LABEL}
        subview={<EnvForm onSubmit={onSubmitFunc} />}
      />
    )

    const inputBox = container.querySelector('.bp3-input')
    if (!inputBox) {
      throw Error('Input box for drop down was not rendered.')
    }

    // focus on input box for drop down menu to show
    fireEvent.focus(inputBox)
    await waitForDomChange()

    const dropdownMenu = container.querySelector('[class~="bp3-popover-wrapper"] .bp3-menu')
    expect(dropdownMenu).not.toBeNull()
    if (!dropdownMenu) {
      throw Error('Drop down menu was not rendered.')
    }

    // within the drop down click on option to view secondary view
    fireEvent.click(getByText(SECONDARY_OPTION_LABEL))
    await wait()

    // ensure secondary view is rendered
    const secondaryView = container.querySelector('.bp3-popover-content form')
    expect(secondaryView).not.toBeNull()
    getByText('Select Environment Type')

    const closeButton = container.querySelector('button[data-name="Cancel"]')
    if (!closeButton) {
      throw Error('Close button was not rendered.')
    }
    fireEvent.click(closeButton)
    await wait()

    // ensure original drop down is rendered
    expect(container.querySelector('form')).toBeNull()

    // ensure only the original three items are rendered
    const menuItems = container.querySelectorAll('.bp3-menu li')
    expect(menuItems.length).toBe(3)
    getByText(SECONDARY_OPTION_LABEL)
    getByText(items[0].label)
    getByText(items[1].label)
  })

  test('Ensure that when user saves from secondary view, the option is rendered in the drop down menu', async () => {
    const { container, getByText } = render(
      <SelectWithSubview
        items={items}
        changeViewButtonLabel={SECONDARY_OPTION_LABEL}
        subview={<EnvForm onSubmit={onSubmitFunc} />}
      />
    )

    const inputBox = container.querySelector('.bp3-input')
    if (!inputBox) {
      throw Error('Input box for drop down was not rendered.')
    }

    // focus on input box for drop down menu to show
    fireEvent.focus(inputBox)
    await waitForDomChange()

    const dropdownMenu = container.querySelector('[class~="bp3-popover-wrapper"] .bp3-menu')
    expect(dropdownMenu).not.toBeNull()
    if (!dropdownMenu) {
      throw Error('Drop down menu was not rendered.')
    }

    // within the drop down click on option to view secondary view
    fireEvent.click(getByText(SECONDARY_OPTION_LABEL))
    await wait()

    const secondaryView = container.querySelector('.bp3-popover-content form')
    expect(secondaryView).not.toBeNull()

    // Get environment input box and type in new option label
    const environmentInputBox = secondaryView?.querySelector('input')
    if (!environmentInputBox) {
      throw Error('Environment name input box was not rendered.')
    }

    fireEvent.change(environmentInputBox, { target: { value: 'Custom Env Label' } })
    await wait()

    // submit changes
    const submitButton = secondaryView?.querySelector('button[type="submit"]')
    if (!submitButton) {
      throw Error('Submit button was not rendered.')
    }

    fireEvent.click(submitButton)
    await waitForDomChange()
    expect(onSubmitFunc).toHaveBeenCalled()
    expect(onSubmitFunc.mock.calls[0][0]).toEqual({
      environment: 'Custom Env Label'
    })
    getByText('Custom Env Label')
  })

  test('Ensure only unique values are added to drop down', async () => {
    const { container, getByText } = render(
      <SelectWithSubview
        items={items}
        changeViewButtonLabel={SECONDARY_OPTION_LABEL}
        subview={<EnvForm onSubmit={onSubmitFunc} />}
      />
    )

    const inputBox = container.querySelector('.bp3-input')
    if (!inputBox) {
      throw Error('Input box for drop down was not rendered.')
    }

    // focus on input box for drop down menu to show
    fireEvent.focus(inputBox)
    await waitForDomChange()

    const dropdownMenu = container.querySelector('[class~="bp3-popover-wrapper"] .bp3-menu')
    expect(dropdownMenu).not.toBeNull()
    if (!dropdownMenu) {
      throw Error('Drop down menu was not rendered.')
    }

    // within the drop down click on option to view secondary view
    fireEvent.click(getByText(SECONDARY_OPTION_LABEL))
    await wait()

    const secondaryView = container.querySelector('.bp3-popover-content form')
    expect(secondaryView).not.toBeNull()

    // Get environment input box and type in new option label
    const environmentInputBox = secondaryView?.querySelector('input')
    if (!environmentInputBox) {
      throw Error('Environment name input box was not rendered.')
    }

    fireEvent.change(environmentInputBox, { target: { value: items[0].label } })
    await wait()

    // submit changes
    const submitButton = secondaryView?.querySelector('button[type="submit"]')
    if (!submitButton) {
      throw Error('Submit button was not rendered.')
    }

    fireEvent.click(submitButton)
    await waitForDomChange()

    expect(onSubmitFunc).not.toHaveBeenCalled()
    getByText('secondaryOption_1 already exists. Please provide a unique option.')
  })
})
