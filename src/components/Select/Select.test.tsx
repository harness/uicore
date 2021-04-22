import React from 'react'
import { render, fireEvent, act, wait } from '@testing-library/react'

import { Select, SelectOption } from './Select'

import data from '../../_stories/components/pokedex.json'

const items: SelectOption[] = data
  .map(row => ({
    label: row.name,
    value: row.id
  }))
  .slice(0, 20)

describe('<Select/> tests', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  test('works with static data', () => {
    const { container } = render(<Select items={items} />)

    expect(container).toMatchSnapshot()

    const input = container.querySelector('.bp3-input')

    expect(input).toBeDefined()
  })

  test.skip('works with async data', async () => {
    const TIMEOUT = 5000
    const asyncData = () => {
      return new Promise<SelectOption[]>(resolve => {
        setTimeout(() => {
          resolve(items)
        }, TIMEOUT)
      })
    }
    const { container, queryByText } = render(<Select items={asyncData} />)
    expect(container).toMatchSnapshot()

    const input = container.querySelector('.bp3-input')!

    expect(input).toBeDefined()
    fireEvent.focus(input)

    expect(container).toMatchSnapshot('Loading state')
    expect(queryByText('Loading results...')).toBeDefined()

    await act(() => {
      jest.runTimersToTime(TIMEOUT)

      return wait()
    })

    expect(container).toMatchSnapshot('Final state')
    expect(container.querySelectorAll('li.menuItem').length).toBe(items.length)
  })

  test('basic filter works', () => {
    const { container } = render(<Select items={items} />)
    const input = container.querySelector('.bp3-input')!

    fireEvent.focus(input)

    expect(container).toMatchSnapshot('Initial Menu')
    expect(container.querySelectorAll('li.menuItem').length).toBe(items.length)

    fireEvent.change(input, { target: { value: 'cha' } })

    expect(container).toMatchSnapshot('Filtered Menu')
    expect(container.querySelectorAll('li.menuItem').length).toBe(3)
  })

  test('no matching results', () => {
    const { container, queryByText } = render(<Select items={items} />)
    const input = container.querySelector('.bp3-input')!

    fireEvent.focus(input)

    expect(container.querySelectorAll('li.menuItem').length).toBe(items.length)

    fireEvent.change(input, { target: { value: 'abcde' } })

    expect(container).toMatchSnapshot('Filtered Menu')
    expect(queryByText('No matching results found')).toBeDefined()
  })

  test('onChange', () => {
    const onChange = jest.fn()
    const { container, queryByText } = render(<Select items={items} onChange={onChange} />)
    const input = container.querySelector('.bp3-input')!

    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'char' } })

    const pokemon = items.find(item => item.label === 'Charizard')
    const opt = queryByText(pokemon!.label)
    expect(opt).toBeDefined()

    if (opt) {
      fireEvent.click(opt)
      expect(onChange).toHaveBeenCalledWith(pokemon)
    }
  })
})
