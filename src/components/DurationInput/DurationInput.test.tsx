import React from 'react'
import { render, fireEvent, waitForDomChange } from '@testing-library/react'

import { DurationInput, timeToDisplayText, parseStringToTime, UNIT_MULTIPLIIERS } from './DurationInput'

describe('<DurationInput/> tests', () => {
  describe('component tests', () => {
    test('renders with given value', () => {
      const { container } = render(<DurationInput value={123456789} />)

      expect(container).toMatchSnapshot()
    })

    test('onChange triggers with value (in ms)', () => {
      const onChange = jest.fn()
      const { getByTestId } = render(<DurationInput onChange={onChange} data-testid="input" />)

      fireEvent.change(getByTestId('input'), {
        target: {
          value: '1d 10h 17m 36s 789ms'
        }
      })

      expect(onChange).toHaveBeenCalledWith(123456789)
    })

    test('shows help popover', async () => {
      const { container } = render(<DurationInput value={123456789} />)

      const icon = container.querySelector('.bp3-popover-target')

      fireEvent.mouseOver(icon!)

      await waitForDomChange({ container: document.body })

      expect(container).toMatchSnapshot()
    })
  })

  describe('timeToDisplayText tests', () => {
    test('works with positive', () => {
      expect(timeToDisplayText(UNIT_MULTIPLIIERS.ms)).toBe('1ms')
      expect(timeToDisplayText(UNIT_MULTIPLIIERS.s)).toBe('1s')
      expect(timeToDisplayText(UNIT_MULTIPLIIERS.m)).toBe('1m')
      expect(timeToDisplayText(UNIT_MULTIPLIIERS.h)).toBe('1h')
      expect(timeToDisplayText(UNIT_MULTIPLIIERS.d)).toBe('1d')
      expect(timeToDisplayText(UNIT_MULTIPLIIERS.w)).toBe('1w')
      expect(
        timeToDisplayText(
          2 * UNIT_MULTIPLIIERS.w +
            4 * UNIT_MULTIPLIIERS.d +
            5 * UNIT_MULTIPLIIERS.h +
            15 * UNIT_MULTIPLIIERS.m +
            50 * UNIT_MULTIPLIIERS.s
        )
      ).toBe('2w 4d 5h 15m 50s')
    })

    test('does not works with non-positive values', () => {
      expect(timeToDisplayText(0)).toBe('')
      expect(timeToDisplayText(-1900)).toBe('')
    })
  })

  describe('parseStringToTime tests', () => {
    test('works with simple values', () => {
      expect(parseStringToTime('1ms')).toBe(UNIT_MULTIPLIIERS.ms)
      expect(parseStringToTime('1s')).toBe(UNIT_MULTIPLIIERS.s)
      expect(parseStringToTime('1m')).toBe(UNIT_MULTIPLIIERS.m)
      expect(parseStringToTime('1h')).toBe(UNIT_MULTIPLIIERS.h)
      expect(parseStringToTime('1d')).toBe(UNIT_MULTIPLIIERS.d)
      expect(parseStringToTime('1w')).toBe(UNIT_MULTIPLIIERS.w)
    })

    test('works with complex values', () => {
      expect(parseStringToTime('2w 4d 5h 15m 50s')).toBe(
        2 * UNIT_MULTIPLIIERS.w +
          4 * UNIT_MULTIPLIIERS.d +
          5 * UNIT_MULTIPLIIERS.h +
          15 * UNIT_MULTIPLIIERS.m +
          50 * UNIT_MULTIPLIIERS.s
      )
      expect(parseStringToTime('12w 5d 10h 30m 33s')).toBe(
        12 * UNIT_MULTIPLIIERS.w +
          5 * UNIT_MULTIPLIIERS.d +
          10 * UNIT_MULTIPLIIERS.h +
          30 * UNIT_MULTIPLIIERS.m +
          33 * UNIT_MULTIPLIIERS.s
      )
    })

    test('ignores duplicate occurrences', () => {
      expect(parseStringToTime('2w 4d 12w 5h 15m 50s 10h 3d')).toBe(
        2 * UNIT_MULTIPLIIERS.w +
          4 * UNIT_MULTIPLIIERS.d +
          5 * UNIT_MULTIPLIIERS.h +
          15 * UNIT_MULTIPLIIERS.m +
          50 * UNIT_MULTIPLIIERS.s
      )
    })
  })
})
