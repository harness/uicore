/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { ReactNode } from 'react'
import { render, RenderResult, screen, waitFor } from '@testing-library/react'
import { ModalDialog, ModalDialogProps } from './ModalDialog'
import userEvent from '@testing-library/user-event'

const renderComponent = (props: Partial<ModalDialogProps> & { children?: ReactNode } = {}): RenderResult =>
  render(<ModalDialog isOpen={true} {...props} />)

describe('ModalDialog', () => {
  describe('Header', () => {
    test('it should display the title', async () => {
      const title = 'TEST TITLE'
      renderComponent({ title })

      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
      expect(screen.getByTestId('modaldialog-header')).toBeInTheDocument()
    })

    test('it should not display the heading when title is not passed', async () => {
      renderComponent()

      expect(screen.queryAllByRole('heading')).toHaveLength(0)
      expect(screen.queryByTestId('modaldialog-header')).not.toBeInTheDocument()
    })

    test('it should set the noHeader modifier when no title or toolbar are passed', async () => {
      renderComponent()

      expect(screen.getByTestId('modaldialog-body').parentElement).toHaveClass('noHeader')
    })

    test('it should not set the noHeader modifier when one of title or toolbar are omitted', async () => {
      const { rerender } = renderComponent({ title: 'Test' })
      expect(screen.getByTestId('modaldialog-body').parentElement).not.toHaveClass('noHeader')

      rerender(<ModalDialog isOpen={true} />)
      expect(screen.getByTestId('modaldialog-body').parentElement).toHaveClass('noHeader')

      rerender(<ModalDialog isOpen={true} toolbar="Test" />)
      expect(screen.getByTestId('modaldialog-body').parentElement).not.toHaveClass('noHeader')
    })
  })

  describe('Toolbar', () => {
    test('it should display the toolbar when passed', async () => {
      const toolbarTestId = 'toolbar'
      renderComponent({ toolbar: <span data-testid={toolbarTestId}>Toolbar</span> })

      expect(screen.getByTestId(toolbarTestId)).toBeInTheDocument()
      expect(screen.getByTestId('modaldialog-toolbar')).toBeInTheDocument()
    })

    test('it should not include the toolbar when omitted', async () => {
      renderComponent()

      expect(screen.queryByTestId('modaldialog-toolbar')).not.toBeInTheDocument()
    })
  })

  test('it should display the body', async () => {
    const body = 'TEST BODY'
    renderComponent({ children: body })

    expect(screen.getByText(body)).toBeInTheDocument()
    expect(screen.getByTestId('modaldialog-body')).toBeInTheDocument()
  })

  describe('Footer', () => {
    test('it should display the footer when passed', async () => {
      const footerTestId = 'footer'
      renderComponent({ footer: <span data-testid={footerTestId}>Footer</span> })

      expect(screen.getByTestId(footerTestId)).toBeInTheDocument()
      expect(screen.getByTestId('modaldialog-footer')).toBeInTheDocument()
    })

    test('it should not include the footer when omitted', async () => {
      renderComponent()

      expect(screen.queryByTestId('modaldialog-footer')).not.toBeInTheDocument()
    })

    test('it should set the noFooter modifier when no footer is passed', async () => {
      const { rerender } = renderComponent()
      expect(screen.getByTestId('modaldialog-body').parentElement).toHaveClass('noFooter')

      rerender(<ModalDialog isOpen={true} footer="test" />)
      expect(screen.getByTestId('modaldialog-body').parentElement).not.toHaveClass('noFooter')
    })
  })

  describe('Close button', () => {
    test('it should display the close button when an onClose handler is passed', async () => {
      const onCloseMock = jest.fn()
      const closeButtonLabel = 'Close'
      renderComponent({ onClose: onCloseMock, closeButtonLabel })

      const btn = screen.getByRole('button', { name: closeButtonLabel })
      expect(btn).toBeInTheDocument()
      expect(onCloseMock).not.toHaveBeenCalled()

      userEvent.click(btn)

      await waitFor(() => expect(onCloseMock).toHaveBeenCalled())
    })

    test('it should not display the close button when the onClose handler is omitted', async () => {
      renderComponent()

      expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
    })

    test('it should not display the close button when isCloseButtonShown is false', async () => {
      renderComponent({ isCloseButtonShown: false, onClose: jest.fn() })

      expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
    })
  })

  describe('Dimensions', () => {
    test('it should not include a specific width or height when none are passed', async () => {
      renderComponent()

      const dialog = screen.getByTestId('modaldialog-body').parentElement

      expect(dialog).not.toHaveAttribute('style', /height/)
      expect(dialog).not.toHaveAttribute('style', /width/)
    })

    test('it should include a specific width when passed', async () => {
      const width = 100
      renderComponent({ width })

      const dialog = screen.getByTestId('modaldialog-body').parentElement

      expect(dialog).toHaveStyle({ width: `${width}px` })
    })

    test('it should set a CSS custom property with a set height when passed', async () => {
      const height = 100
      renderComponent({ height })

      const dialog = screen.getByTestId('modaldialog-body').parentElement

      expect(dialog).toHaveAttribute('style', expect.stringContaining(`--ModalDialog-Height: ${height}px`))
    })
  })
})
