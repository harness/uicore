/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { DropDown, NoMatch } from './DropDown'

describe('DropDown component', () => {
  const mockItems = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' }
  ]

  test('renders dropdown with placeholder', () => {
    const onChange = jest.fn()
    const { container } = render(<DropDown items={mockItems} onChange={onChange} placeholder="Select an option" />)
    expect(screen.getByText('Select an option')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('renders dropdown with selected value', async () => {
    const onChange = jest.fn()
    const { container } = render(<DropDown items={mockItems} onChange={onChange} value="opt1" />)
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })
    expect(container).toMatchSnapshot()
  })

  test('renders dropdown with selected value as object', async () => {
    const onChange = jest.fn()
    const asyncItems = () => Promise.resolve(mockItems)
    const { container } = render(
      <DropDown items={asyncItems} onChange={onChange} value={{ label: 'Option 1', value: 'opt1' }} />
    )
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })
    expect(container).toMatchSnapshot()
  })

  test('renders dropdown with icon', () => {
    const onChange = jest.fn()
    const { container } = render(<DropDown items={mockItems} onChange={onChange} icon="main-dashboard" />)
    expect(container).toMatchSnapshot()
  })

  test('renders dropdown with custom width', () => {
    const onChange = jest.fn()
    const { container } = render(<DropDown items={mockItems} onChange={onChange} width={200} />)
    expect(container).toMatchSnapshot()
  })

  test('renders disabled dropdown when items are empty', () => {
    const onChange = jest.fn()
    render(<DropDown items={[]} onChange={onChange} />)
    const button = screen.getByTestId('dropdown-button')
    expect(button.closest('.disabled')).toBeTruthy()
  })

  test('renders dropdown with clear button when addClearBtn is true and value is selected', () => {
    const onChange = jest.fn()
    const { container } = render(<DropDown items={mockItems} onChange={onChange} value="opt1" addClearBtn />)
    expect(container).toMatchSnapshot()
  })

  test('handles async items', async () => {
    const onChange = jest.fn()
    const asyncItems = () => Promise.resolve(mockItems)
    render(<DropDown items={asyncItems} onChange={onChange} />)
    await waitFor(() => {
      expect(screen.getByTestId('dropdown-button')).toBeInTheDocument()
    })
  })

  test('handles lazy loading with getLazyItems', async () => {
    const onChange = jest.fn()
    const getLazyItems = jest.fn(() => Promise.resolve())
    const { container } = render(<DropDown onChange={onChange} getLazyItems={getLazyItems} />)
    expect(container).toMatchSnapshot()
  })

  test('renders with custom label', () => {
    const onChange = jest.fn()
    const getCustomLabel = (item: any) => `Custom: ${item.label}`
    render(<DropDown items={mockItems} onChange={onChange} value="opt1" getCustomLabel={getCustomLabel} />)
    expect(screen.getByText('Custom: Option 1')).toBeInTheDocument()
  })

  test('applies custom className', () => {
    const onChange = jest.fn()
    const { container } = render(<DropDown items={mockItems} onChange={onChange} className="custom-class" />)
    expect(container.querySelector('.custom-class')).toBeTruthy()
  })

  test('renders disabled dropdown when disabled prop is true', () => {
    const onChange = jest.fn()
    render(<DropDown items={mockItems} onChange={onChange} disabled />)
    const button = screen.getByTestId('dropdown-button')
    expect(button.closest('.disabled')).toBeTruthy()
  })
})

describe('NoMatch component', () => {
  test('renders no match message with internal query', () => {
    const { container } = render(<NoMatch hasInternalQuery={true} />)
    expect(screen.getByText('No matching results found')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('renders no match message without internal query', () => {
    const { container } = render(<NoMatch hasInternalQuery={false} />)
    expect(screen.getByText('No items found')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
