/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { act, fireEvent, render, screen, RenderResult, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MultiSelectDropDown, MultiSelectDropDownProps } from '../MultiSelectDropDown'

const renderComponent = (props: Partial<MultiSelectDropDownProps> = {}): RenderResult =>
  render(<MultiSelectDropDown items={[]} {...props} />)

describe('MultiSelectDropDown', () => {
  test('it should display items passed through as props', async () => {
    renderComponent({
      items: [
        { label: 'value1', value: 'value1id' },
        { label: 'value2', value: 'value2id' }
      ],
      allowSearch: true
    })

    userEvent.click(screen.getByText('Select'))

    expect(screen.getByRole('checkbox', { name: 'value1' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'value2' })).toBeInTheDocument()
  })

  test('it should not display ExpandingSearchInput if allowSearch prop is false', async () => {
    renderComponent({
      items: [],
      allowSearch: false
    })

    userEvent.click(screen.getByText('Select'))

    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument()
  })

  test('it should filter out non-matching results when a user performs a search', async () => {
    renderComponent({
      items: [
        { label: 'value1', value: 'value1id' },
        { label: 'value2', value: 'value2id' }
      ],
      allowSearch: true,
      usePortal: true
    })

    userEvent.click(screen.getByText('Select'))

    expect(screen.getByRole('checkbox', { name: 'value1' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'value2' })).toBeInTheDocument()

    const dropdownSearchbox = await screen.findByRole('searchbox')

    const dropdownInput = 'value1'

    act(() => {
      fireEvent.change(dropdownSearchbox, { target: { value: dropdownInput } })
    })

    await waitFor(() => expect(dropdownSearchbox).toHaveValue(dropdownInput))

    expect(await screen.findByText(dropdownInput)).toBeInTheDocument()
    await waitFor(() => expect(screen.queryByText('value2')).not.toBeInTheDocument())
  })

  test('it should call ExpandingSearchInputProps onChange with the correct value when user performs a search when that prop is defined', async () => {
    const onSearchChange = jest.fn()

    renderComponent({
      items: [
        { label: 'value1', value: 'value1id' },
        { label: 'value2', value: 'value2id' }
      ],
      allowSearch: true,
      expandingSearchInputProps: {
        onChange: onSearchChange
      },
      usePortal: true
    })

    userEvent.click(screen.getByText('Select'))

    const dropdownSearchbox = await screen.findByRole('searchbox')

    const dropdownInput = 'value1'

    await waitFor(() => expect(onSearchChange).not.toHaveBeenCalled())

    act(() => {
      fireEvent.change(dropdownSearchbox, { target: { value: dropdownInput } })
    })

    await waitFor(() => expect(dropdownSearchbox).toHaveValue(dropdownInput))

    await waitFor(() => expect(onSearchChange).toHaveBeenCalledWith(dropdownInput))
  })
})
