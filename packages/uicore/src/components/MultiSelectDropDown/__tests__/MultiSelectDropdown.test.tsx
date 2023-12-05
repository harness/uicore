/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, screen, RenderResult, waitFor } from '@testing-library/react'
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

  test('it should call MultiSelectDropDown onChange when ExpandingSearchInputProps is undefined ', async () => {
    const onChange = jest.fn()

    renderComponent({
      items: [
        { label: 'value1', value: 'value1id' },
        { label: 'value2', value: 'value2id' }
      ],
      allowSearch: true,
      usePortal: true,
      onChange: onChange,
      expandingSearchInputProps: undefined
    })

    userEvent.click(screen.getByText('Select'))

    expect(screen.getByRole('checkbox', { name: 'value1' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'value2' })).toBeInTheDocument()

    const dropdownSearchbox = await screen.findByRole('searchbox')

    const dropdownInput = 'value1'

    userEvent.type(dropdownSearchbox, dropdownInput)

    expect(dropdownSearchbox).toHaveValue(dropdownInput)

    expect(await screen.findByText(dropdownInput)).toBeInTheDocument()
    await waitFor(() => expect(screen.queryByText('value2')).not.toBeInTheDocument())
  })
})
