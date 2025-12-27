/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { render, screen, waitForElementToBeRemoved, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { SplitButton, SplitButtonOption } from '../..'

// Helper to get the dropdown button (second button in the split button group)
const getDropdownButton = () => screen.getAllByRole('button')[1]

describe('SplitButton interaction', () => {
  test('should invoke actions as intended', async () => {
    const promise = Promise.resolve()
    const primaryAction = jest.fn(() => promise)
    const disabledAction = jest.fn()

    render(
      <SplitButton text="Save trigger" icon="info-message" onClick={primaryAction}>
        <SplitButtonOption icon="flash" text="Save as Template" onClick={disabledAction} />
        <SplitButtonOption icon="arrow-right" text="Save pipeline" />
      </SplitButton>
    )
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /save trigger/i }))
    })
    expect(primaryAction).toBeCalledTimes(1)

    await act(async () => {
      userEvent.click(getDropdownButton())
    })
    const option = await screen.findByText('Save as Template')
    await act(async () => {
      userEvent.click(option)
    })
    expect(disabledAction).toBeCalledTimes(1)
    await waitForElementToBeRemoved(option)
  })

  test('should handle double click as intended', async () => {
    const promise = Promise.resolve()
    const primaryAction = jest.fn(() => promise)
    const disabledAction = jest.fn()

    render(
      <SplitButton text="Save trigger" icon="info-message" onClick={primaryAction}>
        <SplitButtonOption icon="flash" text="Save as Template" onClick={disabledAction} />
        <SplitButtonOption icon="arrow-right" text="Save pipeline" />
      </SplitButton>
    )
    await act(async () => {
      userEvent.dblClick(screen.getByRole('button', { name: /save trigger/i }))
    })
    // Double click triggers onClick twice (standard behavior)
    expect(primaryAction).toBeCalledTimes(2)

    await act(async () => {
      userEvent.click(getDropdownButton())
    })
    const option = await screen.findByText('Save as Template')
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /save trigger/i }))
    })
    await waitForElementToBeRemoved(option) // if user clicks primary action while the the options are open, it should do primary action
  })

  test(`shouldn't show options while SplitButton and dropdown are disabled`, async () => {
    const promise = Promise.resolve()
    const primaryAction = jest.fn(() => promise)
    const disabledAction = jest.fn()

    render(
      <SplitButton text="Save trigger" icon="info-message" onClick={primaryAction} disabled dropdownDisabled>
        <SplitButtonOption icon="flash" text="Save as Template" onClick={disabledAction} />
        <SplitButtonOption icon="arrow-right" text="Save pipeline" />
      </SplitButton>
    )
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /save trigger/i }))
    })
    expect(primaryAction).not.toBeCalled()
    expect(getDropdownButton()).toBeDisabled()
  })

  test(`should allow options while SplitButton alone is disabled`, async () => {
    const disabledAction = jest.fn()
    render(
      <SplitButton text="Save trigger" icon="info-message" disabled>
        <SplitButtonOption icon="flash" text="Save as Template" />
        <SplitButtonOption icon="arrow-right" text="Save pipeline" disabled onClick={disabledAction} />
      </SplitButton>
    )
    expect(screen.getByRole('button', { name: /save trigger/i })).toBeDisabled()
    expect(getDropdownButton()).toBeEnabled()
    await act(async () => {
      userEvent.click(getDropdownButton())
    })
    const option = await screen.findByText('Save as Template')
    expect(option).toBeInTheDocument()
    await act(async () => {
      userEvent.click(screen.getByText('Save pipeline'))
    })
    expect(disabledAction).not.toBeCalled()
  })
})
