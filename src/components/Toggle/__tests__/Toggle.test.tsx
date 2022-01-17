/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toggle, ToggleProps } from '../Toggle'

const ToggleContainer = (toggleProps: Partial<ToggleProps> = {}) => {
  const [checked, setChecked] = useState<boolean>(!!toggleProps?.checked)

  return (
    <Toggle
      {...toggleProps}
      checked={checked}
      onToggle={isChecked => {
        toggleProps?.onToggle?.(isChecked)
        setChecked(isChecked)
      }}
    />
  )
}

describe('Toggle', () => {
  test('it should render the label', async () => {
    const label = 'TEST LABEL'

    render(<ToggleContainer label={label} data-testid="toggle" />)

    expect(screen.getByTestId('toggle')).toHaveTextContent(label)
  })

  test('it should trigger the onChange event when clicked', async () => {
    const onChangeHandler = jest.fn()

    render(<ToggleContainer onChange={onChangeHandler} data-testid="toggle" />)

    expect(onChangeHandler).not.toHaveBeenCalled()
    userEvent.click(screen.getByTestId('toggle'))

    expect(onChangeHandler).toHaveBeenCalled()
    expect(onChangeHandler.mock.calls[0][0].target.checked).toBe(true)
  })

  test('it should trigger the onToggle event when clicked', async () => {
    const onToggleHandler = jest.fn()
    const checked = true

    render(<ToggleContainer onToggle={onToggleHandler} data-testid="toggle" checked={checked} />)

    expect(onToggleHandler).not.toHaveBeenCalled()
    userEvent.click(screen.getByTestId('toggle'))

    expect(onToggleHandler).toHaveBeenCalledWith(!checked)
  })

  test('it should not trigger the onToggle or onChange events when disabled and clicked', async () => {
    const onToggleHandler = jest.fn()
    const onChangeHandler = jest.fn()

    render(<ToggleContainer onToggle={onToggleHandler} onChange={onChangeHandler} data-testid="toggle" disabled />)

    expect(onToggleHandler).not.toHaveBeenCalled()
    expect(onChangeHandler).not.toHaveBeenCalled()

    userEvent.click(screen.getByTestId('toggle'))

    expect(onToggleHandler).not.toHaveBeenCalled()
    expect(onChangeHandler).not.toHaveBeenCalled()
  })
})
