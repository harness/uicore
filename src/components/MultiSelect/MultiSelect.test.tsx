import React from 'react'
import { render, fireEvent, act, wait } from '@testing-library/react'

import { MultiSelect, MultiSelectOption } from './MultiSelect'

import data from '../../_stories/components/pokedex.json'

const items: MultiSelectOption[] = data
  .map(row => ({
    label: row.name,
    value: row.id
  }))
  .slice(0, 20)

describe('<MultiSelect/> tests', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  test('works with static data', () => {
    const { container } = render(<MultiSelect items={items} allowCreatingNewItems={true} />)
    expect(container).toMatchSnapshot()
    const input = container.querySelector('.bp3-input-ghost')!
    expect(input).toBeDefined()
    fireEvent.keyDown(input, { key: 'Enter', code: 13 })
    expect(container.querySelectorAll('li.menuItem').length).toBe(items.length)
  })

  test('works with async data', async () => {
    const TIMEOUT = 5000
    const asyncData = () => {
      return new Promise<MultiSelectOption[]>(resolve => {
        setTimeout(() => {
          resolve(items)
        }, TIMEOUT)
      })
    }
    const { container, queryByText } = render(<MultiSelect items={asyncData} />)
    expect(container).toMatchSnapshot()

    const input = container.querySelector('.bp3-input-ghost')!

    expect(input).toBeDefined()
    fireEvent.focus(input)

    expect(container).toMatchSnapshot('Loading state')
    expect(queryByText('Loading results...')).toBeDefined()

    await act(() => {
      jest.runTimersToTime(TIMEOUT)

      return wait()
    })

    expect(container).toMatchSnapshot('Final state')
    fireEvent.keyDown(input, { key: 'Enter', code: 13 })
    expect(container.querySelectorAll('li.menuItem').length).toBe(items.length)
  })

  test('works with filtering', () => {
    const { container } = render(<MultiSelect items={items} allowCreatingNewItems={true} />)
    const input = container.querySelector('.bp3-input-ghost')!
    fireEvent.focus(input)

    fireEvent.change(input, { target: { value: 'cha' } })

    expect(container).toMatchSnapshot('Filtered Menu')
    expect(container.querySelectorAll('li.menuItem').length).toBe(3)
  })

  test('should work when no matching results found', () => {
    const { container, queryByText } = render(<MultiSelect items={items} />)
    const input = container.querySelector('.bp3-input-ghost')!

    fireEvent.focus(input)

    fireEvent.change(input, { target: { value: 'junk' } })

    expect(container).toMatchSnapshot('Filtered Menu')
    expect(queryByText('No matching results found')).toBeDefined()
  })

  test('should work when new item is created', () => {
    const { container } = render(<MultiSelect items={items} allowCreatingNewItems={true} />)
    const input = container.querySelector('.bp3-input-ghost')!

    fireEvent.focus(input)

    fireEvent.change(input, { target: { value: 'newItem' } })
    expect(container.querySelectorAll('.bp3-button-text').length).toBe(1)
    expect(container.querySelectorAll('.bp3-button-text')[0].textContent).toBe('newItem')
  })

  test(' works on Change', () => {
    const onChange = jest.fn()
    const { container, queryByText } = render(<MultiSelect items={items} onChange={onChange} />)
    const input = container.querySelector('.bp3-input-ghost')!

    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'char' } })

    const pokemon = [items.find(item => item.label === 'Charizard')]
    const opt = queryByText(pokemon[0]!.label)
    expect(opt).toBeDefined()

    if (opt) {
      fireEvent.click(opt)
      expect(onChange).toHaveBeenCalledWith(pokemon)
    }
  })

  test('works with select all + static data', () => {
    const { container } = render(<MultiSelect items={items} allowCreatingNewItems={true} enableSelectAll />)
    expect(container).toMatchSnapshot()
    const input = container.querySelector('.bp3-input-ghost')!
    expect(input).toBeDefined()
    fireEvent.keyDown(input, { key: 'Enter', code: 13 })
    expect(container.querySelectorAll('li.menuItem')[0].textContent).toMatch('All')
    expect(container.querySelectorAll('li.menuItem').length).toBe(items.length + 1)
  })
})
