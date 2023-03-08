import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MinMaxSlider } from './MinMaxSlider'

jest.useFakeTimers('modern')

describe('MinMaxSlider', () => {
  test('should test whether it takes correct min and max values passed via props', () => {
    const onChangeFn = jest.fn()
    render(<MinMaxSlider min={10} max={100} onChange={onChangeFn} />)

    expect(screen.getByTestId('MinMaxSlider_MinInput')).toBeInTheDocument()
    expect(screen.getByTestId('MinMaxSlider_MaxInput')).toBeInTheDocument()

    expect(screen.getByTestId('MinMaxSlider_MinInput')).toHaveValue('10')
    expect(screen.getByTestId('MinMaxSlider_MaxInput')).toHaveValue('100')

    act(() => {
      fireEvent.change(screen.getByTestId('MinMaxSlider_MinInput'), {
        target: { value: '20' }
      })
    })

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(onChangeFn).toHaveBeenCalledWith({ max: 100, min: 20 })
    expect(screen.getByTestId('MinMaxSlider_MinInput')).toHaveValue('20')

    act(() => {
      fireEvent.change(screen.getByTestId('MinMaxSlider_MaxInput'), {
        target: { value: '80' }
      })
    })

    expect(onChangeFn).toHaveBeenCalledWith({ max: 100, min: 20 })
    expect(screen.getByTestId('MinMaxSlider_MaxInput')).toHaveValue('80')
  })

  test('should reset the min and max values when reset button is clicked', () => {
    const onChangeFn = jest.fn()
    render(<MinMaxSlider min={10} max={100} onChange={onChangeFn} />)

    expect(screen.getByTestId('MinMaxSlider_MinInput')).toHaveValue('10')
    expect(screen.getByTestId('MinMaxSlider_MaxInput')).toHaveValue('100')

    act(() => {
      fireEvent.change(screen.getByTestId('MinMaxSlider_MinInput'), {
        target: { value: '20' }
      })
    })

    act(() => {
      fireEvent.change(screen.getByTestId('MinMaxSlider_MaxInput'), {
        target: { value: '80' }
      })
    })

    expect(screen.getByTestId('MinMaxSlider_MinInput')).toHaveValue('20')
    expect(screen.getByTestId('MinMaxSlider_MaxInput')).toHaveValue('80')

    act(() => {
      fireEvent.click(screen.getByTestId('MinMaxSlider_reset'))
    })

    expect(screen.getByTestId('MinMaxSlider_MinInput')).toHaveValue('10')
    expect(screen.getByTestId('MinMaxSlider_MaxInput')).toHaveValue('100')

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(onChangeFn).toHaveBeenCalledWith({ max: 100, min: 10 })
  })

  test('should test the MinMaxSlider_Range have correct width and takes the correct suffix value passed', () => {
    const onChangeFn = jest.fn()
    render(<MinMaxSlider min={10} max={100} unitSuffixString="ms" onChange={onChangeFn} />)

    expect(screen.getByTestId('MinMaxSlider_Range').style.left).toBe('0%')
    expect(screen.getByTestId('MinMaxSlider_Range').style.width).toBe('100%')

    act(() => {
      fireEvent.change(screen.getByTestId('MinMaxSlider_MinInput'), {
        target: { value: '20' }
      })
      fireEvent.change(screen.getByTestId('MinMaxSlider_MaxInput'), {
        target: { value: '80' }
      })
    })

    expect(screen.getByTestId('MinMaxSlider_MinValue')).toHaveTextContent('20ms')
    expect(screen.getByTestId('MinMaxSlider_MaxValue')).toHaveTextContent('80ms')

    expect(screen.getByTestId('MinMaxSlider_Range').style.left).toBe('11%')
    expect(screen.getByTestId('MinMaxSlider_Range').style.width).toBe('67%')
  })

  test('MinMaxSlider_Range should take the correct width as passed from the props', () => {
    const onChangeFn = jest.fn()
    render(<MinMaxSlider min={10} max={100} width="50%" onChange={onChangeFn} />)

    expect(screen.getByTestId('minMaxSlider_container').style.width).toBe('50%')
  })

  describe('MinMaxSlider Error messages', () => {
    test('MinMaxSlider should throw error if min or max values are not passed', () => {
      const onChangeFn = jest.fn()

      expect(() =>
        render(<MinMaxSlider min={(undefined as unknown) as number} max={100} onChange={onChangeFn} />)
      ).toThrow('MinMaxSlider: Pass min, max and onChange prop values')
    })

    test('MinMaxSlider should throw error if onChange callback is not passed', () => {
      const onChangeFn = (undefined as unknown) as () => void

      expect(() => render(<MinMaxSlider min={0} max={100} onChange={onChangeFn} />)).toThrow(
        'MinMaxSlider: Pass min, max and onChange prop values'
      )
    })

    test('MinMaxSlider should throw error if min value is greater than max value', () => {
      const onChangeFn = jest.fn()

      expect(() => render(<MinMaxSlider min={101} max={100} onChange={onChangeFn} />)).toThrow(
        'MinMaxSlider: Pass min value smaller than max value'
      )
    })

    test('MinMaxSlider should throw error if min or max value is not a valid number', () => {
      const onChangeFn = jest.fn()

      expect(() =>
        render(<MinMaxSlider min={('zero' as unknown) as number} max={100} onChange={onChangeFn} />)
      ).toThrow('MinMaxSlider: Invalid min or max values, pass valid number values')
    })
  })
})
