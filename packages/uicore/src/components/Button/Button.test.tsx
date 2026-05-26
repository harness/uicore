/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Button, ButtonVariation } from './Button'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
  describe('loading prop', () => {
    test('should update loading state when loading prop changes from false to true to false', async () => {
      // Initial render with loading=false
      const { rerender, getByTestId } = render(<Button data-testid="test-button" text="Test Button" loading={false} />)

      // Verify initial state (loading=false)
      const button = getByTestId('test-button')
      expect(button).not.toHaveClass('bp3-loading')

      // Update props to loading=true
      rerender(<Button data-testid="test-button" text="Test Button" loading={true} />)

      // Verify loading=true state
      expect(button).toHaveClass('bp3-loading')

      // Update props back to loading=false
      rerender(<Button data-testid="test-button" text="Test Button" loading={false} />)

      // Verify loading=false state again
      expect(button).not.toHaveClass('bp3-loading')
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

  /**
   * Focus styling invariants. The button focus ring is rendered via the native `outline`
   * property and these tests lock in the structural invariants that Button.css depends on:
   *  - The bp3-button base class and `variation-*` class names (CSS selectors key off them).
   *  - That focus is a pure CSS concern with no JS-level side effects on className or
   *    inline style — anchoring the fact that focusing an absolutely-positioned button
   *    cannot mutate its layout.
   *  - That disabled buttons keep the `disabled` attribute, so the `:not([disabled])` CSS
   *    gate that suppresses the focus ring stays meaningful at the DOM level.
   */
  describe('focus styling invariants', () => {
    const variationCases: Array<{ variation: ButtonVariation; expectedClass: string }> = [
      { variation: ButtonVariation.PRIMARY, expectedClass: 'variation-primary' },
      { variation: ButtonVariation.SECONDARY, expectedClass: 'variation-secondary' },
      { variation: ButtonVariation.TERTIARY, expectedClass: 'variation-tertiary' },
      { variation: ButtonVariation.LINK, expectedClass: 'variation-link' },
      { variation: ButtonVariation.ICON, expectedClass: 'variation-icon' },
      { variation: ButtonVariation.AI, expectedClass: 'variation-ai' },
      { variation: ButtonVariation.AI_PRIMARY, expectedClass: 'variation-ai-primary' },
      { variation: ButtonVariation.AI_SECONDARY, expectedClass: 'variation-ai-secondary' }
    ]

    test('every ButtonVariation renders with the bp3-button base class and the CSS-targeted variation class', () => {
      for (const { variation, expectedClass } of variationCases) {
        const { getByTestId, unmount } = render(
          <Button data-testid={`btn-${variation}`} variation={variation} text="x" icon="cog" />
        )
        const button = getByTestId(`btn-${variation}`)
        expect(button.className).toEqual(expect.stringContaining('bp3-button'))
        expect(button.className).toEqual(expect.stringContaining(expectedClass))
        unmount()
      }
    })

    test('focusing a button is a pure CSS concern — no className, inline style, or DOM identity mutation', () => {
      for (const { variation } of variationCases) {
        const { getByTestId, unmount } = render(
          <Button data-testid={`focus-${variation}`} variation={variation} text="x" icon="cog" />
        )
        const button = getByTestId(`focus-${variation}`) as HTMLButtonElement
        const before = {
          className: button.className,
          tagName: button.tagName,
          inlineStyle: button.getAttribute('style')
        }

        button.focus()
        expect(document.activeElement).toBe(button)
        expect(button.className).toBe(before.className)
        expect(button.tagName).toBe(before.tagName)
        expect(button.getAttribute('style')).toBe(before.inlineStyle)

        button.blur()
        expect(document.activeElement).not.toBe(button)
        unmount()
      }
    })

    test('focusing an absolutely-positioned button does not mutate its inline positioning (regression test)', () => {
      const { getByTestId } = render(
        <div style={{ position: 'relative', height: 200 }}>
          <Button
            data-testid="abs-btn"
            variation={ButtonVariation.PRIMARY}
            text="Absolute"
            style={{ position: 'absolute', top: 10, left: 20 }}
          />
        </div>
      )
      const button = getByTestId('abs-btn') as HTMLButtonElement

      expect(button.style.position).toBe('absolute')
      expect(button.style.top).toBe('10px')
      expect(button.style.left).toBe('20px')

      button.focus()
      expect(document.activeElement).toBe(button)

      // Pre-fix, the focus CSS rule injected `position: relative` on the button itself,
      // breaking its absolute placement. The inline style is the only thing JS could mutate
      // and we assert it is untouched here.
      expect(button.style.position).toBe('absolute')
      expect(button.style.top).toBe('10px')
      expect(button.style.left).toBe('20px')
    })

    test('disabled buttons keep the disabled attribute (CSS :not([disabled]) gate) and do not fire onClick', () => {
      const onClick = jest.fn()
      const { getByTestId } = render(
        <Button
          data-testid="disabled-btn"
          variation={ButtonVariation.PRIMARY}
          text="Disabled"
          disabled
          onClick={onClick}
        />
      )
      const button = getByTestId('disabled-btn') as HTMLButtonElement

      // The focus CSS rule is gated on `:not([disabled])`. Lock in that the `disabled`
      // attribute is actually present on the rendered DOM so the gate stays meaningful.
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('disabled')

      userEvent.click(button)
      expect(onClick).not.toHaveBeenCalled()
    })
  })
})
