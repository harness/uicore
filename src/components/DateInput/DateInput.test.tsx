import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { DateInput } from './DateInput'

describe('<DateInput/> tests', () => {
  test('should always be UTC', () => {
    expect(new Date().getTimezoneOffset()).toBe(0)
  })
  test('renders with empty value date', () => {
    const onChange = jest.fn()
    const { container, getByTestId } = render(<DateInput onChange={onChange} data-testid="input" />)
    expect(container).toMatchSnapshot()
    fireEvent.change(getByTestId('input'), {
      target: {
        value: '01/23/2020'
      }
    })
    expect(onChange).toHaveBeenCalledWith('1579737600000')
    // Check not a valid Date
    fireEvent.change(getByTestId('input'), {
      target: {
        value: 'asdasd'
      }
    })
    expect(onChange).toHaveBeenCalledWith(undefined, 'Not a valid date')
  })

  test('renders with empty value date time', () => {
    const onChange = jest.fn()
    const { container, getByTestId } = render(
      <DateInput timePrecision="minute" onChange={onChange} data-testid="input" />
    )
    expect(container).toMatchSnapshot()
    fireEvent.change(getByTestId('input'), {
      target: {
        value: '01/23/2020 15:23'
      }
    })
    expect(onChange).toHaveBeenCalledWith('1579792980000')
  })

  test('renders with empty value and allow variables', () => {
    const onChange = jest.fn()
    const { container, getByTestId } = render(
      <DateInput allowVariables={true} onChange={onChange} data-testid="input" />
    )
    expect(container).toMatchSnapshot()
    // Check plus
    fireEvent.change(getByTestId('input'), {
      target: {
        value: 'current() + 2h'
      }
    })
    expect(onChange).toHaveBeenCalledWith('current() + 7200000')
    // Check minus
    fireEvent.change(getByTestId('input'), {
      target: {
        value: 'current() - 2h'
      }
    })
    expect(onChange).toHaveBeenCalledWith('current() - 7200000')
  })

  test('renders with value and allow variables', () => {
    const { container } = render(<DateInput allowVariables={true} value="current() + 7200000" />)
    expect(container).toMatchSnapshot()
  })

  test('renders with invalid value and allow variables', () => {
    const { container } = render(<DateInput allowVariables={true} value="current() + 2x" />)
    expect(container).toMatchSnapshot()
  })

  test('renders with value ', () => {
    const { container } = render(<DateInput value="1579773180000" />)
    expect(container).toMatchSnapshot()
  })
})
