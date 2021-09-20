import React from 'react'
import { render, screen } from '@testing-library/react'
import { RadioButton } from '../RadioButton'
import userEvent from '@testing-library/user-event'

describe('RadioButton', () => {
  test('it should render a string label', async () => {
    const label = 'TEST LABEL'
    render(<RadioButton label={label} />)

    expect(screen.getByLabelText(label)).toBeInTheDocument()
  })

  test('it should render an element label', async () => {
    const testId = 'TEST LABEL ID'
    render(<RadioButton label={<span data-testid={testId}>Test element</span>} />)

    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  test('it should call the onChange handler when clicked', async () => {
    const onChangeHandler = jest.fn()
    const testId = 'TEST ID'
    render(<RadioButton onChange={onChangeHandler} data-testid={testId} />)

    expect(onChangeHandler).not.toHaveBeenCalled()

    userEvent.click(screen.getByTestId(testId))
    expect(onChangeHandler).toHaveBeenCalled()
  })

  test('it should apply a custom css class', async () => {
    const className = 'TESTCLASS'
    const testId = 'TEST ID'
    render(<RadioButton className={className} data-testid={testId} />)

    expect(screen.getByTestId(testId)).toHaveClass(className)
  })

  test('it should set the name and value attributes when passed', async () => {
    const name = 'TEST NAME'
    const value = 'TEST VALUE'
    const label = 'TEST LABEL'
    render(<RadioButton name={name} value={value} label={label} />)

    expect(screen.getByLabelText(label)).toHaveAttribute('name', name)
    expect(screen.getByLabelText(label)).toHaveAttribute('value', value)
  })
})
