/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { SplitButton, SplitButtonOption } from '../..'

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
    userEvent.click(screen.getByRole('button', { name: /save trigger/i }))
    expect(primaryAction).toBeCalledTimes(1)

    userEvent.click(screen.getByRole('button', { name: /chevron-down/i }))
    const option = await screen.findByText('Save as Template')
    userEvent.click(option)
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
    userEvent.dblClick(screen.getByRole('button', { name: /save trigger/i }))
    expect(primaryAction).toBeCalledTimes(1) // call only once even though triggered twice

    userEvent.click(screen.getByRole('button', { name: /chevron-down/i }))
    const option = await screen.findByText('Save as Template')
    userEvent.click(screen.getByRole('button', { name: /save trigger/i }))
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
    userEvent.click(screen.getByRole('button', { name: /save trigger/i }))
    expect(primaryAction).not.toBeCalled()
    expect(screen.getByRole('button', { name: /chevron-down/i })).toBeDisabled()
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
    expect(screen.getByRole('button', { name: /chevron-down/i })).toBeEnabled()
    userEvent.click(screen.getByRole('button', { name: /chevron-down/i }))
    const option = await screen.findByText('Save as Template')
    expect(option).toBeInTheDocument()
    userEvent.click(screen.getByText('Save pipeline'))
    expect(disabledAction).not.toBeCalled()
  })
})
