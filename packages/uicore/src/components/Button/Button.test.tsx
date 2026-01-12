/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Button } from './Button'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
  describe('loading prop', () => {
    test('should update loading state when loading prop changes from false to true to false', async () => {
      // Initial render with loading=false
      const { rerender, getByTestId } = render(<Button data-testid="test-button" text="Test Button" loading={false} />)

      // Verify initial state (loading=false)
      const button = getByTestId('test-button')
      expect(button).not.toHaveClass('bp4-loading')

      // Update props to loading=true
      rerender(<Button data-testid="test-button" text="Test Button" loading={true} />)

      // Verify loading=true state
      expect(button).toHaveClass('bp4-loading')

      // Update props back to loading=false
      rerender(<Button data-testid="test-button" text="Test Button" loading={false} />)

      // Verify loading=false state again
      expect(button).not.toHaveClass('bp4-loading')
    })
  })

  test('it should submit the named form when the button is clicked', async () => {
    const onSubmit = jest.fn()
    render(
      <>
        <form id="test-form" onSubmit={onSubmit}></form>
        <Button type="submit" form="test-form" text="Submit" />
      </>
    )

    expect(onSubmit).not.toHaveBeenCalled()

    userEvent.click(screen.getByRole('button'))

    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
  })
})
