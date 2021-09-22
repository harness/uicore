import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { RadioButton } from '../RadioButton'
import userEvent from '@testing-library/user-event'
import { TooltipContextProvider } from '../../../frameworks/Tooltip/TooltipContext'

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

  test('it should render the tooltip icon and tooltip if a tooltipId is passed', async () => {
    const tooltipId = 'TEST ID'
    const tooltips = {
      [tooltipId]: 'TEST TOOLTIP'
    }
    render(
      <TooltipContextProvider initialTooltipDictionary={tooltips}>
        <RadioButton label="My tooltip" tooltipId={tooltipId} />
      </TooltipContextProvider>
    )

    const el = screen.getByRole('radio')?.parentElement
    expect(el?.querySelector(`[data-tooltip-id="${tooltipId}"]`)).toBeInTheDocument()

    expect(screen.queryByText(tooltips[tooltipId])).not.toBeInTheDocument()

    userEvent.hover(el?.querySelector('svg') as SVGElement)

    await waitFor(() => {
      expect(screen.getByText(tooltips[tooltipId])).toBeInTheDocument()
    })
  })

  test('it should not wrap the label with a tooltip span if the tooltipId was not passed', async () => {
    const { container } = render(<RadioButton label="test" value="test" />)

    expect(container.querySelector('[data-tooltip-id]')).not.toBeInTheDocument()
  })
})
